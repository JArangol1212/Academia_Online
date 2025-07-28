import prisma from "@/config/Prisma"
import { endOfMonth, startOfMonth, subMonths } from "date-fns"
import { es } from "date-fns/locale"
import { format } from "date-fns"

export async function getRevenueByMonth() {

   const now = new Date();

  const months = Array.from({ length: 6 }, (_, i) => {
    return subMonths(now, 5 - i);
  });

  const result = await Promise.all(
    months.map(async (monthDate) => {
      const start = startOfMonth(monthDate);
      const end = endOfMonth(monthDate);

      const purchases = await prisma.purchase.findMany({
        where: {
          createdAt: {
            gte: start,
            lte: end,
          },
        },
        include: {
          course: {
            select: {
              price: true,
            },
          },
        },
      });

      const totalRevenue = purchases.reduce((sum, purchase) => {
        const priceStr = purchase.course.price ?? "0";
        const coursePrice = parseFloat(priceStr.replace(",", "."));
        return sum + (Number.isFinite(coursePrice) ? coursePrice : 0);
      }, 0);

      return {
        month: format(start, "MMMM", { locale: es }),     // ✅ corregido
        revenue: Number(totalRevenue.toFixed(2)),          // ✅ corregido
      };
    })
  );

  return result;

}
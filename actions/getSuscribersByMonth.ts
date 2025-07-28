import prisma from "@/config/Prisma"
import { startOfMonth, subMonths } from "date-fns"
import { es } from "date-fns/locale"
import { format } from "date-fns"



export async function getSusbcriptorsByMonth(){

      const now = new Date()

      const sixMonthsAgo = startOfMonth(subMonths(now, 5))


      // funcion para obtener todas las compras que se realizo del proyecto

      const purchase = await prisma.purchase.findMany({

            where:{
                  createdAt:{
                        gte:sixMonthsAgo
                  }
            },
            select:{

                  createdAt:true
            }
        
      })
      const months = Array.from({length:6}, (_, i) => {

            const date = subMonths(now, 5 - i)

            return {
                  months: format(date, "LLLL", { locale: es }),
                  count: 0,
                  date: format(date, "yyyy-MM")
            }
      })

      purchase.forEach((purchase)=>{

            const purhcaseMonth= format(purchase.createdAt,"yyyy-MM")
            const month = months.find((m) => m.date ===purhcaseMonth)
            if(month){
                  month.count+=1
            }
      })

      return months.map(({months, count}) =>({
            month: months,
            users: count
      }))
      
}
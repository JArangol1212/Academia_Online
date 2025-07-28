export type PurchaseWithCourse = {
  id: string;
  userId: string;
  courseId: string; // corregido
  course: {
    id: string;
    title: string;
    price: string | null;
  };
};

type PurchaseWithFormattedDate = PurchaseWithCourse & {
  createdAtFormatted: string; // corregido: formAted → Formatted
};

export type OrderListProps = {
  purchases: PurchaseWithFormattedDate[];
  receipts: {
    paymentIntentId: string; // corregido
    receiptUrl: string | null;
  }[];
};

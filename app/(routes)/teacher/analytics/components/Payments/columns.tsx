"use client"

import { ColumnDef } from "@tanstack/react-table";
 export type PurchaseWithCourse ={

      id:string
      userId:string
      userEmail:string
      courseId:string
      price:number
      createdAt:Date
      updatedAt:Date
      course:{
            title:string
            slug:string
            imageUrl:string
            price:string
      }
 }
export type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

export const columns: ColumnDef<PurchaseWithCourse>[] = [
  {
    accessorKey: "CrearedAtFormated",
    header: "Fecha de Compra",
    cell:({row})=> {
      const date = new Date(row.original.createdAt).toLocaleDateString("es-ES")
      return <div className="font-medium">{date}</div>
    }
  },
  {
    accessorKey: "userEmail",
    header: "Cliente",
  },
  {
    accessorKey: "course.title",
    header: "Curso",
  },
   {
    accessorKey: "price",
    header: "Precio",
    cell:({row})=>{
      const price = row.original.price
      return <div>{price}</div>
    }
  },
]


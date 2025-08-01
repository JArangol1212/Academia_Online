
"use client"

import { formatPrice } from "@/lib/formatPrice";
import { OrderListProps } from "./OrdersList.types";

import {
      Table,
      TableBody,
      TableCaption,
      TableCell,
      TableFooter,
      TableHead,
      TableHeader,
      TableRow,
} from "@/components/ui/table"
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
export function OrdersList(props: OrderListProps) {

      const { purchases, receipts } = props

      const totalPurchases = purchases.reduce((acc, purchase) => {
            const price = purchase.course.price
                  ? parseFloat(purchase.course.price.replace(",", ".")) : 0
            return acc + price
      }, 0)

      const formattedTotal = formatPrice(totalPurchases.toString() || "0")

      const downloadReceipt = (index: number) => {
            const receiptUrl = receipts[index].receiptUrl

            if (receiptUrl) {
                  window.open(receiptUrl, "_blank")
            } else {

                  toast.error("No se ha encontrado el recibo")
            }
      }

      return (

            <Table className="my-6">
                  <TableCaption>Listado de tus ultimos pedidos</TableCaption>
                  <TableHeader>
                        <TableRow>
                              <TableHead className="w-[100px]">Fecha</TableHead>
                              <TableHead>Curso</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead className="text-center">Recibo</TableHead>
                              <TableHead className="text-right">Precio</TableHead>
                        </TableRow>
                  </TableHeader>
                  <TableBody>
                       {purchases.map((purchase, index) =>(
                        <TableRow key={purchase.id}>
                              <TableCell className="font-medium">
                                    {purchase.createdAtFormatted}

                              </TableCell>
                              <TableCell >
                               {purchase.course.title}
                              </TableCell>
                              <TableCell>
                                    <span 
                                    className="bg-green-100 text-green-600 py-1 px-2 rounded-md text-sm">
                                          Pagado
                                    </span>
                              </TableCell>
                              <TableCell className="text-center">
                                    <Button
                                    variant="outline"
                                     onClick={()=> downloadReceipt(index)}>

                                          Ver recibo
                                          <ExternalLink className="w-4 h-4"/>

                                    </Button>

                              </TableCell>
                              <TableCell className="text-right">
                                    {formatPrice(purchase.course.price)}

                              </TableCell>
                              
                        </TableRow>
                       ))}
                  </TableBody>
                  <TableFooter>
                        <TableRow>
                              <TableCell colSpan={4}>Total Gastado</TableCell>
                              <TableCell className="text-right">{formattedTotal}</TableCell>
                        </TableRow>
                  </TableFooter>
            </Table>
      )
}
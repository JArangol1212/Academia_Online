import { getLastPurchases } from "@/actions/getLastPurchases"
import { DataTable } from "./data-table"
import { columns, PurchaseWithCourse } from "./columns"

export async function Payments(){


      const lastPurchases = await getLastPurchases()


      return (

            <div className="mx-auto my-10 w-full border shadow-md bg-white p-4 rounded-md">
                  <DataTable
                   columns={columns}
                   data={lastPurchases as PurchaseWithCourse[]}
                   
                  />
            </div>
      )
}
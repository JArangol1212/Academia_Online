import { getRevenueByMonth } from "@/actions/getRevenueByMont";

import { NextResponse } from "next/server";


export async function GET(){

      try {
            

            const data = await getRevenueByMonth()
            return NextResponse.json(data)

      } catch (error ) {
            console.log("[REVENUE_BY_MONTH]", error)
            return new NextResponse("Internal server error", {status:500})
            
      }
}
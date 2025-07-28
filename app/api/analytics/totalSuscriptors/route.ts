import { getSusbcriptorsByMonth } from "@/actions/getSuscribersByMonth";
import { NextResponse } from "next/server";

export async function GET(){

      try {
             
            const data = await getSusbcriptorsByMonth()
            return NextResponse.json(data)

      } catch (error) {
            console.log("[TOTAL_SUSCRIPTORS]", error)
            return new NextResponse("Internal server error ",  {status:500})
            
      }
}
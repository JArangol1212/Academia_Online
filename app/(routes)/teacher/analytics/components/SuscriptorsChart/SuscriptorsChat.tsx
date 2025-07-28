"use client"
import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useEffect, useState } from "react"
import { SuscriptorsChartProps } from "./SuscriptorsChart.types"
import axios from "axios"

export const description = "A bar chart"

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig


export function SuscriptorsChart(){

  const [data, setData] = useState<SuscriptorsChartProps[]>([])
  const [isLoading, setIsLoading] =useState(true)
  

  useEffect(()=>{

    const fetchSubscribers = async ()=>{

      try {

        const res = await axios("/api/analytics/totalSuscriptors")
        setData(res.data)
        
      } catch (error) {
        console.log("Error al obtener suscriptores", error)
        
      } finally{

        setIsLoading(false)
      }
    }
    fetchSubscribers()
  },[])
  
  

      return (

            <Card>
      <CardHeader>
        <CardTitle>Últimos suscriptores</CardTitle>
        <CardDescription>Últimos suscriptores es los últimos 6 meses </CardDescription>
      </CardHeader>
      {isLoading ? (
        <div className="text-sm text-muted-foreground h-36 items-center justify-center">

          Cargando suscriptores
        </div>
      ):(

    
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="users" fill="var(--color-desktop)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>

      )}
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Creciendo un 5.2% este mes- <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Mostrando el total se suscriptores en los últimos 6 meses 
        </div>
      </CardFooter>
    </Card>
  
      )
}
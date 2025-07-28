import { Button } from "@/components/ui/button";
import Link from "next/link";



export default function NoFound() {

      return (

            <div className="flex flex-col items-center justify-center h-screen text-center">
                 
                 <h1 className="text-4xl font-bold"> 404</h1>
                 
                  <p className="text-lg mt-2"> Pagina no encontrado</p>

                  <Button asChild>

                        <Link href="/" className="m-4">
                        Volver a inicio
                        
                        </Link>


                  </Button>
            </div>
      )
}
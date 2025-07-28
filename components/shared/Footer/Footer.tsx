import Link from "next/link";

export default function Footer(){

      return (

           <footer className="py-4 px-6 border-t bg-white w-full">
            <div className="flex justify-between items-center text-sm text-slate-500">
                
                <p>  2 0 2 5 © A R A N G O D E V </p>
                
                <div className="flex gap-2 items-center">
                  
                  <Link href="/privacy-policy"> Privacidad</Link>
                  <Link href="/terms"> Terminos de uso</Link>


                </div>
            </div>



           </footer>
      )
}
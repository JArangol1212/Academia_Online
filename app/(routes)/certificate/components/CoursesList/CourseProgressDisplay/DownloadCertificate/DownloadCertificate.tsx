"use client"


import { Button } from "@/components/ui/button";
import html2canvas from 'html2canvas-pro'
import { useRef } from "react";
import { DownloadCertificateProps } from "./DownloadCertificate.types";


import {
      AlertDialog,
      AlertDialogAction,
      AlertDialogCancel,
      AlertDialogContent,
      AlertDialogDescription,
      AlertDialogFooter,
      AlertDialogHeader,
      AlertDialogTitle,
      AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Download } from "lucide-react";
import { Certificado } from "./Certificado";
export function DownloadCertificate(props: DownloadCertificateProps) {

      const { titleCourse, userName } = props
  

      const certRef = useRef<HTMLDivElement>(null)


      const handleDownload= async()=>{

            if(certRef.current){
            
                  const  canvas = await html2canvas(certRef.current, {
                       scale: 1
                  })
                  const link = document.createElement('a')
                  link.download = `Certificado-${titleCourse}.png`
                  link.href = canvas.toDataURL("image/png")
                  link.click()

            }

      }

      return (

            <div className="">
                  <AlertDialog>
                        <AlertDialogTrigger asChild>

                              <Button variant="outline">
                                    Descargar Certificado
                                    <Download className="w-4 h-4 ml-2"/>
                              </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="w-full !max-w-[900px] max-h-[90vh] overflow-y-auto">
                              <AlertDialogHeader>
                                    <AlertDialogTitle className="text-center"> Descarga tu Certificado</AlertDialogTitle>
                                    <AlertDialogDescription asChild>
                                          
                                      <Certificado titleCourse={titleCourse} userName={userName} certRef={certRef}/>
                                          
                                    </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={handleDownload}>Descargar</AlertDialogAction>
                              </AlertDialogFooter>
                        </AlertDialogContent>
                  </AlertDialog>


            </div>
      )
}
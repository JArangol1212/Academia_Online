
"use client"
import {
      Sidebar,
      SidebarContent,
   
      SidebarGroup,
      SidebarGroupLabel,
      SidebarHeader,
      SidebarMenu,
      SidebarMenuButton,
      SidebarMenuItem,
      SidebarMenuSub,
      SidebarMenuSubButton,
      SidebarMenuSubItem,
      useSidebar,
} from "@/components/ui/sidebar"

import Link from "next/link"
import {  routes, routesTeacher } from "./AppSidebar.data"
import Image from "next/image"


export default function AppSidebar() {

      const { state } = useSidebar()


      return (
            <Sidebar collapsible="icon">
                  <SidebarContent>
                        <SidebarHeader>
                              <Link href="/" className="flex  flex-row items-center">
                               
                               
                               <Image src="/arangos.png" alt="arango"
                               width={35}
                               height={35}
                               className="rounded-b-2xl"/>
                               {state ==="expanded" && (
                                  
                                  <span className="text-lg font-semibold text-gray-800 tracking-wide">
                                         A R A N G O {''} L M  S
                                  </span>
                               ) }

                           
                              </Link>
                        </SidebarHeader>
                        <SidebarGroup>

                              <SidebarGroupLabel className="text-xl"> Plataforma </SidebarGroupLabel>
                              <SidebarMenu className="space-y-2">
                                    {routes.map((item) =>(
                                          <SidebarMenuItem key={item.title}>

                                              <SidebarMenuButton asChild>
                                                <a href={item.url} >

                                                 <div className="p-1 rounded-lg text-white bg-violet-400">
                                                      <item.icon className="w-4 h-4"/>

                                                 </div>
                                                 {state === "expanded" && <span>{item.title}</span>}
                                                </a>
                                                </SidebarMenuButton>  

                                          </SidebarMenuItem>
                                    ))}


                        </SidebarMenu>

                        <SidebarMenu className="mt-4">
                              <SidebarGroupLabel className="text-xl">
                                    Profesor
                              </SidebarGroupLabel>
                              <SidebarMenuItem>
                                    <SidebarMenuSub>

                                          {routesTeacher.map((item)=>(

                                                <SidebarMenuSubItem key={item.title}>

                                                      <SidebarMenuSubButton href={item.url}
                                                       className="hover:bg-muted transition">
                                                      
                                                      <div className="p-1 rounded-lg text-white bg-slate-400">
                                                         
                                                         <item.icon className="w-6 h-6"/>
                                                       
                                                      </div>
                                                        {item.title}


                                                      </SidebarMenuSubButton>
                                                </SidebarMenuSubItem>

                                                
                                          ))}

                                    </SidebarMenuSub>

                              </SidebarMenuItem>

                        </SidebarMenu>
                  </SidebarGroup>

            </SidebarContent>

            </Sidebar >
      )
}
"use client"

import { BellRing, LogIn, Search } from "lucide-react";
import { SidebarTrigger } from "../../ui/sidebar";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";


export function Navbar(){

      return (
            <div className=" flex justify-between p-4 border-b bg-white h-16">
                  <SidebarTrigger/>

                   <div className="flex gap-4 items-center">
                  <div className="flex  w-full max-w-sm items-center 
                  border-gray-300 rounded-lg px-2.5 py-0.5">
                    <Search className="h-6 w-6 mr-2.5"/>
                    <Input type="search" placeholder="Buscar..."
                    className="w-full border-0"/>

                  </div>
                  <Button variant="outline">
                        <BellRing  className="w-4 h-4"/>
                  </Button>

                  <SignedOut>
                        <SignInButton>
                              <Button>
                                    <LogIn/>
                                    Iniciar sesión
                              </Button>
                        </SignInButton>
                  </SignedOut>
                  <SignedIn>
                        <UserButton/>
                  </SignedIn>
            </div>
            </div>
            
      )


}
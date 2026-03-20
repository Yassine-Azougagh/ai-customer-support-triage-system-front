
import { AppSidebar } from "@/components/app-sidebar";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router";
import './App.css';
import { getCurrentUser } from "./services/auth.service";
function App() {
    const user = getCurrentUser()
    const [breadcrumb, setBreadcrumb] = useState({item: '', subItem:'', url: ''})
    const navigate = useNavigate()
    return (
        <>


                <div >
                    <SidebarProvider>
                        <AppSidebar user={user} setBreadcrumb={setBreadcrumb}/>
                        <SidebarInset>
                            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
                                <div className="flex items-center gap-2 px-4">
                                    <SidebarTrigger className="-ml-1" />
                                    <Separator
                                        orientation="vertical"
                                        className="mr-2 data-[orientation=vertical]:h-4"
                                    />
                                    <Breadcrumb>
                                        <BreadcrumbList>
                                            <BreadcrumbItem className="hidden md:block">
                                                <BreadcrumbLink >
                                                    <a onClick={() => {
                                                        navigate(breadcrumb.url)
                                                        setBreadcrumb({...breadcrumb, subItem: 'Liste'})
                                                    }}>
                                                        {breadcrumb.item}
                                                    </a>
                                                </BreadcrumbLink>
                                            </BreadcrumbItem>
                                            <BreadcrumbSeparator className="hidden md:block" />
                                            <BreadcrumbItem>
                                                <BreadcrumbPage>{breadcrumb.subItem}</BreadcrumbPage>
                                            </BreadcrumbItem>
                                        </BreadcrumbList>
                                    </Breadcrumb>
                                </div>
                            </header>
                            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                                            <div className="min-h-screen w-full relative">

                                <div
                                    className="absolute inset-0 z-0"
                                    style={{
                                        background: "radial-gradient(125% 125% at 50% 90%, #fff 40%, #6366f1 100%)",
                                        borderRadius: "10px"
                                    }}
                                />
                                <div className="relative">

                                    <Outlet />
                                </div>
                                    </div>
                            </div>
                        </SidebarInset>
                    </SidebarProvider>
                </div>
                <Toaster />
        </>
    )
}

export default App

"use client"

import { usePathname } from "next/navigation"
import AppSidebar from "@/components/ui/AppSidebar"
import Navbar from "@/components/ui/Navbar"
import { SidebarProvider } from "@/components/ui/sidebar"

export default function LayoutClient({
  children,
  defaultOpen,
}: {
  children: React.ReactNode
  defaultOpen: boolean
}) {
  const pathname = usePathname()
  const hideLayout = pathname === "/login" // 👈 hide on login page

  if (hideLayout) {
    return (
      <main className="w-full min-h-screen flex items-center justify-center bg-gray-50">
        {children}
      </main>
    )
  }

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <main className="w-full">
        <Navbar />
        <div className="px-4">{children}</div>
      </main>
    </SidebarProvider>
  )
}

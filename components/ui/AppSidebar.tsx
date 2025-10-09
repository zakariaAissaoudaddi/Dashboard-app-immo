import { UserRound , ChevronUp, LayoutDashboard, ShieldUser , UsersRound, Building2, User2,Hotel, File, DollarSign, BanknoteArrowDown, Paperclip, MessagesSquare, FileText, FileChartColumn, Settings } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import Link from "next/link"
import Image from "next/image"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"

// Menu items.
const items = [
  {
    title: "Acceuil",
    url: "/acceuil",
    icon:  LayoutDashboard,
  },
  {
    title: "Employé",
    url: "/employees",
    icon: ShieldUser,
  },
  {
    title: "Propriétaire",
    url: "/proprietaire",
    icon: UserRound ,
  },
  {
    title: "Locataire",
    url: "#",
    icon: UsersRound ,
  },
  {
    title: "Bien",
    url: "#",
    icon: Building2,
  },
  
    {
    title: "Locative",
    url: "#",
    icon: Hotel,
  },
    {
    title: "Contrat",
    url: "#",
    icon: File,
  },
    {
    title: "Paiment",
    url: "#",
    icon: DollarSign,
  },
    {
    title: "Depenses",
    url: "#",
    icon: BanknoteArrowDown,
  },
    {
    title: "Fichier",
    url: "#",
    icon: Paperclip,
  },
    {
    title: "Messages",
    url: "#",
    icon: MessagesSquare,
  },
    {
    title: "Raport",
    url: "#",
    icon: FileChartColumn,
  },
    {
    title: "Parametre",
    url: "#",
    icon: Settings,
  },
]

export function AppSidebar() {
  return (
    
    <Sidebar collapsible="icon" side="left">
      <SidebarHeader className="py-1">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/">
              <Image src="/logo1.png" alt="logo" width={50} height={50}/>
              <span>HiDev</span>
              </Link>
            </SidebarMenuButton>
           
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarSeparator className="ml-0"/>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> John Doe <ChevronUp className="ml-auto"/>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Account</DropdownMenuItem>
                <DropdownMenuItem>Setting</DropdownMenuItem>
                <DropdownMenuItem>Sign out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
export default AppSidebar
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"

import { PAGE_URL } from "@/constant/url"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  // SidebarTrigger,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
  {
    title: "Home",
    url: PAGE_URL.HOME,
    icon: Home,
  },
  {
    title: "Productions",
    url: PAGE_URL.PRODUCTIONS,
    icon: Search,
  },
  {
    title: "Inbox",
    url: PAGE_URL.INBOX,
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: PAGE_URL.CALENDAR,
    icon: Calendar,
  },
  {
    title: "Settings",
    url: PAGE_URL.SETTINGS,
    icon: Settings,
  },
]

export default function Menu() {
  return (
    <Sidebar style={{ marginTop: "55px" }}>
      <SidebarContent>
        {/* <SidebarTrigger /> */}
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
    </Sidebar>
  )
}

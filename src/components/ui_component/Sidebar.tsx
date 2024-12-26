"use client";
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
} from "@/components/ui/sidebar";
import { logout } from "@/service/auth";
import {
  BicepsFlexed,
  BicepsFlexedIcon,
  BookOpen,
  Home,
  LogOut,
  Projector,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const items = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "Add Skills",
    url: "/add-skills",
    icon: BicepsFlexed,
  },
  {
    title: "Manage Skills",
    url: "/manage-skill",
    icon: BicepsFlexedIcon,
  },
  {
    title: "Add Project",
    url: "/add-project",
    icon: Projector,
  },
  {
    title: "Manage Project",
    url: "/manage-project",
    icon: Projector,
  },
  {
    title: "Add Blog",
    url: "/add-blog",
    icon: BookOpen,
  },
  {
    title: "Manage Blog",
    url: "/manage-blog",
    icon: BookOpen,
  },
];

export function AppSidebar() {
  const router = useRouter();

  const handleLogout = async () => {
    await logout(); // Assuming logout is an async function
    router.push("/user-login"); // Redirects the user to the login page
  };

  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroupLabel>Application</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <Link href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}

            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <div className="cursor-pointer" onClick={handleLogout}>
                  <LogOut />
                  <span>Logout</span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}

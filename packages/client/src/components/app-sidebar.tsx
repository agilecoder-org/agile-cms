import * as React from "react";
import {
  Newspaper,
  SquarePen,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavBlogs } from "@/components/nav-blogs";
import { NavUser } from "@/components/nav-user";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

import useAuth from "@/zustand/authStore";

const navMain = [
  // {
  //   title: "Analytics",
  //   url: "/analytics/dashboard",
  //   isActive: true,
  //   icon: ChartPie,
  //   items: [
  //     {
  //       title: "Dashboard",
  //       url: "/analytics/dashboard",
  //     },
  //     {
  //       title: "Reports",
  //       url: "/analytics/reports",
  //     },
  //     {
  //       title: "Settings",
  //       url: "/analytics/settings",
  //     },
  //   ],
  // },
  {
    title: "Manage Blogs",
    url: "#",
    icon: Newspaper,
    items: [
      {
        title: "New Blog",
        url: "/manage-blogs/new-blog",
      },
      {
        title: "API Settings",
        url: "/manage-blogs/api-settings",
      },
      // {
      //   title: "Permissions",
      //   url: "/manage-blogs/permissions",
      // },
    ],
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user }: any = useAuth();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <div className="bg-white text-black w-fit p-2 rounded-md">
            <SquarePen />
          </div>
          <div>
            <p className="text-2xl">CMS</p>
            <p className="text-[9px]">by Agile Coder</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
        <NavBlogs />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

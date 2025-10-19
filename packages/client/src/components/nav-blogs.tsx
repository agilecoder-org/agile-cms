import {
  Folder,
  Forward,
  MoreHorizontal,
  Trash2,
  CircleSmall,
} from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { Link } from "react-router-dom"
import { BlogSite } from "@/types/blogSite"
import { useEffect, useState } from "react"
import { getBlogSites } from "@/services/manage-blogs/newBlog"

export function NavBlogs() {
  const { isMobile } = useSidebar()

  const [blogSites, setBlogSites] = useState<BlogSite[]>([])

  const handleGetBlogSites = async () => {
    try {
      const response = await getBlogSites();
      if (response.status !== 'success') {
        throw new Error("Network response was not ok");
      }

      setBlogSites(response.data);
    } catch (error) {
      console.error("Error fetching blog sites:", error)
    }
  }

  useEffect(() => {
    handleGetBlogSites()
  }, [])

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Blogs</SidebarGroupLabel>
      <SidebarMenu>
        {blogSites.map((item) => (
          <SidebarMenuItem key={item._id}>
            <SidebarMenuButton asChild>
              <Link to={`/blog/${item.endpoint}/posts`}>
                <CircleSmall />
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction showOnHover>
                  <MoreHorizontal />
                  <span className="sr-only">More</span>
                </SidebarMenuAction>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-48 rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align={isMobile ? "end" : "start"}
              >
                <DropdownMenuItem>
                  <Folder className="text-muted-foreground" />
                  <span>View Project</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Forward className="text-muted-foreground" />
                  <span>Share Project</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Trash2 className="text-muted-foreground" />
                  <span>Delete Project</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}

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
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useLocation } from "react-router-dom";

interface MainLayoutProps {
  children: React.ReactNode
}

const generateBreadcrumbs = (pathname: string) => {
  // Split path into segments
  const segments = pathname.split("/").filter(Boolean);

  // Build breadcrumb items
  return segments.map((segment, idx) => {
    const path = "/" + segments.slice(0, idx + 1).join("/");
    // Convert segment to readable text (capitalize)
    const name = segment.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    return { name, path };
  });
};

const MainLayout = ({ children }: MainLayoutProps) => {
  const { pathname } = useLocation();
  const breadcrumbs = generateBreadcrumbs(pathname);

  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                {breadcrumbs.map((crumb, idx) => {
                  const isLast = idx === breadcrumbs.length - 1;
                  return (
                    <>
                      <BreadcrumbItem className={isLast ? "" : "hidden md:block"}>
                        {isLast ? (
                          <BreadcrumbPage>{crumb.name}</BreadcrumbPage>
                        ) : (
                          <BreadcrumbLink href={crumb.path}>{crumb.name}</BreadcrumbLink>
                        )}
                      </BreadcrumbItem>
                      {!isLast && <BreadcrumbSeparator className="hidden md:block" />}
                    </>
                  );
                })}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <Separator className="mb-4" />

        <div className="pl-5">{children}</div>
      </SidebarInset>
    </SidebarProvider>)
}

export default MainLayout

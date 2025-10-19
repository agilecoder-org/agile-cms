
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import thumbnailPlaceholder from "@/assets/images/thumbnail-placeholder.jpg";
import { Badge } from "@/components/ui/badge";
import { Post } from "@/types/post";
import { PostActions } from "./PostActions";

interface ColumnsProps {
  fetchPosts: () => void;
  endpoint: string;
}

export const columns = ({ fetchPosts, endpoint }: ColumnsProps): ColumnDef<Post>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "thumbnail",
    header: "Thumbnail",
    cell: ({ row }) => {
      const thumbnail = row.getValue("thumbnail") as string;
      return (
        <div className="flex items-center justify-center">
          <img
            src={thumbnail || thumbnailPlaceholder}
            alt={`Thumbnail for ${row.getValue("title")}`}
            className="h-12 w-16 rounded object-cover"
          />
        </div>
      )
    },
    enableSorting: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="font-medium w-64 whitespace-normal">
        <p>{row.getValue("title")}</p>
      </div>
    ),
  },
  {
    accessorKey: "author",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Author
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const author = row.getValue("author") as { username: string };
      return <div className="text-left ml-3">{author.username}</div>;
    },
  },
  {
    accessorKey: "reviewer",
    header: "Reviewer",
    cell: ({ row }) => <div>{row.getValue("reviewer")}</div>,
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="whitespace-nowrap"
        >
          Last Updated
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("updatedAt"));
      return (
        <div className="ml-3">
          {date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </div>
      );
    },
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      const category = row.getValue("category") as { name: string };
      return <div>{category.name}</div>
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <Badge
          className={
            status === "published"
              ? "bg-green-500"
              : status === "draft"
                ? "bg-yellow-500"
                : "bg-gray-500"
          }
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "views",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="whitespace-nowrap"
        >
          Views
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const views = parseInt(row.getValue("views"));
      return <div className="text-center">{views.toLocaleString()}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const post = row.original;
      return <PostActions post={post} onRefetch={() => fetchPosts()} endpoint={endpoint} />;
    },
  },
];
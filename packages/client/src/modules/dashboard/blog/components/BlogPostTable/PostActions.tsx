import { Post } from "@/types/post";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { changePostStatus, deletePost } from "@/services/posts";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface PostActionsProps {
  post: Post;
  onRefetch?: () => void;
  endpoint: string
}

export function PostActions({ post, onRefetch, endpoint }: PostActionsProps) {
  const navigate = useNavigate();

  const handleUpdateStatus = async (status: "draft" | "published" | "archived") => {
    try {
      await changePostStatus(post._id as string, status);
      toast.success(`Post ${status === "archived" ? "archived" : `${status}ed`} successfully`);
      onRefetch?.();
    } catch (error) {
      toast.error("Failed to update post status.");
    }
  };

  const handleDelete = async () => {
    try {
      await deletePost(post._id as string);
      toast.success("Post deleted successfully");
      onRefetch?.();
    } catch (error) {
      toast.error("Failed to delete post.");
    }
  };

  const handleCopyId = () => {
    navigator.clipboard.writeText(post._id as string);
    toast.info("Post ID copied to clipboard");
  };

  const handleEditPost = () => {
    console.log(post)
    navigate(`/blog/${endpoint}/post/edit/${post._id}`)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem onClick={handleCopyId}>Copy post ID</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleEditPost}>Edit post</DropdownMenuItem>
        <DropdownMenuItem onClick={() => console.log("View analytics clicked")}>View analytics</DropdownMenuItem>

        {post.status === "draft" && (
          <DropdownMenuItem onClick={() => handleUpdateStatus("published")}>
            Publish
          </DropdownMenuItem>
        )}
        {post.status === "published" && (
          <DropdownMenuItem onClick={() => handleUpdateStatus("draft")}>
            Unpublish
          </DropdownMenuItem>
        )}
        {post.status !== "archived" && (
          <DropdownMenuItem onClick={() => handleUpdateStatus("archived")}>
            Archive
          </DropdownMenuItem>
        )}

        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleDelete} className="text-red-600">
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

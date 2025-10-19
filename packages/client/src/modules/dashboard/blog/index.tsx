import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CategoryModal } from "@/components/categories-modal";

import {
  Category,
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} from "@/services/category";
import BlogPostTable from "./components/BlogPostTable";

const Blog = () => {
  const { endpoint } = useParams<{ endpoint: string }>();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!endpoint) return;
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getCategories(endpoint);
        setCategories(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load categories.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [endpoint]);

  const handleCreate = async (data: Omit<Category, "id">) => {
    try {
      const newCat = await createCategory(data);
      setCategories((prev) => [...prev, newCat]);
    } catch (err) {
      console.error(err);
      setError("Failed to create category.");
    }
  };

  const handleUpdate = async (id: string, data: Omit<Category, "id">) => {
    try {
      const updated = await updateCategory(id, data);
      setCategories((prev) =>
        prev.map((cat) => (cat._id === id ? updated : cat))
      );
    } catch (err) {
      console.error(err);
      setError("Failed to update category.");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteCategory(id);
      setCategories((prev) => prev.filter((cat) => cat._id !== id));
    } catch (err) {
      console.error(err);
      setError("Failed to delete category.");
    }
  };

  return (
    <div className="pr-3">
      <div className="flex items-center justify-end gap-5 pb-4">
        <CategoryModal
          endpoint={endpoint || ""}
          categories={categories}
          onCreate={handleCreate as any}
          onUpdate={handleUpdate as any}
          onDelete={handleDelete}
        />
        <Button onClick={() => navigate(`/blog/${endpoint}/post/new`)}>
          <Plus className="mr-2 h-4 w-4" />
          New Post
        </Button>
      </div>

      {error && <p className="text-red-500">{error}</p>}
      {loading ? (
        <p className="text-sm text-muted-foreground">Loading categories...</p>
      ) : (
        <BlogPostTable endpoint={endpoint || ""} />
      )}
    </div>
  );
};

export default Blog;

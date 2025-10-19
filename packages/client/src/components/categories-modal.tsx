import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil, Trash2 } from "lucide-react";
import { Label } from "@/components/ui/label";

type Category = {
  _id: string;
  name: string;
  blog: string;
};

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  blog: z.string(),
});

type Props = {
  endpoint: string;
  categories: Category[];
  onCreate: (data: Omit<Category, "id">) => Promise<void> | void;
  onUpdate: (id: string, data: Omit<Category, "id">) => Promise<void> | void;
  onDelete: (id: string) => Promise<void> | void;
};

export const CategoryModal = ({
  endpoint,
  categories,
  onCreate,
  onUpdate,
  onDelete,
}: Props) => {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      blog: endpoint,
    },
  });

  useEffect(() => {
    form.reset({
      name: editing?.name || "",
      blog: endpoint,
    });
  }, [editing, endpoint]);

  const handleSubmit = async (data: z.infer<typeof schema>) => {
    try {
      setLoading(true);
      if (editing) {
        await onUpdate(editing._id, data as any);
      } else {
        await onCreate(data as any);
      }
      // Reset form and state
      form.reset({ name: "", blog: endpoint });
      setEditing(null);
    } catch (err) {
      console.error("Failed to save category", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setDeletingId(id);
      await onDelete(id);
      if (editing?._id === id) {
        setEditing(null);
        form.reset({ name: "", blog: endpoint });
      }
    } catch (err) {
      console.error("Failed to delete category", err);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(val) => {
      setOpen(val);
      if (!val) {
        setEditing(null);
        form.reset({ name: "", blog: endpoint });
      }
    }}>
      <DialogTrigger asChild>
        <Button variant="outline">Categories</Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl w-full">
        <DialogHeader>
          <DialogTitle>Manage Categories</DialogTitle>
        </DialogHeader>
        <div className="flex gap-6 pt-4">
          {/* Left: Category List */}
          <div className="w-1/2 border-r pr-4 space-y-3">
            {categories.map((cat) => (
              <div key={cat._id} className="flex justify-between items-center border p-2 rounded-md">
                <span>{cat.name}</span>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setEditing(cat)}
                    disabled={loading || deletingId !== null}
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(cat._id)}
                    disabled={deletingId === cat._id || loading}
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Form */}
          <div className="w-1/2 space-y-4">
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
              <div>
                <Label className="mb-2">Name</Label>
                <Input {...form.register("name")} placeholder="Category name" disabled={loading} />
                {form.formState.errors.name && (
                  <p className="text-red-500 text-sm">{form.formState.errors.name.message}</p>
                )}
              </div>

              <div>
                <Label className="mb-2">Blog</Label>
                <Input value={endpoint} readOnly />
              </div>

              <div className="flex gap-2">
                <Button type="submit" disabled={loading}>
                  {loading ? (editing ? "Updating..." : "Creating...") : editing ? "Update" : "Create"}
                </Button>
                {editing && (
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => {
                      setEditing(null);
                      form.reset({ name: "", blog: endpoint });
                    }}
                    disabled={loading}
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

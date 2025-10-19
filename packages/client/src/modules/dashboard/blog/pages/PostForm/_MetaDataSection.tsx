import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ComboboxDemo, ComboboxOption } from "@/components/dropdown-with-search";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent } from "@/components/ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { cn } from "@/lib/utils";
import { CalendarIcon, Image } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import useAuth from "@/zustand/authStore";
import { Category, getCategories } from "@/services/category";
import { usePostEditorStore } from "@/zustand/usePostEditorStore";

interface MetaDataSectionProps {
  endpoint: string | undefined;
  onPublish: () => void;
  loading: boolean;
}

const MetaDataSection: React.FC<MetaDataSectionProps> = ({
  endpoint,
  onPublish,
  loading,
}) => {
  const {
    blogPost,
    date,
    setTitle,
    setSlug,
    setDescription,
    setHeaderImage,
    setCategory,
    setFeatured,
    setDate,
  } = usePostEditorStore();

  const { user }: any = useAuth();

  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories(endpoint);
        setCategories(data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
  
    fetchCategories();

    if (blogPost.category) {
      console.log(blogPost)
      setSelectedCategory((blogPost.category as any)._id);
    }
  }, [endpoint]);
  
  useEffect(() => {
    if (selectedCategory) {
      setCategory(selectedCategory);
    }
  }, [selectedCategory]);

  const categoryOptions: ComboboxOption[] = categories.map((cat) => ({
    value: cat._id,
    label: cat.name,
  }));

  return (
    <div className="space-y-4 h-[calc(100vh-100px)] overflow-auto">
      {/* Post Settings */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-medium">Post Settings</h3>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                type="text"
                placeholder="Enter post title"
                value={blogPost.title || ""}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <Badge className="bg-yellow-500 capitalize">{blogPost.status}</Badge>

            <ComboboxDemo
              fullWidth
              placeholder="Select category..."
              options={categoryOptions}
              value={selectedCategory}
              onChange={setSelectedCategory}
            />

            <label className="block text-sm font-medium mb-1">Author</label>
            <p>{user.id}</p>
          </div>
        </CardContent>
      </Card>

      {/* Featured Image */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-medium">Featured Image</h3>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Input
              type="text"
              placeholder="Paste image URL..."
              value={blogPost.header_img_url || ""}
              onChange={(e) => setHeaderImage(e.target.value)}
            />
            <div className="border-[1px] border-dashed rounded-md p-6 text-center">
              <Image className="mx-auto h-12 w-12 text-gray-400" />
              <Button variant="outline" size="sm" className="mt-5">
                Upload Image
              </Button>
              <p className="text-xs text-gray-500 mt-2">
                Recommended: 1200x630px, JPEG or PNG
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* SEO Settings */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-medium">SEO Settings</h3>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>Slug</Label>
              <div className="flex items-center">
                <span className="text-gray-500 mr-1">yourblog.com/</span>
                <Input
                  type="text"
                  placeholder="slug-for-post"
                  value={blogPost.slug || ""}
                  onChange={(e) => setSlug(e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>

            <div>
              <Label>Description</Label>
              <Textarea
                placeholder="Meta description for search engines"
                className="w-full"
                value={blogPost.description || ""}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
              <p className="text-xs text-gray-500 mt-1">
                {blogPost.description?.length || 0}/160 characters
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Publishing Settings */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-medium">Publishing</h3>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>Schedule Publish Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="featured"
                checked={blogPost.is_featured}
                onCheckedChange={(checked) => setFeatured(!!checked)}
              />
              <Label htmlFor="featured">Featured Post</Label>
            </div>

            <div className="pt-4 flex justify-start">
              <Button variant="outline" className="mr-2">
                Preview
              </Button>
              <Button
                variant="default"
                className="ml-2"
                onClick={onPublish}
                disabled={loading}
              >
                {loading ? "Publishing..." : "Publish"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MetaDataSection;

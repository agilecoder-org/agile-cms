import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Post } from "@/types/post";
import initialValue from "@/modules/dashboard/blog/components/EditorWrapper/data-blocks";

interface PostEditorStore {
  blogPost: Post;
  date?: Date;
  loading: boolean;
  setBlogPost: (post: Partial<Post>) => void;
  setDate: (date?: Date) => void;
  setLoading: (loading: boolean) => void;
  reset: () => void;

  setTitle: (title: string) => void;
  setSlug: (slug: string) => void;
  setDescription: (desc: string) => void;
  setHeaderImage: (url: string) => void;
  setCategory: (cat: string) => void;
  setFeatured: (featured: boolean) => void;
  setContent: (content: any) => void;
  setEndpoint: (endpoint: string) => void;
}

const initialPost: Post = {
  endpoint: "",
  title: "The Future of Web Development",
  slug: "future-of-web-development",
  description: "",
  content: initialValue,
  header_img_url: "",
  category: "",
  status: "draft",
  is_featured: false,
  is_scheduled: false,
}

export const usePostEditorStore = create<PostEditorStore>()(
  persist(
    (set) => ({
      blogPost: initialPost,
      date: undefined,
      loading: false,

      setBlogPost: (post) =>
        set((state) => ({ blogPost: { ...state.blogPost, ...post } })),
      setDate: (date) => set(() => ({ date })),
      setLoading: (loading) => set(() => ({ loading })),
      reset: () => set(() => ({ blogPost: initialPost, date: undefined, loading: false })),

      setTitle: (title) => set((state) => ({ blogPost: { ...state.blogPost, title } })),
      setSlug: (slug) => set((state) => ({ blogPost: { ...state.blogPost, slug } })),
      setDescription: (description) =>
        set((state) => ({ blogPost: { ...state.blogPost, description } })),
      setHeaderImage: (header_img_url) =>
        set((state) => ({ blogPost: { ...state.blogPost, header_img_url } })),
      setCategory: (category) =>
        set((state) => ({ blogPost: { ...state.blogPost, category } })),
      setFeatured: (is_featured) =>
        set((state) => ({ blogPost: { ...state.blogPost, is_featured } })),

      setContent: (content) => set((state) => ({ blogPost: { ...state.blogPost, content } })),
      setEndpoint: (endpoint) => set((state) => ({ blogPost: { ...state.blogPost, endpoint } })),
    }),
    {
      name: "post-editor-storage",
    }
  )
);

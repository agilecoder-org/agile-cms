import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { usePostEditorStore } from "@/zustand/usePostEditorStore";

const AUTO_SAVE_INTERVAL = 10000; // 10 seconds

const useAutoSave = (postId: string, endpoint: string | undefined) => {
  const { blogPost, setSlug, setTitle, setDescription, setHeaderImage, setCategory, setFeatured, setDate } = usePostEditorStore();
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  const prevData = useRef(JSON.stringify(blogPost));

  useEffect(() => {
    const interval = setInterval(async () => {
      const currentData = JSON.stringify(blogPost);
      if (currentData !== prevData.current) {
        setSaving(true);
        try {
          await axios.patch(`/api/posts/${postId}`, {
            title: blogPost.title,
            slug: blogPost.slug,
            description: blogPost.description,
            content: blogPost.content,
            header_img_url: blogPost.header_img_url,
            category: blogPost.category,
            is_featured: blogPost.is_featured,
            scheduled_date: blogPost.scheduled_date,
          });
          prevData.current = currentData;
          setLastSaved(new Date());
        } catch (err) {
          console.error("Auto-save failed:", err);
        } finally {
          setSaving(false);
        }
      }
    }, AUTO_SAVE_INTERVAL);

    return () => clearInterval(interval);
  }, [blogPost, postId]);

  return { saving, lastSaved };
};

export default useAutoSave;
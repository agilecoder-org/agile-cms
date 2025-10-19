import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MetaDataSection from "./_MetaDataSection";
import EditorWrapper from "../../components/EditorWrapper";
import { createPost, getPostById, editPost } from "@/services/posts";
import { toast } from "sonner";
import { usePostEditorStore } from "@/zustand/usePostEditorStore";

const PostForm = () => {
  const { endpoint = "", id } = useParams<{ endpoint: string; id?: string }>();
  const navigate = useNavigate();

  const {
    blogPost,
    setContent,
    setEndpoint,
    setBlogPost,
    setLoading,
    loading,
    reset,
  } = usePostEditorStore();

  useEffect(() => {
    setEndpoint(endpoint);

    const fetchPost = async () => {
      if (!id) return;

      setLoading(true);
      try {
        const post = await getPostById(id);
        setBlogPost(post.data);
      } catch (error) {
        console.error("Failed to load post:", error);
        toast.error("Error loading post");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [endpoint, id]);

  const handlePublish = async () => {
    setLoading(true);

    try {
      if (id) {
        console.log(blogPost)
        const postSubmitData: any = {
          title: blogPost.title,
          endpoint: blogPost.endpoint,
          slug: blogPost.slug,
          description: blogPost.description,
          content: blogPost.content,
          status: blogPost.status,
          category: blogPost.category,
          is_featured: blogPost.is_featured,
          is_scheduled: blogPost.is_scheduled,
          scheduled_date: blogPost.scheduled_date,
          published_on: blogPost.published_on,
        }

        await editPost(id, postSubmitData);
        toast.success("Post updated successfully.");
      } else {
        await createPost(blogPost);
        toast.success("Post has been saved as draft", {
          description: "You can publish it later or publish it now.",
        });
      }

      reset();
      navigate(`/blog/${endpoint}/posts`);
    } catch (error: any) {
      console.error("Error publishing post:", error);
      toast.error("Failed to publish post", {
        description:
          error?.response?.data?.message || "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-3 gap-4 pr-3 pb-3">
      <div className="col-span-2">
        <EditorWrapper content={blogPost.content} setContent={setContent} />
      </div>

      <MetaDataSection
        endpoint={endpoint}
        onPublish={handlePublish}
        loading={loading}
      />
    </div>
  );
};

export default PostForm;

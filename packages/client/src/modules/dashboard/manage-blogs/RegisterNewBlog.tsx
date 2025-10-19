import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Mail, Globe, FileText, LinkIcon, ListChecks } from "lucide-react";
import { createBlogSite } from "@/services/manage-blogs/newBlog";

const RegisterNewBlog = () => {
  const devEnv = import.meta.env.VITE_ENV;
  const devMode = devEnv === "development";
  const prodHost = import.meta.env.VITE_PROD_HOST;

  const [form, setForm] = useState({
    title: "",
    domain: "",
    description: "",
    endpoint: "",
    contact_mail: "",
    meta_title: "",
    meta_description: "",
    meta_keywords: "",
    category: "",
    language: "",
    index: true,
    canonical_url: "",
  });

  const handleChange = (field: string, value: string | boolean) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        ...form,
        endpoint: form.endpoint.toLowerCase(),
      };

      await createBlogSite(payload);

      alert("Blog created successfully!");
      setForm({
        title: "",
        domain: "",
        description: "",
        endpoint: "",
        contact_mail: "",
        meta_title: "",
        meta_description: "",
        meta_keywords: "",
        category: "",
        language: "",
        index: true,
        canonical_url: "",
      });
    } catch (error) {
      console.error("Error creating blog:", error);
      alert("Failed to create blog. Please try again!");
    }
  };

  return (
    <div className="mr-5 mb-10">
      <h3 className="font-bold text-3xl mb-6">Register a New Blog</h3>

      {/* Site Info */}
      <Card className="shadow-xl">
        <CardHeader>
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Globe className="w-5 h-5" /> Site Information
          </h2>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Site Name</Label>
            <Input
              type="text"
              value={form.title}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder="Enter your blog name"
              className="mt-2"
            />
          </div>
          <div>
            <Label>Domain</Label>
            <Input
              type="text"
              value={form.domain}
              onChange={(e) => handleChange("domain", e.target.value)}
              placeholder="yourblog.com"
              className="mt-2"
            />
          </div>
          <div className="col-span-full">
            <Label>Description</Label>
            <Textarea
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Short blog description"
              className="mt-2"
            />
          </div>
          <div>
            <Label>API Endpoint</Label>
            <div className="flex items-center gap-2">
              <Input
                type="text"
                value={form.endpoint}
                onChange={(e) => handleChange("endpoint", e.target.value)}
                placeholder="yourblog"
                className="mt-2"
              />
              <span className="text-sm">.{devMode ? "localhost" : prodHost}</span>
            </div>
          </div>
          <div>
            <Label>Contact Email</Label>
            <div className="flex items-center">
              <Mail className="w-4 h-4 mr-2" />
              <Input
                type="email"
                value={form.contact_mail}
                onChange={(e) => handleChange("contact_mail", e.target.value)}
                placeholder="support@yourblog.com"
                className="mt-2"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* SEO Settings */}
      <Card className="mt-6 shadow-xl">
        <CardHeader>
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <FileText className="w-5 h-5" /> SEO Settings
          </h2>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="col-span-full">
            <Label>Meta Title</Label>
            <Input
              type="text"
              value={form.meta_title}
              onChange={(e) => handleChange("meta_title", e.target.value)}
              placeholder="Search engine title"
              className="mt-2"
            />
            <p className="text-xs text-gray-500 mt-1">
              Recommended length: 50–60 characters
            </p>
          </div>
          <div className="col-span-full">
            <Label>Meta Description</Label>
            <Textarea
              value={form.meta_description}
              onChange={(e) => handleChange("meta_description", e.target.value)}
              placeholder="Description for search engines"
              className="mt-2"
            />
            <p className="text-xs text-gray-500 mt-1">
              Recommended length: 150–160 characters
            </p>
          </div>
          <div className="col-span-full">
            <Label>Keywords</Label>
            <Input
              type="text"
              value={form.meta_keywords}
              onChange={(e) => handleChange("meta_keywords", e.target.value)}
              placeholder="keyword1, keyword2, keyword3"
              className="mt-2"
            />
            <p className="text-xs text-gray-500 mt-1">
              Separate with commas (5–10 keywords recommended)
            </p>
          </div>
          <div>
            <Label>Primary Category</Label>
            <Select onValueChange={(value) => handleChange("category", value)}>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="business">Business</SelectItem>
                <SelectItem value="lifestyle">Lifestyle</SelectItem>
                <SelectItem value="travel">Travel</SelectItem>
                <SelectItem value="food">Food</SelectItem>
                <SelectItem value="health">Health & Fitness</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
                <SelectItem value="education">Education</SelectItem>
                <SelectItem value="entertainment">Entertainment</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Language</Label>
            <Select onValueChange={(value) => handleChange("language", value)}>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Spanish</SelectItem>
                <SelectItem value="fr">French</SelectItem>
                <SelectItem value="de">German</SelectItem>
                <SelectItem value="zh">Chinese</SelectItem>
                <SelectItem value="ja">Japanese</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="col-span-full flex items-center gap-2">
            <Checkbox
              id="index"
              checked={form.index}
              onCheckedChange={(checked) => handleChange("index", Boolean(checked))}
            />
            <label htmlFor="index">
              Allow search engines to index this blog
            </label>
          </div>
          <div className="col-span-full">
            <Label>Canonical URL</Label>
            <div className="flex items-center">
              <LinkIcon className="w-4 h-4 mr-2" />
              <Input
                type="text"
                value={form.canonical_url}
                onChange={(e) => handleChange("canonical_url", e.target.value)}
                placeholder="https://example.com"
                className="mt-2"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Use only if this is a secondary version of an existing blog
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="mt-6 flex items-center gap-2">
        <Checkbox id="terms" />
        <label htmlFor="terms" className="text-sm">
          I agree to the
          <a href="#" className="text-blue-600 hover:underline px-1">Terms of Service</a>
          and
          <a href="#" className="text-blue-600 hover:underline px-1">Privacy Policy</a>
        </label>
      </div>

      <div className="mt-6">
        <Button size="lg" onClick={handleSubmit} className="w-full md:w-auto">
          <ListChecks className="mr-2 w-4 h-4" /> Register Blog
        </Button>
      </div>
    </div>
  );
};

export default RegisterNewBlog;

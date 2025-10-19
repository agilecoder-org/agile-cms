import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Copy, Eye, Plus, Trash } from "lucide-react";

import { getBlogSites } from "@/services/manage-blogs/newBlog";
import { BlogSite } from "@/types/blogSite";

import { createApiKey, deleteApiKey, getApiKeysByBlog } from "@/services/api-keys";
import { toast } from "sonner";

const copyToClipboard = (text: string) => navigator.clipboard.writeText(text);

const ApiSettings = () => {
  const [selectedTab, setSelectedTab] = useState("endpoints");

  useEffect(() => {
    const storedTab = localStorage.getItem("api-settings-tab");
    if (storedTab) {
      setSelectedTab(storedTab);
    }
  }, []);

  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
    localStorage.setItem("api-settings-tab", tab);
  };

  return (
    <div className="mr-5 mb-5">
      <h3 className="font-bold text-2xl mb-5">API Settings</h3>
      <Tabs value={selectedTab} onValueChange={handleTabChange}>
        <TabsList className="mb-4">
          <TabsTrigger value="endpoints">Blog Endpoints</TabsTrigger>
          <TabsTrigger value="keys">API Keys</TabsTrigger>
          <TabsTrigger value="docs">Documentation</TabsTrigger>
        </TabsList>
        <EndPointsSection />
        <APIKeysSection />
        <DocumentationSection />
      </Tabs>
    </div>
  );
};

const EndPointsSection = () => {
  const [blogs, setBlogs] = useState<BlogSite[]>([]);
  const [testingStatus, setTestingStatus] = useState<Record<string, "idle" | "loading" | "success" | "error">>({});

  const handleGetBlogSites = async () => {
    try {
      const response = await getBlogSites();
      if (response.status === "success") {
        setBlogs(response.data);
      }
    } catch (error) {
      console.error("Error fetching blog sites:", error);
    }
  };

  const handleTestConnection = async (blog: BlogSite) => {
    setTestingStatus((prev) => ({ ...prev, [blog._id]: "loading" }));

    try {
      const url = blog.endpoint.endsWith("/")
        ? `${blog.endpoint}health`
        : `${blog.endpoint}/health`;

      const response = await fetch(url);

      if (response.ok) {
        toast.success(`Connection to "${blog.title}" successful.`);
        setTestingStatus((prev) => ({ ...prev, [blog._id]: "success" }));
      } else {
        throw new Error(`HTTP ${response.status}`);
      }
    } catch (error) {
      console.error("Connection test failed:", error);
      toast.error(`Failed to connect to "${blog.title}".`);
      setTestingStatus((prev) => ({ ...prev, [blog._id]: "error" }));
    }

    // Reset to idle after a delay
    setTimeout(() => {
      setTestingStatus((prev) => ({ ...prev, [blog._id]: "idle" }));
    }, 3000);
  };

  useEffect(() => {
    handleGetBlogSites();
  }, []);

  return (
    <TabsContent value="endpoints">
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">Available Blog Endpoints</h2>
          <p className="text-sm text-muted-foreground">
            Access and manage your blogs via these API endpoints.
          </p>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Blog</TableHead>
                <TableHead>Endpoint</TableHead>
                <TableHead>Status</TableHead>
                <TableHead style={{ width: "180px" }} className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {blogs.map((blog) => (
                <TableRow key={blog._id}>
                  <TableCell>{blog.title}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <span>{blog.endpoint}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="ml-2"
                        onClick={() => copyToClipboard(blog.endpoint)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={blog.status === "active" ? "default" : "secondary"}>
                      {blog.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-[140px]" // consistent button width
                      disabled={testingStatus[blog._id] === "loading"}
                      onClick={() => handleTestConnection(blog)}
                    >
                      {testingStatus[blog._id] === "loading"
                        ? "Testing..."
                        : testingStatus[blog._id] === "success"
                          ? "✅ Success"
                          : testingStatus[blog._id] === "error"
                            ? "❌ Failed"
                            : "Test Connection"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

const APIKeysSection = () => {
  const [blogs, setBlogs] = useState<BlogSite[]>([]);
  const [apiKeysMap, setApiKeysMap] = useState<Record<string, any[]>>({});
  const [showKeyMap, setShowKeyMap] = useState<Record<string, boolean>>({});
  const [viewingKey, setViewingKey] = useState<{ name: string; key: string } | null>(null);

  const [newKeyName, setNewKeyName] = useState("");
  const [origin, setOrigin] = useState("");
  const [activeBlog, setActiveBlog] = useState<BlogSite | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getBlogSites();
        if (response.status === "success") {
          setBlogs(response.data);
          for (const blog of response.data) {
            await fetchApiKeysForBlog(blog.endpoint, blog._id);
          }
        }
      } catch (error) {
        console.error("Failed to fetch blogs", error);
        toast.error("Failed to load blogs.");
      }
    };
    fetchData();
  }, []);

  const fetchApiKeysForBlog = async (endpoint: string, blogId: string) => {
    try {
      const { data } = await getApiKeysByBlog(endpoint);
      setApiKeysMap((prev) => ({ ...prev, [blogId]: data }));
    } catch (error) {
      console.error("Failed to fetch API keys", error);
      toast.error(`Failed to load API keys for blog: ${endpoint}`);
    }
  };

  const handleCreateKey = async () => {
    if (!activeBlog) return;
    if (!newKeyName) return toast.error("Key name is required.");

    try {
      const { data } = await createApiKey(newKeyName, activeBlog.endpoint, origin);
      setApiKeysMap((prev) => ({
        ...prev,
        [activeBlog._id]: [...(prev[activeBlog._id] || []), data],
      }));
      toast.success("API key created successfully.");
    } catch (error: any) {
      console.error("Error creating API key:", error);
      toast.error("Failed to create API key", {
        description: error.message || "Try again later.",
      });
    } finally {
      setNewKeyName("");
      setOrigin("");
      setActiveBlog(null);
    }
  };

  const handleDeleteKey = async (keyId: string, blogId: string) => {
    try {
      await deleteApiKey(keyId);
      setApiKeysMap((prev) => ({
        ...prev,
        [blogId]: (prev[blogId] || []).filter((k) => k._id !== keyId),
      }));
      toast.success("API key deleted.");
    } catch (error: any) {
      console.error("Error deleting API key:", error);
      toast.error("Failed to delete API key", {
        description: error.message || "Try again later.",
      });
    }
  };

  return (
    <TabsContent value="keys">
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">API Keys</h2>
          <p className="text-sm text-muted-foreground">
            Manage keys per blog for secure API access.
          </p>
        </CardHeader>
        <CardContent className="space-y-8">
          {blogs.map((blog) => (
            <div key={blog._id} className="border-t pt-4">
              <h3 className="font-semibold text-lg mb-2">{blog.title}</h3>

              {/* Create API Key Dialog */}
              <div className="mb-4">
                <Dialog
                  open={activeBlog?._id === blog._id}
                  onOpenChange={(open) =>
                    setActiveBlog(open ? blog : null)
                  }
                >
                  <DialogTrigger asChild>
                    <Button
                      size="sm"
                      onClick={() => {
                        setNewKeyName("");
                        setOrigin("");
                        setActiveBlog(blog);
                      }}
                    >
                      <Plus className="mr-1 w-4 h-4" />
                      Create API Key
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>New API Key for {blog.title}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-3 py-4">
                      <Label>Key Name</Label>
                      <Input
                        placeholder="e.g. Production, Testing"
                        value={newKeyName}
                        onChange={(e) => setNewKeyName(e.target.value)}
                      />
                      <Label>Allowed Origin</Label>
                      <Input
                        placeholder="e.g. https://client.com"
                        value={origin}
                        onChange={(e) => {
                          const url = e.target.value
                          setOrigin(url)
                        }}
                      />
                    </div>
                    <DialogFooter>
                      <Button onClick={handleCreateKey}>Generate</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              {/* API Keys Table */}
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[150px]">Name</TableHead>
                    <TableHead className="w-[300px]">Key</TableHead>
                    <TableHead className="w-[250px]">Origin</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Last Used</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {(apiKeysMap[blog._id] || []).map((key) => (
                    <TableRow key={key._id}>
                      <TableCell>{key.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <span className="font-mono text-sm">
                            {showKeyMap[key._id]
                              ? key.key
                              : key.key.slice(0, 8) + "••••••••••"}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="ml-2 h-6 w-6"
                            onClick={() => setViewingKey({ name: key.name, key: key.key })}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="ml-1 h-6 w-6"
                            onClick={() => {
                              copyToClipboard(key.key);
                              toast.success("API key copied to clipboard.");
                            }}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>
                        <code className="text-xs text-muted-foreground">{key.origin || "-"}</code>
                      </TableCell>
                      <TableCell>{new Date(key.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell>
                        {key.lastUsed
                          ? new Date(key.lastUsed).toLocaleDateString()
                          : "-"}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleDeleteKey(key._id, blog._id)}
                        >
                          <Trash className="h-4 w-4 text-red-500" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ))}
        </CardContent>
      </Card>

      {viewingKey && (
        <Dialog open={!!viewingKey} onOpenChange={() => setViewingKey(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{viewingKey.name}</DialogTitle>
              <p className="text-sm text-muted-foreground">Here is your full API key:</p>
            </DialogHeader>
            <div className="bg-muted px-3 py-2 rounded-md">
              <code className="text-sm break-all font-mono">{viewingKey.key}</code>
            </div>
            <DialogFooter className="mt-4">
              <Button
                variant="outline"
                onClick={() => {
                  copyToClipboard(viewingKey.key);
                  toast.success("API key copied to clipboard.");
                }}
              >
                Copy Key
              </Button>
              <Button onClick={() => setViewingKey(null)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </TabsContent>
  );
};

const DocumentationSection = () => (
  <TabsContent value="docs">
    <Card>
      <CardHeader>
        <h2 className="text-lg font-semibold">API Documentation</h2>
        <p className="text-sm text-muted-foreground">
          Learn how to use our blog API
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="font-medium">Authentication</h3>
            <p className="text-sm">
              Include your API key in requests:
            </p>
            <pre className="bg-gray-800 text-white p-3 rounded mt-2 text-sm">
              Authorization: Bearer ak_your_api_key_here
            </pre>
          </div>
          <div>
            <h3 className="font-medium">API Base URL</h3>
            <pre className="bg-gray-800 text-white p-3 rounded mt-2 text-sm">
              https://yourblog.agilecms.com/
            </pre>
          </div>
          <div>
            <h3 className="font-medium">Endpoints</h3>
            <div className="space-y-2 text-sm">
              <div className="mt-2">
                <code className="font-mono bg-gray-200 text-black px-2 py-1 rounded-2xl">GET /</code> - Get all posts
              </div>
              <div>
                <code className="font-mono bg-gray-200 text-black px-2 py-1 rounded-2xl">GET /:slug</code> - Get a specific post by Slug
              </div>
              <div>
                <code className="font-mono bg-gray-200 text-black px-2 py-1 rounded-2xl">GET /:id</code> - Get a specific post by ID
              </div>
            </div>
          </div>
          <Button variant="outline" className="mt-4">
            View Full Documentation
          </Button>
        </div>
      </CardContent>
    </Card>
  </TabsContent>
);

export default ApiSettings;

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Search, Plus, X, UserPlus } from "lucide-react";

const Permissions = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "Sarah Johnson", email: "sarah@example.com", role: "Admin", blogs: ["Tech Blog", "Company News"] },
    { id: 2, name: "Michael Chen", email: "michael@example.com", role: "Author", blogs: ["Tech Blog"] },
    { id: 3, name: "Priya Patel", email: "priya@example.com", role: "Editor", blogs: ["Food Recipes"] },
    { id: 4, name: "James Wilson", email: "james@example.com", role: "Author", blogs: ["Travel Journal"] },
    { id: 5, name: "Ana Rodriguez", email: "ana@example.com", role: "Admin", blogs: ["Food Recipes", "Travel Journal"] },
  ]);

  const [blogs, setBlogs] = useState([
    { id: 1, name: "Tech Blog", users: 3 },
    { id: 2, name: "Food Recipes", users: 2 },
    { id: 3, name: "Travel Journal", users: 2 },
    { id: 4, name: "Company News", users: 1 },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBlog, setSelectedBlog] = useState("");
  const [selectedRole, setSelectedRole] = useState("");

  // Filtered users based on search term and filters
  const filteredUsers = users.filter(user => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesBlog = selectedBlog ? user.blogs.includes(selectedBlog) : true;
    const matchesRole = selectedRole ? user.role === selectedRole : true;

    return matchesSearch && matchesBlog && matchesRole;
  });

  // Handler for adding a new user permission
  // const handleAddUserPermission = (email: string, blogName: string, role: string) => {
  //   // This would connect to your backend in a real application
  //   console.log(`Adding ${role} permission for ${email} to ${blogName}`);
  //   // Update UI optimistically
  //   const userIndex = users.findIndex(u => u.email === email);

  //   if (userIndex !== -1) {
  //     const updatedUsers = [...users];
  //     const user = {...updatedUsers[userIndex]};

  //     // Update role if it's a higher permission level
  //     const roleHierarchy = { "Admin": 3, "Editor": 2, "Author": 1, "Viewer": 0 };
  //     if (roleHierarchy[role] > roleHierarchy[user.role]) {
  //       user.role = role;
  //     }

  //     // Add blog if not already assigned
  //     if (!user.blogs.includes(blogName)) {
  //       user.blogs = [...user.blogs, blogName];
  //     }

  //     updatedUsers[userIndex] = user;
  //     setUsers(updatedUsers);
  //   }
  // };

  // Handler for removing a user's permission
  const handleRemovePermission = (userId: any, blogName: string) => {
    const updatedUsers = users.map(user => {
      if (user.id === userId) {
        return {
          ...user,
          blogs: user.blogs.filter(blog => blog !== blogName)
        };
      }
      return user;
    });

    setUsers(updatedUsers);
  };

  return (
    <div className="mr-5 mb-5">
      <h3 className="font-bold text-2xl mb-5">Manage Permissions</h3>

      <Tabs defaultValue="users">
        <TabsList className="mb-4">
          <TabsTrigger value="users">By Users</TabsTrigger>
          <TabsTrigger value="blogs">By Blogs</TabsTrigger>
        </TabsList>

        {/* Users Tab - Manage from a user-centric view */}
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">User Permissions</h2>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <UserPlus className="mr-2 h-4 w-4" />
                      Add New User
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New User</DialogTitle>
                      <DialogDescription>
                        Invite a new user and assign blog permissions
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div>
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" placeholder="Full Name" className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="email@example.com" className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="blog">Blog</Label>
                        <Select value="">
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select blog" />
                          </SelectTrigger>
                          <SelectContent>
                            {blogs.map(blog => (
                              <SelectItem key={blog.id} value={blog.name}>
                                {blog.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="role">Role</Label>
                        <Select value="">
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Admin">Admin</SelectItem>
                            <SelectItem value="Editor">Editor</SelectItem>
                            <SelectItem value="Author">Author</SelectItem>
                            <SelectItem value="Viewer">Viewer</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Invite User</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="flex items-center gap-4 mt-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Search users by name or email..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <Select value={selectedBlog} onValueChange={setSelectedBlog}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by blog" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Blogs</SelectItem>
                    {blogs.map(blog => (
                      <SelectItem key={blog.id} value={blog.name}>
                        {blog.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedRole} onValueChange={setSelectedRole}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Editor">Editor</SelectItem>
                    <SelectItem value="Author">Author</SelectItem>
                    <SelectItem value="Viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>

                {(selectedBlog || selectedRole || searchTerm) && (
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setSelectedBlog("");
                      setSelectedRole("");
                      setSearchTerm("");
                    }}
                  >
                    Clear Filters
                    <X className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardHeader>

            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Blog Access</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map(user => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              user.role === "Admin" ? "destructive" :
                              user.role === "Editor" ? "default" :
                              user.role === "Author" ? "secondary" : "outline"
                            }
                          >
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {user.blogs.map(blog => (
                              <div key={blog} className="flex items-center">
                                <Badge variant="outline" className="mr-1">
                                  {blog}
                                </Badge>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-5 w-5"
                                  onClick={() => handleRemovePermission(user.id, blog)}
                                >
                                  <X className="h-3 w-3" />
                                </Button>
                              </div>
                            ))}

                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-6">
                                  <Plus className="h-3 w-3 mr-1" />
                                  Add
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Add Blog Access</DialogTitle>
                                  <DialogDescription>
                                    Grant {user.name} access to additional blogs
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                  <div>
                                    <Label>Blog</Label>
                                    <Select>
                                      <SelectTrigger className="mt-1">
                                        <SelectValue placeholder="Select blog" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {blogs
                                          .filter(blog => !user.blogs.includes(blog.name))
                                          .map(blog => (
                                            <SelectItem key={blog.id} value={blog.name}>
                                              {blog.name}
                                            </SelectItem>
                                          ))}
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div>
                                    <Label>Permission Role</Label>
                                    <Select defaultValue="Author">
                                      <SelectTrigger className="mt-1">
                                        <SelectValue placeholder="Select role" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="Admin">Admin</SelectItem>
                                        <SelectItem value="Editor">Editor</SelectItem>
                                        <SelectItem value="Author">Author</SelectItem>
                                        <SelectItem value="Viewer">Viewer</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </div>
                                <DialogFooter>
                                  <Button>Add Access</Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">Edit</Button>
                            <Button variant="outline" size="sm" className="text-red-500">
                              Remove
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-4">
                        No users found matching the current filters
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Blogs Tab - Manage from a blog-centric view */}
        <TabsContent value="blogs">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Blog Access Management</h2>
              </div>

              <div className="flex items-center gap-4 mt-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Search blogs..."
                    className="pl-8"
                  />
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Blog Name</TableHead>
                    <TableHead>Total Users</TableHead>
                    <TableHead>Admins</TableHead>
                    <TableHead>Authors/Editors</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {blogs.map(blog => {
                    const blogAdmins = users.filter(user =>
                      user.blogs.includes(blog.name) && user.role === "Admin"
                    );

                    const blogAuthorsEditors = users.filter(user =>
                      user.blogs.includes(blog.name) && (user.role === "Author" || user.role === "Editor")
                    );

                    return (
                      <TableRow key={blog.id}>
                        <TableCell className="font-medium">{blog.name}</TableCell>
                        <TableCell>{blog.users}</TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-1">
                            {blogAdmins.map(admin => (
                              <div key={admin.id} className="flex items-center">
                                <span className="text-sm">{admin.name}</span>
                                <Badge className="ml-2" variant="destructive">Admin</Badge>
                              </div>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-1">
                            {blogAuthorsEditors.map(user => (
                              <div key={user.id} className="flex items-center">
                                <span className="text-sm">{user.name}</span>
                                <Badge className="ml-2" variant={user.role === "Editor" ? "default" : "secondary"}>
                                  {user.role}
                                </Badge>
                              </div>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <UserPlus className="mr-2 h-4 w-4" />
                                Add User
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Add User to {blog.name}</DialogTitle>
                                <DialogDescription>
                                  Assign a new or existing user to this blog
                                </DialogDescription>
                              </DialogHeader>
                              <Tabs defaultValue="existing">
                                <TabsList className="grid w-full grid-cols-2">
                                  <TabsTrigger value="existing">Existing User</TabsTrigger>
                                  <TabsTrigger value="new">New User</TabsTrigger>
                                </TabsList>
                                <TabsContent value="existing" className="pt-4">
                                  <div className="space-y-4">
                                    <div>
                                      <Label>Select User</Label>
                                      <Select>
                                        <SelectTrigger className="mt-1">
                                          <SelectValue placeholder="Choose a user" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          {users
                                            .filter(user => !user.blogs.includes(blog.name))
                                            .map(user => (
                                              <SelectItem key={user.id} value={user.email}>
                                                {user.name} ({user.email})
                                              </SelectItem>
                                            ))}
                                        </SelectContent>
                                      </Select>
                                    </div>
                                    <div>
                                      <Label>Role</Label>
                                      <Select defaultValue="Author">
                                        <SelectTrigger className="mt-1">
                                          <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="Admin">Admin</SelectItem>
                                          <SelectItem value="Editor">Editor</SelectItem>
                                          <SelectItem value="Author">Author</SelectItem>
                                          <SelectItem value="Viewer">Viewer</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>
                                  </div>
                                </TabsContent>
                                <TabsContent value="new" className="pt-4">
                                  <div className="space-y-4">
                                    <div>
                                      <Label>Name</Label>
                                      <Input placeholder="Full Name" className="mt-1" />
                                    </div>
                                    <div>
                                      <Label>Email</Label>
                                      <Input type="email" placeholder="email@example.com" className="mt-1" />
                                    </div>
                                    <div>
                                      <Label>Role</Label>
                                      <Select defaultValue="Author">
                                        <SelectTrigger className="mt-1">
                                          <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="Admin">Admin</SelectItem>
                                          <SelectItem value="Editor">Editor</SelectItem>
                                          <SelectItem value="Author">Author</SelectItem>
                                          <SelectItem value="Viewer">Viewer</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>
                                  </div>
                                </TabsContent>
                              </Tabs>
                              <DialogFooter className="mt-4">
                                <Button>Add to Blog</Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Permissions;

export interface BlogSite {
  _id: string;
  title: string;
  blog_logo: string;
  description: string;
  domain: string;
  endpoint: string;
  contact_mail: string;
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  category: string;
  language: string;
  index: boolean;
  canonical_url: string;
  owner_user_id: string;
  createdAt?: string;
  updatedAt?: string;
  status?: string;
}

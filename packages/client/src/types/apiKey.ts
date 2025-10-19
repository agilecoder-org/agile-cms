export interface IApiKey {
  _id?: string;
  name: string;
  key: string;
  blogId: string;
  lastUsed?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}
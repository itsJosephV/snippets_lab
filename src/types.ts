// PROVITIONAL TYPES FOR COMPONENT HYDRATION

export type Tag = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

export type SnippetTag = {
  snippetId: string;
  tagId: string;
};

export type Snippet = {
  id: string;
  title: string;
  content: string;
  language: string;
  folderId: string;
  description?: string;
  isFavorite: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type Folder = {
  id: string;
  name: string;
  collectionId: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Collection = {
  id: string;
  name: string;
  description?: string;
  isDefault: boolean;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};

// GITHUB AUTH TYPES
export interface User {
  id: string;
  name?: string;
  email: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

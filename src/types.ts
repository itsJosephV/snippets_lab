// PROVITIONAL TYPES FOR COMPONENT HYDRATION

// Using UUIDs for all IDs for better database compatibility
export type Tag = {
  id: string; // UUID
  name: string;
  createdAt: Date; // Track when tags are created for auditing
  updatedAt: Date; // Track modifications
};

// Many-to-many relationship between snippets and tags
export type SnippetTag = {
  snippetId: string; // UUID reference to Snippet
  tagId: string; // UUID reference to Tag
};

export type Snippet = {
  id: string; // UUID
  title: string;
  content: string;
  language: string;
  folderId: string; // Foreign key to parent folder
  description?: string; // Optional description for better searchability
  isFavorite: boolean; // Quick access to favorite snippets
  createdAt: Date;
  updatedAt: Date;
  // Tags handled through join table SnippetTag
};

export type Folder = {
  id: string; // UUID
  name: string;
  collectionId: string; // Foreign key to parent collection
  description?: string; // Optional description
  createdAt: Date;
  updatedAt: Date;
  // Snippets referenced by their folderId
};

export type Collection = {
  id: string; // UUID
  name: string;
  description?: string; // Optional description
  isDefault: boolean; // Flag for default collection
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  // Folders referenced by their collectionId
};

// USER
// User type definition for your application
export interface User {
  // Unique identifier for the user, using UUID format
  id: string;

  // Username for login and display purposes
  username: string;

  // Email address for notifications and account recovery
  email: string;

  // Optional password hash - typically you wouldn't include the actual password in types
  // but would store a hashed version in your database
  passwordHash?: string;

  // User profile information
  profile?: {
    displayName?: string;
    avatarUrl?: string;
    bio?: string;
  };

  // User preferences for application settings
  preferences?: {
    theme?: "light" | "dark" | "system";
    editorFontSize?: number;
    defaultLanguage?: string;
  };

  // Account status
  isActive: boolean;

  // Timestamps for user creation and updates
  createdAt: Date;
  updatedAt: Date;

  // Optional last login timestamp
  lastLoginAt?: Date;
}

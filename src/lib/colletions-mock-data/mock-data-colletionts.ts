// // Example of two collections with two folders each, and two snippets in each folder

// import {Collection, Folder, Snippet, SnippetTag, Tag} from "@/types";

// // Collections
// export const collections: Collection[] = [
//   {
//     id: "c01b2c3d-4e5f-6789-abcd-ef0123456789",
//     name: "Web Development",
//     description: "Frontend and backend code snippets for web development",
//     isDefault: true,
//     userId: "u123a456b-789c-def0-123a-bc45def67890", // Added user ID
//     createdAt: new Date("2025-01-15T08:30:00Z"),
//     updatedAt: new Date("2025-01-15T08:30:00Z"),
//   },
//   {
//     id: "c98f7e6d-5c4b-3a21-0987-fedcba654321",
//     name: "Data Science",
//     description: "Code snippets for data analysis and visualization",
//     isDefault: false,
//     userId: "u123a456b-789c-def0-123a-bc45def67890", // Same user owns both collections
//     createdAt: new Date("2025-01-20T14:45:00Z"),
//     updatedAt: new Date("2025-01-20T14:45:00Z"),
//   },
// ];

// // Folders
// export const folders: Folder[] = [
//   // Web Development Collection Folders
//   {
//     id: "f12a3b4c-5d6e-7890-fghi-jk0123456789",
//     name: "JavaScript",
//     collectionId: "c01b2c3d-4e5f-6789-abcd-ef0123456789", // References Web Development
//     description: "JavaScript utility functions and components",
//     createdAt: new Date("2025-01-15T09:15:00Z"),
//     updatedAt: new Date("2025-01-15T09:15:00Z"),
//   },
//   {
//     id: "f87g6f5e-4d3c-2b1a-hijk-lm9876543210",
//     name: "CSS",
//     collectionId: "c01b2c3d-4e5f-6789-abcd-ef0123456789", // References Web Development
//     description: "CSS tricks and responsive design patterns",
//     createdAt: new Date("2025-01-15T10:45:00Z"),
//     updatedAt: new Date("2025-01-15T10:45:00Z"),
//   },

//   // Data Science Collection Folders
//   {
//     id: "f45d6e7f-8g9h-0ijk-lmno-pq9876543210",
//     name: "Python",
//     collectionId: "c98f7e6d-5c4b-3a21-0987-fedcba654321", // References Data Science
//     description: "Python data analysis scripts",
//     createdAt: new Date("2025-01-20T15:30:00Z"),
//     updatedAt: new Date("2025-01-20T15:30:00Z"),
//   },
//   {
//     id: "f10p9o8n-7m6l-5k4j-ihgf-ed3210123456",
//     name: "SQL",
//     collectionId: "c98f7e6d-5c4b-3a21-0987-fedcba654321", // References Data Science
//     description: "SQL queries for data extraction and analysis",
//     createdAt: new Date("2025-01-21T11:20:00Z"),
//     updatedAt: new Date("2025-01-21T11:20:00Z"),
//   },
// ];

// // Tags
// export const tags: Tag[] = [
//   {
//     id: "t123e4567-e89b-12d3-a456-426614174000",
//     name: "utility",
//     createdAt: new Date("2025-01-10T08:00:00Z"),
//     updatedAt: new Date("2025-01-10T08:00:00Z"),
//   },
//   {
//     id: "t234e5678-e89b-12d3-a456-426614174001",
//     name: "animation",
//     createdAt: new Date("2025-01-10T08:05:00Z"),
//     updatedAt: new Date("2025-01-10T08:05:00Z"),
//   },
//   {
//     id: "t345e6789-e89b-12d3-a456-426614174002",
//     name: "data-cleaning",
//     createdAt: new Date("2025-01-10T08:10:00Z"),
//     updatedAt: new Date("2025-01-10T08:10:00Z"),
//   },
//   {
//     id: "t456e7890-e89b-12d3-a456-426614174003",
//     name: "performance",
//     createdAt: new Date("2025-01-10T08:15:00Z"),
//     updatedAt: new Date("2025-01-10T08:15:00Z"),
//   },
//   {
//     id: "t567e8901-e89b-12d3-a456-426614174004",
//     name: "visualization",
//     createdAt: new Date("2025-01-10T08:20:00Z"),
//     updatedAt: new Date("2025-01-10T08:20:00Z"),
//   },
// ];

// // Snippets
// export const snippets: Snippet[] = [
//   // JavaScript Folder Snippets (in Web Development Collection)
//   {
//     id: "s12345678-90ab-cdef-ghij-klmnopqrstuv",
//     title: "Debounce Function",
//     content: `function debounce(func, wait) {
//   let timeout;
//   return function(...args) {
//     const context = this;
//     clearTimeout(timeout);
//     timeout = setTimeout(() => {
//       func.apply(context, args);
//     }, wait);
//   };
// }`,
//     language: "javascript",
//     folderId: "f12a3b4c-5d6e-7890-fghi-jk0123456789", // References JavaScript folder
//     description: "Function to limit the rate at which a function can fire",
//     isFavorite: true,
//     createdAt: new Date("2025-01-16T09:30:00Z"),
//     updatedAt: new Date("2025-01-16T09:30:00Z"),
//   },
//   {
//     id: "s87654321-fedc-ba98-7654-321012345678",
//     title: "Array Chunking",
//     content: `function chunkArray(array, size) {
//   const result = [];
//   for (let i = 0; i < array.length; i += size) {
//     result.push(array.slice(i, i + size));
//   }
//   return result;
// }`,
//     language: "javascript",
//     folderId: "f12a3b4c-5d6e-7890-fghi-jk0123456789", // References JavaScript folder
//     description: "Split an array into chunks of specified size",
//     isFavorite: false,
//     createdAt: new Date("2025-01-17T14:20:00Z"),
//     updatedAt: new Date("2025-01-17T14:20:00Z"),
//   },

//   // CSS Folder Snippets (in Web Development Collection)
//   {
//     id: "s23456789-0abc-defg-hijk-lmnopqrstuvw",
//     title: "Responsive Grid",
//     content: `.grid-container {
//   display: grid;
//   grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
//   grid-gap: 1rem;
// }`,
//     language: "css",
//     folderId: "f87g6f5e-4d3c-2b1a-hijk-lm9876543210", // References CSS folder
//     description: "A simple responsive grid using CSS Grid",
//     isFavorite: true,
//     createdAt: new Date("2025-01-18T10:15:00Z"),
//     updatedAt: new Date("2025-01-18T10:15:00Z"),
//   },
//   {
//     id: "s34567890-abcd-efgh-ijkl-mnopqrstuvwx",
//     title: "Smooth Scrolling",
//     content: `html {
//   scroll-behavior: smooth;
// }

// .scroll-link {
//   cursor: pointer;
// }`,
//     language: "css",
//     folderId: "f87g6f5e-4d3c-2b1a-hijk-lm9876543210", // References CSS folder
//     description: "CSS for smooth scrolling effect",
//     isFavorite: false,
//     createdAt: new Date("2025-01-19T16:40:00Z"),
//     updatedAt: new Date("2025-01-19T16:40:00Z"),
//   },

//   // Python Folder Snippets (in Data Science Collection)
//   {
//     id: "s45678901-bcde-fghi-jklm-nopqrstuvwxy",
//     title: "DataFrame Cleaning",
//     content: `import pandas as pd

// def clean_dataframe(df):
//     # Drop duplicate rows
//     df = df.drop_duplicates()

//     # Fill missing values
//     df = df.fillna({
//         'numeric_column': df['numeric_column'].mean(),
//         'string_column': 'unknown'
//     })

//     # Convert date strings to datetime
//     df['date_column'] = pd.to_datetime(df['date_column'])

//     return df`,
//     language: "python",
//     folderId: "f45d6e7f-8g9h-0ijk-lmno-pq9876543210", // References Python folder
//     description: "Function to clean and prepare pandas DataFrames",
//     isFavorite: true,
//     createdAt: new Date("2025-01-22T09:10:00Z"),
//     updatedAt: new Date("2025-01-22T09:10:00Z"),
//   },
//   {
//     id: "s56789012-cdef-ghij-klmn-opqrstuvwxyz",
//     title: "Matplotlib Styling",
//     content: `import matplotlib.pyplot as plt
// import numpy as np

// def create_styled_plot(x, y, title="Plot Title", x_label="X Axis", y_label="Y Axis"):
//     plt.figure(figsize=(10, 6))
//     plt.plot(x, y, color='#2671b8', linewidth=2, marker='o', markersize=6)

//     # Style the plot
//     plt.title(title, fontsize=16, fontweight='bold')
//     plt.xlabel(x_label, fontsize=12)
//     plt.ylabel(y_label, fontsize=12)
//     plt.grid(True, linestyle='--', alpha=0.7)

//     # Add a light gray background
//     plt.gca().set_facecolor('#f7f7f7')

//     return plt`,
//     language: "python",
//     folderId: "f45d6e7f-8g9h-0ijk-lmno-pq9876543210", // References Python folder
//     description: "Create consistently styled matplotlib plots",
//     isFavorite: false,
//     createdAt: new Date("2025-01-23T11:25:00Z"),
//     updatedAt: new Date("2025-01-23T11:25:00Z"),
//   },

//   // SQL Folder Snippets (in Data Science Collection)
//   {
//     id: "s67890123-defg-hijk-lmno-pqrstuvwxyza",
//     title: "Advanced Aggregation",
//     content: `SELECT
//   department,
//   COUNT(*) as employee_count,
//   ROUND(AVG(salary), 2) as avg_salary,
//   MIN(salary) as min_salary,
//   MAX(salary) as max_salary,
//   SUM(salary) as total_payroll
// FROM employees
// WHERE hire_date > '2023-01-01'
// GROUP BY department
// HAVING COUNT(*) > 5
// ORDER BY avg_salary DESC;`,
//     language: "sql",
//     folderId: "f10p9o8n-7m6l-5k4j-ihgf-ed3210123456", // References SQL folder
//     description: "SQL query for advanced aggregation with filtering",
//     isFavorite: true,
//     createdAt: new Date("2025-01-24T14:50:00Z"),
//     updatedAt: new Date("2025-01-24T14:50:00Z"),
//   },
//   {
//     id: "s78901234-efgh-ijkl-mnop-qrstuvwxyzab",
//     title: "Window Functions",
//     content: `WITH ranked_sales AS (
//   SELECT
//     employee_id,
//     sale_date,
//     sale_amount,
//     SUM(sale_amount) OVER (PARTITION BY employee_id) as total_sales,
//     RANK() OVER (PARTITION BY employee_id ORDER BY sale_amount DESC) as sale_rank
//   FROM sales
//   WHERE sale_date BETWEEN '2024-01-01' AND '2024-12-31'
// )
// SELECT *
// FROM ranked_sales
// WHERE sale_rank <= 3;`,
//     language: "sql",
//     folderId: "f10p9o8n-7m6l-5k4j-ihgf-ed3210123456", // References SQL folder
//     description: "Using window functions to analyze sales data",
//     isFavorite: false,
//     createdAt: new Date("2025-01-25T16:15:00Z"),
//     updatedAt: new Date("2025-01-25T16:15:00Z"),
//   },
// ];

// // Snippet-Tag Relationships (Many-to-Many)
// export const snippetTags: SnippetTag[] = [
//   // Debounce Function Tags
//   {
//     snippetId: "s12345678-90ab-cdef-ghij-klmnopqrstuv",
//     tagId: "t123e4567-e89b-12d3-a456-426614174000", // utility
//   },
//   {
//     snippetId: "s12345678-90ab-cdef-ghij-klmnopqrstuv",
//     tagId: "t456e7890-e89b-12d3-a456-426614174003", // performance
//   },

//   // Responsive Grid Tags
//   {
//     snippetId: "s23456789-0abc-defg-hijk-lmnopqrstuvw",
//     tagId: "t123e4567-e89b-12d3-a456-426614174000", // utility
//   },

//   // Smooth Scrolling Tags
//   {
//     snippetId: "s34567890-abcd-efgh-ijkl-mnopqrstuvwx",
//     tagId: "t234e5678-e89b-12d3-a456-426614174001", // animation
//   },

//   // DataFrame Cleaning Tags
//   {
//     snippetId: "s45678901-bcde-fghi-jklm-nopqrstuvwxy",
//     tagId: "t345e6789-e89b-12d3-a456-426614174002", // data-cleaning
//   },
//   {
//     snippetId: "s45678901-bcde-fghi-jklm-nopqrstuvwxy",
//     tagId: "t123e4567-e89b-12d3-a456-426614174000", // utility
//   },

//   // Matplotlib Styling Tags
//   {
//     snippetId: "s87654321-fedc-ba98-7654-321012345678",
//     tagId: "t567e8901-e89b-12d3-a456-426614174004", // visualization
//   },

//   // Advanced Aggregation Tags
//   {
//     snippetId: "s87654321-fedc-ba98-7654-321012345678",
//     tagId: "t345e6789-e89b-12d3-a456-426614174002", // data-cleaning
//   },
// ];

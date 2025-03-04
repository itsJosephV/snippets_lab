# SnippetsLab

A modern web application for managing and organizing code snippets, inspired by the popular SnippetsLab app for macOS.

## 🚀 Features

- **Multiple Programming Language Support**: JavaScript, Python, Rust, Java, C++, Go, PHP, HTML, CSS, SQL and more
- **Advanced Code Editor**: Powered by CodeMirror with syntax highlighting and customizable themes
- **Intuitive Organization**: Categorize your snippets by language, project, or custom tags
- **Powerful Search**: Quickly find what you need with full-text search
- **Modern Interface**: Clean, responsive design with light/dark theme support
- **Secure Authentication**: Protect your snippets with integrated authentication system
- **Robust Database**: Persistent storage with Prisma ORM

## 🛠️ Technologies

- **Frontend**: React 19, Next.js 15, Tailwind CSS 4
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL compatible (via Prisma)
- **Authentication**: NextAuth.js 5
- **Code Editor**: CodeMirror 6 with multi-language support
- **UI Components**: Radix UI, shadcn/ui integration
- **Charts** (if needed): Recharts
- **Forms**: React Hook Form with Zod validation

## 🚦 Prerequisites

- Node.js 18.x or higher
- npm or yarn
- PostgreSQL database (local or remote)

## 🏗️ Installation

1. Clone the repository

```bash
git clone https://github.com/your-username/snippets_lab.git
cd snippets_lab
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Set up environment variables

```bash
cp .env.example .env.local
```

Edit the `.env.local` file with your database credentials and authentication configuration.

4. Set up the database

```bash
npm run db:migrate
# or
yarn db:migrate
```

## 🚀 Development

To start the development server:

```bash
npm run dev
# or
yarn dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

### Available Scripts

- `npm run dev` - Start the development server with TurboPack
- `npm run build` - Build the application for production
- `npm run start` - Start the application in production mode
- `npm run lint` - Run the linter to check for code errors
- `npm run db:migrate` - Run database migrations
- `npm run db:studio` - Open Prisma Studio to manage data
- `npm run db:reset` - Reset the database and run migrations

## 📁 Project Structure

```snippets_lab/
├── public/           # Static assets
├── src/
│   ├── app/          # Application routes and components
│   ├── components/   # Reusable components
│   ├── lib/          # Utilities and configurations
│   │   ├── db/       # Prisma configuration and database operations
│   │   └── auth/     # Authentication configuration
│   ├── types/        # TypeScript definitions
│   └── styles/       # Global styles
└── prisma/           # Prisma schema and migrations
```

## 🔒 Authentication

The application uses NextAuth.js for authentication. You can configure various providers such as GitHub, Google, or email/password authentication.

## 🎨 Customization

### Themes

The application includes support for light and dark themes using next-themes.

### Programming Languages

Numerous programming languages are supported through CodeMirror packages:

- JavaScript/TypeScript
- Python
- HTML/CSS
- SQL
- Rust
- Java
- PHP
- C++/C#
- Go
- And many more

## 🤝 Contributing

Contributions are welcome. Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

[MIT](LICENSE)

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [NextAuth.js Documentation](https://next-auth.js.org/getting-started/introduction)
- [CodeMirror Documentation](https://codemirror.net/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Radix UI Documentation](https://www.radix-ui.com/docs/primitives/overview/introduction)

## NOTES

- [ ] Save selected snippet in localstorage?
- [ ] Create the forms and actions for the CRUD
- [x] Hidrate components with real data
- [ ] User preferences for applications settings as part of the user model?
- [ ] use optimistic hook on the components triggering an action

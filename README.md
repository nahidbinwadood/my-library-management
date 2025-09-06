# Project Frontend

A modern, high-performance frontend application built with React, TypeScript, and Vite.

## 🚀 Tech Stack

- **React 19** - Modern React with hooks and concurrent features
- **TypeScript** - Type-safe JavaScript for better development experience
- **Vite** - Lightning-fast build tool and development server
- **ESLint** - Code linting and formatting
- **Hot Module Replacement (HMR)** - Instant updates during development

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 16.0 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) package manager

## 🛠️ Installation

1. Clone the repository:

```bash
git clone <[repository-url](https://github.com/nahidbinwadood/my-library-management)>
cd <my-library-management>
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

## 🏃‍♂️ Running the Application

### Development Mode

Start the development server with hot reload:

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:3000`

### Production Build

Create an optimized production build:

```bash
npm run build
# or
yarn build
```

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
# or
yarn preview
```

## 🧹 Code Quality

### Linting

Run ESLint to check for code quality issues:

```bash
npm run lint
# or
yarn lint
```

### Type Checking

Run TypeScript compiler for type checking:

```bash
npm run type-check
# or
yarn type-check
```

## 📁 Project Structure

```
├── public/                 # Static assets
├── src/                    # Source code
│   ├── components/         # Reusable UI components
│   ├── pages/             # Page components
│   ├── hooks/             # Custom React hooks
│   ├── utils/             # Utility functions
│   ├── types/             # TypeScript type definitions
│   ├── styles/            # Global styles and themes
│   ├── App.tsx            # Main App component
│   ├── main.tsx           # Application entry point
│   └── vite-env.d.ts      # Vite type declarations
├── index.html             # HTML template
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── tsconfig.node.json     # Node-specific TypeScript config
├── vite.config.ts         # Vite configuration
└── eslint.config.js       # ESLint configuration
```

## ⚙️ Configuration

### Vite Configuration

The project uses Vite with React plugin for optimal development experience:

- **Fast Refresh**: Instant updates without losing component state
- **Hot Module Replacement**: Real-time code updates
- **Optimized builds**: Tree-shaking and code splitting

### TypeScript Configuration

Two TypeScript configurations are maintained:

- `tsconfig.json`: Main application configuration
- `tsconfig.node.json`: Node.js specific configuration for build tools

### ESLint Configuration

Enhanced ESLint setup with:

- TypeScript-aware linting rules
- React-specific best practices
- Automatic code formatting standards

#### Production-Ready ESLint Setup

For production applications, consider enabling type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      ...tseslint.configs.recommendedTypeChecked,
      // For stricter rules:
      // ...tseslint.configs.strictTypeChecked,
      // For stylistic rules:
      // ...tseslint.configs.stylisticTypeChecked,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
]);
```

## 🔧 Available Scripts

| Script               | Description              |
| -------------------- | ------------------------ |
| `npm run dev`        | Start development server |
| `npm run build`      | Build for production     |
| `npm run preview`    | Preview production build |
| `npm run lint`       | Run ESLint               |
| `npm run type-check` | Run TypeScript compiler  |

## 📦 Dependencies

### Runtime Dependencies

- `react` - UI library
- `react-dom` - DOM bindings for React

### Development Dependencies

- `@vitejs/plugin-react` - Vite plugin for React
- `typescript` - TypeScript compiler
- `eslint` - Code linting
- `@types/react` - TypeScript definitions for React
- `@types/react-dom` - TypeScript definitions for React DOM

## 🌐 Browser Support

This project supports all modern browsers:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Write meaningful commit messages
- Ensure all linting checks pass
- Add appropriate type definitions
- Test your changes thoroughly

## 📝 License

This project is licensed under the [MIT License](LICENSE).

## 📚 Additional Resources

- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Vite Documentation](https://vitejs.dev/)
- [ESLint Documentation](https://eslint.org/docs/)

import { CodeBlock } from "@/shared/components/CodeBlock";
import { Component } from "@mini/core";
import { Link, Route } from "@mini/router";

@Route("/getting-started/installation")
export class InstallationPage extends Component {
  render() {
    const tsconfigCode = `{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "jsx": "react-jsx",
    "jsxImportSource": "@mini/core",
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"]
}`;

    const viteConfigCode = `import { defineConfig } from 'vite';
import mini from '@mini/vite-plugin';

export default defineConfig({
  plugins: [mini()],
  esbuild: {
    jsxImportSource: '@mini/core'
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  }
});`;

    const packageJsonCode = `{
  "name": "my-mini-app",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "@mini/core": "latest",
    "@mini/router": "latest"
  },
  "devDependencies": {
    "@mini/vite-plugin": "latest",
    "typescript": "^5.0.0",
    "vite": "^5.0.0"
  }
}`;

    const cliInstallCode = `# Install CLI globally
npm install -g @mini/cli

# Create new project
create-mini my-app

# Navigate to project
cd my-app

# Install dependencies
npm install

# Start development server
npm run dev`;

    const manualInstallCode = `# Create project directory
mkdir my-mini-app
cd my-mini-app

# Initialize npm project
npm init -y

# Install MiniJS packages
npm install @mini/core @mini/router

# Install dev dependencies
npm install -D @mini/vite-plugin typescript vite`;

    return (
      <div className="prose prose-invert max-w-none">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text">
            Installation & Setup
          </h1>
          <p className="text-xl text-gray-300">
            Complete guide to installing and configuring MiniJS in your project
          </p>
        </div>

        {/* Requirements */}
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
            <svg
              className="w-6 h-6 mr-3 text-purple-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            System Requirements
          </h2>
          <ul className="space-y-2 text-gray-300">
            <li className="flex items-center">
              <span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>
              Node.js 16.x or higher
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>
              npm 7.x or higher (or pnpm/yarn)
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>
              TypeScript 5.x or higher (recommended)
            </li>
          </ul>
        </div>

        {/* Method 1: CLI */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6">
            Method 1: Using CLI (Recommended)
          </h2>
          <p className="text-gray-300 mb-6">
            The fastest way to get started with MiniJS is using the official CLI
            tool. It will set up everything you need with best practices.
          </p>
          <CodeBlock
            code={cliInstallCode}
            filename="terminal"
            language="bash"
          />
          <div className="mt-6 bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <p className="text-blue-300 flex items-start">
              <svg
                className="w-5 h-5 mr-2 mt-0.5 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>
                The CLI will generate a complete project structure with all
                necessary configuration files and example code.
              </span>
            </p>
          </div>
        </div>

        {/* Method 2: Manual */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6">
            Method 2: Manual Installation
          </h2>
          <p className="text-gray-300 mb-6">
            For existing projects or custom setups, you can install MiniJS
            manually.
          </p>

          <h3 className="text-xl font-semibold text-white mb-4">
            Step 1: Install Packages
          </h3>
          <CodeBlock
            code={manualInstallCode}
            filename="terminal"
            language="bash"
          />

          <h3 className="text-xl font-semibold text-white mb-4 mt-8">
            Step 2: Configure package.json
          </h3>
          <CodeBlock
            code={packageJsonCode}
            filename="package.json"
            language="json"
          />

          <h3 className="text-xl font-semibold text-white mb-4 mt-8">
            Step 3: Configure TypeScript
          </h3>
          <p className="text-gray-300 mb-4">
            Create a <code className="text-pink-400">tsconfig.json</code> file
            with the following configuration:
          </p>
          <CodeBlock
            code={tsconfigCode}
            filename="tsconfig.json"
            language="json"
          />
          <div className="mt-6 bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
            <p className="text-yellow-300 flex items-start">
              <svg
                className="w-5 h-5 mr-2 mt-0.5 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <span>
                The <code>experimentalDecorators</code> and{" "}
                <code>emitDecoratorMetadata</code> options are required for
                MiniJS decorators to work properly.
              </span>
            </p>
          </div>

          <h3 className="text-xl font-semibold text-white mb-4 mt-8">
            Step 4: Configure Vite
          </h3>
          <p className="text-gray-300 mb-4">
            Create a <code className="text-pink-400">vite.config.ts</code> file:
          </p>
          <CodeBlock
            code={viteConfigCode}
            filename="vite.config.ts"
            language="tsx"
          />
        </div>

        {/* IDE Setup */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6">
            IDE Configuration
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                <svg
                  className="w-5 h-5 mr-2 text-blue-400"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352zm-5.146 14.861L10.826 12l7.178-5.448v10.896z" />
                </svg>
                VS Code
              </h3>
              <p className="text-gray-300 mb-4">
                Install the following extensions for the best experience:
              </p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>• TypeScript and JavaScript Language Features</li>
                <li>• ESLint</li>
                <li>• Prettier</li>
                <li>• ES7+ React/Redux/React-Native snippets</li>
              </ul>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                <svg
                  className="w-5 h-5 mr-2 text-purple-400"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M0 0v24h24V0H0zm12.1 3.9c.4 0 .7 0 1.1.1l.1 2.5c-.3 0-.6-.1-.9-.1-2.7 0-4.9 2.2-4.9 4.9 0 2.7 2.2 4.9 4.9 4.9.3 0 .6 0 .9-.1l-.1 2.5c-.4 0-.7.1-1.1.1-4.1 0-7.4-3.3-7.4-7.4s3.3-7.4 7.4-7.4zm0 2.5c-.8 0-1.5.2-2.1.5l1.2 2c.3-.2.6-.3.9-.3 1.3 0 2.4 1.1 2.4 2.4s-1.1 2.4-2.4 2.4c-.3 0-.6-.1-.9-.3l-1.2 2c.6.3 1.3.5 2.1.5 2.7 0 4.9-2.2 4.9-4.9s-2.2-4.9-4.9-4.9z" />
                </svg>
                WebStorm
              </h3>
              <p className="text-gray-300 mb-4">
                WebStorm has built-in TypeScript support. Enable:
              </p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>• TypeScript Language Service</li>
                <li>• JSX/TSX Support</li>
                <li>• Decorators Support</li>
                <li>• Auto Import</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Troubleshooting */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6">
            Troubleshooting
          </h2>

          <div className="space-y-4">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-2">
                Decorator errors
              </h3>
              <p className="text-gray-300 mb-2">
                If you see errors like "Experimental support for decorators is a
                feature...", ensure:
              </p>
              <ul className="list-disc list-inside text-gray-400 space-y-1">
                <li>
                  <code>experimentalDecorators: true</code> in tsconfig.json
                </li>
                <li>
                  <code>emitDecoratorMetadata: true</code> in tsconfig.json
                </li>
              </ul>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-2">
                JSX not recognized
              </h3>
              <p className="text-gray-300 mb-2">
                If JSX is not being transformed correctly:
              </p>
              <ul className="list-disc list-inside text-gray-400 space-y-1">
                <li>
                  Check <code>"jsx": "react-jsx"</code> in tsconfig.json
                </li>
                <li>
                  Verify <code>"jsxImportSource": "@mini/core"</code> is set
                </li>
                <li>Ensure vite.config.ts has the mini plugin configured</li>
              </ul>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-2">
                Module resolution issues
              </h3>
              <p className="text-gray-300 mb-2">
                If imports are not resolving:
              </p>
              <ul className="list-disc list-inside text-gray-400 space-y-1">
                <li>
                  Clear node_modules and reinstall:{" "}
                  <code>rm -rf node_modules && npm install</code>
                </li>
                <li>Check package versions are compatible</li>
                <li>
                  Verify path aliases in tsconfig.json match vite.config.ts
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-linear-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            Ready to Start Coding?
          </h2>
          <p className="text-gray-300 mb-6">
            Now that you have MiniJS installed and configured, it's time to
            create your first component!
          </p>
          <Link
            href="/getting-started/first-component"
            className="inline-flex items-center px-6 py-3 bg-linear-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
          >
            Create Your First Component
            <svg
              className="w-5 h-5 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
        </div>
      </div>
    );
  }
}

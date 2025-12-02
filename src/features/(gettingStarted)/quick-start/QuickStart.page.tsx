import { Component } from "@mini/core";
import { Link, Route } from "@mini/router";
import { CodeBlock } from "@/shared/components/CodeBlock";
import { Icon } from "@/shared/components/Icon";

@Route("/getting-started/quick-start")
export class QuickStartPage extends Component {
  render() {
    const installCliCode = `# Install the CLI globally
npm install -g @mini/cli

# Create a new project
create-mini my-app

# Navigate to the directory
cd my-app

# Start the development server
npm run dev`;

    const componentCode = `import { Component, signal } from "@mini/core";

export class App extends Component {
  count = signal(0);

  render() {
    return (
      <div>
        <h1>Hello, MiniJS!</h1>
        <p>Count: {this.count}</p>
        <button onClick={() => this.count.set(this.count.value + 1)}>
          Increment
        </button>
      </div>
    );
  }
}`;

    const routingCode = `import { Component } from "@mini/core";
import { Route } from "@mini/router";

@Route("/")
export class Home extends Component {
  render() {
    return (
      <div>
        <h1>Home Page</h1>
        <p>This is the home page of your application.</p>
      </div>
    );
  }
}`;

    const diCode = `import { Component, Inject } from "@mini/core";
import { Route, RouterService } from "@mini/router";

@Route("/")
export class Home extends Component {
  @Inject(RouterService) router!: RouterService;

  navigateToAbout() {
    this.router.push("/about");
  }

  render() {
    return (
      <div>
        <h1>Home Page</h1>
        <button onClick={() => this.navigateToAbout()}>
          Go to About
        </button>
      </div>
    );
  }
}`;

    const lifecycleCode = `import { Component, signal, Mount } from "@mini/core";

export class Example extends Component {
  count = signal(0);

  @Mount()
  startCounting() {
    const interval = setInterval(() => {
      this.count.set(prev => prev + 1);
    }, 1000);

    // Automatic cleanup - returns function that will be called on unmount
    return () => clearInterval(interval);
  }

  render() {
    return <div>Count: {this.count}</div>;
  }
}`;

    return (
      <div className="prose prose-invert max-w-none">
        {/* Hero Section */}
        <div className="mb-12">
          <div className="inline-flex items-center space-x-2 mb-6">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-400 text-sm font-medium">
              Quick Setup
            </span>
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-linear-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
            Quick Start Guide
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed">
            Get your MiniJS project up and running in less than 5 minutes.
          </p>
        </div>

        {/* Installation */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <span className="w-10 h-10 bg-linear-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold mr-3">
              1
            </span>
            Installation
          </h2>
          <p className="text-gray-300 mb-4">
            Use the MiniJS CLI to quickly create a new project:
          </p>
          <CodeBlock
            code={installCliCode}
            filename="Terminal"
            language="bash"
          />
          <div className="mt-4 bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <div className="flex items-start">
              <Icon
                name="info"
                className="w-5 h-5 text-blue-400 mr-3 mt-0.5 shrink-0"
              />
              <div>
                <p className="text-blue-300 text-sm font-semibold mb-1">
                  Automatic Scaffolding
                </p>
                <p className="text-blue-200/80 text-sm">
                  The CLI automatically creates the project structure with all
                  necessary configurations (tsconfig, vite.config, etc)
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Create Your First Component */}
        <div style={{}} className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <span className="w-10 h-10 bg-linear-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold mr-3">
              2
            </span>
            Create Your First Component
          </h2>
          <p className="text-gray-300 mb-4">
            Create a component by extending the{" "}
            <code className="px-2 py-1 bg-gray-800 rounded text-purple-400">
              Component
            </code>{" "}
            class:
          </p>
          <CodeBlock
            code={componentCode}
            filename="src/App.tsx"
            language="tsx"
          />
        </div>

        {/* Setup Routing */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <span className="w-10 h-10 bg-linear-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold mr-3">
              3
            </span>
            Setup Routing
          </h2>
          <p className="text-gray-300 mb-4">
            Add the{" "}
            <code className="px-2 py-1 bg-gray-800 rounded text-purple-400">
              @Route
            </code>{" "}
            decorator to define routes:
          </p>
          <CodeBlock
            code={routingCode}
            filename="src/pages/Home.tsx"
            language="tsx"
          />
        </div>

        {/* Add Dependency Injection */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <span className="w-10 h-10 bg-linear-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold mr-3">
              4
            </span>
            Use Dependency Injection
          </h2>
          <p className="text-gray-300 mb-4">
            Inject services and dependencies using the{" "}
            <code className="px-2 py-1 bg-gray-800 rounded text-purple-400">
              @Inject
            </code>{" "}
            decorator:
          </p>
          <CodeBlock
            code={diCode}
            filename="src/pages/Home.tsx"
            language="tsx"
          />
        </div>

        {/* Lifecycle Hooks */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <span className="w-10 h-10 bg-linear-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold mr-3">
              5
            </span>
            Component Lifecycle
          </h2>
          <p className="text-gray-300 mb-4">
            Use lifecycle hooks to execute code at specific points:
          </p>
          <div className="mb-6">
            <CodeBlock
              code={lifecycleCode}
              filename="Example.tsx"
              language="tsx"
            />
          </div>

          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
            <div className="flex items-start mb-4">
              <Icon
                name="lifecycle"
                className="w-5 h-5 text-purple-400 mr-3 mt-1"
              />
              <div>
                <code className="text-purple-400 text-sm font-mono">
                  @Mount()
                </code>
                <p className="text-gray-400 text-sm mt-2">
                  Executed when the component is mounted to the DOM
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <Icon name="check" className="w-5 h-5 text-green-400 mr-3 mt-1" />
              <div>
                <p className="text-gray-300 text-sm font-semibold mb-1 mt-1">
                  Automatic Cleanup
                </p>
                <p className="text-gray-400 text-sm">
                  Return a function in{" "}
                  <code className="px-1 bg-gray-900 rounded text-purple-400">
                    @Mount()
                  </code>{" "}
                  that will be executed automatically on unmount
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-linear-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
            <Icon name="check" className="w-6 h-6 text-green-400 mr-3" />
            You're All Set!
          </h2>
          <p className="text-gray-300 mb-6">
            Congratulations! You've learned the basics of MiniJS. Here are some
            next steps to continue your journey:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/getting-started/basic-concepts"
              className="bg-gray-900/50 border border-gray-700 rounded-lg p-4 hover:border-purple-500/50 transition-colors"
            >
              <h3 className="text-white font-semibold mb-2">Core Concepts</h3>
              <p className="text-gray-400 text-sm">
                Learn about components, state, and props
              </p>
            </Link>
            <Link
              href="/features/routing"
              className="bg-gray-900/50 border border-gray-700 rounded-lg p-4 hover:border-purple-500/50 transition-colors"
            >
              <h3 className="text-white font-semibold mb-2">
                Advanced Routing
              </h3>
              <p className="text-gray-400 text-sm">
                Master nested routes and guards
              </p>
            </Link>
            <Link
              href="/api/component"
              className="bg-gray-900/50 border border-gray-700 rounded-lg p-4 hover:border-purple-500/50 transition-colors"
            >
              <h3 className="text-white font-semibold mb-2">API Reference</h3>
              <p className="text-gray-400 text-sm">
                Explore all decorators and APIs
              </p>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

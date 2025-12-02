import { CodeBlock } from "@/shared/components/CodeBlock";
import { Icon } from "@/shared/components/Icon";
import { Component } from "@mini/core";
import { Link, Route } from "@mini/router";
import { HeroSection } from "./components/HeroSection";

@Route({ path: "/", exact: true })
export class IntroductionPage extends Component {
  render() {
    const exampleCode = `import { Component, Mount } from "@mini/core";
import { Route } from "@mini/router";

@Route("/hello")
export class HelloWorld extends Component {
  @Mount()
  onMount() {
    console.log("Component mounted!");
  }

  render() {
    return (
      <div>
        <h1>Hello, MiniJS!</h1>
        <p>Building reactive apps made easy.</p>
      </div>
    );
  }
}`;

    return (
      <div className="prose prose-invert max-w-none">
        <HeroSection />

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:border-purple-500/50 transition-colors">
            <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mb-4">
              <Icon name="lightning" className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Decorator-Based
            </h3>
            <p className="text-gray-400">
              Use modern TypeScript decorators for clean, declarative component
              definitions and routing.
            </p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:border-pink-500/50 transition-colors">
            <div className="w-12 h-12 bg-pink-500/10 rounded-lg flex items-center justify-center mb-4">
              <Icon name="adjustments" className="w-6 h-6 text-pink-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Dependency Injection
            </h3>
            <p className="text-gray-400">
              Built-in DI system for managing dependencies and services
              throughout your application.
            </p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:border-purple-500/50 transition-colors">
            <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mb-4">
              <Icon name="route" className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Routing System
            </h3>
            <p className="text-gray-400">
              Powerful client-side routing with nested routes and navigation
              guards.
            </p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:border-pink-500/50 transition-colors">
            <div className="w-12 h-12 bg-pink-500/10 rounded-lg flex items-center justify-center mb-4">
              <Icon name="lifecycle" className="w-6 h-6 text-pink-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Lightweight
            </h3>
            <p className="text-gray-400">
              Small bundle size with zero dependencies, perfect for modern web
              applications.
            </p>
          </div>
        </div>

        {/* Why MiniJS Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6">Why MiniJS?</h2>
          <div className="bg-linear-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-xl p-8">
            <p className="text-gray-300 mb-4 text-lg">
              MiniJS combines the best features of modern frameworks into a
              compact, easy-to-use package. Whether you're building a small
              interactive widget or a full-scale application, MiniJS provides
              the tools you need without the overhead.
            </p>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start">
                <Icon
                  name="check"
                  className="w-6 h-6 text-green-400 mr-3 shrink-0 mt-0.5"
                />
                <span>
                  <strong className="text-white">TypeScript First:</strong>{" "}
                  Built with TypeScript for excellent IDE support and type
                  safety
                </span>
              </li>
              <li className="flex items-start">
                <Icon
                  name="check"
                  className="w-6 h-6 text-green-400 mr-3 shrink-0 mt-0.5"
                />
                <span>
                  <strong className="text-white">JSX Support:</strong> Familiar
                  JSX syntax for building component templates
                </span>
              </li>
              <li className="flex items-start">
                <Icon
                  name="check"
                  className="w-6 h-6 text-green-400 mr-3 shrink-0 mt-0.5"
                />
                <span>
                  <strong className="text-white">Component Lifecycle:</strong>{" "}
                  Hooks for mounting, updating, and unmounting
                </span>
              </li>
              <li className="flex items-start">
                <Icon
                  name="check"
                  className="w-6 h-6 text-green-400 mr-3 shrink-0 mt-0.5"
                />
                <span>
                  <strong className="text-white">Easy to Learn:</strong> Simple
                  API with familiar concepts from popular frameworks
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Quick Example */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6">Quick Example</h2>
          <CodeBlock
            code={exampleCode}
            filename="Component.tsx"
            language="tsx"
          />
        </div>

        {/* Next Steps */}
        <div className="bg-linear-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            Ready to get started?
          </h2>
          <p className="text-gray-300 mb-6">
            Follow our Quick Start guide to create your first MiniJS application
            in minutes.
          </p>
          <Link
            href="/getting-started/quick-start"
            className="inline-flex items-center px-6 py-3 bg-linear-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
          >
            Get Started
            <Icon name="arrow" className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    );
  }
}

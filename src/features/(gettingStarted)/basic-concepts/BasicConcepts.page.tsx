import { Component } from "@mini/core";
import { Link, Route } from "@mini/router";
import { CodeBlock } from "@/shared/components/CodeBlock";
import { Icon } from "@/shared/components/Icon";

@Route("/getting-started/basic-concepts")
export class BasicConceptsPage extends Component {
  render() {
    const componentExample = `import { Component } from "@mini/core";

export class UserCard extends Component {
  render() {
    return (
      <div className="card">
        <h2>User Profile</h2>
        <p>Welcome to MiniJS!</p>
      </div>
    );
  }
}`;

    const signalExample = `import { Component, signal } from "@mini/core";

export class Counter extends Component {
  count = signal(0);

  increment() {
    this.count.set((prev) => prev + 1);
  }

  render() {
    return (
      <div>
        <p>Count: {this.count}</p>
        <button onClick={() => this.increment()}>
          Increment
        </button>
      </div>
    );
  }
}`;

    const propsExample = `import { Component } from "@mini/core";

interface UserCardProps {
  name: string;
  email: string;
  role?: string;
}

export class UserCard extends Component<UserCardProps> {
  render() {
    return (
      <div className="card">
        <h2>{this.props.name}</h2>
        <p>{this.props.email}</p>
        {this.props.role && <span>{this.props.role}</span>}
      </div>
    );
  }
}

// Usage
<UserCard name="John Doe" email="john@example.com" role="Admin" />`;

    const lifecycleExample = `import { Component, signal, Mount, Watch } from "@mini/core";

export class DataFetcher extends Component {
  data = signal<User[]>([]);

  @Mount()
  fetchData() {
    fetch('/api/users')
      .then(r => r.json())
      .then(users => this.data.set(users));
  }

  @Watch('data')
  onDataChange(users: User[]) {
    console.log('Data updated:', users.length, 'users');
  }

  render() {
    return (
      <ul>
        {this.data.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    );
  }
}`;

    return (
      <div className="prose prose-invert max-w-none">
        {/* Hero Section */}
        <div className="mb-12">
          <div className="inline-flex items-center space-x-2 mb-6">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <span className="text-blue-400 text-sm font-medium">
              Fundamentals
            </span>
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-linear-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
            Basic Concepts
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed">
            Master the fundamental concepts that power MiniJS applications.
          </p>
        </div>

        {/* Components */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <Icon name="component" className="w-8 h-8 text-purple-400 mr-3" />
            Components
          </h2>
          <p className="text-gray-300 mb-6">
            Components are the building blocks of MiniJS applications. Every
            component extends the{" "}
            <code className="px-2 py-1 bg-gray-800 rounded text-purple-400">
              Component
            </code>{" "}
            class and must implement a{" "}
            <code className="px-2 py-1 bg-gray-800 rounded text-purple-400">
              render()
            </code>{" "}
            method that returns JSX.
          </p>
          <CodeBlock
            code={componentExample}
            filename="UserCard.tsx"
            language="tsx"
          />
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
              <div className="flex items-start">
                <Icon
                  name="check"
                  className="w-5 h-5 text-green-400 mr-3 mt-0.5 shrink-0"
                />
                <div>
                  <p className="text-white font-semibold text-sm mb-1">
                    Class-Based
                  </p>
                  <p className="text-gray-400 text-sm">
                    Components are classes, providing natural encapsulation and
                    lifecycle management
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
              <div className="flex items-start">
                <Icon
                  name="check"
                  className="w-5 h-5 text-green-400 mr-3 mt-0.5 shrink-0"
                />
                <div>
                  <p className="text-white font-semibold text-sm mb-1">
                    Type-Safe
                  </p>
                  <p className="text-gray-400 text-sm">
                    Full TypeScript support with intelligent autocomplete and
                    type checking
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reactivity with Signals */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <Icon name="lightning" className="w-8 h-8 text-yellow-400 mr-3" />
            Reactivity with Signals
          </h2>
          <p className="text-gray-300 mb-6">
            Signals are the foundation of MiniJS's granular reactivity system.
            When a signal changes, only the specific DOM nodes that depend on it
            are updated—no re-rendering of the entire component.
          </p>
          <CodeBlock
            code={signalExample}
            filename="Counter.tsx"
            language="tsx"
          />
          <div className="mt-6 bg-linear-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-lg p-6">
            <div className="flex items-start">
              <Icon
                name="lightning"
                className="w-6 h-6 text-yellow-400 mr-4 mt-0.5 shrink-0"
              />
              <div>
                <p className="text-yellow-300 font-semibold mb-2">
                  Granular Updates
                </p>
                <p className="text-gray-300 text-sm mb-3">
                  In the example above, when{" "}
                  <code className="px-1 bg-gray-900 rounded text-purple-400">
                    count
                  </code>{" "}
                  changes, only the text node displaying the count is updated.
                  The button and surrounding elements remain untouched.
                </p>
                <p className="text-gray-400 text-sm">
                  This is fundamentally different from Virtual DOM frameworks
                  where the entire component would re-render and require
                  reconciliation.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Props & Children */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <Icon name="settings" className="w-8 h-8 text-blue-400 mr-3" />
            Props & Children
          </h2>
          <p className="text-gray-300 mb-6">
            Components can accept props to customize their behavior and
            appearance. Props are type-safe and accessed via{" "}
            <code className="px-2 py-1 bg-gray-800 rounded text-purple-400">
              this.props
            </code>
            .
          </p>
          <CodeBlock
            code={propsExample}
            filename="UserCard.tsx"
            language="tsx"
          />
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
              <Icon name="check" className="w-5 h-5 text-green-400 mb-3" />
              <p className="text-white font-semibold text-sm mb-1">
                Type-Safe Props
              </p>
              <p className="text-gray-400 text-sm">
                Define prop interfaces for compile-time type checking
              </p>
            </div>
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
              <Icon name="check" className="w-5 h-5 text-green-400 mb-3" />
              <p className="text-white font-semibold text-sm mb-1">
                Optional Props
              </p>
              <p className="text-gray-400 text-sm">
                Mark props as optional with{" "}
                <code className="text-purple-400">?</code>
              </p>
            </div>
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
              <Icon name="check" className="w-5 h-5 text-green-400 mb-3" />
              <p className="text-white font-semibold text-sm mb-1">
                Children Support
              </p>
              <p className="text-gray-400 text-sm">
                Access nested content via{" "}
                <code className="text-purple-400">this.children</code>
              </p>
            </div>
          </div>
        </div>

        {/* Lifecycle */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <Icon name="lifecycle" className="w-8 h-8 text-pink-400 mr-3" />
            Component Lifecycle
          </h2>
          <p className="text-gray-300 mb-6">
            MiniJS provides powerful lifecycle hooks to execute code at specific
            points in a component's life. Use decorators like{" "}
            <code className="px-2 py-1 bg-gray-800 rounded text-purple-400">
              @Mount
            </code>{" "}
            and{" "}
            <code className="px-2 py-1 bg-gray-800 rounded text-purple-400">
              @Watch
            </code>{" "}
            to hook into these events.
          </p>
          <CodeBlock
            code={lifecycleExample}
            filename="DataFetcher.tsx"
            language="tsx"
          />
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-5">
              <div className="flex items-start mb-3">
                <Icon
                  name="lifecycle"
                  className="w-5 h-5 text-purple-400 mr-3 mt-0.5"
                />
                <code className="text-purple-400 text-sm font-mono">
                  @Mount()
                </code>
              </div>
              <p className="text-gray-400 text-sm mb-2">
                Executed once when the component is mounted to the DOM
              </p>
              <p className="text-gray-500 text-xs">
                Perfect for data fetching, setting up subscriptions, and
                initialization logic
              </p>
            </div>
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-5">
              <div className="flex items-start mb-3">
                <Icon
                  name="eye"
                  className="w-5 h-5 text-blue-400 mr-3 mt-0.5"
                />
                <code className="text-blue-400 text-sm font-mono">
                  @Watch()
                </code>
              </div>
              <p className="text-gray-400 text-sm mb-2">
                Observes changes to a signal and executes a callback
              </p>
              <p className="text-gray-500 text-xs">
                Useful for side effects, logging, and reacting to state changes
              </p>
            </div>
          </div>
        </div>

        {/* JSX Templates */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <Icon name="code" className="w-8 h-8 text-green-400 mr-3" />
            JSX Templates
          </h2>
          <p className="text-gray-300 mb-6">
            MiniJS uses JSX for templating, providing a familiar and powerful
            way to describe your UI. JSX is compiled to efficient JavaScript
            that creates and updates DOM nodes.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-5">
              <h3 className="text-white font-semibold mb-3 flex items-center">
                <Icon name="check" className="w-5 h-5 text-green-400 mr-2" />
                Expressions
              </h3>
              <CodeBlock
                code={`<p>Count: {this.count}</p>
<p>Double: {this.count.map(n => n * 2)}</p>`}
                language="tsx"
                layout="compact"
              />
            </div>
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-5">
              <h3 className="text-white font-semibold mb-3 flex items-center">
                <Icon name="check" className="w-5 h-5 text-green-400 mr-2" />
                Conditionals
              </h3>
              <CodeBlock
                code={`{this.isLoggedIn.map(logged =>
  logged ? <Dashboard /> : <Login />
)}`}
                language="tsx"
                layout="compact"
              />
            </div>
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-5">
              <h3 className="text-white font-semibold mb-3 flex items-center">
                <Icon name="check" className="w-5 h-5 text-green-400 mr-2" />
                Lists
              </h3>
              <CodeBlock
                code={`<ul>
  {this.items.map(item => (
    <li key={item.id}>{item.name}</li>
  ))}
</ul>`}
                language="tsx"
                layout="compact"
              />
            </div>
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-5">
              <h3 className="text-white font-semibold mb-3 flex items-center">
                <Icon name="check" className="w-5 h-5 text-green-400 mr-2" />
                Events
              </h3>
              <CodeBlock
                code={`<button onClick={() => this.handleClick()}>
  Click me
</button>`}
                language="tsx"
                layout="compact"
              />
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-linear-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            Ready for More?
          </h2>
          <p className="text-gray-300 mb-6">
            Now that you understand the basics, dive deeper into MiniJS's
            powerful features.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/core/reactivity"
              className="bg-gray-900/50 border border-gray-700 rounded-lg p-4 hover:border-purple-500/50 transition-colors"
            >
              <Icon name="lightning" className="w-6 h-6 text-yellow-400 mb-3" />
              <h3 className="text-white font-semibold mb-2">
                Reactivity & Signals
              </h3>
              <p className="text-gray-400 text-sm">
                Deep dive into MiniJS's granular reactivity system
              </p>
            </Link>
            <Link
              href="/features/dependency-injection"
              className="bg-gray-900/50 border border-gray-700 rounded-lg p-4 hover:border-purple-500/50 transition-colors"
            >
              <Icon
                name="adjustments"
                className="w-6 h-6 text-purple-400 mb-3"
              />
              <h3 className="text-white font-semibold mb-2">
                Dependency Injection
              </h3>
              <p className="text-gray-400 text-sm">
                Learn about MiniJS's powerful DI system
              </p>
            </Link>
            <Link
              href="/features/routing"
              className="bg-gray-900/50 border border-gray-700 rounded-lg p-4 hover:border-purple-500/50 transition-colors"
            >
              <Icon name="route" className="w-6 h-6 text-blue-400 mb-3" />
              <h3 className="text-white font-semibold mb-2">Routing System</h3>
              <p className="text-gray-400 text-sm">
                Master routing with guards and resolvers
              </p>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

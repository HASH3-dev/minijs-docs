import { CodeBlock } from "@/shared/components/CodeBlock";
import { Component } from "@mini/core";
import { Link, Route } from "@mini/router";

@Route("/getting-started/first-component")
export class FirstComponentPage extends Component {
  render() {
    const basicComponentCode = `import { Component } from "@mini/core";

export class HelloWorld extends Component {
  render() {
    return (
      <div>
        <h1>Hello, MiniJS!</h1>
        <p>My first component</p>
      </div>
    );
  }
}`;

    const withPropsCode = `import { Component } from "@mini/core";

interface GreetingProps {
  name: string;
  message?: string;
}

export class Greeting extends Component<GreetingProps> {
  render() {
    return (
      <div className="greeting">
        <h2>Hello, {this.props.name}!</h2>
        {this.props.message && <p>{this.props.message}</p>}
      </div>
    );
  }
}

// Usage
<Greeting name="John" message="Welcome to MiniJS!" />`;

    const withSignalsCode = `import { Component, signal } from "@mini/core";

export class Counter extends Component {
  // Create a reactive signal
  count = signal(0);

  increment() {
    this.count.set(this.count.value + 1);
  }

  decrement() {
    this.count.set(this.count.value - 1);
  }

  render() {
    return (
      <div className="counter">
        <h2>Counter: {this.count}</h2>
        <div className="buttons">
          <button onClick={() => this.decrement()}>-</button>
          <button onClick={() => this.increment()}>+</button>
        </div>
      </div>
    );
  }
}`;

    const withLifecycleCode = `import { Component, signal, Mount } from "@mini/core";

export class Timer extends Component {
  seconds = signal(0);

  @Mount()
  startTimer() {
    const interval = setInterval(() => {
      this.seconds.set(this.seconds.value + 1);
    }, 1000);

    // Cleanup function - called when component unmounts
    return () => clearInterval(interval);
  }

  render() {
    return (
      <div className="timer">
        <h2>Timer: {this.seconds}s</h2>
      </div>
    );
  }
}`;

    const todoItemCode = `import { Component } from "@mini/core";

interface TodoItemProps {
  title: string;
  completed: boolean;
  onToggle: () => void;
  onDelete: () => void;
}

export class TodoItem extends Component<TodoItemProps> {
  render() {
    return (
      <li className={this.props.completed ? "completed" : ""}>
        <input
          type="checkbox"
          checked={this.props.completed}
          onChange={() => this.props.onToggle()}
        />
        <span>{this.props.title}</span>
        <button onClick={() => this.props.onDelete()}>Delete</button>
      </li>
    );
  }
}`;

    const todoListCode = `import { Component, signal } from "@mini/core";
import { TodoItem } from "./TodoItem";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export class TodoList extends Component {
  todos = signal<Todo[]>([
    { id: 1, title: "Learn MiniJS", completed: false },
    { id: 2, title: "Build an app", completed: false },
  ]);

  newTodoTitle = signal("");

  addTodo() {
    const title = this.newTodoTitle.value.trim();
    if (!title) return;

    const newTodo: Todo = {
      id: Date.now(),
      title,
      completed: false,
    };

    this.todos.set((prev) => [...prev, newTodo]);
    this.newTodoTitle.set("");
  }

  toggleTodo(id: number) {
    this.todos.set((prev)
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  deleteTodo(id: number) {
    this.todos.set((prev) => prev.filter((todo) => todo.id !== id));
  }

  render() {
    return (
      <div className="todo-list">
        <h1>Todo List</h1>

        <div className="add-todo">
          <input
            type="text"
            value={this.newTodoTitle}
            onInput={(e: InputEvent) =>
              this.newTodoTitle.set((e.target as HTMLInputElement).value)
            }
            placeholder="What needs to be done?"
          />
          <button onClick={() => this.addTodo()}>Add</button>
        </div>

        <ul>
          {this.todos.map((todos) =>
            <TodoItem
              key={todo.id}
              title={todo.title}
              completed={todo.completed}
              onToggle={() => this.toggleTodo(todo.id)}
              onDelete={() => this.deleteTodo(todo.id)}
            />
          )}
        </ul>
      </div>
    );
  }
}`;

    return (
      <div className="prose prose-invert max-w-none">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text">
            Your First Component
          </h1>
          <p className="text-xl text-gray-300">
            Learn how to create components in MiniJS with practical examples
          </p>
        </div>

        {/* Basic Component */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6">
            1. Basic Component Structure
          </h2>
          <p className="text-gray-300 mb-6">
            Every MiniJS component is a class that extends{" "}
            <code className="text-pink-400">Component</code> and implements a{" "}
            <code className="text-pink-400">render()</code> method that returns
            JSX.
          </p>
          <CodeBlock
            code={basicComponentCode}
            filename="HelloWorld.tsx"
            language="tsx"
          />

          <div className="mt-6 bg-linear-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-3">
              Key Points:
            </h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start">
                <span className="text-green-400 mr-2">✓</span>
                <span>
                  Component classes extend the{" "}
                  <code className="text-pink-400">Component</code> base class
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2">✓</span>
                <span>
                  The <code className="text-pink-400">render()</code> method
                  executes <strong>only once</strong>
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2">✓</span>
                <span>Use JSX syntax for the template</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2">✓</span>
                <span>No need for constructor or super() calls</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Props */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6">
            2. Adding Props
          </h2>
          <p className="text-gray-300 mb-6">
            Components can receive data through props. Type your props with
            TypeScript for better IDE support and type safety.
          </p>
          <CodeBlock
            code={withPropsCode}
            filename="Greeting.tsx"
            language="tsx"
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
                Props are accessed via{" "}
                <code className="text-pink-400">this.props</code> and are
                read-only. Use TypeScript generics to type your props:{" "}
                <code className="text-pink-400">
                  Component&lt;PropsType&gt;
                </code>
              </span>
            </p>
          </div>
        </div>

        {/* Reactive State */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6">
            3. Reactive State with Signals
          </h2>
          <p className="text-gray-300 mb-6">
            MiniJS uses Signals for reactive state management. When a signal
            changes, only the specific DOM nodes that depend on it are updated.
          </p>
          <CodeBlock
            code={withSignalsCode}
            filename="Counter.tsx"
            language="tsx"
          />

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-2">
                Creating Signals
              </h3>
              <code className="text-pink-400 text-sm">
                signal(initialValue)
              </code>
              <p className="text-gray-400 text-sm mt-2">
                Creates a reactive value that can be observed
              </p>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-2">
                Reading Values
              </h3>
              <code className="text-pink-400 text-sm">signal.value</code>
              <p className="text-gray-400 text-sm mt-2">
                Access the current value directly
              </p>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-2">
                Updating Values
              </h3>
              <code className="text-pink-400 text-sm">
                signal.set(newValue)
              </code>
              <p className="text-gray-400 text-sm mt-2">
                Update the signal's value and trigger reactivity
              </p>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-2">
                In Templates
              </h3>
              <code className="text-pink-400 text-sm">{`{this.count}`}</code>
              <p className="text-gray-400 text-sm mt-2">
                Use signals directly in JSX
              </p>
            </div>
          </div>
        </div>

        {/* Lifecycle */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6">
            4. Component Lifecycle
          </h2>
          <p className="text-gray-300 mb-6">
            Use the <code className="text-pink-400">@Mount</code> decorator to
            run code when the component is mounted. Return a cleanup function to
            run code when it unmounts.
          </p>
          <CodeBlock
            code={withLifecycleCode}
            filename="Timer.tsx"
            language="tsx"
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
                Always clean up side effects (timers, subscriptions, event
                listeners) in the cleanup function to prevent memory leaks.
              </span>
            </p>
          </div>
        </div>

        {/* Complete Example */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6">
            5. Complete Example: Todo List
          </h2>
          <p className="text-gray-300 mb-6">
            Let's put it all together with a complete Todo List example that
            demonstrates components, props, signals, and methods.
          </p>

          <h3 className="text-xl font-semibold text-white mb-4">
            TodoItem Component
          </h3>
          <CodeBlock
            code={todoItemCode}
            filename="TodoItem.tsx"
            language="tsx"
          />

          <h3 className="text-xl font-semibold text-white mb-4 mt-8">
            TodoList Component
          </h3>
          <CodeBlock
            code={todoListCode}
            filename="TodoList.tsx"
            language="tsx"
          />
        </div>

        {/* Key Differences */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6">
            Why Classes Instead of Functions?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-red-300 mb-4">
                React Hooks Problems
              </h3>
              <ul className="space-y-3 text-gray-300 text-sm">
                <li className="flex items-start">
                  <span className="text-red-400 mr-2">✗</span>
                  <span>Re-render entire function on every state change</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-2">✗</span>
                  <span>Need useCallback to stabilize functions</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-2">✗</span>
                  <span>Stale closures and dependency arrays</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-2">✗</span>
                  <span>Rules of Hooks restrictions</span>
                </li>
              </ul>
            </div>

            <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-green-300 mb-4">
                MiniJS Classes Benefits
              </h3>
              <ul className="space-y-3 text-gray-300 text-sm">
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span>render() executes only once</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span>Methods are naturally stable</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span>No closure issues or dependencies</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span>Clear, predictable behavior</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-linear-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-white mb-4">What's Next?</h2>
          <p className="text-gray-300 mb-6">
            Now that you know how to create components, learn about the
            fundamental concepts that make MiniJS powerful.
          </p>
          <Link
            href="/getting-started/basic-concepts"
            className="inline-flex items-center px-6 py-3 bg-linear-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
          >
            Learn Basic Concepts
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

import { Component } from "@mini/core";
import { Link, Route } from "@mini/router";
import { CodeBlock } from "@/shared/components/CodeBlock";
import { Icon } from "@/shared/components/Icon";

@Route("/core/components")
export class ComponentsPage extends Component {
  render() {
    const basicComponentExample = `import { Component, signal } from "@mini/core";

export class UserProfile extends Component {
  // State persists naturally in class properties
  user = signal<User | null>(null);
  loading = signal(false);
  
  // Methods are stable - no useCallback needed
  handleRefresh() {
    this.loading.set(true);
    this.loadUser();
  }
  
  // Lifecycle is explicit
  @Mount()
  async loadUser() {
    try {
      const data = await fetchUser();
      this.user.set(data);
    } finally {
      this.loading.set(false);
    }
  }
  
  // render() executes ONCE
  render() {
    return (
      <div>
        {this.loading.map(l => l ? <Spinner /> : (
          <div>
            <h1>{this.user.get('name')}</h1>
            <button onClick={() => this.handleRefresh()}>
              Refresh
            </button>
          </div>
        ))}
      </div>
    );
  }
}`;

    const hooksProblemsExample = `// ❌ REACT HOOKS - Common Problems

function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // ⚠️ Problem 1: Stale Closures
  const handleRefresh = useCallback(() => {
    setLoading(true);
    loadUser(); // Which loadUser? Old closure or new?
  }, []); // Empty deps = stale closure!
  
  // ⚠️ Problem 2: Dependency Arrays
  useEffect(() => {
    if (user) {
      console.log(user.name);
    }
  }, [user]); // Forgot a dependency? Silent bugs!
  
  // ⚠️ Problem 3: Rules of Hooks
  if (someCondition) {
    useEffect(() => {}); // ERROR! Conditional hook!
  }
  
  // ⚠️ Problem 4: Re-renders
  // This entire function runs on EVERY state change
  console.log('Re-rendering...');
  
  return <div>{user?.name}</div>;
}`;

    const classesAdvantagesExample = `// ✅ MINIJS CLASSES - Solutions

export class UserProfile extends Component {
  user = signal<User | null>(null);
  loading = signal(false);
  
  // ✅ Solution 1: No Stale Closures
  // Methods always reference current state
  handleRefresh() {
    this.loading.set(true);
    this.loadUser();
  }
  
  // ✅ Solution 2: No Dependency Arrays
  @Watch('user')
  onUserChange(user: User) {
    console.log(user.name);
  }
  
  // ✅ Solution 3: No Rules to Break
  @Mount()
  conditionalSetup() {
    if (someCondition) {
      // Perfectly fine! No rules!
      this.setupWebSocket();
    }
  }
  
  // ✅ Solution 4: render() Runs ONCE
  render() {
    console.log('Rendering... (only once!)');
    return <div>{this.user.get('name')}</div>;
  }
}`;

    const propsTypingExample = `import { Component } from "@mini/core";

// Type-safe props
interface UserCardProps {
  userId: string;
  onEdit?: (id: string) => void;
  theme?: 'light' | 'dark';
}

export class UserCard extends Component<UserCardProps> {
  user = signal<User | null>(null);
  
  @Mount()
  async loadUser() {
    // this.props is fully typed!
    const data = await fetchUser(this.props.userId);
    this.user.set(data);
  }
  
  handleEdit() {
    // Optional chaining with type safety
    this.props.onEdit?.(this.props.userId);
  }
  
  render() {
    return (
      <div className={\`card \${this.props.theme || 'light'}\`}>
        <h2>{this.user.get('name')}</h2>
        <button onClick={() => this.handleEdit()}>
          Edit
        </button>
      </div>
    );
  }
}

// Usage - TypeScript will enforce prop types
<UserCard 
  userId="123"
  onEdit={(id) => console.log('Edit', id)}
  theme="dark"
/>`;

    const memoryManagementExample = `export class DataComponent extends Component {
  // Class properties persist across lifecycle
  private ws: WebSocket | null = null;
  data = signal<Data[]>([]);
  subscriptions: Subscription[] = [];
  
  @Mount()
  setupConnections() {
    // Setup WebSocket
    this.ws = new WebSocket('ws://...');
    this.ws.onmessage = (e) => this.data.set(e.data);
    
    // Setup RxJS subscriptions
    const sub1 = interval(1000).subscribe(() => {
      this.checkStatus();
    });
    
    const sub2 = this.data.subscribe(data => {
      this.processData(data);
    });
    
    this.subscriptions.push(sub1, sub2);
    
    // Cleanup - return function or observable
    return () => {
      this.ws?.close();
      this.subscriptions.forEach(sub => sub.unsubscribe());
    };
  }
  
  // Private methods for organization
  private checkStatus() {
    // Implementation
  }
  
  private processData(data: Data[]) {
    // Implementation
  }
  
  render() {
    return <div>Data: {this.data.length}</div>;
  }
}`;

    const comparisonTableData = `| Feature | React Hooks | MiniJS Classes |
|---------|-------------|----------------|
| State | useState | signal() |
| Side Effects | useEffect | @Mount, @Watch |
| Memoization | useMemo | computed (signal.map) |
| Callbacks | useCallback | Regular methods |
| Refs | useRef | Class properties |
| Context | useContext | @Inject (DI) |
| Rules | Yes (strict) | No rules |
| Stale Closures | Common | Impossible |
| Dependency Arrays | Required | Not needed |
| Re-renders | Every state change | Never (granular) |`;

    return (
      <div className="prose prose-invert max-w-none">
        {/* Hero Section */}
        <div className="mb-12">
          <div className="inline-flex items-center space-x-2 mb-6">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
            <span className="text-purple-400 text-sm font-medium">
              Core Concept
            </span>
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-linear-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
            Components & Classes
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed">
            Why MiniJS uses classes instead of functions, and how it solves
            fundamental problems with Hooks.
          </p>
        </div>

        {/* Why Classes? */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <Icon name="component" className="w-8 h-8 text-purple-400 mr-3" />
            Why Classes?
          </h2>
          <p className="text-gray-300 mb-6 text-lg">
            Classes provide a natural, object-oriented way to encapsulate state,
            behavior, and lifecycle. Unlike function components with Hooks,
            classes don't suffer from stale closures, dependency array hell, or
            the "Rules of Hooks" restrictions.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-6">
              <h3 className="text-green-400 font-semibold mb-3 flex items-center">
                <Icon name="check" className="w-5 h-5 mr-2" />
                Classes (MiniJS)
              </h3>
              <ul className="text-gray-300 text-sm space-y-2">
                <li>• State persists naturally in properties</li>
                <li>• Methods are stable references</li>
                <li>• No stale closures</li>
                <li>• No dependency arrays</li>
                <li>• No "Rules of Hooks"</li>
                <li>• render() executes once</li>
                <li>• Clear lifecycle</li>
                <li>• Easy to test and refactor</li>
              </ul>
            </div>
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6">
              <h3 className="text-red-400 font-semibold mb-3 flex items-center">
                <Icon name="close" className="w-5 h-5 mr-2" />
                Hooks (React)
              </h3>
              <ul className="text-gray-300 text-sm space-y-2">
                <li>• useState creates new closures</li>
                <li>• useCallback for stable refs</li>
                <li>• Stale closure bugs common</li>
                <li>• Dependency arrays required</li>
                <li>• Strict "Rules of Hooks"</li>
                <li>• Function re-runs constantly</li>
                <li>• Implicit lifecycle</li>
                <li>• Harder to test</li>
              </ul>
            </div>
          </div>

          <CodeBlock
            code={basicComponentExample}
            filename="UserProfile.tsx"
            language="tsx"
          />
        </div>

        {/* Problems with Hooks */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <Icon name="alert" className="w-8 h-8 text-red-400 mr-3" />
            Problems with React Hooks
          </h2>
          <p className="text-gray-300 mb-6">
            While Hooks were an improvement over class components in React, they
            introduced several fundamental problems that make codebases harder
            to maintain and debug.
          </p>
          <CodeBlock
            code={hooksProblemsExample}
            filename="ReactHooksProblems.tsx"
            language="tsx"
          />

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-800/50 border border-red-500/20 rounded-lg p-5">
              <h3 className="text-red-400 font-semibold mb-3 flex items-center">
                <Icon name="alert" className="w-5 h-5 mr-2" />
                Stale Closures
              </h3>
              <p className="text-gray-400 text-sm mb-2">
                Functions capture variables at creation time. When state
                updates, old functions still reference old values.
              </p>
              <p className="text-gray-500 text-xs">
                Solution: useCallback with correct dependencies (complex and
                error-prone)
              </p>
            </div>
            <div className="bg-gray-800/50 border border-red-500/20 rounded-lg p-5">
              <h3 className="text-red-400 font-semibold mb-3 flex items-center">
                <Icon name="alert" className="w-5 h-5 mr-2" />
                Dependency Arrays
              </h3>
              <p className="text-gray-400 text-sm mb-2">
                Every useEffect needs perfect dependency arrays. Miss one?
                Silent bugs. Include too many? Infinite loops.
              </p>
              <p className="text-gray-500 text-xs">
                Solution: ESLint rules (still manual and tedious)
              </p>
            </div>
            <div className="bg-gray-800/50 border border-red-500/20 rounded-lg p-5">
              <h3 className="text-red-400 font-semibold mb-3 flex items-center">
                <Icon name="alert" className="w-5 h-5 mr-2" />
                Rules of Hooks
              </h3>
              <p className="text-gray-400 text-sm mb-2">
                Can't call hooks conditionally, in loops, or in nested
                functions. These artificial restrictions limit code
                organization.
              </p>
              <p className="text-gray-500 text-xs">
                Solution: Awkward workarounds and code duplication
              </p>
            </div>
            <div className="bg-gray-800/50 border border-red-500/20 rounded-lg p-5">
              <h3 className="text-red-400 font-semibold mb-3 flex items-center">
                <Icon name="alert" className="w-5 h-5 mr-2" />
                Constant Re-renders
              </h3>
              <p className="text-gray-400 text-sm mb-2">
                Every state change re-runs the entire function, recreating JSX
                and requiring Virtual DOM reconciliation.
              </p>
              <p className="text-gray-500 text-xs">
                Solution: useMemo, React.memo, careful optimization
              </p>
            </div>
          </div>
        </div>

        {/* Classes: The Solution */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <Icon name="check" className="w-8 h-8 text-green-400 mr-3" />
            Classes: The Solution
          </h2>
          <p className="text-gray-300 mb-6">
            MiniJS classes eliminate all these problems. State is just
            properties, methods are stable, and render() runs once.
          </p>
          <CodeBlock
            code={classesAdvantagesExample}
            filename="MinJSClasses.tsx"
            language="tsx"
          />
        </div>

        {/* Props Typing */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <Icon name="code" className="w-8 h-8 text-blue-400 mr-3" />
            Type-Safe Props
          </h2>
          <p className="text-gray-300 mb-6">
            Props in MiniJS are fully type-safe with TypeScript. Define an
            interface, pass it as a generic, and get complete autocomplete and
            type checking.
          </p>
          <CodeBlock
            code={propsTypingExample}
            filename="UserCard.tsx"
            language="tsx"
          />
        </div>

        {/* Memory Management */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <Icon name="settings" className="w-8 h-8 text-purple-400 mr-3" />
            Memory Management
          </h2>
          <p className="text-gray-300 mb-6">
            Classes make memory management explicit and predictable. Store
            references in properties, clean them up in lifecycle hooks.
          </p>
          <CodeBlock
            code={memoryManagementExample}
            filename="DataComponent.tsx"
            language="tsx"
          />

          <div className="mt-6 bg-green-500/10 border border-green-500/20 rounded-lg p-6">
            <div className="flex items-start">
              <Icon
                name="check"
                className="w-6 h-6 text-green-400 mr-4 mt-0.5 shrink-0"
              />
              <div>
                <p className="text-green-300 font-semibold mb-2">
                  Automatic Cleanup
                </p>
                <p className="text-gray-300 text-sm">
                  Return a cleanup function or Observable from{" "}
                  <code className="px-1 bg-gray-900 rounded text-purple-400">
                    @Mount()
                  </code>
                  , and MiniJS automatically calls it when the component
                  unmounts. No memory leaks!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <Icon name="compare" className="w-8 h-8 text-pink-400 mr-3" />
            Hooks vs Classes Comparison
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="p-4 text-white">Feature</th>
                  <th className="p-4 text-red-400">React Hooks</th>
                  <th className="p-4 text-green-400">MiniJS Classes</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b border-gray-800">
                  <td className="p-4 text-gray-400">State</td>
                  <td className="p-4 text-gray-300">useState</td>
                  <td className="p-4 text-gray-300">signal()</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="p-4 text-gray-400">Side Effects</td>
                  <td className="p-4 text-gray-300">useEffect</td>
                  <td className="p-4 text-gray-300">@Mount, @Watch</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="p-4 text-gray-400">Memoization</td>
                  <td className="p-4 text-gray-300">useMemo</td>
                  <td className="p-4 text-gray-300">computed (signal.map)</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="p-4 text-gray-400">Callbacks</td>
                  <td className="p-4 text-gray-300">useCallback</td>
                  <td className="p-4 text-gray-300">Regular methods</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="p-4 text-gray-400">Refs</td>
                  <td className="p-4 text-gray-300">useRef</td>
                  <td className="p-4 text-gray-300">Class properties</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="p-4 text-gray-400">Context</td>
                  <td className="p-4 text-gray-300">useContext</td>
                  <td className="p-4 text-gray-300">@Inject (DI)</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="p-4 text-gray-400">Rules</td>
                  <td className="p-4 text-red-300">Yes (strict)</td>
                  <td className="p-4 text-green-300">No rules</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="p-4 text-gray-400">Stale Closures</td>
                  <td className="p-4 text-red-300">Common</td>
                  <td className="p-4 text-green-300">Impossible</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="p-4 text-gray-400">Dependency Arrays</td>
                  <td className="p-4 text-red-300">Required</td>
                  <td className="p-4 text-green-300">Not needed</td>
                </tr>
                <tr>
                  <td className="p-4 text-gray-400">Re-renders</td>
                  <td className="p-4 text-red-300">Every state change</td>
                  <td className="p-4 text-green-300">Never (granular)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Best Practices */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <Icon name="lightbulb" className="w-8 h-8 text-yellow-400 mr-3" />
            Best Practices
          </h2>
          <div className="space-y-4">
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
              <div className="flex items-start">
                <Icon
                  name="check"
                  className="w-6 h-6 text-green-400 mr-4 mt-0.5 shrink-0"
                />
                <div>
                  <h3 className="text-white font-semibold mb-2">
                    Keep State as Class Properties
                  </h3>
                  <p className="text-gray-400 text-sm mb-3">
                    All reactive state should be signals declared as class
                    properties. This makes the component's state explicit and
                    easy to understand.
                  </p>
                  <CodeBlock
                    code={`// ✅ Good
export class Dashboard extends Component {
  users = signal<User[]>([]);
  loading = signal(false);
  filter = signal<'all' | 'active'>('all');
}`}
                    language="tsx"
                    layout="compact"
                  />
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
              <div className="flex items-start">
                <Icon
                  name="check"
                  className="w-6 h-6 text-green-400 mr-4 mt-0.5 shrink-0"
                />
                <div>
                  <h3 className="text-white font-semibold mb-2">
                    Use Methods for Actions
                  </h3>
                  <p className="text-gray-400 text-sm mb-3">
                    Methods are stable references that never change. Use them
                    for event handlers and actions—no useCallback needed!
                  </p>
                  <CodeBlock
                    code={`// ✅ Good
export class UserList extends Component {
  handleDelete(userId: string) {
    this.users.set(prev => prev.filter(u => u.id !== userId));
  }
  
  render() {
    return (
      <button onClick={() => this.handleDelete('123')}>
        Delete
      </button>
    );
  }
}`}
                    language="tsx"
                    layout="compact"
                  />
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
              <div className="flex items-start">
                <Icon
                  name="check"
                  className="w-6 h-6 text-green-400 mr-4 mt-0.5 shrink-0"
                />
                <div>
                  <h3 className="text-white font-semibold mb-2">
                    Organize with Private Methods
                  </h3>
                  <p className="text-gray-400 text-sm mb-3">
                    Use private methods to organize complex logic. This keeps
                    your render method clean and makes testing easier.
                  </p>
                  <CodeBlock
                    code={`// ✅ Good
export class DataTable extends Component {
  private sortData(data: Data[]) {
    return [...data].sort((a, b) => a.name.localeCompare(b.name));
  }
  
  private filterData(data: Data[]) {
    return data.filter(d => d.active);
  }
  
  render() {
    const processedData = this.filterData(this.sortData(this.data.value));
    return <Table data={processedData} />;
  }
}`}
                    language="tsx"
                    layout="compact"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-white mb-4">Learn More</h2>
          <p className="text-gray-300 mb-6">
            Now that you understand why classes are superior, explore related
            topics.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/core/lifecycle"
              className="bg-gray-900/50 border border-gray-700 rounded-lg p-4 hover:border-purple-500/50 transition-colors"
            >
              <Icon name="lifecycle" className="w-6 h-6 text-green-400 mb-3" />
              <h3 className="text-white font-semibold mb-2">
                Lifecycle Management
              </h3>
              <p className="text-gray-400 text-sm">
                Master @Mount, @Watch, and component lifecycle
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
                Learn about MiniJS's type-safe DI system
              </p>
            </Link>
            <Link
              href="/comparison/vs-react"
              className="bg-gray-900/50 border border-gray-700 rounded-lg p-4 hover:border-purple-500/50 transition-colors"
            >
              <Icon name="compare" className="w-6 h-6 text-pink-400 mb-3" />
              <h3 className="text-white font-semibold mb-2">MiniJS vs React</h3>
              <p className="text-gray-400 text-sm">
                Detailed comparison with React and Hooks
              </p>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

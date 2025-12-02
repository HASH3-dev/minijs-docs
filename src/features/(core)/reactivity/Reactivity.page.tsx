import { Component } from "@mini/core";
import { Link, Route } from "@mini/router";
import { CodeBlock } from "@/shared/components/CodeBlock";
import { Icon } from "@/shared/components/Icon";

@Route("/core/reactivity")
export class ReactivityPage extends Component {
  render() {
    const basicSignalExample = `import { Component, signal } from "@mini/core";

export class Counter extends Component {
  count = signal(0);

  increment() {
    this.count.set((prev) => prev + 1);
  }

  render() {
    // render() executes ONCE
    // Only {this.count} updates in the DOM
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

    const signalApiExample = `const numbers = signal([1, 2, 3, 4, 5]);

// map - Transform each item
const doubled = numbers.map(n => n * 2);
doubled.subscribe(v => console.log(v)); // [2, 4, 6, 8, 10]

// filter - Filter items by condition
const evens = numbers.filter(n => n % 2 === 0);
evens.subscribe(v => console.log(v)); // [2, 4]

// reduce - Reduce to a single value
const sum = numbers.reduce((acc, n) => acc + n, 0);
sum.subscribe(v => console.log(v)); // 15

// orElse - Provide fallback value
const items = signal([]);
const display = items.orElse(() => [{ name: 'No items' }]);

// get - Deep property access
const user = signal({ 
  profile: { 
    name: 'John',
    address: { city: 'NYC' }
  } 
});
const city = user.get('profile.address.city');
city.subscribe(v => console.log(v)); // 'NYC'`;

    const promiseLikeExample = `import { Component, signal, Mount } from "@mini/core";

export class UserProfile extends Component {
  user = signal<User>();

  @Mount()
  async loadUser() {
    // Signal is awaitable!
    const userData = await this.user;
    console.log('User loaded:', userData.name);

    // Promise-like chaining
    this.user
      .then(user => console.log('Name:', user.name))
      .catch(err => console.error('Error:', err))
      .finally(() => console.log('Done!'));
  }

  render() {
    return (
      <div>
        {this.user.map(u => (
          <h1>{u.name}</h1>
        ))}
      </div>
    );
  }
}`;

    const rxjsExample = `import { Component, signal, Mount } from "@mini/core";
import { debounceTime, distinctUntilChanged, filter } from "rxjs/operators";

export class SearchComponent extends Component {
  query = signal('');
  results = signal([]);

  @Mount()
  setupSearch() {
    // Signals are RxJS observables!
    // By the way, if you returns a subscription from @Mount(), MiniJS auto-unsubscribes on unmount.
    // If you return and observable, MiniJS subscribes for you and cleans up on unmount as well.
    return this.query.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      filter(q => q.length > 2)
    ).subscribe(query => {
      this.performSearch(query);
    });
  }

  async performSearch(query: string) {
    const results = await fetch(\`/api/search?q=\${query}\`);
    this.results.set(await results.json());
  }

  render() {
    return (
      <div>
        <input 
          value={this.query}
          onInput={(e) => this.query.set(e.target.value)}
          placeholder="Search..."
        />
        <ul>
          {this.results.map(item => (
            <li key={item.id}>{item.title}</li>
          ))}
        </ul>
      </div>
    );
  }
}`;

    const comparisonExample = `// ❌ REACT - Virtual DOM
function Counter() {
  const [count, setCount] = useState(0);
  
  // This entire function re-runs on every state change
  // Virtual DOM diff and reconciliation needed
  console.log('Component re-rendering...');
  
  return <div>{count}</div>;
}

// ✅ MINIJS - Granular Reactivity
export class Counter extends Component {
  count = signal(0);
  
  // render() runs ONCE
  // Only the text node with {this.count} updates
  render() {
    console.log('Component rendering... (only once!)');
    return <div>{this.count}</div>;
  }
}`;

    return (
      <div className="prose prose-invert max-w-none">
        {/* Hero Section */}
        <div className="mb-12">
          <div className="inline-flex items-center space-x-2 mb-6">
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
            <span className="text-yellow-400 text-sm font-medium">
              Core Concept
            </span>
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-linear-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
            Reactivity & Signals
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed">
            Understanding MiniJS's granular reactivity system powered by Signals
            and RxJS.
          </p>
        </div>

        {/* What is Granular Reactivity */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <Icon name="lightning" className="w-8 h-8 text-yellow-400 mr-3" />
            What is Granular Reactivity?
          </h2>
          <p className="text-gray-300 mb-6 text-lg">
            Unlike Virtual DOM frameworks that re-render entire components when
            state changes, MiniJS uses{" "}
            <strong className="text-yellow-400">granular reactivity</strong> to
            update only the specific DOM nodes that depend on changed signals.
          </p>

          <div className="bg-linear-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-xl p-6 mb-6">
            <div className="flex items-start">
              <Icon
                name="info"
                className="w-6 h-6 text-yellow-400 mr-4 mt-0.5 shrink-0"
              />
              <div>
                <p className="text-yellow-300 font-semibold mb-2 mt-0">
                  Zero Re-renders
                </p>
                <p className="text-gray-300 mb-2">
                  When a signal changes, MiniJS updates the DOM directly
                  without:
                </p>
                <ul className="text-gray-400 text-sm space-y-1 ml-4">
                  <li>• Re-running your component function</li>
                  <li>• Creating a Virtual DOM tree</li>
                  <li>• Diffing and reconciliation</li>
                  <li>• Touching unaffected DOM nodes</li>
                </ul>
              </div>
            </div>
          </div>

          <CodeBlock
            code={basicSignalExample}
            filename="Counter.tsx"
            language="tsx"
          />
        </div>

        {/* Signal API */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <Icon name="code" className="w-8 h-8 text-purple-400 mr-3" />
            Signal API
          </h2>
          <p className="text-gray-300 mb-6">
            Signals are reactive primitives that work with any iterable (arrays,
            Sets, Maps) and provide a functional API inspired by JavaScript
            array methods.
          </p>
          <CodeBlock
            code={signalApiExample}
            filename="SignalAPI.ts"
            language="tsx"
          />

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-5">
              <code className="text-purple-400 text-sm font-mono mb-2 block">
                map()
              </code>
              <p className="text-gray-400 text-sm">
                Transform each item in the signal. Works with arrays, Sets,
                Maps, and any iterable.
              </p>
            </div>
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-5">
              <code className="text-purple-400 text-sm font-mono mb-2 block">
                filter()
              </code>
              <p className="text-gray-400 text-sm">
                Filter items by condition. Perfect for search, filtering lists,
                and conditional rendering.
              </p>
            </div>
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-5">
              <code className="text-purple-400 text-sm font-mono mb-2 block">
                reduce()
              </code>
              <p className="text-gray-400 text-sm">
                Reduce to a single value. Great for totals, aggregations, and
                computations.
              </p>
            </div>
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-5">
              <code className="text-purple-400 text-sm font-mono mb-2 block">
                orElse()
              </code>
              <p className="text-gray-400 text-sm">
                Provide a fallback value when signal is empty or undefined.
              </p>
            </div>
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-5">
              <code className="text-purple-400 text-sm font-mono mb-2 block">
                get()
              </code>
              <p className="text-gray-400 text-sm">
                Deep property access with dot notation. Type-safe and reactive.
              </p>
            </div>
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-5">
              <code className="text-purple-400 text-sm font-mono mb-2 block">
                subscribe()
              </code>
              <p className="text-gray-400 text-sm">
                Subscribe to changes. Returns RxJS Subscription for cleanup.
              </p>
            </div>
          </div>
        </div>

        {/* Signals as Promises */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <Icon name="lifecycle" className="w-8 h-8 text-green-400 mr-3" />
            Signals as Promises
          </h2>
          <p className="text-gray-300 mb-6">
            Signals are awaitable! Use{" "}
            <code className="px-2 py-1 bg-gray-800 rounded text-purple-400">
              await
            </code>{" "}
            to get the next emitted value, or use promise-like chaining with{" "}
            <code className="px-2 py-1 bg-gray-800 rounded text-purple-400">
              then()
            </code>
            ,{" "}
            <code className="px-2 py-1 bg-gray-800 rounded text-purple-400">
              catch()
            </code>
            , and{" "}
            <code className="px-2 py-1 bg-gray-800 rounded text-purple-400">
              finally()
            </code>
            .
          </p>
          <CodeBlock
            code={promiseLikeExample}
            filename="PromiseLike.tsx"
            language="tsx"
          />
        </div>

        {/* RxJS Integration */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <Icon name="settings" className="w-8 h-8 text-blue-400 mr-3" />
            RxJS Integration
          </h2>
          <p className="text-gray-300 mb-6">
            Signals are built on RxJS ReplaySubject, giving you access to the
            entire RxJS operator ecosystem. Use operators like{" "}
            <code className="px-2 py-1 bg-gray-800 rounded text-purple-400">
              debounceTime
            </code>
            ,{" "}
            <code className="px-2 py-1 bg-gray-800 rounded text-purple-400">
              switchMap
            </code>
            ,{" "}
            <code className="px-2 py-1 bg-gray-800 rounded text-purple-400">
              combineLatest
            </code>
            , and hundreds more.
          </p>
          <CodeBlock
            code={rxjsExample}
            filename="RxJSIntegration.tsx"
            language="tsx"
          />

          <div className="mt-6 bg-blue-500/10 border border-blue-500/20 rounded-lg p-6">
            <div className="flex items-start">
              <Icon
                name="info"
                className="w-6 h-6 text-blue-400 mr-4 mt-0.5 shrink-0"
              />
              <div>
                <p className="text-blue-300 font-semibold mb-2">
                  Automatic Cleanup
                </p>
                <p className="text-gray-300 text-sm">
                  When you return an Observable subscription from{" "}
                  <code className="px-1 bg-gray-900 rounded text-purple-400">
                    @Mount()
                  </code>
                  , MiniJS automatically unsubscribes when the component
                  unmounts. No memory leaks!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Comparison with Virtual DOM */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <Icon name="compare" className="w-8 h-8 text-pink-400 mr-3" />
            Granular vs Virtual DOM
          </h2>
          <p className="text-gray-300 mb-6">
            See the fundamental difference between MiniJS's granular reactivity
            and Virtual DOM frameworks.
          </p>
          <CodeBlock
            code={comparisonExample}
            filename="Comparison.tsx"
            language="tsx"
          />

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6">
              <h3 className="text-red-400 font-semibold mb-3 flex items-center">
                <Icon name="close" className="w-5 h-5 mr-2" />
                Virtual DOM (React)
              </h3>
              <ul className="text-gray-400 text-sm space-y-2">
                <li>• Re-runs component function on every change</li>
                <li>• Creates Virtual DOM tree</li>
                <li>• Diffs and reconciles</li>
                <li>• Updates multiple DOM nodes</li>
                <li>• CPU overhead from reconciliation</li>
              </ul>
            </div>
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-6">
              <h3 className="text-green-400 font-semibold mb-3 flex items-center">
                <Icon name="check" className="w-5 h-5 mr-2" />
                Granular (MiniJS)
              </h3>
              <ul className="text-gray-400 text-sm space-y-2">
                <li>• render() runs ONCE</li>
                <li>• No Virtual DOM</li>
                <li>• No diffing or reconciliation</li>
                <li>• Updates only changed nodes</li>
                <li>• Minimal CPU overhead</li>
              </ul>
            </div>
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
                    Initialize Signals with Default Values
                  </h3>
                  <p className="text-gray-400 text-sm mb-3">
                    Always provide a default value to avoid undefined errors in
                    your templates.
                  </p>
                  <CodeBlock
                    code={`// ✅ Good
users = signal<User[]>([]);

// ❌ Bad
users = signal<User[]>();`}
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
                    Use Functional Updates
                  </h3>
                  <p className="text-gray-400 text-sm mb-3">
                    When updating based on current value, use the functional
                    form to avoid stale closures.
                  </p>
                  <CodeBlock
                    code={`// ✅ Good
this.count.set(prev => prev + 1);

// ⚠️ Works, but functional form is safer
this.count.set(this.count.value + 1);`}
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
                    Cleanup Subscriptions
                  </h3>
                  <p className="text-gray-400 text-sm mb-3">
                    Return subscriptions from @Mount() for automatic cleanup, or
                    manually unsubscribe.
                  </p>
                  <CodeBlock
                    code={`// ✅ Good - Automatic cleanup
@Mount()
setupListener() {
  return this.data$.subscribe(d => this.data.set(d));
}

// ✅ Also good - Manual cleanup
@Mount()
setupListener() {
  const sub = this.data$.subscribe(d => this.data.set(d));
  return () => sub.unsubscribe();
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
        <div className="bg-linear-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-white mb-4">Explore More</h2>
          <p className="text-gray-300 mb-6">
            Now that you understand reactivity, explore related concepts.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/decorators/watch"
              className="bg-gray-900/50 border border-gray-700 rounded-lg p-4 hover:border-purple-500/50 transition-colors"
            >
              <Icon name="eye" className="w-6 h-6 text-blue-400 mb-3" />
              <h3 className="text-white font-semibold mb-2">
                @Watch Decorator
              </h3>
              <p className="text-gray-400 text-sm">
                React to signal changes with the @Watch decorator
              </p>
            </Link>
            <Link
              href="/core/lifecycle"
              className="bg-gray-900/50 border border-gray-700 rounded-lg p-4 hover:border-purple-500/50 transition-colors"
            >
              <Icon name="lifecycle" className="w-6 h-6 text-green-400 mb-3" />
              <h3 className="text-white font-semibold mb-2">
                Lifecycle Management
              </h3>
              <p className="text-gray-400 text-sm">
                Learn about @Mount and component lifecycle
              </p>
            </Link>
            <Link
              href="/advanced/rxjs-integration"
              className="bg-gray-900/50 border border-gray-700 rounded-lg p-4 hover:border-purple-500/50 transition-colors"
            >
              <Icon name="settings" className="w-6 h-6 text-purple-400 mb-3" />
              <h3 className="text-white font-semibold mb-2">
                RxJS Integration
              </h3>
              <p className="text-gray-400 text-sm">
                Deep dive into RxJS operators and patterns
              </p>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

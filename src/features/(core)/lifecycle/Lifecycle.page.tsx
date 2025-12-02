import { Component } from "@mini/core";
import { Link, Route } from "@mini/router";
import { CodeBlock } from "@/shared/components/CodeBlock";
import { Icon } from "@/shared/components/Icon";

@Route("/core/lifecycle")
export class LifecyclePage extends Component {
  render() {
    const basicMountExample = `import { Component, signal, Mount } from "@mini/core";

export class DataLoader extends Component {
  data = signal<Data[]>([]);
  loading = signal(true);
  
  // @Mount runs when component is mounted
  @Mount()
  async loadData() {
    try {
      const response = await fetch('/api/data');
      const data = await response.json();
      this.data.set(data);
    } finally {
      this.loading.set(false);
    }
  }
  
  render() {
    return (
      <div>
        {this.loading.map(l => 
          l ? <Spinner /> : <DataList data={this.data} />
        )}
      </div>
    );
  }
}`;

    const multipleMountExample = `export class Dashboard extends Component {
  users = signal<User[]>([]);
  stats = signal<Stats | null>(null);
  
  // Multiple @Mount decorators execute in order
  @Mount()
  async loadUsers() {
    const users = await fetchUsers();
    this.users.set(users);
  }
  
  @Mount()
  async loadStats() {
    const stats = await fetchStats();
    this.stats.set(stats);
  }
  
  @Mount()
  setupPolling() {
    // Poll for updates every 30 seconds
    const interval = setInterval(() => {
      this.loadUsers();
      this.loadStats();
    }, 30000);
    
    // Return cleanup function
    return () => clearInterval(interval);
  }
  
  render() {
    return (
      <div>
        <UserList users={this.users} />
        <StatsDashboard stats={this.stats} />
      </div>
    );
  }
}`;

    const cleanupExample = `export class WebSocketComponent extends Component {
  messages = signal<Message[]>([]);
  private ws: WebSocket | null = null;
  
  @Mount()
  setupWebSocket() {
    // Setup connection
    this.ws = new WebSocket('ws://localhost:8080');
    
    this.ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      this.messages.set([...this.messages.value, message]);
    };
    
    this.ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
    
    // Cleanup function - automatically called on unmount
    return () => {
      if (this.ws) {
        this.ws.close();
        this.ws = null;
      }
    };
  }
  
  render() {
    return (
      <div>
        {this.messages.map(msg => (
          <div key={msg.id}>{msg.text}</div>
        ))}
      </div>
    );
  }
}`;

    const watchExample = `import { Component, signal, Watch } from "@mini/core";

export class SearchComponent extends Component {
  searchQuery = signal('');
  results = signal<Result[]>([]);
  
  // @Watch observes signal changes
  @Watch('searchQuery')
  onSearchChange(query: string) {
    console.log('Search query changed:', query);
    
    if (query.length > 2) {
      this.performSearch(query);
    } else {
      this.results.set([]);
    }
  }
  
  async performSearch(query: string) {
    const results = await searchAPI(query);
    this.results.set(results);
  }
  
  render() {
    return (
      <div>
        <input 
          type="text"
          value={this.searchQuery}
          onInput={(e) => this.searchQuery.set(e.target.value)}
        />
        <ResultsList results={this.results} />
      </div>
    );
  }
}`;

    const watchAdvancedExample = `import { Component, signal, Watch } from "@mini/core";
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';

export class AdvancedSearch extends Component {
  search = signal('');
  results = signal<Result[]>([]);
  loading = signal(false);
  
  // @Watch with RxJS operators
  @Watch('search', {
    pipes: [
      debounceTime(500),
      distinctUntilChanged(),
      filter((query: string) => query.length > 2)
    ]
  })
  async onSearchDebounced(query: string) {
    this.loading.set(true);
    try {
      const results = await searchAPI(query);
      this.results.set(results);
    } finally {
      this.loading.set(false);
    }
  }
  
  // Watch with dot notation for nested properties
  @Watch('user.profile.name')
  onUserNameChange(name: string) {
    console.log('User name changed:', name);
  }
  
  // Skip initial value (only watch subsequent changes)
  @Watch('counter', { skipInitialValue: true })
  onCounterChange(value: number) {
    console.log('Counter changed to:', value);
  }
  
  render() {
    return (
      <div>
        <input 
          type="text"
          value={this.search}
          onInput={(e) => this.search.set(e.target.value)}
        />
        {this.loading.value && <Spinner />}
        <ResultsList results={this.results} />
      </div>
    );
  }
}`;

    const observablesExample = `import { Component, Mount } from "@mini/core";

export class LifecycleObservables extends Component {
  @Mount()
  setupLifecycleHooks() {
    // Subscribe to mounted event
    this.$.mounted$.subscribe(() => {
      console.log('Component mounted!');
      this.initializeFeatures();
    });
    
    // Subscribe to unmount event
    this.$.unmount$.subscribe(() => {
      console.log('Component will unmount!');
      this.cleanupResources();
    });
  }
  
  initializeFeatures() {
    // Initialize features after mount
  }
  
  cleanupResources() {
    // Clean up before unmount
  }
  
  render() {
    return <div>Component with lifecycle observables</div>;
  }
}`;

    const rxjsCleanupExample = `import { Component, Mount, signal } from "@mini/core";
import { interval, fromEvent } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

export class RxJSComponent extends Component {
  count = signal(0);
  clicks = signal(0);
  
  @Mount()
  setupIntervalSubscription() {
    // Return observable - automatically unsubscribed on unmount
    return interval(1000).subscribe(() => {
      this.count.set(this.count.value + 1);
    });
  }
  
  @Mount()
  setupClickTracking() {
    const button = document.getElementById('myButton');
    
    if (button) {
      // Return observable subscription
      return fromEvent(button, 'click')
        .pipe(
          // Auto-unsubscribe when component unmounts
          takeUntil(this.$.unmount$)
        )
        .subscribe(() => {
          this.clicks.set(this.clicks.value + 1);
        });
    }
  }
  
  render() {
    return (
      <div>
        <p>Count: {this.count}</p>
        <button id="myButton">Clicks: {this.clicks}</button>
      </div>
    );
  }
}`;

    const complexLifecycleExample = `export class ComplexDashboard extends Component {
  data = signal<Data[]>([]);
  filters = signal({ region: 'all', status: 'active' });
  ws: WebSocket | null = null;
  pollInterval: number | null = null;
  
  // 1. Load initial data
  @Mount()
  async loadInitialData() {
    const data = await fetchData(this.filters.value);
    this.data.set(data);
  }
  
  // 2. Setup WebSocket connection
  @Mount()
  setupWebSocket() {
    this.ws = new WebSocket('ws://api.example.com');
    
    this.ws.onmessage = (event) => {
      const update = JSON.parse(event.data);
      this.handleUpdate(update);
    };
    
    return () => {
      this.ws?.close();
    };
  }
  
  // 3. Setup polling fallback
  @Mount()
  setupPolling() {
    this.pollInterval = setInterval(() => {
      if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
        this.loadInitialData();
      }
    }, 10000);
    
    return () => {
      if (this.pollInterval) {
        clearInterval(this.pollInterval);
      }
    };
  }
  
  // 4. Watch for filter changes
  @Watch('filters')
  async onFiltersChange(filters: Filters) {
    const data = await fetchData(filters);
    this.data.set(data);
  }
  
  handleUpdate(update: Update) {
    this.data.set(prev => {
      const index = prev.findIndex(item => item.id === update.id);
      if (index >= 0) {
        const newData = [...prev];
        newData[index] = { ...newData[index], ...update };
        return newData;
      }
      return prev;
    });
  }
  
  render() {
    return (
      <div>
        <FilterBar filters={this.filters} />
        <DataGrid data={this.data} />
      </div>
    );
  }
}`;

    return (
      <div className="prose prose-invert max-w-none">
        {/* Hero Section */}
        <div className="mb-12">
          <div className="inline-flex items-center space-x-2 mb-6">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-400 text-sm font-medium">
              Core Concept
            </span>
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-linear-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
            Lifecycle Management
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed">
            Master component lifecycle with @Mount and @Watch decorators for
            setup, cleanup, and reactive updates.
          </p>
        </div>

        {/* @Mount Decorator */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <Icon name="lifecycle" className="w-8 h-8 text-green-400 mr-3" />
            @Mount Decorator
          </h2>
          <p className="text-gray-300 mb-6 text-lg">
            The{" "}
            <code className="px-2 py-1 bg-gray-800 rounded text-purple-400">
              @Mount()
            </code>{" "}
            decorator marks methods that should run when the component is
            mounted to the DOM. Perfect for data loading, subscriptions, and
            initialization logic.
          </p>

          <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6 mb-6">
            <div className="flex items-start">
              <Icon
                name="info"
                className="w-6 h-6 text-green-400 mr-4 mt-0.5 shrink-0"
              />
              <div>
                <p className="text-green-300 font-semibold mb-2">
                  When to use @Mount
                </p>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Loading initial data from APIs</li>
                  <li>• Setting up WebSocket connections</li>
                  <li>• Subscribing to observables or events</li>
                  <li>• Starting intervals or timers</li>
                  <li>• Initializing third-party libraries</li>
                </ul>
              </div>
            </div>
          </div>

          <CodeBlock
            code={basicMountExample}
            filename="DataLoader.tsx"
            language="TypeScript"
          />
        </div>

        {/* Multiple @Mount */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <Icon name="layers" className="w-8 h-8 text-blue-400 mr-3" />
            Multiple @Mount Decorators
          </h2>
          <p className="text-gray-300 mb-6">
            You can use multiple{" "}
            <code className="px-2 py-1 bg-gray-800 rounded text-purple-400">
              @Mount()
            </code>{" "}
            decorators in a single component. They execute in the order they are
            defined, making it easy to organize initialization logic.
          </p>
          <CodeBlock
            code={multipleMountExample}
            filename="MultipleMounts.tsx"
            language="TypeScript"
          />
        </div>

        {/* Cleanup */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <Icon name="trash" className="w-8 h-8 text-red-400 mr-3" />
            Automatic Cleanup
          </h2>
          <p className="text-gray-300 mb-6">
            Return a cleanup function from{" "}
            <code className="px-2 py-1 bg-gray-800 rounded text-purple-400">
              @Mount()
            </code>{" "}
            to run code when the component unmounts. MiniJS automatically calls
            this function, preventing memory leaks.
          </p>

          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6 mb-6">
            <div className="flex items-start">
              <Icon
                name="alert"
                className="w-6 h-6 text-red-400 mr-4 mt-0.5 shrink-0"
              />
              <div>
                <p className="text-red-300 font-semibold mb-2">
                  Always Clean Up
                </p>
                <p className="text-gray-300 text-sm">
                  Resources like WebSockets, intervals, event listeners, and
                  subscriptions must be cleaned up to prevent memory leaks.
                  Return a cleanup function or return an Observable/Subscription
                  that will be automatically unsubscribed.
                </p>
              </div>
            </div>
          </div>

          <CodeBlock
            code={cleanupExample}
            filename="WebSocketComponent.tsx"
            language="TypeScript"
          />
        </div>

        {/* Lifecycle Observables */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <Icon name="refresh" className="w-8 h-8 text-cyan-400 mr-3" />
            Lifecycle Observables
          </h2>
          <p className="text-gray-300 mb-6">
            Every component has{" "}
            <code className="px-2 py-1 bg-gray-800 rounded text-purple-400">
              $.mounted$
            </code>{" "}
            and{" "}
            <code className="px-2 py-1 bg-gray-800 rounded text-purple-400">
              $.unmount$
            </code>{" "}
            observables for manual lifecycle management when decorators aren't
            sufficient.
          </p>
          <CodeBlock
            code={observablesExample}
            filename="LifecycleObservables.tsx"
            language="TypeScript"
          />

          <div className="mt-6 bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-6">
            <div className="flex items-start">
              <Icon
                name="lightbulb"
                className="w-6 h-6 text-cyan-400 mr-4 mt-0.5 shrink-0"
              />
              <div>
                <p className="text-cyan-300 font-semibold mb-2">
                  When to use lifecycle observables
                </p>
                <p className="text-gray-300 text-sm">
                  Prefer{" "}
                  <code className="px-1 bg-gray-900 rounded text-purple-400">
                    @Mount()
                  </code>{" "}
                  and{" "}
                  <code className="px-1 bg-gray-900 rounded text-purple-400">
                    @Watch()
                  </code>{" "}
                  decorators for most cases. Use lifecycle observables when you
                  need more dynamic control or when composing complex reactive
                  behaviors.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RxJS Integration */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <Icon name="link" className="w-8 h-8 text-orange-400 mr-3" />
            RxJS Automatic Cleanup
          </h2>
          <p className="text-gray-300 mb-6">
            MiniJS provides multiple ways to handle RxJS cleanup automatically:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-5">
              <h3 className="text-white font-semibold mb-3 text-sm">
                Return Subscription
              </h3>
              <p className="text-gray-400 text-sm">
                Return a Subscription from @Mount and it will be automatically
                unsubscribed on unmount.
              </p>
            </div>
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-5">
              <h3 className="text-white font-semibold mb-3 text-sm">
                Return Observable
              </h3>
              <p className="text-gray-400 text-sm">
                Return an Observable and MiniJS will subscribe and
                auto-unsubscribe for you.
              </p>
            </div>
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-5">
              <h3 className="text-white font-semibold mb-3 text-sm">
                Use takeUntil
              </h3>
              <p className="text-gray-400 text-sm">
                Use <code className="text-xs">takeUntil($.unmount$)</code> to
                auto-complete observables on unmount.
              </p>
            </div>
          </div>

          <CodeBlock
            code={rxjsCleanupExample}
            filename="RxJSCleanup.tsx"
            language="TypeScript"
          />
        </div>

        {/* this.lifecycle$ */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <Icon name="refresh" className="w-8 h-8 text-indigo-400 mr-3" />
            this.lifecycle$ Observable
          </h2>
          <p className="text-gray-300 mb-6">
            Every component has a{" "}
            <code className="px-2 py-1 bg-gray-800 rounded text-purple-400">
              lifecycle$
            </code>{" "}
            observable that emits lifecycle phases. This allows you to react to
            lifecycle events programmatically.
          </p>

          <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-6 mb-6">
            <div className="flex items-start">
              <Icon
                name="info"
                className="w-6 h-6 text-indigo-400 mr-4 mt-0.5 shrink-0"
              />
              <div>
                <p className="text-indigo-300 font-semibold mb-3">
                  LifecyclePhase Enum
                </p>
                <div className="space-y-2 text-sm">
                  <div>
                    <code className="px-2 py-1 bg-gray-900 rounded text-purple-400">
                      Created
                    </code>
                    <p className="text-gray-400 mt-1">Component instantiated</p>
                  </div>
                  <div>
                    <code className="px-2 py-1 bg-gray-900 rounded text-purple-400">
                      BeforeMount
                    </code>
                    <p className="text-gray-400 mt-1">
                      Before render() is called (for Guards, Resolvers)
                    </p>
                  </div>
                  <div>
                    <code className="px-2 py-1 bg-gray-900 rounded text-purple-400">
                      Mounted
                    </code>
                    <p className="text-gray-400 mt-1">
                      Component mounted to DOM
                    </p>
                  </div>
                  <div>
                    <code className="px-2 py-1 bg-gray-900 rounded text-purple-400">
                      AfterMount
                    </code>
                    <p className="text-gray-400 mt-1">
                      After mount (for @Mount, @Watch decorators)
                    </p>
                  </div>
                  <div>
                    <code className="px-2 py-1 bg-gray-900 rounded text-purple-400">
                      BeforeDestroy
                    </code>
                    <p className="text-gray-400 mt-1">
                      Before component destruction (for cleanup)
                    </p>
                  </div>
                  <div>
                    <code className="px-2 py-1 bg-gray-900 rounded text-purple-400">
                      Destroyed
                    </code>
                    <p className="text-gray-400 mt-1">Component destroyed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <CodeBlock
            code={`import { Component, Mount, LifecyclePhase } from "@mini/core";

export class LifecycleTracker extends Component {
  @Mount()
  trackLifecycle() {
    this.lifecycle$.subscribe(phase => {
      switch (phase) {
        case LifecyclePhase.Created:
          console.log('Component created');
          break;
        case LifecyclePhase.BeforeMount:
          console.log('Before mount - Guards and Resolvers run');
          break;
        case LifecyclePhase.Mounted:
          console.log('Component mounted to DOM');
          break;
        case LifecyclePhase.AfterMount:
          console.log('After mount - @Mount decorators executed');
          this.initializeAnalytics();
          break;
        case LifecyclePhase.BeforeDestroy:
          console.log('Before destroy - Running cleanup');
          this.saveState();
          break;
        case LifecyclePhase.Destroyed:
          console.log('Component destroyed');
          break;
      }
    });
  }
  
  initializeAnalytics() {
    // Track page view
  }
  
  saveState() {
    // Save component state before unmounting
  }
  
  render() {
    return <div>Lifecycle Tracker</div>;
  }
}`}
            filename="LifecycleTracker.tsx"
            language="TypeScript"
          />
        </div>

        {/* Combining Decorators */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <Icon name="layers" className="w-8 h-8 text-pink-400 mr-3" />
            Combining Decorators
          </h2>
          <p className="text-gray-300 mb-6">
            You can combine multiple decorators on the same method. For example,
            combining{" "}
            <code className="px-2 py-1 bg-gray-800 rounded text-purple-400">
              @Mount
            </code>{" "}
            and{" "}
            <code className="px-2 py-1 bg-gray-800 rounded text-purple-400">
              @Watch
            </code>{" "}
            to both initialize and react to changes.
          </p>

          <CodeBlock
            code={`import { Component, signal, Mount, Watch } from "@mini/core";

export class DataSync extends Component {
  userId = signal<string>('');
  userData = signal<User | null>(null);
  loading = signal(false);
  
  // Combining @Mount and @Watch
  // This method runs on mount AND whenever userId changes
  @Mount()
  @Watch('userId')
  async loadUser(userId?: string) {
    // If called from @Watch, userId parameter is provided
    // If called from @Mount, use current signal value
    const id = userId || this.userId.value;
    
    if (!id) return;
    
    this.loading.set(true);
    try {
      const user = await fetchUser(id);
      this.userData.set(user);
    } finally {
      this.loading.set(false);
    }
  }
  
  render() {
    return (
      <div>
        <input 
          value={this.userId}
          onInput={(e) => this.userId.set(e.target.value)}
          placeholder="Enter user ID"
        />
        {this.loading.map((loading) => loading && <Spinner />)}
        {this.userData.map((user) => user && (
          <UserCard user={user} />
        ))}
      </div>
    );
  }
}

// Another example: Combining @Mount with @LoadData
export class Dashboard extends Component {
  @Mount()
  @LoadData({ label: 'Stats' })
  loadStats() {
    return fetchStats();
  }

  @LoadFragment({
    states: [RenderState.LOADING],
    label: 'Stats'
  })
  renderStatsSkeleton() {
    return <StatsSkeleton />;
  }
  
  render() {
    return (
      <div>
        <Loader fragment="Stats" />
      </div>
    );
  }
}`}
            filename="CombiningDecorators.tsx"
            language="TypeScript"
          />

          <div className="mt-6 bg-pink-500/10 border border-pink-500/20 rounded-lg p-6">
            <div className="flex items-start">
              <Icon
                name="lightbulb"
                className="w-6 h-6 text-pink-400 mr-4 mt-0.5 shrink-0"
              />
              <div>
                <p className="text-pink-300 font-semibold mb-2">
                  Decorator Execution Order
                </p>
                <p className="text-gray-300 text-sm">
                  When combining decorators, they execute in a specific order.
                  For example,
                  <code className="px-1 bg-gray-900 rounded text-purple-400">
                    @Mount
                  </code>{" "}
                  runs first to initialize, then{" "}
                  <code className="px-1 bg-gray-900 rounded text-purple-400">
                    @Watch
                  </code>{" "}
                  sets up the reactive subscription.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Complex Example */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <Icon name="terminal" className="w-8 h-8 text-pink-400 mr-3" />
            Complete Example
          </h2>
          <p className="text-gray-300 mb-6">
            A real-world example combining multiple @Mount decorators, @Watch,
            cleanup functions, and complex data flows.
          </p>
          <CodeBlock
            code={complexLifecycleExample}
            filename="ComplexDashboard.tsx"
            language="TypeScript"
          />
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
                    Always Return Cleanup
                  </h3>
                  <p className="text-gray-400 text-sm mb-3">
                    If your @Mount creates resources, always return a cleanup
                    function. This prevents memory leaks.
                  </p>
                  <CodeBlock
                    code={`@Mount()
setupTimer() {
  const interval = setInterval(() => {
    this.tick();
  }, 1000);
  
  // ✅ Always clean up
  return () => clearInterval(interval);
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
                    Use @Watch for Side Effects
                  </h3>
                  <p className="text-gray-400 text-sm mb-3">
                    Use @Watch when you need to react to signal changes, not for
                    derived state (use signal.map for that).
                  </p>
                  <CodeBlock
                    code={`// ✅ Good - Side effect
@Watch('userId')
async loadUserData(userId: string) {
  const data = await fetchUser(userId);
  this.userData.set(data);
}

// ❌ Bad - Use signal.map instead
// @Watch('count')
// getDoubled(count: number) {
//   this.doubled.set(count * 2);
// }

// ✅ Better - Derived state
get doubled() {
  return this.count.map(n => n * 2);
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
                    Organize Multiple @Mounts
                  </h3>
                  <p className="text-gray-400 text-sm mb-3">
                    Group related initialization logic in separate @Mount
                    methods for better code organization.
                  </p>
                  <CodeBlock
                    code={`// ✅ Good - Organized
export class Dashboard extends Component {
  @Mount()
  loadInitialData() {
    // Load data
  }
  
  @Mount()
  setupRealtime() {
    // WebSocket setup
  }
  
  @Mount()
  initializeAnalytics() {
    // Analytics
  }
}

// ❌ Bad - Everything in one method
@Mount()
doEverything() {
  // 100 lines of mixed concerns
}`}
                    language="tsx"
                    layout="compact"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Lifecycle Flow */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <Icon name="flow" className="w-8 h-8 text-teal-400 mr-3" />
            Lifecycle Flow
          </h2>
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-8">
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm mr-4">
                  1
                </div>
                <div>
                  <p className="text-white font-semibold">Created</p>
                  <p className="text-gray-400 text-sm">
                    Component instantiated, constructor runs
                  </p>
                </div>
              </div>
              <div className="ml-4 border-l-2 border-gray-700 h-8"></div>
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold text-sm mr-4">
                  2
                </div>
                <div>
                  <p className="text-white font-semibold">BeforeMount</p>
                  <p className="text-gray-400 text-sm">
                    Before render() - Guards and Resolvers execute
                  </p>
                </div>
              </div>
              <div className="ml-4 border-l-2 border-gray-700 h-8"></div>
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-sm mr-4">
                  3
                </div>
                <div>
                  <p className="text-white font-semibold">Mounted</p>
                  <p className="text-gray-400 text-sm">
                    Component mounted to DOM, render() completed
                  </p>
                </div>
              </div>
              <div className="ml-4 border-l-2 border-gray-700 h-8"></div>
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-sm mr-4">
                  4
                </div>
                <div>
                  <p className="text-white font-semibold">AfterMount</p>
                  <p className="text-gray-400 text-sm">
                    @Mount and @Watch decorators execute ($.mounted$ fires)
                  </p>
                </div>
              </div>
              <div className="ml-4 border-l-2 border-gray-700 h-8"></div>
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-sm mr-4">
                  5
                </div>
                <div>
                  <p className="text-white font-semibold">BeforeDestroy</p>
                  <p className="text-gray-400 text-sm">
                    Before destruction - cleanup functions run ($.unmount$
                    fires)
                  </p>
                </div>
              </div>
              <div className="ml-4 border-l-2 border-gray-700 h-8"></div>
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white font-bold text-sm mr-4">
                  6
                </div>
                <div>
                  <p className="text-white font-semibold">Destroyed</p>
                  <p className="text-gray-400 text-sm">
                    Component fully destroyed and removed
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            Continue Learning
          </h2>
          <p className="text-gray-300 mb-6">
            Now that you understand component lifecycle, explore related topics.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/core/props-children"
              className="bg-gray-900/50 border border-gray-700 rounded-lg p-4 hover:border-green-500/50 transition-colors"
            >
              <Icon name="folder" className="w-6 h-6 text-orange-400 mb-3" />
              <h3 className="text-white font-semibold mb-2">
                Props & Children
              </h3>
              <p className="text-gray-400 text-sm">
                Learn about props typing and component composition
              </p>
            </Link>
            <Link
              href="/features/dependency-injection"
              className="bg-gray-900/50 border border-gray-700 rounded-lg p-4 hover:border-green-500/50 transition-colors"
            >
              <Icon
                name="adjustments"
                className="w-6 h-6 text-purple-400 mb-3"
              />
              <h3 className="text-white font-semibold mb-2">
                Dependency Injection
              </h3>
              <p className="text-gray-400 text-sm">
                Master the type-safe DI system in MiniJS
              </p>
            </Link>
            <Link
              href="/decorators/mount"
              className="bg-gray-900/50 border border-gray-700 rounded-lg p-4 hover:border-green-500/50 transition-colors"
            >
              <Icon name="code" className="w-6 h-6 text-blue-400 mb-3" />
              <h3 className="text-white font-semibold mb-2">
                @Mount Decorator
              </h3>
              <p className="text-gray-400 text-sm">
                Deep dive into @Mount decorator API reference
              </p>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

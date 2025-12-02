import { Component } from "@mini/core";
import { Link, Route } from "@mini/router";
import { CodeBlock } from "@/shared/components/CodeBlock";
import { Icon } from "@/shared/components/Icon";

@Route("/features/loading-states")
export class LoadingStatesPage extends Component {
  render() {
    const renderStateExample = `import { Component } from "@mini/core";

export class MyComponent extends Component {
  // Component has internal RENDER_STATE
  // States: IDLE, LOADING, SUCCESS, ERROR, EMPTY
  
  render() {
    // Called when state is SUCCESS (default)
    return <div>Content loaded successfully!</div>;
  }
  
  renderLoading() {
    // Called when state is LOADING
    return <div>Loading...</div>;
  }
  
  renderError() {
    // Called when state is ERROR
    return <div>Error loading data</div>;
  }
  
  renderEmpty() {
    // Called when state is EMPTY
    return <div>No data available</div>;
  }
}`;

    const loadDataBasicExample = `import { Component, LoadData } from "@mini/core";
import { Mount } from "@mini/core";

export class UserList extends Component {
  users: User[] = [];
  
  // @LoadData automatically manages RENDER_STATE
  @LoadData()
  async loadUsers() {
    const response = await fetch('/api/users');
    this.users = await response.json();
    return this.users; // Return determines state
  }
  
  @Mount()
  onMount() {
    this.loadUsers(); // Triggers: LOADING → SUCCESS/ERROR/EMPTY
  }
  
  render() {
    // Called when state is SUCCESS
    return (
      <div>
        <h1>Users</h1>
        <ul>
          {this.users.map(user => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      </div>
    );
  }
  
  renderLoading() {
    return <div className="spinner">Loading users...</div>;
  }
  
  renderError() {
    return (
      <div className="error">
        <p>Failed to load users</p>
        <button onClick={() => this.loadUsers()}>Retry</button>
      </div>
    );
  }
  
  renderEmpty() {
    return <div>No users found</div>;
  }
}

interface User {
  id: string;
  name: string;
  email: string;
}`;

    const loadDataIsEmptyExample = `export class ProductList extends Component {
  products: Product[] = [];
  
  // Custom isEmpty function to determine EMPTY state
  @LoadData({ 
    isEmpty: (data) => data.length === 0 
  })
  async loadProducts() {
    const response = await fetch('/api/products');
    this.products = await response.json();
    return this.products;
  }
  
  @Mount()
  onMount() {
    this.loadProducts();
  }
  
  render() {
    return (
      <div className="products-grid">
        {this.products.map(product => (
          <div key={product.id} className="product-card">
            <h3>{product.name}</h3>
            <p>\${product.price}</p>
          </div>
        ))}
      </div>
    );
  }
  
  renderLoading() {
    return (
      <div className="products-grid">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="skeleton-card"></div>
        ))}
      </div>
    );
  }
  
  renderEmpty() {
    return (
      <div className="empty-state">
        <Icon name="folder" size={48} />
        <h2>No Products Available</h2>
        <p>Check back later for new products</p>
      </div>
    );
  }
  
  renderError() {
    return (
      <div className="error-state">
        <h2>Something went wrong</h2>
        <button onClick={() => this.loadProducts()}>
          Try Again
        </button>
      </div>
    );
  }
}`;

    const loadFragmentExample = `import { Component, LoadData, LoadFragment, RenderState } from "@mini/core";

export class Dashboard extends Component {
  stats: Stats | null = null;
  
  @LoadData({ label: "stats" })
  async loadStats() {
    const response = await fetch('/api/stats');
    this.stats = await response.json();
    return this.stats;
  }
  
  @Mount()
  onMount() {
    this.loadStats();
  }
  
  // Define custom fragments for specific states
  @LoadFragment({
    label: "stats",
    states: [RenderState.LOADING]
  })
  statsLoadingFragment() {
    return (
      <div className="stats-skeleton">
        <div className="skeleton-box"></div>
        <div className="skeleton-box"></div>
        <div className="skeleton-box"></div>
      </div>
    );
  }
  
  @LoadFragment({
    label: "stats",
    states: [RenderState.ERROR]
  })
  statsErrorFragment() {
    return (
      <div className="error-box">
        <p>Failed to load statistics</p>
        <button onClick={() => this.loadStats()}>Retry</button>
      </div>
    );
  }
  
  @LoadFragment({
    label: "stats",
    states: [RenderState.SUCCESS]
  })
  statsSuccessFragment() {
    return (
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Users</h3>
          <p className="stat-value">{this.stats?.users}</p>
        </div>
        <div className="stat-card">
          <h3>Revenue</h3>
          <p className="stat-value">\${this.stats?.revenue}</p>
        </div>
        <div className="stat-card">
          <h3>Orders</h3>
          <p className="stat-value">{this.stats?.orders}</p>
        </div>
      </div>
    );
  }
  
  render() {
    return (
      <div className="dashboard">
        <h1>Dashboard</h1>
        {/* Loader renders the appropriate fragment */}
        <Loader fragment="stats" />
      </div>
    );
  }
}

interface Stats {
  users: number;
  revenue: number;
  orders: number;
}`;

    const loaderComponentExample = `import { Component, LoadData, LoadFragment, Loader } from "@mini/core";
import { RenderState } from "@mini/core";

export class DataViewer extends Component {
  data: any = null;
  
  @LoadData({ label: "mainData" })
  async loadData() {
    const response = await fetch('/api/data');
    this.data = await response.json();
    return this.data;
  }
  
  @LoadFragment({
    label: "mainData",
    states: [RenderState.LOADING]
  })
  loadingFragment() {
    return (
      <div className="loading-state">
        <div className="spinner"></div>
        <p>Loading data...</p>
      </div>
    );
  }
  
  @LoadFragment({
    label: "mainData",
    states: [RenderState.SUCCESS]
  })
  successFragment() {
    return (
      <div className="data-display">
        <pre>{JSON.stringify(this.data, null, 2)}</pre>
      </div>
    );
  }
  
  @LoadFragment({
    label: "mainData",
    states: [RenderState.ERROR]
  })
  errorFragment() {
    return (
      <div className="error-display">
        <Icon name="alert" />
        <p>Failed to load data</p>
      </div>
    );
  }
  
  @LoadFragment({
    label: "mainData",
    states: [RenderState.EMPTY]
  })
  emptyFragment() {
    return <div className="empty-display">No data available</div>;
  }
  
  @Mount()
  onMount() {
    this.loadData();
  }
  
  render() {
    return (
      <div className="container">
        <h1>Data Viewer</h1>
        {/* Loader automatically renders correct fragment */}
        <Loader fragment="mainData" />
      </div>
    );
  }
}`;

    const multipleLoadersExample = `export class ComplexDashboard extends Component {
  users: User[] = [];
  orders: Order[] = [];
  analytics: Analytics | null = null;
  
  @LoadData({ label: "users" })
  async loadUsers() {
    const response = await fetch('/api/users');
    this.users = await response.json();
    return this.users;
  }
  
  @LoadData({ label: "orders" })
  async loadOrders() {
    const response = await fetch('/api/orders');
    this.orders = await response.json();
    return this.orders;
  }
  
  @LoadData({ label: "analytics" })
  async loadAnalytics() {
    const response = await fetch('/api/analytics');
    this.analytics = await response.json();
    return this.analytics;
  }
  
  // Fragments for users
  @LoadFragment({ label: "users", states: [RenderState.LOADING] })
  usersLoading() {
    return <div className="skeleton-list"></div>;
  }
  
  @LoadFragment({ label: "users", states: [RenderState.SUCCESS] })
  usersSuccess() {
    return (
      <ul>
        {this.users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    );
  }
  
  // Fragments for orders
  @LoadFragment({ label: "orders", states: [RenderState.LOADING] })
  ordersLoading() {
    return <div className="skeleton-table"></div>;
  }
  
  @LoadFragment({ label: "orders", states: [RenderState.SUCCESS] })
  ordersSuccess() {
    return (
      <table>
        <tbody>
          {this.orders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>\${order.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  
  // Fragments for analytics
  @LoadFragment({ label: "analytics", states: [RenderState.LOADING] })
  analyticsLoading() {
    return <div className="skeleton-chart"></div>;
  }
  
  @LoadFragment({ label: "analytics", states: [RenderState.SUCCESS] })
  analyticsSuccess() {
    return (
      <div className="chart">
        <h3>Total Revenue: \${this.analytics?.revenue}</h3>
        <p>Growth: {this.analytics?.growth}%</p>
      </div>
    );
  }
  
  @Mount()
  onMount() {
    // Load all data independently
    this.loadUsers();
    this.loadOrders();
    this.loadAnalytics();
  }
  
  render() {
    return (
      <div className="dashboard">
        <section className="users-section">
          <h2>Users</h2>
          <Loader fragment="users" />
        </section>
        
        <section className="orders-section">
          <h2>Orders</h2>
          <Loader fragment="orders" />
        </section>
        
        <section className="analytics-section">
          <h2>Analytics</h2>
          <Loader fragment="analytics" />
        </section>
      </div>
    );
  }
}`;

    const manualStateExample = `import { Component, RENDER_STATE } from "@mini/core";
import { RenderState } from "@mini/core";

export class ManualStateComponent extends Component {
  data: any = null;
  
  async loadData() {
    // Manually set LOADING state
    this[RENDER_STATE] = { 
      state: RenderState.LOADING 
    };
    
    try {
      const response = await fetch('/api/data');
      this.data = await response.json();
      
      // Manually set SUCCESS state
      this[RENDER_STATE] = { 
        state: RenderState.SUCCESS,
        data: this.data
      };
    } catch (error) {
      // Manually set ERROR state
      this[RENDER_STATE] = { 
        state: RenderState.ERROR,
        data: error
      };
    }
  }
  
  @Mount()
  onMount() {
    this.loadData();
  }
  
  render() {
    return <div>Data: {JSON.stringify(this.data)}</div>;
  }
  
  renderLoading() {
    return <div>Loading manually managed data...</div>;
  }
  
  renderError() {
    return <div>Error loading data manually</div>;
  }
}`;

    const completeExample = `import { Component, LoadData, LoadFragment, Loader } from "@mini/core";
import { Mount } from "@mini/core";
import { RenderState } from "@mini/core";

// User list component
export class UserManagement extends Component {
  users: User[] = [];
  selectedUser: User | null = null;
  
  // Main data loading with @LoadData
  @LoadData({ 
    label: "users",
    isEmpty: (data) => data.length === 0 
  })
  async loadUsers() {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const response = await fetch('/api/users');
    this.users = await response.json();
    return this.users;
  }
  
  // Loading fragment - skeleton UI
  @LoadFragment({
    label: "users",
    states: [RenderState.LOADING]
  })
  usersLoadingFragment() {
    return (
      <div className="users-skeleton">
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className="skeleton-user-card">
            <div className="skeleton-avatar"></div>
            <div className="skeleton-text"></div>
            <div className="skeleton-text short"></div>
          </div>
        ))}
      </div>
    );
  }
  
  // Success fragment - actual content
  @LoadFragment({
    label: "users",
    states: [RenderState.SUCCESS]
  })
  usersSuccessFragment() {
    return (
      <div className="users-grid">
        {this.users.map(user => (
          <div 
            key={user.id} 
            className="user-card"
            onClick={() => this.selectedUser = user}
          >
            <img src={user.avatar} alt={user.name} />
            <h3>{user.name}</h3>
            <p>{user.email}</p>
            <span className="badge">{user.role}</span>
          </div>
        ))}
      </div>
    );
  }
  
  // Error fragment - retry option
  @LoadFragment({
    label: "users",
    states: [RenderState.ERROR]
  })
  usersErrorFragment() {
    return (
      <div className="error-state">
        <Icon name="alert" size={48} className="text-red-500" />
        <h2>Failed to Load Users</h2>
        <p>There was an error loading the user list.</p>
        <button 
          className="retry-button"
          onClick={() => this.loadUsers()}
        >
          <Icon name="lifecycle" />
          Try Again
        </button>
      </div>
    );
  }
  
  // Empty fragment - no data state
  @LoadFragment({
    label: "users",
    states: [RenderState.EMPTY]
  })
  usersEmptyFragment() {
    return (
      <div className="empty-state">
        <Icon name="users" size={64} className="text-gray-500" />
        <h2>No Users Found</h2>
        <p>There are no users in the system yet.</p>
        <button className="add-button">
          Add First User
        </button>
      </div>
    );
  }
  
  @Mount()
  onMount() {
    this.loadUsers();
  }
  
  render() {
    return (
      <div className="user-management">
        <header className="page-header">
          <h1>User Management</h1>
          <div className="header-actions">
            <button onClick={() => this.loadUsers()}>
              <Icon name="lifecycle" />
              Refresh
            </button>
            <button className="primary">
              <Icon name="users" />
              Add User
            </button>
          </div>
        </header>
        
        {/* Loader renders appropriate fragment based on state */}
        <Loader fragment="users" />
        
        {/* Selected user details */}
        {this.selectedUser && (
          <div className="user-details-modal">
            <h2>{this.selectedUser.name}</h2>
            <p>{this.selectedUser.email}</p>
            <button onClick={() => this.selectedUser = null}>
              Close
            </button>
          </div>
        )}
      </div>
    );
  }
}

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
}`;

    return (
      <div className="prose prose-invert max-w-none">
        {/* Hero Section */}
        <div className="mb-12">
          <div className="inline-flex items-center space-x-2 mb-6">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <span className="text-blue-400 text-sm font-medium">Feature</span>
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
            Loading States & Render Methods
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed">
            Master MiniJS's powerful loading state system with RENDER_STATE,
            alternative render methods, @LoadData decorator, @LoadFragment, and
            the Loader component. Create professional loading experiences with
            minimal code.
          </p>
        </div>

        {/* Key Concepts */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <Icon name="lightbulb" className="w-8 h-8 text-yellow-400 mr-3" />
            Core Concepts
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6">
              <h3 className="text-white font-semibold mb-2 text-lg">
                RENDER_STATE
              </h3>
              <p className="text-gray-400 text-sm">
                Internal component state that determines which render method is
                called: IDLE, LOADING, SUCCESS, ERROR, EMPTY
              </p>
            </div>

            <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6">
              <h3 className="text-white font-semibold mb-2 text-lg">
                Alternative Render Methods
              </h3>
              <p className="text-gray-400 text-sm">
                renderLoading(), renderError(), renderEmpty() - called
                automatically based on state
              </p>
            </div>

            <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-6">
              <h3 className="text-white font-semibold mb-2 text-lg">
                @LoadData
              </h3>
              <p className="text-gray-400 text-sm">
                Decorator that automatically manages RENDER_STATE transitions
                for async methods
              </p>
            </div>

            <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-6">
              <h3 className="text-white font-semibold mb-2 text-lg">
                @LoadFragment & Loader
              </h3>
              <p className="text-gray-400 text-sm">
                Define custom fragments for each state and render them with the
                Loader component
              </p>
            </div>
          </div>
        </div>

        {/* RENDER_STATE */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <Icon name="component" className="w-8 h-8 text-cyan-400 mr-3" />
            RENDER_STATE & Alternative Render Methods
          </h2>
          <p className="text-gray-300 mb-6">
            Every MiniJS component has an internal{" "}
            <code className="px-2 py-1 bg-gray-800 rounded text-purple-400">
              RENDER_STATE
            </code>{" "}
            that determines which render method is called. Define alternative
            render methods for different states.
          </p>

          <CodeBlock
            code={renderStateExample}
            filename="RenderMethods.component.tsx"
            language="TypeScript"
          />

          <div className="mt-6 bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-4">
            <div className="flex items-start">
              <Icon
                name="info"
                className="w-5 h-5 text-cyan-400 mr-4 mt-0.5 shrink-0"
              />
              <div>
                <p className="text-cyan-300 font-semibold mb-2">
                  Automatic Method Selection
                </p>
                <p className="text-gray-400 text-sm">
                  MiniJS automatically calls the appropriate render method based
                  on RENDER_STATE. You don't need conditional logic in your
                  render() - just define the methods!
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-3">
              Available Render States:
            </h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start">
                <code className="px-2 py-1 bg-gray-800 rounded text-sm mr-3 shrink-0">
                  IDLE
                </code>
                <span className="text-sm">
                  Initial state - calls render() by default
                </span>
              </li>
              <li className="flex items-start">
                <code className="px-2 py-1 bg-gray-800 rounded text-sm mr-3 shrink-0">
                  LOADING
                </code>
                <span className="text-sm">
                  Calls renderLoading() if defined, otherwise render()
                </span>
              </li>
              <li className="flex items-start">
                <code className="px-2 py-1 bg-gray-800 rounded text-sm mr-3 shrink-0">
                  SUCCESS
                </code>
                <span className="text-sm">
                  Calls render() - the main content view
                </span>
              </li>
              <li className="flex items-start">
                <code className="px-2 py-1 bg-gray-800 rounded text-sm mr-3 shrink-0">
                  ERROR
                </code>
                <span className="text-sm">
                  Calls renderError() if defined, otherwise render()
                </span>
              </li>
              <li className="flex items-start">
                <code className="px-2 py-1 bg-gray-800 rounded text-sm mr-3 shrink-0">
                  EMPTY
                </code>
                <span className="text-sm">
                  Calls renderEmpty() if defined, otherwise render()
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* @LoadData Basic */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <Icon name="database" className="w-8 h-8 text-green-400 mr-3" />
            @LoadData Decorator
          </h2>
          <p className="text-gray-300 mb-6">
            The{" "}
            <code className="px-2 py-1 bg-gray-800 rounded text-purple-400">
              @LoadData
            </code>{" "}
            decorator automatically manages RENDER_STATE transitions. When the
            decorated method is called, it sets state to LOADING, then to
            SUCCESS/ERROR/EMPTY based on the result.
          </p>

          <CodeBlock
            code={loadDataBasicExample}
            filename="UserList.component.tsx"
            language="TypeScript"
          />

          <div className="mt-6 bg-green-500/10 border border-green-500/20 rounded-lg p-4">
            <div className="flex items-start">
              <Icon
                name="check"
                className="w-5 h-5 text-green-400 mr-4 mt-0.5 shrink-0"
              />
              <div>
                <p className="text-green-300 font-semibold mb-2">State Flow</p>
                <p className="text-gray-400 text-sm mb-2">
                  When loadUsers() is called:
                </p>
                <ol className="text-gray-400 text-sm space-y-1 list-decimal list-inside">
                  <li>State → LOADING (renderLoading() called)</li>
                  <li>Method executes async operation</li>
                  <li>On success → SUCCESS (render() called)</li>
                  <li>On error → ERROR (renderError() called)</li>
                  <li>If null/undefined → EMPTY (renderEmpty() called)</li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        {/* @LoadData isEmpty */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <Icon name="adjustments" className="w-8 h-8 text-purple-400 mr-3" />
            Custom isEmpty Function
          </h2>
          <p className="text-gray-300 mb-6">
            By default, null or undefined results trigger the EMPTY state. Use
            the{" "}
            <code className="px-2 py-1 bg-gray-800 rounded text-purple-400">
              isEmpty
            </code>{" "}
            option to define custom empty logic.
          </p>

          <CodeBlock
            code={loadDataIsEmptyExample}
            filename="ProductList.component.tsx"
            language="TypeScript"
          />
        </div>

        {/* @LoadFragment */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <Icon name="layers" className="w-8 h-8 text-indigo-400 mr-3" />
            @LoadFragment Decorator
          </h2>
          <p className="text-gray-300 mb-6">
            Use{" "}
            <code className="px-2 py-1 bg-gray-800 rounded text-purple-400">
              @LoadFragment
            </code>{" "}
            to define custom fragments for specific states and labels. This
            allows fine-grained control over what renders for each state.
          </p>

          <CodeBlock
            code={loadFragmentExample}
            filename="Dashboard.component.tsx"
            language="TypeScript"
          />

          <div className="mt-6 bg-indigo-500/10 border border-indigo-500/20 rounded-lg p-4">
            <div className="flex items-start">
              <Icon
                name="info"
                className="w-5 h-5 text-indigo-400 mr-4 mt-0.5 shrink-0"
              />
              <div>
                <p className="text-indigo-300 font-semibold mb-2">
                  Labels & Fragments
                </p>
                <p className="text-gray-400 text-sm">
                  The{" "}
                  <code className="px-1 py-0.5 bg-gray-800 rounded text-xs">
                    label
                  </code>{" "}
                  parameter connects @LoadData methods to their corresponding
                  fragments. Use the same label in @LoadData and @LoadFragment
                  to link them together.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Loader Component */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <Icon name="component" className="w-8 h-8 text-pink-400 mr-3" />
            Loader Component
          </h2>
          <p className="text-gray-300 mb-6">
            The{" "}
            <code className="px-2 py-1 bg-gray-800 rounded text-purple-400">
              {"<Loader>"}
            </code>{" "}
            component automatically renders the appropriate fragment based on
            the current state. Provide the fragment label as a prop.
          </p>

          <CodeBlock
            code={loaderComponentExample}
            filename="DataViewer.component.tsx"
            language="TypeScript"
          />
        </div>

        {/* Multiple Loaders */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <Icon name="grid" className="w-8 h-8 text-teal-400 mr-3" />
            Multiple Independent Loaders
          </h2>
          <p className="text-gray-300 mb-6">
            Use multiple @LoadData methods with different labels to manage
            independent loading states in a single component. Each Loader
            renders its own fragment independently.
          </p>

          <CodeBlock
            code={multipleLoadersExample}
            filename="ComplexDashboard.component.tsx"
            language="TypeScript"
          />

          <div className="mt-6 bg-teal-500/10 border border-teal-500/20 rounded-lg p-4">
            <div className="flex items-start">
              <Icon
                name="check"
                className="w-5 h-5 text-teal-400 mr-4 mt-0.5 shrink-0"
              />
              <div>
                <p className="text-teal-300 font-semibold mb-2">
                  Independent States
                </p>
                <p className="text-gray-400 text-sm">
                  Each labeled @LoadData method maintains its own state. One
                  section can be loading while others show content or errors -
                  perfect for complex dashboards!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Manual State Management */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <Icon name="adjustments" className="w-8 h-8 text-yellow-400 mr-3" />
            Manual State Management
          </h2>
          <p className="text-gray-300 mb-6">
            While @LoadData is recommended, you can manually control
            RENDER_STATE when needed for fine-grained control.
          </p>

          <CodeBlock
            code={manualStateExample}
            filename="ManualState.component.tsx"
            language="TypeScript"
          />

          <div className="mt-6 bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
            <div className="flex items-start">
              <Icon
                name="alert"
                className="w-5 h-5 text-yellow-400 mr-4 mt-0.5 shrink-0"
              />
              <div>
                <p className="text-yellow-300 font-semibold mb-2">
                  Use @LoadData When Possible
                </p>
                <p className="text-gray-400 text-sm">
                  Manual state management gives you control but requires more
                  code. Use @LoadData unless you have a specific reason to
                  manage state manually.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Complete Example */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <Icon name="star" className="w-8 h-8 text-orange-400 mr-3" />
            Complete Example: User Management
          </h2>
          <p className="text-gray-300 mb-6">
            A comprehensive example showing @LoadData, @LoadFragment, Loader
            component, and all render states in action.
          </p>

          <CodeBlock
            code={completeExample}
            filename="UserManagement.component.tsx"
            language="TypeScript"
          />
        </div>

        {/* Best Practices */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <Icon name="check" className="w-8 h-8 text-green-400 mr-3" />
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
                    Always Define renderError()
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Provide error handling with renderError() and include a
                    retry button to improve user experience.
                  </p>
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
                    Use Skeleton Screens for renderLoading()
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Show skeleton placeholders that match your content structure
                    instead of generic spinners for better UX.
                  </p>
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
                    Provide Meaningful Empty States
                  </h3>
                  <p className="text-gray-400 text-sm">
                    When using renderEmpty(), guide users on what to do next
                    rather than just showing "No data".
                  </p>
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
                    Use Labels for Multiple Data Sources
                  </h3>
                  <p className="text-gray-400 text-sm">
                    When loading multiple data sources, use descriptive labels
                    to keep fragments organized and maintainable.
                  </p>
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
                    Prefer @LoadData Over Manual State
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Let @LoadData handle state transitions automatically. Only
                    use manual RENDER_STATE control when absolutely necessary.
                  </p>
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
                    Return Data from @LoadData Methods
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Always return the loaded data from @LoadData methods so the
                    decorator can determine the correct state (SUCCESS vs
                    EMPTY).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            Continue Learning
          </h2>
          <p className="text-gray-300 mb-6">
            Now that you understand loading states, explore these related
            topics.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/core/lifecycle"
              className="bg-gray-900/50 border border-gray-700 rounded-lg p-4 hover:border-blue-500/50 transition-colors"
            >
              <Icon name="lifecycle" className="w-6 h-6 text-blue-400 mb-3" />
              <h3 className="text-white font-semibold mb-2">Lifecycle</h3>
              <p className="text-gray-400 text-sm">
                Learn about @Mount and other lifecycle decorators
              </p>
            </Link>
            <Link
              href="/decorators/load-data"
              className="bg-gray-900/50 border border-gray-700 rounded-lg p-4 hover:border-blue-500/50 transition-colors"
            >
              <Icon name="database" className="w-6 h-6 text-cyan-400 mb-3" />
              <h3 className="text-white font-semibold mb-2">@LoadData API</h3>
              <p className="text-gray-400 text-sm">
                Complete API reference for the @LoadData decorator
              </p>
            </Link>
            <Link
              href="/features/guards-resolvers"
              className="bg-gray-900/50 border border-gray-700 rounded-lg p-4 hover:border-blue-500/50 transition-colors"
            >
              <Icon name="shield" className="w-6 h-6 text-teal-400 mb-3" />
              <h3 className="text-white font-semibold mb-2">
                Guards & Resolvers
              </h3>
              <p className="text-gray-400 text-sm">
                Pre-load data before routes activate
              </p>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

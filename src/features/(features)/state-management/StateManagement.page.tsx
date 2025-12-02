import { Component } from "@mini/core";
import { Link, Route } from "@mini/router";
import { CodeBlock } from "@/shared/components/CodeBlock";
import { Icon } from "@/shared/components/Icon";

@Route("/features/state-management")
export class StateManagementPage extends Component {
  render() {
    const basicSignalExample = `import { Component, signal } from "@mini/core";

export class CounterComponent extends Component {
  // Create a signal with initial value
  count = signal(0);
  
  increment() {
    // Update with new value
    this.count.set(this.count.value + 1);
  }
  
  decrement() {
    // Update using updater function
    this.count.set((prev) => prev - 1);
  }
  
  render() {
    return (
      <div>
        <h2>Count: {this.count}</h2>
        <button onClick={() => this.increment()}>+</button>
        <button onClick={() => this.decrement()}>-</button>
      </div>
    );
  }
}`;

    const objectSignalExample = `export class UserProfileComponent extends Component {
  user = signal({
    name: "John Doe",
    email: "john@example.com",
    settings: {
      theme: "dark",
      notifications: true
    }
  });
  
  updateName(newName: string) {
    this.user.set((prev) => ({
      ...prev,
      name: newName
    }));
  }
  
  toggleTheme() {
    this.user.set((prev) => ({
      ...prev,
      settings: {
        ...prev.settings,
        theme: prev.settings.theme === "dark" ? "light" : "dark"
      }
    }));
  }
  
  render() {
    return (
      <div>
        <h2>Welcome, {this.user.get("name")}</h2>
        <p>Email: {this.user.get("email")}</p>
        <p>Theme: {this.user.get("settings.theme")}</p>
      </div>
    );
  }
}`;

    const arraySignalExample = `export class TodoListComponent extends Component {
  todos = signal<Todo[]>([]);
  
  addTodo(text: string) {
    this.todos.set((prev) => [
      ...prev,
      { id: Date.now(), text, completed: false }
    ]);
  }
  
  removeTodo(id: number) {
    this.todos.set((prev) => prev.filter(t => t.id !== id));
  }
  
  toggleTodo(id: number) {
    this.todos.set((prev) =>
      prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
    );
  }
  
  render() {
    return (
      <div>
        <h2>Todos</h2>
        <ul>
          {this.todos.map(todo => (
            <li key={todo.id}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => this.toggleTodo(todo.id)}
              />
              {todo.text}
              <button onClick={() => this.removeTodo(todo.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}`;

    const signalMapExample = `export class UserListComponent extends Component {
  users = signal([
    { id: 1, name: "John", active: true },
    { id: 2, name: "Jane", active: false },
    { id: 3, name: "Bob", active: true }
  ]);
  
  render() {
    return (
      <div>
        {/* map() works like Array.map */}
        <ul>
          {this.users.map(user => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
        
        {/* Transform signal values */}
        <h3>Names: {this.users.map(u => u.name.toUpperCase())}</h3>
      </div>
    );
  }
}`;

    const signalFilterExample = `export class ProductListComponent extends Component {
  products = signal([
    { id: 1, name: "Laptop", price: 1200, inStock: true },
    { id: 2, name: "Mouse", price: 25, inStock: false },
    { id: 3, name: "Keyboard", price: 80, inStock: true }
  ]);
  
  render() {
    return (
      <div>
        {/* Only show products in stock */}
        <h2>Available Products</h2>
        <ul>
          {this.products
            .filter(p => p.inStock)
            .map(p => (
              <li key={p.id}>
                {p.name} - \${p.price}
              </li>
            ))
          }
        </ul>
        
        {/* Chaining: filter + map */}
        <h3>Affordable Options</h3>
        <ul>
          {this.products
            .filter(p => p.inStock && p.price < 100)
            .map(p => <li key={p.id}>{p.name}</li>)
          }
        </ul>
      </div>
    );
  }
}`;

    const signalReduceExample = `export class ShoppingCartComponent extends Component {
  cartItems = signal([
    { id: 1, name: "Laptop", price: 1200, quantity: 1 },
    { id: 2, name: "Mouse", price: 25, quantity: 2 },
    { id: 3, name: "Keyboard", price: 80, quantity: 1 }
  ]);
  
  render() {
    return (
      <div>
        <h2>Shopping Cart</h2>
        <ul>
          {this.cartItems.map(item => (
            <li key={item.id}>
              {item.name} x{item.quantity} = \${item.price * item.quantity}
            </li>
          ))}
        </ul>
        
        {/* Calculate total using reduce */}
        <div className="total">
          <strong>
            Total: \${this.cartItems.reduce(
              (sum, item) => sum + (item.price * item.quantity),
              0
            )}
          </strong>
        </div>
        
        {/* Count total items */}
        <p>
          Items in cart: {this.cartItems.reduce(
            (sum, item) => sum + item.quantity,
            0
          )}
        </p>
      </div>
    );
  }
}`;

    const signalOrElseExample = `export class UserProfileComponent extends Component {
  user = signal<User | undefined>(undefined);
  
  @Mount()
  async loadUser() {
    const data = await fetchUser();
    this.user.set(data);
  }
  
  render() {
    return (
      <div>
        {/* Show fallback while user is undefined */}
        <h2>
          Welcome, {this.user
            .map(u => u.name)
            .orElse(() => "Guest")
          }
        </h2>
        
        {/* Array fallback */}
        {this.user
          .map(u => u.posts)
          .orElse(() => [])
          .map(post => (
            <div key={post.id}>{post.title}</div>
          ))
        }
      </div>
    );
  }
}`;

    const signalGetExample = `export class UserDashboardComponent extends Component {
  user = signal({
    profile: {
      name: "John Doe",
      address: {
        city: "New York",
        location: {
          lat: 40.7128,
          lng: -74.0060
        }
      }
    },
    settings: {
      theme: "dark",
      notifications: true
    }
  });
  
  render() {
    return (
      <div>
        {/* Deep property access with type safety */}
        <h2>{this.user.get("profile.name")}</h2>
        <p>City: {this.user.get("profile.address.city")}</p>
        <p>
          Coordinates: 
          {this.user.get("profile.address.location.lat")}, 
          {this.user.get("profile.address.location.lng")}
        </p>
        <p>Theme: {this.user.get("settings.theme")}</p>
      </div>
    );
  }
}`;

    const stateServiceExample = `import { Injectable, signal } from "@mini/core";

@Injectable()
export class CounterStateService {
  // Shared state via signal
  private _count = signal(0);
  
  // Public read-only access
  get count() {
    return this._count;
  }
  
  increment() {
    this._count.set((prev) => prev + 1);
  }
  
  decrement() {
    this._count.set((prev) => prev - 1);
  }
  
  reset() {
    this._count.set(0);
  }
}

// Component A
export class CounterDisplayComponent extends Component {
  @Inject(CounterStateService)
  private counterState!: CounterStateService;
  
  render() {
    return (
      <div>
        <h2>Count: {this.counterState.count}</h2>
      </div>
    );
  }
}

// Component B (different part of the app)
export class CounterControlsComponent extends Component {
  @Inject(CounterStateService)
  private counterState!: CounterStateService;
  
  render() {
    return (
      <div>
        <button onClick={() => this.counterState.increment()}>+</button>
        <button onClick={() => this.counterState.decrement()}>-</button>
        <button onClick={() => this.counterState.reset()}>Reset</button>
      </div>
    );
  }
}`;

    const userStateExample = `import { Injectable, signal, Inject } from "@mini/core";
import { ApiService } from "./api.service";

interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
}

@Injectable()
export class UserStateService {
  @Inject(ApiService)
  private api!: ApiService;
  
  private _currentUser = signal<User | null>(null);
  private _isLoading = signal(false);
  private _error = signal<string | null>(null);
  
  get currentUser() {
    return this._currentUser;
  }
  
  get isLoading() {
    return this._isLoading;
  }
  
  get error() {
    return this._error;
  }
  
  get isAuthenticated() {
    return this._currentUser.map(user => user !== null);
  }
  
  get isAdmin() {
    return this._currentUser.map(user => user?.role === "admin");
  }
  
  async login(email: string, password: string) {
    this._isLoading.set(true);
    this._error.set(null);
    
    try {
      const user = await this.api.post("/auth/login", { email, password });
      this._currentUser.set(user);
    } catch (error) {
      this._error.set("Login failed");
      throw error;
    } finally {
      this._isLoading.set(false);
    }
  }
  
  logout() {
    this._currentUser.set(null);
    this._error.set(null);
  }
}

// Usage in component
export class UserProfileComponent extends Component {
  @Inject(UserStateService)
  private userState!: UserStateService;
  
  render() {
    return (
      <div>
        {this.userState.isAuthenticated.map(authenticated =>
          authenticated ? (
            <div>
              <h2>Welcome, {this.userState.currentUser.get("name")}</h2>
              <button onClick={() => this.userState.logout()}>
                Logout
              </button>
            </div>
          ) : (
            <LoginForm />
          )
        )}
      </div>
    );
  }
}`;

    const persistentStateExample = `import { Component, signal, PersistentState, UseURLStorage } from "@mini/core";

export class SearchComponent extends Component {
  // State syncs with URL automatically
  @PersistentState(new UseURLStorage())
  searchQuery = signal("");
  
  @PersistentState(new UseURLStorage())
  filters = signal({
    category: "all",
    minPrice: 0,
    maxPrice: 1000
  });
  
  // When signals change, URL updates
  // When URL changes (back/forward), signals update
  
  render() {
    return (
      <div>
        <input
          type="text"
          value={this.searchQuery}
          onInput={(e) => this.searchQuery.set(e.target.value)}
          placeholder="Search..."
        />
        
        <select
          value={this.filters.get("category")}
          onChange={(e) => this.filters.set((prev) => ({
            ...prev,
            category: e.target.value
          }))}
        >
          <option value="all">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="clothing">Clothing</option>
        </select>
        
        <SearchResults
          query={this.searchQuery}
          filters={this.filters}
        />
      </div>
    );
  }
}

// URL will look like:
// /search?searchQuery=laptop&filters=%7B%22category%22%3A%22electronics%22%7D`;

    const urlTransformersExample = `import {
  Component,
  signal,
  PersistentState,
  UseURLStorage,
  URLTransformers
} from "@mini/core";

export class ProductFilterComponent extends Component {
  // Single value as query param
  @PersistentState(new UseURLStorage())
  search = signal("");
  // URL: ?search=laptop
  
  // Array as comma-separated values
  @PersistentState(
    new UseURLStorage({
      transformer: URLTransformers.propertyAsKeyArrayValuesAsCommaString()
    })
  )
  tags = signal(["electronics", "sale"]);
  // URL: ?tags=electronics,sale
  
  // Array as JSON
  @PersistentState(
    new UseURLStorage({
      transformer: URLTransformers.propertyAsKeyArrayValuesAsJSON()
    })
  )
  categories = signal([
    { id: 1, name: "Electronics" },
    { id: 2, name: "Clothing" }
  ]);
  // URL: ?categories=%5B%7B%22id%22%3A1%2C%22name%22%3A%22Electronics%22%7D%5D
  
  // Object as JSON
  @PersistentState(
    new UseURLStorage({
      transformer: URLTransformers.propertyAsKeyValueAsJSON()
    })
  )
  filters = signal({
    minPrice: 0,
    maxPrice: 1000,
    inStock: true
  });
  // URL: ?filters=%7B%22minPrice%22%3A0%2C%22maxPrice%22%3A1000%2C%22inStock%22%3Atrue%7D
}`;

    const completeExample = `import { Component, Injectable, signal, Inject, UseProviders, PersistentState, UseURLStorage } from "@mini/core";
import { Route } from "@mini/router";

// 1. State Service
@Injectable()
export class ProductStateService {
  @Inject(ApiService)
  private api!: ApiService;
  
  private _products = signal<Product[]>([]);
  private _isLoading = signal(false);
  
  get products() {
    return this._products;
  }
  
  get isLoading() {
    return this._isLoading;
  }
  
  // Computed: filtered products
  getFilteredProducts(filters: Signal<ProductFilters>) {
    return filters.map(filter => this._products
      .filter(p => {
        if (filter.category !== "all" && p.category !== filter.category) {
          return false;
        }
        if (filter.search && !p.name.toLowerCase().includes(filter.search.toLowerCase())) {
          return false;
        }
        if (p.price < filter.minPrice || p.price > filter.maxPrice) {
          return false;
        }
        return true;
      });
  }
  
  async loadProducts() {
    this._isLoading.set(true);
    try {
      const products = await this.api.get("/products");
      this._products.set(products);
    } finally {
      this._isLoading.set(false);
    }
  }
}

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  inStock: boolean;
}

interface ProductFilters {
  search: string;
  category: string;
  minPrice: number;
  maxPrice: number;
}

// 2. Main Component with URL State
@Route("/products")
@UseProviders([ProductStateService])
export class ProductPageComponent extends Component {
  @Inject(ProductStateService)
  private productState!: ProductStateService;

  @PersistentState(new UseURLStorage())
  filters = signal<ProductFilters>({ 
    search: "", 
    category: "all", 
    minPrice: 0, 
    maxPrice: 1000 
  });
  
  @Mount()
  async onMount() {
    await this.productState.loadProducts();
  }
  
  // Watch for filter changes
  @Watch("filters")
  onFiltersChange() {
    // Filters already synced with URL via @PersistentState
    // Just trigger any side effects if needed
  }
  
  render() {
    const filteredProducts = this.productState.getFilteredProducts(this.filters);
    
    return (
      <div>
        <h1>Products</h1>
        
        {/* Filters */}
        <div className="filters">
          <input
            type="text"
            value={this.filters.get('search')}
            onInput={(e) => this.filters.set((prev) => ({ ...prev, search: e.target.value } as ProductFilters))}
            placeholder="Search products..."
          />
          
          <select
            value={this.filters.get('category')}
            onChange={(e) => this.filters.set((prev) => ({ ...prev, category: e.target.value))}
          >
            <option value="all">All Categories</option>
            <option value="electronics">Electronics</option>
            <option value="clothing">Clothing</option>
            <option value="books">Books</option>
          </select>
          
          <div>
            <label>Price Range</label>
            <input
              type="range"
              min={0}
              max={1000}
              value={this.filters.get('minPrice')}
              onInput={(e) => this.filters.set((prev) => ({ ...prev, minPrice: Number(e.target.value)))}
            />
            <input
              type="range"
              min={0}
              max={1000}
              value={this.filters.get('maxPrice')}
              onInput={(e) => this.filters.set((prev) => ({ ...prev, maxPrice: Number(e.target.value)))}
            />
            <span>\${this.filters.get('minPrice')} - \${this.filters.get('maxPrice')}</span>
          </div>
        </div>
        
        {/* Product List */}
        {this.productState.isLoading.map(loading =>
          loading ? (
            <div>Loading...</div>
          ) : (
            <div className="products">
              {filteredProducts
                .orElse(() => [])
                .map(product => (
                  <ProductCard key={product.id} product={product} />
                ))
              }
              
              {/* Show count */}
              <div>
                Showing {filteredProducts.reduce((count) => count + 1, 0)} products
              </div>
            </div>
          )
        )}
      </div>
    );
  }
}

// 3. Child component also has access to state
export class ProductCard extends Component<{ product: Product }> {
  @Inject(ProductStateService)
  private productState!: ProductStateService;
  
  render() {
    const { product } = this.props;
    
    return (
      <div className="product-card">
        <h3>{product.name}</h3>
        <p>Category: {product.category}</p>
        <p className="price">\${product.price}</p>
        <span className={product.inStock ? "in-stock" : "out-of-stock"}>
          {product.map(p => p.inStock ? "In Stock" : "Out of Stock")}
        </span>
      </div>
    );
  }
}`;

    return (
      <div className="prose prose-invert max-w-none">
        {/* Hero Section */}
        <div className="mb-12">
          <div className="inline-flex items-center space-x-2 mb-6">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
            <span className="text-cyan-400 text-sm font-medium">Feature</span>
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-linear-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            State Management
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed">
            Manage application state with reactive signals and share it across
            components using dependency injection. MiniJS combines the power of
            RxJS observables with simple, intuitive APIs.
          </p>
        </div>

        {/* Key Concepts */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <Icon name="lightbulb" className="w-8 h-8 text-yellow-400 mr-3" />
            Key Concepts
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6">
              <h3 className="text-white font-semibold mb-2 text-lg">Signals</h3>
              <p className="text-gray-400 text-sm">
                Reactive primitives that hold state and notify subscribers when
                values change
              </p>
            </div>

            <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6">
              <h3 className="text-white font-semibold mb-2 text-lg">
                State Services
              </h3>
              <p className="text-gray-400 text-sm">
                Injectable services that encapsulate and share state across
                components
              </p>
            </div>

            <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-6">
              <h3 className="text-white font-semibold mb-2 text-lg">
                Persistent State
              </h3>
              <p className="text-gray-400 text-sm">
                Automatically sync state with URL, localStorage, or custom
                storage
              </p>
            </div>

            <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-6">
              <h3 className="text-white font-semibold mb-2 text-lg">
                Functional API
              </h3>
              <p className="text-gray-400 text-sm">
                Powerful methods like map, filter, reduce for working with
                signal data
              </p>
            </div>
          </div>
        </div>

        {/* Basic Signals */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <Icon name="zap" className="w-8 h-8 text-cyan-400 mr-3" />
            Creating and Using Signals
          </h2>
          <p className="text-gray-300 mb-6">
            Signals are the foundation of state management in MiniJS. They are
            reactive primitives built on RxJS BehaviorSubject that automatically
            update the UI when their values change.
          </p>

          <CodeBlock
            code={basicSignalExample}
            filename="CounterComponent.tsx"
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
                  Granular Updates
                </p>
                <p className="text-gray-400 text-sm">
                  Only the DOM nodes that depend on a signal are updated when it
                  changes. The component's render() method runs only once, not
                  on every state change.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Object Signals */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <Icon name="box" className="w-8 h-8 text-blue-400 mr-3" />
            Working with Objects
          </h2>
          <p className="text-gray-300 mb-6">
            Signals can hold complex objects. Use the updater function pattern
            to update nested properties immutably.
          </p>

          <CodeBlock
            code={objectSignalExample}
            filename="UserProfileComponent.tsx"
            language="TypeScript"
          />
        </div>

        {/* Array Signals */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <Icon name="list" className="w-8 h-8 text-green-400 mr-3" />
            Working with Arrays
          </h2>
          <p className="text-gray-300 mb-6">
            Signals work seamlessly with arrays. Always create new arrays
            instead of mutating the existing ones.
          </p>

          <CodeBlock
            code={arraySignalExample}
            filename="TodoListComponent.tsx"
            language="TypeScript"
          />
        </div>

        {/* Signal Functional API */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <Icon name="code" className="w-8 h-8 text-purple-400 mr-3" />
            Signal Functional API
          </h2>
          <p className="text-gray-300 mb-6">
            Signals provide powerful functional methods that work with any
            iterable (arrays, Sets, Maps). These methods return new signals that
            automatically update when the source changes.
          </p>

          {/* map() */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-white mb-4 flex items-center">
              <span className="flex items-center justify-center w-10 h-10 bg-blue-500/20 text-blue-400 rounded-lg text-lg font-bold mr-3">
                1
              </span>
              map() - Transform Values
            </h3>
            <p className="text-gray-300 mb-4">
              Transform each item in a signal. Works like Array.map() but
              returns a reactive signal.
            </p>
            <CodeBlock
              code={signalMapExample}
              filename="UserListComponent.tsx"
              language="TypeScript"
            />
          </div>

          {/* filter() */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-white mb-4 flex items-center">
              <span className="flex items-center justify-center w-10 h-10 bg-green-500/20 text-green-400 rounded-lg text-lg font-bold mr-3">
                2
              </span>
              filter() - Filter Values
            </h3>
            <p className="text-gray-300 mb-4">
              Filter items based on a condition. Perfect for search and
              filtering features.
            </p>
            <CodeBlock
              code={signalFilterExample}
              filename="ProductListComponent.tsx"
              language="TypeScript"
            />
          </div>

          {/* reduce() */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-white mb-4 flex items-center">
              <span className="flex items-center justify-center w-10 h-10 bg-purple-500/20 text-purple-400 rounded-lg text-lg font-bold mr-3">
                3
              </span>
              reduce() - Aggregate Values
            </h3>
            <p className="text-gray-300 mb-4">
              Reduce an array to a single value. Great for calculations like
              totals, counts, and summaries.
            </p>
            <CodeBlock
              code={signalReduceExample}
              filename="ShoppingCartComponent.tsx"
              language="TypeScript"
            />
          </div>

          {/* orElse() */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-white mb-4 flex items-center">
              <span className="flex items-center justify-center w-10 h-10 bg-orange-500/20 text-orange-400 rounded-lg text-lg font-bold mr-3">
                4
              </span>
              orElse() - Fallback Values
            </h3>
            <p className="text-gray-300 mb-4">
              Provide a default value when a signal is undefined or an array is
              empty.
            </p>
            <CodeBlock
              code={signalOrElseExample}
              filename="UserProfileComponent.tsx"
              language="TypeScript"
            />
          </div>

          {/* get() */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-white mb-4 flex items-center">
              <span className="flex items-center justify-center w-10 h-10 bg-pink-500/20 text-pink-400 rounded-lg text-lg font-bold mr-3">
                5
              </span>
              get() - Deep Property Access
            </h3>
            <p className="text-gray-300 mb-4">
              Access nested properties using dot notation with full type safety.
            </p>
            <CodeBlock
              code={signalGetExample}
              filename="UserDashboardComponent.tsx"
              language="TypeScript"
            />
          </div>
        </div>

        {/* State Services */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <Icon name="database" className="w-8 h-8 text-indigo-400 mr-3" />
            Sharing State with Services
          </h2>
          <p className="text-gray-300 mb-6">
            Use injectable services to share state across multiple components.
            This is the recommended pattern for global or feature-level state.
          </p>

          <CodeBlock
            code={stateServiceExample}
            filename="CounterStateService.ts"
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
                  Singleton Pattern
                </p>
                <p className="text-gray-400 text-sm">
                  Services are singleton within their injector scope. All
                  components that inject the same service share the same
                  instance and state.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Real World State Service */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <Icon name="globe" className="w-8 h-8 text-teal-400 mr-3" />
            Real-World State Service Example
          </h2>
          <p className="text-gray-300 mb-6">
            Here's a complete example of a state service managing user
            authentication with loading states and error handling.
          </p>

          <CodeBlock
            code={userStateExample}
            filename="UserStateService.ts"
            language="TypeScript"
          />
        </div>

        {/* Persistent State */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <Icon name="link" className="w-8 h-8 text-amber-400 mr-3" />
            Persistent State with @PersistentState
          </h2>
          <p className="text-gray-300 mb-6">
            Automatically sync state with external storage like URL parameters,
            localStorage, or sessionStorage using the{" "}
            <code className="px-2 py-1 bg-gray-800 rounded text-purple-400">
              @PersistentState
            </code>{" "}
            decorator.
          </p>

          <CodeBlock
            code={persistentStateExample}
            filename="SearchComponent.tsx"
            language="TypeScript"
          />

          <div className="mt-6 bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
            <div className="flex items-start">
              <Icon
                name="alert"
                className="w-5 h-5 text-amber-400 mr-4 mt-0.5 shrink-0"
              />
              <div>
                <p className="text-amber-300 font-semibold mb-2">
                  Shareable URLs
                </p>
                <p className="text-gray-400 text-sm">
                  When using UseURLStorage, state changes update the URL
                  automatically. Users can bookmark or share URLs with the
                  current state preserved.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* URL Transformers */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <Icon name="settings" className="w-8 h-8 text-cyan-400 mr-3" />
            URL Transformers
          </h2>
          <p className="text-gray-300 mb-6">
            Control how state is serialized to URL query parameters using
            built-in transformers.
          </p>

          <CodeBlock
            code={urlTransformersExample}
            filename="ProductFilterComponent.tsx"
            language="TypeScript"
          />

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
              <h3 className="text-white font-semibold mb-2 text-sm">
                propertyAsKeyArrayValuesAsCommaString
              </h3>
              <p className="text-gray-400 text-xs">
                Serializes arrays as comma-separated strings
              </p>
              <code className="text-xs text-purple-400 mt-2 block">
                ?tags=electronics,sale
              </code>
            </div>

            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
              <h3 className="text-white font-semibold mb-2 text-sm">
                propertyAsKeyArrayValuesAsJSON
              </h3>
              <p className="text-gray-400 text-xs">
                Serializes arrays/objects as JSON
              </p>
              <code className="text-xs text-purple-400 mt-2 block">
                ?data=%5B%7B...%7D%5D
              </code>
            </div>

            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
              <h3 className="text-white font-semibold mb-2 text-sm">
                propertyAsKeyValueAsJSON
              </h3>
              <p className="text-gray-400 text-xs">
                Serializes objects as JSON
              </p>
              <code className="text-xs text-purple-400 mt-2 block">
                ?filters=%7B...%7D
              </code>
            </div>

            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
              <h3 className="text-white font-semibold mb-2 text-sm">
                Default (no transformer)
              </h3>
              <p className="text-gray-400 text-xs">Primitive values as-is</p>
              <code className="text-xs text-purple-400 mt-2 block">
                ?search=laptop
              </code>
            </div>
          </div>
        </div>

        {/* Complete Example */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <Icon name="terminal" className="w-8 h-8 text-pink-400 mr-3" />
            Complete Example: Product Filter
          </h2>
          <p className="text-gray-300 mb-6">
            Here's a complete real-world example combining all state management
            concepts: signals, state services, persistent state, and functional
            API.
          </p>

          <CodeBlock
            code={completeExample}
            filename="product-feature.tsx"
            language="TypeScript"
          />
        </div>

        {/* Best Practices */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <Icon name="star" className="w-8 h-8 text-yellow-400 mr-3" />
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
                    Use Services for Shared State
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Create injectable services to share state across components.
                    This keeps state logic separate from UI and makes testing
                    easier.
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
                    Immutable Updates
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Always create new objects/arrays instead of mutating
                    existing ones. Use spread operators or updater functions
                    with signals.
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
                    Encapsulate State Logic
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Keep signals private in services and expose them through
                    getters. Provide methods to modify state instead of allowing
                    direct access.
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
                    Use Functional API for Derived State
                  </h3>
                  <p className="text-gray-400 text-sm mb-3">
                    Use map(), filter(), and reduce() to create derived state.
                    These methods automatically update when source signals
                    change.
                  </p>
                  <CodeBlock
                    code={`// ✅ Good - Reactive derived state
const activeUsers = this.users.filter(u => u.active);
const userCount = this.users.reduce((count) => count + 1, 0);

// ❌ Bad - Manual computation, not reactive
const activeUsers = this.users.value.filter(u => u.active);`}
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
                    Organize State by Feature
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Group related state in feature-specific services. Provide
                    services at the feature level, not globally, when possible.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-linear-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            Continue Learning
          </h2>
          <p className="text-gray-300 mb-6">
            Now that you understand state management, explore related concepts.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/core/reactivity"
              className="bg-gray-900/50 border border-gray-700 rounded-lg p-4 hover:border-cyan-500/50 transition-colors"
            >
              <Icon name="zap" className="w-6 h-6 text-cyan-400 mb-3" />
              <h3 className="text-white font-semibold mb-2">Reactivity</h3>
              <p className="text-gray-400 text-sm">
                Deep dive into MiniJS reactive system and RxJS integration
              </p>
            </Link>
            <Link
              href="/features/dependency-injection"
              className="bg-gray-900/50 border border-gray-700 rounded-lg p-4 hover:border-cyan-500/50 transition-colors"
            >
              <Icon name="box" className="w-6 h-6 text-purple-400 mb-3" />
              <h3 className="text-white font-semibold mb-2">
                Dependency Injection
              </h3>
              <p className="text-gray-400 text-sm">
                Learn more about creating and injecting services
              </p>
            </Link>
            <Link
              href="/core/lifecycle"
              className="bg-gray-900/50 border border-gray-700 rounded-lg p-4 hover:border-cyan-500/50 transition-colors"
            >
              <Icon name="refresh" className="w-6 h-6 text-green-400 mb-3" />
              <h3 className="text-white font-semibold mb-2">Lifecycle Hooks</h3>
              <p className="text-gray-400 text-sm">
                Use @Mount and @Watch to react to state changes
              </p>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

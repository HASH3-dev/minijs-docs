import { Component } from "@mini/core";
import { Link, Route } from "@mini/router";
import { CodeBlock } from "@/shared/components/CodeBlock";
import { Icon } from "@/shared/components/Icon";

@Route("/features/routing")
export class RoutingPage extends Component {
  render() {
    const basicRouteExample = `import { Component } from "@mini/core";
import { Route } from "@mini/router";

@Route("/")
export class HomePage extends Component {
  render() {
    return (
      <div>
        <h1>Welcome Home!</h1>
      </div>
    );
  }
}

@Route("/about")
export class AboutPage extends Component {
  render() {
    return (
      <div>
        <h1>About Us</h1>
      </div>
    );
  }
}`;

    const routeSwitcherExample = `import { Component } from "@mini/core";
import { Route, RouteSwitcher } from "@mini/router";
import { HomePage } from "./pages/Home.page";
import { AboutPage } from "./pages/About.page";
import { ProductsPage } from "./pages/Products.page";

@Route("/")
export class AppRouter extends Component {
  render() {
    return (
      <div>
        <nav>
          <Link href="/">Home</Link> 
          <Link href="/about">About</Link> 
          <Link href="/products">Products</Link> 
        </nav>
        
        <RouteSwitcher fallback={() => <NotFoundPage />}>
          {() => [
            HomePage,
            AboutPage,
            ProductsPage
          ]}
        </RouteSwitcher>
      </div>
    );
  }
}`;

    const routeParamsExample = `import { Component, Inject, Mount, signal } from "@mini/core";
import { Route, RouterService } from "@mini/router";

@Route("/products/:id")
export class ProductDetailPage extends Component {
  @Inject(RouterService)
  private router!: RouterService;
  
  private product = signal<Product | null>(null);
  
  @Mount()
  onMount() {
    // Subscribe to route params
    this.router.params$.subscribe(params => {
      console.log('Product ID:', params.id);
      this.loadProduct(params.id);
    });
  }
  
  @LoadData()
  async loadProduct(id: string) {
    const product = await fetchProduct(id);
    this.product.set(product);
  }

  renderLoading() {
    return <Spinner />;
  }
  
  render() {
    return (
      <div>
        {this.product.map(product => 
          <div>
            <h1>{product.name}</h1>
            <p>{product.description}</p>
          </div>
        )}
      </div>
    );
  }
}`;

    const multipleParamsExample = `// Multiple route parameters
@Route("/users/:userId/posts/:postId")
export class UserPostPage extends Component {
  @Inject(RouterService)
  private router!: RouterService;
  
  @Mount()
  onMount() {
    this.router.params$.subscribe(params => {
      console.log('User ID:', params.userId);
      console.log('Post ID:', params.postId);
      
      this.loadUserPost(params.userId, params.postId);
    });
  }
  
  render() {
    return <div>User Post</div>;
  }
}`;

    const queryParamsExample = `import { Component, Inject, Mount } from "@mini/core";
import { Route, RouterService } from "@mini/router";

@Route("/products")
export class ProductsPage extends Component {
  @Inject(RouterService)
  private router!: RouterService;
  
  private products = signal<Product[]>([]);
  private filters = signal({ category: 'all', sort: 'name' });
  
  @Mount()
  onMount() {
    // Subscribe to query params
    this.router.query$.subscribe(query => {
      console.log('Query params:', query);
      
      // Update filters from URL
      this.filters.set({
        category: query.category || 'all',
        sort: query.sort || 'name'
      });
      
      this.loadProducts();
    });
  }
  
  async loadProducts() {
    const filters = this.filters.value;
    const products = await fetchProducts(filters);
    this.products.set(products);
  }
  
  render() {
    return (
      <div>
        <h1>Products</h1>
        {/* Products list */}
      </div>
    );
  }
}`;

    const navigationExample = `import { Component, Inject } from "@mini/core";
import { RouterService } from "@mini/router";

export class NavigationExample extends Component {
  @Inject(RouterService)
  private router!: RouterService;
  
  // Navigate to a new route
  goToProduct(id: string) {
    this.router.push(\`/products/\${id}\`);
  }
  
  // Replace current route (no history entry)
  replaceRoute() {
    this.router.replace('/home');
  }
  
  // Navigate with query params
  searchProducts(query: string) {
    this.router.push('/products', { search: query, page: '1' });
  }
  
  // Browser navigation
  goBack() {
    this.router.back();
  }
  
  goForward() {
    this.router.forward();
  }
  
  render() {
    return (
      <div>
        <button onClick={() => this.goToProduct('123')}>
          View Product
        </button>
        <button onClick={() => this.searchProducts('laptop')}>
          Search Laptops
        </button>
        <button onClick={() => this.goBack()}>
          Go Back
        </button>
      </div>
    );
  }
}`;

    const nestedRoutesExample = `// Parent route
@Route("/dashboard")
export class DashboardPage extends Component {
  render() {
    return (
      <div>
        <h1>Dashboard</h1>
        <nav>
          <Link href="/dashboard/stats">Stats</Link> 
          <Link href="/dashboard/reports">Reports</Link> 
          <Link href="/dashboard/settings">Settings</Link> 
        </nav>
        
        {/* Nested routes will render here */}
        <RouteSwitcher>
          {() => [
            DashboardStatsPage,
            DashboardReportsPage,
            DashboardSettingsPage
          ]}
        </RouteSwitcher>
      </div>
    );
  }
}

// Child routes
// Composed with /dashboard route of the  parent
@Route("/stats")
export class DashboardStatsPage extends Component {
  render() {
    return <div>Statistics</div>;
  }
}

@Route("/reports")
export class DashboardReportsPage extends Component {
  render() {
    return <div>Reports</div>;
  }
}

@Route("/settings")
export class DashboardSettingsPage extends Component {
  render() {
    return <div>Settings</div>;
  }
}`;

    const lazyLoadingExample = `import { Lazy } from "@mini/core";
import { Component, Route, RouteSwitcher } from "@mini/router";
import { HomePage } from "./pages/Home.page";

@Route("/")
export class AppRouter extends Component {
  render() {
    return (
      <RouteSwitcher>
        {() => [
          HomePage,
          // Lazy load heavy features
          Lazy("./features/Dashboard.page#DashboardPage"), // Lazy("file/path#ExportedComponentName")
          Lazy("./features/Analytics.page#AnalyticsPage"),
          Lazy("./features/Admin.page#AdminPage")
        ]}
      </RouteSwitcher>
    );
  }
}`;

    const wildcardExample = `// Catch-all route (must be last)
@Route("/docs/*")
export class DocsPage extends Component {
  @Inject(RouterService)
  private router!: RouterService;
  
  @Mount()
  onMount() {
    this.router.params$.subscribe(params => {
      // Access the wildcard segment
      const path = params['*'];
      console.log('Docs path:', path);
      
      this.loadDocumentation(path);
    });
  }
  
  render() {
    return <div>Documentation</div>;
  }
}

// 404 Not Found
@Route("*")
export class NotFoundPage extends Component {
  render() {
    return (
      <div>
        <h1>404 - Page Not Found</h1>
        <Link href="/">Go Home</Link> 
      </div>
    );
  }
}`;

    const completeExample = `import { Component, Inject, Mount, signal } from "@mini/core";
import { Route, RouterService, RouteSwitcher } from "@mini/router";

// 1. Define routes
@Route("/")
export class HomePage extends Component {
  render() {
    return <h1>Home Page</h1>;
  }
}

@Route("/products")
export class ProductsPage extends Component {
  @Inject(RouterService)
  private router!: RouterService;
  
  private products = signal<Product[]>([]);
  private currentPage = signal(1);
  
  @Mount()
  onMount() {
    // React to query params
    this.router.query$.subscribe(query => {
      const page = parseInt(query.page || '1');
      this.currentPage.set(page);
      this.loadProducts(page);
    });
  }
  
  async loadProducts(page: number) {
    const products = await fetchProducts({ page });
    this.products.set(products);
  }
  
  nextPage() {
    const next = this.currentPage.value + 1;
    this.router.push('/products', { page: next.toString() });
  }
  
  render() {
    return (
      <div>
        <h1>Products - Page {this.currentPage}</h1>
        <div>
          {this.products.map(product => (
            <div key={product.id}>
              <h3>{product.name}</h3>
              <button onClick={() => this.viewProduct(product.id)}>
                View Details
              </button>
            </div>
          ))}
        </div>
        <button onClick={() => this.nextPage()}>
          Next Page
        </button>
      </div>
    );
  }
  
  viewProduct(id: string) {
    this.router.push(\`/products/\${id}\`);
  }
}

@Route("/products/:id")
export class ProductDetailPage extends Component {
  @Inject(RouterService)
  private router!: RouterService;
  
  private product = signal<Product | null>(null);
  
  @Mount()
  onMount() {
    this.router.params$.subscribe(params => {
      this.loadProduct(params.id);
    });
  }
  
  async loadProduct(id: string) {
    const product = await fetchProduct(id);
    this.product.set(product);
  }
  
  goBack() {
    this.router.back();
  }
  
  render() {
    return (
      <div>
        {this.product.map(product => product && (
          <>
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <p>Price: {product.price}</p>
            <button onClick={() => this.goBack()}>
              Back to Products
            </button>
          </>
        )}
      </div>
    );
  }
}

// 2. Setup router
@Route("/")
export class AppRouter extends Component {
  render() {
    return (
      <div>
        <nav>
          <Link href="/">Home</Link> 
          <Link href="/products">Products</Link> 
        </nav>
        
        <main>
          <RouteSwitcher fallback={() => <NotFoundPage />}>
            {() => [
              HomePage,
              ProductsPage,
              ProductDetailPage
            ]}
          </RouteSwitcher>
        </main>
      </div>
    );
  }
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
            Routing System
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed">
            Declarative, type-safe routing with the @Route decorator, dynamic
            parameters, query strings, and programmatic navigation.
          </p>
        </div>

        {/* Key Features */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <Icon name="star" className="w-8 h-8 text-yellow-400 mr-3" />
            Key Features
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6">
              <h3 className="text-white font-semibold mb-2 text-lg">
                Declarative Routes
              </h3>
              <p className="text-gray-400 text-sm">
                Define routes using the @Route decorator directly on components
              </p>
            </div>

            <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6">
              <h3 className="text-white font-semibold mb-2 text-lg">
                Dynamic Parameters
              </h3>
              <p className="text-gray-400 text-sm">
                Extract route parameters and query strings with reactive
                observables
              </p>
            </div>

            <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-6">
              <h3 className="text-white font-semibold mb-2 text-lg">
                Nested Routes
              </h3>
              <p className="text-gray-400 text-sm">
                Create complex routing hierarchies with multiple RouteSwitchers
              </p>
            </div>

            <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-6">
              <h3 className="text-white font-semibold mb-2 text-lg">
                Lazy Loading
              </h3>
              <p className="text-gray-400 text-sm">
                Code-split routes for optimal bundle size and performance
              </p>
            </div>
          </div>
        </div>

        {/* Basic Routing */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <Icon name="map" className="w-8 h-8 text-blue-400 mr-3" />
            Basic Routing with @Route
          </h2>
          <p className="text-gray-300 mb-6">
            Use the{" "}
            <code className="px-2 py-1 bg-gray-800 rounded text-purple-400">
              @Route()
            </code>{" "}
            decorator to define routes for your components. Each route maps a
            URL path to a component.
          </p>

          <CodeBlock
            code={basicRouteExample}
            filename="pages.tsx"
            language="TypeScript"
          />

          <div className="mt-6 bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <div className="flex items-start">
              <Icon
                name="info"
                className="w-5 h-5 text-blue-400 mr-4 mt-0.5 shrink-0"
              />
              <div>
                <p className="text-blue-300 font-semibold mb-2">
                  Route Matching
                </p>
                <p className="text-gray-400 text-sm">
                  Routes are matched in the order they are provided to
                  RouteSwitcher. More specific routes should come before generic
                  ones.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RouteSwitcher */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <Icon name="exchange" className="w-8 h-8 text-green-400 mr-3" />
            RouteSwitcher Component
          </h2>
          <p className="text-gray-300 mb-6">
            The{" "}
            <code className="px-2 py-1 bg-gray-800 rounded text-purple-400">
              RouteSwitcher
            </code>{" "}
            component renders the matching route component based on the current
            URL.
          </p>

          <CodeBlock
            code={routeSwitcherExample}
            filename="AppRouter.tsx"
            language="TypeScript"
          />

          <div className="mt-6 bg-green-500/10 border border-green-500/20 rounded-lg p-4">
            <div className="flex items-start">
              <Icon
                name="check"
                className="w-5 h-5 text-green-400 mr-4 mt-0.5 shrink-0"
              />
              <div>
                <p className="text-green-300 font-semibold mb-2">
                  Fallback Route
                </p>
                <p className="text-gray-400 text-sm">
                  The fallback property defines what to render when no route
                  matches. Perfect for 404 pages.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Route Parameters */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <Icon name="code" className="w-8 h-8 text-purple-400 mr-3" />
            Route Parameters
          </h2>
          <p className="text-gray-300 mb-6">
            Define dynamic route segments using{" "}
            <code className="px-2 py-1 bg-gray-800 rounded text-purple-400">
              :paramName
            </code>{" "}
            syntax. Access parameters reactively through{" "}
            <code className="px-2 py-1 bg-gray-800 rounded text-purple-400">
              RouterService.params$
            </code>
            .
          </p>

          <CodeBlock
            code={routeParamsExample}
            filename="ProductDetail.page.tsx"
            language="TypeScript"
          />

          <div className="mt-6">
            <h3 className="text-xl font-semibold text-white mb-4">
              Multiple Parameters
            </h3>
            <p className="text-gray-300 mb-4">
              You can have multiple parameters in a single route:
            </p>
            <CodeBlock
              code={multipleParamsExample}
              language="tsx"
              layout="compact"
            />
          </div>
        </div>

        {/* Query Parameters */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <Icon name="search" className="w-8 h-8 text-cyan-400 mr-3" />
            Query Parameters
          </h2>
          <p className="text-gray-300 mb-6">
            Access URL query strings through{" "}
            <code className="px-2 py-1 bg-gray-800 rounded text-purple-400">
              RouterService.query$
            </code>
            . Query params are perfect for filters, pagination, and search.
          </p>

          <CodeBlock
            code={queryParamsExample}
            filename="Products.page.tsx"
            language="TypeScript"
          />

          <div className="mt-6 bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-4">
            <div className="flex items-start">
              <Icon
                name="lightbulb"
                className="w-5 h-5 text-cyan-400 mr-4 mt-0.5 shrink-0"
              />
              <div>
                <p className="text-cyan-300 font-semibold mb-2">
                  Reactive Query Params
                </p>
                <p className="text-gray-400 text-sm">
                  The query$ observable emits whenever query parameters change,
                  making it easy to react to URL changes without page reloads.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Programmatic Navigation */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <Icon name="arrow-right" className="w-8 h-8 text-pink-400 mr-3" />
            Programmatic Navigation
          </h2>
          <p className="text-gray-300 mb-6">
            Navigate programmatically using the{" "}
            <code className="px-2 py-1 bg-gray-800 rounded text-purple-400">
              RouterService
            </code>{" "}
            methods. Inject the service and call navigation methods from your
            component logic.
          </p>

          <CodeBlock
            code={navigationExample}
            filename="Navigation.tsx"
            language="TypeScript"
          />

          <div className="mt-6">
            <h3 className="text-xl font-semibold text-white mb-4">
              RouterService Methods
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                <code className="text-purple-400 font-mono text-sm">
                  push(path, query?)
                </code>
                <p className="text-gray-400 text-sm mt-2">
                  Navigate to a new route, adding to history
                </p>
              </div>
              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                <code className="text-purple-400 font-mono text-sm">
                  replace(path, query?)
                </code>
                <p className="text-gray-400 text-sm mt-2">
                  Replace current route without adding to history
                </p>
              </div>
              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                <code className="text-purple-400 font-mono text-sm">
                  back()
                </code>
                <p className="text-gray-400 text-sm mt-2">
                  Navigate to previous page in history
                </p>
              </div>
              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                <code className="text-purple-400 font-mono text-sm">
                  forward()
                </code>
                <p className="text-gray-400 text-sm mt-2">
                  Navigate to next page in history
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Nested Routes */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <Icon name="layers" className="w-8 h-8 text-indigo-400 mr-3" />
            Nested Routes
          </h2>
          <p className="text-gray-300 mb-6">
            Create complex routing hierarchies by nesting RouteSwitcher
            components. Parent routes render shared layout while child routes
            render specific content.
          </p>

          <CodeBlock
            code={nestedRoutesExample}
            filename="nested-routes.tsx"
            language="TypeScript"
          />
        </div>

        {/* Lazy Loading */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <Icon name="lightning" className="w-8 h-8 text-yellow-400 mr-3" />
            Lazy Loading Routes
          </h2>
          <p className="text-gray-300 mb-6">
            Use the{" "}
            <code className="px-2 py-1 bg-gray-800 rounded text-purple-400">
              Lazy()
            </code>{" "}
            helper to code-split routes. Routes are loaded only when needed,
            reducing initial bundle size.
          </p>

          <CodeBlock
            code={lazyLoadingExample}
            filename="lazy-routes.tsx"
            language="TypeScript"
          />

          <div className="mt-6 bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
            <div className="flex items-start">
              <Icon
                name="star"
                className="w-5 h-5 text-yellow-400 mr-4 mt-0.5 shrink-0"
              />
              <div>
                <p className="text-yellow-300 font-semibold mb-2">
                  Performance Benefit
                </p>
                <p className="text-gray-400 text-sm">
                  Lazy loading can significantly reduce initial bundle size for
                  large applications with many routes. Each lazy route becomes a
                  separate chunk.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Wildcard Routes */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <Icon name="search" className="w-8 h-8 text-teal-400 mr-3" />
            Wildcard Routes
          </h2>
          <p className="text-gray-300 mb-6">
            Use wildcard segments to match any path. Useful for catch-all
            routes, documentation paths, or 404 pages.
          </p>

          <CodeBlock
            code={wildcardExample}
            filename="wildcard-routes.tsx"
            language="TypeScript"
          />
        </div>

        {/* Complete Example */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <Icon name="terminal" className="w-8 h-8 text-emerald-400 mr-3" />
            Complete Example
          </h2>
          <p className="text-gray-300 mb-6">
            Here's a complete routing setup with multiple routes, parameters,
            and navigation:
          </p>

          <CodeBlock
            code={completeExample}
            filename="complete-routing.tsx"
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
                    Order Routes Correctly
                  </h3>
                  <p className="text-gray-400 text-sm mb-3">
                    Place more specific routes before generic ones. Routes are
                    matched in order, so{" "}
                    <code className="text-purple-400">/products/:id</code>{" "}
                    should come before{" "}
                    <code className="text-purple-400">/products/*</code>.
                  </p>
                  <CodeBlock
                    code={`// ✅ Good - Specific before generic
<RouteSwitcher>
  {() => [
    HomePage,           // /
    ProductDetailPage,  // /products/:id
    ProductsPage,       // /products
    NotFoundPage        // *
  ]}
</RouteSwitcher>

// ❌ Bad - Generic matches everything
<RouteSwitcher>
  {() => [
    HomePage,           // /
    NotFoundPage,       // * - Will match /products!
    ProductsPage,       // Never reached
    ProductDetailPage   // Never reached
  ]}
</RouteSwitcher>`}
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
                    Clean Up Subscriptions
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Always unsubscribe from route observables in cleanup
                    functions to prevent memory leaks. Return cleanup functions
                    from @Mount or use takeUntil.
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
                    Use Lazy Loading Wisely
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Lazy load routes for large features or admin sections. Don't
                    lazy load critical paths that users access frequently, as
                    this adds loading time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-linear-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            Continue Learning
          </h2>
          <p className="text-gray-300 mb-6">
            Now that you understand routing, explore related features.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/features/guards-resolvers"
              className="bg-gray-900/50 border border-gray-700 rounded-lg p-4 hover:border-blue-500/50 transition-colors"
            >
              <Icon name="shield" className="w-6 h-6 text-green-400 mb-3" />
              <h3 className="text-white font-semibold mb-2">
                Guards & Resolvers
              </h3>
              <p className="text-gray-400 text-sm">
                Protect routes and preload data before navigation
              </p>
            </Link>
            <Link
              href="/features/dependency-injection"
              className="bg-gray-900/50 border border-gray-700 rounded-lg p-4 hover:border-blue-500/50 transition-colors"
            >
              <Icon
                name="adjustments"
                className="w-6 h-6 text-purple-400 mb-3"
              />
              <h3 className="text-white font-semibold mb-2">
                Dependency Injection
              </h3>
              <p className="text-gray-400 text-sm">
                Inject services into route components
              </p>
            </Link>
            <Link
              href="/decorators/route"
              className="bg-gray-900/50 border border-gray-700 rounded-lg p-4 hover:border-blue-500/50 transition-colors"
            >
              <Icon name="code" className="w-6 h-6 text-blue-400 mb-3" />
              <h3 className="text-white font-semibold mb-2">@Route API</h3>
              <p className="text-gray-400 text-sm">
                Deep dive into @Route decorator API reference
              </p>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

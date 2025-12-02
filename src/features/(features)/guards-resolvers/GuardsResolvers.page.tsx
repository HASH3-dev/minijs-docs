import { Component } from "@mini/core";
import { Link, Route } from "@mini/router";
import { CodeBlock } from "@/shared/components/CodeBlock";
import { Icon } from "@/shared/components/Icon";

@Route("/features/guards-resolvers")
export class GuardsResolversPage extends Component {
  render() {
    const guardInterfaceExample = `import { ElementType } from "@mini/core";
import { Guard } from "@mini/router";

export interface Guard {
  canActivate(): boolean | Promise<boolean>;
  fallback?(): ElementType; // Optional: render UI when guard fails
}`;

    const authGuardExample = `import { Injectable, Inject } from "@mini/core";
import { Guard, RouterService } from "@mini/router";

@Injectable()
export class AuthGuard implements Guard {
  @Inject(AuthService)
  private authService!: AuthService;
  
  @Inject(RouterService)
  private router!: RouterService;
  
  canActivate(): boolean {
    const isAuthenticated = this.authService.isAuthenticated();
    
    if (!isAuthenticated) {
      // Redirect to login
      this.router.push('/login', { 
        returnUrl: this.router.currentPath.value 
      });
      return false;
    }
    
    return true;
  }
}`;

    const roleGuardExample = `@Injectable()
export class RoleGuard implements Guard {
  @Inject(AuthService)
  private authService!: AuthService;
  
  @Inject(RouterService)
  private router!: RouterService;
  
  private requiredRoles = signal<string[]>([]);
  
  constructor(roles: string[]) {
    this.requiredRoles.set(roles);
  }
  
  canActivate(): boolean {
    const user = this.authService.getCurrentUser();
    const roles = this.requiredRoles.value;
    
    if (!user || !roles.some(role => user.roles.includes(role))) {
      this.router.push('/unauthorized');
      return false;
    }
    
    return true;
  }
}`;

    const resolverInterfaceExample = `import { Resolver } from "@mini/router";

export interface Resolver<T = any> {
  resolve(): T | Promise<T>;
  isEmpty?(data: T): boolean; // Optional: check if resolved data is empty
}`;

    const userResolverExample = `import { Injectable, Inject } from "@mini/core";
import { Resolver, RouterService } from "@mini/router";

@Injectable()
export class UserResolver implements Resolver<User> {
  @Inject(UserService)
  private userService!: UserService;
  
  @Inject(RouterService)
  private router!: RouterService;
  
  async resolve(): Promise<User> {
    // Access route params via RouterService
    const userId = this.router.params$.value.id;
    
    if (!userId) {
      throw new Error('User ID is required');
    }
    
    return await this.userService.getUserById(userId);
  }
}`;

    const productResolverExample = `@Injectable()
export class ProductResolver implements Resolver<Product> {
  @Inject(ProductService)
  private productService!: ProductService;
  
  @Inject(RouterService)
  private router!: RouterService;
  
  async resolve(): Promise<Product> {
    try {
      // Access route params via RouterService
      const productId = this.router.params$.value.id;
      const product = await this.productService.getProduct(productId);
      
      if (!product) {
        // Product not found, redirect to 404
        this.router.push('/not-found');
        throw new Error('Product not found');
      }
      
      return product;
    } catch (error) {
      console.error('Failed to load product:', error);
      throw error;
    }
  }
}`;

    const useGuardsExample = `import { Component } from "@mini/core";
import { Route, UseGuards } from "@mini/router";
import { AuthGuard } from "./guards/auth.guard";

@Route("/dashboard")
@UseGuards([AuthGuard])
export class DashboardPage extends Component {
  render() {
    return (
      <div>
        <h1>Dashboard</h1>
        <p>This page is protected by authentication</p>
      </div>
    );
  }
}`;

    const multipleGuardsExample = `import { Route, UseGuards } from "@mini/router";
import { AuthGuard } from "./guards/auth.guard";
import { RoleGuard } from "./guards/role.guard";
import { SubscriptionGuard } from "./guards/subscription.guard";

// Multiple guards are executed in order
@Route("/admin")
@UseGuards([
  AuthGuard,                    // 1. Check if user is authenticated
  new RoleGuard(['admin']),     // 2. Check if user has admin role
  SubscriptionGuard             // 3. Check if subscription is active
])
export class AdminPage extends Component {
  render() {
    return <div>Admin Panel</div>;
  }
}`;

    const useResolversExample = `import { Component, Signal, UseResolvers } from "@mini/core";
import { Route } from "@mini/router";
import { UserResolver } from "./resolvers/user.resolver";

@Route("/users/:id")
@UseResolvers([UserResolver])
export class UserProfilePage extends Component {
  @Inject(UserResolver)
  private user: Signal<User>;
  
  render() {
    return (
      <div>
        {this.user.map(user => user && (
          <>
            <h1>{user.name}</h1>
            <p>{user.email}</p>
          </>
        ))}
      </div>
    );
  }
}`;

    const multipleResolversExample = `@Route("/posts/:id")
@UseResolvers([
  PostResolver,
  AuthorResolver,
  CommentsResolver
])
export class PostDetailPage extends Component {
  @Inject(PostResolver)
  private post: Signal<Post>;
  
  @Inject(AuthorResolver)
  private author: Signal<Author>;

  @Inject(CommentsResolver)
  private comments: Signal<Comment[]>;
  
  render() {
    return (
      <div>
        <article>
          <h1>{this.post.get('title')}</h1>
          <p>By {this.author.get('name')}</p>
          <div>{this.post.get('content')}</div>
        </article>
        
        <section>
          <h2>Comments ({this.comments.pipe(map(c => c.length}))</h2>
          {this.comments.map(comment => (
            <div key={comment.id}>{comment.text}</div>
          ))}
        </section>
      </div>
    );
  }
}`;

    const guardErrorExample = `@Injectable()
export class PermissionGuard implements Guard {
  @Inject(RouterService)
  private router!: RouterService;
  
  async canActivate(): Promise<boolean> {
    try {
      // Access route params via RouterService
      const resourceId = this.router.params$.value.resourceId;
      const hasPermission = await this.checkPermission(resourceId);
      
      if (!hasPermission) {
        this.router.push('/access-denied');
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Permission check failed:', error);
      // On error, deny access
      this.router.push('/error');
      return false;
    }
  }
  
  private async checkPermission(resourceId: string): Promise<boolean> {
    // API call to check permission
    return true;
  }
}`;

    const resolverErrorExample = `@Injectable()
export class DataResolver implements Resolver<Data> {
  @Inject(RouterService)
  private router!: RouterService;
  
  async resolve(): Promise<Data> {
    try {
      // Access route params via RouterService
      const dataId = this.router.params$.value.id;
      return await this.fetchData(dataId);
    } catch (error) {
      console.error('Failed to resolve data:', error);
      
      // You can return fallback data
      return this.getFallbackData();
      
      // Or throw to prevent navigation
      // throw new Error('Data resolution failed');
    }
  }
  
  private async fetchData(id: string): Promise<Data> {
    // Fetch data from API
    return {} as Data;
  }
  
  private getFallbackData(): Data {
    return {
      id: 'fallback',
      title: 'Data unavailable',
      content: 'Please try again later'
    };
  }
}`;

    const fallbackRenderingExample = `import { Route, UseResolvers } from "@mini/router";

@Route("/products/:id")
@UseResolvers([ProductResolver])
export class ProductPage extends Component {
  @Inject(ProductResolver)
  private product: Signal<Product>;

  // This renders while resolvers are running
  renderLoading() {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        <p className="ml-4 text-gray-400">Loading product...</p>
      </div>
    );
  }
  
  render() {
    // After resolver completes
    return (
      <div>
        {this.product.map(product => product && (
          <div>
            <h1>{product.name}</h1>
            <p>{product.description}</p>
          </div>
        ))}
      </div>
    );
  }
}`;

    const completeExample = `// 1. Define Guards
import { Injectable, Inject, signal } from "@mini/core";
import { Guard, RouterService } from "@mini/router";

@Injectable()
export class AuthGuard implements Guard {
  @Inject(AuthService)
  private authService!: AuthService;
  
  @Inject(RouterService)
  private router!: RouterService;
  
  canActivate(): boolean {
    if (!this.authService.isAuthenticated()) {
      this.router.push('/login', { 
        returnUrl: this.router.currentPath.value 
      });
      return false;
    }
    return true;
  }
}

@Injectable()
export class OwnerGuard implements Guard {
  @Inject(AuthService)
  private authService!: AuthService;
  
  @Inject(RouterService)
  private router!: RouterService;
  
  canActivate(): boolean {
    const currentUser = this.authService.getCurrentUser();
    // Access route params via RouterService
    const resourceOwnerId = this.router.params$.value.userId;
    
    if (currentUser?.id !== resourceOwnerId) {
      this.router.push('/unauthorized');
      return false;
    }
    
    return true;
  }
}

// 2. Define Resolvers
import { Resolver } from "@mini/router";

@Injectable()
export class UserProfileResolver implements Resolver<UserProfile> {
  @Inject(UserService)
  private userService!: UserService;
  
  @Inject(RouterService)
  private router!: RouterService;
  
  async resolve(): Promise<UserProfile> {
    // Access route params via RouterService
    const userId = this.router.params$.value.userId;
    const profile = await this.userService.getProfile(userId);
    
    if (!profile) {
      throw new Error('Profile not found');
    }
    
    return profile;
  }
}

@Injectable()
export class UserPostsResolver implements Resolver<Post[]> {
  @Inject(PostService)
  private postService!: PostService;
  
  @Inject(RouterService)
  private router!: RouterService;
  
  async resolve(): Promise<Post[]> {
    // Access route params and query via RouterService
    const userId = this.router.params$.value.userId;
    const page = parseInt(this.router.query$.value.page || '1');
    const limit = parseInt(this.router.query$.value.limit || '10');
    
    return await this.postService.getUserPosts(userId, { page, limit });
  }
}

// 3. Apply to Routes
import { Component, Mount } from "@mini/core";
import { Route, UseGuards, UseResolvers } from "@mini/router";

@Route("/users/:userId/profile")
@UseGuards([AuthGuard, OwnerGuard])
@UseResolvers([
  UserProfileResolver,
  UserPostsResolver
])
export class UserProfileEditPage extends Component {
  @Inject(RouterService)
  private router!: RouterService;
  
  private profile: Signal<UserProfile>;
  private posts: Signal<Post[]>;

  
  private async updateProfile(updates: Partial<UserProfile>) {
    const currentProfile = this.profile.value;
    if (!currentProfile) return;
    
    try {
      const updated = await this.userService.updateProfile(
        currentProfile.id,
        updates
      );
      this.profile.set(updated);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  }
  
  renderLoading() {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        <p className="ml-4 text-gray-400">Loading profile...</p>
      </div>
    );
  }

  // Will render if resolver returns no data
  // The isEmpty method can be used on the resolver to check if the data is considered empty
  renderEmpty() {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-400">Profile not found</p>
      </div>
    );
  }
  
  render() {
    return (
      <div>
        <h1>Edit Profile</h1>
        
        <form>
          <div>
            <label>Name</label>
            <input 
              type="text" 
              value={this.profile.get('name')}
              onInput={(e) => this.updateProfile({ name: e.target.value })}
            />
          </div>
          
          <div>
            <label>Bio</label>
            <textarea 
              value={this.profile.get('bio')}
              onInput={(e) => this.updateProfile({ bio: e.target.value })}
            />
          </div>
          
          <button type="submit">Save Changes</button>
        </form>
        
        <section>
          <h2>Your Posts ({this.posts.pipe(map((value) => value.length}))</h2>
          {this.posts.map(post => (
            <article key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
            </article>
          ))}
        </section>
      </div>
    );
  }
}

interface UserProfile {
  id: string;
  name: string;
  email: string;
  bio: string;
}

interface Post {
  id: string;
  title: string;
  excerpt: string;
  content: string;
}`;

    return (
      <div className="prose prose-invert max-w-none">
        {/* Hero Section */}
        <div className="mb-12">
          <div className="inline-flex items-center space-x-2 mb-6">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-400 text-sm font-medium">Feature</span>
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
            Guards & Resolvers
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed">
            Protect routes with guards and preload data with resolvers. Control
            access, validate permissions, and ensure data is ready before
            navigation completes.
          </p>
        </div>

        {/* Key Features */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <Icon name="star" className="w-8 h-8 text-yellow-400 mr-3" />
            Key Features
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6">
              <h3 className="text-white font-semibold mb-2 text-lg">
                Route Guards
              </h3>
              <p className="text-gray-400 text-sm">
                Control navigation with guards that can allow or deny access to
                routes
              </p>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6">
              <h3 className="text-white font-semibold mb-2 text-lg">
                Data Resolvers
              </h3>
              <p className="text-gray-400 text-sm">
                Preload data before navigation completes, ensuring content is
                ready
              </p>
            </div>

            <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-6">
              <h3 className="text-white font-semibold mb-2 text-lg">
                Multiple Guards
              </h3>
              <p className="text-gray-400 text-sm">
                Chain multiple guards for complex authorization scenarios
              </p>
            </div>

            <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-6">
              <h3 className="text-white font-semibold mb-2 text-lg">
                Error Handling
              </h3>
              <p className="text-gray-400 text-sm">
                Gracefully handle failures and provide fallback experiences
              </p>
            </div>
          </div>
        </div>

        {/* What are Guards */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <Icon name="shield" className="w-8 h-8 text-green-400 mr-3" />
            What are Guards?
          </h2>
          <p className="text-gray-300 mb-6">
            Guards are services that implement the{" "}
            <code className="px-2 py-1 bg-gray-800 rounded text-purple-400">
              Guard
            </code>{" "}
            interface and determine if a route can be activated. They're
            commonly used for authentication, authorization, and validation.
          </p>

          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 mb-6">
            <h3 className="text-white font-semibold mb-4 text-lg">
              Common Use Cases
            </h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start">
                <Icon
                  name="check"
                  className="w-5 h-5 text-green-400 mr-3 mt-0.5 shrink-0"
                />
                <span>
                  <strong>Authentication:</strong> Verify user is logged in
                  before accessing protected routes
                </span>
              </li>
              <li className="flex items-start">
                <Icon
                  name="check"
                  className="w-5 h-5 text-green-400 mr-3 mt-0.5 shrink-0"
                />
                <span>
                  <strong>Authorization:</strong> Check user roles and
                  permissions
                </span>
              </li>
              <li className="flex items-start">
                <Icon
                  name="check"
                  className="w-5 h-5 text-green-400 mr-3 mt-0.5 shrink-0"
                />
                <span>
                  <strong>Resource Ownership:</strong> Ensure users can only
                  access their own data
                </span>
              </li>
              <li className="flex items-start">
                <Icon
                  name="check"
                  className="w-5 h-5 text-green-400 mr-3 mt-0.5 shrink-0"
                />
                <span>
                  <strong>Feature Flags:</strong> Control access to features
                  based on configuration
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* What are Resolvers */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <Icon name="download" className="w-8 h-8 text-blue-400 mr-3" />
            What are Resolvers?
          </h2>
          <p className="text-gray-300 mb-6">
            Resolvers are services that implement the{" "}
            <code className="px-2 py-1 bg-gray-800 rounded text-purple-400">
              Resolver
            </code>{" "}
            interface and fetch data before a route is activated. This ensures
            that components have the data they need when they render.
          </p>

          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 mb-6">
            <h3 className="text-white font-semibold mb-4 text-lg">Benefits</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start">
                <Icon
                  name="check"
                  className="w-5 h-5 text-blue-400 mr-3 mt-0.5 shrink-0"
                />
                <span>
                  <strong>No Loading States:</strong> Data is ready when
                  component mounts
                </span>
              </li>
              <li className="flex items-start">
                <Icon
                  name="check"
                  className="w-5 h-5 text-blue-400 mr-3 mt-0.5 shrink-0"
                />
                <span>
                  <strong>Centralized Data Fetching:</strong> Keep data loading
                  logic out of components
                </span>
              </li>
              <li className="flex items-start">
                <Icon
                  name="check"
                  className="w-5 h-5 text-blue-400 mr-3 mt-0.5 shrink-0"
                />
                <span>
                  <strong>Better UX:</strong> Show loading indicators at
                  navigation level
                </span>
              </li>
              <li className="flex items-start">
                <Icon
                  name="check"
                  className="w-5 h-5 text-blue-400 mr-3 mt-0.5 shrink-0"
                />
                <span>
                  <strong>Error Handling:</strong> Handle data fetching errors
                  before navigation
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Guard Interface */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <Icon name="code" className="w-8 h-8 text-green-400 mr-3" />
            Implementing Guards
          </h2>
          <p className="text-gray-300 mb-6">
            Create a guard by implementing the{" "}
            <code className="px-2 py-1 bg-gray-800 rounded text-purple-400">
              Guard
            </code>{" "}
            interface. The{" "}
            <code className="px-2 py-1 bg-gray-800 rounded text-purple-400">
              canActivate
            </code>{" "}
            method determines if navigation should proceed.
          </p>

          <div className="mb-6">
            <h3 className="text-xl font-semibold text-white mb-4">
              Guard Interface
            </h3>
            <CodeBlock
              code={guardInterfaceExample}
              filename="Guard.interface.ts"
              language="TypeScript"
            />
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold text-white mb-4">
              Authentication Guard Example
            </h3>
            <CodeBlock
              code={authGuardExample}
              filename="auth.guard.ts"
              language="TypeScript"
            />
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold text-white mb-4">
              Role-Based Guard Example
            </h3>
            <CodeBlock
              code={roleGuardExample}
              filename="role.guard.ts"
              language="TypeScript"
            />
          </div>
        </div>

        {/* Guard Fallback Method */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <Icon name="alert" className="w-8 h-8 text-yellow-400 mr-3" />
            Guard Fallback Rendering
          </h2>
          <p className="text-gray-300 mb-6">
            Guards can implement an optional{" "}
            <code className="px-2 py-1 bg-gray-800 rounded text-purple-400">
              fallback()
            </code>{" "}
            method that returns a component to render when the guard fails. This
            provides a better user experience than redirecting or showing
            nothing.
          </p>

          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 mb-6">
            <h3 className="text-white font-semibold mb-4 text-lg">
              When to Use Fallback
            </h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start">
                <Icon
                  name="check"
                  className="w-5 h-5 text-yellow-400 mr-3 mt-0.5 shrink-0"
                />
                <span>
                  <strong>In-place Messages:</strong> Show an access denied
                  message without leaving the current page context
                </span>
              </li>
              <li className="flex items-start">
                <Icon
                  name="check"
                  className="w-5 h-5 text-yellow-400 mr-3 mt-0.5 shrink-0"
                />
                <span>
                  <strong>Upgrade Prompts:</strong> Show subscription upgrade UI
                  when premium features are accessed
                </span>
              </li>
              <li className="flex items-start">
                <Icon
                  name="check"
                  className="w-5 h-5 text-yellow-400 mr-3 mt-0.5 shrink-0"
                />
                <span>
                  <strong>Login Forms:</strong> Display inline login form
                  instead of redirecting to separate login page
                </span>
              </li>
            </ul>
          </div>

          <CodeBlock
            code={`import { Injectable, Inject } from "@mini/core";
import { Guard, RouterService } from "@mini/router";

@Injectable()
export class AuthGuard implements Guard {
  @Inject(AuthService)
  private authService!: AuthService;
  
  @Inject(RouterService)
  private router!: RouterService;
  
  canActivate(): boolean {
    return this.authService.isAuthenticated();
  }
  
  // Render inline login form instead of redirecting
  fallback() {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="bg-gray-800 p-8 rounded-lg shadow-xl max-w-md w-full">
          <h2 className="text-2xl font-bold text-white mb-4">
            Authentication Required
          </h2>
          <p className="text-gray-400 mb-6">
            Please log in to access this page.
          </p>
          <LoginForm 
            onSuccess={() => this.router.refresh()} 
          />
        </div>
      </div>
    );
  }
}`}
            filename="auth-guard-with-fallback.ts"
            language="TypeScript"
          />

          <div className="mt-6">
            <h3 className="text-xl font-semibold text-white mb-4">
              Subscription Guard with Upgrade Prompt
            </h3>
            <CodeBlock
              code={`@Injectable()
export class SubscriptionGuard implements Guard {
  @Inject(AuthService)
  private authService!: AuthService;
  
  @Inject(RouterService)
  private router!: RouterService;
  
  private requiredTier = signal<'basic' | 'premium' | 'enterprise'>('basic');
  
  constructor(tier: 'basic' | 'premium' | 'enterprise') {
    this.requiredTier.set(tier);
  }
  
  canActivate(): boolean {
    const user = this.authService.getCurrentUser();
    const hasAccess = this.authService.hasSubscriptionTier(
      this.requiredTier.value
    );
    
    return hasAccess;
  }
  
  // Show upgrade prompt instead of blocking access
  fallback() {
    const tier = this.requiredTier.value;
    
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="bg-gray-800 p-8 rounded-lg shadow-xl max-w-2xl w-full">
          <div className="text-center">
            <Icon 
              name="star" 
              className="w-16 h-16 text-yellow-400 mx-auto mb-4" 
            />
            <h2 className="text-3xl font-bold text-white mb-4">
              Upgrade to {tier.charAt(0).toUpperCase() + tier.slice(1)}
            </h2>
            <p className="text-gray-400 mb-6">
              This feature requires a {tier} subscription.
              Upgrade now to unlock premium features!
            </p>
            
            <div className="flex gap-4 justify-center">
              <button 
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
                onClick={() => this.router.push('/upgrade')}
              >
                Upgrade Now
              </button>
              <button 
                className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg"
                onClick={() => this.router.back()}
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}`}
              filename="subscription-guard.ts"
              language="TypeScript"
            />
          </div>

          <div className="mt-6">
            <h3 className="text-xl font-semibold text-white mb-4">
              Access Denied with Details
            </h3>
            <CodeBlock
              code={`@Injectable()
export class PermissionGuard implements Guard {
  @Inject(AuthService)
  private authService!: AuthService;
  
  @Inject(RouterService)
  private router!: RouterService;
  
  private requiredPermission = signal<string>('');
  private denialReason = signal<string>('');
  
  constructor(permission: string) {
    this.requiredPermission.set(permission);
  }
  
  canActivate(): boolean {
    const user = this.authService.getCurrentUser();
    
    if (!user) {
      this.denialReason.set('You must be logged in');
      return false;
    }
    
    if (!user.permissions.includes(this.requiredPermission.value)) {
      this.denialReason.set(
        \`You need "\${this.requiredPermission.value}" permission\`
      );
      return false;
    }
    
    return true;
  }
  
  fallback() {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="bg-red-900/20 border border-red-500/50 p-8 rounded-lg max-w-md w-full">
          <Icon 
            name="shield" 
            className="w-12 h-12 text-red-400 mb-4" 
          />
          <h2 className="text-2xl font-bold text-white mb-2">
            Access Denied
          </h2>
          <p className="text-red-300 mb-6">
            {this.denialReason.value}
          </p>
          <div className="flex gap-3">
            <button 
              className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded"
              onClick={() => this.router.back()}
            >
              Go Back
            </button>
            <button 
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              onClick={() => this.router.push('/contact-admin')}
            >
              Contact Admin
            </button>
          </div>
        </div>
      </div>
    );
  }
}`}
              filename="permission-guard-with-details.ts"
              language="TypeScript"
            />
          </div>

          <div className="mt-6 bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
            <div className="flex items-start">
              <Icon
                name="lightbulb"
                className="w-5 h-5 text-yellow-400 mr-4 mt-0.5 shrink-0"
              />
              <div>
                <p className="text-yellow-300 font-semibold mb-2">
                  Fallback vs Redirect
                </p>
                <p className="text-gray-400 text-sm mb-2">
                  Use{" "}
                  <code className="px-1 py-0.5 bg-gray-800 rounded text-purple-400">
                    fallback()
                  </code>{" "}
                  when you want to show contextual UI without navigation. Use{" "}
                  <code className="px-1 py-0.5 bg-gray-800 rounded text-purple-400">
                    router.push()
                  </code>{" "}
                  when you need to navigate to a different page.
                </p>
                <ul className="text-gray-400 text-sm space-y-1 mt-2">
                  <li>
                    • <strong>Fallback:</strong> Better UX for temporary blocks
                    (login forms, upgrade prompts)
                  </li>
                  <li>
                    • <strong>Redirect:</strong> Better for permanent redirects
                    (404, maintenance pages)
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Resolver Interface */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <Icon name="code" className="w-8 h-8 text-blue-400 mr-3" />
            Implementing Resolvers
          </h2>
          <p className="text-gray-300 mb-6">
            Create a resolver by implementing the{" "}
            <code className="px-2 py-1 bg-gray-800 rounded text-purple-400">
              Resolver
            </code>{" "}
            interface. The{" "}
            <code className="px-2 py-1 bg-gray-800 rounded text-purple-400">
              resolve
            </code>{" "}
            method fetches and returns the data.
          </p>

          <div className="mb-6">
            <h3 className="text-xl font-semibold text-white mb-4">
              Resolver Interface
            </h3>
            <CodeBlock
              code={resolverInterfaceExample}
              filename="Resolver.interface.ts"
              language="TypeScript"
            />
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold text-white mb-4">
              User Resolver Example
            </h3>
            <CodeBlock
              code={userResolverExample}
              filename="user.resolver.ts"
              language="TypeScript"
            />
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold text-white mb-4">
              Resolver with Error Handling
            </h3>
            <CodeBlock
              code={productResolverExample}
              filename="product.resolver.ts"
              language="TypeScript"
            />
          </div>
        </div>

        {/* Using Guards */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <Icon name="shield" className="w-8 h-8 text-purple-400 mr-3" />
            Using @UseGuards Decorator
          </h2>
          <p className="text-gray-300 mb-6">
            Apply guards to routes using the{" "}
            <code className="px-2 py-1 bg-gray-800 rounded text-purple-400">
              @UseGuards
            </code>{" "}
            decorator. Guards are executed before navigation and can prevent
            access.
          </p>

          <CodeBlock
            code={useGuardsExample}
            filename="protected-route.tsx"
            language="TypeScript"
          />

          <div className="mt-6">
            <h3 className="text-xl font-semibold text-white mb-4">
              Multiple Guards
            </h3>
            <p className="text-gray-300 mb-4">
              Use multiple guards for complex authorization. Guards execute in
              order, and all must pass for navigation to succeed.
            </p>
            <CodeBlock
              code={multipleGuardsExample}
              filename="admin-route.tsx"
              language="TypeScript"
            />
          </div>

          <div className="mt-6 bg-green-500/10 border border-green-500/20 rounded-lg p-4">
            <div className="flex items-start">
              <Icon
                name="info"
                className="w-5 h-5 text-green-400 mr-4 mt-0.5 shrink-0"
              />
              <div>
                <p className="text-green-300 font-semibold mb-2">
                  Guard Execution Order
                </p>
                <p className="text-gray-400 text-sm">
                  Guards execute in the order provided. If any guard returns
                  false or redirects, subsequent guards are not executed and
                  navigation is cancelled.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Using Resolvers */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <Icon name="download" className="w-8 h-8 text-cyan-400 mr-3" />
            Using @UseResolvers Decorator
          </h2>
          <p className="text-gray-300 mb-6">
            Apply resolvers to routes using the{" "}
            <code className="px-2 py-1 bg-gray-800 rounded text-purple-400">
              @UseResolvers
            </code>{" "}
            decorator. Resolved data is available as a signal, injected via the{" "}
            <code className="px-2 py-1 bg-gray-800 rounded text-purple-400">
              @Inject(ResolverService) resolvedData: Signal&lt;ResolvedType&gt;
            </code>{" "}
            in your components .
          </p>

          <CodeBlock
            code={useResolversExample}
            filename="user-profile.page.tsx"
            language="TypeScript"
          />

          <div className="mt-6">
            <h3 className="text-xl font-semibold text-white mb-4">
              Multiple Resolvers
            </h3>
            <p className="text-gray-300 mb-4">
              Provide multiple resolvers to load different pieces of data in
              parallel before navigation completes.
            </p>
            <CodeBlock
              code={multipleResolversExample}
              filename="post-detail.page.tsx"
              language="TypeScript"
            />
          </div>
        </div>

        {/* Error Handling */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <Icon name="alert" className="w-8 h-8 text-orange-400 mr-3" />
            Error Handling
          </h2>
          <p className="text-gray-300 mb-6">
            Both guards and resolvers should handle errors gracefully. Guards
            can redirect to error pages, while resolvers can provide fallback
            data or cancel navigation.
          </p>

          <div className="mb-6">
            <h3 className="text-xl font-semibold text-white mb-4">
              Guard Error Handling
            </h3>
            <CodeBlock
              code={guardErrorExample}
              filename="permission.guard.ts"
              language="TypeScript"
            />
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold text-white mb-4">
              Resolver Error Handling
            </h3>
            <CodeBlock
              code={resolverErrorExample}
              filename="data.resolver.ts"
              language="TypeScript"
            />
          </div>
        </div>

        {/* Fallback Rendering */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <Icon name="refresh" className="w-8 h-8 text-indigo-400 mr-3" />
            Loading States with Resolvers
          </h2>
          <p className="text-gray-300 mb-6">
            While resolvers are running, you can render a loading state. Use the{" "}
            <code className="px-2 py-1 bg-gray-800 rounded text-purple-400">
              renderLoading()
            </code>{" "}
            method to provide a better user experience during data fetching.
          </p>

          <CodeBlock
            code={fallbackRenderingExample}
            filename="product-page.tsx"
            language="TypeScript"
          />

          <div className="mt-6 bg-indigo-500/10 border border-indigo-500/20 rounded-lg p-4">
            <div className="flex items-start">
              <Icon
                name="lightbulb"
                className="w-5 h-5 text-indigo-400 mr-4 mt-0.5 shrink-0"
              />
              <div>
                <p className="text-indigo-300 font-semibold mb-2">
                  Better UX with Loading States
                </p>
                <p className="text-gray-400 text-sm">
                  Showing a loading indicator while resolvers run provides
                  better feedback to users than a blank screen or partial
                  content.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Complete Example */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <Icon name="terminal" className="w-8 h-8 text-pink-400 mr-3" />
            Complete Example
          </h2>
          <p className="text-gray-300 mb-6">
            Here's a complete example showing guards and resolvers working
            together to protect a route and preload its data:
          </p>

          <CodeBlock
            code={completeExample}
            filename="complete-guards-resolvers.tsx"
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
                    Keep Guards Simple and Focused
                  </h3>
                  <p className="text-gray-400 text-sm mb-3">
                    Each guard should check one specific condition. Combine
                    multiple guards for complex authorization logic.
                  </p>
                  <CodeBlock
                    code={`// ✅ Good - Each guard has single responsibility
@UseGuards([
  AuthGuard,           // Authentication only
  RoleGuard,           // Role verification only
  SubscriptionGuard    // Subscription check only
])

// ❌ Bad - Single guard doing everything
@UseGuards([ComplexAuthorizationGuard])  // Does auth + role + subscription`}
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
                    Handle Resolver Failures Gracefully
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Always handle errors in resolvers. Decide whether to provide
                    fallback data, redirect, or cancel navigation based on your
                    use case.
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
                    Parallel Resolvers for Better Performance
                  </h3>
                  <p className="text-gray-400 text-sm">
                    When using multiple resolvers, they run in parallel. Design
                    resolvers to be independent to maximize performance gains.
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
                    Redirect in Guards, Not Components
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Handle authorization redirects in guards rather than in
                    components. This prevents components from mounting
                    unnecessarily.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-linear-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            Continue Learning
          </h2>
          <p className="text-gray-300 mb-6">
            Now that you understand guards and resolvers, explore related
            features.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/features/routing"
              className="bg-gray-900/50 border border-gray-700 rounded-lg p-4 hover:border-green-500/50 transition-colors"
            >
              <Icon name="map" className="w-6 h-6 text-blue-400 mb-3" />
              <h3 className="text-white font-semibold mb-2">Routing System</h3>
              <p className="text-gray-400 text-sm">
                Learn about the routing system that powers guards and resolvers
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
                Inject services into guards and resolvers
              </p>
            </Link>
            <Link
              href="/decorators/use-guards"
              className="bg-gray-900/50 border border-gray-700 rounded-lg p-4 hover:border-green-500/50 transition-colors"
            >
              <Icon name="code" className="w-6 h-6 text-green-400 mb-3" />
              <h3 className="text-white font-semibold mb-2">@UseGuards API</h3>
              <p className="text-gray-400 text-sm">
                Deep dive into @UseGuards decorator API reference
              </p>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

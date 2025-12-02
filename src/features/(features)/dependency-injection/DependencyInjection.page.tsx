import { Component } from "@mini/core";
import { Link, Route } from "@mini/router";
import { CodeBlock } from "@/shared/components/CodeBlock";
import { Icon } from "@/shared/components/Icon";

@Route("/features/dependency-injection")
export class DependencyInjectionPage extends Component {
  render() {
    const basicServiceExample = `import { Injectable } from "@mini/core";

@Injectable()
export class UserService {
  private users = signal<User[]>[];

  getAllUsers(): Signal<User[]> {
    return this.users;
  }

  getUserById(id: string): Signal<User | undefined> {
    return this.users.find(u => u.id === id);
  }

  createUser(user: User): void {
    this.users.set((prev) => [...prev, user]);
  }
}

interface User {
  id: string;
  name: string;
  email: string;
}`;

    const injectExample = `import { Component, Inject } from "@mini/core";
import { UserService } from "./services/user.service";

export class UserListComponent extends Component {
  @Inject(UserService)
  private userService!: UserService;

  render() {
    const users = this.userService.getAllUsers();
    
    return (
      <div>
        <h2>Users</h2>
        <ul>
          {users.map(user => (
            <li key={user.id}>
              {user.name} ({user.email})
            </li>
          ))}
        </ul>
      </div>
    );
  }
}`;

    const useProvidersExample = `import { Component, UseProviders } from "@mini/core";
import { UserService } from "./services/user.service";
import { ApiService } from "./services/api.service";

@UseProviders([
  UserService,
  ApiService
])
export class AppComponent extends Component {
  render() {
    return (
      <div>
        {/* Child components can inject UserService and ApiService */}
        <UserListComponent />
      </div>
    );
  }
}`;

    const useValueExample = `// Define a token
import { InjectionToken, Injectable, Inject, UseProviders } from "@mini/core";

export const API_CONFIG = new InjectionToken<ApiConfig>("API_CONFIG");

interface ApiConfig {
  baseUrl: string;
  timeout: number;
}

@UseProviders([
  {
    provide: API_CONFIG,
    useValue: {
      baseUrl: "https://api.example.com",
      timeout: 5000
    }
  }
])
export class AppComponent extends Component {
  @Inject(API_CONFIG)
  private config!: ApiConfig;
  
  render() {
    return <div>App with config</div>;
  }
}`;

    const useFactoryExample = `@UseProviders([
  {
    provide: LoggerService,
    useFactory: (config: ApiConfig) => {
      return new LoggerService({
        level: config.debug ? "debug" : "info",
        prefix: "[MyApp]"
      });
    },
    deps: [API_CONFIG]  // Dependencies to inject into factory
  }
])`;

    const useExistingExample = `// Define abstract interface token
export const LOGGER = new InjectionToken<ILogger>("LOGGER");

interface ILogger {
  log(message: string): void;
  error(message: string): void;
}

@UseProviders([
  ConsoleLoggerService,  // Concrete implementation
  {
    provide: LOGGER,
    useExisting: ConsoleLoggerService  // Alias
  }
])
export class AppComponent extends Component {
  @Inject(LOGGER)  // Can inject using interface token
  private logger!: ILogger;
  
  render() {
    return <div>App with logger</div>;
  }
}`;

    const hierarchicalExample = `// Root component provides shared services
@UseProviders([UserService, ApiService])
export class AppComponent extends Component {
  render() {
    return (
      <div>
        <HeaderComponent />
        <MainComponent />
      </div>
    );
  }
}

// MainComponent provides its own ThemeService
@UseProviders([ThemeService])
export class MainComponent extends Component {
  @Inject(UserService)  // Gets from parent injector
  private userService!: UserService;
  
  @Inject(ThemeService)  // Gets from own injector
  private themeService!: ThemeService;
  
  render() {
    return (
      <div>
        <SidebarComponent />
        <ContentComponent />
      </div>
    );
  }
}`;

    const serviceDepsExample = `@Injectable()
export class ApiService {
  @Inject(HttpClient)
  private http!: HttpClient;
  
  get(url: string) {
    return this.http.get(url);
  }
}

@Injectable()
export class UserService {
  @Inject(ApiService)
  private api!: ApiService;
  
  @Inject(API_BASE_URL)
  private baseUrl!: string;
  
  async getUsers(): Promise<User[]> {
    const response = await this.api.get(\`\${this.baseUrl}/users\`);
    return response.json();
  }
}

@Injectable()
export class AuthService {
  @Inject(UserService)
  private userService!: UserService;
  
  @Inject(ApiService)
  private api!: ApiService;
  
  async login(email: string, password: string) {
    const response = await this.api.post(\`\${this.baseUrl}/auth/login\`, {
      email,
      password
    });
    return response.json();
  }
}`;

    const completeExample = `// 1. Define configuration tokens
import { InjectionToken, Injectable, Inject, UseProviders } from "@mini/core";
import { signal } from "@mini/core";

export const API_CONFIG = new InjectionToken<ApiConfig>("API_CONFIG");

interface ApiConfig {
  baseUrl: string;
  timeout: number;
}

// 2. Create injectable services
@Injectable()
export class HttpService {
  @Inject(API_CONFIG)
  private config!: ApiConfig;
  
  async request(endpoint: string, options?: RequestInit) {
    const url = \`\${this.config.baseUrl}\${endpoint}\`;
    const response = await fetch(url, {
      ...options,
      signal: AbortSignal.timeout(this.config.timeout)
    });
    return response.json();
  }
}

@Injectable()
export class TodoService {
  @Inject(HttpService)
  private http!: HttpService;
  
  private todos = signal<Todo[]>([]);
  
  async loadTodos() {
    const data = await this.http.request("/todos");
    this.todos.set(data);
  }
  
  async createTodo(title: string) {
    const newTodo = await this.http.request("/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, completed: false })
    });
    this.todos.update(todos => [...todos, newTodo]);
  }
  
  getTodos() {
    return this.todos;
  }
}

// 3. Provide services at app level
@UseProviders([
  {
    provide: API_CONFIG,
    useValue: {
      baseUrl: "https://api.example.com",
      timeout: 5000
    }
  },
  HttpService,
  TodoService
])
export class AppComponent extends Component {
  render() {
    return (
      <div>
        <TodoListComponent />
      </div>
    );
  }
}

interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

// 4. Inject and use services in components
export class TodoListComponent extends Component {
  @Inject(TodoService)
  private todoService!: TodoService;
  
  private newTodoTitle = signal("");
  
  @Mount()
  async onMount() {
    await this.todoService.loadTodos();
  }
  
  private async handleAddTodo() {
    const title = this.newTodoTitle.value;
    if (title.trim()) {
      await this.todoService.createTodo(title);
      this.newTodoTitle.set("");
    }
  }
  
  render() {
    const todos = this.todoService.getTodos();
    
    return (
      <div>
        <h2>Todo List</h2>
        <div>
          <input
            type="text"
            value={this.newTodoTitle}
            onInput={(e) => this.newTodoTitle.set(e.target.value)}
            placeholder="New todo..."
          />
          <button onClick={() => this.handleAddTodo()}>
            Add Todo
          </button>
        </div>
        <ul>
          {todos.map(todo => (
            <li key={todo.id}>
              {todo.title}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}`;

    return (
      <div className="prose prose-invert max-w-none">
        {/* Hero Section */}
        <div className="mb-12">
          <div className="inline-flex items-center space-x-2 mb-6">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
            <span className="text-purple-400 text-sm font-medium">Feature</span>
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
            Dependency Injection
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed">
            Type-safe dependency injection system for building modular, testable
            applications with loose coupling and separation of concerns.
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
              <h3 className="text-white font-semibold mb-2 text-lg">
                Services
              </h3>
              <p className="text-gray-400 text-sm">
                Classes marked with @Injectable that provide functionality
              </p>
            </div>

            <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6">
              <h3 className="text-white font-semibold mb-2 text-lg">
                Providers
              </h3>
              <p className="text-gray-400 text-sm">
                Configuration that tells the injector how to create instances
              </p>
            </div>

            <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-6">
              <h3 className="text-white font-semibold mb-2 text-lg">Tokens</h3>
              <p className="text-gray-400 text-sm">
                Unique identifiers for services (classes or InjectionToken)
              </p>
            </div>

            <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-6">
              <h3 className="text-white font-semibold mb-2 text-lg">
                Injectors
              </h3>
              <p className="text-gray-400 text-sm">
                Containers that manage service instances and resolution
              </p>
            </div>
          </div>
        </div>

        {/* Creating Services */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <Icon name="code" className="w-8 h-8 text-blue-400 mr-3" />
            Creating Services with @Injectable
          </h2>
          <p className="text-gray-300 mb-6">
            Mark a class as injectable by adding the{" "}
            <code className="px-2 py-1 bg-gray-800 rounded text-purple-400">
              @Injectable()
            </code>{" "}
            decorator. This makes the service available for dependency injection
            throughout your application.
          </p>

          <CodeBlock
            code={basicServiceExample}
            filename="UserService.ts"
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
                  Service Singleton
                </p>
                <p className="text-gray-400 text-sm">
                  By default, services are singleton within their injector
                  scope. The same instance is shared across all components that
                  inject it.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Injecting Services */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <Icon name="arrow-right" className="w-8 h-8 text-green-400 mr-3" />
            Injecting Services with @Inject
          </h2>
          <p className="text-gray-300 mb-6">
            Use the{" "}
            <code className="px-2 py-1 bg-gray-800 rounded text-purple-400">
              @Inject()
            </code>{" "}
            decorator to inject services into components or other services. The
            injector automatically resolves dependencies based on the service
            token.
          </p>

          <CodeBlock
            code={injectExample}
            filename="UserListComponent.tsx"
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
                  Full Type Safety
                </p>
                <p className="text-gray-400 text-sm">
                  The @Inject decorator provides full type safety. TypeScript
                  ensures that the injected service matches the declared type.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Providing Services */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <Icon name="settings" className="w-8 h-8 text-purple-400 mr-3" />
            Providing Services with @UseProviders
          </h2>
          <p className="text-gray-300 mb-6">
            Register providers at the component level using{" "}
            <code className="px-2 py-1 bg-gray-800 rounded text-purple-400">
              @UseProviders
            </code>
            . This creates a hierarchical injector tree where child components
            can access services provided by their ancestors.
          </p>

          <CodeBlock
            code={useProvidersExample}
            filename="AppComponent.tsx"
            language="TypeScript"
          />
        </div>

        {/* Provider Types */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <Icon name="box" className="w-8 h-8 text-indigo-400 mr-3" />
            Provider Types
          </h2>
          <p className="text-gray-300 mb-6">
            MiniJS supports four types of providers, each serving different use
            cases:
          </p>

          {/* useClass */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-white mb-4 flex items-center">
              <span className="flex items-center justify-center w-10 h-10 bg-blue-500/20 text-blue-400 rounded-lg text-lg font-bold mr-3">
                1
              </span>
              useClass
            </h3>
            <p className="text-gray-300 mb-4">
              Provide a class to be instantiated. This is the most common
              provider type.
            </p>
            <CodeBlock
              code={`@UseProviders([
  // Shorthand: provide class itself
  UserService,
  
  // Or explicit form
  { provide: UserService, useClass: UserService }
])`}
              language="tsx"
              layout="compact"
            />
          </div>

          {/* useValue */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-white mb-4 flex items-center">
              <span className="flex items-center justify-center w-10 h-10 bg-green-500/20 text-green-400 rounded-lg text-lg font-bold mr-3">
                2
              </span>
              useValue
            </h3>
            <p className="text-gray-300 mb-4">
              Provide a constant value or pre-configured object.
            </p>
            <CodeBlock
              code={useValueExample}
              filename="config-provider.tsx"
              language="TypeScript"
            />
          </div>

          {/* useFactory */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-white mb-4 flex items-center">
              <span className="flex items-center justify-center w-10 h-10 bg-purple-500/20 text-purple-400 rounded-lg text-lg font-bold mr-3">
                3
              </span>
              useFactory
            </h3>
            <p className="text-gray-300 mb-4">
              Use a factory function to create the service instance. Useful for
              complex initialization or when you need to inject other services.
            </p>
            <CodeBlock
              code={useFactoryExample}
              language="tsx"
              layout="compact"
            />
          </div>

          {/* useExisting */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-white mb-4 flex items-center">
              <span className="flex items-center justify-center w-10 h-10 bg-orange-500/20 text-orange-400 rounded-lg text-lg font-bold mr-3">
                4
              </span>
              useExisting
            </h3>
            <p className="text-gray-300 mb-4">
              Create an alias for an existing provider. Useful for providing the
              same service instance under different tokens.
            </p>
            <CodeBlock
              code={useExistingExample}
              filename="logger-alias.tsx"
              language="TypeScript"
            />
          </div>
        </div>

        {/* Hierarchical Injectors */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <Icon name="layers" className="w-8 h-8 text-teal-400 mr-3" />
            Hierarchical Injectors
          </h2>
          <p className="text-gray-300 mb-6">
            MiniJS creates a tree of injectors that mirrors your component tree.
            When a component requests a service, the injector searches up the
            tree until it finds a provider.
          </p>

          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 mb-6">
            <div className="font-mono text-sm text-gray-300 space-y-2">
              <div>AppComponent (provides: UserService, ApiService)</div>
              <div className="ml-6">
                ├─ HeaderComponent (can inject: UserService, ApiService)
              </div>
              <div className="ml-6">
                └─ MainComponent (provides: ThemeService)
              </div>
              <div className="ml-12">
                ├─ SidebarComponent (can inject: UserService, ApiService,
                ThemeService)
              </div>
              <div className="ml-12">
                └─ ContentComponent (can inject: UserService, ApiService,
                ThemeService)
              </div>
            </div>
          </div>

          <CodeBlock
            code={hierarchicalExample}
            filename="hierarchical-example.tsx"
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
                  Singleton Behavior
                </p>
                <p className="text-gray-400 text-sm">
                  Services are singleton within their injector. If you provide
                  the same service at multiple levels, each will have its own
                  instance.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Service Dependencies */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <Icon name="link" className="w-8 h-8 text-cyan-400 mr-3" />
            Service Dependencies
          </h2>
          <p className="text-gray-300 mb-6">
            Services can inject other services, creating a dependency graph that
            the injector manages automatically.
          </p>

          <CodeBlock
            code={serviceDepsExample}
            filename="service-dependencies.ts"
            language="TypeScript"
          />
        </div>

        {/* Complete Example */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <Icon name="terminal" className="w-8 h-8 text-pink-400 mr-3" />
            Complete Example
          </h2>
          <p className="text-gray-300 mb-6">
            Here's a complete example showing how to build a feature using
            dependency injection:
          </p>

          <CodeBlock
            code={completeExample}
            filename="todo-feature.tsx"
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
                    Use Interfaces for Abstraction
                  </h3>
                  <p className="text-gray-400 text-sm mb-3">
                    Define InjectionTokens with interface types to create
                    abstractions. This makes your code more testable and
                    flexible.
                  </p>
                  <CodeBlock
                    code={`// ✅ Good - Abstract interface
export const STORAGE = new InjectionToken<IStorage>("STORAGE");

interface IStorage {
  save(key: string, value: any): void;
  load(key: string): any;
}

// Can swap implementations
@UseProviders([
  { provide: STORAGE, useClass: LocalStorageService }
  // or: { provide: STORAGE, useClass: SessionStorageService }
])

// Use abstraction in service
@Inject(STORAGE)
private storage!: IStorage;
`}
                    language="tsx"
                    layout="compact"
                  />
                  <p className="text-gray-400 text-sm mb-3">
                    The same behanvior can be achieved with abstract classes:
                  </p>
                  <CodeBlock
                    code={`// ✅ Good - Abstract classes
export abstract class Storage {
  abstract save(key: string, value: any): void;
  abstract load(key: string): any;
}

export class LocalStorageService extends Storage {...}
export class SessionStorageService extends Storage {...}

// Can swap implementations
@UseProviders([
  { provide: Storage, useClass: LocalStorageService }
  // or: { provide: Storage, useClass: SessionStorageService }
])

// Use abstraction in service
@Inject(Storage)
private storage!: Storage;
`}
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
                    Provide at the Appropriate Level
                  </h3>
                  <p className="text-gray-400 text-sm mb-3">
                    Provide global services at the root level, and
                    feature-specific services at the feature component level.
                    This optimizes memory and isolates concerns.
                  </p>
                  <CodeBlock
                    code={`// ✅ Good - Root level for global services
@UseProviders([AuthService, ApiService])
export class AppComponent extends Component {}

// ✅ Good - Feature level for feature services
@UseProviders([ProductService, CartService])
export class ShopFeature extends Component {}`}
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
                    Keep Services Focused
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Follow the Single Responsibility Principle. Each service
                    should have one clear purpose. Split large services into
                    smaller, focused ones.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            Continue Learning
          </h2>
          <p className="text-gray-300 mb-6">
            Now that you understand dependency injection, explore related
            features.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/features/routing"
              className="bg-gray-900/50 border border-gray-700 rounded-lg p-4 hover:border-purple-500/50 transition-colors"
            >
              <Icon name="map" className="w-6 h-6 text-blue-400 mb-3" />
              <h3 className="text-white font-semibold mb-2">Routing System</h3>
              <p className="text-gray-400 text-sm">
                Learn about routing with @Route decorator and RouterService
              </p>
            </Link>
            <Link
              href="/features/guards-resolvers"
              className="bg-gray-900/50 border border-gray-700 rounded-lg p-4 hover:border-purple-500/50 transition-colors"
            >
              <Icon name="shield" className="w-6 h-6 text-green-400 mb-3" />
              <h3 className="text-white font-semibold mb-2">
                Guards & Resolvers
              </h3>
              <p className="text-gray-400 text-sm">
                Protect routes and preload data with guards and resolvers
              </p>
            </Link>
            <Link
              href="/decorators/injectable"
              className="bg-gray-900/50 border border-gray-700 rounded-lg p-4 hover:border-purple-500/50 transition-colors"
            >
              <Icon name="code" className="w-6 h-6 text-purple-400 mb-3" />
              <h3 className="text-white font-semibold mb-2">@Injectable API</h3>
              <p className="text-gray-400 text-sm">
                Deep dive into @Injectable decorator API reference
              </p>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

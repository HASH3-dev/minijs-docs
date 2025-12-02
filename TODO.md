# 📚 MiniJS Documentation TODO

> Guia completo de desenvolvimento da documentação do MiniJS

**Total de Páginas:** 52  
**Última Atualização:** 27/11/2025

---

## 📊 Status Geral

- 🔴 Não iniciado: 40 páginas
- 🟡 Em progresso: 0 páginas
- 🟢 Completo: 12 páginas (Introduction, Quick Start, Installation, First Component, Basic Concepts, Reactivity, Components, JSX, Lifecycle, Props & Children, Dependency Injection, Routing)

## ✅ Infraestrutura Concluída

- ✅ Sidebar com accordion colapsável (7 seções, 38 links)
- ✅ Icon component centralizado (25+ ícones reutilizáveis)
- ✅ Built-in Components section adicionada ao menu
- ✅ CodeBlock component com syntax highlighting
- ✅ Markdown component para renderização de conteúdo

---

## 🎯 Legenda

- **Status:** 🔴 Não iniciado | 🟡 Em progresso | 🟢 Completo
- **Prioridade:** 🔥 Alta | ⚡ Média | 💡 Baixa

---

# 1️⃣ Getting Started (Começando)

## `/` - Introduction to MiniJS
**Status:** 🟢 Completo  
**Prioridade:** 🔥 Alta  
**Descrição:** Página inicial que apresenta o MiniJS, seus principais diferenciais e um exemplo "Hello World"

**Conteúdo Principal:**
- O que é o MiniJS?
- Principais características (Reatividade Granular, Classes, DI, etc.)
- Por que usar MiniJS?
- Comparação rápida com outros frameworks
- Exemplo "Hello World" interativo
- Call-to-action para Quick Start

**Exemplos de Código:**
```typescript
// Counter simples mostrando reatividade
class Counter extends Component {
  count = signal(0);
  
  render() {
    return (
      <button onClick={() => this.count.set(this.count.value + 1)}>
        Count: {this.count}
      </button>
    );
  }
}
```

**Referências:**
- README.md - Seção de introdução
- README.md - "Por Que Mini Framework?"

---

## `/quick-start` - Quick Start Guide
**Status:** 🟢 Completo  
**Prioridade:** 🔥 Alta  
**Descrição:** Guia rápido para começar com MiniJS em 5 minutos

**Conteúdo Principal:**
- Pré-requisitos (Node.js, npm/pnpm)
- Instalação com CLI
- Estrutura de pastas gerada
- Primeiro componente
- Rodando o projeto
- Próximos passos

**Exemplos de Código:**
```bash
# Instalação
npm install -g @mini/cli
create-mini my-app
cd my-app
npm install
npm run dev
```

```typescript
// Primeiro componente
import { Component, signal, Mount } from '@mini/core';

export class App extends Component {
  message = signal('Hello MiniJS!');
  
  render() {
    return <h1>{this.message}</h1>;
  }
}
```

**Referências:**
- README.md - Seção "Instalação"
- README.md - "Seu Primeiro Componente"

---

## `/installation` - Installation & Setup
**Status:** 🟢 Completo  
**Prioridade:** 🔥 Alta  
**Descrição:** Guia completo de instalação e configuração do ambiente

**Conteúdo Principal:**
- Requisitos do sistema
- Instalação manual vs CLI
- Configuração do tsconfig.json
- Configuração do vite.config.ts
- Configuração do package.json
- Instalação de dependências opcionais
- Troubleshooting comum
- Integração com IDEs (VSCode, WebStorm)

**Exemplos de Código:**
```json
// tsconfig.json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "@mini/core",
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import mini from '@mini/vite-plugin';

export default defineConfig({
  plugins: [mini()],
  esbuild: {
    jsxImportSource: '@mini/core'
  }
});
```

**Referências:**
- README.md - Seção "Setup e Instalação"
- packages/cli/README.md

---

## `/first-component` - Your First Component
**Status:** 🟢 Completo  
**Prioridade:** 🔥 Alta  
**Descrição:** Tutorial passo a passo para criar seu primeiro componente MiniJS

**Conteúdo Principal:**
- Anatomia de um componente
- Criando uma classe componente
- Usando signals para estado
- Renderizando JSX
- Adicionando eventos
- Lifecycle hooks (@Mount)
- Passando props
- Usando children

**Exemplos de Código:**
```typescript
// TodoItem component completo
import { Component, signal } from '@mini/core';

interface TodoProps {
  title: string;
  completed: boolean;
  onToggle: () => void;
}

export class TodoItem extends Component<TodoProps> {
  render() {
    return (
      <li 
        className={this.props.completed ? 'completed' : ''}
        onClick={this.props.onToggle}
      >
        {this.props.title}
      </li>
    );
  }
}
```

**Referências:**
- README.md - Exemplo de Counter
- README.md - "Your First Component"

---

## `/basic-concepts` - Basic Concepts Overview
**Status:** 🟢 Completo  
**Prioridade:** 🔥 Alta  
**Descrição:** Visão geral dos conceitos fundamentais do MiniJS

**Conteúdo Principal:**
- Components (Classes vs Functions)
- Reactivity (Signals vs Virtual DOM)
- JSX Templates
- Props & Children
- Lifecycle
- State Management
- Dependency Injection (introdução)
- Routing (introdução)

**Exemplos de Código:**
```typescript
// Conceitos básicos juntos
export class UserProfile extends Component {
  // Signal (reatividade)
  user = signal<User | null>(null);
  
  // Lifecycle
  @Mount()
  async loadUser() {
    this.user.set(await fetchUser());
  }
  
  // JSX + Props
  render() {
    return (
      <Card>
        <h2>{this.user.get('name')}</h2>
        <p>{this.user.get('email')}</p>
      </Card>
    );
  }
}
```

**Referências:**
- README.md - Todos os exemplos de features
- README.md - "Guia Completo de Features"

---

# 2️⃣ Core Concepts (Conceitos Fundamentais)

## `/core/reactivity` - Reactivity & Signals
**Status:** 🟢 Completo  
**Prioridade:** 🔥 Alta  
**Descrição:** Como funciona a reatividade granular do MiniJS com Signals e RxJS

**Conteúdo Principal:**
- O que é reatividade granular?
- Signals básicos
- Signal API completa (map, filter, reduce, orElse, get)
- Computed values
- RxJS integration
- Diferença entre Signal e BehaviorSubject
- Subscribe e unsubscribe
- Performance benefits

**Exemplos de Código:**
```typescript
// Signal API
const numbers = signal([1, 2, 3, 4, 5]);

// map
const doubled = numbers.map(n => n * 2);

// filter
const evens = numbers.filter(n => n % 2 === 0);

// reduce
const sum = numbers.reduce((acc, n) => acc + n, 0);

// orElse
const display = numbers.orElse(() => [0]);

// get (deep access)
const user = signal({ profile: { name: 'John' } });
const name = user.get('profile.name');

// Promise-like
const value = await mySignal;
```

**Referências:**
- README.md - "Reatividade Granular"
- README.md - "Signal API Funcional"
- README.md - "Signals como Promises"

---

## `/core/components` - Components & Classes
**Status:** 🟢 Completo  
**Prioridade:** 🔥 Alta  
**Descrição:** Por que classes são melhores que functions no MiniJS

**Conteúdo Principal:**
- Por que classes?
- Problemas com Hooks (React)
- Anatomia de um Component
- Props typing
- Component lifecycle
- Métodos vs Functions
- Estado persistente
- Memory management
- Comparação React Hooks vs MiniJS Classes

**Exemplos de Código:**
```typescript
// Component completo
export class Dashboard extends Component<DashboardProps> {
  // State persiste naturalmente
  data = signal<Data[]>([]);
  filters = signal<Filters>({ region: 'all' });
  
  // Métodos são estáveis (não precisam useCallback)
  handleFilterChange(region: string) {
    this.filters.set({ region });
  }
  
  // Lifecycle explícito
  @Mount()
  setupWebSocket() {
    const ws = new WebSocket('ws://...');
    ws.onmessage = (e) => this.data.set(e.data);
    return () => ws.close();
  }
  
  // render() roda UMA VEZ
  render() {
    return <div>{this.data}</div>;
  }
}
```

**Referências:**
- README.md - "Classes, Não Functions"
- README.md - Comparação com React/Vue

---

## `/core/jsx` - JSX Templates
**Status:** 🟢 Completo  
**Prioridade:** ⚡ Média  
**Descrição:** Como usar JSX no MiniJS

**Conteúdo Principal:**
- JSX syntax
- Expressões no JSX
- Conditional rendering
- List rendering
- Event handlers
- Class vs className
- Inline styles
- Fragments
- Comments no JSX

**Exemplos de Código:**
```typescript
render() {
  return (
    <div className="container">
      {/* Conditional */}
      {this.isLoggedIn.map(logged => 
        logged ? <Dashboard /> : <Login />
      )}
      
      {/* List */}
      <ul>
        {this.items.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
      
      {/* Events */}
      <button onClick={() => this.handleClick()}>
        Click me
      </button>
      
      {/* Styles */}
      <div style={{ color: 'red', fontSize: '16px' }}>
        Styled text
      </div>
    </div>
  );
}
```

**Referências:**
- README.md - Exemplos de render()

---

## `/core/lifecycle` - Lifecycle Management
**Status:** � Não iniciado  
**Prioridade:** 🔥 Alta  
**Descrição:** Sistema de lifecycle do MiniJS

**Conteúdo Principal:**
- Component lifecycle phases
- @Mount decorator
- @Watch decorator
- Cleanup automático
- Lifecycle observables ($.mounted$, $.unmount$)
- Two-phase rendering
- Lifecycle de Guards
- Lifecycle de Resolvers

**Exemplos de Código:**
```typescript
export class LifecycleExample extends Component {
  // Múltiplos @Mount
  @Mount()
  setupWebSocket() {
    const ws = new WebSocket('ws://...');
    ws.onmessage = (e) => this.data.set(e.data);
    return () => ws.close(); // Cleanup
  }
  
  @Mount()
  setupPolling() {
    const interval = setInterval(() => {
      this.refresh();
    }, 5000);
    return () => clearInterval(interval);
  }
  
  // @Watch
  @Watch('counter')
  onCounterChange(value: number) {
    console.log('Counter:', value);
  }
  
  // Manual subscription
  @Mount()
  manualSetup() {
    this.$.unmount$.subscribe(() => {
      console.log('Unmounting!');
    });
  }
}
```

**Referências:**
- README.md - "Lifecycle Hooks"
- README.md - "@Mount" e "@Watch"

---

## `/core/props-children` - Props & Children
**Status:** 🟢 Completo  
**Prioridade:** ⚡ Média
**Descrição:** Como trabalhar com props e children no MiniJS

**Conteúdo Principal:**
- Tipando props
- Props padrão
- Props como observables
- Children rendering
- Slots system (@Child)
- Named slots
- Props validation
- Props reactivity

**Exemplos de Código:**
```typescript
// Props typing
interface CardProps {
  title: string;
  subtitle?: string;
  onClick?: () => void;
}

export class Card extends Component<CardProps> {
  render() {
    return (
      <div onClick={this.props.onClick}>
        <h2>{this.props.title}</h2>
        {this.props.subtitle && (
          <p>{this.props.subtitle}</p>
        )}
        {this.children}
      </div>
    );
  }
}

// Slots
export class Modal extends Component {
  @Child('header') header!: any;
  @Child('footer') footer!: any;
  @Child() content!: any;
  
  render() {
    return (
      <div className="modal">
        <header>{this.header}</header>
        <main>{this.content}</main>
        <footer>{this.footer}</footer>
      </div>
    );
  }
}
```

**Referências:**
- README.md - "Sistema de Slots Poderoso"
- README.md - "@Child decorator"

---

# 3️⃣ Features (Funcionalidades)

## `/features/dependency-injection` - Dependency Injection System
**Status:** 🟢 Completo  
**Prioridade:** 🔥 Alta
**Descrição:** Sistema de DI hierárquico completo do MiniJS

**Conteúdo Principal:**
- O que é DI?
- Por que DI é importante?
- @Injectable decorator
- @Inject decorator
- @UseProviders decorator
- Provider types (useValue, useClass, useFactory, useExisting)
- Hierarquia de Injectors
- DI Tokens
- Abstrações e interfaces
- Testing com DI

**Exemplos de Código:**
```typescript
// Service
@Injectable()
class UserService {
  async getUser(id: string) {
    return fetch(`/api/users/${id}`).then(r => r.json());
  }
}

// Abstract
abstract class PaymentService {
  abstract process(amount: number): Promise<void>;
}

@Injectable()
class StripePayment extends PaymentService {
  async process(amount: number) {
    // Stripe implementation
  }
}

// Provider
@Route('/checkout')
@UseProviders([
  UserService,
  { provide: PaymentService, useClass: StripePayment },
  { provide: 'API_URL', useValue: 'https://api.com' }
])
export class Checkout extends Component {
  @Inject(UserService) user!: UserService;
  @Inject(PaymentService) payment!: PaymentService;
  @Inject('API_URL') apiUrl!: string;
}
```

**Referências:**
- README.md - "Dependency Injection de Verdade"
- README.md - "DI Avançado"

---

## `/features/routing` - Routing System
**Status:** 🟢 Completo  
**Prioridade:** 🔥 Alta
**Descrição:** Sistema de roteamento integrado do MiniJS

**Conteúdo Principal:**
- @Route decorator
- RouteSwitcher component
- RouterService
- Parâmetros de rota
- Query params
- Route params observables
- Programmatic navigation
- Nested routes
- Route guards
- Route resolvers
- Lazy loading

**Exemplos de Código:**
```typescript
// Router principal
export class AppRouter extends Component {
  render() {
    return (
      <RouteSwitcher fallback={() => <NotFound />}>
        {() => [HomePage, ProductsPage, ProductDetailPage]}
      </RouteSwitcher>
    );
  }
}

// Rotas
@Route('/')
export class HomePage extends Component {}

@Route('/products')
export class ProductsPage extends Component {}

@Route('/products/:id')
export class ProductDetail extends Component {
  @Inject(RouterService) router!: RouterService;
  
  @Mount()
  onMount() {
    this.router.params$.subscribe(params => {
      console.log('Product ID:', params.id);
    });
  }
  
  goBack() {
    this.router.push('/products');
  }
}
```

**Referências:**
- README.md - "Routing"
- packages/router/

---

## `/features/guards-resolvers` - Guards & Resolvers
**Status:** 🟢 Completo  
**Prioridade:** 🔥 Alta  
**Descrição:** Sistema de Guards e Resolvers para proteção e pré-carregamento

**Conteúdo Principal:**
- O que são Guards?
- O que são Resolvers?
- Guard interface
- Resolver interface
- @UseGuards decorator
- @UseResolvers decorator
- Múltiplos guards
- Múltiplos resolvers
- Guard com parâmetros
- Fallback rendering
- Loading states
- Error handling

**Exemplos de Código:**
```typescript
// Guard
@Injectable()
class AuthGuard implements Guard {
  @Inject(AuthService) auth!: AuthService;
  
  canActivate() {
    return this.auth.isAuthenticated();
  }
  
  fallback() {
    return <Redirect to="/login" />;
  }
}

// Resolver
@Injectable()
class UserResolver implements Resolver<User> {
  @Inject(UserService) users!: UserService;
  
  async resolve() {
    return this.users.getCurrentUser();
  }
}

// Uso
@Route('/profile')
@UseGuards([AuthGuard])
@UseResolvers([UserResolver])
export class ProfilePage extends Component {
  @Inject(UserResolver) user!: Signal<User>;
  
  render() {
    return <h1>Welcome, {this.user.get('name')}</h1>;
  }
  
  renderLoading() {
    return <Skeleton />;
  }
}
```

**Referências:**
- README.md - "Guards"
- README.md - "Resolvers"

---

## `/features/state-management` - State Management
**Status:** 🔴 Não iniciado  
**Prioridade:** ⚡ Média  
**Descrição:** Gerenciamento de estado no MiniJS

**Conteúdo Principal:**
- Local state com signals
- Shared state com services
- @PersistentState decorator
- UseURLStorage
- UseLocalStorage
- Global state patterns
- State sync entre components
- State transformers
- Undo/Redo patterns

**Exemplos de Código:**
```typescript
// Local state
export class Counter extends Component {
  count = signal(0);
  
  increment() {
    this.count.set(this.count.value + 1);
  }
}

// Persistent state
export class TodoList extends Component {
  @PersistentState(new UseURLStorage())
  todos = signal<Todo[]>([]);
  
  @PersistentState(new UseURLStorage())
  filter = signal<'all' | 'active'>('all');
}

// Shared state via service
@Injectable()
class CartService {
  items = signal<CartItem[]>([]);
  
  addItem(item: CartItem) {
    this.items.set([...this.items.value, item]);
  }
}
```

**Referências:**
- README.md - "PersistentState"
- README.md - Signals

---

## `/features/slots` - Slots & Composition
**Status:** 🔴 Não iniciado  
**Prioridade:** ⚡ Média  
**Descrição:** Sistema de slots para composição de componentes

**Conteúdo Principal:**
- O que são slots?
- @Child decorator
- Named slots
- Default slot
- Slot com múltiplos elementos
- Slot forwarding
- Conditional slots
- Slot validation

**Exemplos de Código:**
```typescript
// Card com slots
export class Card extends Component {
  @Child('header') cardHeader!: any;
  @Child('footer') cardFooter!: any;
  @Child() cardBody!: any;
  
  render() {
    return (
      <div className="card">
        {this.cardHeader && (
          <div className="card-header">{this.cardHeader}</div>
        )}
        <div className="card-body">{this.cardBody}</div>
        {this.cardFooter && (
          <div className="card-footer">{this.cardFooter}</div>
        )}
      </div>
    );
  }
}

// Uso
<Card>
  <h2 slot="header">Title</h2>
  <p>Main content</p>
  <button slot="footer">Save</button>
</Card>
```

**Referências:**
- README.md - "Sistema de Slots Poderoso"

---

## `/features/loading-states` - Loading States (@LoadData)
**Status:** 🔴 Não iniciado  
**Prioridade:** 🔥 Alta  
**Descrição:** Sistema de loading states automático

**Conteúdo Principal:**
- @LoadData decorator
- @LoadFragment decorator
- RenderState enum
- Loader component
- Loading states (loading, success, error, empty)
- Múltiplos loaders
- Custom fragments
- Error handling
- Retry logic

**Exemplos de Código:**
```typescript
export class DataComponent extends Component {
  @Inject(ApiService) api!: ApiService;
  
  @Mount()
  @LoadData({ 
    label: 'Users',
    isEmpty: (data) => data.length === 0
  })
  loadUsers() {
    return this.api.fetchUsers();
  }
  
  @LoadFragment({
    states: [RenderState.LOADING],
    label: 'Users'
  })
  usersLoading() {
    return <Skeleton />;
  }
  
  @LoadFragment({
    states: [RenderState.ERROR],
    label: 'Users',
    transformParams: (error) => [error]
  })
  usersError(error: Error) {
    return <ErrorMessage error={error} />;
  }
  
  render() {
    return (
      <div>
        <h1>Users</h1>
        <Loader fragment="Users" />
      </div>
    );
  }
}
```

**Referências:**
- README.md - "LoadData - Carregamento Assíncrono"

---

## `/features/view-transitions` - View Transitions
**Status:** 🔴 Não iniciado  
**Prioridade:** 💡 Baixa  
**Descrição:** Transições de view no MiniJS

**Conteúdo Principal:**
- ViewTransition component
- Transition presets
- Custom transitions
- Route transitions
- Element transitions
- Performance considerations

**Exemplos de Código:**
```typescript
import { ViewTransition } from '@mini/common';

export class App extends Component {
  render() {
    return (
      <ViewTransition preset="fade">
        <RouteSwitcher>
          {() => [HomePage, AboutPage]}
        </RouteSwitcher>
      </ViewTransition>
    );
  }
}
```

**Referências:**
- packages/common/src/resources/ViewTransition/

---

# 4️⃣ Decorators (Decoradores)

## `/decorators/route` - @Route
**Status:** 🔴 Não iniciado  
**Prioridade:** 🔥 Alta  
**Descrição:** Decorator para definir rotas

**Conteúdo Principal:**
- Sintaxe básica
- Parâmetros de rota
- Route matching
- Prioridade de rotas
- Rotas aninhadas
- Exemplos práticos

**Exemplos de Código:**
```typescript
@Route('/')
export class HomePage extends Component {}

@Route('/products')
export class ProductsPage extends Component {}

@Route('/products/:id')
export class ProductDetail extends Component {}

@Route('/users/:userId/posts/:postId')
export class UserPost extends Component {}
```

**Referências:**
- README.md - Routing
- packages/router/

---

## `/decorators/mount` - @Mount
**Status:** 🔴 Não iniciado  
**Prioridade:** 🔥 Alta  
**Descrição:** Decorator para lifecycle mount

**Conteúdo Principal:**
- Quando usar @Mount
- Múltiplos @Mount
- Cleanup function
- Async mount
- Observable mount
- Error handling
- Order of execution

**Exemplos de Código:**
```typescript
export class Example extends Component {
  @Mount()
  setupWebSocket() {
    const ws = new WebSocket('ws://...');
    ws.onmessage = (e) => this.data.set(e.data);
    return () => ws.close();
  }
  
  @Mount()
  async loadData() {
    const data = await fetchData();
    this.data.set(data);
  }
  
  @Mount()
  setupInterval() {
    return interval(5000)
      .pipe(
        switchMap(() => this.refresh())
      );
  }
}
```

**Referências:**
- README.md - "@Mount"

---

## `/decorators/watch` - @Watch
**Status:** 🔴 Não iniciado  
**Prioridade:** 🔥 Alta  
**Descrição:** Decorator para observar mudanças em signals

**Conteúdo Principal:**
- Sintaxe básica
- skipInitialValue option
- Pipes RxJS
- Dot notation
- Múltiplos @Watch
- Debounce e throttle
- Distinct changes
- Combinando opções

**Exemplos de Código:**
```typescript
export class SearchComponent extends Component {
  search = signal('');
  
  // Básico
  @Watch('search')
  onSearchChange(value: string) {
    console.log('Search:', value);
  }
  
  // Com pipes
  @Watch('search', {
    pipes: [
      debounceTime(500),
      distinctUntilChanged(),
      filter(v => v.length > 2)
    ]
  })
  onSearchDebounced(value: string) {
    this.performSearch(value);
  }
  
  // Dot notation
  @Watch('user.profile.name')
  onNameChange(name: string) {
    console.log('Name:', name);
  }
  
  // Skip initial false
  @Watch('counter', { skipInitialValue: false })
  onCounterInit(value: number) {
    console.log('Initial:', value);
  }
}
```

**Referências:**
- README.md - "Watch Pattern"
- README.md - "@Watch Avançado"

---

## `/decorators/inject` - @Inject
**Status:** 🔴 Não iniciado  
**Prioridade:** 🔥 Alta  
**Descrição:** Decorator para injeção de dependências

**Conteúdo Principal:**
- Sintaxe básica
- Token injection
- Optional dependencies
- Múltiplas injeções
- Injection scope
- Type safety
- Testing

**Exemplos de Código:**
```typescript
export class UserProfile extends Component {
  // Service injection
  @Inject(UserService) users!: UserService;
  
  // Token injection
  @Inject('API_URL') apiUrl!: string;
  
  // Abstract injection
  @Inject(PaymentService) payment!: PaymentService;
  
  // Resolver injection
  @Inject(UserResolver) user!: Signal<User>;
}
```

**Referências:**
- README.md - "Dependency Injection"

---

## `/decorators/use-providers` - @UseProviders
**Status:** 🔴 Não iniciado  
**Prioridade:** 🔥 Alta  
**Descrição:** Decorator para fornecer dependências

**Conteúdo Principal:**
- Provider types
- useValue
- useClass
- useFactory
- useExisting
- Provider hierarchies
- Singleton vs transient
- Testing strategies

**Exemplos de Código:**
```typescript
@Route('/dashboard')
@UseProviders([
  // useClass
  UserService,
  
  // useValue
  { provide: 'API_URL', useValue: 'https://api.com' },
  
  // useClass explícito
  { provide: PaymentService, useClass: StripePayment },
  
  // useFactory
  {
    provide: HttpService,
    useFactory: (apiUrl: string) => new HttpService(apiUrl),
    deps: ['API_URL']
  },
  
  // useExisting
  { provide: 'storage', useExisting: StorageService }
])
export class Dashboard extends Component {}
```

**Referências:**
- README.md - "DI Avançado"

---

## `/decorators/use-guards` - @UseGuards
**Status:** 🔴 Não iniciado  
**Prioridade:** 🔥 Alta  
**Descrição:** Decorator para proteção de rotas

**Conteúdo Principal:**
- Guard interface
- canActivate method
- fallback method
- Múltiplos guards
- Guard com parâmetros
- Async guards
- Guard order
- Common patterns

**Exemplos de Código:**
```typescript
// Guard definition
@Injectable()
class AuthGuard implements Guard {
  @Inject(AuthService) auth!: AuthService;
  
  canActivate() {
    return this.auth.isAuthenticated();
  }
  
  fallback() {
    return <Redirect to="/login" />;
  }
}

// Usage
@Route('/profile')
@UseGuards([AuthGuard])
export class ProfilePage extends Component {}

// Multiple guards
@Route('/admin')
@UseGuards([
  AuthGuard,
  new RoleGuard('admin')
])
export class AdminPage extends Component {}
```

**Referências:**
- README.md - "Guards"

---

## `/decorators/use-resolvers` - @UseResolvers
**Status:** 🔴 Não iniciado  
**Prioridade:** 🔥 Alta  
**Descrição:** Decorator para pré-carregamento de dados

**Conteúdo Principal:**
- Resolver interface
- resolve method
- Múltiplos resolvers
- Async resolvers
- Error handling
- Loading states
- Awaiting resolved data
- Testing resolvers

**Exemplos de Código:**
```typescript
// Resolver definition
@Injectable()
class UserResolver implements Resolver<User> {
  @Inject(UserService) users!: UserService;
  
  async resolve() {
    return this.users.getCurrentUser();
  }
}

// Usage
@Route('/profile')
@UseResolvers([UserResolver])
export class ProfilePage extends Component {
  @Inject(UserResolver) user!: Signal<User>;
  
  render() {
    return <h1>{this.user.get('name')}</h1>;
  }
  
  // Or await
  @Mount()
  async onUserLoaded() {
    const user = await this.user;
    console.log('User:', user.name);
  }
  
  renderLoading() {
    return <Skeleton />;
  }
}
```

**Referências:**
- README.md - "Resolvers"

---

## `/decorators/load-data` - @LoadData & @LoadFragment
**Status:** 🔴 Não iniciado  
**Prioridade:** 🔥 Alta  
**Descrição:** Decorators para gerenciamento de loading states

**Conteúdo Principal:**
- @LoadData decorator
- @LoadFragment decorator
- RenderState enum
- Loader component
- Loading configuration
- isEmpty function
- Custom fragments
- Transform params
- Multiple loaders
- Error recovery

**Exemplos de Código:**
```typescript
export class UsersPage extends Component {
  @Mount()
  @LoadData({ 
    label: 'Users',
    isEmpty: (data) => data.length === 0
  })
  loadUsers() {
    return this.api.fetchUsers();
  }
  
  @LoadFragment({
    states: [RenderState.LOADING],
    label: 'Users'
  })
  usersLoading() {
    return <Skeleton count={5} />;
  }
  
  @LoadFragment({
    states: [RenderState.ERROR],
    label: 'Users',
    transformParams: (error) => [error]
  })
  usersError(error: Error) {
    return <ErrorMessage error={error} onRetry={() => this.loadUsers()} />;
  }
  
  @LoadFragment({
    states: [RenderState.EMPTY],
    label: 'Users'
  })
  usersEmpty() {
    return <EmptyState message="No users found" />;
  }
  
  render() {
    return (
      <div>
        <h1>Users</h1>
        <Loader fragment="Users" />
      </div>
    );
  }
}
```

**Referências:**
- README.md - "LoadData - Carregamento Assíncrono"

---

## `/decorators/persistent-state` - @PersistentState
**Status:** 🔴 Não iniciado  
**Prioridade:** ⚡ Média  
**Descrição:** Decorator para persistência de estado

**Conteúdo Principal:**
- @PersistentState decorator
- Storage adapters
- UseURLStorage
- UseLocalStorage
- UseSessionStorage
- Custom adapters
- Transformers
- URL sync
- State restoration

**Exemplos de Código:**
```typescript
export class TodoList extends Component {
  // URL Storage
  @PersistentState(new UseURLStorage())
  filter = signal<'all' | 'active' | 'completed'>('all');
  
  @PersistentState(
    new UseURLStorage({
      transformer: URLTransformers.propertyAsKeyArrayValuesAsJSON()
    })
  )
  todos = signal<Todo[]>([]);
  
  // LocalStorage
  @PersistentState(new UseLocalStorage('todos'))
  localTodos = signal<Todo[]>([]);
}
```

**Referências:**
- README.md - "PersistentState - Estado Persistente"

---

## `/decorators/child` - @Child
**Status:** 🔴 Não iniciado  
**Prioridade:** ⚡ Média  
**Descrição:** Decorator para sistema de slots

**Conteúdo Principal:**
- @Child decorator
- Named slots
- Default slot
- Slot validation
- Multiple children
- Conditional slots
- Slot forwarding

**Exemplos de Código:**
```typescript
export class Card extends Component {
  @Child('header') header!: any;
  @Child('footer') footer!: any;
  @Child() body!: any; // default slot
  
  render() {
    return (
      <div className="card">
        {this.header && (
          <div className="card-header">{this.header}</div>
        )}
        <div className="card-body">{this.body}</div>
        {this.footer && (
          <div className="card-footer">{this.footer}</div>
        )}
      </div>
    );
  }
}

// Usage
<Card>
  <h2 slot="header">Card Title</h2>
  <p>Card content goes here</p>
  <div slot="footer">
    <button>OK</button>
  </div>
</Card>
```

**Referências:**
- README.md - "Sistema de Slots Poderoso"

---

# 5️⃣ Advanced Topics (Tópicos Avançados)

## `/advanced/two-phase-rendering` - Two-Phase Rendering Architecture
**Status:** 🔴 Não iniciado  
**Prioridade:** ⚡ Média  
**Descrição:** Como funciona a arquitetura de renderização em duas fases

**Conteúdo Principal:**
- O problema com top-down rendering
- Fase 1: BUILD (Top-Down)
- Fase 2: RENDER (Bottom-Up)
- Por que essa arquitetura?
- DI sempre funciona
- Slots funcionam perfeitamente
- Lifecycle correto
- Diagramas explicativos

**Exemplos de Código:**
```typescript
// Fluxo de renderização
App (BUILD)
  ↓
Dashboard (BUILD)
  ↓
Widget (BUILD)
  ↓
Widget (RENDER) ← DI disponível
  ↓
Dashboard (RENDER) ← Children renderizados
  ↓
App (RENDER) ← Árvore completa
```

**Referências:**
- README.md - "Two-Phase Rendering"

---

## `/advanced/plugin-system` - Plugin System Overview
**Status:** 🔴 Não iniciado  
**Prioridade:** ⚡ Média  
**Descrição:** Visão geral do sistema de plugins do MiniJS

**Conteúdo Principal:**
- O que são plugins?
- Lifecycle phases
- Priority system
- Plugin registration
- Built-in plugins
- Plugin hooks
- Metadata system
- Decorator plugins

**Exemplos de Código:**
```typescript
// Plugin básico
export class MyPlugin extends DecoratorPlugin {
  readonly id = "my-plugin";
  readonly priority = 150;
  readonly phase = LifecyclePhase.AfterMount;
  
  execute(component: Component, context: HookContext): void {
    const metadata = this.getMetadata(component, MY_KEY);
    if (!metadata) return;
    
    // Plugin logic here
  }
}

// Registration
lifecycleManager.registerHook(new MyPlugin());
```

**Referências:**
- PLUGIN_GUIDE.md
- packages/core/src/lifecycle/

---

## `/advanced/custom-plugins` - Creating Custom Plugins
**Status:** 🔴 Não iniciado  
**Prioridade:** ⚡ Média  
**Descrição:** Tutorial completo de criação de plugins customizados

**Conteúdo Principal:**
- Anatomia de um plugin
- Passo 1: Metadata key
- Passo 2: Decorator
- Passo 3: Plugin class
- Passo 4: Registration
- Exemplos práticos (Logger, Debounce, Throttle, Memoize)
- Best practices
- Testing plugins
- Troubleshooting

**Exemplos de Código:**
```typescript
// 1. Metadata Key
export const LOGGER_KEY = Symbol('logger:methods');

// 2. Decorator
export function Log(config?: LoggerConfig) {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    if (!target[LOGGER_KEY]) {
      target[LOGGER_KEY] = [];
    }
    
    target[LOGGER_KEY].push({
      methodName: key,
      config: config || { level: 'info' }
    });
    
    return descriptor;
  };
}

// 3. Plugin Class
export class LoggerPlugin extends DecoratorPlugin {
  readonly id = "logger-plugin";
  readonly priority = 200;
  readonly phase = LifecyclePhase.AfterMount;
  
  execute(component: Component): void {
    const loggers = this.getMetadata(component, LOGGER_KEY);
    if (!loggers) return;
    
    for (const logger of loggers) {
      console[logger.config.level](`[${component.constructor.name}] ${logger.methodName}`);
    }
  }
}

// 4. Registration
lifecycleManager.registerHook(new LoggerPlugin());
```

**Referências:**
- PLUGIN_GUIDE.md - Completo

---

## `/advanced/rxjs-integration` - RxJS Integration
**Status:** 🔴 Não iniciado  
**Prioridade:** ⚡ Média  
**Descrição:** Como integrar e usar RxJS no MiniJS

**Conteúdo Principal:**
- Por que RxJS?
- Observables vs Signals
- RxJS operators
- Combining observables
- Error handling com catchError
- Retry logic
- Subscription management
- Memory leaks prevention
- Common patterns

**Exemplos de Código:**
```typescript
import { combineLatest, interval, fromEvent } from 'rxjs';
import { debounceTime, switchMap, catchError, retry } from 'rxjs/operators';

export class RxExample extends Component {
  search = signal('');
  results = signal([]);
  
  @Mount()
  setupSearch() {
    return this.search.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      filter(q => q.length > 2),
      switchMap(q => 
        this.api.search(q).pipe(
          retry(3),
          catchError(err => of([]))
        )
      )
    ).subscribe(results => {
      this.results.set(results);
    });
  }
  
  @Mount()
  setupPolling() {
    return interval(5000).pipe(
      switchMap(() => this.api.fetchData())
    ).subscribe(data => {
      this.data.set(data);
    });
  }
}
```

**Referências:**
- README.md - Exemplos de RxJS
- packages/core/ - Signal implementation

---

## `/advanced/performance` - Performance Optimization
**Status:** 🔴 Não iniciado  
**Prioridade:** ⚡ Média  
**Descrição:** Técnicas de otimização de performance

**Conteúdo Principal:**
- Reatividade granular benefits
- Zero virtual DOM overhead
- Lazy loading
- Code splitting
- Bundle size optimization
- Memory management
- Subscription cleanup
- Memoization
- Benchmarks
- Profiling

**Exemplos de Código:**
```typescript
// Lazy loading
import { Lazy } from '@mini/core';

export class AppRouter extends Component {
  render() {
    return (
      <RouteSwitcher>
        {() => [
          HomePage,
          Lazy(() => import('./features/Dashboard')),
          Lazy(() => import('./features/Products'))
        ]}
      </RouteSwitcher>
    );
  }
}

// Memoization
export class ExpensiveComponent extends Component {
  @Memoize()
  expensiveCalculation(input: number) {
    // Heavy computation
    return result;
  }
}
```

**Referências:**
- README.md - "Performance"
- README.md - Benchmarks

---

## `/advanced/testing` - Testing Strategies
**Status:** 🔴 Não iniciado  
**Prioridade:** ⚡ Média  
**Descrição:** Como testar aplicações MiniJS

**Conteúdo Principal:**
- Unit testing components
- Testing com DI mocks
- Testing services
- Testing guards e resolvers
- Integration testing
- E2E testing
- Testing decorators
- Coverage
- Common patterns

**Exemplos de Código:**
```typescript
// Testing component
describe('UserProfile', () => {
  it('should load user data', async () => {
    const mockUserService = {
      getUser: jest.fn().mockResolvedValue({ name: 'John' })
    };
    
    const component = new UserProfile();
    // Inject mock
    component.injector = new Injector([
      { provide: UserService, useValue: mockUserService }
    ]);
    
    await component.loadUser();
    
    expect(component.user.value).toEqual({ name: 'John' });
  });
});

// Testing guard
describe('AuthGuard', () => {
  it('should allow authenticated users', () => {
    const mockAuth = { isAuthenticated: () => true };
    const guard = new AuthGuard();
    guard.auth = mockAuth;
    
    expect(guard.canActivate()).toBe(true);
  });
});
```

**Referências:**
- packages/core/test/

---

# 6️⃣ Guides (Guias)

## `/guides/project-structure` - Project Structure Guide
**Status:** 🔴 Não iniciado  
**Prioridade:** 🔥 Alta  
**Descrição:** Guia completo de estrutura de projeto

**Conteúdo Principal:**
- Estrutura recomendada
- Repositories/
- Features/
- Route Groups
- Sub-rotas recursivas
- Rotas dinâmicas
- Shared resources
- Index files
- Nomenclatura
- Boas práticas

**Exemplos de Código:**
```
src/
├── repositories/
│   ├── user/
│   │   ├── User.repository.ts
│   │   ├── constants.ts
│   │   ├── types.ts
│   │   └── index.ts
│   └── product/
│
├── features/
│   ├── (landing)/
│   │   ├── home/
│   │   ├── about/
│   │   └── shared/
│   │
│   ├── (auth)/
│   │   ├── login/
│   │   ├── register/
│   │   └── shared/
│   │
│   └── (loggedArea)/
│       ├── dashboard/
│       ├── products/
│       └── shared/
│
└── shared/
    ├── components/
    ├── services/
    └── utils/
```

**Referências:**
- PROJECT_STRUCTURE.md - Completo

---

## `/guides/best-practices` - Best Practices
**Status:** 🔴 Não iniciado  
**Prioridade:** ⚡ Média  
**Descrição:** Melhores práticas para desenvolvimento com MiniJS

**Conteúdo Principal:**
- Component design
- State management
- Service layer
- Error handling
- Performance tips
- Code organization
- Testing
- Documentation
- Common pitfalls

**Exemplos de Código:**
```typescript
// ✅ BOM: Component bem estruturado
export class Dashboard extends Component {
  // Signals claros
  data = signal<Data[]>([]);
  loading = signal(false);
  
  // DI explícita
  @Inject(DataService) dataService!: DataService;
  
  // Lifecycle organizado
  @Mount()
  async loadData() {
    this.loading.set(true);
    try {
      const data = await this.dataService.fetch();
      this.data.set(data);
    } finally {
      this.loading.set(false);
    }
  }
  
  // Render limpo
  render() {
    return (
      <div>
        {this.loading.map(l => l ? <Loader /> : <DataGrid data={this.data} />)}
      </div>
    );
  }
}
```

**Referências:**
- README.md - Boas práticas espalhadas
- PROJECT_STRUCTURE.md - "Boas Práticas"

---

## `/guides/code-organization` - Code Organization
**Status:** 🔴 Não iniciado  
**Prioridade:** ⚡ Média  
**Descrição:** Como organizar código em projetos grandes

**Conteúdo Principal:**
- Monorepo vs multi-repo
- Feature modules
- Shared code
- Package organization
- Import strategies
- Path aliases
- Barrel exports
- Code splitting

**Exemplos de Código:**
```typescript
// tsconfig.json paths
{
  "compilerOptions": {
    "paths": {
      "@/*": ["src/*"],
      "@/repositories/*": ["src/repositories/*"],
      "@/features/*": ["src/features/*"],
      "@/shared/*": ["src/shared/*"]
    }
  }
}

// Clean imports
import { UserRepository } from '@/repositories/user';
import { Button, Modal } from '@/shared';
import { ProductService } from '@/features/(shop)/products';
```

**Referências:**
- PROJECT_STRUCTURE.md - Organização

---

## `/guides/repository-pattern` - Repository Pattern
**Status:** 🔴 Não iniciado  
**Prioridade:** ⚡ Média  
**Descrição:** Como implementar o Repository Pattern no MiniJS

**Conteúdo Principal:**
- O que é Repository Pattern?
- Por que usar?
- Estrutura de um repository
- HTTP calls isolados
- Transformations
- Error handling
- Caching strategies
- Testing repositories

**Exemplos de Código:**
```typescript
// Repository
@Injectable()
export class UserRepository {
  async findAll(): Promise<User[]> {
    const response = await fetch('/api/users');
    const data = await response.json();
    return data.map(transformUserResponse);
  }
  
  async findById(id: string): Promise<User> {
    const response = await fetch(`/api/users/${id}`);
    return transformUserResponse(await response.json());
  }
  
  async create(dto: CreateUserDto): Promise<User> {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dto)
    });
    return transformUserResponse(await response.json());
  }
}

// Service (business logic)
@Injectable()
export class UserService {
  @Inject(UserRepository) repo!: UserRepository;
  
  async getUserWithPermissions(id: string) {
    const user = await this.repo.findById(id);
    return this.addPermissions(user);
  }
  
  private addPermissions(user: User) {
    // Business logic here
    return user;
  }
}
```

**Referências:**
- PROJECT_STRUCTURE.md - "Repositories"

---

## `/guides/migration-react` - Migration from React
**Status:** 🔴 Não iniciado  
**Prioridade:** ⚡ Média  
**Descrição:** Guia de migração do React para MiniJS

**Conteúdo Principal:**
- Principais diferenças
- useState → signal
- useEffect → @Mount / @Watch
- useContext → DI
- useCallback → methods
- useMemo → computed
- Custom hooks → services
- Passo a passo de migração
- Exemplos lado a lado

**Exemplos de Código:**
```typescript
// ❌ REACT
function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchData().then(setData).finally(() => setLoading(false));
  }, []);
  
  const handleFilter = useCallback((region) => {
    setFilters({ region });
  }, []);
  
  return <div>{loading ? 'Loading...' : data.title}</div>;
}

// ✅ MINIJS
export class Dashboard extends Component {
  data = signal(null);
  loading = signal(true);
  
  @Mount()
  async loadData() {
    try {
      const data = await fetchData();
      this.data.set(data);
    } finally {
      this.loading.set(false);
    }
  }
  
  handleFilter(region: string) {
    this.filters.set({ region });
  }
  
  render() {
    return (
      <div>
        {this.loading.map(l => l ? 'Loading...' : this.data.get('title'))}
      </div>
    );
  }
}
```

**Referências:**
- README.md - "Vindo do React"

---

## `/guides/migration-angular` - Migration from Angular
**Status:** 🔴 Não iniciado  
**Prioridade:** ⚡ Média  
**Descrição:** Guia de migração do Angular para MiniJS

**Conteúdo Principal:**
- Semelhanças e diferenças
- Decorators comparados
- DI system
- Routing
- Eliminando NgModule
- Eliminando templates separados
- Services equivalentes
- Guards e resolvers
- Passo a passo

**Exemplos de Código:**
```typescript
// ❌ ANGULAR
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  user: User;
  
  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}
  
  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });
  }
}

// ✅ MINIJS
@Route('/dashboard')
@UseResolvers([UserResolver])
export class Dashboard extends Component {
  @Inject(UserResolver) user!: Signal<User>;
  
  render() {
    return <h1>Welcome, {this.user.get('name')}</h1>;
  }
}
```

**Referências:**
- README.md - "Vindo do Angular"

---

## `/guides/migration-vue` - Migration from Vue
**Status:** 🔴 Não iniciado  
**Prioridade:** 💡 Baixa  
**Descrição:** Guia de migração do Vue para MiniJS

**Conteúdo Principal:**
- Principais diferenças
- ref → signal
- computed → computed
- watch → @Watch
- provide/inject → DI
- setup() → class properties
- Templates → JSX
- Passo a passo

**Exemplos de Código:**
```typescript
// ❌ VUE
<script setup>
const count = ref(0);
const doubled = computed(() => count.value * 2);

watch(count, (value) => {
  console.log('Count:', value);
});

onMounted(() => {
  console.log('Mounted!');
});
</script>

// ✅ MINIJS
export class Counter extends Component {
  count = signal(0);
  
  get doubled() {
    return this.count.map(n => n * 2);
  }
  
  @Watch('count')
  onCountChange(value: number) {
    console.log('Count:', value);
  }
  
  @Mount()
  onMount() {
    console.log('Mounted!');
  }
}
```

**Referências:**
- README.md - "Vindo do Vue"

---

## `/guides/migration-solidjs` - Migration from SolidJS
**Status:** 🔴 Não iniciado  
**Prioridade:** 💡 Baixa  
**Descrição:** Guia de migração do SolidJS para MiniJS

**Conteúdo Principal:**
- Semelhanças (reatividade granular)
- Diferenças (classes vs functions)
- createSignal → signal
- createEffect → @Watch
- onMount → @Mount
- Context → DI
- Quando escolher MiniJS

**Exemplos de Código:**
```typescript
// ❌ SOLIDJS
function Counter() {
  const [count, setCount] = createSignal(0);
  
  createEffect(() => {
    console.log('Count:', count());
  });
  
  onMount(() => {
    console.log('Mounted!');
  });
  
  return <button onClick={() => setCount(count() + 1)}>{count()}</button>;
}

// ✅ MINIJS
export class Counter extends Component {
  count = signal(0);
  
  @Watch('count')
  onCountChange(value: number) {
    console.log('Count:', value);
  }
  
  @Mount()
  onMount() {
    console.log('Mounted!');
  }
  
  render() {
    return (
      <button onClick={() => this.count.set(this.count.value + 1)}>
        {this.count}
      </button>
    );
  }
}
```

**Referências:**
- README.md - "Vindo do SolidJS"

---

# 7️⃣ API Reference (Referência da API)

## `/api/component` - Component API
**Status:** 🔴 Não iniciado  
**Prioridade:** ⚡ Média  
**Descrição:** Referência completa da classe Component

**Conteúdo Principal:**
- Component class
- Properties (props, children, injector, $)
- Methods (render, destroy)
- Optional methods (renderLoading, renderError, renderEmpty)
- Lifecycle observables
- Type parameters

**Exemplos de Código:**
```typescript
abstract class Component<P = {}> {
  // Properties
  props: Readonly<P>;
  children?: any;
  injector?: Injector;
  $: {
    mounted$: Subject<void>;
    unmount$: Subject<void>;
  };
  
  // Methods
  abstract render(): any;
  destroy(): void;
  
  // Optional
  renderLoading?(): any;
  renderError?(error: any): any;
  renderEmpty?(): any;
}
```

**Referências:**
- packages/core/src/base/Component.ts
- README.md - "Component Lifecycle"

---

## `/api/signal` - Signal API
**Status:** 🔴 Não iniciado  
**Prioridade:** 🔥 Alta  
**Descrição:** Referência completa da API de Signals

**Conteúdo Principal:**
- signal() function
- Signal methods (map, filter, reduce, orElse, get)
- set() e value
- Promise-like interface
- Subscribe/unsubscribe
- Type safety
- Performance

**Exemplos de Código:**
```typescript
// Creation
const count = signal(0);
const user = signal<User>();

// Methods
count.map(n => n * 2)
count.filter(n => n > 0)
count.reduce((acc, n) => acc + n, 0)
count.orElse(() => 0)

// Get/Set
count.set(10);
const value = count.value;

// Promise-like
const value = await count;
count.then(v => console.log(v));

// Deep access
user.get('profile.name')
```

**Referências:**
- README.md - "Signal API Funcional"
- README.md - "Signals como Promises"
- packages/core/src/resources/Signal/

---

## `/api/router` - Router API
**Status:** 🔴 Não iniciado  
**Prioridade:** ⚡ Média  
**Descrição:** Referência da API de Routing

**Conteúdo Principal:**
- RouterService
- RouteSwitcher component
- @Route decorator
- Navigation methods (push, replace, back, forward)
- Route observables (params$, query$, url$)
- Route matching

**Exemplos de Código:**
```typescript
// RouterService
@Inject(RouterService) router!: RouterService;

// Navigate
this.router.push('/products');
this.router.push('/products/123');
this.router.replace('/home');
this.router.back();

// Observables
this.router.params$.subscribe(params => {
  console.log(params.id);
});

this.router.query$.subscribe(query => {
  console.log(query.search);
});

// RouteSwitcher
<RouteSwitcher fallback={() => <NotFound />}>
  {() => [HomePage, ProductsPage]}
</RouteSwitcher>
```

**Referências:**
- packages/router/
- README.md - "Routing"

---

## `/api/injector` - DI/Injector API
**Status:** 🔴 Não iniciado  
**Prioridade:** ⚡ Média  
**Descrição:** Referência da API de Dependency Injection

**Conteúdo Principal:**
- Injector class
- @Injectable decorator
- @Inject decorator
- @UseProviders decorator
- Provider types
- Resolution strategy
- Hierarchical injectors

**Exemplos de Código:**
```typescript
// Injectable
@Injectable()
class MyService {}

// Inject
@Inject(MyService) service!: MyService;

// Providers
@UseProviders([
  MyService,
  { provide: 'TOKEN', useValue: 'value' },
  { provide: Abstract, useClass: Concrete },
  { provide: Service, useFactory: () => new Service() }
])

// Manual injection
const injector = new Injector([...providers]);
const service = injector.get(MyService);
```

**Referências:**
- packages/core/src/resources/DenpendencyInjection/
- README.md - "Dependency Injection"

---

## `/api/lifecycle` - Lifecycle Hooks
**Status:** 🔴 Não iniciado  
**Prioridade:** ⚡ Média  
**Descrição:** Referência dos hooks de lifecycle

**Conteúdo Principal:**
- LifecyclePhase enum
- Plugin system
- Hook execution order
- Custom lifecycle hooks
- Priority system

**Exemplos de Código:**
```typescript
enum LifecyclePhase {
  BeforeMount = 'before-mount',
  AfterMount = 'after-mount',
  BeforeUnmount = 'before-unmount',
  AfterUnmount = 'after-unmount'
}

// Component lifecycle observables
component.$.mounted$.subscribe(() => {
  console.log('Mounted!');
});

component.$.unmount$.subscribe(() => {
  console.log('Unmounting!');
});
```

**Referências:**
- packages/core/src/lifecycle/
- README.md - "Lifecycle Management"

---

## `/api/resources` - Built-in Resources
**Status:** 🔴 Não iniciado  
**Prioridade:** 💡 Baixa  
**Descrição:** Referência dos recursos built-in do MiniJS

**Conteúdo Principal:**
- Signal
- Child
- DependencyInjection
- Guard
- Resolver
- Lazy
- LoadData
- Mount
- Provider
- PersistentState
- Watch
- ViewTransition

**Exemplos de Código:**
```typescript
// Lazy loading
import { Lazy } from '@mini/core';

const LazyComponent = Lazy(() => import('./Heavy.component'));

// ViewTransition
import { ViewTransition } from '@mini/common';

<ViewTransition preset="fade">
  <Content />
</ViewTransition>
```

**Referências:**
- packages/core/src/resources/
- packages/common/src/resources/

---

# 8️⃣ Comparison (Comparações)

## `/comparison/why-minijs` - Why MiniJS?
**Status:** 🔴 Não iniciado  
**Prioridade:** 🔥 Alta  
**Descrição:** Por que escolher MiniJS?

**Conteúdo Principal:**
- Reatividade granular vs Virtual DOM
- Classes vs Functions
- DI vs Context API
- Arquitetura sólida
- Performance
- Developer Experience
- Enterprise ready
- Quando usar MiniJS
- Quando NÃO usar MiniJS

**Exemplos de Código:**
```typescript
// MiniJS: Reatividade Granular
export class Counter extends Component {
  count = signal(0);
  
  // render() executa UMA VEZ
  // Apenas {this.count} atualiza no DOM
  render() {
    return <div>{this.count}</div>;
  }
}

// React: Virtual DOM
function Counter() {
  const [count, setCount] = useState(0);
  
  // Função executa a CADA mudança de state
  // Todo o JSX é recriado
  return <div>{count}</div>;
}
```

**Referências:**
- README.md - "Por Que Mini Framework?"
- README.md - Comparação com outros frameworks

---

## `/comparison/vs-react` - MiniJS vs React
**Status:** 🔴 Não iniciado  
**Prioridade:** 🔥 Alta  
**Descrição:** Comparação detalhada entre MiniJS e React

**Conteúdo Principal:**
- Reatividade (Granular vs Virtual DOM)
- Classes vs Functions
- DI vs Context API
- Lifecycle (@Mount vs useEffect)
- State (signal vs useState)
- Performance
- Bundle size
- Learning curve
- Ecosystem
- Casos de uso

**Exemplos de Código:**
```typescript
// REACT - Problemas comuns
function Dashboard() {
  const [data, setData] = useState(null);
  
  // ⚠️ Precisa useCallback
  const handleFilter = useCallback((region) => {
    setFilters({ region });
  }, []); // Stale closure?
  
  // ⚠️ Precisa useEffect
  useEffect(() => {
    fetchData().then(setData);
  }, []);
  
  // Re-renderiza TODO o componente
  return <div>{data?.title}</div>;
}

// MINIJS - Solução
export class Dashboard extends Component {
  data = signal(null);
  
  // Método estável (sem useCallback)
  handleFilter(region: string) {
    this.filters.set({ region });
  }
  
  // Lifecycle explícito
  @Mount()
  async loadData() {
    const data = await fetchData();
    this.data.set(data);
  }
  
  // Renderiza UMA VEZ
  render() {
    return <div>{this.data.get('title')}</div>;
  }
}
```

**Referências:**
- README.md - "Vindo do React"
- README.md - Tabela de comparação

---

## `/comparison/vs-angular` - MiniJS vs Angular
**Status:** 🔴 Não iniciado  
**Prioridade:** ⚡ Média  
**Descrição:** Comparação detalhada entre MiniJS e Angular

**Conteúdo Principal:**
- Semelhanças (Classes, DI, Decorators)
- Diferenças (JSX vs Templates, NgModule)
- Reatividade (Granular vs Change Detection)
- Bundle size
- Boilerplate
- Performance
- Migration path
- Quando escolher cada um

**Exemplos de Código:**
```typescript
// ANGULAR - Muito boilerplate
@NgModule({
  declarations: [DashboardComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [UserService, ApiService]
})
export class AppModule { }

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
  constructor(private userService: UserService) {}
}

// MINIJS - Zero boilerplate
@Route('/dashboard')
@UseProviders([UserService, ApiService])
export class Dashboard extends Component {
  @Inject(UserService) users!: UserService;
  
  render() {
    return <div>Dashboard</div>;
  }
}
```

**Referências:**
- README.md - "Vindo do Angular"
- README.md - Comparação de setup

---

## `/comparison/vs-solidjs` - MiniJS vs SolidJS
**Status:** 🔴 Não iniciado  
**Prioridade:** ⚡ Média  
**Descrição:** Comparação detalhada entre MiniJS e SolidJS

**Conteúdo Principal:**
- Semelhanças (Reatividade granular)
- Diferenças (Classes vs Functions)
- DI (Built-in vs Manual)
- Decorators vs Functions
- Enterprise features
- Architecture
- Quando escolher cada um

**Exemplos de Código:**
```typescript
// SOLIDJS - Sem DI, sem arquitetura
function Dashboard() {
  const [data, setData] = createSignal(null);
  
  // ⚠️ Sem DI - precisa importar direto
  const api = new ApiService();
  
  onMount(() => {
    api.fetchData().then(setData);
  });
  
  return <div>{data()?.title}</div>;
}

// MINIJS - DI + Arquitetura
@Route('/dashboard')
@UseProviders([ApiService])
@UseGuards([AuthGuard])
@UseResolvers([DataResolver])
export class Dashboard extends Component {
  @Inject(ApiService) api!: ApiService;
  @Inject(DataResolver) data!: Signal<Data>;
  
  render() {
    return <div>{this.data.get('title')}</div>;
  }
}
```

**Referências:**
- README.md - "Vindo do SolidJS"
- README.md - "O Que Falta no SolidJS"

---

## `/comparison/vs-vue` - MiniJS vs Vue
**Status:** 🔴 Não iniciado  
**Prioridade:** 💡 Baixa  
**Descrição:** Comparação detalhada entre MiniJS e Vue

**Conteúdo Principal:**
- Reatividade (Granular vs Proxy)
- Classes vs Composition API
- DI (Type-safe vs provide/inject)
- JSX vs Templates
- Reactivity footguns
- Performance
- Type safety
- Quando escolher cada um

**Exemplos de Código:**
```typescript
// VUE - Reactivity footguns
const user = ref({ name: 'John' });
const name = user.value.name; // ⚠️ Não é reativo!
const userCopy = { ...user.value }; // ⚠️ Perde reatividade!

// DI não type-safe
provide('apiService', new ApiService());
const api = inject('apiService'); // ⚠️ any type!

// MINIJS - Sem footguns
const user = signal({ name: 'John' });
const name = user.get('name'); // ✅ Reativo!

// DI type-safe
@Inject(ApiService) api!: ApiService; // ✅ Fully typed!
```

**Referências:**
- README.md - "Vindo do Vue"
- README.md - Problemas do Vue

---

# 📊 Resumo e Próximos Passos

## Status do Projeto

**Total:** 52 páginas de documentação
- 🔴 Não iniciadas: 44
- 🟡 Em progresso: 0
- 🟢 Completas: 8 (Introduction, Quick Start, Installation, First Component, Basic Concepts, Reactivity, Components, JSX)

**Progresso:** 12/52 páginas (23.1%)

## Prioridades

### 🔥 Alta Prioridade (20 páginas)
Páginas essenciais para começar a usar o MiniJS:
- Getting Started (5 páginas)
- Core Concepts principais (3 páginas)
- Features principais (4 páginas)
- Decorators principais (5 páginas)
- Guides essenciais (2 páginas)
- Comparisons principais (1 página)

### ⚡ Média Prioridade (25 páginas)
Páginas importantes para uso avançado:
- Core Concepts complementares
- Features adicionais
- Decorators complementares
- Advanced Topics
- Guides complementares
- API Reference

### 💡 Baixa Prioridade (7 páginas)
Páginas para casos específicos:
- View Transitions
- Migration guides (Vue, SolidJS)
- Resources API

## Roadmap Sugerido

### Fase 1 - Fundamentos (Semanas 1-2)
1. Introduction ✅ (completo)
2. Quick Start ✅ (completo)
3. Installation ✅ (completo)
4. First Component ✅ (completo)
5. Basic Concepts ✅ (completo)

### Fase 2 - Core (Semanas 3-4)
6. Reactivity & Signals ✅ (completo)
7. Components & Classes ✅ (completo)
8. JSX Templates ✅ (completo)
9. Lifecycle Management ⏳ (próximo)
10. Props & Children

### Fase 3 - Features (Semanas 5-6)
11. Guards & Resolvers
12. Loading States
13. State Management
14. Decorators principais (@Route, @Mount, @Watch, etc)

### Fase 4 - Avançado (Semanas 7-8)
15. Advanced Topics
16. API Reference
17. Guides complementares
18. Comparisons

---

**Criado em:** 27/11/2025  
**Última Atualização:** 27/11/2025 18:40  
**Versão:** 1.1.0

---

## 📝 Changelog

### v1.6.0 - 27/11/2025 20:03
- ✅ Página JSX Templates completa
- ✅ Fase 2 - Core Concepts em progresso (3/5 páginas)
- ✅ Conditional rendering, list rendering, event handlers
- ✅ Styling, fragments, children, special attributes
- ✅ JSX best practices with CodeBlock compact layout

### v1.5.0 - 27/11/2025 19:42
- ✅ Página Components & Classes completa
- ✅ Fase 2 - Core Concepts em progresso (2/5 páginas)
- ✅ Problemas com React Hooks documentados
- ✅ Comparação detalhada Classes vs Functions
- ✅ Props typing e memory management

### v1.4.0 - 27/11/2025 19:30
- ✅ Página Reactivity & Signals completa
- ✅ Iniciada Fase 2 - Core Concepts (1/5 páginas)
- ✅ Comparação Granular vs Virtual DOM
- ✅ Signal API completa documentada
- ✅ RxJS integration examples

### v1.3.0 - 27/11/2025 19:10
- ✅ Página Basic Concepts completa
- ✅ Fase 1 do Getting Started 100% concluída (5/5 páginas)
- ✅ Todos os SVGs refatorados para Icon component
- ✅ Links ativos destacados no Sidebar
- ✅ Toda documentação em inglês

### v1.2.0 - 27/11/2025 18:42
- ✅ Página Introduction completa
- ✅ Página Quick Start completa
- ✅ Fase 1 do Getting Started concluída (4/5 páginas)

### v1.1.0 - 27/11/2025 18:40
- ✅ Página Installation completa
- ✅ Página First Component completa
- ✅ Sidebar com accordion e 38 links organizados
- ✅ Icon component centralizado criado
- ✅ Built-in Components section adicionada (Loader, Provider, RouteSwitcher, ViewTransition)
- ✅ Todos decorators mapeados (10 itens em ordem alfabética)

### v1.0.0 - 27/11/2025
- Versão inicial do TODO.md
- Estrutura completa de 52 páginas planejadas

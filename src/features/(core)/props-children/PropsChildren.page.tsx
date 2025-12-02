import { Component } from "@mini/core";
import { Link, Route } from "@mini/router";
import { CodeBlock } from "@/shared/components/CodeBlock";
import { Icon } from "@/shared/components/Icon";

@Route("/core/props-children")
export class PropsChildrenPage extends Component {
  render() {
    const basicPropsExample = `import { Component } from "@mini/core";

// Define props interface
interface ButtonProps {
  label: string;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  onClick?: () => void;
}

export class Button extends Component<ButtonProps> {
  render() {
    const variant = this.props.variant || 'primary';
    const className = \`btn btn-\${variant} \${this.props.disabled ? 'disabled' : ''}\`;
    
    return (
      <button 
        className={className}
        onClick={this.props.onClick}
        disabled={this.props.disabled}
      >
        {this.props.label}
      </button>
    );
  }
}

// Usage
<Button label="Click me" variant="primary" onClick={() => console.log('Clicked!')} />`;

    const childrenExample = `import { Component } from "@mini/core";

interface CardProps {
  title: string;
  subtitle?: string;
}

export class Card extends Component<CardProps> {
  render() {
    return (
      <div className="card">
        <div className="card-header">
          <h2>{this.props.title}</h2>
          {this.props.subtitle && <p>{this.props.subtitle}</p>}
        </div>
        <div className="card-body">
          {/* Render children passed to this component */}
          {this.children}
        </div>
      </div>
    );
  }
}

// Usage
<Card title="User Profile" subtitle="Personal Information">
  <p>Name: John Doe</p>
  <p>Email: john@example.com</p>
  <button>Edit Profile</button>
</Card>`;

    const slotsExample = `import { Component, Child } from "@mini/core";

export class Modal extends Component {
  // Named slots using @Child decorator
  @Child('header') modalHeader!: any;
  @Child('footer') modalFooter!: any;
  @Child() modalBody!: any; // Default slot (no name)
  
  render() {
    return (
      <div className="modal">
        {this.modalHeader && (
          <div className="modal-header">
            {this.modalHeader}
          </div>
        )}
        
        <div className="modal-body">
          {this.modalBody}
        </div>
        
        {this.modalFooter && (
          <div className="modal-footer">
            {this.modalFooter}
          </div>
        )}
      </div>
    );
  }
}

// Usage with named slots
<Modal>
  <h2 slot="header">Confirm Action</h2>
  
  <p>Are you sure you want to delete this item?</p>
  <p>This action cannot be undone.</p>
  
  <div slot="footer">
    <button>Cancel</button>
    <button>Delete</button>
  </div>
</Modal>`;

    const reactivePropsExample = `import { Component, signal, Mount, Watch, Signal } from "@mini/core";

interface UserCardProps {
  userId: Signal<string>;
}

export class UserCard extends Component<UserCardProps> {
  userData = signal<User | null>(null);
  loading = signal(true);
  
  // Watch for userId prop changes
  @Mount()
  @Watch('props.userId')
  async loadUser(userId?: string) {
    const id = userId || this.props.userId;
    
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
      <div className="user-card">
        {this.loading.map(loading => loading && <Spinner />)}
        {this.userData.map(user => user && (
          <div>
            <h3>{user.name}</h3>
            <p>{user.email}</p>
          </div>
        ))}
      </div>
    );
  }
}

// Usage - changes to userId will trigger reload
<UserCard userId={userIdSignal} />`;

    const complexSlotsExample = `import { Component, Child } from "@mini/core";

export class DataTable extends Component {
  @Child('toolbar') toolbar!: any;
  @Child('header') header!: any;
  @Child('row') rowTemplate!: any[];
  @Child('footer') footer!: any;
  @Child() emptyState!: any;
  
  items = signal<any[]>([]);
  
  render() {
    return (
      <div className="data-table">
        {this.toolbar && (
          <div className="toolbar">{this.toolbar}</div>
        )}
        
        <table>
          {this.header && (
            <thead>{this.header}</thead>
          )}
          
          <tbody>
            {this.items.map(item => (
                <tr key={item.id}>
                  {/* Clone row template with item data */}
                  {this.rowTemplate}
                </tr>
              )).orElse(() => (
                this.emptyState && (<tr><td colSpan={99}>{this.emptyState}</td></tr>)
              ))
            }
          </tbody>
          
          {this.footer && (
            <tfoot>{this.footer}</tfoot>
          )}
        </table>
      </div>
    );
  }
}

// Usage
<DataTable items={users}>
  <div slot="toolbar">
    <button>Add User</button>
    <input placeholder="Search..." />
  </div>
  
  <tr slot="header">
    <th>Name</th>
    <th>Email</th>
    <th>Actions</th>
  </tr>
  
  <td slot="row">{item.name}</td>
  <td slot="row">{item.email}</td>
  <td slot="row">
    <button>Edit</button>
  </td>
  
  <div>
    <p>No users found</p>
  </div>
</DataTable>`;

    const propsDefaultsExample = `import { Component } from "@mini/core";

interface AlertProps {
  message: string;
  type?: 'info' | 'success' | 'warning' | 'error';
  dismissible?: boolean;
  icon?: boolean;
  onClose?: () => void;
}

export class Alert extends Component<AlertProps> {
  // Set defaults in render or use methods
  getType() {
    return this.props.type || 'info';
  }
  
  isDismissible() {
    return this.props.dismissible !== false; // Default true
  }
  
  showIcon() {
    return this.props.icon !== false; // Default true
  }
  
  render() {
    const type = this.getType();
    
    return (
      <div className={\`alert alert-\${type}\`}>
        {this.showIcon() && <Icon name={type} />}
        
        <span>{this.props.message}</span>
        
        {this.isDismissible() && (
          <button onClick={this.props.onClose}>×</button>
        )}
      </div>
    );
  }
}

// Usage with defaults
<Alert message="Operation successful!" />
<Alert message="An error occurred" type="error" dismissible={false} />`;

    return (
      <div className="prose prose-invert max-w-none">
        {/* Hero Section */}
        <div className="mb-12">
          <div className="inline-flex items-center space-x-2 mb-6">
            <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
            <span className="text-orange-400 text-sm font-medium">
              Core Concept
            </span>
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 bg-clip-text text-transparent">
            Props & Children
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed">
            Learn how to pass data between components using props and compose
            components using children and slots.
          </p>
        </div>

        {/* Props Basics */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <Icon name="code" className="w-8 h-8 text-orange-400 mr-3" />
            Props Basics
          </h2>
          <p className="text-gray-300 mb-6 text-lg">
            Props (short for "properties") are how you pass data from parent to
            child components. Define a TypeScript interface to type your props
            for full type safety.
          </p>

          <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-6 mb-6">
            <div className="flex items-start">
              <Icon
                name="info"
                className="w-6 h-6 text-orange-400 mr-4 mt-0.5 shrink-0"
              />
              <div>
                <p className="text-orange-300 font-semibold mb-2">
                  Props are read-only
                </p>
                <p className="text-gray-300 text-sm">
                  Props should never be modified by the child component. They
                  are immutable and owned by the parent. To change data, use
                  signals in the parent and pass callbacks via props.
                </p>
              </div>
            </div>
          </div>

          <CodeBlock
            code={basicPropsExample}
            filename="Button.component.tsx"
            language="TypeScript"
          />
        </div>

        {/* Children */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <Icon name="folder" className="w-8 h-8 text-blue-400 mr-3" />
            Children
          </h2>
          <p className="text-gray-300 mb-6">
            The{" "}
            <code className="px-2 py-1 bg-gray-800 rounded text-purple-400">
              children
            </code>{" "}
            property contains any content passed between the opening and closing
            tags of your component. Perfect for wrapper components like cards,
            modals, and layouts.
          </p>
          <CodeBlock
            code={childrenExample}
            filename="Card.component.tsx"
            language="TypeScript"
          />
        </div>

        {/* Slots System */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <Icon name="layers" className="w-8 h-8 text-purple-400 mr-3" />
            Slots System
          </h2>
          <p className="text-gray-300 mb-6">
            MiniJS provides a powerful slots system using the{" "}
            <code className="px-2 py-1 bg-gray-800 rounded text-purple-400">
              @Child
            </code>{" "}
            decorator. Slots allow you to define multiple named content areas in
            your component, giving you fine-grained control over component
            composition.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-5">
              <h3 className="text-white font-semibold mb-3 text-sm flex items-center">
                <Icon
                  name="settings"
                  className="w-4 h-4 mr-2 text-purple-400"
                />
                Named Slots
              </h3>
              <p className="text-gray-400 text-sm mb-2">
                Use <code className="text-xs">@Child('name')</code> to create
                named slots that can be filled with specific content.
              </p>
              <code className="text-xs text-purple-400">
                @Child('header') header!: any;
              </code>
            </div>
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-5">
              <h3 className="text-white font-semibold mb-3 text-sm flex items-center">
                <Icon name="check" className="w-4 h-4 mr-2 text-purple-400" />
                Default Slot
              </h3>
              <p className="text-gray-400 text-sm mb-2">
                Use <code className="text-xs">@Child()</code> without a name to
                capture the default content.
              </p>
              <code className="text-xs text-purple-400">
                @Child() content!: any;
              </code>
            </div>
          </div>

          <CodeBlock
            code={slotsExample}
            filename="Modal.component.tsx"
            language="TypeScript"
          />
        </div>

        {/* Reactive Props */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <Icon name="refresh" className="w-8 h-8 text-green-400 mr-3" />
            Reactive Props
          </h2>
          <p className="text-gray-300 mb-6">
            Props changes can trigger re-renders or side effects. Use{" "}
            <code className="px-2 py-1 bg-gray-800 rounded text-purple-400">
              @Watch('props.propName')
            </code>{" "}
            to react to prop changes and perform actions like data fetching.
          </p>

          <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-6 mb-6">
            <div className="flex items-start">
              <Icon
                name="info"
                className="w-6 h-6 text-orange-400 mr-4 mt-0.5 shrink-0"
              />
              <div>
                <p className="text-orange-300 font-semibold mb-2 mt-0.5">
                  Only Signal props are reactive
                </p>
                <p className="text-gray-300 text-sm">
                  Normal props are not reactive and will not trigger re-renders,
                  so only use <code className="text-xs">@Watch</code> on props
                  that are signals.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-6 mb-6">
            <div className="flex items-start">
              <Icon
                name="lightbulb"
                className="w-6 h-6 text-green-400 mr-4 mt-0.5 shrink-0"
              />
              <div>
                <p className="text-green-300 font-semibold mb-2 mt-0.5  ">
                  Combine @Mount and @Watch
                </p>
                <p className="text-gray-300 text-sm">
                  Use both decorators on the same method to run logic on initial
                  mount AND whenever a prop changes. This is perfect for data
                  loading based on props.
                </p>
              </div>
            </div>
          </div>

          <CodeBlock
            code={reactivePropsExample}
            filename="UserCard.component.tsx"
            language="TypeScript"
          />
        </div>

        {/* Advanced Slots */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <Icon name="terminal" className="w-8 h-8 text-pink-400 mr-3" />
            Advanced Slots Example
          </h2>
          <p className="text-gray-300 mb-6">
            Slots are powerful for creating flexible, reusable components. This
            DataTable example shows how to use multiple slots to create a highly
            customizable table component.
          </p>
          <CodeBlock
            code={complexSlotsExample}
            filename="DataTable.component.tsx"
            language="TypeScript"
          />
        </div>

        {/* Props Defaults */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <Icon name="adjustments" className="w-8 h-8 text-cyan-400 mr-3" />
            Props with Default Values
          </h2>
          <p className="text-gray-300 mb-6">
            Use helper methods or inline defaults to provide fallback values for
            optional props. This makes your components more flexible and easier
            to use.
          </p>
          <CodeBlock
            code={propsDefaultsExample}
            filename="Alert.component.tsx"
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
                    Always Type Your Props
                  </h3>
                  <p className="text-gray-400 text-sm mb-3">
                    Define a TypeScript interface for props to get full type
                    safety and autocomplete. Mark optional props with ?.
                  </p>
                  <CodeBlock
                    code={`// ✅ Good - Typed props
interface ButtonProps {
  label: string;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
}

export class Button extends Component<ButtonProps> {
  render() {
    return <button onClick={this.props.onClick}>{this.props.label}</button>;
  }
}

// ❌ Bad - No type safety
export class Button extends Component {
  render() {
    return <button>{this.props.label}</button>; // No type checking!
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
                    Don't Mutate Props
                  </h3>
                  <p className="text-gray-400 text-sm mb-3">
                    Props are read-only. To change data, use signals in the
                    parent and pass callbacks via props.
                  </p>
                  <CodeBlock
                    code={`// ❌ Bad - Mutating props
export class Counter extends Component<{ count: number }> {
  increment() {
    this.props.count++; // ERROR: Props are read-only!
  }
}

// ✅ Good - Use callbacks
interface CounterProps {
  count: Signal<number>; // or Observable<number>
  onIncrement: () => void;
}

export class Counter extends Component<CounterProps> {
  render() {
    return (
      <div>
        <span>Count: {this.props.count}</span>
        <button onClick={this.props.onIncrement}>+</button>
      </div>
    );
  }
}

// Parent component
export class App extends Component {
  count = signal(0);
  
  render() {
    return (
      <Counter 
        count={this.count} 
        {/* or even count={this.count.asObservable()}, in this case the child component cannot emit changes */}
        onIncrement={() => this.count.set(this.count.value + 1)}
      />
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
                    Use Slots for Composition
                  </h3>
                  <p className="text-gray-400 text-sm mb-3">
                    When you need multiple content areas, use slots instead of
                    multiple props. Slots are more flexible and maintainable.
                  </p>
                  <CodeBlock
                    code={`// ❌ Bad - Too many element props
interface DialogProps {
  title: string;
  body: ElementType;
  actions: ElementType;
  icon: ElementType;
}

// ✅ Good - Use slots
export class Dialog extends Component {
  @Child('title') title!: any;
  @Child('icon') icon!: any;
  @Child() body!: any;
  @Child('actions') actions!: any;
  
  render() {
    return (
      <div className="dialog">
        <div className="dialog-header">
          {this.icon}
          {this.title}
        </div>
        <div className="dialog-body">{this.body}</div>
        <div className="dialog-actions">{this.actions}</div>
      </div>
    );
  }
}

// Usage
<Dialog>
  <Icon name="info" slot="icon" />
  <h2 slot="title">Confirmation</h2>
  <p>Are you sure?</p>
  <div slot="actions">
    <button>Cancel</button>
    <button>OK</button>
  </div>
</Dialog>`}
                    language="tsx"
                    layout="compact"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Props vs Slots Decision Tree */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <Icon name="flow" className="w-8 h-8 text-indigo-400 mr-3" />
            When to Use Props vs Slots
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6">
              <h3 className="text-blue-300 font-semibold mb-4 flex items-center">
                <Icon name="code" className="w-5 h-5 mr-2" />
                Use Props For:
              </h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>Primitive values (strings, numbers, booleans)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>Reactive values (signals, observables)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>Configuration options (variant, size, disabled)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>Callbacks and event handlers</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>Simple data objects</span>
                </li>
              </ul>
            </div>

            <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-6">
              <h3 className="text-purple-300 font-semibold mb-4 flex items-center">
                <Icon name="layers" className="w-5 h-5 mr-2" />
                Use Slots/Children For:
              </h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">•</span>
                  <span>Complex JSX content</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">•</span>
                  <span>Multiple content areas (header, body, footer)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">•</span>
                  <span>Wrapper components (layouts, cards, modals)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">•</span>
                  <span>When parent needs full control of rendering</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-orange-500/10 to-amber-500/10 border border-orange-500/20 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            Continue Learning
          </h2>
          <p className="text-gray-300 mb-6">
            You've completed Core Concepts! Continue with Features to learn
            about advanced MiniJS capabilities.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/features/dependency-injection"
              className="bg-gray-900/50 border border-gray-700 rounded-lg p-4 hover:border-orange-500/50 transition-colors"
            >
              <Icon
                name="adjustments"
                className="w-6 h-6 text-purple-400 mb-3"
              />
              <h3 className="text-white font-semibold mb-2">
                Dependency Injection
              </h3>
              <p className="text-gray-400 text-sm">
                Learn about the powerful type-safe DI system
              </p>
            </Link>
            <Link
              href="/features/routing"
              className="bg-gray-900/50 border border-gray-700 rounded-lg p-4 hover:border-orange-500/50 transition-colors"
            >
              <Icon name="link" className="w-6 h-6 text-blue-400 mb-3" />
              <h3 className="text-white font-semibold mb-2">Routing</h3>
              <p className="text-gray-400 text-sm">
                Build multi-page applications with the router
              </p>
            </Link>
            <Link
              href="/features/guards-resolvers"
              className="bg-gray-900/50 border border-gray-700 rounded-lg p-4 hover:border-orange-500/50 transition-colors"
            >
              <Icon name="shield" className="w-6 h-6 text-green-400 mb-3" />
              <h3 className="text-white font-semibold mb-2">
                Guards & Resolvers
              </h3>
              <p className="text-gray-400 text-sm">
                Protect routes and pre-load data efficiently
              </p>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

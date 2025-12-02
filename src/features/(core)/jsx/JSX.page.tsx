import { Component } from "@mini/core";
import { Link, Route } from "@mini/router";
import { CodeBlock } from "@/shared/components/CodeBlock";
import { Icon } from "@/shared/components/Icon";

@Route("/core/jsx")
export class JSXPage extends Component {
  render() {
    const basicJSXExample = `import { Component } from "@mini/core";

export class WelcomeMessage extends Component {
  render() {
    const name = "World";
    const isLoggedIn = true;
    
    return (
      <div className="welcome">
        <h1>Hello, {name}!</h1>
        {isLoggedIn && <p>Welcome back!</p>}
      </div>
    );
  }
}`;

    const conditionalRenderingExample = `export class UserStatus extends Component {
  isLoggedIn = signal(false);
  user = signal<User | null>(null);
  
  render() {
    return (
      <div>
        {/* Simple conditional with && */}
        {/* This is bad, because it's not reactive, and will never update */}
        {this.isLoggedIn.value && (
          <p>Welcome, {this.user.value?.name}!</p>
        )}
        
        {/* Ternary operator */}
        {this.isLoggedIn.map(logged => 
          logged ? (
            <Dashboard user={this.user} />
          ) : (
            <LoginForm />
          )
        )}
        
        {/* Using map for reactive conditionals */}
        {this.user.map(u => 
          u ? <UserProfile user={u} /> : <GuestMessage />
        )}
      </div>
    );
  }
}`;

    const listRenderingExample = `export class TodoList extends Component {
  todos = signal<Todo[]>([
    { id: 1, title: 'Learn MiniJS', completed: false },
    { id: 2, title: 'Build an app', completed: false },
    { id: 3, title: 'Deploy to prod', completed: false }
  ]);
  
  render() {
    return (
      <div>
        <h2>My Todos</h2>
        
        {/* List rendering with map */}
        <ul>
          {this.todos.map(todo => (
            <li key={todo.id} className={todo.completed ? 'done' : ''}>
              <input 
                type="checkbox" 
                checked={todo.completed}
                onChange={() => this.toggleTodo(todo.id)}
              />
              <span>{todo.title}</span>
            </li>
          )).orElse(() => {
            {/* Empty state */}
            return <p className="empty">No todos yet!</p>
          })}
        </ul>
        
      </div>
    );
  }
  
  toggleTodo(id: number) {
    this.todos.set(prev => 
      prev.map(todo => 
        todo.id === id 
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  }
}`;

    const eventHandlersExample = `export class InteractiveCard extends Component {
  count = signal(0);
  text = signal('');
  isHovered = signal(false);
  
  // Method event handlers
  handleClick() {
    this.count.set(prev => prev + 1);
  }
  
  handleInput(e: Event) {
    const target = e.target as HTMLInputElement;
    this.text.set(target.value);
  }
  
  handleMouseEnter() {
    this.isHovered.set(true);
  }
  
  handleMouseLeave() {
    this.isHovered.set(false);
  }
  
  render() {
    return (
      <div 
        className={this.isHovered.map(h => h ? 'card hovered' : 'card')}
        onMouseEnter={() => this.handleMouseEnter()}
        onMouseLeave={() => this.handleMouseLeave()}
      >
        {/* Click events */}
        <button onClick={() => this.handleClick()}>
          Clicked {this.count} times
        </button>
        
        {/* Input events */}
        <input 
          type="text"
          value={this.text}
          onInput={(e) => this.handleInput(e)}
          placeholder="Type something..."
        />
        
        {/* Form events */}
        <form onSubmit={(e) => {
          e.preventDefault();
          console.log('Submitted:', this.text.value);
        }}>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}`;

    const stylingExample = `export class StyledComponent extends Component {
  theme = signal<'light' | 'dark'>('light');
  fontSize = signal(16);
  
  render() {
    return (
      <div>
        {/* className - static */}
        <div className="container">Static classes</div>
        
        {/* className - dynamic */}
        <div className={this.theme.map(t => \`card card-\${t}\`)}>
          Dynamic theme
        </div>
        
        {/* className - conditional */}
        <button 
          className={this.theme.map(t => 
            t === 'dark' ? 'btn btn-light' : 'btn btn-dark'
          )}
        >
          Toggle Theme
        </button>
        
        {/* Inline styles - static */}
        <div style={{ color: 'red', fontSize: '20px' }}>
          Static styles
        </div>
        
        {/* Inline styles - dynamic */}
        <div style={this.fontSize.map(size => ({
          fontSize: \`\${size}px\`,
          lineHeight: \`\${size * 1.5}px\`
        }))}>
          Dynamic font size
        </div>
        
        {/* Multiple classes */}
        <div className={this.theme.map(t => 
          ['base-class', \`theme-\${t}\`, 'interactive'].join(' ')
        )}>
          Multiple classes
        </div>
      </div>
    );
  }
}`;

    const fragmentsExample = `export class FragmentExample extends Component {
  items = signal(['Apple', 'Banana', 'Orange']);
  
  render() {
    return (
      <div>
        {/* Fragment - no wrapper element */}
        <>
          <h1>Title</h1>
          <p>Description</p>
        </>
        
        {/* Fragment in map */}
        <ul>
          {this.items.map(item => (
            <>
              <li>{item}</li>
              <li className="divider">---</li>
            </>
          ))}
        </ul>
        
        {/* Conditional fragment */}
        {this.items.map(list => 
          list.length > 0 ? (
            <>
              <h2>Items ({list.length})</h2>
              <ul>
                {list.map(item => <li key={item}>{item}</li>)}
              </ul>
            </>
          ) : null
        )}
      </div>
    );
  }
}`;

    const childrenExample = `// Parent component
export class Card extends Component<{ title: string }> {
  render() {
    return (
      <div className="card">
        <h2>{this.props.title}</h2>
        <div className="card-body">
          {this.children}
        </div>
      </div>
    );
  }
}

// Usage with children
export class App extends Component {
  render() {
    return (
      <div>
        <Card title="User Profile">
          <p>Name: John Doe</p>
          <p>Email: john@example.com</p>
          <button>Edit Profile</button>
        </Card>
        
        <Card title="Settings">
          <label>
            <input type="checkbox" />
            Enable notifications
          </label>
        </Card>
      </div>
    );
  }
}`;

    const specialAttributesExample = `export class SpecialAttributes extends Component {
  html = '<strong>Bold text</strong>';
  ref = signal<HTMLDivElement | null>(null);
  
  @Mount()
  setupRef() {
    // Access DOM element via ref
    if (this.ref.value) {
      console.log('Div height:', this.ref.value.offsetHeight);
    }
  }
  
  render() {
    return (
      <div>
        <div innerHTML={this.html} />
        
        {/* ref - access DOM element */}
        <div ref={(el) => this.ref.set(el)}>
          Content to measure
        </div>
        
        {/* key - for list items (must be unique) */}
        <ul>
          {['a', 'b', 'c'].map(item => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        
        {/* data attributes */}
        <button 
          data-id="123"
          data-action="delete"
          onClick={(e) => {
            const btn = e.currentTarget;
            console.log(btn.dataset.id, btn.dataset.action);
          }}
        >
          Delete
        </button>
        
        {/* aria attributes */}
        <button 
          aria-label="Close dialog"
          aria-pressed={false}
        >
          ×
        </button>
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
            <span className="text-blue-400 text-sm font-medium">
              Core Concept
            </span>
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-linear-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
            JSX Templates
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed">
            Learn how to use JSX in MiniJS to create dynamic, reactive user
            interfaces.
          </p>
        </div>

        {/* Basic JSX */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <Icon name="code" className="w-8 h-8 text-blue-400 mr-3" />
            Basic JSX Syntax
          </h2>
          <p className="text-gray-300 mb-6 text-lg">
            JSX is a syntax extension for JavaScript that looks like HTML. In
            MiniJS, JSX is used inside the{" "}
            <code className="px-2 py-1 bg-gray-800 rounded text-purple-400">
              render()
            </code>{" "}
            method to define what the UI should look like.
          </p>

          <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6 mb-6">
            <div className="flex items-start">
              <Icon
                name="info"
                className="w-6 h-6 text-blue-400 mr-4 mt-0.5 shrink-0"
              />
              <div>
                <p className="text-blue-300 font-semibold mb-2">
                  JSX Key Points
                </p>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>
                    • Use{" "}
                    <code className="px-1 bg-gray-900 rounded">className</code>{" "}
                    instead of{" "}
                    <code className="px-1 bg-gray-900 rounded">class</code>
                  </li>
                  <li>
                    • All tags must be closed (self-closing tags need{" "}
                    <code className="px-1 bg-gray-900 rounded">/</code>)
                  </li>
                  <li>
                    • Use curly braces{" "}
                    <code className="px-1 bg-gray-900 rounded">{"{}"}</code> for
                    JavaScript expressions
                  </li>
                  <li>
                    • camelCase for event handlers (
                    <code className="px-1 bg-gray-900 rounded">onClick</code>,{" "}
                    <code className="px-1 bg-gray-900 rounded">onInput</code>)
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <CodeBlock
            code={basicJSXExample}
            filename="BasicJSX.tsx"
            language="tsx"
          />
        </div>

        {/* Conditional Rendering */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <Icon name="adjustments" className="w-8 h-8 text-purple-400 mr-3" />
            Conditional Rendering
          </h2>
          <p className="text-gray-300 mb-6">
            Conditionally show or hide elements based on state. Use JavaScript
            operators like{" "}
            <code className="px-2 py-1 bg-gray-800 rounded text-purple-400">
              &&
            </code>
            ,{" "}
            <code className="px-2 py-1 bg-gray-800 rounded text-purple-400">
              ? :
            </code>
            , or{" "}
            <code className="px-2 py-1 bg-gray-800 rounded text-purple-400">
              map()
            </code>{" "}
            for reactive conditionals.
          </p>
          <CodeBlock
            code={conditionalRenderingExample}
            filename="ConditionalRendering.tsx"
            language="tsx"
          />
        </div>

        {/* List Rendering */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <Icon name="list" className="w-8 h-8 text-green-400 mr-3" />
            List Rendering
          </h2>
          <p className="text-gray-300 mb-6">
            Render lists using{" "}
            <code className="px-2 py-1 bg-gray-800 rounded text-purple-400">
              map()
            </code>
            . Always provide a unique{" "}
            <code className="px-2 py-1 bg-gray-800 rounded text-purple-400">
              key
            </code>{" "}
            prop for each item to help MiniJS efficiently update the DOM.
          </p>
          <CodeBlock
            code={listRenderingExample}
            filename="ListRendering.tsx"
            language="tsx"
          />

          <div className="mt-6 bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-6">
            <div className="flex items-start">
              <Icon
                name="alert"
                className="w-6 h-6 text-yellow-400 mr-4 mt-0.5 shrink-0"
              />
              <div>
                <p className="text-yellow-300 font-semibold mb-2">
                  Always Use Keys
                </p>
                <p className="text-gray-300 text-sm">
                  The{" "}
                  <code className="px-1 bg-gray-900 rounded text-purple-400">
                    key
                  </code>{" "}
                  prop helps MiniJS identify which items have changed, been
                  added, or been removed. Use stable, unique identifiers like
                  IDs—avoid using array indexes as keys.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Event Handlers */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <Icon name="cursor" className="w-8 h-8 text-red-400 mr-3" />
            Event Handlers
          </h2>
          <p className="text-gray-300 mb-6">
            Handle user interactions with event handlers. Use arrow functions or
            method references to handle events. Method references are stable and
            don't recreate on each render.
          </p>
          <CodeBlock
            code={eventHandlersExample}
            filename="EventHandlers.tsx"
            language="tsx"
          />

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-5">
              <h3 className="text-white font-semibold mb-2 text-sm">
                Mouse Events
              </h3>
              <ul className="text-gray-400 text-xs space-y-1">
                <li>
                  • <code>onClick</code>
                </li>
                <li>
                  • <code>onDoubleClick</code>
                </li>
                <li>
                  • <code>onMouseEnter</code>
                </li>
                <li>
                  • <code>onMouseLeave</code>
                </li>
                <li>
                  • <code>onMouseMove</code>
                </li>
              </ul>
            </div>
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-5">
              <h3 className="text-white font-semibold mb-2 text-sm">
                Form Events
              </h3>
              <ul className="text-gray-400 text-xs space-y-1">
                <li>
                  • <code>onInput</code>
                </li>
                <li>
                  • <code>onChange</code>
                </li>
                <li>
                  • <code>onSubmit</code>
                </li>
                <li>
                  • <code>onFocus</code>
                </li>
                <li>
                  • <code>onBlur</code>
                </li>
              </ul>
            </div>
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-5">
              <h3 className="text-white font-semibold mb-2 text-sm">
                Keyboard Events
              </h3>
              <ul className="text-gray-400 text-xs space-y-1">
                <li>
                  • <code>onKeyDown</code>
                </li>
                <li>
                  • <code>onKeyUp</code>
                </li>
                <li>
                  • <code>onKeyPress</code>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Styling */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <Icon name="palette" className="w-8 h-8 text-pink-400 mr-3" />
            Styling Elements
          </h2>
          <p className="text-gray-300 mb-6">
            Style elements using{" "}
            <code className="px-2 py-1 bg-gray-800 rounded text-purple-400">
              className
            </code>{" "}
            for CSS classes or{" "}
            <code className="px-2 py-1 bg-gray-800 rounded text-purple-400">
              style
            </code>{" "}
            for inline styles. Both can be static or dynamic using signals.
          </p>
          <CodeBlock
            code={stylingExample}
            filename="Styling.tsx"
            language="tsx"
          />
        </div>

        {/* Fragments */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <Icon name="component" className="w-8 h-8 text-cyan-400 mr-3" />
            Fragments
          </h2>
          <p className="text-gray-300 mb-6">
            Use fragments{" "}
            <code className="px-2 py-1 bg-gray-800 rounded text-purple-400">
              &lt;&gt;&lt;/&gt;
            </code>{" "}
            to group multiple elements without adding an extra DOM node.
          </p>
          <CodeBlock
            code={fragmentsExample}
            filename="Fragments.tsx"
            language="tsx"
          />
        </div>

        {/* Children */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <Icon name="folder" className="w-8 h-8 text-orange-400 mr-3" />
            Children
          </h2>
          <p className="text-gray-300 mb-6">
            Access child elements passed to your component using{" "}
            <code className="px-2 py-1 bg-gray-800 rounded text-purple-400">
              this.children
            </code>
            . This enables component composition patterns.
          </p>
          <CodeBlock
            code={childrenExample}
            filename="Children.tsx"
            language="tsx"
          />
        </div>

        {/* Special Attributes */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <Icon name="star" className="w-8 h-8 text-yellow-400 mr-3" />
            Special Attributes
          </h2>
          <p className="text-gray-300 mb-6">
            MiniJS supports special attributes like{" "}
            <code className="px-2 py-1 bg-gray-800 rounded text-purple-400">
              ref
            </code>
            ,{" "}
            <code className="px-2 py-1 bg-gray-800 rounded text-purple-400">
              key
            </code>
            , and standard HTML attributes.
          </p>
          <CodeBlock
            code={specialAttributesExample}
            filename="SpecialAttributes.tsx"
            language="tsx"
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
                    Keep JSX Clean and Readable
                  </h3>
                  <p className="text-gray-400 text-sm mb-3">
                    Extract complex logic into methods. Keep your JSX focused on
                    structure.
                  </p>
                  <CodeBlock
                    code={`// ✅ Good - Clean JSX
export class UserList extends Component {
  private renderUser(user: User) {
    return (
      <div className="user">
        <img src={user.avatar} />
        <span>{user.name}</span>
      </div>
    );
  }
  
  render() {
    return (
      <div>
        {this.users.map(u => this.renderUser(u))}
      </div>
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
                    Use Semantic HTML
                  </h3>
                  <p className="text-gray-400 text-sm mb-3">
                    Choose appropriate HTML elements for better accessibility
                    and SEO.
                  </p>
                  <CodeBlock
                    code={`// ✅ Good - Semantic
<article>
  <header>
    <h1>{this.title}</h1>
  </header>
  <section>
    <p>{this.content}</p>
  </section>
  <footer>
    <time>{this.date}</time>
  </footer>
</article>

// ❌ Bad - Div soup
<div>
  <div>
    <div>{this.title}</div>
  </div>
  <div>
    <div>{this.content}</div>
  </div>
</div>`}
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
                    Add Comments for Complex Logic
                  </h3>
                  <p className="text-gray-400 text-sm mb-3">
                    Use JSX comments to explain non-obvious code.
                  </p>
                  <CodeBlock
                    code={`render() {
  return (
    <div>
      {/* Only show to premium users */}
      {this.user.map(u => 
        u.isPremium && <PremiumFeatures />
      )}
      
      {/* Fallback to guest mode if not authenticated */}
      {this.isAuth.map(auth => 
        auth ? <Dashboard /> : <GuestDashboard />
      )}
    </div>
  );
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
        <div className="bg-linear-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            Continue Learning
          </h2>
          <p className="text-gray-300 mb-6">
            Master JSX and explore component composition.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/core/props-children"
              className="bg-gray-900/50 border border-gray-700 rounded-lg p-4 hover:border-blue-500/50 transition-colors"
            >
              <Icon name="folder" className="w-6 h-6 text-orange-400 mb-3" />
              <h3 className="text-white font-semibold mb-2">
                Props & Children
              </h3>
              <p className="text-gray-400 text-sm">
                Learn about props typing and children composition
              </p>
            </Link>
            <Link
              href="/core/lifecycle"
              className="bg-gray-900/50 border border-gray-700 rounded-lg p-4 hover:border-blue-500/50 transition-colors"
            >
              <Icon name="lifecycle" className="w-6 h-6 text-green-400 mb-3" />
              <h3 className="text-white font-semibold mb-2">
                Lifecycle Management
              </h3>
              <p className="text-gray-400 text-sm">
                Understand component lifecycle with @Mount and @Watch
              </p>
            </Link>
            <Link
              href="/features/state-management"
              className="bg-gray-900/50 border border-gray-700 rounded-lg p-4 hover:border-blue-500/50 transition-colors"
            >
              <Icon name="database" className="w-6 h-6 text-purple-400 mb-3" />
              <h3 className="text-white font-semibold mb-2">
                State Management
              </h3>
              <p className="text-gray-400 text-sm">
                Advanced state patterns and techniques
              </p>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

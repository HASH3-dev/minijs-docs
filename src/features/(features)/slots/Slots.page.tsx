import { Component } from "@mini/core";
import { Link, Route } from "@mini/router";
import { CodeBlock } from "@/shared/components/CodeBlock";
import { Icon } from "@/shared/components/Icon";

@Route("/features/slots")
export class SlotsPage extends Component {
  render() {
    const basicSlotExample = `import { Component, Child } from "@mini/core";

// Component with default slot
export class Panel extends Component {
  @Child() content!: any;
  
  render() {
    return (
      <div className="panel">
        <div className="panel-content">
          {this.content}
        </div>
      </div>
    );
  }
}

// Usage
<Panel>
  <p>This content goes into the default slot</p>
</Panel>`;

    const namedSlotsExample = `import { Component, Child } from "@mini/core";

export class Card extends Component {
  @Child("header") cardHeader!: any;
  @Child("footer") cardFooter!: any;
  @Child() cardBody!: any; // default slot
  
  render() {
    return (
      <div className="card">
        {this.cardHeader && (
          <div className="card-header">
            {this.cardHeader}
          </div>
        )}
        
        <div className="card-body">
          {this.cardBody}
        </div>
        
        {this.cardFooter && (
          <div className="card-footer">
            {this.cardFooter}
          </div>
        )}
      </div>
    );
  }
}

// Usage
<Card>
  <div slot="header">
    <h2>Card Title</h2>
    <span className="badge">New</span>
  </div>
  
  <p>This is the main content in the default slot.</p>
  <p>You can have multiple elements here.</p>
  
  <div slot="footer">
    <button>Save</button>
    <button>Cancel</button>
  </div>
</Card>`;

    const conditionalSlotsExample = `export class Dialog extends Component {
  @Child("header") header!: any;
  @Child("actions") actions!: any;
  @Child() content!: any;
  
  render() {
    return (
      <div className="dialog">
        {/* Only render header if provided */}
        {this.header && (
          <div className="dialog-header">
            {this.header}
          </div>
        )}
        
        {/* Content always renders */}
        <div className="dialog-content">
          {this.content}
        </div>
        
        {/* Only render actions if provided */}
        {this.actions && (
          <div className="dialog-actions">
            {this.actions}
          </div>
        )}
      </div>
    );
  }
}

// Usage without header
<Dialog>
  <p>Simple dialog with no header</p>
  
  <div slot="actions">
    <button>OK</button>
  </div>
</Dialog>

// Usage with all slots
<Dialog>
  <h3 slot="header">Confirmation</h3>
  
  <p>Are you sure you want to delete this item?</p>
  
  <div slot="actions">
    <button>Cancel</button>
    <button className="danger">Delete</button>
  </div>
</Dialog>`;

    const defaultContentExample = `export class Alert extends Component {
  @Child("icon") icon!: any;
  @Child() message!: any;
  
  render() {
    return (
      <div className="alert">
        {/* Default icon if none provided */}
        <div className="alert-icon">
          {this.icon || <Icon name="info" />}
        </div>
        
        <div className="alert-message">
          {this.message}
        </div>
      </div>
    );
  }
}

// Without custom icon (uses default)
<Alert>
  <p>This is an informational message</p>
</Alert>

// With custom icon
<Alert>
  <Icon slot="icon" name="warning" color="red" />
  <p>Warning: This action cannot be undone</p>
</Alert>`;

    const multipleSlotsExample = `export class Layout extends Component {
  @Child("sidebar") sidebar!: any;
  @Child("header") header!: any;
  @Child("footer") footer!: any;
  @Child() mainContent!: any;
  
  render() {
    return (
      <div className="layout">
        {this.header && (
          <header className="layout-header">
            {this.header}
          </header>
        )}
        
        <div className="layout-body">
          {this.sidebar && (
            <aside className="layout-sidebar">
              {this.sidebar}
            </aside>
          )}
          
          <main className="layout-main">
            {this.mainContent}
          </main>
        </div>
        
        {this.footer && (
          <footer className="layout-footer">
            {this.footer}
          </footer>
        )}
      </div>
    );
  }
}

// Usage
<Layout>
  <div slot="header">
    <nav>
      <Link href="/">Home</Link> 
      <Link href="/about">About</Link> 
    </nav>
  </div>
  
  <div slot="sidebar">
    <ul>
      <li>Menu Item 1</li>
      <li>Menu Item 2</li>
    </ul>
  </div>
  
  <div>
    <h1>Main Content</h1>
    <p>This goes in the default slot</p>
  </div>
  
  <div slot="footer">
    <p>&copy; 2024 My App</p>
  </div>
</Layout>`;

    const dynamicSlotsExample = `export class TabPanel extends Component<{ activeTab: Signal<string> }> {
  @Child("tab1") tab1Content!: any;
  @Child("tab2") tab2Content!: any;
  @Child("tab3") tab3Content!: any;
  
  render() {
    const { activeTab } = this.props;
    
    return (
      <div className="tab-panel">
        <div className="tab-buttons">
          <button 
            className={activeTab.value === "tab1" ? "active" : ""}
            onClick={() => activeTab.set("tab1")}
          >
            Tab 1
          </button>
          <button 
            className={activeTab.value === "tab2" ? "active" : ""}
            onClick={() => activeTab.set("tab2")}
          >
            Tab 2
          </button>
          <button 
            className={activeTab.value === "tab3" ? "active" : ""}
            onClick={() => activeTab.set("tab3")}
          >
            Tab 3
          </button>
        </div>
        
        <div className="tab-content">
          {activeTab.map(tab => {
            switch(tab) {
              case "tab1": return this.tab1Content;
              case "tab2": return this.tab2Content;
              case "tab3": return this.tab3Content;
              default: return null;
            }
          })}
        </div>
      </div>
    );
  }
}

// Usage
export class MyTabs extends Component {
  activeTab = signal("tab1");
  
  render() {
    return (
      <TabPanel activeTab={this.activeTab}>
        <div slot="tab1">
          <h2>Tab 1 Content</h2>
          <p>First tab content here</p>
        </div>
        
        <div slot="tab2">
          <h2>Tab 2 Content</h2>
          <p>Second tab content here</p>
        </div>
        
        <div slot="tab3">
          <h2>Tab 3 Content</h2>
          <p>Third tab content here</p>
        </div>
      </TabPanel>
    );
  }
}`;

    const signalsSlotsExample = `export class Counter extends Component {
  @Child() label!: any;
  
  count = signal(0);
  
  render() {
    return (
      <div className="counter">
        <div className="counter-label">
          {this.label}
        </div>
        
        <div className="counter-value">
          {this.count}
        </div>
        
        <button onClick={() => this.count.set(this.count.value + 1)}>
          Increment
        </button>
      </div>
    );
  }
}

// Slot content can use parent's signals
export class CounterDemo extends Component {
  render() {
    return (
      <Counter>
        <span>Current Count:</span>
      </Counter>
    );
  }
}`;

    const nestedComponentsExample = `export class Accordion extends Component {
  @Child() items!: any;
  
  expandedIndex = signal<number | null>(null);
  
  render() {
    return (
      <div className="accordion">
        {this.items}
      </div>
    );
  }
}

export class AccordionItem extends Component<{ 
  index: number;
  title: string;
  isExpanded: Signal<boolean>;
}> {
  @Child() content!: any;
  
  render() {
    const { title, isExpanded } = this.props;
    
    return (
      <div className="accordion-item">
        <button 
          className="accordion-header"
          onClick={() => isExpanded.set(!isExpanded.value)}
        >
          {title}
          <Icon name={isExpanded.value ? "chevron-up" : "chevron-down"} />
        </button>
        
        {isExpanded.map(expanded => 
          expanded ? (
            <div className="accordion-content">
              {this.content}
            </div>
          ) : null
        )}
      </div>
    );
  }
}

// Usage
export class FAQ extends Component {
  expanded1 = signal(false);
  expanded2 = signal(false);
  expanded3 = signal(false);
  
  render() {
    return (
      <Accordion>
        <AccordionItem 
          index={0} 
          title="What is MiniJS?"
          isExpanded={this.expanded1}
        >
          <p>MiniJS is a reactive framework...</p>
        </AccordionItem>
        
        <AccordionItem 
          index={1} 
          title="How does it work?"
          isExpanded={this.expanded2}
        >
          <p>It uses signals for reactivity...</p>
        </AccordionItem>
        
        <AccordionItem 
          index={2} 
          title="Why use slots?"
          isExpanded={this.expanded3}
        >
          <p>Slots provide powerful composition...</p>
        </AccordionItem>
      </Accordion>
    );
  }
}`;

    const completeExample = `import { Component, Child, signal } from "@mini/core";

// 1. Modal Component with Slots
export class Modal extends Component<{ 
  isOpen: Signal<boolean>;
  size?: "sm" | "md" | "lg";
}> {
  @Child("header") header!: any;
  @Child("footer") footer!: any;
  @Child() content!: any;
  
  render() {
    const { isOpen, size = "md" } = this.props;
    
    return isOpen.map(open => 
      open ? (
        <div className="modal-backdrop" onClick={() => isOpen.set(false)}>
          <div 
            className={\`modal modal-\${size}\`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with close button */}
            {this.header && (
              <div className="modal-header">
                {this.header}
                <button 
                  className="modal-close"
                  onClick={() => isOpen.set(false)}
                >
                  ×
                </button>
              </div>
            )}
            
            {/* Main content */}
            <div className="modal-content">
              {this.content}
            </div>
            
            {/* Optional footer */}
            {this.footer && (
              <div className="modal-footer">
                {this.footer}
              </div>
            )}
          </div>
        </div>
      ) : null
    );
  }
}

// 2. Form with validation
export class UserForm extends Component {
  name = signal("");
  email = signal("");
  isSubmitting = signal(false);
  
  async handleSubmit() {
    this.isSubmitting.set(true);
    
    try {
      await api.createUser({
        name: this.name.value,
        email: this.email.value
      });
      
      this.props.onSuccess?.();
    } catch (error) {
      console.error("Failed to create user:", error);
    } finally {
      this.isSubmitting.set(false);
    }
  }
  
  render() {
    return (
      <form onSubmit={(e) => {
        e.preventDefault();
        this.handleSubmit();
      }}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            value={this.name}
            onInput={(e) => this.name.set(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={this.email}
            onInput={(e) => this.email.set(e.target.value)}
            required
          />
        </div>
        
        <button 
          type="submit"
          disabled={this.isSubmitting.value}
        >
          {this.isSubmitting.map(loading =>
            loading ? "Creating..." : "Create User"
          )}
        </button>
      </form>
    );
  }
}

// 3. Using Modal with Slots
export class UserManagement extends Component {
  isModalOpen = signal(false);
  users = signal<User[]>([]);
  
  handleUserCreated() {
    this.isModalOpen.set(false);
    this.loadUsers();
  }
  
  async loadUsers() {
    const data = await api.getUsers();
    this.users.set(data);
  }
  
  render() {
    return (
      <div className="user-management">
        <div className="header">
          <h1>User Management</h1>
          <button onClick={() => this.isModalOpen.set(true)}>
            Add User
          </button>
        </div>
        
        <table className="users-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.users.map(user => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <button>Edit</button>
                  <button>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {/* Modal with slots */}
        <Modal isOpen={this.isModalOpen} size="md">
          <h2 slot="header">Create New User</h2>
          
          <UserForm onSuccess={() => this.handleUserCreated()} />
          
          <div slot="footer">
            <button onClick={() => this.isModalOpen.set(false)}>
              Cancel
            </button>
          </div>
        </Modal>
      </div>
    );
  }
}

interface User {
  id: string;
  name: string;
  email: string;
}`;

    return (
      <div className="prose prose-invert max-w-none">
        {/* Hero Section */}
        <div className="mb-12">
          <div className="inline-flex items-center space-x-2 mb-6">
            <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse"></div>
            <span className="text-pink-400 text-sm font-medium">Feature</span>
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
            Slots
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed">
            Build flexible, reusable components with named slots. Slots allow
            parent components to inject content into specific locations within
            child components, enabling powerful composition patterns.
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
                Default Slot
              </h3>
              <p className="text-gray-400 text-sm">
                Unnamed slot that receives all content not assigned to a named
                slot
              </p>
            </div>

            <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6">
              <h3 className="text-white font-semibold mb-2 text-lg">
                Named Slots
              </h3>
              <p className="text-gray-400 text-sm">
                Specific locations where content can be injected using the slot
                attribute
              </p>
            </div>

            <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-6">
              <h3 className="text-white font-semibold mb-2 text-lg">
                @Child Decorator
              </h3>
              <p className="text-gray-400 text-sm">
                Decorator that captures slot content and makes it available in
                the component
              </p>
            </div>

            <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-6">
              <h3 className="text-white font-semibold mb-2 text-lg">
                Composition
              </h3>
              <p className="text-gray-400 text-sm">
                Build complex UIs by composing simple, reusable components with
                slots
              </p>
            </div>
          </div>
        </div>

        {/* Basic Default Slot */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <Icon name="box" className="w-8 h-8 text-cyan-400 mr-3" />
            Default Slot
          </h2>
          <p className="text-gray-300 mb-6">
            The default slot captures all content passed to a component that
            doesn't have a{" "}
            <code className="px-2 py-1 bg-gray-800 rounded text-purple-400">
              slot
            </code>{" "}
            attribute. Use{" "}
            <code className="px-2 py-1 bg-gray-800 rounded text-purple-400">
              @Child()
            </code>{" "}
            without a name to capture the default slot.
          </p>

          <CodeBlock
            code={basicSlotExample}
            filename="Panel.component.tsx"
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
                  Default Slot Behavior
                </p>
                <p className="text-gray-400 text-sm">
                  Any content passed to a component without a slot attribute
                  goes into the default slot. This makes components intuitive to
                  use.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Named Slots */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <Icon name="layers" className="w-8 h-8 text-blue-400 mr-3" />
            Named Slots
          </h2>
          <p className="text-gray-300 mb-6">
            Named slots allow you to define multiple injection points in a
            component. Content with a{" "}
            <code className="px-2 py-1 bg-gray-800 rounded text-purple-400">
              slot="name"
            </code>{" "}
            attribute is injected into the corresponding{" "}
            <code className="px-2 py-1 bg-gray-800 rounded text-purple-400">
              @Child("name")
            </code>{" "}
            property.
          </p>

          <CodeBlock
            code={namedSlotsExample}
            filename="Card.component.tsx"
            language="TypeScript"
          />
        </div>

        {/* Multiple Elements Same Slot */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <Icon name="grid" className="w-8 h-8 text-green-400 mr-3" />
            Multiple Elements in Same Slot
          </h2>
          <p className="text-gray-300 mb-6">
            When multiple elements are passed with the same slot name, they are
            received as an <strong>array</strong> in the component. This is
            useful for building list-based components like menus, tabs, or any
            collection of items.
          </p>

          <CodeBlock
            code={`import { Component, Child } from "@mini/core";

// Component that receives multiple items
export class Menu extends Component {
  @Child("item") items!: any[]; // Received as array!
  
  render() {
    return (
      <nav className="menu">
        <ul>
          {/* items is an array, so we can map over it */}
          {this.items?.map((item, index) => (
            <li key={index} className="menu-item">
              {item}
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}

// Usage: Pass multiple elements with same slot name
<Menu>
  <Link slot="item" href="/">Home</Link> 
  <Link slot="item" href="/about">About</Link> 
  <Link slot="item" href="/contact">Contact</Link> 
  <Link slot="item" href="/blog">Blog</Link> 
</Menu>

// Result: All 4 links are collected into an array
// this.items = [<a>Home</Link> , <a>About</Link> , <a>Contact</Link> , <a>Blog</Link> ]`}
            filename="Menu.component.tsx"
            language="TypeScript"
          />

          <div className="mt-6 bg-green-500/10 border border-green-500/20 rounded-lg p-4">
            <div className="flex items-start">
              <Icon
                name="info"
                className="w-5 h-5 text-green-400 mr-4 mt-0.5 shrink-0"
              />
              <div>
                <p className="text-green-300 font-semibold mb-2">
                  Automatic Array Collection
                </p>
                <p className="text-gray-400 text-sm">
                  MiniJS automatically collects all elements with the same slot
                  name into an array. You don't need to do anything special -
                  just use the same slot name multiple times and access it as an
                  array in your component.
                </p>
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-white mb-4 mt-8">
            Real-World Example: Tab System
          </h3>
          <p className="text-gray-300 mb-4">
            Here's a practical example of a tab component that uses multiple
            elements with the same slot name:
          </p>

          <CodeBlock
            code={`export class Tabs extends Component {
  @Child("tab") tabs!: Tab[];
  
  activeIndex = signal(0);
  
  render() {
    return (
      <div className="tabs">
        {/* Tab headers */}
        <div className="tab-headers">
          {this.tabs?.map((tab, index) => (
            <button
              key={index}
              className={\`tab-header \${this.activeIndex.value === index ? 'active' : ''}\`}
              onClick={() => this.activeIndex.set(index)}
            >
              {tab.props.title}
            </button>
          ))}
        </div>
        
        {/* Tab content */}
        <div className="tab-content">
          {this.activeIndex.map(index => this.tabs?.[index])}
        </div>
      </div>
    );
  }
}

// Tab item component
export class Tab extends Component<{ title: string }> {
  @Child() content!: any;
  
  render() {
    return this.content;
  }
}

// Usage: Multiple Tab components with same slot name
export class MyApp extends Component {
  render() {
    return (
      <Tabs>
        <Tab slot="tab" title="Profile">
          <h2>Profile Settings</h2>
          <p>Edit your profile information here.</p>
        </Tab>
        
        <Tab slot="tab" title="Account">
          <h2>Account Settings</h2>
          <p>Manage your account preferences.</p>
        </Tab>
        
        <Tab slot="tab" title="Privacy">
          <h2>Privacy Settings</h2>
          <p>Control your privacy options.</p>
        </Tab>
      </Tabs>
    );
  }
}`}
            filename="tabs-example.tsx"
            language="TypeScript"
          />

          <h3 className="text-2xl font-semibold text-white mb-4 mt-8">
            Handling Empty Arrays
          </h3>
          <p className="text-gray-300 mb-4">
            Always check if the array exists and has items before rendering:
          </p>

          <CodeBlock
            code={`export class List extends Component {
  @Child("item") items!: any[];
  
  render() {
    return (
      <div className="list">
        {/* Check if array exists and has items */}
        {this.items && this.items.length > 0 ? (
          <ul>
            {this.items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        ) : (
          <p className="empty-message">No items to display</p>
        )}
      </div>
    );
  }
}`}
            filename="list-with-fallback.tsx"
            language="TypeScript"
            layout="compact"
          />
        </div>

        {/* Conditional Slots */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <Icon name="check" className="w-8 h-8 text-green-400 mr-3" />
            Conditional Rendering
          </h2>
          <p className="text-gray-300 mb-6">
            Slots can be conditionally rendered. Check if a slot has content
            before rendering its container.
          </p>

          <CodeBlock
            code={conditionalSlotsExample}
            filename="Dialog.component.tsx"
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
                  Optional Slots
                </p>
                <p className="text-gray-400 text-sm">
                  Always check if a slot has content with{" "}
                  <code className="px-1 py-0.5 bg-gray-800 rounded text-xs">
                    {"{this.slotName && ...}"}
                  </code>{" "}
                  to avoid rendering empty containers.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Default Content */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <Icon name="star" className="w-8 h-8 text-purple-400 mr-3" />
            Default Content
          </h2>
          <p className="text-gray-300 mb-6">
            Provide fallback content when a slot is not filled using the logical
            OR operator.
          </p>

          <CodeBlock
            code={defaultContentExample}
            filename="Alert.component.tsx"
            language="TypeScript"
          />
        </div>

        {/* Multiple Slots */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <Icon name="grid" className="w-8 h-8 text-indigo-400 mr-3" />
            Multiple Named Slots
          </h2>
          <p className="text-gray-300 mb-6">
            Components can have many named slots for complex layouts and
            composition patterns.
          </p>

          <CodeBlock
            code={multipleSlotsExample}
            filename="Layout.component.tsx"
            language="TypeScript"
          />
        </div>

        {/* Nested Components */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <Icon name="layers" className="w-8 h-8 text-pink-400 mr-3" />
            Nested Component Composition
          </h2>
          <p className="text-gray-300 mb-6">
            Build complex UI patterns by nesting components with slots.
          </p>

          <CodeBlock
            code={nestedComponentsExample}
            filename="Accordion.component.tsx"
            language="TypeScript"
          />
        </div>

        {/* Complete Example */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <Icon name="terminal" className="w-8 h-8 text-orange-400 mr-3" />
            Complete Example: Modal with Form
          </h2>
          <p className="text-gray-300 mb-6">
            Here's a complete example showing how to build a modal dialog with
            slots and use it in a real application.
          </p>

          <CodeBlock
            code={completeExample}
            filename="user-management.tsx"
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
                    Always Check for Slot Content
                  </h3>
                  <p className="text-gray-400 text-sm mb-3">
                    Before rendering slot wrappers, check if the slot has
                    content to avoid empty elements.
                  </p>
                  <CodeBlock
                    code={`// ✅ Good - Check before rendering wrapper
{this.header && (
  <div className="header-wrapper">
    {this.header}
  </div>
)}

// ❌ Bad - Renders empty wrapper
<div className="header-wrapper">
  {this.header}
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
                    Use Descriptive Slot Names
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Choose clear, descriptive names for slots that indicate
                    their purpose. Use names like "header", "footer", "actions",
                    "icon" rather than generic names like "slot1", "slot2".
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
                    Provide Default Content When Appropriate
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Use the OR operator to provide sensible defaults for
                    optional slots, improving the component's usability.
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
                    Keep Slot Logic Simple
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Avoid complex logic in slot rendering. Keep the component
                    focused on layout and composition, not business logic.
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
                    Document Slot Requirements
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Clearly document which slots are required vs optional, and
                    what content is expected in each slot.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-linear-to-r from-pink-500/10 to-purple-500/10 border border-pink-500/20 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            Continue Learning
          </h2>
          <p className="text-gray-300 mb-6">
            Now that you understand slots, explore related composition concepts.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/core/props-children"
              className="bg-gray-900/50 border border-gray-700 rounded-lg p-4 hover:border-pink-500/50 transition-colors"
            >
              <Icon name="layers" className="w-6 h-6 text-pink-400 mb-3" />
              <h3 className="text-white font-semibold mb-2">
                Props & Children
              </h3>
              <p className="text-gray-400 text-sm">
                Learn about passing data and children to components
              </p>
            </Link>
            <Link
              href="/core/components"
              className="bg-gray-900/50 border border-gray-700 rounded-lg p-4 hover:border-pink-500/50 transition-colors"
            >
              <Icon name="component" className="w-6 h-6 text-purple-400 mb-3" />
              <h3 className="text-white font-semibold mb-2">Components</h3>
              <p className="text-gray-400 text-sm">
                Deep dive into component architecture and patterns
              </p>
            </Link>
            <Link
              href="/decorators/child"
              className="bg-gray-900/50 border border-gray-700 rounded-lg p-4 hover:border-pink-500/50 transition-colors"
            >
              <Icon name="code" className="w-6 h-6 text-indigo-400 mb-3" />
              <h3 className="text-white font-semibold mb-2">
                @Child Decorator
              </h3>
              <p className="text-gray-400 text-sm">
                Complete API reference for the @Child decorator
              </p>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

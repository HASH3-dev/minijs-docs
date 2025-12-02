import { MenuItem, MenuSection } from "./types";

export const MENU_SECTIONS: MenuSection[] = [
  {
    title: "Getting Started",
    items: [
      {
        title: "Introduction",
        path: "/",
        icon: "lightning",
      },
      {
        title: "Quick Start",
        path: "/getting-started/quick-start",
        icon: "code",
      },
      {
        title: "Installation",
        path: "/getting-started/installation",
        icon: "download",
      },
      {
        title: "First Component",
        path: "/getting-started/first-component",
        icon: "document",
      },
      {
        title: "Basic Concepts",
        path: "/getting-started/basic-concepts",
        icon: "book",
      },
    ],
  },
  {
    title: "Core Concepts",
    items: [
      {
        title: "Reactivity & Signals",
        path: "/core/reactivity",
        icon: "lightning",
      },
      {
        title: "Components",
        path: "/core/components",
        icon: "component",
      },
      {
        title: "JSX Templates",
        path: "/core/jsx",
        icon: "code",
      },
      {
        title: "Lifecycle",
        path: "/core/lifecycle",
        icon: "lifecycle",
      },
      {
        title: "Props & Children",
        path: "/core/props-children",
        icon: "layers",
      },
    ],
  },
  {
    title: "Features",
    items: [
      {
        title: "Dependency Injection",
        path: "/features/dependency-injection",
        icon: "adjustments",
      },
      {
        title: "Routing",
        path: "/features/routing",
        icon: "route",
      },
      {
        title: "Guards & Resolvers",
        path: "/features/guards-resolvers",
        icon: "shield",
      },
      {
        title: "State Management",
        path: "/features/state-management",
        icon: "database",
      },
      {
        title: "Slots",
        path: "/features/slots",
        icon: "slots",
      },
      {
        title: "Loading States",
        path: "/features/loading-states",
        icon: "lifecycle",
      },
    ],
  },
  {
    title: "Built-in Components",
    items: [
      {
        title: "Link",
        path: "/built-in/link",
        icon: "link",
      },
      {
        title: "Loader",
        path: "/built-in/loader",
        icon: "lifecycle",
      },
      {
        title: "Provider",
        path: "/built-in/provider",
        icon: "adjustments",
      },
      {
        title: "RouteSwitcher",
        path: "/built-in/route-switcher",
        icon: "route",
      },
      {
        title: "ViewTransition",
        path: "/built-in/view-transition",
        icon: "exchange",
      },
    ],
  },
  {
    title: "Decorators",
    items: [
      {
        title: "@Child",
        path: "/decorators/child",
        icon: "slots",
      },
      {
        title: "@Inject",
        path: "/decorators/inject",
        icon: "users",
      },
      {
        title: "@LoadData",
        path: "/decorators/load-data",
        icon: "lifecycle",
      },
      {
        title: "@Mount",
        path: "/decorators/mount",
        icon: "star",
      },
      {
        title: "@PersistentState",
        path: "/decorators/persistent-state",
        icon: "database",
      },
      {
        title: "@Route",
        path: "/decorators/route",
        icon: "route",
      },
      {
        title: "@UseGuards",
        path: "/decorators/use-guards",
        icon: "shield",
      },
      {
        title: "@UseProviders",
        path: "/decorators/use-providers",
        icon: "adjustments",
      },
      {
        title: "@UseResolvers",
        path: "/decorators/use-resolvers",
        icon: "database",
      },
      {
        title: "@Watch",
        path: "/decorators/watch",
        icon: "eye",
      },
    ],
  },
  {
    title: "API Reference",
    items: [
      {
        title: "Component API",
        path: "/api/component",
        icon: "document",
      },
      {
        title: "Signal API",
        path: "/api/signal",
        icon: "lightning",
      },
      {
        title: "Router API",
        path: "/api/router",
        icon: "route",
      },
      {
        title: "Injector API",
        path: "/api/injector",
        icon: "adjustments",
      },
    ],
  },
  {
    title: "Guides",
    items: [
      {
        title: "Project Structure",
        path: "/guides/project-structure",
        icon: "folder",
      },
      {
        title: "Best Practices",
        path: "/guides/best-practices",
        icon: "check",
      },
      {
        title: "Migration from React",
        path: "/guides/migration-react",
        icon: "exchange",
      },
      {
        title: "Migration from Angular",
        path: "/guides/migration-angular",
        icon: "exchange",
      },
    ],
  },
];

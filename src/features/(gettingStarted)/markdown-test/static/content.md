# Markdown Component Demo

Welcome to the **Markdown Component** for MiniJS! This component allows you to render markdown content with syntax highlighting.

## Features

- ✨ **GitHub Flavored Markdown** support
- 🎨 **Syntax highlighting** with Prism.js
- 📝 **Easy to use** - just pass markdown content as a prop
- 🎯 **Customizable** styling with Tailwind CSS

## Basic Syntax

### Text Formatting

You can make text **bold**, *italic*, or ***both***. You can also use ~~strikethrough~~ text.

### Lists

#### Unordered Lists

- Item 1
- Item 2
  - Nested item 2.1
  - Nested item 2.2
- Item 3

#### Ordered Lists

1. First item
2. Second item
3. Third item

### Links and Images

Check out [MiniJS Documentation](https://minijs.dev) for more information.

### Code Examples

Inline code: `const greeting = "Hello, World!";`

#### JavaScript Code Block

```javascript
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10)); // Output: 55
```

#### TypeScript Code Block

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

const users: User[] = [
  { id: 1, name: "Alice", email: "alice@example.com" },
  { id: 2, name: "Bob", email: "bob@example.com" }
];

function getUserById(id: number): User | undefined {
  return users.find(user => user.id === id);
}
```

#### Bash Commands

```bash
npm install @mini/core @mini/router
npm run dev
```

### Blockquotes

> This is a blockquote.
> It can span multiple lines.
>
> And can contain **formatted** text.

### Tables

| Feature | MiniJS | React |
|---------|--------|-------|
| Size | Small | Large |
| Learning Curve | Easy | Moderate |
| Performance | Fast | Fast |

### Horizontal Rule

---

## How to Use

Simply import the \`Markdown\` component and pass your markdown content:

```tsx
import { Markdown } from "./components/Markdown";

export class MyPage extends Component {
  render() {
    const content = "# Hello\\n\\nThis is **markdown**!";
    return <Markdown content={content} />;
  }
}
```

### Custom Styling

You can also pass a custom className:

```tsx
<Markdown 
  content={myMarkdown} 
  className="prose prose-lg prose-purple max-w-4xl" 
/>
```

---

**That's it!** You now have a fully functional Markdown component in your MiniJS application. 🎉
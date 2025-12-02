import {
  Application,
  Component,
  Mount,
  RenderResult,
  signal,
  Watch,
} from "@mini/core";
import { marked } from "marked";
import Prism from "prismjs";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-css";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-json";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-typescript";
import "prismjs/themes/prism-okaidia.css";
import { CodeBlock } from "../CodeBlock";
import { MarkdownProps } from "./types";

export class Markdown extends Component<MarkdownProps> {
  private htmlContent = signal<string>();
  private renders = new Map<string, RenderResult>();

  @Mount()
  setupMarked() {
    // Configure marked for GitHub Flavored Markdown
    marked.setOptions({
      breaks: true,
      gfm: true,
    });

    marked.use({
      renderer: {
        code: ({ text, lang }) => {
          const render = Application.render(CodeBlock, {
            code: text,
            language: lang,
          });

          const div = document.createElement("div");
          div.id = this.randomUUID();

          this.renders.set(div.id, render);

          return div.outerHTML;
        },
        heading: ({ text, depth }) => {
          const slug = text
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^\w-]/g, "");

          return `<Link href="#${slug}"><h${depth} id="${slug}" class="anchor">${text}</h${depth}></Link> `;
        },
      },
    });
    this.parseMarkdown();
  }

  async parseMarkdown() {
    const html = marked.parse(this.props.content || "") as string;
    this.htmlContent.set(html);

    this.renders.forEach((render, id) => {
      const element = document.getElementById(id);
      if (element) {
        render.appendTo(element);
      }
    });
  }

  @Watch("htmlContent")
  watchHtmlContent() {
    Prism.highlightAll();
  }

  render() {
    const defaultClasses = [
      "prose",
      "prose-invert",
      "max-w-none",
      "prose-headings:font-bold",
      "prose-h1:text-4xl",
      "prose-h1:mb-4",
      "prose-h1:text-white",
      "prose-h2:text-3xl",
      "prose-h2:mt-8",
      "prose-h2:mb-4",
      "prose-h2:text-white",
      "prose-h3:text-2xl",
      "prose-h3:mt-6",
      "prose-h3:mb-3",
      "prose-h3:text-gray-200",
      "prose-p:text-gray-300",
      "prose-p:leading-relaxed",
      "prose-a:text-purple-400",
      "prose-a:no-underline",
      "prose-a:hover:text-purple-300",
      "prose-code:text-purple-400",
      "prose-code:bg-gray-800/50",
      "prose-code:px-0",
      "prose-code:py-0.5",
      "prose-code:rounded",
      "prose-code:before:content-none",
      "prose-code:after:content-none",
      "prose-pre:bg-[#282a36]",
      "prose-pre:border",
      "prose-pre:border-gray-700",
      "prose-pre:rounded-lg",
      "prose-pre:shadow-lg",
      "prose-strong:text-white",
      "prose-strong:font-semibold",
      "prose-ul:text-gray-300",
      "prose-ol:text-gray-300",
      "prose-li:text-gray-300",
      "prose-blockquote:border-l-purple-500",
      "prose-blockquote:text-gray-400",
      "prose-blockquote:italic",
      "prose-table:text-gray-300",
      "prose-thead:border-gray-700",
      "prose-tr:border-gray-700",
      "prose-th:text-white",
      "prose-td:text-gray-300",
      "prose-hr:border-gray-700",
    ];

    const className = this.props.className || defaultClasses.join(" ");

    return <div className={className} innerHTML={this.htmlContent}></div>;
  }

  private randomUUID() {
    return window.crypto.randomUUID();
  }
}

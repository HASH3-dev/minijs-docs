import { Markdown } from "@/shared/components/Markdown";
import { Component, Inject } from "@mini/core";
import { Route, RouterService } from "@mini/router";

@Route("/getting-started/markdown-test/:filename")
export class MarkdownTestPage extends Component {
  @Inject(RouterService) router!: RouterService;

  async render() {
    const markdownContent = await import(
      `./static/${this.router.params.filename}.md?raw`
    ).then((res) => res.default);

    return (
      <div className="prose prose-invert max-w-none">
        <div className="mb-12">
          <div className="inline-flex items-center space-x-2 mb-6">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <span className="text-blue-400 text-sm font-medium">
              Component Demo
            </span>
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-linear-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
            Markdown Component Test
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed mb-8">
            This page demonstrates the Markdown component rendering
            capabilities.
          </p>
        </div>

        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-8">
          <Markdown content={markdownContent} />
        </div>
      </div>
    );
  }
}

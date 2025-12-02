import { Component } from "@mini/core";

export class HeroSection extends Component {
  render() {
    return (
      <div className="mb-12">
        <div className="inline-flex items-center px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full mb-6">
          <span className="text-purple-400 text-sm font-medium">v1.0.0</span>
        </div>
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
          Introduction to MiniJS
        </h1>
        <p className="text-xl text-gray-400 leading-relaxed">
          A modern, lightweight framework for building reactive web applications
          with decorators and dependency injection.
        </p>
      </div>
    );
  }
}

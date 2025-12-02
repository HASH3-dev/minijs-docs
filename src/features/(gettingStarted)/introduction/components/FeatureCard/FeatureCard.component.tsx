import { Component } from "@mini/core";
import { FeatureCardProps } from "./types";

export class FeatureCard extends Component<FeatureCardProps> {
  render() {
    const colorClass =
      this.props.color === "purple" ? "purple-500" : "pink-500";
    return (
      <div
        class={`bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:border-${colorClass}/50 transition-colors`}
      >
        <div
          class={`w-12 h-12 bg-${colorClass}/10 rounded-lg flex items-center justify-center mb-4`}
        >
          <div innerHTML={this.props.icon}></div>
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">
          {this.props.title}
        </h3>
        <p className="text-gray-400">{this.props.description}</p>
      </div>
    );
  }
}

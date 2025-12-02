import Prism from "prismjs";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-json";
import "prismjs/components/prism-typescript";
import "prismjs/themes/prism-okaidia.css";

import { Component, Mount, signal, Watch } from "@mini/core";
import { combineLatest } from "rxjs";
import { filter, map } from "rxjs/operators";
import { CopyButton } from "../CopyButton";
import { CodeBlockProps } from "./types";

export class CodeBlock extends Component<CodeBlockProps> {
  private selectedIndex = signal(0);
  private currentCode = signal<string>();
  private currentLanguage = signal<string>();

  @Mount()
  @Watch("selectedIndex")
  setCurrentCode(selectedIndex: number = 0) {
    if (this.props.options && this.props.options.length > 0) {
      const option = this.props.options![selectedIndex];
      this.currentCode.set(option.code || "");
      this.currentLanguage.set(option.language || "Typescript");
    } else {
      this.currentCode.set(this.props.code || "");
      this.currentLanguage.set(this.props.language || "Typescript");
    }
  }

  selectOption(index: number) {
    this.selectedIndex.set(index);
  }

  render() {
    const hasOptions = this.props.options && this.props.options.length > 0;
    const { filename, layout = "classic" } = this.props;

    return (
      <div className="bg-[#282a36] border border-gray-700 rounded-xl overflow-hidden">
        {layout === "classic" && (
          <div className="bg-[#1e1f29] px-6 py-3 border-b border-gray-700 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-400 font-mono">
                {filename}
              </span>
              {hasOptions && (
                <div className="flex items-center space-x-2 bg-[#282a36] rounded-lg p-1">
                  {this.props.options!.map((option, index) => (
                    <button
                      onClick={() => this.selectOption(index)}
                      class={this.selectedIndex.map((value) =>
                        value === index
                          ? "px-3 py-1 text-xs font-medium rounded transition-colors bg-purple-500 text-white"
                          : "px-3 py-1 text-xs font-medium rounded transition-colors text-gray-400 hover:text-white"
                      )}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xs text-purple-400">
                {this.currentLanguage}
              </span>
              {this.currentCode.map((code) => (
                <CopyButton text={code} />
              ))}
            </div>
          </div>
        )}
        <pre className="p-6 overflow-x-auto bg-[#282a36]! m-0!">
          <code
            className={this.currentLanguage.map(
              (value) => `language-${value} text-sm!`
            )}
            innerHTML={combineLatest([
              this.currentCode,
              this.currentLanguage,
            ]).pipe(
              filter(([code, language]) => !!code && !!language),
              map(([code, language]) => [code, language.toLowerCase()]),
              map(([code, language]) =>
                Prism.highlight(code, Prism.languages[language], language)
              )
            )}
          ></code>
        </pre>
      </div>
    );
  }
}

import { Component, signal } from "@mini/core";
import { Clipboard, ClipboardCheck, createElement } from "lucide";
import { CopyButtonProps } from "./types";

export class CopyButton extends Component<CopyButtonProps> {
  private copied = signal(false);

  copyToClipboard() {
    navigator.clipboard.writeText(this.props.text).then(() => {
      this.copied.set(true);
      setTimeout(() => {
        this.copied.set(false);
      }, 2000);
    });
  }

  render() {
    return (
      <button
        onClick={() => this.copyToClipboard()}
        className="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded transition-colors"
        title="Copy code"
      >
        {this.copied.map((copied) =>
          copied
            ? createElement(ClipboardCheck, {
                class: "size-[18px] stroke-lime-400",
                "stroke-width": 1,
              })
            : createElement(Clipboard, {
                class: "size-[18px] stroke-white",
                "stroke-width": 1,
              })
        )}
      </button>
    );
  }
}

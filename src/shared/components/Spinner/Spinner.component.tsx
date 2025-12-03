import { Component } from "@mini/core";

export class Spinner extends Component {
  render() {
    return (
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 border-4 border-gray-600 border-t-transparent border-solid rounded-full animate-spin"></div>
    );
  }
}

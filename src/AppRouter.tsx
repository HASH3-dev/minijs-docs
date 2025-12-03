import { Component } from "@mini/core";
import { RouteSwitcher } from "@mini/router";
import { Layout } from "./features/Layout.page";

export class AppRouter extends Component {
  render() {
    return <RouteSwitcher>{() => [Layout]}</RouteSwitcher>;
  }
}

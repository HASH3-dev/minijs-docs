import { Component, UseProviders } from "@mini/core";
import { RouteSwitcher } from "@mini/router";
import { Layout } from "./features/Layout.page";

@UseProviders([{ provide: Symbol.for("teste"), useValue: "123" }])
export class AppRouter extends Component {
  render() {
    return <RouteSwitcher>{() => [Layout]}</RouteSwitcher>;
  }
}

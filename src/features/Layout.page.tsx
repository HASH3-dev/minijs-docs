import { Component, Inject, Lazy, Mount } from "@mini/core";
import { Route, RouterService, RouteSwitcher } from "@mini/router";
import { Header } from "../shared/components/Header";
import { Sidebar } from "../shared/components/Sidebar";

@Route("/")
export class Layout extends Component {
  @Inject(RouterService) router!: RouterService;
  @Inject(Symbol.for("teste")) ass!: string;

  @Mount()
  onMount() {
    console.log("Layout mounted", this);
  }

  render() {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-slate-900 text-gray-100">
        <Header />
        <div className="flex pt-20">
          <Sidebar />
          <main className="px-8 py-8 mx-72 w-full">
            <div className="container mx-auto max-w-5xl">
              <RouteSwitcher
                fallback={() => (
                  <div className="text-center">404 Not Found</div>
                )}
              >
                {() => [
                  Lazy("./(gettingStarted)/introduction#IntroductionPage"),
                  Lazy("./(gettingStarted)/quick-start#QuickStartPage"),
                  Lazy("./(gettingStarted)/installation#InstallationPage"),
                  Lazy("./(gettingStarted)/first-component#FirstComponentPage"),
                  Lazy("./(gettingStarted)/basic-concepts#BasicConceptsPage"),
                  Lazy("./(core)/reactivity#ReactivityPage"),
                  Lazy("./(core)/components#ComponentsPage"),
                  Lazy("./(core)/jsx#JSXPage"),
                  Lazy("./(core)/lifecycle#LifecyclePage"),
                  Lazy("./(core)/props-children#PropsChildrenPage"),
                  Lazy(
                    "./(features)/dependency-injection#DependencyInjectionPage"
                  ),
                  Lazy("./(features)/routing#RoutingPage"),
                  Lazy("./(features)/guards-resolvers#GuardsResolversPage"),
                  Lazy("./(features)/state-management#StateManagementPage"),
                  Lazy("./(features)/slots#SlotsPage"),
                  Lazy("./(features)/loading-states#LoadingStatesPage"),
                  Lazy("./(gettingStarted)/markdown-test#MarkdownTestPage"),
                ]}
              </RouteSwitcher>
            </div>
          </main>
        </div>
      </div>
    );
  }
}

import { Header } from "@/shared/components/Header";
import { Sidebar } from "@/shared/components/Sidebar";
import { Spinner } from "@/shared/components/Spinner";
import { Component, Inject, Lazy } from "@mini/core";
import { Route, RouterService, RouteSwitcher } from "@mini/router";

@Route("/")
export class Layout extends Component {
  @Inject(RouterService) router!: RouterService;

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
                  Lazy("./(gettingStarted)/introduction#IntroductionPage", {
                    loading: () => <Spinner />,
                  }),
                  Lazy("./(gettingStarted)/quick-start#QuickStartPage", {
                    loading: () => <Spinner />,
                  }),
                  Lazy("./(gettingStarted)/installation#InstallationPage", {
                    loading: () => <Spinner />,
                  }),
                  Lazy(
                    "./(gettingStarted)/first-component#FirstComponentPage",
                    {
                      loading: () => <Spinner />,
                    }
                  ),
                  Lazy("./(gettingStarted)/basic-concepts#BasicConceptsPage", {
                    loading: () => <Spinner />,
                  }),
                  Lazy("./(core)/reactivity#ReactivityPage", {
                    loading: () => <Spinner />,
                  }),
                  Lazy("./(core)/components#ComponentsPage", {
                    loading: () => <Spinner />,
                  }),
                  Lazy("./(core)/jsx#JSXPage", {
                    loading: () => <Spinner />,
                  }),
                  Lazy("./(core)/lifecycle#LifecyclePage", {
                    loading: () => <Spinner />,
                  }),
                  Lazy("./(core)/props-children#PropsChildrenPage", {
                    loading: () => <Spinner />,
                  }),
                  Lazy(
                    "./(features)/dependency-injection#DependencyInjectionPage",
                    {
                      loading: () => <Spinner />,
                    }
                  ),
                  Lazy("./(features)/routing#RoutingPage", {
                    loading: () => <Spinner />,
                  }),
                  Lazy("./(features)/guards-resolvers#GuardsResolversPage", {
                    loading: () => <Spinner />,
                  }),
                  Lazy("./(features)/state-management#StateManagementPage", {
                    loading: () => <Spinner />,
                  }),
                  Lazy("./(features)/slots#SlotsPage", {
                    loading: () => <Spinner />,
                  }),
                  Lazy("./(features)/loading-states#LoadingStatesPage", {
                    loading: () => <Spinner />,
                  }),
                  Lazy("./(gettingStarted)/markdown-test#MarkdownTestPage", {
                    loading: () => <Spinner />,
                  }),
                ]}
              </RouteSwitcher>
            </div>
          </main>
        </div>
      </div>
    );
  }
}

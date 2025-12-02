import { Component, Inject, Mount, Signal, signal } from "@mini/core";
import { Link, RouterService } from "@mini/router";
import { Icon } from "@/shared/components/Icon";
import { MENU_SECTIONS } from "./constants";

export class Sidebar extends Component {
  @Inject(RouterService) router!: RouterService;

  // Signal para controlar quais seções estão abertas
  // Inicialmente apenas "Getting Started" (índice 0) está aberto
  openSections = signal<Set<number>>(new Set([0]));

  // Signal para armazenar a URL atual
  currentPath = signal<string>("");

  @Mount()
  onMount() {
    // Subscrever às mudanças de rota
    return this.router.pathname$.subscribe((url) => {
      this.currentPath.set(url);
    });
  }

  isActive(path: string): Signal<boolean> {
    return this.currentPath.map((url) => url === path);
  }

  toggleSection(index: number) {
    const current = this.openSections.value;
    const newSet = new Set(current);

    if (newSet.has(index)) {
      newSet.delete(index);
    } else {
      newSet.add(index);
    }

    this.openSections.set(newSet);
  }

  isSectionOpen(index: number): boolean {
    return this.openSections.value.has(index);
  }

  render() {
    return (
      <aside className="fixed left-0 top-20 bottom-0 w-72 bg-gray-900/50 backdrop-blur-sm border-r border-gray-800 overflow-y-auto">
        <nav className="p-6">
          {MENU_SECTIONS.map((section, sectionIndex) => (
            <div className="mb-2" key={section.title}>
              {/* Section Header - Clickable */}
              <button
                onClick={() => this.toggleSection(sectionIndex)}
                className="w-full flex items-center justify-between text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-2 py-2 rounded-lg hover:text-gray-300 hover:bg-gray-800/30 transition-all duration-200 cursor-pointer"
              >
                <span>{section.title}</span>
                <Icon
                  name="arrow-down"
                  className={`w-4 h-4 transition-transform duration-200 ${
                    this.isSectionOpen(sectionIndex) ? "rotate-180" : ""
                  }`}
                  size={16}
                />
              </button>

              {/* Section Items - Collapsible */}
              {this.openSections.map((openSet) => {
                const isOpen = openSet === sectionIndex;
                return (
                  <div
                    key={`content-${sectionIndex}`}
                    className={`overflow-hidden transition-all duration-200 ${
                      isOpen
                        ? "max-h-[1000px] opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <ul className="space-y-1">
                      {section.items.map((item) => {
                        const isActive = this.isActive(item.path);
                        return (
                          <li key={item.path}>
                            <Link
                              href={item.path}
                              className={isActive.map(
                                (active) =>
                                  `block px-4 py-2 text-sm rounded-lg transition-all duration-200 ${
                                    active
                                      ? "bg-linear-to-r from-purple-500/20 to-pink-500/20 border-l-2 border-purple-500 text-white font-semibold"
                                      : "text-gray-300 hover:text-white hover:bg-gray-800/50"
                                  }`
                              )}
                            >
                              <span className="flex items-center">
                                <Icon
                                  name={item.icon}
                                  className={isActive.map(
                                    (active) =>
                                      `w-4 h-4 mr-3 ${
                                        active ? "text-purple-400" : ""
                                      }`
                                  )}
                                  size={16}
                                />
                                {item.title}
                              </span>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
            </div>
          ))}
        </nav>
      </aside>
    );
  }
}

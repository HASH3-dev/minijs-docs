export interface SidebarProps {
  currentPath?: string;
  onNavigate?: (path: string) => void;
}

export interface MenuItem {
  title: string;
  path: string;
  icon: string;
}

export interface MenuSection {
  title: string;
  items: MenuItem[];
}

export interface NavItem {
  label: string;
  path: string;
  icon: string;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

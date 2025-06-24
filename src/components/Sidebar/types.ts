export interface MenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  href?: string;
  children?: MenuItem[];
  isExpanded?: boolean;
}

export interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  items: MenuItem[];
  className?: string;
  overlayClassName?: string;
  width?: string;
}
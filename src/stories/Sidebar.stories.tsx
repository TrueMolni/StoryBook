import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  Home,
  Settings,
  User,
  Bell,
  FileText,
  Database,
  Code,
  GitBranch,
  Zap,
  Shield,
} from 'lucide-react';
import { Sidebar } from '../components/Sidebar';
import type { MenuItem } from '../components/Sidebar';

const sampleMenuItems: MenuItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: <Home size={18} />,
    href: '/dashboard',
  },
  {
    id: 'profile',
    label: 'Profile',
    icon: <User size={18} />,
    children: [
      {
        id: 'edit-profile',
        label: 'Edit Profile',
        href: '/profile/edit',
      },
      {
        id: 'account-settings',
        label: 'Account Settings',
        href: '/profile/settings',
      },
      {
        id: 'preferences',
        label: 'Preferences',
        href: '/profile/preferences',
      },
    ],
  },
  {
    id: 'projects',
    label: 'Projects',
    icon: <FileText size={18} />,
    children: [
      {
        id: 'my-projects',
        label: 'My Projects',
        href: '/projects/mine',
      },
      {
        id: 'shared-projects',
        label: 'Shared Projects',
        href: '/projects/shared',
      },
      {
        id: 'templates',
        label: 'Templates',
        children: [
          {
            id: 'react-templates',
            label: 'React Templates',
            href: '/templates/react',
          },
          {
            id: 'vue-templates',
            label: 'Vue Templates',
            href: '/templates/vue',
          },
        ],
      },
    ],
  },
  {
    id: 'tools',
    label: 'Development Tools',
    icon: <Code size={18} />,
    children: [
      {
        id: 'database',
        label: 'Database',
        icon: <Database size={16} />,
        href: '/tools/database',
      },
      {
        id: 'api',
        label: 'API Testing',
        icon: <Zap size={16} />,
        href: '/tools/api',
      },
      {
        id: 'version-control',
        label: 'Version Control',
        icon: <GitBranch size={16} />,
        href: '/tools/git',
      },
    ],
  },
  {
    id: 'notifications',
    label: 'Notifications',
    icon: <Bell size={18} />,
    href: '/notifications',
  },
  {
    id: 'security',
    label: 'Security',
    icon: <Shield size={18} />,
    href: '/security',
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: <Settings size={18} />,
    href: '/settings',
  },
];

const meta = {
  title: 'Components/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A sliding sidebar menu with nested expandable submenus, smooth animations, and backdrop close functionality.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: { control: 'boolean' },
    width: { control: 'text' },
    onClose: { action: 'closed' },
  },
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isOpen: true,
    title: 'Navigation Menu',
    items: sampleMenuItems,
  },
};

export const SimpleMenu: Story = {
  args: {
    isOpen: true,
    title: 'Simple Menu',
    items: [
      {
        id: 'home',
        label: 'Home',
        icon: <Home size={18} />,
        href: '/',
      },
      {
        id: 'about',
        label: 'About',
        href: '/about',
      },
      {
        id: 'contact',
        label: 'Contact',
        href: '/contact',
      },
    ],
  },
};

export const WithoutIcons: Story = {
  args: {
    isOpen: true,
    title: 'Text Only Menu',
    items: [
      {
        id: 'section1',
        label: 'Section 1',
        children: [
          {
            id: 'item1',
            label: 'Item 1',
            href: '/item1',
          },
          {
            id: 'item2',
            label: 'Item 2',
            href: '/item2',
          },
        ],
      },
      {
        id: 'section2',
        label: 'Section 2',
        children: [
          {
            id: 'item3',
            label: 'Item 3',
            href: '/item3',
          },
          {
            id: 'item4',
            label: 'Item 4',
            href: '/item4',
          },
        ],
      },
    ],
  },
};

export const CustomWidth: Story = {
  args: {
    isOpen: true,
    title: 'Wide Sidebar',
    width: '400px',
    items: sampleMenuItems,
  },
};

export const Interactive: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="h-screen bg-gray-100">
        <div className="p-8">
          <button
            onClick={() => setIsOpen(true)}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors shadow-lg"
          >
            Open Sidebar Menu
          </button>

          <div className="mt-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Main Content
            </h1>
            <p className="text-gray-600 mb-4">
              Click the button above to open the sidebar menu. You can close it
              by clicking the X button, clicking outside the sidebar, or
              pressing the Escape key.
            </p>
            <p className="text-gray-600">
              The sidebar includes nested menus that expand and collapse with
              smooth animations. Try expanding the "Profile" or "Projects"
              sections to see the nested navigation.
            </p>
          </div>
        </div>

        <Sidebar
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Application Menu"
          items={sampleMenuItems}
        />
      </div>
    );
  },
};

export const DifferentPositions: Story = {
  render: () => {
    const [leftOpen, setLeftOpen] = useState(false);
    const [rightOpen, setRightOpen] = useState(false);

    return (
      <div className="h-screen bg-gray-100 p-8">
        <div className="space-x-4">
          <button
            onClick={() => setLeftOpen(true)}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
          >
            Open Left Sidebar
          </button>

          <button
            onClick={() => setRightOpen(true)}
            className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors"
          >
            Open Right Sidebar
          </button>
        </div>

        <div
          className={`fixed top-0 left-0 h-full bg-white shadow-2xl z-50 transition-transform duration-300 ${
            leftOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          style={{ width: '320px' }}
        >
          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Left Menu</h2>
              <button
                onClick={() => setLeftOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                ×
              </button>
            </div>
          </div>
          <div className="p-4">
            <p>This is a left-positioned sidebar.</p>
          </div>
        </div>


        <Sidebar
          isOpen={rightOpen}
          onClose={() => setRightOpen(false)}
          title="Right Menu"
          items={sampleMenuItems.slice(0, 3)}
        />

 
        {leftOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setLeftOpen(false)}
          />
        )}
      </div>
    );
  },
};

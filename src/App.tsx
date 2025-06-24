import React, { useState } from 'react';
import { Home, Settings, User, Bell, FileText, Database, Code, GitBranch, Zap, Shield, Menu } from 'lucide-react';
import { Input, Toast, ToastContainer, Sidebar } from './components';
import { ToastProps, MenuItem } from './components';

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
    ],
  },
  {
    id: 'notifications',
    label: 'Notifications',
    icon: <Bell size={18} />,
    href: '/notifications',
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: <Settings size={18} />,
    href: '/settings',
  },
];

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastProps[]>([]);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    search: '',
  });

  const addToast = (toast: Omit<ToastProps, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts(prev => [...prev, { ...toast, id }]);
  };

  const removeToast = (id?: string) => {
    if (id) {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }
  };

  const handleInputChange = (field: string) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <Code className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                React UI Library
              </h1>
            </div>
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg bg-white shadow-sm border border-gray-200 hover:bg-gray-50 hover:shadow-md transition-all duration-200"
            >
              <Menu className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Beautiful React Components
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A production-ready component library with TypeScript, Tailwind CSS, and Framer Motion animations.
            Featuring Input, Toast, and Sidebar components with comprehensive Storybook documentation.
          </p>
        </div>

        {/* Components Demo Grid */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Input Components Section */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Input Components</h3>
              <p className="text-gray-600">
                Versatile inputs with validation, password toggle, and clear functionality
              </p>
            </div>
            
            <div className="space-y-6">
              <Input
                type="email"
                label="Email Address"
                placeholder="Enter your email..."
                value={formData.email}
                onChange={handleInputChange('email')}
                showClearButton={true}
                hint="We'll never share your email with anyone else."
              />
              
              <Input
                type="password"
                label="Password"
                placeholder="Enter your password..."
                value={formData.password}
                onChange={handleInputChange('password')}
                showPasswordToggle={true}
                showClearButton={true}
              />
              
              <Input
                type="search"
                label="Search"
                placeholder="Search components..."
                value={formData.search}
                onChange={handleInputChange('search')}
                showClearButton={true}
                size="lg"
                variant="filled"
              />
              
              <div className="grid grid-cols-3 gap-3">
                <Input size="sm" placeholder="Small" variant="outline" />
                <Input size="md" placeholder="Medium" variant="default" />
                <Input size="lg" placeholder="Large" variant="filled" />
              </div>
            </div>
          </div>

          {/* Toast Components Section */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Toast Notifications</h3>
              <p className="text-gray-600">
                Elegant notifications with animations and auto-dismiss
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => addToast({
                  type: 'success',
                  title: 'Success!',
                  message: 'Operation completed successfully.',
                  duration: 5000,
                })}
                className="bg-green-500 text-white px-4 py-3 rounded-lg hover:bg-green-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Success Toast
              </button>
              
              <button
                onClick={() => addToast({
                  type: 'error',
                  title: 'Error',
                  message: 'Something went wrong.',
                  duration: 0,
                })}
                className="bg-red-500 text-white px-4 py-3 rounded-lg hover:bg-red-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Error Toast
              </button>
              
              <button
                onClick={() => addToast({
                  type: 'warning',
                  title: 'Warning',
                  message: 'Please review your input.',
                  duration: 7000,
                })}
                className="bg-yellow-500 text-white px-4 py-3 rounded-lg hover:bg-yellow-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Warning Toast
              </button>
              
              <button
                onClick={() => addToast({
                  type: 'info',
                  message: 'Here\'s some helpful information.',
                  duration: 5000,
                })}
                className="bg-blue-500 text-white px-4 py-3 rounded-lg hover:bg-blue-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Info Toast
              </button>
            </div>
            
            <button
              onClick={() => setToasts([])}
              className="w-full mt-4 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Clear All Toasts
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Code className="w-6 h-6 text-blue-600" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">TypeScript Ready</h4>
            <p className="text-gray-600">
              Full TypeScript support with comprehensive type definitions and interfaces.
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-green-600" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Smooth Animations</h4>
            <p className="text-gray-600">
              Beautiful micro-interactions powered by Framer Motion for enhanced UX.
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <FileText className="w-6 h-6 text-purple-600" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Storybook Docs</h4>
            <p className="text-gray-600">
              Comprehensive documentation and interactive examples in Storybook.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Ready to Explore?</h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Open the sidebar menu to see the nested navigation component, or run Storybook to explore all component variations and documentation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setSidebarOpen(true)}
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors shadow-lg"
            >
              Open Sidebar Demo
            </button>
            <div className="bg-blue-500/50 text-blue-100 px-6 py-3 rounded-lg font-semibold">
              npm run storybook
            </div>
          </div>
        </div>
      </main>

      {/* Sidebar Component */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        title="Navigation Menu"
        items={sampleMenuItems}
      />

      {/* Toast Container */}
      <ToastContainer
        toasts={toasts}
        position="top-right"
        onRemove={removeToast}
      />
    </div>
  );
}

export default App;
import type { Meta, StoryObj } from '@storybook/react';
// import { fn } from '@storybook/test';
import { useState } from 'react';
import { Toast, ToastContainer } from '../components/Toast';
import type { ToastProps } from '../components/Toast';

const meta = {
  title: 'Components/Toast',
  component: Toast,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Toast notifications with different types, animations, and auto-dismiss functionality.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['success', 'error', 'warning', 'info'],
    },
    duration: {
      control: { type: 'number', min: 0, max: 10000, step: 1000 },
    },
    onClose: { action: 'closed' },
    args: {
      onClose: () => console.log('Toast closed'), // 🟢 оце спрацює в самому компоненті
    },
  },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
  args: {
    type: 'success',
    title: 'Success!',
    message: 'Your action was completed successfully.',
    duration: 5000,
  },
};

export const Error: Story = {
  args: {
    type: 'error',
    title: 'Error',
    message: 'Something went wrong. Please try again.',
    duration: 0, // Don't auto-dismiss errors
  },
};

export const Warning: Story = {
  args: {
    type: 'warning',
    title: 'Warning',
    message: 'Please review your input before proceeding.',
    duration: 7000,
  },
};

export const Info: Story = {
  args: {
    type: 'info',
    title: 'Information',
    message: "Here's some helpful information for you.",
    duration: 5000,
  },
};

export const WithoutTitle: Story = {
  args: {
    type: 'success',
    message: 'This toast has no title, just a message.',
    duration: 5000,
  },
};

export const NoDismiss: Story = {
  args: {
    type: 'info',
    title: 'Persistent Toast',
    message: "This toast won't auto-dismiss.",
    duration: 0,
  },
};

export const ToastSystem: Story = {
  render: () => {
    const [toasts, setToasts] = useState<ToastProps[]>([]);

    const addToast = (toast: Omit<ToastProps, 'id'>) => {
      const id = Math.random().toString(36).substr(2, 9);
      setToasts((prev) => [...prev, { ...toast, id }]);
    };

    const removeToast = (id?: string) => {
      if (id) {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
      }
    };

    const clearAll = () => {
      setToasts([]);
    };

    return (
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() =>
              addToast({
                type: 'success',
                title: 'Success!',
                message: 'Operation completed successfully.',
                duration: 5000,
              })
            }
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
          >
            Show Success
          </button>

          <button
            onClick={() =>
              addToast({
                type: 'error',
                title: 'Error',
                message: 'Something went wrong.',
                duration: 0,
              })
            }
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
          >
            Show Error
          </button>

          <button
            onClick={() =>
              addToast({
                type: 'warning',
                title: 'Warning',
                message: 'Please be careful.',
                duration: 7000,
              })
            }
            className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors"
          >
            Show Warning
          </button>

          <button
            onClick={() =>
              addToast({
                type: 'info',
                message: 'Just some info without a title.',
                duration: 5000,
              })
            }
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Show Info
          </button>

          <button
            onClick={clearAll}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
          >
            Clear All
          </button>
        </div>

        <ToastContainer
          toasts={toasts}
          position="top-right"
          onRemove={removeToast}
        />
      </div>
    );
  },
};

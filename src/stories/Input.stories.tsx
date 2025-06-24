import type { Meta, StoryObj } from '@storybook/react';
import { useForm } from 'react-hook-form';
import { Input } from '../components/Input';

const meta = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A versatile input component with support for different types, validation, and interactive features like password visibility toggle and clear button.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    onChange: { action: 'changed' },
    onFocus: { action: 'focused' },
    onBlur: { action: 'blurred' },
    onClear: { action: 'cleared' },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
    label: 'Default Input',
  },
};

export const Password: Story = {
  args: {
    type: 'password',
    placeholder: 'Enter password...',
    label: 'Password',
    showPasswordToggle: true,
  },
};

export const Email: Story = {
  args: {
    type: 'email',
    placeholder: 'Enter email...',
    label: 'Email Address',
    hint: "We'll never share your email with anyone else.",
  },
};

export const WithError: Story = {
  args: {
    placeholder: 'Enter text...',
    label: 'Input with Error',
    error: 'This field is required',
    value: '',
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled input...',
    label: 'Disabled Input',
    disabled: true,
    value: 'Cannot edit this',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <Input size="sm" placeholder="Small input..." label="Small" />
      <Input size="md" placeholder="Medium input..." label="Medium" />
      <Input size="lg" placeholder="Large input..." label="Large" />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <Input
        variant="default"
        placeholder="Default variant..."
        label="Default"
      />
      <Input
        variant="outline"
        placeholder="Outline variant..."
        label="Outline"
      />
      <Input variant="filled" placeholder="Filled variant..." label="Filled" />
    </div>
  ),
};

export const WithReactHookForm: Story = {
  render: () => {
    const {
      register,
      handleSubmit,
      formState: { errors },
      watch,
    } = useForm();
    const watchedEmail = watch('email');

    const onSubmit = (data: any) => {
      console.log('Form submitted:', data);
    };

    return (
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-80">
        <Input
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^\S+@\S+$/i,
              message: 'Invalid email format',
            },
          })}
          type="email"
          placeholder="Enter email..."
          label="Email"
          error={errors.email?.message as string}
          value={watchedEmail}
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Submit
        </button>
      </form>
    );
  },
};

export const Search: Story = {
  args: {
    type: 'search',
    placeholder: 'Search...',
    label: 'Search Input',
    showClearButton: true,
  },
};

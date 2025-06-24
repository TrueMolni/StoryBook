import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, X, AlertCircle } from 'lucide-react';
import { InputProps } from './types';

export const Input: React.FC<InputProps> = ({
  type = 'text',
  placeholder,
  value,
  defaultValue,
  disabled = false,
  required = false,
  error,
  label,
  hint,
  showClearButton = true,
  showPasswordToggle = true,
  size = 'md',
  variant = 'default',
  className = '',
  onChange,
  onFocus,
  onBlur,
  onClear,
}) => {
  const [inputValue, setInputValue] = useState(value || defaultValue || '');
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (value !== undefined) {
      setInputValue(value);
    }
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange?.(newValue);
  };

  const handleClear = () => {
    setInputValue('');
    onChange?.('');
    onClear?.();
    inputRef.current?.focus();
  };

  const handleFocus = () => {
    setIsFocused(true);
    onFocus?.();
  };

  const handleBlur = () => {
    setIsFocused(false);
    onBlur?.();
  };

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-5 py-4 text-lg',
  };

  const variantClasses = {
    default: 'border border-gray-300 bg-white',
    outline: 'border-2 border-gray-200 bg-transparent',
    filled: 'border border-transparent bg-gray-100',
  };

  const baseClasses = `
    w-full rounded-lg transition-all duration-200 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
    disabled:opacity-50 disabled:cursor-not-allowed
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${error ? 'border-red-500 focus:ring-red-500' : ''}
    ${isFocused ? 'shadow-lg' : 'shadow-sm'}
    ${className}
  `;

  const inputType = type === 'password' && showPassword ? 'text' : type;
  const showPasswordButton = type === 'password' && showPasswordToggle;
  const showClearBtn = showClearButton && inputValue && !disabled;

  return (
    <div className="w-full">
      {label && (
        <motion.label
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </motion.label>
      )}
      
      <div className="relative">
        <input
          ref={inputRef}
          type={inputType}
          placeholder={placeholder}
          value={inputValue}
          disabled={disabled}
          required={required}
          className={baseClasses}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
          <AnimatePresence>
            {showClearBtn && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                type="button"
                onClick={handleClear}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X size={16} />
              </motion.button>
            )}
          </AnimatePresence>
          
          {showPasswordButton && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </motion.button>
          )}
        </div>
      </div>
      
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center mt-2 text-red-600 text-sm"
          >
            <AlertCircle size={16} className="mr-1" />
            {error}
          </motion.div>
        )}
      </AnimatePresence>
      
      {hint && !error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-2 text-sm text-gray-500"
        >
          {hint}
        </motion.p>
      )}
    </div>
  );
};
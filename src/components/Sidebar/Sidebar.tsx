import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronRight, X } from 'lucide-react';
import { SidebarProps, MenuItem } from './types';

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  title = 'Menu',
  items,
  className = '',
  overlayClassName = '',
  width = '320px',
}) => {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const toggleExpanded = (itemId: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    setExpandedItems(newExpanded);
  };

  const renderMenuItem = (item: MenuItem, depth = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.has(item.id);
    const paddingLeft = depth * 16 + 16;

    return (
      <div key={item.id}>
        <motion.div
          whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center justify-between py-3 px-4 text-gray-700 hover:text-blue-600 cursor-pointer rounded-lg mx-2 transition-colors"
          style={{ paddingLeft }}
          onClick={() => {
            if (hasChildren) {
              toggleExpanded(item.id);
            } else if (item.href) {
              // Handle navigation
              console.log('Navigate to:', item.href);
            }
          }}
        >
          <div className="flex items-center space-x-3">
            {item.icon && (
              <span className="text-current">{item.icon}</span>
            )}
            <span className="font-medium">{item.label}</span>
          </div>
          
          {hasChildren && (
            <motion.span
              animate={{ rotate: isExpanded ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronRight size={16} />
            </motion.span>
          )}
        </motion.div>
        
        <AnimatePresence>
          {hasChildren && isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              {item.children?.map((child) => renderMenuItem(child, depth + 1))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 bg-black bg-opacity-50 z-40 ${overlayClassName}`}
            onClick={onClose}
          />
          
          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={`fixed top-0 right-0 h-full bg-white shadow-2xl z-50 ${className}`}
            style={{ width }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
              <motion.button
                whileHover={{ scale: 1.1, backgroundColor: 'rgba(239, 68, 68, 0.1)' }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-2 rounded-full text-gray-500 hover:text-red-500 transition-colors"
              >
                <X size={20} />
              </motion.button>
            </div>
            
            {/* Menu Items */}
            <div className="overflow-y-auto h-full pb-20">
              <div className="py-4">
                {items.map((item) => renderMenuItem(item))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
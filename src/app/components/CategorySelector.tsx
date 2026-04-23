import React, { useState, useRef, useEffect } from 'react';
import { Search, Plus, X } from 'lucide-react';

interface Category {
  id: string;
  name: string;
}

interface CategorySelectorProps {
  value: string;
  onChange: (value: string) => void;
  categories: Category[];
  onAddCategory: (name: string) => void;
}

export function CategorySelector({ value, onChange, categories, onAddCategory }: CategorySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setShowNewCategoryInput(false);
        setNewCategoryName('');
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredCategories = categories.filter(cat =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectCategory = (category: Category) => {
    onChange(category.name);
    setIsOpen(false);
    setSearchTerm('');
  };

  const handleAddNewCategory = () => {
    if (newCategoryName.trim()) {
      onAddCategory(newCategoryName.trim());
      onChange(newCategoryName.trim());
      setNewCategoryName('');
      setShowNewCategoryInput(false);
      setIsOpen(false);
    }
  };

  const selectedCategory = categories.find(cat => cat.name === value);

  return (
    <div ref={containerRef} className="relative">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="h-[36px] px-3 border border-zinc-200 rounded-lg flex items-center justify-between cursor-pointer hover:border-zinc-300 transition-colors bg-white"
      >
        <span className={value ? 'text-zinc-900 text-sm' : 'text-zinc-400 text-sm'}>
          {value || '选择或搜索工作事项'}
        </span>
        <Search className="w-4 h-4 text-zinc-400" />
      </div>

      {isOpen && (
        <div className="absolute top-[40px] left-0 right-0 bg-white border border-zinc-200 rounded-lg shadow-lg z-50 max-h-[280px] overflow-hidden">
          {/* Search input */}
          <div className="p-2 border-b border-zinc-200">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="搜索分类..."
                className="w-full pl-8 pr-3 py-1.5 text-sm border border-zinc-200 rounded focus:outline-none focus:ring-1 focus:ring-emerald-500"
                autoFocus
              />
            </div>
          </div>

          {/* Categories list */}
          <div className="max-h-[180px] overflow-y-auto">
            {filteredCategories.map((category) => (
              <div
                key={category.id}
                onClick={() => handleSelectCategory(category)}
                className="px-3 py-2 hover:bg-zinc-50 cursor-pointer text-sm text-zinc-900 transition-colors"
              >
                {category.name}
              </div>
            ))}
            {filteredCategories.length === 0 && !showNewCategoryInput && (
              <div className="px-3 py-2 text-sm text-zinc-400">
                未找到匹配的分类
              </div>
            )}
          </div>

          {/* Add new category */}
          <div className="border-t border-zinc-200 p-2">
            {!showNewCategoryInput ? (
              <button
                onClick={() => setShowNewCategoryInput(true)}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-emerald-600 hover:bg-emerald-50 rounded transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>新建分类</span>
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="输入新分类名称..."
                  className="flex-1 px-2 py-1.5 text-sm border border-zinc-200 rounded focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  onKeyDown={(e) => e.key === 'Enter' && handleAddNewCategory()}
                  autoFocus
                />
                <button
                  onClick={handleAddNewCategory}
                  className="px-3 py-1.5 text-sm bg-emerald-500 text-white rounded hover:bg-emerald-600 transition-colors"
                >
                  添加
                </button>
                <button
                  onClick={() => {
                    setShowNewCategoryInput(false);
                    setNewCategoryName('');
                  }}
                  className="p-1.5 text-zinc-400 hover:text-zinc-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

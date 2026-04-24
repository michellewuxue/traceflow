import React, { useRef, useEffect, useState } from 'react';
import { Bold, Italic, Underline, List, ListOrdered } from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const isUserTyping = useRef(false);
  const [activeFormats, setActiveFormats] = useState({
    bold: false,
    italic: false,
    underline: false,
    unorderedList: false,
    orderedList: false,
  });

  // Only update editor content if value changed externally (not from user typing)
  useEffect(() => {
    if (!isUserTyping.current && editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  // Update active formats based on current selection
  const updateActiveFormats = () => {
    setActiveFormats({
      bold: document.queryCommandState('bold'),
      italic: document.queryCommandState('italic'),
      underline: document.queryCommandState('underline'),
      unorderedList: document.queryCommandState('insertUnorderedList'),
      orderedList: document.queryCommandState('insertOrderedList'),
    });
  };

  const execCommand = (command: string, value?: string) => {
    editorRef.current?.focus();
    document.execCommand(command, false, value);
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
    editorRef.current?.focus();
    setTimeout(() => updateActiveFormats(), 0);
  };

  const handleBold = (e: React.MouseEvent) => {
    e.preventDefault();
    execCommand('bold');
  };

  const handleItalic = (e: React.MouseEvent) => {
    e.preventDefault();
    execCommand('italic');
  };

  const handleUnderline = (e: React.MouseEvent) => {
    e.preventDefault();
    execCommand('underline');
  };

  const handleUnorderedList = (e: React.MouseEvent) => {
    e.preventDefault();
    execCommand('insertUnorderedList');
  };

  const handleOrderedList = (e: React.MouseEvent) => {
    e.preventDefault();
    execCommand('insertOrderedList');
  };

  const handleInput = () => {
    isUserTyping.current = true;
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
    setTimeout(() => {
      isUserTyping.current = false;
    }, 100);
    updateActiveFormats();
  };

  const handleSelectionChange = () => {
    updateActiveFormats();
  };

  useEffect(() => {
    document.addEventListener('selectionchange', handleSelectionChange);
    return () => {
      document.removeEventListener('selectionchange', handleSelectionChange);
    };
  }, []);

  return (
    <div className="bg-white border border-zinc-200 rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="bg-white border-b border-zinc-200 p-2 flex items-center gap-1">
        <button
          type="button"
          onMouseDown={handleBold}
          className={`p-1.5 rounded transition-colors ${
            activeFormats.bold ? 'bg-[#1ABC9C]/10' : 'hover:bg-zinc-100'
          }`}
          title="粗体"
        >
          <Bold className="w-4 h-4 text-zinc-600" />
        </button>
        <button
          type="button"
          onMouseDown={handleItalic}
          className={`p-1.5 rounded transition-colors ${
            activeFormats.italic ? 'bg-[#1ABC9C]/10' : 'hover:bg-zinc-100'
          }`}
          title="斜体"
        >
          <Italic className="w-4 h-4 text-zinc-600" />
        </button>
        <button
          type="button"
          onMouseDown={handleUnderline}
          className={`p-1.5 rounded transition-colors ${
            activeFormats.underline ? 'bg-[#1ABC9C]/10' : 'hover:bg-zinc-100'
          }`}
          title="下划线"
        >
          <Underline className="w-4 h-4 text-zinc-600" />
        </button>
        <div className="w-px h-5 bg-zinc-200 mx-1" />
        <button
          type="button"
          onMouseDown={handleUnorderedList}
          className={`p-1.5 rounded transition-colors ${
            activeFormats.unorderedList ? 'bg-[#1ABC9C]/10' : 'hover:bg-zinc-100'
          }`}
          title="无序列表"
        >
          <List className="w-4 h-4 text-zinc-600" />
        </button>
        <button
          type="button"
          onMouseDown={handleOrderedList}
          className={`p-1.5 rounded transition-colors ${
            activeFormats.orderedList ? 'bg-[#1ABC9C]/10' : 'hover:bg-zinc-100'
          }`}
          title="有序列表"
        >
          <ListOrdered className="w-4 h-4 text-zinc-600" />
        </button>
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onDragStart={(e) => e.preventDefault()}
        onDrop={(e) => e.preventDefault()}
        draggable={false}
        className="p-3 min-h-[96px] text-sm text-zinc-800 focus:outline-none empty:before:content-[attr(data-placeholder)] empty:before:text-zinc-400"
        data-placeholder={placeholder}
        suppressContentEditableWarning
        style={{
          listStyleType: 'disc',
          listStylePosition: 'inside'
        }}
      />
    </div>
  );
}
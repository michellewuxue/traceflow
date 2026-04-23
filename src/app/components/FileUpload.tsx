import React, { useState, useRef } from 'react';
import { Upload, Link as LinkIcon, X, FileCode2, FileText, Image as ImageIcon } from 'lucide-react';

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  url?: string;
}

interface FileUploadProps {
  files: UploadedFile[];
  onFilesChange: (files: UploadedFile[]) => void;
}

const getFileType = (fileName: string): string => {
  const ext = fileName.split('.').pop()?.toLowerCase() || '';

  // Code files
  if (['js', 'jsx', 'ts', 'tsx', 'py', 'java', 'cpp', 'c', 'go', 'rs', 'rb', 'php', 'swift', 'kt'].includes(ext)) {
    return 'CODE';
  }

  // Design files
  if (['fig', 'sketch', 'xd', 'psd', 'ai', 'svg'].includes(ext)) {
    return '设计稿';
  }

  // Markdown
  if (['md', 'markdown'].includes(ext)) {
    return 'MD';
  }

  // Images
  if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp'].includes(ext)) {
    return 'JPG';
  }

  // Documents
  if (['doc', 'docx', 'pdf', 'txt'].includes(ext)) {
    return 'DOC';
  }

  return 'FILE';
};

const getFileTypeColor = (type: string): string => {
  switch (type) {
    case 'CODE':
      return 'bg-indigo-100 text-indigo-700 border-indigo-300';
    case '设计稿':
      return 'bg-pink-100 text-pink-700 border-pink-300';
    case 'MD':
      return 'bg-blue-100 text-blue-700 border-blue-300';
    case 'JPG':
      return 'bg-purple-100 text-purple-700 border-purple-300';
    case 'DOC':
      return 'bg-green-100 text-green-700 border-green-300';
    default:
      return 'bg-zinc-100 text-zinc-700 border-zinc-300';
  }
};

const getFileIcon = (type: string) => {
  switch (type) {
    case 'CODE':
      return <FileCode2 className="w-4 h-4" />;
    case '设计稿':
    case 'JPG':
      return <ImageIcon className="w-4 h-4" />;
    default:
      return <FileText className="w-4 h-4" />;
  }
};

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 10) / 10 + ' ' + sizes[i];
};

export function FileUpload({ files, onFilesChange }: FileUploadProps) {
  const [linkUrl, setLinkUrl] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const newFiles: UploadedFile[] = selectedFiles.map(file => ({
      id: `file-${Date.now()}-${Math.random()}`,
      name: file.name,
      size: file.size,
      type: getFileType(file.name)
    }));
    onFilesChange([...files, ...newFiles]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleAddLink = () => {
    if (linkUrl.trim()) {
      const fileName = linkUrl.split('/').pop() || linkUrl;
      const newFile: UploadedFile = {
        id: `link-${Date.now()}`,
        name: fileName,
        size: 0,
        type: getFileType(fileName),
        url: linkUrl
      };
      onFilesChange([...files, newFile]);
      setLinkUrl('');
    }
  };

  const handleRemoveFile = (id: string) => {
    onFilesChange(files.filter(f => f.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="flex-1 relative">
          <input
            type="text"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddLink()}
            placeholder="输入链接地址..."
            className="w-full h-[36px] pl-10 pr-3 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
          <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
        </div>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileSelect}
          className="hidden"
          id="file-upload"
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="h-[36px] px-4 border-2 border-dashed border-emerald-400 text-emerald-600 rounded-lg text-sm font-medium hover:bg-emerald-50 transition-colors flex items-center gap-2"
        >
          <Upload className="w-4 h-4" />
          上传文件
        </button>
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file) => (
            <div
              key={file.id}
              className="bg-zinc-50 border border-zinc-200 rounded-lg p-3 flex items-center justify-between group hover:bg-zinc-100 transition-colors"
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <span className={`px-2 py-1 rounded text-xs font-bold border ${getFileTypeColor(file.type)} flex items-center gap-1`}>
                  {getFileIcon(file.type)}
                  {file.type}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-zinc-900 truncate">{file.name}</div>
                  {file.size > 0 && (
                    <div className="text-xs text-zinc-500">{formatFileSize(file.size)}</div>
                  )}
                </div>
              </div>
              <button
                onClick={() => handleRemoveFile(file.id)}
                className="p-1 text-zinc-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

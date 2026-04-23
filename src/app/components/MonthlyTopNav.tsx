import React from 'react';
import { Activity, LayoutDashboard, FileText, Settings, LogOut, User } from 'lucide-react';
import { useNavigate } from 'react-router';

interface MonthlyTopNavProps {
  userName?: string;
  userAvatar?: string;
}

export function MonthlyTopNav({ userName, userAvatar }: MonthlyTopNavProps) {
  const navigate = useNavigate();

  return (
    <header className="bg-white shadow-sm border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
            <Activity className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold text-zinc-900">Work Trace</h1>
        </div>

        <nav className="flex items-center gap-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-zinc-600 hover:text-emerald-600 transition-colors"
          >
            <LayoutDashboard className="w-4 h-4" />
            <span className="text-sm font-medium">工作日志</span>
          </button>
          <button className="flex items-center gap-2 text-emerald-600 bg-emerald-50 px-3 py-2 rounded-lg">
            <FileText className="w-4 h-4" />
            <span className="text-sm font-medium">工作月报</span>
          </button>
          <button className="flex items-center gap-2 text-zinc-600 hover:text-emerald-600 transition-colors">
            <Settings className="w-4 h-4" />
            <span className="text-sm font-medium">项目配置</span>
          </button>
        </nav>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <img
              src={userAvatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=default`}
              alt="用户头像"
              className="w-8 h-8 rounded-full"
            />
            <span className="text-sm font-medium text-zinc-700">
              {userName || '用户'}
            </span>
          </div>
          <button className="flex items-center gap-2 text-zinc-600 hover:text-red-600 transition-colors px-3 py-2 rounded-lg hover:bg-red-50">
            <LogOut className="w-4 h-4" />
            <span className="text-sm">退出</span>
          </button>
        </div>
      </div>
    </header>
  );
}
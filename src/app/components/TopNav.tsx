import React, { useState, useEffect } from 'react';
import { Activity, LayoutDashboard, FileText, LogOut } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router';
import { supabase } from '../App';

interface TopNavProps {
  userName?: string;
  userAvatar?: string;
}

export function TopNav({ userName, userAvatar }: TopNavProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentUserName, setCurrentUserName] = useState(userName || '');
  const [currentUserAvatar, setCurrentUserAvatar] = useState(userAvatar || '');

  useEffect(() => {
    if (!userName || !userAvatar) {
      supabase.auth.getUser().then(({ data: { user } }) => {
        if (user) {
          setCurrentUserName(user.user_metadata?.name || user.email?.split('@')[0] || '用户');
          setCurrentUserAvatar(`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.id}`);
        }
      });
    }
  }, [userName, userAvatar]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/create') {
      return true;
    }
    return location.pathname === path;
  };

  return (
    <nav className="h-14 shrink-0 bg-white border-b border-zinc-200 px-6 flex items-center justify-between z-20">
      <div
        className="flex items-center gap-2 text-emerald-500 font-bold text-xl tracking-tight cursor-pointer"
        onClick={() => navigate('/')}
      >
        <Activity className="w-6 h-6" /> TraceFlow
      </div>

      <div className="hidden md:flex items-center gap-8">
        <button
          onClick={() => navigate('/')}
          className={`flex items-center gap-1.5 text-sm font-medium py-4 transition-colors ${
            isActive('/')
              ? 'text-emerald-500 border-b-2 border-emerald-500'
              : 'text-zinc-500 hover:text-zinc-900'
          }`}
        >
          <LayoutDashboard className="w-4 h-4" /> 工作日志
        </button>
        <button
          onClick={() => navigate('/team-monthly-report')}
          className={`flex items-center gap-1.5 text-sm font-medium py-4 transition-colors ${
            isActive('/team-monthly-report')
              ? 'text-emerald-500 border-b-2 border-emerald-500'
              : 'text-zinc-500 hover:text-zinc-900'
          }`}
        >
          <FileText className="w-4 h-4" /> 月报看板
        </button>
        <button
          onClick={() => {}}
          className="flex items-center gap-1.5 text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors py-4"
        >
          <FileText className="w-4 h-4" /> 项目配置
        </button>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="relative">
            {currentUserAvatar && (
              <img
                src={currentUserAvatar}
                className="w-8 h-8 rounded-full object-cover border border-zinc-200 bg-white"
                alt="Profile"
              />
            )}
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full"></div>
          </div>
          <span className="text-sm font-medium text-zinc-700 hidden sm:block">
            {currentUserName}
          </span>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-1 text-sm font-medium text-zinc-500 hover:text-red-500 transition-colors ml-2"
        >
          <LogOut className="w-4 h-4" />
          退出
        </button>
      </div>
    </nav>
  );
}
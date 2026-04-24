import React, { useState, useEffect } from 'react';
import { LogOut } from 'lucide-react';
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
    <header className="h-16 border-b border-[#dee1e6] flex items-center justify-between px-6 lg:px-16 sticky top-0 bg-white z-50 shadow-sm">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#1ABC9C] rounded-md flex items-center justify-center">
            <span className="text-white font-bold">TF</span>
          </div>
          <span className="text-xl font-bold text-[#1ABC9C]">TraceFlow</span>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <button 
            onClick={() => navigate('/')}
            className={`flex items-center gap-2 text-[#1ABC9C] font-medium`}
          >
            <span>工作日志</span>
          </button>
          <button 
            onClick={() => navigate('/team-monthly-report')}
            className={`flex items-center gap-2 text-[#565d6d] font-medium hover:text-[#1ABC9C] transition-colors`}
          >
            <span>工作月报</span>
          </button>
          <button 
            onClick={() => {}}
            className="flex items-center gap-2 text-[#565d6d] font-medium hover:text-[#1ABC9C] transition-colors"
          >
            <span>项目配置</span>
          </button>
        </nav>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-100">
            {currentUserAvatar && (
              <img 
                src={currentUserAvatar} 
                alt="user" 
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#2ECC71] border-2 border-white rounded-full"></div>
        </div>
        <button 
          onClick={handleLogout}
          className="text-sm text-[#333333] hover:text-[#1ABC9C]"
        >
          退出
        </button>
      </div>
    </header>
  );
}
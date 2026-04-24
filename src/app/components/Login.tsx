import React, { useState } from 'react';
import { Eye, EyeOff, Lock, User, Github, Chrome, Apple } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router';
import { supabase } from '../App';
import { projectId, publicAnonKey } from '/utils/supabase/info';

export function Login() {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim() || !password.trim()) {
      toast.error('请输入账号和密码');
      return;
    }
    
    if (password.length < 6) {
      toast.error('密码长度不能少于6位');
      return;
    }

    if (isLoginMode) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        if (error.message.includes('Invalid login credentials') || error.message.includes('invalid claim')) {
          toast.error('账号或密码错误。如果您是新用户，请先点击下方“立即注册”！');
        } else {
          toast.error(`登录失败: ${error.message}`);
        }
      } else {
        toast.success('登录成功，欢迎回来！');
        navigate('/');
      }
    } else {
      if (!name.trim()) {
        toast.error('请输入姓名');
        return;
      }

      // Call custom server route for signup to auto-confirm
      try {
        const res = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-e9f91fb9/signup`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`
          },
          body: JSON.stringify({ email, password, name })
        });
        
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || '注册失败');
        }
        
        // After signup, we log in the user
        const { error: loginError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (loginError) {
          toast.error(`自动登录失败: ${loginError.message}`);
        } else {
          toast.success('注册成功并已登录！');
          navigate('/');
        }
      } catch (err: any) {
        toast.error(err.message || '注册发生错误');
      }
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-white font-sans">
      {/* Left side: Image and branding */}
      <div className="hidden lg:flex w-1/2 relative bg-zinc-900 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1770009971150-f50bc7d373a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwYXJjaGl0ZWN0dXJlJTIwY2xlYW58ZW58MXx8fHwxNzc2MzE0MjM3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" 
          alt="Architecture background" 
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        
        <div className="relative z-10 flex flex-col justify-between p-12 w-full h-full">
          <div className="flex items-center gap-2 text-white">
            <div className="w-8 h-8 rounded-md bg-[#1ABC9C] text-white flex items-center justify-center font-bold text-xl">
              F
            </div>
            <span className="text-xl font-semibold tracking-wide">TraceFlow</span>
          </div>

          <div className="text-white space-y-4 max-w-lg">
            <h1 className="text-4xl font-light leading-tight">
              设计改变世界 <br/> 
              <span className="font-semibold">灵感无处不在</span>
            </h1>
            <p className="text-zinc-300 text-lg">
              加入我们的社区，探索无限创意，将你的想法化为现实。提供最优雅的界面，为您的灵感保驾护航。
            </p>
          </div>
        </div>
      </div>

      {/* Right side: Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24 bg-zinc-50 lg:bg-white">
        <div className="w-full max-w-md space-y-8">
          
          <div className="text-center lg:text-left space-y-2">
            <h2 className="text-3xl font-bold text-zinc-900 tracking-tight">{isLoginMode ? '欢迎回来' : '创建新账号'}</h2>
            <p className="text-zinc-500 text-sm">{isLoginMode ? '请输入您的账号和密码进行登录' : '请填写您的信息以注册新账号'}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              {!isLoginMode && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-700 block" htmlFor="name">
                    姓名
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
                      <User className="h-5 w-5" />
                    </div>
                    <input
                      id="name"
                      type="text"
                      required={!isLoginMode}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="block w-full pl-10 pr-3 py-2.5 border border-zinc-200 rounded-lg text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all sm:text-sm bg-white"
                      placeholder="请输入真实姓名"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-700 block" htmlFor="email">
                  邮箱账号
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
                    <User className="h-5 w-5" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2.5 border border-zinc-200 rounded-lg text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all sm:text-sm bg-white"
                    placeholder="请输入邮箱"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-700 block" htmlFor="password">
                  密码
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
                    <Lock className="h-5 w-5" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-10 py-2.5 border border-zinc-200 rounded-lg text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all sm:text-sm bg-white"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-400 hover:text-zinc-600 focus:outline-none"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {isLoginMode && (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-black focus:ring-black border-zinc-300 rounded cursor-pointer accent-black"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-zinc-600 cursor-pointer">
                    30天内免登录
                  </label>
                </div>
                <div className="text-sm">
                  <a href="#" className="font-medium text-zinc-900 hover:text-zinc-700 hover:underline">
                    忘记密码？
                  </a>
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#1ABC9C] hover:bg-[#16a085] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1ABC9C] transition-colors"
            >
              {isLoginMode ? '登录' : '注册并登录'}
            </button>
          </form>

          {isLoginMode && (
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-zinc-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-zinc-50 lg:bg-white text-zinc-500">
                    其他登录方式
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                <button className="w-full flex justify-center items-center py-2.5 border border-zinc-200 rounded-lg shadow-sm bg-white text-sm font-medium text-zinc-500 hover:bg-zinc-50 hover:text-zinc-700 transition-colors">
                  <Github className="h-5 w-5" />
                </button>
                <button className="w-full flex justify-center items-center py-2.5 border border-zinc-200 rounded-lg shadow-sm bg-white text-sm font-medium text-zinc-500 hover:bg-zinc-50 hover:text-zinc-700 transition-colors">
                  <Chrome className="h-5 w-5" />
                </button>
                <button className="w-full flex justify-center items-center py-2.5 border border-zinc-200 rounded-lg shadow-sm bg-white text-sm font-medium text-zinc-500 hover:bg-zinc-50 hover:text-zinc-700 transition-colors">
                  <Apple className="h-5 w-5" />
                </button>
              </div>
            </div>
          )}

          <p className="mt-8 text-center text-sm text-zinc-600">
            {isLoginMode ? '还没有账号？' : '已有账号？'}{' '}
            <button 
              onClick={() => setIsLoginMode(!isLoginMode)}
              className="font-medium text-black hover:text-zinc-800 hover:underline bg-transparent border-none p-0 cursor-pointer"
            >
              {isLoginMode ? '立即注册' : '返回登录'}
            </button>
          </p>

        </div>
      </div>
    </div>
  );
}
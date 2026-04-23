import React, { useState, useRef, useEffect } from 'react';
import {
  Activity,
  LayoutDashboard,
  FileText,
  Settings,
  LogOut,
  Edit2,
  Clock,
  Tag,
  CheckCircle2,
  FileDown,
  AlertCircle,
  X,
  Download,
  Eye
} from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate, useOutletContext } from 'react-router';
import { supabase } from '../App';
import { projectId, publicAnonKey } from '/utils/supabase/info';
import { TopNav } from './TopNav';

interface Deliverable {
  type: 'CODE' | 'DOC' | 'DESIGN';
  name: string;
  url?: string;
}

interface Log {
  id: string;
  userId: string;
  dateTime: string;
  tags: string[];
  content: string;
  deliverables: Deliverable[];
}

interface User {
  id: string;
  name: string;
  role: string;
  isCurrent: boolean;
  avatar: string;
  updateCount: number;
}

const getDeliverableStyle = (type: string) => {
  switch (type) {
    case 'CODE': return 'bg-emerald-50 text-emerald-600';
    case 'DOC': return 'bg-blue-50 text-blue-600';
    case 'DESIGN': return 'bg-purple-50 text-purple-600';
    default: return 'bg-gray-100 text-gray-600';
  }
};

export function WorkLogBoard() {
  const navigate = useNavigate();
  const { session } = useOutletContext<any>();
  const currentUser = session?.user;

  const [users, setUsers] = useState<User[]>([]);
  const [logs, setLogs] = useState<Log[]>([]);
  const [loading, setLoading] = useState(true);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const currentUserColRef = useRef<HTMLDivElement>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [targetUser, setTargetUser] = useState<User | null>(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [modalError, setModalError] = useState('');

  const [previewFile, setPreviewFile] = useState<Deliverable | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const teamMembersData = [
    { id: '1', name: '刘硕', role: '产品经理', email: 'liushuo@itcast.cn' },
    { id: '2', name: '王静', role: '设计师', email: 'wangjing@itcast.cn' },
    { id: '3', name: '李方华', role: '设计师', email: 'lifanghua@itcast.cn' },
    { id: '4', name: '娄江华', role: '前端开发工程师', email: 'loujianghua@itcast.cn' },
    { id: '5', name: '牟浩天', role: '后端开发工程师', email: 'muhaotian@itcast.cn' },
    { id: '6', name: '吴雪', role: '项目部主管', email: 'wuxue1@itcast.cn' }
  ];

  const fetchLogs = async () => {
    try {
      const res = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-e9f91fb9/logs`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        return data.logs || [];
      }
      return [];
    } catch (e) {
      console.error(e);
      return [];
    }
  };

  useEffect(() => {
    const initData = async () => {
      const currentUserId = currentUser?.id || 'current';
      const currentUserName = currentUser?.user_metadata?.name || currentUser?.email?.split('@')[0] || '当前用户';

      const backendLogs = await fetchLogs();
      
      const emailToId: { [key: string]: string } = {
        'liushuo@itcast.cn': '1',
        'wangjing@itcast.cn': '2',
        'lifanghua@itcast.cn': '3',
        'loujianghua@itcast.cn': '4',
        'muhaotian@itcast.cn': '5',
        'wuxue1@itcast.cn': '6'
      };
      
      const userLogCounts: { [key: string]: number } = {};
      backendLogs.forEach(log => {
        const userId = emailToId[log.userEmail] || log.userId;
        userLogCounts[userId] = (userLogCounts[userId] || 0) + 1;
      });

      const baseUsers: User[] = teamMembersData.map(member => ({
        id: member.id,
        name: member.name,
        role: member.role,
        isCurrent: currentUser?.email === member.email,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${member.name}`,
        updateCount: userLogCounts[member.id] || 0
      }));

      if (!teamMembersData.find(m => currentUser?.email === m.email)) {
        baseUsers.unshift({
          id: currentUserId,
          name: currentUserName,
          role: '当前用户',
          isCurrent: true,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUserId}`,
          updateCount: backendLogs.filter((l: any) => l.userId === currentUserId).length || 0
        });
      }

      // 只使用后端获取的真实数据
      const combinedLogs = [...backendLogs].sort((a, b) => {
        return new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime();
      });

      setUsers(baseUsers);
      setLogs(combinedLogs);
      setLoading(false);

      setTimeout(() => {
        if (currentUserColRef.current) {
          currentUserColRef.current.scrollIntoView({
            behavior: 'smooth',
            inline: 'center',
            block: 'nearest'
          });
        }
      }, 100);
    };

    initData();
  }, [currentUser]);

  const openReportModal = (user: User) => {
    if (!user.isCurrent) {
      toast.error('权限受限：您只能生成和查看自己的工作月报');
      return;
    }
    const userLogs = logs.filter(l => l.userId === user.id);
    if (userLogs.length === 0) {
      toast.warning('当前没有任何工作日志，无法生成月报。请先去添加日志吧！');
      return;
    }
    // 直接导航到月报页面
    navigate('/monthly-report');
  };

  const handleGenerateReport = () => {
    setModalError('');

    if (!startDate || !endDate) {
      setModalError('请填写完整的起止时间');
      return;
    }

    if (new Date(startDate) > new Date(endDate)) {
      setModalError('开始时间不能晚于结束时间');
      return;
    }

    const userName = targetUser?.name || '未知用户';

    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1500)),
      {
        loading: `正在提取 ${userName} 的日志并生成月报...`,
        success: () => {
          setIsModalOpen(false);
          return `成功生成 ${userName} 的工作月报（${startDate} 至 ${endDate}）！`;
        },
        error: '生成失败，请重试'
      }
    );
  };

  const handlePreview = (file: Deliverable, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!file.url) {
      toast.error('该文件暂无预览链接');
      return;
    }
    setPreviewFile(file);
    setShowPreview(true);
  };

  const handleDownload = (file: Deliverable, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!file.url) {
      toast.error('该文件暂无下载链接');
      return;
    }
    // 创建一个隐藏的a标签来触发下载
    const link = document.createElement('a');
    link.href = file.url;
    link.download = file.name;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success(`正在下载 ${file.name}`);
  };

  const renderColumn = (user: User) => {
    const userLogs = logs.filter(l => l.userId === user.id);
    const isCurrent = user.isCurrent;

    return (
      <div 
        key={user.id}
        ref={isCurrent ? currentUserColRef : null}
        className={`w-[340px] shrink-0 flex flex-col h-[calc(100vh-170px)] rounded-xl relative transition-all
          ${isCurrent ? 'bg-white border-2 border-emerald-400 shadow-md' : 'bg-zinc-50/80 border border-zinc-200 opacity-90 hover:opacity-100'}
        `}
      >
        {/* 当前视窗标签 */}
        {isCurrent && (
          <div className="absolute top-0 right-0 bg-emerald-400 text-white text-[10px] px-2 py-1 rounded-bl-lg rounded-tr-xl font-medium z-10 shadow-sm">
            我的工作台
          </div>
        )}

        {/* 用户信息头部 */}
        <div className="p-5 border-b border-zinc-100 shrink-0 bg-white rounded-t-xl">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="w-10 h-10 rounded-full object-cover bg-zinc-100"
                />
                <div className={`absolute bottom-0 right-0 w-3 h-3 border-2 border-white rounded-full ${isCurrent ? 'bg-emerald-500' : 'bg-zinc-400'}`}></div>
              </div>
              <div>
                <h3 className="font-bold text-zinc-900 text-base">{user.name}</h3>
                <p className="text-xs text-zinc-500 mt-0.5">{user.role}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-[10px] text-zinc-500 font-medium mb-1">本月更新</div>
              <div className="font-bold text-lg text-zinc-800 leading-none">
                {user.updateCount} <span className="text-xs font-normal text-zinc-500">篇</span>
              </div>
            </div>
          </div>

          <button 
            onClick={() => openReportModal(user)}
            className={`w-full py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors
              ${isCurrent 
                ? 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-sm' 
                : 'bg-zinc-100 border border-zinc-200 text-zinc-400 cursor-not-allowed hover:bg-zinc-100'}
            `}
            title={!isCurrent ? "无法生成他人的月报" : ""}
          >
            <FileDown className="w-4 h-4" /> 生成月报
          </button>
        </div>

        {/* 日志列表 (内部滚动) */}
        <div className={`flex-1 overflow-y-auto p-4 space-y-4 rounded-b-xl scroll-smooth
          ${isCurrent ? 'bg-zinc-50/50' : 'bg-transparent'}
        `}>
          {userLogs.map((log, index) => (
            <div 
              key={log.id || index} 
              className={`p-4 rounded-xl border transition-shadow
                ${isCurrent 
                  ? 'bg-white border-zinc-200 shadow-sm hover:shadow-md' 
                  : 'bg-white/60 border-zinc-200 opacity-80'}
              `}
              onClick={() => {
                if (!isCurrent) {
                  toast.error('您没有权限查看或编辑他人的日志详情');
                }
              }}
            >
              
              <div className="text-xs text-zinc-500 flex items-center gap-1.5 mb-2.5">
                <Clock className="w-3.5 h-3.5" />
                {new Date(log.dateTime).toLocaleString('zh-CN', {
                  month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit'
                })}
              </div>

              <div className="flex flex-wrap gap-1.5 mb-3">
                {log.tags && log.tags.map((tag, idx) => (
                  <span key={idx} className="text-xs text-zinc-600 bg-zinc-100 px-2 py-1 rounded-md flex items-center gap-1">
                    <Tag className="w-3 h-3 text-zinc-400" /> {tag}
                  </span>
                ))}
              </div>

              <p className={`text-sm leading-relaxed mb-4 ${isCurrent ? 'text-zinc-800' : 'text-zinc-600'}`}>
                {log.content}
              </p>

              {log.deliverables && log.deliverables.length > 0 && (
                <div className="pt-3 border-t border-dashed border-zinc-200">
                  <div className="text-xs text-zinc-500 flex items-center gap-1.5 mb-2.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    交付物 ({log.deliverables.length})
                  </div>
                  <div className="space-y-2">
                    {log.deliverables.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 group">
                        <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold tracking-wide ${getDeliverableStyle(item.type)}`}>
                          {item.type}
                        </span>
                        <span className="text-xs text-zinc-700 truncate font-medium flex-1">{item.name}</span>
                        {item.url && (
                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={(e) => handlePreview(item, e)}
                              className="p-1 hover:bg-zinc-100 rounded transition-colors"
                              title="预览"
                            >
                              <Eye className="w-3.5 h-3.5 text-zinc-600" />
                            </button>
                            <button
                              onClick={(e) => handleDownload(item, e)}
                              className="p-1 hover:bg-zinc-100 rounded transition-colors"
                              title="下载"
                            >
                              <Download className="w-3.5 h-3.5 text-zinc-600" />
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}

          {userLogs.length === 0 && (
            <div className="flex flex-col items-center justify-center py-10 text-zinc-400">
              <FileText className="w-8 h-8 mb-2 opacity-20" />
              <p className="text-sm">暂无日志记录</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  if (loading) return <div className="flex h-screen items-center justify-center">加载中...</div>;

  return (
    <div className="flex flex-col h-screen w-full bg-[#f8fafc] font-sans overflow-hidden">
      {/* 顶部全局导航 */}
      <TopNav
        userName={users.find(u => u.isCurrent)?.name}
        userAvatar={users.find(u => u.isCurrent)?.avatar}
      />

      {/* 页面标题区 */}
      <header className="px-8 py-6 shrink-0 bg-[#f8fafc] flex items-center justify-between z-10">
        <div>
          <div className="flex items-center gap-3 mb-1.5">
            <LayoutDashboard className="w-6 h-6 text-emerald-500" />
            <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">工作日志看板</h1>
            <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded-full text-xs font-semibold border border-emerald-100">
              团队概览
            </span>
          </div>
          <p className="text-sm text-zinc-500">查看团队成员的每日工作进展与交付成果。您只能操作您自己的列。</p>
        </div>
        <button 
          onClick={() => navigate('/create')}
          className="flex items-center gap-2 bg-emerald-500 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-emerald-600 shadow-sm transition-all hover:shadow hover:-translate-y-0.5"
        >
          <Edit2 className="w-4 h-4" /> 写工作日志
        </button>
      </header>

      {/* 看板主体区域 (横向滚动) */}
      <main 
        ref={scrollContainerRef}
        className="flex-1 overflow-x-auto px-8 pb-8 flex gap-6 items-start scroll-smooth"
      >
        {users.map(renderColumn)}
      </main>

      {/* 生成月报弹窗 */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
            onClick={() => setIsModalOpen(false)}
          ></div>
          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-zinc-100 flex items-center justify-between bg-white">
              <h2 className="text-lg font-bold text-zinc-900 flex items-center gap-2">
                <FileDown className="w-5 h-5 text-emerald-500" />
                生成工作月报 - {targetUser?.name}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 rounded-md transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6 bg-white">
              {modalError && (
                <div className="flex items-start gap-2 text-red-600 bg-red-50 p-3 rounded-lg text-sm border border-red-100">
                  <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                  <p>{modalError}</p>
                </div>
              )}

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-zinc-700">日志开始时间</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm bg-white transition-shadow"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-zinc-700">日志结束时间</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm bg-white transition-shadow"
                  />
                </div>
              </div>
            </div>

            <div className="p-5 border-t border-zinc-100 bg-zinc-50 flex justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-200 bg-zinc-100 rounded-lg transition-colors border border-transparent"
              >
                取消
              </button>
              <button
                onClick={handleGenerateReport}
                className="px-4 py-2 text-sm font-medium text-white bg-emerald-500 hover:bg-emerald-600 rounded-lg transition-colors shadow-sm"
              >
                确认生成
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 文件预览弹窗 */}
      {showPreview && previewFile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setShowPreview(false)}
          ></div>
          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-4 border-b border-zinc-200 flex items-center justify-between bg-white sticky top-0 z-10">
              <div className="flex items-center gap-3">
                <span className={`text-[10px] px-2 py-1 rounded font-bold tracking-wide ${getDeliverableStyle(previewFile.type)}`}>
                  {previewFile.type}
                </span>
                <h2 className="text-base font-bold text-zinc-900">{previewFile.name}</h2>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => handleDownload(previewFile, e)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                >
                  <Download className="w-4 h-4" />
                  下载
                </button>
                <button
                  onClick={() => setShowPreview(false)}
                  className="p-1.5 text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 rounded-md transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6 overflow-auto max-h-[calc(90vh-80px)] bg-zinc-50">
              {previewFile.url && (
                <div className="bg-white rounded-lg shadow-sm border border-zinc-200 overflow-hidden">
                  {previewFile.type === 'DESIGN' || previewFile.name.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i) ? (
                    <img
                      src={previewFile.url}
                      alt={previewFile.name}
                      className="w-full h-auto"
                    />
                  ) : previewFile.name.match(/\.pdf$/i) ? (
                    <iframe
                      src={previewFile.url}
                      className="w-full h-[70vh]"
                      title={previewFile.name}
                    />
                  ) : (
                    <div className="p-8 text-center">
                      <FileText className="w-16 h-16 text-zinc-300 mx-auto mb-4" />
                      <p className="text-sm text-zinc-600 mb-4">该文件类型暂不支持在线预览</p>
                      <button
                        onClick={(e) => handleDownload(previewFile, e)}
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-emerald-500 hover:bg-emerald-600 rounded-lg transition-colors"
                      >
                        <Download className="w-4 h-4" />
                        下载文件
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
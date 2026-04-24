import React, { useState, useRef, useEffect } from 'react';
import {
  Clock,
  CircleCheck,
  FileOutput,
  Tag,
  Download,
} from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate, useOutletContext } from 'react-router';
import { supabase } from '../App';
import { TopNav } from './TopNav';
import { DateRangeModal } from './DateRangeModal';



interface Deliverable {
  type: 'CODE' | 'DOC' | 'DESIGN';
  name: string;
  url?: string;
}

interface WorkTag {
  name: string;
  color: string;
}

interface WorkItem {
  id: string;
  category: string;
  description: string;
  deliverables: Deliverable[];
  color: string;
}

interface Log {
  id: string;
  userId: string;
  dateTime: string;
  content: string;
  tags: WorkTag[];
  deliverables: Deliverable[];
  workItems?: WorkItem[];
  notes?: string;
  createdAt?: string;
  updated_at?: string;
}

interface User {
  id: string;
  name: string;
  role: string;
  isCurrent: boolean;
  avatar: string;
  updateCount: number;
}



export function WorkLogBoard() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<any>(null);

  const [users, setUsers] = useState<User[]>([]);
  const [logs, setLogs] = useState<Log[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDateRangeModalOpen, setIsDateRangeModalOpen] = useState(false);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const currentUserColRef = useRef<HTMLDivElement>(null);

  const handleGenerateMonthlyReport = (startDate: string, endDate: string) => {
    navigate(`/monthly-report-detail?startDate=${startDate}&endDate=${endDate}`);
  };

const getFileSizeFromURL = async (url: string) => {
  try {
    const res = await fetch(url, { method: 'HEAD' });
    const len = res.headers.get('content-length');
    if (!len) return '未知大小';

    const size = parseInt(len);
    if (size < 1024) return size + ' B';
    else if (size < 1024 * 1024) return (size / 1024).toFixed(1) + ' KB';
    else return (size / 1024 / 1024).toFixed(1) + ' MB';
  } catch (e) {
    return '未知大小';
  }
};

const handleDownloadFile = async (url: string, fileName: string) => {
  try {
    toast.loading('正在下载文件...', { id: 'download' });
    
    const response = await fetch(url);
    const blob = await response.blob();
    
    const blobUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = fileName || '下载文件';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(blobUrl);
    
    toast.success('下载成功', { id: 'download' });
  } catch (error) {
    console.error('下载失败:', error);
    toast.error('下载失败，请重试', { id: 'download' });
  }
};


  // 获取所有日志
  const fetchAllLogs = async () => {
    try {
      const { data, error } = await supabase
        .from('work_logs')
        .select(`
          *,
          work_items (
            id, 
            category, 
            description, 
            sort_order,
            deliverables(*)
          )
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('获取日志失败:', error);
        return [];
      }

      console.log('获取到的日志数据:', data); // 添加调试信息

      return data.map(log => {
        // 提取工作事项标签（按照 sort_order 排序）
        const sortedWorkItems = log.work_items?.sort((a: any, b: any) => a.sort_order - b.sort_order) || [];
        
        // 为不同标签分配颜色
        const getTagColor = (tagName: string) => {
          const colorMap: { [key: string]: string } = {
            '功能开发': '#3b82f6',
            'UI重构': '#10b981',
            'Bug修复': '#ef4444',
            '会议': '#f59e0b',
            '视觉设计': '#8b5cf6',
            '规范制定': '#06b6d4'
          };
          return colorMap[tagName] || '#6b7280'; // 默认颜色
        };
        
        // 处理工作事项数据，包括标签、描述和交付物
        const workItemsWithData = sortedWorkItems.map((item: any) => {
          // 提取交付结果（每个工作事项自己的交付物）
          const itemDeliverables = item.deliverables?.map((deliverable: any) => ({
            type: deliverable.type.toUpperCase(),
            name: deliverable.name,
            url: deliverable.url
          })) || [];
          
          // 提取工作描述
          const tempDiv = document.createElement('div');
          tempDiv.innerHTML = item.description;
          const textContent = tempDiv.textContent || tempDiv.innerText || '';
          
          return {
            id: item.id,
            category: item.category,
            description: textContent.trim(),
            deliverables: itemDeliverables,
            color: getTagColor(item.category)
          };
        });
        
        // 从工作事项中提取标签
        const workItemTags = workItemsWithData.map(item => ({
          name: item.category,
          color: item.color
        }));
        
        // 从工作事项中提取描述，合并为日志内容
        const workItemDescriptions = workItemsWithData.map(item => 
          `${item.category}: ${item.description}`
        ).join('\n');
        
        // 确保返回对象包含所有必要字段
        return {
          id: log.id,
          userId: log.user_id,
          dateTime: log.date,
          content: workItemDescriptions || log.content || log.notes, // 优先使用工作事项描述
          deliverables: workItemsWithData.flatMap(item => item.deliverables), // 所有交付物（用于整体显示）
          workItems: workItemsWithData, // 包含每个工作事项的详细数据
          tags: workItemTags,
          notes: log.notes || '', // 确保 notes 字段存在，默认为空字符串
          createdAt: log.created_at,
          updated_at: log.updated_at, // 添加 updated_at 字段，用于显示更新时间
        };
      });
    } catch (e) {
      console.error(e);
      return [];
    }
  };

  useEffect(() => {
    const init = async () => {
      // 获取当前用户
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user) {
        console.error('获取用户信息失败:', userError);
        setLoading(false);
        return;
      }

      setCurrentUser(user);
      console.log('当前用户 ID:', user.id);

      const logList = await fetchAllLogs();
      console.log('获取到的日志列表:', logList);

      // 如果没有实际数据，添加模拟数据以展示设计效果
      if (logList.length === 0) {
        const mockLogs: Log[] = [
          {
            id: '1',
            userId: user.id,
            dateTime: new Date().toISOString(),
            content: '完成了日志看板页面的五列响应式布局开发，重构了部分公共组件库以支持更灵活的参数配置。修复了在特定分辨率下头部导航栏不对齐的问题。',
            tags: [
              { name: '功能开发', color: '#3b82f6' },
              { name: 'UI重构', color: '#10b981' }
            ],
            deliverables: [
              { type: 'CODE', name: 'Dashboard.tsx 代码提交' },
              { type: 'DOC', name: 'UI重构设计评审记录' }
            ]
          },
          {
            id: '2',
            userId: user.id,
            dateTime: new Date(Date.now() - 86400000).toISOString(),
            content: '排查并修复了月报导出时数据缺失的严重Bug。下午参与了第三季度需求规划会议，确定了下阶段的重点迭代方向。',
            tags: [
              { name: 'Bug修复', color: '#ef4444' },
              { name: '会议', color: '#f59e0b' }
            ],
            deliverables: [
              { type: 'DOC', name: 'Bug修复文档' }
            ]
          },
          {
            id: '3',
            userId: 'user-2',
            dateTime: new Date(Date.now() - 172800000).toISOString(),
            content: '输出了V2.0版本的全局设计规范文档，统一了系统中的色彩、阴影和字体层级。完成了项目配置页面的高保真设计稿。',
            tags: [
              { name: '视觉设计', color: '#8b5cf6' },
              { name: '规范制定', color: '#06b6d4' }
            ],
            deliverables: [
              { type: 'DESIGN', name: 'V2.0 视觉规范.fig' },
              { type: 'DESIGN', name: '配置页面高保真' }
            ]
          }
        ];

        const mockUsers: User[] = [
          {
            id: user.id,
            name: user.user_metadata?.name || user.email?.split('@')[0] || '我',
            role: '前端开发工程师',
            isCurrent: true,
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.id}`,
            updateCount: 21
          },
          {
            id: 'user-2',
            name: '娄江华',
            role: 'UI/UX 设计师',
            isCurrent: false,
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=designer`,
            updateCount: 18
          },
          {
            id: 'user-3',
            name: '牟昊天',
            role: '后端开发工程师',
            isCurrent: false,
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=backend`,
            updateCount: 15
          }
        ];

        setLogs(mockLogs);
        setUsers(mockUsers);
      } else {
        setLogs(logList);
        
        // 从用户表中获取所有用户信息
        const { data: allUsers, error: usersError } = await supabase
          .from('users')
          .select('id, name, role');
        console.log('从用户表获取到的用户:', allUsers, '错误:', usersError);
        
        // 从日志中提取所有用户 ID
        const userIds = new Set<string>();
        logList.forEach(log => userIds.add(log.userId));
        console.log('从日志中提取到的用户 ID:', Array.from(userIds));
        
        // 确保当前用户在集合中
        userIds.add(user.id);
        
        // 构建用户列表
        const userList: User[] = [];
        
        // 先添加当前用户
        userList.push({
          id: user.id,
          name: user.user_metadata?.name || user.email?.split('@')[0] || '我',
          role: '当前用户',
          isCurrent: true,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.id}`,
          updateCount: logList.filter(l => l.userId === user.id).length,
        });
        
        // 添加其他用户
        userIds.forEach(uid => {
          if (uid !== user.id) {
            // 尝试从用户表中获取用户信息
            let userName = `用户 ${uid.slice(-4)}`;
            let userRole = '团队成员';
            
            if (allUsers) {
              const userInfo = allUsers.find(u => u.id === uid);
              if (userInfo) {
                userName = userInfo.name || userName;
                userRole = userInfo.role || userRole;
              }
            }
            
            userList.push({
              id: uid,
              name: userName,
              role: userRole,
              isCurrent: false,
              avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${uid}`,
              updateCount: logList.filter(l => l.userId === uid).length,
            });
          }
        });
        
        setUsers(userList);
        console.log('构建的用户列表:', userList);
      }

      setLoading(false);
    };

    init();
  }, []);

  const renderColumn = (user: User) => {
    const userLogs = logs.filter(l => l.userId === user.id);
    const isCurrent = user.isCurrent;

    return (
      <div
        key={user.id}
        ref={isCurrent ? currentUserColRef : null}
        className={`w-[320px] flex-shrink-0 rounded-2xl border ${isCurrent ? 'border-[#1ABC9C]/30 shadow-md' : 'border-[#dee1e6] shadow-sm'} bg-white flex flex-col h-fit max-h-[1200px]`}
      >
        {/* Member Header */}
        <div className="p-5 bg-[#fafafb]/30 rounded-t-2xl border-b border-[#dee1e6] relative">
          {isCurrent && (
            <div className="absolute top-0 right-4 bg-[#1ABC9C] text-[#19191F] text-[10px] font-bold px-2 py-0.5 rounded-b-lg uppercase tracking-wider">
              当前视窗
            </div>
          )}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-12 h-12 rounded-full overflow-hidden shadow-sm">
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#2ECC71] border-2 border-white rounded-full"></div>
              </div>
              <div>
                <h3 className="font-semibold text-base">{user.name}</h3>
                <p className="text-[12px] text-[#565d6d]">{user.role}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-semibold text-[#565d6d] uppercase tracking-wider">本月更新</p>
              <p className="text-sm font-bold">
                {user.updateCount} <span className="text-[12px] font-normal text-[#565d6d]">篇</span>
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              if (!isCurrent) {
                toast.info('仅查看模式，无法操作');
                return;
              }
              setIsDateRangeModalOpen(true);
            }}
            className={`w-full py-2 rounded-md flex items-center justify-center gap-3 text-[12px] font-medium transition-colors ${isCurrent ? 'bg-[#1ABC9C] text-[#19191F] shadow-sm' : 'bg-white border border-[#dee1e6] text-[#171a1f] hover:bg-gray-50'}`}
          >
            <FileOutput className="w-3.5 h-3.5" />
            <span>生成月报</span>
          </button>
        </div>

        {/* Logs List */}
        <div className="p-4 flex flex-col gap-4 overflow-y-auto bg-[#fafafb]/10 rounded-b-2xl">
          {userLogs.map(log => (
            <div 
              key={log.id} 
              className="bg-white border border-[#dee1e6] rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => navigate(`/create?edit=${log.id}`)}
            >
              {/* 时间显示 */}
              <div className="flex items-center gap-2 bg-[#f3f4f6]/50 px-2 py-1 rounded-md w-fit mb-3">
                <Clock className="w-3.5 h-3.5 text-[#565d6d]" />
                <span className="text-[12px] font-medium text-[#565d6d]">
                  {new Date(log.dateTime).toISOString().slice(0, 10)} · 
                  {(() => {
                    try {
                      // 优先使用更新时间，没有则使用创建时间
                      const timeToUse = log.updated_at || log.created_at;
                      if (timeToUse) {
                        return new Date(timeToUse).toISOString().slice(11, 16);
                      }
                      return '00:00'; // 默认为 00:00
                    } catch (error) {
                      console.error('时间处理错误:', error);
                      return '00:00'; // 出错时默认为 00:00
                    }
                  })()}
                </span>
              </div>
              
              {/* 工作事项列表 */}
              <div className="space-y-4 mb-4">
                {log.workItems && log.workItems.length > 0 ? (
                  // 显示工作事项
                  log.workItems.map((workItem, tIdx) => (
                    <div key={workItem.id} className="space-y-2">
                      {/* 工作事项标题 */}
                      <div className="bg-[#F3F4F6] px-3 py-1.5 rounded-md">
                      <span className="text-[12px] font-medium text-[#565D6D]">事项{tIdx + 1}：{workItem.category}</span>
                    </div>
                      
                      {/* 工作描述 */}
                      <p className="text-sm leading-relaxed text-[#171a1f]">
                        {workItem.description}
                      </p>
                      
                      {/* 交付结果 - 只在有交付物时显示 */}
                      {workItem.deliverables && workItem.deliverables.length > 0 && (
                        <div className="pt-2 space-y-2">
                          <div className="flex items-center gap-2">
                            <CircleCheck className="w-3.5 h-3.5 text-[#565d6d]" />
                            <span className="text-[12px] font-medium text-[#565d6d]">交付物 ({workItem.deliverables.length})</span>
                          </div>
                          <div className="space-y-1.5">
                            {/* 对交付物进行排序：有链接的排在前面，没有链接的排在后面 */}
                            {workItem.deliverables
                              .sort((a, b) => {
                                // 有链接的排在前面
                                if (a.url && !b.url) return -1;
                                if (!a.url && b.url) return 1;
                                return 0;
                              })
                              .map((item, dIdx) => (
                                <div key={dIdx} className="flex items-center gap-3 bg-[#fafafb] p-2 rounded-md">
                                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${item.type === 'CODE' ? 'bg-[#DCFCE7] text-[#15803D]' : item.type === 'DOC' ? 'bg-[#DBEAFE] text-[#1D4ED8]' : 'bg-[#F3E8FF] text-[#7E22CE]'} tracking-wider`}>
                                    {item.type}
                                  </span>
                                  <span className="text-[12px] font-medium truncate flex-1">{item.name}</span>
                                  {item.url && (
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleDownloadFile(item.url!, item.name);
                                      }}
                                      className="text-[#1ABC9C] hover:text-[#16a085] transition-colors"
                                      title="下载"
                                    >
                                      <Download className="w-3 h-3" />
                                    </button>
                                  )}
                                </div>
                              ))}
                          </div>
                        </div>
                      )}
                      
                      {/* 灰色横线分隔符 - 除了最后一个工作事项 */}
                      {tIdx < (log.workItems.length - 1) && (
                        <div className="border-t border-gray-200 my-3"></div>
                      )}
                    </div>
                  ))
                ) : (
                  // 如果没有工作事项，显示 log.content
                  <p className="text-sm leading-relaxed text-[#171a1f]">
                    {log.content}
                  </p>
                )}
              </div>
              
              {/* 重点说明 */}
              {log.notes && log.notes.trim() && (
                <div className="mt-4 pt-4 border-t border-gray-200 bg-[#F0FDF4] p-3 rounded-md">
                  <div className="flex items-center gap-2 mb-2">
                    <FileOutput className="w-3.5 h-3.5 text-[#15803D]" />
                    <span className="text-sm font-medium text-[#15803D]">重点说明</span>
                  </div>
                  <p className="text-sm leading-relaxed text-[#171a1f]">
                    {log.notes}
                  </p>
                </div>
              )}
            </div>
          ))}

          {userLogs.length === 0 && (
            <div className="text-center py-10 text-[#565d6d]">
              <p className="text-sm">暂无日志</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  if (loading) return <div className="flex h-screen items-center justify-center">加载中...</div>;

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-[#171a1f]">
      <TopNav
        userName={users.find(u => u.isCurrent)?.name}
        userAvatar={users.find(u => u.isCurrent)?.avatar}
      />

      <main className="flex-1 p-6 lg:px-16 lg:py-8 overflow-x-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl font-bold tracking-tight">工作日志看板</h1>
              <span className="px-2.5 py-0.5 bg-[#1ABC9C]/10 border border-[#1ABC9C]/20 rounded-full text-[12px] font-medium text-[#1ABC9C]">团队概览</span>
            </div>
            <p className="text-sm text-[#565d6d]">查看团队成员的每日工作进展与交付成果。</p>
          </div>
          <button
            onClick={() => navigate('/create')}
            className="bg-[#1ABC9C] text-[#19191F] px-5 py-2.5 rounded-md flex items-center justify-center gap-2 font-medium shadow-sm hover:bg-[#16a085] transition-colors w-full md:w-auto"
          >
            工作日志
          </button>
        </div>

        {/* Kanban Board */}
        <div className="flex gap-6 pb-8 min-w-max lg:min-w-0">
          {users.map(renderColumn)}
        </div>
      </main>

      <DateRangeModal
        open={isDateRangeModalOpen}
        onOpenChange={setIsDateRangeModalOpen}
        onConfirm={handleGenerateMonthlyReport}
      />
    </div>
  );
}
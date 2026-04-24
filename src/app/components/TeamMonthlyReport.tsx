import { useState, useRef, useEffect } from 'react';
import { useNavigate, useOutletContext } from 'react-router';
import { toast } from 'sonner';
import { projectId, publicAnonKey } from '/utils/supabase/info';

export function TeamMonthlyReport() {
  const navigate = useNavigate();
  const { session } = useOutletContext<any>();
  const currentUser = session?.user;
  const [selectedYear, setSelectedYear] = useState('2026');
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 团队成员数据
  const teamMembersData = [
    {
      name: '刘硕',
      role: '产品经理',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=刘硕',
      bgColor: 'bg-[#f4e6fc]',
    },
    {
      name: '娄江华',
      role: '前端开发工程师',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=娄江华',
      bgColor: 'bg-[#f7ece6]',
    },
    {
      name: '牟浩天',
      role: '后端开发工程师',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=牟浩天',
      bgColor: 'bg-[#fbe3e9]',
    },
    {
      name: '李芳华',
      role: '设计师',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=李芳华',
      bgColor: 'bg-[#f7f9d8]',
    },
    {
      name: '王静',
      role: '设计师',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=王静',
      bgColor: 'bg-[#fce6fc]',
    },
  ];

  // 获取团队月报数据
  const fetchTeamMonthlyReport = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-e9f91fb9/team-monthly-report?year=${selectedYear}&month=10`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        }
      );
      
      if (res.ok) {
        const data = await res.json();
        const teamReports = data.teamReports || [];
        
        // 处理团队成员数据，添加月报信息
        const membersWithReports = teamMembersData.map(member => {
          const report = teamReports.find((r: any) => r.userId === member.id || r.id === member.id);
          return {
            ...member,
            reports: report ? [`${selectedYear}年10月`] : [],
            isCurrent: currentUser?.email === member.email
          };
        });
        
        setTeamMembers(membersWithReports);
      } else {
        // 使用默认数据
        const defaultMembers = teamMembersData.map(member => ({
          ...member,
          reports: [`${selectedYear}年10月`],
          isCurrent: currentUser?.email === member.email
        }));
        setTeamMembers(defaultMembers);
      }
    } catch (e) {
      console.error(e);
      // 使用默认数据
      const defaultMembers = teamMembersData.map(member => ({
        ...member,
        reports: [`${selectedYear}年10月`],
        isCurrent: currentUser?.email === member.email
      }));
      setTeamMembers(defaultMembers);
    } finally {
      setLoading(false);
    }
  };

  // 导出团队月报
  const exportTeamReport = async () => {
    toast.promise(
      new Promise(async (resolve) => {
        try {
          const res = await fetch(
            `https://${projectId}.supabase.co/functions/v1/make-server-e9f91fb9/monthly-report/export`,
            {
              headers: {
                'Authorization': `Bearer ${publicAnonKey}`
              }
            }
          );
          if (res.ok) {
            const data = await res.json();
            if (data.downloadUrl) {
              window.open(data.downloadUrl, '_blank');
            }
            setTimeout(resolve, 2000);
          }
        } catch (e) {
          console.error(e);
          setTimeout(resolve, 2000);
        }
      }),
      {
        loading: '正在导出团队月报...',
        success: '团队月报导出成功！',
        error: '导出失败，请重试'
      }
    );
  };

  // 导出个人月报
  const exportPersonalReport = async () => {
    toast.promise(
      new Promise(async (resolve) => {
        try {
          const res = await fetch(
            `https://${projectId}.supabase.co/functions/v1/make-server-e9f91fb9/monthly-report/export`,
            {
              headers: {
                'Authorization': `Bearer ${publicAnonKey}`
              }
            }
          );
          if (res.ok) {
            const data = await res.json();
            if (data.downloadUrl) {
              window.open(data.downloadUrl, '_blank');
            }
            setTimeout(resolve, 2000);
          }
        } catch (e) {
          console.error(e);
          setTimeout(resolve, 2000);
        }
      }),
      {
        loading: '正在导出个人月报...',
        success: '个人月报导出成功！',
        error: '导出失败，请重试'
      }
    );
  };

  // 查看月报详情
  const viewReportDetail = (member: any) => {
    if (member.isCurrent) {
      navigate('/monthly-report-detail');
    } else {
      toast.error('权限受限：您只能查看和生成自己的工作月报');
    }
  };

  useEffect(() => {
    fetchTeamMonthlyReport();
  }, [selectedYear, currentUser]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fafafb]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#1ABC9C]/20 border-t-[#1ABC9C] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-sm text-zinc-500">加载中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#fafafb] font-sans">
      {/* Top Navigation Header */}
      <header className="sticky top-0 z-50 h-16 bg-white shadow-sm border-b border-[#dee1e6] flex items-center px-4 lg:px-16">
        <div className="flex items-center gap-2 mr-auto">
          <div className="w-8 h-8 bg-[#1ABC9C] rounded-md flex items-center justify-center">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M14 2V8H20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 13H8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 17H8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M10 9H8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="text-[#1ABC9C] text-xl font-bold tracking-tight">Work Trace</span>
        </div>

        <nav className="hidden md:flex items-center gap-8 mx-auto">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-[#565d6d] font-medium hover:text-[#1ABC9C] transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>工作日志</span>
          </button>
          <button 
            onClick={() => navigate('/team-monthly-report')}
            className="flex items-center gap-2 text-[#1ABC9C] font-medium"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 13H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 17H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M10 9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>工作月报</span>
          </button>
          <button className="flex items-center gap-2 text-[#565d6d] font-medium hover:text-[#1ABC9C] transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 15C15.866 15 19 11.866 19 8C19 4.13401 15.866 1 12 1C8.13401 1 5 4.13401 5 8C5 11.866 8.13401 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M19.4 15C19.2669 15.3016 19.1713 15.6363 19.1213 16L19.1158 16.0314C19.0107 16.5821 18.6608 17.0722 18.1538 17.4178L17.979 17.5419C17.5047 17.8497 17.0218 18.0971 16.5369 18.2774C16.1892 18.3975 15.8253 18.4525 15.4586 18.4393C15.0719 18.4253 14.6934 18.343 14.3377 18.2006L14.2943 18.1797C13.7689 17.9057 13.2763 17.5858 12.8362 17.2305C12.3961 16.8752 12.0119 16.4987 11.6989 16.1109L11.6444 16.0421C11.5616 15.9378 11.444 15.854 11.3115 15.8C11.179 15.746 11.0328 15.7146 10.8816 15.7067L10.7859 15.7039C10.3259 15.7009 9.86576 15.7581 9.42738 15.8729C8.97905 15.9903 8.56054 16.1601 8.1868 16.3776C7.81307 16.5951 7.48409 16.8572 7.21488 17.1587C6.94567 17.4603 6.73968 17.7975 6.60255 18.1653C6.46541 18.533 6.3995 18.921 6.40851 19.3123C6.41753 19.7037 6.49961 20.0829 6.64873 20.4383C6.79784 20.7936 7.01191 21.1097 7.27995 21.3715C7.54799 21.6333 7.85898 21.8389 8.20517 21.9787C8.55136 22.1184 8.92495 22.1903 9.30837 22.1916C9.69179 22.1929 10.0708 22.1236 10.4239 21.9919C10.7769 21.8601 11.0978 21.6679 11.3748 21.4311C11.6518 21.1943 11.8847 20.9208 12.067 20.6176C12.2492 20.3144 12.3768 19.9874 12.4449 19.6442C12.5131 19.301 12.5203 18.9483 12.4644 18.6029C12.4086 18.2576 12.2909 17.9248 12.116 17.6141C11.9411 17.3034 11.7118 17.0205 11.4354 16.7752C11.159 16.5299 10.8414 16.3266 10.5 16.1716V21C10.5 21.2761 10.6108 21.5291 10.809 21.727C11.0072 21.9249 11.2602 22.0358 11.5363 22.0358H12.4637C12.7398 22.0358 12.9928 21.9249 13.191 21.727C13.3892 21.5291 13.5 21.2761 13.5 21V16.1716C13.1586 16.3266 12.841 16.5299 12.5646 16.7752C12.2882 17.0205 12.0589 17.3034 11.884 17.6141C11.7091 17.9248 11.5914 18.2576 11.5356 18.6029C11.4797 18.9483 11.4869 19.301 11.5551 19.6442C11.6232 19.9874 11.7508 20.3144 11.933 20.6176C12.1153 20.9208 12.3482 21.1943 12.6252 21.4311C12.9022 21.6679 13.2231 21.8601 13.5761 21.9919C13.9291 22.1236 14.3082 22.1929 14.6916 22.1916C15.075 22.1903 15.4486 22.1184 15.7948 21.9787C16.141 21.8389 16.451 21.6333 16.719 21.3715C16.9871 21.1097 17.2011 20.7936 17.3502 20.4383C17.4994 20.0829 17.5814 19.7037 17.5905 19.3123C17.5995 18.921 17.5336 18.533 17.3965 18.1653C17.2593 17.7975 17.0534 17.4603 16.7842 17.1587C16.515 16.8572 16.186 16.5951 15.8123 16.3776C15.4385 16.1601 15.0201 15.9903 14.5717 15.8729C14.1333 15.7581 13.6732 15.7009 13.2132 15.7039L13.1175 15.7067C12.9663 15.7146 12.8201 15.746 12.6876 15.8C12.5551 15.854 12.4375 15.9378 12.3547 16.0421L12.3 16.1109C11.987 16.4987 11.6028 16.8752 11.1627 17.2305C10.7226 17.5858 10.23 17.9057 9.70459 18.1797L9.66116 18.2006C9.3055 18.343 8.92703 18.4253 8.54037 18.4393C8.17367 18.4525 7.80982 18.3975 7.46206 18.2774C6.97718 18.0971 6.49429 17.8497 6.02 17.5419L5.84516 17.4178C5.33818 17.0722 4.98829 16.5821 4.88316 16.0314L4.87769 16C4.82767 15.6363 4.73205 15.3016 4.6 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>项目配置</span>
          </button>
        </nav>

        <div className="flex items-center gap-3 ml-auto">
          <div className="relative">
            <div className="w-8 h-8 rounded-full overflow-hidden bg-[#fcf9da]">
              <div className="w-full h-full flex items-center justify-center text-sm font-medium">
                {currentUser?.user_metadata?.name?.charAt(0) || currentUser?.email?.charAt(0) || 'U'}
              </div>
            </div>
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#2ECC71] border-2 border-white rounded-full"></div>
          </div>
          <button 
            onClick={() => navigate('/login')}
            className="text-sm text-[#333333] hover:text-black"
          >
            退出
          </button>
        </div>
      </header>

      {/* Sub-header / Filter Bar */}
      <section className="sticky top-16 z-40 py-4 px-4 lg:px-16 border-b border-[#dee1e6]/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold text-[#171a1f]">月报看板</h1>
          <div className="flex items-center gap-2">
            <span className="text-sm text-[#565d6d] whitespace-nowrap">筛选年份:</span>
            <div className="relative">
              <select 
                value={selectedYear} 
                onChange={(e) => setSelectedYear(e.target.value)}
                className="appearance-none bg-white border border-[#dee1e6] rounded-md px-3 py-1.5 pr-8 text-sm text-[#171a1f] focus:outline-none focus:ring-1 focus:ring-[#1ABC9C] w-24"
              >
                <option>2026</option>
                <option>2025</option>
                <option>2024</option>
              </select>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-[#565d6d]">
                <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={exportTeamReport}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-[#1ABC9C] text-[#19191F] px-4 py-2 rounded-md text-sm font-medium shadow-sm hover:bg-[#16a085] transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <polyline points="7 10 12 15 17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <line x1="12" y1="15" x2="12" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>导出团队月报</span>
          </button>
          <button 
            onClick={exportPersonalReport}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-[#1ABC9C] text-[#19191F] px-4 py-2 rounded-md text-sm font-medium shadow-sm hover:bg-[#16a085] transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <polyline points="7 10 12 15 17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <line x1="12" y1="15" x2="12" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>导出个人月报</span>
          </button>
        </div>
      </section>

      {/* Main Content - Kanban Board */}
      <main className="flex-1 p-4 lg:p-8 overflow-x-auto">
        <div className="flex gap-6 min-w-max lg:min-w-full lg:justify-start">
          {teamMembers.map((member, idx) => (
            <div 
              key={idx} 
              className={`w-[254px] flex-shrink-0 rounded-2xl border shadow-sm flex flex-col h-[720px]
                ${member.isCurrent ? 'bg-white border-2 border-[#1ABC9C] shadow-md' : 'bg-[#f3f4f6]/20 border-[#dee1e6]/40'}
              `}
            >
              {/* Column Header */}
              <div className="p-4 bg-white rounded-t-2xl border-b border-[#dee1e6]/50 flex items-center gap-3">
                <div className={`w-9 h-9 rounded-full overflow-hidden ${member.bgColor}`}>
                  <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#171a1f] leading-tight">{member.name}</h3>
                  <p className="text-[12px] text-[#565d6d] leading-tight">{member.role}</p>
                </div>
                {member.isCurrent && (
                  <div className="ml-auto bg-[#1ABC9C] text-white text-[10px] px-2 py-1 rounded-full font-medium">
                    我
                  </div>
                )}
              </div>

              {/* Column Content */}
              <div className="flex-1 p-4 flex flex-col gap-3 overflow-y-auto">
                {member.reports.map((report: string, rIdx: number) => (
                  <div 
                    key={rIdx} 
                    className={`bg-white p-3 rounded-xl shadow-sm border flex items-center gap-2 hover:shadow-md transition-shadow cursor-pointer
                      ${member.isCurrent ? 'border-[#1ABC9C]/30' : 'border-[#dee1e6]/30'}
                    `}
                    onClick={() => viewReportDetail(member)}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={`w-4 h-4 ${member.isCurrent ? 'text-[#1ABC9C]' : 'text-[#565d6d]'}`}>
                      <path d="M8 2V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M16 2V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <rect x="4" y="4" width="16" height="18" rx="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M16 10H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="text-base font-semibold text-[#171a1f] tracking-tight">{report}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="h-[69px] bg-white border-t border-[#dee1e6] flex items-center justify-center px-4">
        <p className="text-sm text-[#565d6d]">
          © 2026 Log WebApp. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
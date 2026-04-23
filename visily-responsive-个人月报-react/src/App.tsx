import { Icon } from '@iconify/react';

export default function App() {
  const teamMembers = [
    {
      name: '刘硕',
      role: '产品经理',
      avatar: './assets/IMG_8.jpeg',
      bgColor: 'bg-[#f4e6fc]',
      reports: ['2023年10月'],
    },
    {
      name: '娄江华',
      role: '前端开发工程师',
      avatar: './assets/IMG_10.jpeg',
      bgColor: 'bg-[#f7ece6]',
      reports: ['2023年10月'],
    },
    {
      name: '牟浩天',
      role: '后端开发工程师',
      avatar: './assets/IMG_11.jpeg',
      bgColor: 'bg-[#fbe3e9]',
      reports: ['2023年10月'],
    },
    {
      name: '李芳华',
      role: '设计师',
      avatar: './assets/IMG_12.jpeg',
      bgColor: 'bg-[#f7f9d8]',
      reports: ['2023年10月'],
    },
    {
      name: '王静',
      role: '设计师',
      avatar: './assets/IMG_13.jpeg',
      bgColor: 'bg-[#fce6fc]',
      reports: ['2023年10月'],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#fafafb] font-sans">
      {/* Top Navigation Header */}
      <header className="sticky top-0 z-50 h-16 bg-white shadow-sm border-b border-[#dee1e6] flex items-center px-4 lg:px-16">
        <div className="flex items-center gap-2 mr-auto">
          <div className="w-8 h-8 bg-[#1ABC9C] rounded-md flex items-center justify-center">
            <img src="./assets/IMG_5.svg" alt="Logo" className="w-[22px] h-[22px]" />
          </div>
          <span className="text-[#1ABC9C] text-xl font-bold tracking-tight">Work Trace</span>
        </div>

        <nav className="hidden md:flex items-center gap-8 mx-auto">
          <button className="flex items-center gap-2 text-[#1ABC9C] font-medium">
            <img src="./assets/IMG_2.svg" alt="Dashboard" className="w-4 h-4" />
            <span>工作日志</span>
          </button>
          <button className="flex items-center gap-2 text-[#565d6d] font-medium hover:text-[#1ABC9C] transition-colors">
            <img src="./assets/IMG_3.svg" alt="Monthly Report" className="w-4 h-4" />
            <span>工作月报</span>
          </button>
          <button className="flex items-center gap-2 text-[#565d6d] font-medium hover:text-[#1ABC9C] transition-colors">
            <img src="./assets/IMG_4.svg" alt="Settings" className="w-4 h-4" />
            <span>项目配置</span>
          </button>
        </nav>

        <div className="flex items-center gap-3 ml-auto">
          <div className="relative">
            <div className="w-8 h-8 rounded-full overflow-hidden bg-[#fcf9da]">
              <img src="./assets/IMG_1.jpeg" alt="User Avatar" className="w-full h-full object-cover" />
            </div>
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#2ECC71] border-2 border-white rounded-full"></div>
          </div>
          <button className="text-sm text-[#333333] hover:text-black">退出</button>
          {/* Mobile Menu Toggle */}
          <button className="md:hidden ml-2">
            <Icon icon="lucide:menu" className="w-6 h-6 text-[#565d6d]" />
          </button>
        </div>
      </header>

      {/* Sub-header / Filter Bar */}
      <section className="glass-effect sticky top-16 z-40 py-4 px-4 lg:px-16 border-b border-[#dee1e6]/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold text-[#171a1f]">月报看板</h1>
          <div className="flex items-center gap-2">
            <span className="text-sm text-[#565d6d] whitespace-nowrap">筛选年份:</span>
            <div className="relative">
              <select className="appearance-none bg-white border border-[#dee1e6] rounded-md px-3 py-1.5 pr-8 text-sm text-[#171a1f] focus:outline-none focus:ring-1 focus:ring-[#1ABC9C] w-24">
                <option>2026</option>
                <option>2025</option>
                <option>2024</option>
              </select>
              <img src="./assets/IMG_6.svg" alt="Arrow" className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-[#1ABC9C] text-[#19191F] px-4 py-2 rounded-md text-sm font-medium shadow-sm hover:bg-[#16a085] transition-colors">
            <img src="./assets/IMG_7.svg" alt="Download" className="w-4 h-4" />
            <span>导出团队月报</span>
          </button>
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-[#1ABC9C] text-[#19191F] px-4 py-2 rounded-md text-sm font-medium shadow-sm hover:bg-[#16a085] transition-colors">
            <img src="./assets/IMG_7.svg" alt="Download" className="w-4 h-4" />
            <span>导出个人月报</span>
          </button>
        </div>
      </section>

      {/* Main Content - Kanban Board */}
      <main className="flex-1 p-4 lg:p-8 overflow-x-auto custom-scrollbar">
        <div className="flex gap-6 min-w-max lg:min-w-full lg:justify-start">
          {teamMembers.map((member, idx) => (
            <div 
              key={idx} 
              className="w-[244px] flex-shrink-0 bg-[#f3f4f6]/20 rounded-2xl border border-[#dee1e6]/40 shadow-sm flex flex-col h-[720px]"
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
              </div>

              {/* Column Content */}
              <div className="flex-1 p-4 flex flex-col gap-3 overflow-y-auto custom-scrollbar">
                {member.reports.map((report, rIdx) => (
                  <div 
                    key={rIdx} 
                    className="bg-white p-3 rounded-xl shadow-sm border border-[#dee1e6]/30 flex items-center gap-2 hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <img src="./assets/IMG_9.svg" alt="Calendar" className="w-4 h-4 text-[#1ABC9C] opacity-80" />
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
import { Icon } from '@iconify/react';

export default function App() {
  return (
    <div className="min-h-screen bg-[#fafafb] font-sans text-[#171a1f]">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full h-16 bg-white shadow-sm border-b border-[#dee1e6] px-4 lg:px-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#1ABC9C] rounded-md flex items-center justify-center">
            <img src="./assets/IMG_5.svg" alt="Logo" className="w-[22px] h-[22px]" />
          </div>
          <span className="text-xl font-bold text-[#1ABC9C]">Work Trace</span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <button className="flex items-center gap-2 text-[#1ABC9C] font-medium text-sm">
            <img src="./assets/IMG_2.svg" alt="Dashboard" className="w-4 h-4" />
            工作日志
          </button>
          <button className="flex items-center gap-2 text-[#565d6d] font-medium text-sm hover:text-[#1ABC9C] transition-colors">
            <img src="./assets/IMG_3.svg" alt="Monthly Report" className="w-4 h-4" />
            工作月报
          </button>
          <button className="flex items-center gap-2 text-[#565d6d] font-medium text-sm hover:text-[#1ABC9C] transition-colors">
            <img src="./assets/IMG_4.svg" alt="Settings" className="w-4 h-4" />
            项目配置
          </button>
        </nav>

        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-100">
              <img src="./assets/IMG_1.jpeg" alt="User" className="w-full h-full object-cover" />
            </div>
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#2ECC71] border-2 border-white rounded-full"></div>
          </div>
          <button className="text-sm text-[#333333] hover:text-red-500 transition-colors">退出</button>
          {/* Mobile Menu Icon */}
          <button className="md:hidden ml-2">
            <Icon icon="lucide:menu" className="w-6 h-6 text-[#565d6d]" />
          </button>
        </div>
      </header>

      <main className="max-w-[1100px] mx-auto px-4 py-8 lg:px-0">
        {/* Navigation & Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <button className="flex items-center gap-2 text-[#565d6d] font-medium text-sm hover:translate-x-[-4px] transition-transform">
            <img src="./assets/IMG_6.svg" alt="Back" className="w-4 h-4" />
            返回月报看板
          </button>
          <button className="flex items-center justify-center gap-2 bg-[#1ABC9C] text-white px-4 py-2 rounded-md shadow-sm hover:bg-[#16a085] transition-colors text-sm font-medium">
            <img src="./assets/IMG_7.svg" alt="Export" className="w-4 h-4 brightness-0 invert" />
            导出 Excel 报告
          </button>
        </div>

        {/* Title Section */}
        <div className="mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold mb-4">2023年10月 研发部前端组工作月报</h1>
          <div className="flex flex-wrap items-center gap-y-3 gap-x-6 text-sm text-[#565d6d]">
            <div className="flex items-center gap-1.5">
              <img src="./assets/IMG_8.svg" alt="Calendar" className="w-4 h-4" />
              统计周期: 2023-10-01 至 2023-10-31
            </div>
            <div className="flex items-center gap-1.5">
              <img src="./assets/IMG_9.svg" alt="User" className="w-4 h-4" />
              生成人: 刘硕 (产品经理)
            </div>
            <div className="flex items-center gap-1.5">
              <Icon icon="lucide:clock" className="w-4 h-4" />
              生成时间: 2023-11-01 10:30
            </div>
            <div className="bg-[#f3f4f6] px-3 py-0.5 rounded-md font-medium text-[#171a1f]">
              包含日志: 142 篇
            </div>
          </div>
        </div>

        <hr className="border-[#dee1e6] mb-8" />

        {/* Overview Section */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <img src="./assets/IMG_10.svg" alt="List" className="w-5 h-5 text-[#1ABC9C]" />
            <h2 className="text-lg font-semibold">月度数据概览</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard icon="./assets/IMG_11.svg" label="总任务数" value="56" unit="项" />
            <StatCard icon="./assets/IMG_12.svg" label="已完成" value="48" unit="项" />
            <StatCard icon="./assets/IMG_13.svg" label="跟进中" value="8" unit="项" />
            <StatCard 
              icon="./assets/IMG_11.svg" 
              label="整体完成率" 
              value="85.7%" 
              unit="" 
              highlight 
            />
          </div>
        </section>

        {/* Details Section */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <img src="./assets/IMG_10.svg" alt="List" className="w-5 h-5 text-[#1ABC9C]" />
            <h2 className="text-lg font-semibold">分项汇报明细</h2>
          </div>

          <div className="space-y-6">
            {/* Project 1 */}
            <ProjectCard 
              title="SaaS 核心业务重构"
              progress={90}
              completedTasks={[
                "完成用户中心 V2.0 模块的前端重构，剥离旧版依赖",
                "优化海量数据表格的渲染性能，引入虚拟列表，滚动帧率提升至 60fps",
                "配合后端完成权限系统的接入与全量测试",
                "修复了线上收集的 5 个 P2 级别缺陷"
              ]}
              pendingTasks={[
                "部分非核心图表组件的 ECharts 升级验证",
                "数据导出功能的边界条件测试"
              ]}
              deliverables={[
                { name: "用户中心重构技术方案设计.pdf", size: "2.4 MB" },
                { name: "前端性能优化实践总结(10月).md", size: "45 KB" }
              ]}
              members={[
                { name: "张三", avatar: "./assets/IMG_1.jpeg", color: "bg-[#e8f5f7]" },
                { name: "李四", avatar: "./assets/IMG_15.jpeg", color: "bg-[#ebfed1]" },
                { name: "王五", avatar: "./assets/IMG_16.jpeg", color: "bg-[#f7f5e7]" }
              ]}
            />

            {/* Project 2 */}
            <ProjectCard 
              title="双十一营销活动支持"
              progress={100}
              progressColor="bg-[#22C55E]"
              completedTasks={[
                "双十一主会场 H5 页面开发与动效实现",
                "大转盘抽奖组件的封装与独立发包",
                "与 UI 设计师对齐视觉还原，像素级调整页面细节",
                "完成多端（微信、App、浏览器）的兼容性适配测试"
              ]}
              deliverables={[
                { name: "营销组件库使用文档 V1.2.docx", size: "1.1 MB" },
                { name: "双十一活动前端复盘报告.pptx", size: "5.6 MB" }
              ]}
              members={[
                { name: "赵六", avatar: "./assets/IMG_17.jpeg", color: "bg-[#e8f8eb]" },
                { name: "孙七", avatar: "./assets/IMG_18.jpeg", color: "bg-[#ebe3ff]" }
              ]}
            />

            {/* Project 3 */}
            <ProjectCard 
              title="基础设施与基建"
              progress={60}
              completedTasks={[
                "梳理现有项目中未使用的冗余依赖包",
                "搭建前端错误监控平台 (Sentry) 的基础环境"
              ]}
              pendingTasks={[
                "将所有前端项目接入监控平台并配置告警规则",
                "制定团队统一的代码规范与 Lint 规则",
                "编写前端自动化测试基础用例"
              ]}
              deliverables={[]}
              members={[
                { name: "张三", avatar: "./assets/IMG_1.jpeg", color: "bg-[#e8f5f7]" }
              ]}
            />
          </div>
        </section>

        {/* Footer Info */}
        <div className="mt-16 pt-8 border-t border-dashed border-[#dee1e6] text-center">
          <p className="text-sm text-[#565d6d]">此月报由 Log WebApp 自动基于日常工作日志汇总生成。</p>
        </div>
      </main>

      {/* Global Footer */}
      <footer className="w-full py-6 bg-white border-t border-[#dee1e6] text-center mt-12">
        <p className="text-sm text-[#565d6d]">© 2026 Log WebApp. All rights reserved.</p>
      </footer>
    </div>
  );
}

function StatCard({ icon, label, value, unit, highlight = false }: { icon: string, label: string, value: string, unit: string, highlight?: boolean }) {
  return (
    <div className={`p-6 rounded-xl shadow-sm border border-[#f3f4f6] flex items-center gap-4 ${highlight ? 'bg-[#1ABC9C]/5' : 'bg-white'}`}>
      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${highlight ? 'bg-[#1ABC9C]/20' : 'bg-[#f3f4f6]'}`}>
        <img src={icon} alt={label} className={`w-6 h-6 ${highlight ? 'text-[#1ABC9C]' : 'text-[#565d6d]'}`} />
      </div>
      <div>
        <p className="text-sm font-medium text-[#565d6d] mb-1">{label}</p>
        <div className="flex items-baseline gap-1">
          <span className={`text-3xl font-bold ${highlight ? 'text-[#1ABC9C]' : 'text-[#171a1f]'}`}>{value}</span>
          {unit && <span className="text-sm text-[#565d6d]">{unit}</span>}
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ title, progress, progressColor = "bg-[#1ABC9C]", completedTasks, pendingTasks = [], deliverables, members }: any) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-[#f3f4f6] overflow-hidden">
      {/* Project Header */}
      <div className="bg-[#f3f4f6]/30 px-6 py-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#dee1e6]">
        <div className="flex items-center gap-4">
          <span className="px-4 py-1 bg-white border border-[#1ABC9C]/30 rounded-full text-sm font-medium text-[#1ABC9C]">
            {title}
          </span>
          <div className="flex items-center gap-1.5 text-sm text-[#565d6d]">
            <img src="./assets/IMG_11.svg" alt="Target" className="w-4 h-4" />
            进度目标
          </div>
        </div>
        <div className="flex items-center gap-4 flex-1 lg:max-w-md">
          <div className="flex-1 h-2 bg-[#f3f4f6] rounded-full overflow-hidden">
            <div className={`h-full ${progressColor} rounded-full`} style={{ width: `${progress}%` }}></div>
          </div>
          <span className="text-sm font-bold text-[#171a1f] min-w-[40px] text-right">{progress}%</span>
        </div>
      </div>

      {/* Project Content */}
      <div className="flex flex-col lg:flex-row">
        {/* Left: Tasks */}
        <div className="flex-1 p-6 space-y-8">
          {/* Completed */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src="./assets/IMG_12.svg" alt="Check" className="w-4 h-4 text-[#22C55E]" />
              <h3 className="text-sm font-semibold">已完成任务 ({completedTasks.length})</h3>
            </div>
            <ul className="space-y-3">
              {completedTasks.map((task: string, i: number) => (
                <li key={i} className="flex items-start gap-3 text-sm text-[#565d6d] leading-relaxed">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#22C55E]/50 mt-2 shrink-0"></div>
                  {task}
                </li>
              ))}
            </ul>
          </div>

          {/* Pending */}
          {pendingTasks.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src="./assets/IMG_13.svg" alt="Circle" className="w-4 h-4 text-[#F59E0B]" />
                <h3 className="text-sm font-semibold">未完成/跟进中 ({pendingTasks.length})</h3>
              </div>
              <ul className="space-y-3">
                {pendingTasks.map((task: string, i: number) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-[#565d6d] leading-relaxed">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]/50 mt-2 shrink-0"></div>
                    {task}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Right: Deliverables & Members */}
        <div className="w-full lg:w-[340px] bg-[#f3f4f6]/10 border-t lg:border-t-0 lg:border-l border-[#dee1e6] p-6 space-y-8">
          {/* Deliverables */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src="./assets/IMG_14.svg" alt="Paperclip" className="w-4 h-4 text-[#1ABC9C]" />
              <h3 className="text-sm font-semibold">产出交付物</h3>
            </div>
            {deliverables.length > 0 ? (
              <div className="space-y-3">
                {deliverables.map((file: any, i: number) => (
                  <div key={i} className="flex items-center justify-between gap-2 text-sm">
                    <div className="flex items-center gap-2 overflow-hidden">
                      <img src="./assets/IMG_3.svg" alt="File" className="w-4 h-4 shrink-0" />
                      <span className="text-[#565d6d] truncate">{file.name}</span>
                    </div>
                    <span className="text-[12px] text-[#565d6d] bg-white px-1.5 py-0.5 rounded border border-gray-100 shrink-0">{file.size}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="border border-dashed border-[#dee1e6] rounded-md p-4 text-center">
                <span className="text-sm text-[#565d6d]">暂无附加交付物</span>
              </div>
            )}
          </div>

          {/* Members */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src="./assets/IMG_9.svg" alt="User" className="w-4 h-4 text-[#1ABC9C]" />
              <h3 className="text-sm font-semibold">模块执行人</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {members.map((member: any, i: number) => (
                <div key={i} className="flex items-center gap-2 bg-white border border-[#dee1e6] rounded-full pl-1.5 pr-3 py-1 shadow-sm">
                  <div className={`w-6 h-6 rounded-full overflow-hidden ${member.color}`}>
                    <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
                  </div>
                  <span className="text-[12px] font-medium">{member.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
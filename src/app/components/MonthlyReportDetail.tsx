import React from 'react';
import { FileText, Calendar, Download, Share2, ArrowLeft, List, Target, CheckCircle2, Clock, Paperclip, User, ExternalLink } from 'lucide-react';
import { useNavigate, useOutletContext } from 'react-router';
import { toast } from 'sonner';

export function MonthlyReportDetail() {
  const navigate = useNavigate();
  const { session } = useOutletContext<any>();
  const currentUser = session?.user;
  const userName = currentUser?.user_metadata?.name || currentUser?.email?.split('@')[0] || '用户';
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;

  const exportReport = () => {
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 2000)),
      {
        loading: '正在导出月报...',
        success: '月报导出成功！',
        error: '导出失败，请重试'
      }
    );
  };

  const shareReport = () => {
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1000)),
      {
        loading: '正在生成分享链接...',
        success: '分享链接已复制到剪贴板！',
        error: '生成分享链接失败'
      }
    );
  };

  const StatCard = ({ icon, label, value, unit, highlight = false }: { icon: any, label: string, value: string, unit: string, highlight?: boolean }) => {
    return (
      <div className={`p-6 rounded-xl shadow-sm border border-[#f3f4f6] flex items-center gap-4 ${highlight ? 'bg-[#1ABC9C]/5' : 'bg-white'}`}>
        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${highlight ? 'bg-[#1ABC9C]/20' : 'bg-[#f3f4f6]'}`}>
          {React.cloneElement(icon as React.ReactElement, { className: `w-6 h-6 ${highlight ? 'text-[#1ABC9C]' : 'text-[#565d6d]'}` })}
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
  };

  const ProjectCard = ({ title, progress, progressColor = "bg-[#1ABC9C]", completedTasks, pendingTasks = [], deliverables, members }: any) => {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-[#f3f4f6] overflow-hidden">
        <div className="bg-[#f3f4f6]/30 px-6 py-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#dee1e6]">
          <div className="flex items-center gap-4">
            <span className="px-4 py-1 bg-white border border-[#1ABC9C]/30 rounded-full text-sm font-medium text-[#1ABC9C]">
              {title}
            </span>
            <div className="flex items-center gap-1.5 text-sm text-[#565d6d]">
              <Target className="w-4 h-4" />
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

        <div className="flex flex-col lg:flex-row">
          <div className="flex-1 p-6 space-y-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
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

            {pendingTasks.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-4 h-4 text-[#F59E0B]" />
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

          <div className="w-full lg:w-[340px] bg-[#f3f4f6]/10 border-t lg:border-t-0 lg:border-l border-[#dee1e6] p-6 space-y-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Paperclip className="w-4 h-4 text-[#1ABC9C]" />
                <h3 className="text-sm font-semibold">产出交付物</h3>
              </div>
              {deliverables.length > 0 ? (
                <div className="space-y-3 max-h-[200px] overflow-y-auto pr-2">
                  {deliverables.map((file: any, i: number) => {
                    const fileName = file.name || '';
                    const fileExtension = fileName.split('.').pop()?.toLowerCase() || '';
                    const supportedFormats = ['doc', 'docx', 'pdf', 'jpg', 'jpeg', 'png', 'gif', 'md', 'markdown', 'ppt', 'pptx'];
                    const isPreviewSupported = supportedFormats.includes(fileExtension);
                    
                    return (
                      <div key={i} className="flex items-center justify-between gap-2 text-sm group">
                        <div 
                          className={`flex items-center gap-2 overflow-hidden cursor-pointer transition-colors ${isPreviewSupported ? 'group-hover:text-[#1ABC9C]' : 'opacity-60'}`}
                          onClick={() => {
                            if (isPreviewSupported) {
                              // 处理PPT转PDF预览
                              if (fileExtension === 'ppt' || fileExtension === 'pptx') {
                                toast.success(`正在将PPT转换为PDF并预览 ${fileName}`);
                              } else {
                                // 模拟预览功能
                                toast.success(`正在预览 ${fileName}`);
                              }
                            } else {
                              toast.info(`该文件格式不支持预览`);
                            }
                          }}
                        >
                          <FileText className={`w-4 h-4 shrink-0 transition-colors ${isPreviewSupported ? 'text-[#1ABC9C] group-hover:text-[#1ABC9C]' : 'text-[#565d6d]'}`} />
                          <span className={`truncate transition-colors ${isPreviewSupported ? 'text-[#565d6d] group-hover:text-[#1ABC9C]' : 'text-[#565d6d]'}`}>{fileName}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[12px] text-[#565d6d] bg-white px-1.5 py-0.5 rounded border border-gray-100 shrink-0">{file.size}</span>
                          <button 
                            className={`p-1 rounded-full transition-colors ${isPreviewSupported ? 'group-hover:bg-[#1ABC9C]/10' : ''}`}
                            onClick={() => {
                              // 模拟下载功能
                              toast.success(`正在下载 ${fileName}`);
                            }}
                            title="下载文件"
                          >
                            <Download className={`w-3 h-3 transition-colors ${isPreviewSupported ? 'text-[#1ABC9C]' : 'text-[#565d6d]'}`} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="border border-dashed border-[#dee1e6] rounded-md p-4 text-center">
                  <span className="text-sm text-[#565d6d]">暂无附加交付物</span>
                </div>
              )}
            </div>

            <div>
              <div className="flex items-center gap-2 mb-4">
                <User className="w-4 h-4 text-[#1ABC9C]" />
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
  };

  return (
    <div className="min-h-screen bg-[#fafafb] font-sans text-[#171a1f]">
      <header className="sticky top-0 z-50 w-full h-16 bg-white shadow-sm border-b border-[#dee1e6] px-4 lg:px-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#1ABC9C] rounded-md flex items-center justify-center">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-[#1ABC9C]">Work Trace</span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
             <button onClick={() => navigate('/')} className="flex items-center gap-2 text-[#565d6d] font-medium text-sm hover:text-[#1ABC9C] transition-colors">
               工作日志
             </button>
             <button onClick={() => navigate('/team-monthly-report')} className="flex items-center gap-2 text-[#1ABC9C] font-medium text-sm">
               工作月报
             </button>
             <button className="flex items-center gap-2 text-[#565d6d] font-medium text-sm hover:text-[#1ABC9C] transition-colors">
               项目配置
             </button>
           </nav>

        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-100">
              <div className="w-full h-full bg-[#e8f5f7] flex items-center justify-center text-[#171a1f] font-medium">
                用户
              </div>
            </div>
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#2ECC71] border-2 border-white rounded-full"></div>
          </div>
          <button onClick={() => navigate('/login')} className="text-sm text-[#333333] hover:text-red-500 transition-colors">退出</button>
        </div>
      </header>

      <main className="max-w-[1100px] mx-auto px-4 py-8 lg:px-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <button onClick={() => navigate('/team-monthly-report')} className="flex items-center gap-2 text-[#565d6d] font-medium text-sm hover:translate-x-[-4px] transition-transform">
            <ArrowLeft className="w-4 h-4" />
            返回月报看板
          </button>
          <button onClick={exportReport} className="flex items-center justify-center gap-2 bg-[#1ABC9C] text-white px-4 py-2 rounded-md shadow-sm hover:bg-[#16a085] transition-colors text-sm font-medium">
            <Download className="w-4 h-4" />
            导出 Excel 报告
          </button>
        </div>

        <div className="mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold mb-4">{year}年{month}月 "{userName}小同志" 工作月报</h1>
          <div className="flex flex-wrap items-center gap-y-3 gap-x-6 text-sm text-[#565d6d]">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              统计周期: {year}-{month.toString().padStart(2, '0')}-01 至 {year}-{month.toString().padStart(2, '0')}-{new Date(year, month, 0).getDate()}
            </div>
            <div className="flex items-center gap-1.5">
              <User className="w-4 h-4" />
              生成人: {userName}
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              生成时间: {currentDate.toLocaleString('zh-CN')}
            </div>
            <div className="bg-[#f3f4f6] px-3 py-0.5 rounded-md font-medium text-[#171a1f]">
              包含日志: 142 篇
            </div>
          </div>
        </div>

        <hr className="border-[#dee1e6] mb-8" />

        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <List className="w-5 h-5 text-[#1ABC9C]" />
            <h2 className="text-lg font-semibold">月度数据概览</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard icon={<Target />} label="总任务数" value="56" unit="项" />
            <StatCard icon={<CheckCircle2 />} label="已完成" value="48" unit="项" />
            <StatCard icon={<Clock />} label="跟进中" value="8" unit="项" />
            <StatCard 
              icon={<Target />} 
              label="整体完成率" 
              value="85.7%" 
              unit="" 
              highlight 
            />
          </div>
        </section>

        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <List className="w-5 h-5 text-[#1ABC9C]" />
            <h2 className="text-lg font-semibold">分项汇报明细</h2>
          </div>

          <div className="space-y-6">
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
                { name: "张三", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=1", color: "bg-[#e8f5f7]" },
                { name: "李四", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=2", color: "bg-[#ebfed1]" },
                { name: "王五", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=3", color: "bg-[#f7f5e7]" }
              ]}
            />

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
                { name: "赵六", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=4", color: "bg-[#e8f8eb]" },
                { name: "孙七", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=5", color: "bg-[#ebe3ff]" }
              ]}
            />

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
                { name: "张三", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=1", color: "bg-[#e8f5f7]" }
              ]}
            />
          </div>
        </section>

        <div className="mt-16 pt-8 border-t border-dashed border-[#dee1e6] text-center">
          <p className="text-sm text-[#565d6d]">此月报由 Log WebApp 自动基于日常工作日志汇总生成。</p>
        </div>
      </main>

      <footer className="w-full py-6 bg-white border-t border-[#dee1e6] text-center mt-12">
        <p className="text-sm text-[#565d6d]">© 2026 Log WebApp. All rights reserved.</p>
      </footer>
    </div>
  );
}
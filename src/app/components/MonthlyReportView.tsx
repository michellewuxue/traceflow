import React from 'react';
import { FileText, Calendar, Download, Share2, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

export function MonthlyReportView() {
  const navigate = useNavigate();

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

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans">
      {/* 顶部导航 */}
      <header className="bg-white shadow-sm border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate('/monthly-report')}
            className="flex items-center gap-2 text-zinc-600 hover:text-emerald-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">返回月报</span>
          </button>

          <div className="flex items-center gap-4">
            <button
              onClick={shareReport}
              className="flex items-center gap-2 px-4 py-2 border border-zinc-300 rounded-lg text-zinc-700 hover:bg-zinc-50 transition-colors"
            >
              <Share2 className="w-4 h-4" />
              分享
            </button>
            <button
              onClick={exportReport}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
            >
              <Download className="w-4 h-4" />
              导出PDF
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-8 py-8">
        {/* 月报标题 */}
        <div className="bg-white p-8 rounded-xl shadow-sm border border-zinc-200 mb-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <FileText className="w-8 h-8 text-emerald-500" />
              <h1 className="text-3xl font-bold text-zinc-900">个人工作月报</h1>
            </div>
            <p className="text-zinc-600 mb-2">2026年4月工作报告</p>
            <p className="text-sm text-zinc-500">报告生成时间：{new Date().toLocaleDateString('zh-CN')}</p>
          </div>
        </div>

        {/* 工作概览 */}
        <div className="bg-white p-8 rounded-xl shadow-sm border border-zinc-200 mb-8">
          <h2 className="text-xl font-semibold text-zinc-900 mb-6 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-emerald-500" />
            工作概览
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center p-6 bg-emerald-50 rounded-lg">
              <div className="text-3xl font-bold text-emerald-600 mb-2">8</div>
              <div className="text-sm text-emerald-700">总工作日志</div>
            </div>
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <div className="text-3xl font-bold text-blue-600 mb-2">12</div>
              <div className="text-sm text-blue-700">交付物数量</div>
            </div>
            <div className="text-center p-6 bg-purple-50 rounded-lg">
              <div className="text-3xl font-bold text-purple-600 mb-2">15</div>
              <div className="text-sm text-purple-700">最活跃日期</div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium text-zinc-900">主要工作类别</h3>
            <div className="flex flex-wrap gap-3">
              {['功能开发', 'Bug修复', '后端开发', 'UI优化', '性能优化'].map((category, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 text-sm font-medium bg-emerald-100 text-emerald-700 rounded-full"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 详细工作内容 */}
        <div className="bg-white p-8 rounded-xl shadow-sm border border-zinc-200 mb-8">
          <h2 className="text-xl font-semibold text-zinc-900 mb-6">详细工作内容</h2>

          <div className="space-y-6">
            {[
              {
                date: '2026-04-15',
                title: '前端功能开发',
                content: '完成了工作日志看板的前端开发，实现了多用户日志展示、月报生成等核心功能。使用React + TypeScript构建，支持实时数据加载和响应式布局。',
                deliverables: ['WorkLogBoard.tsx', 'CreateWorkLog.tsx']
              },
              {
                date: '2026-04-14',
                title: '富文本编辑器优化',
                content: '修复了富文本编辑器的多个问题：解决光标跳动问题、实现按钮选中状态、修复列表功能失效。优化了用户输入体验。',
                deliverables: ['RichTextEditor.tsx']
              },
              {
                date: '2026-04-13',
                title: '后端API开发',
                content: '实现了工作日志的后端API接口，包括日志保存、查询和用户认证。解决了JWT验证问题，优化了数据存储方案。',
                deliverables: ['server/index.tsx', 'API接口文档.pdf']
              }
            ].map((item, index) => (
              <div key={index} className="border border-zinc-200 rounded-lg p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-medium text-zinc-900 mb-1">{item.title}</h3>
                    <p className="text-sm text-zinc-500">{item.date}</p>
                  </div>
                </div>
                <p className="text-zinc-700 text-sm leading-relaxed mb-4">{item.content}</p>
                {item.deliverables.length > 0 && (
                  <div>
                    <span className="text-sm text-zinc-600 font-medium">交付物：</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {item.deliverables.map((deliverable, delIndex) => (
                        <span
                          key={delIndex}
                          className="inline-flex items-center px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-md"
                        >
                          {deliverable}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 总结与反思 */}
        <div className="bg-white p-8 rounded-xl shadow-sm border border-zinc-200">
          <h2 className="text-xl font-semibold text-zinc-900 mb-6">总结与反思</h2>

          <div className="space-y-6">
            <div>
              <h3 className="font-medium text-zinc-900 mb-3">本月工作亮点</h3>
              <ul className="space-y-2 text-sm text-zinc-700">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></span>
                  完成了工作日志系统的核心功能开发，提升了团队的工作效率
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></span>
                  优化了富文本编辑器的用户体验，解决了多个关键性问题
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></span>
                  建立了完善的API接口，为后续功能扩展奠定了基础
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium text-zinc-900 mb-3">改进方向</h3>
              <ul className="space-y-2 text-sm text-zinc-700">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0"></span>
                  需要进一步提升代码的可测试性，增加单元测试覆盖率
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0"></span>
                  优化前端性能，减少不必要的重渲染
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0"></span>
                  加强文档编写，完善项目开发规范
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
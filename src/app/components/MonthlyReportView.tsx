import { Calendar, Download } from 'lucide-react';
import { toast } from 'sonner';
import { MonthlyTopNav } from './MonthlyTopNav';

export function MonthlyReportView() {
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

  return (
    <div className="min-h-screen bg-[rgba(248,250,252,0.5)] font-sans">
      {/* 顶部导航 - 使用组件 */}
      <MonthlyTopNav />

      <div className="max-w-7xl mx-auto px-8 py-8">
        {/* 页面标题区域 */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl font-bold text-[#171a1f] tracking-[-0.6px]">工作月报看板</h1>
                <div className="bg-[rgba(26,188,156,0.1)] border border-[rgba(26,188,156,0.2)] rounded-[11px] px-2 py-1">
                  <span className="text-[#1abc9c] text-xs font-medium">团队概览</span>
                </div>
              </div>
              <p className="text-sm text-[#565d6d]">查看团队成员的每日工作进展与交付成果。</p>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={exportReport}
                className="bg-[#1abc9c] text-[#19191f] px-4 py-2 rounded-[6px] text-sm font-medium flex items-center gap-2 shadow-[0px_1px_2.5px_0px_rgba(23,26,31,0.07),0px_0px_2px_0px_rgba(23,26,31,0.08)]"
              >
                <Download className="w-4 h-4" />
                导出团队月报
              </button>
              <button
                onClick={exportReport}
                className="bg-[#1abc9c] text-[#19191f] px-4 py-2 rounded-[6px] text-sm font-medium flex items-center gap-2 shadow-[0px_1px_2.5px_0px_rgba(23,26,31,0.07),0px_0px_2px_0px_rgba(23,26,31,0.08)]"
              >
                <Download className="w-4 h-4" />
                导出个人月报
              </button>
              {/* 如果有多个年份的月报数据，显示下拉按钮，否则只显示年份 */}
              <div className="bg-white border border-[#dee1e6] rounded-[6px] px-3 py-2">
                <span className="text-[#171a1f] text-sm">2026</span>
                {/* 只有当存在多个年份数据时才显示下拉箭头 */}
                {/* <ChevronDown className="w-4 h-4 text-[#565d6d]" /> */}
              </div>
            </div>
          </div>
        </div>

        {/* 团队成员卡片区域 */}
        <div className="flex gap-6 overflow-x-auto pb-4">
          {/* 团队成员卡片1 - 刘烁 (当前用户) */}
          <div className="bg-white border border-[rgba(26,188,156,0.3)] rounded-[16px] shadow-[0px_2px_4px_0px_rgba(23,26,31,0.09),0px_0px_2px_0px_rgba(23,26,31,0.08)] w-[320px] h-[976px] flex-shrink-0">
            {/* 用户信息头部 */}
            <div className="bg-[rgba(250,250,251,0.3)] h-[95px] rounded-tl-[16px] rounded-tr-[16px] relative overflow-hidden">
              <div className="bg-[#1abc9c] absolute top-0 right-0 w-[65px] h-[21px] rounded-bl-[10px]">
                <span className="text-[#19191f] text-[10px] font-bold px-2 py-1 tracking-[0.5px] uppercase">当前工作台</span>
              </div>

              <div className="flex items-center gap-4 p-5">
                <div className="bg-[#f5e3ff] rounded-[24px] w-[48px] h-[48px] relative shadow-[0px_1px_2.5px_0px_rgba(23,26,31,0.07),0px_0px_2px_0px_rgba(23,26,31,0.08)]">
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=liushuo"
                    alt="刘烁"
                    className="w-full h-full rounded-[24px]"
                  />
                  <div className="bg-[#2ecc71] border-[1.5px] border-white rounded-[6px] w-3 h-3 absolute -bottom-0.5 -right-0.5"></div>
                </div>
                <div>
                  <h3 className="font-medium text-[#171a1f] text-base">刘烁</h3>
                  <p className="text-[#565d6d] text-xs">产品经理</p>
                </div>
              </div>
            </div>

            {/* 月报期间 */}
            <div className="bg-white border border-[#dee1e6] rounded-[10px] m-4 p-4">
              <h4 className="font-medium text-[#171a1f] text-base mb-2">2023年10月</h4>
              <div className="flex items-center gap-2 text-[#565d6d] text-xs">
                <Calendar className="w-4 h-4 opacity-80" />
                <span>2023/10/25 ~ 2023/10/30</span>
              </div>
            </div>

            {/* 日志内容区域 */}
            <div className="h-[881px] overflow-y-auto px-4 pb-4">
              {/* 这里将显示具体的日志内容 */}
            </div>
          </div>

          {/* 团队成员卡片2 - 娄江华 (有月报数据，不应显示暂无月报) */}
          <div className="bg-white border border-[#dee1e6] rounded-[16px] shadow-[0px_2px_4px_0px_rgba(23,26,31,0.09),0px_0px_2px_0px_rgba(23,26,31,0.08)] w-[320px] h-[976px] flex-shrink-0">
            {/* 用户信息头部 */}
            <div className="bg-[rgba(250,250,251,0.3)] h-[95px] rounded-tl-[16px] rounded-tr-[16px] relative overflow-hidden">
              <div className="flex items-center gap-4 p-5">
                <div className="bg-[#f5e3ff] rounded-[24px] w-[48px] h-[48px] relative shadow-[0px_1px_2.5px_0px_rgba(23,26,31,0.07),0px_0px_2px_0px_rgba(23,26,31,0.08)]">
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=loujianghua"
                    alt="娄江华"
                    className="w-full h-full rounded-[24px]"
                  />
                  <div className="bg-[#2ecc71] border-[1.5px] border-white rounded-[6px] w-3 h-3 absolute -bottom-0.5 -right-0.5"></div>
                </div>
                <div>
                  <h3 className="font-medium text-[#171a1f] text-base">娄江华</h3>
                  <p className="text-[#565d6d] text-xs">前端开发工程师</p>
                </div>
              </div>
            </div>

            {/* 月报期间 */}
            <div className="bg-white border border-[#dee1e6] rounded-[10px] m-4 p-4">
              <h4 className="font-medium text-[#171a1f] text-base mb-2">2023年10月</h4>
              <div className="flex items-center gap-2 text-[#565d6d] text-xs">
                <Calendar className="w-4 h-4 opacity-80" />
                <span>2023/10/25 ~ 2023/10/30</span>
              </div>
            </div>

            {/* 日志内容区域 - 娄江华有月报数据，显示实际内容 */}
            <div className="h-[881px] overflow-y-auto px-4 pb-4">
              {/* 这里显示娄江华的实际月报内容 */}
              <div className="space-y-4">
                <div className="bg-white border border-[#dee1e6] rounded-lg p-4">
                  <div className="text-sm text-[#565d6d] mb-2">10月25日 14:30</div>
                  <div className="text-sm text-[#171a1f] mb-2">完成了用户界面优化工作</div>
                  <div className="flex flex-wrap gap-1">
                    <span className="text-xs bg-[#e8f5e8] text-[#2d5a2d] px-2 py-1 rounded">前端开发</span>
                    <span className="text-xs bg-[#e8f5e8] text-[#2d5a2d] px-2 py-1 rounded">UI优化</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 团队成员卡片3 - 王静 (有月报数据，不应显示暂无月报) */}
          <div className="bg-white border border-[#dee1e6] rounded-[16px] shadow-[0px_2px_4px_0px_rgba(23,26,31,0.09),0px_0px_2px_0px_rgba(23,26,31,0.08)] w-[320px] h-[976px] flex-shrink-0">
            {/* 用户信息头部 */}
            <div className="bg-[rgba(250,250,251,0.3)] h-[95px] rounded-tl-[16px] rounded-tr-[16px] relative overflow-hidden">
              <div className="flex items-center gap-4 p-5">
                <div className="bg-[#f5e3ff] rounded-[24px] w-[48px] h-[48px] relative shadow-[0px_1px_2.5px_0px_rgba(23,26,31,0.07),0px_0px_2px_0px_rgba(23,26,31,0.08)]">
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=wangjing"
                    alt="王静"
                    className="w-full h-full rounded-[24px]"
                  />
                  <div className="bg-[#2ecc71] border-[1.5px] border-white rounded-[6px] w-3 h-3 absolute -bottom-0.5 -right-0.5"></div>
                </div>
                <div>
                  <h3 className="font-medium text-[#171a1f] text-base">王静</h3>
                  <p className="text-[#565d6d] text-xs">设计师</p>
                </div>
              </div>
            </div>

            {/* 月报期间 */}
            <div className="bg-white border border-[#dee1e6] rounded-[10px] m-4 p-4">
              <h4 className="font-medium text-[#171a1f] text-base mb-2">2023年10月</h4>
              <div className="flex items-center gap-2 text-[#565d6d] text-xs">
                <Calendar className="w-4 h-4 opacity-80" />
                <span>2023/10/25 ~ 2023/10/30</span>
              </div>
            </div>

            {/* 日志内容区域 - 王静有月报数据，显示实际内容 */}
            <div className="h-[881px] overflow-y-auto px-4 pb-4">
              {/* 这里显示王静的实际月报内容 */}
              <div className="space-y-4">
                <div className="bg-white border border-[#dee1e6] rounded-lg p-4">
                  <div className="text-sm text-[#565d6d] mb-2">10月26日 10:15</div>
                  <div className="text-sm text-[#171a1f] mb-2">设计了新的用户界面原型</div>
                  <div className="flex flex-wrap gap-1">
                    <span className="text-xs bg-[#f0e8ff] text-[#5a2d82] px-2 py-1 rounded">设计</span>
                    <span className="text-xs bg-[#f0e8ff] text-[#5a2d82] px-2 py-1 rounded">UI设计</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 底部版权信息 - 移动到这里 */}
        <div className="bg-white h-[69px] mt-8 flex items-center justify-center border-t border-[#dee1e6]">
          <p className="text-[#565d6d] text-sm text-center">
            © 2026 Log WebApp. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
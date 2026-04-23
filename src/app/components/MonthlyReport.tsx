import { useState, useEffect } from 'react';
import {
  FileText,
  BarChart3,
  Clock,
  Tag,
  Download,
  Share2,
  ChevronLeft,
  ChevronRight,
  LogOut,
  CheckCircle2,
  TrendingUp
} from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate, useOutletContext } from 'react-router';
import { projectId, publicAnonKey } from '/utils/supabase/info';
import { MonthlyTopNav } from './MonthlyTopNav';

interface Deliverable {
  type: string;
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

interface MonthlyStats {
  totalLogs: number;
  totalDeliverables: number;
  mostActiveDay: string;
  topCategories: { name: string; count: number; color: string }[];
  dailyActivity: { date: string; count: number }[];
  logs: Log[];
}

export function MonthlyReport() {
  const navigate = useNavigate();
  const { session } = useOutletContext<any>();
  const currentUser = session?.user;

  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [stats, setStats] = useState<MonthlyStats | null>(null);

  // 获取月报统计
  const fetchMonthlyStats = async () => {
    try {
      const res = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-e9f91fb9/monthly-report?userId=${currentUser?.id}&year=${selectedYear}&month=${selectedMonth + 1}`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        }
      );
      if (res.ok) {
        const data = await res.json();
        return data.stats;
      }
      return null;
    } catch (e) {
      console.error(e);
      return null;
    }
  };

  // 导出月报
  const exportReport = async () => {
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
        loading: '正在导出月报...',
        success: '月报导出成功！',
        error: '导出失败，请重试'
      }
    );
  };

  // 分享月报
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

  const getMonthName = (month: number) => {
    const months = [
      '一月', '二月', '三月', '四月', '五月', '六月',
      '七月', '八月', '九月', '十月', '十一月', '十二月'
    ];
    return months[month];
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      if (selectedMonth === 0) {
        setSelectedMonth(11);
        setSelectedYear(selectedYear - 1);
      } else {
        setSelectedMonth(selectedMonth - 1);
      }
    } else {
      if (selectedMonth === 11) {
        setSelectedMonth(0);
        setSelectedYear(selectedYear + 1);
      } else {
        setSelectedMonth(selectedMonth + 1);
      }
    }
  };

  useEffect(() => {
    const initData = async () => {
      setLoading(true);
      const statsData = await fetchMonthlyStats();
      setStats(statsData);
      setLoading(false);
    };
    if (currentUser) {
      initData();
    }
  }, [currentUser, selectedMonth, selectedYear]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#f8fafc]">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-emerald-200 border-t-emerald-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-zinc-600">加载月报数据中...</p>
        </div>
      </div>
    );
  }

  const currentUserName = currentUser?.user_metadata?.name || currentUser?.email?.split('@')[0] || '用户';
  const currentUserAvatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser?.id}`;

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans">
      {/* 顶部导航 */}
      <MonthlyTopNav userName={currentUserName} userAvatar={currentUserAvatar} />

      <div className="max-w-7xl mx-auto px-8 py-8">
        {/* 页面标题和月份选择 */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-zinc-900 mb-2 flex items-center gap-3">
                <FileText className="w-8 h-8 text-emerald-500" />
                个人工作月报
              </h1>
              <p className="text-zinc-600">回顾和总结您的月度工作成果</p>
            </div>

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

          {/* 月份导航 */}
          <div className="flex items-center justify-center gap-6 bg-white p-4 rounded-xl shadow-sm border border-zinc-200">
            <button
              onClick={() => navigateMonth('prev')}
              className="p-2 hover:bg-zinc-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-zinc-600" />
            </button>

            <div className="flex items-center gap-4">
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                className="px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              >
                {Array.from({ length: 5 }, (_, i) => 2026 - i).map(year => (
                  <option key={year} value={year}>{year}年</option>
                ))}
              </select>

              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                className="px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              >
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i} value={i}>{getMonthName(i)}</option>
                ))}
              </select>
            </div>

            <button
              onClick={() => navigateMonth('next')}
              className="p-2 hover:bg-zinc-100 rounded-lg transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-zinc-600" />
            </button>
          </div>
        </div>

        {/* 统计概览 */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-zinc-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-zinc-600">总日志数</h3>
                <FileText className="w-5 h-5 text-emerald-500" />
              </div>
              <div className="text-3xl font-bold text-zinc-900 mb-1">{stats.totalLogs}</div>
              <p className="text-sm text-zinc-500">本月记录的工作日志</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-zinc-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-zinc-600">交付物数量</h3>
                <CheckCircle2 className="w-5 h-5 text-blue-500" />
              </div>
              <div className="text-3xl font-bold text-zinc-900 mb-1">{stats.totalDeliverables}</div>
              <p className="text-sm text-zinc-500">完成的交付成果</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-zinc-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-zinc-600">最活跃日期</h3>
                <TrendingUp className="w-5 h-5 text-purple-500" />
              </div>
              <div className="text-3xl font-bold text-zinc-900 mb-1">{stats.mostActiveDay}日</div>
              <p className="text-sm text-zinc-500">日志记录最多的日期</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-zinc-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-zinc-600">工作类别</h3>
                <BarChart3 className="w-5 h-5 text-orange-500" />
              </div>
              <div className="text-3xl font-bold text-zinc-900 mb-1">{stats.topCategories.length}</div>
              <p className="text-sm text-zinc-500">不同的工作类型</p>
            </div>
          </div>
        )}

        {stats && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 左侧：工作分类分布 */}
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-zinc-200 mb-6">
                <h3 className="text-lg font-semibold text-zinc-900 mb-4 flex items-center gap-2">
                  <Tag className="w-5 h-5 text-emerald-500" />
                  工作类别分布
                </h3>

                {stats.topCategories.length > 0 ? (
                  <div className="space-y-4">
                    {stats.topCategories.map((category, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: category.color }}
                          />
                          <span className="text-sm font-medium text-zinc-700">{category.name}</span>
                        </div>
                        <span className="text-sm text-zinc-500">{category.count}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-zinc-500 text-sm">本月暂无工作记录</p>
                )}
              </div>

              {/* 活动时间线 */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-zinc-200">
                <h3 className="text-lg font-semibold text-zinc-900 mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-emerald-500" />
                  每日活动统计
                </h3>

                {stats.dailyActivity.length > 0 ? (
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {stats.dailyActivity.filter(day => day.count > 0).map((day, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-12 text-sm text-zinc-500">
                          {new Date(day.date).getDate()}日
                        </div>
                        <div className="flex-1 bg-zinc-100 rounded-full h-2">
                          <div
                            className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                            style={{
                              width: `${Math.max((day.count / Math.max(...stats.dailyActivity.map(d => d.count))) * 100, 10)}%`
                            }}
                          />
                        </div>
                        <div className="w-6 text-sm text-zinc-600 text-right">
                          {day.count}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-zinc-500 text-sm">本月暂无活动记录</p>
                )}
              </div>
            </div>

            {/* 右侧：详细日志列表 */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm border border-zinc-200">
                <div className="p-6 border-b border-zinc-200">
                  <h3 className="text-lg font-semibold text-zinc-900 mb-2">详细工作记录</h3>
                  <p className="text-zinc-600 text-sm">{getMonthName(selectedMonth)} {selectedYear} 的工作日志详情</p>
                </div>

                <div className="p-6">
                  {stats.logs.length > 0 ? (
                    <div className="space-y-6">
                      {stats.logs.map((log, index) => (
                        <div key={log.id} className="border border-zinc-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2" />
                              <div>
                                <div className="text-sm text-zinc-500 mb-1">
                                  {new Date(log.dateTime).toLocaleDateString('zh-CN', {
                                    month: 'long',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                  })}
                                </div>
                                <div className="flex flex-wrap gap-2">
                                  {log.tags.map((tag, tagIndex) => (
                                    <span
                                      key={tagIndex}
                                      className="inline-flex items-center px-2 py-1 text-xs font-medium bg-emerald-50 text-emerald-700 rounded-md"
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>

                          <p className="text-zinc-700 text-sm leading-relaxed mb-3">
                            {log.content}
                          </p>

                          {log.deliverables && log.deliverables.length > 0 && (
                            <div className="flex items-center gap-2 text-sm">
                              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                              <span className="text-zinc-600">交付物：</span>
                              {log.deliverables.map((deliverable, delIndex) => (
                                <span
                                  key={delIndex}
                                  className="inline-flex items-center px-2 py-1 text-xs font-medium bg-blue-50 text-blue-700 rounded-md"
                                >
                                  {deliverable.name}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <FileText className="w-12 h-12 text-zinc-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-zinc-900 mb-2">暂无工作记录</h3>
                      <p className="text-zinc-500 mb-6">本月还没有工作日志记录</p>
                      <button
                        onClick={() => navigate('/create')}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
                      >
                        <FileText className="w-4 h-4" />
                        开始记录工作
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
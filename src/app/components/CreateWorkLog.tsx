import React, { useState, useEffect } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Calendar, Plus, Trash2, ChevronUp, ChevronDown, GripVertical, Send, X, Info, Edit2 } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate, useSearchParams } from 'react-router';
import { supabase } from '../App';
import { DatePicker } from './DatePicker';
import { RichTextEditor } from './RichTextEditor';
import { CategorySelector } from './CategorySelector';
import { FileUpload } from './FileUpload';
import { TopNav } from './TopNav';

interface WorkItem {
  id: string;
  category: string;
  description: string;
  isCollapsed: boolean;
  files: UploadedFile[];
}

interface Category {
  id: string;
  name: string;
}

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  url?: string;
}

const ITEM_TYPE = 'WORK_ITEM';

interface DragItem {
  index: number;
  id: string;
  type: string;
}

function WorkItemCard({ item, index, moveItem, onDelete, onToggleCollapse, onUpdateCategory, onUpdateDescription, onUpdateFiles, categories, onAddCategory }: {
  item: WorkItem;
  index: number;
  moveItem: (dragIndex: number, hoverIndex: number) => void;
  onDelete: (id: string) => void;
  onToggleCollapse: (id: string) => void;
  onUpdateCategory: (id: string, category: string) => void;
  onUpdateDescription: (id: string, description: string) => void;
  onUpdateFiles: (id: string, files: UploadedFile[]) => void;
  categories: Category[];
  onAddCategory: (name: string) => void;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const dragHandleRef = React.useRef<HTMLDivElement>(null);

  const [{ handlerId }, drop] = useDrop({
    accept: ITEM_TYPE,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset?.y ?? 0) - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveItem(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag, preview] = useDrag({
    type: ITEM_TYPE,
    item: () => {
      return { id: item.id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drop(ref);
  drag(dragHandleRef);

  return (
    <div
          ref={ref}
          data-handler-id={handlerId}
          style={{ opacity: isDragging ? 0.5 : 1 }}
          className="bg-white border border-[#dee1e6] rounded-xl mb-4 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="bg-[#1ABC9C]/10 border-b border-[#1ABC9C]/20 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div ref={dragHandleRef} className="cursor-move">
                <GripVertical className="w-4 h-4 text-[#1ABC9C]" />
              </div>
              <div className="bg-[#1ABC9C] px-2 py-1 rounded text-white text-xs font-bold">
                事项 {index + 1}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onDelete(item.id)}
                className="p-1.5 hover:bg-[#1ABC9C]/20 rounded transition-colors"
              >
                <Trash2 className="w-4 h-4 text-[#565d6d]" />
              </button>
              <button
                onClick={() => onToggleCollapse(item.id)}
                className="p-1.5 hover:bg-[#1ABC9C]/20 rounded transition-colors"
              >
                {item.isCollapsed ? (
                  <ChevronDown className="w-4 h-4 text-[#565d6d]" />
                ) : (
                  <ChevronUp className="w-4 h-4 text-[#565d6d]" />
                )}
              </button>
            </div>
          </div>

          {!item.isCollapsed && (
            <div className="p-5 space-y-5">
              <div>
                <label className="text-sm font-medium text-[#171a1f] mb-2 block">
                  工作事项名称 <span className="text-red-500">*</span>
                </label>
                <CategorySelector
                  value={item.category}
                  onChange={(value) => onUpdateCategory(item.id, value)}
                  categories={categories}
                  onAddCategory={onAddCategory}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-[#171a1f] mb-2 block">
                  工作描述 <span className="text-red-500">*</span>
                </label>
                <RichTextEditor
                  value={item.description}
                  onChange={(value) => onUpdateDescription(item.id, value)}
                  placeholder="详细描述您的工作内容..."
                />
              </div>

              <div>
                <label className="text-sm font-medium text-[#171a1f] mb-2 block">
                  交付结果
                </label>
                <FileUpload
                  key={item.id} // 添加 key 确保每个工作事项的 FileUpload 组件是独立的
                  files={item.files}
                  onFilesChange={(files) => onUpdateFiles(item.id, files)}
                />
              </div>
            </div>
          )}
        </div>
  );
}

export function CreateWorkLog() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editLogId = searchParams.get('edit');
  
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [workItems, setWorkItems] = useState<WorkItem[]>([
    {
      id: `item-${Date.now()}`,
      category: '',
      description: '',
      isCollapsed: false,
      files: [],
    }
  ]);
  const [categories, setCategories] = useState<Category[]>([
    { id: '1', name: '功能开发' },
    { id: '2', name: 'Bug修复' },
    { id: '3', name: '代码审查' },
    { id: '4', name: '文档撰写' },
    { id: '5', name: '技术调研' },
  ]);
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [logId, setLogId] = useState<string | null>(null);

  // 加载编辑的日志数据
  useEffect(() => {
    if (editLogId) {
      loadLogData(editLogId);
    }
  }, [editLogId]);

  const loadLogData = async (id: string) => {
    setLoading(true);
    try {
      const { data: log, error: logError } = await supabase
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
        .eq('id', id)
        .single();

      if (logError) {
        console.error('加载日志失败:', logError);
        toast.error('加载日志失败');
        navigate('/');
        return;
      }

      setLogId(log.id);
      setSelectedDate(new Date(log.date));
      setNotes(log.notes || '');

      // 处理工作事项
      if (log.work_items && log.work_items.length > 0) {
        // 按照 sort_order 排序
        const sortedWorkItems = log.work_items.sort((a: any, b: any) => a.sort_order - b.sort_order);
        
        const items: WorkItem[] = sortedWorkItems.map((item: any) => {
          // 处理交付物
          const files: UploadedFile[] = item.deliverables?.map((deliverable: any) => ({
            id: deliverable.id,
            name: deliverable.name,
            size: 0, // 从数据库中无法获取文件大小
            type: deliverable.type,
            url: deliverable.url
          })) || [];

          return {
            id: item.id,
            category: item.category,
            description: item.description,
            isCollapsed: false,
            files: files
          };
        });

        setWorkItems(items);
      }
    } catch (error) {
      console.error('加载日志数据出错:', error);
      toast.error('加载日志数据出错');
    } finally {
      setLoading(false);
    }
  };

  const addWorkItem = () => {
    const newItem: WorkItem = {
      id: `item-${Date.now()}`,
      category: '',
      description: '',
      isCollapsed: false,
      files: [],
    };
    // 新创建的事项添加到数组开头，显示在最上面
    setWorkItems([newItem, ...workItems]);
  };

  const deleteWorkItem = (id: string) => {
    setWorkItems(workItems.filter(item => item.id !== id));
  };

  const toggleCollapseWorkItem = (id: string) => {
    setWorkItems(workItems.map(item =>
      item.id === id ? { ...item, isCollapsed: !item.isCollapsed } : item
    ));
  };

  const updateWorkItemCategory = (id: string, category: string) => {
    setWorkItems(workItems.map(item =>
      item.id === id ? { ...item, category } : item
    ));
  };

  const updateWorkItemDescription = (id: string, description: string) => {
    setWorkItems(workItems.map(item =>
      item.id === id ? { ...item, description } : item
    ));
  };

  const updateWorkItemFiles = (id: string, files: UploadedFile[]) => {
    setWorkItems(workItems.map(item =>
      item.id === id ? { ...item, files } : item
    ));
  };

  const moveWorkItem = (dragIndex: number, hoverIndex: number) => {
    const newItems = [...workItems];
    const [removed] = newItems.splice(dragIndex, 1);
    newItems.splice(hoverIndex, 0, removed);
    setWorkItems(newItems);
  };

  const addCategory = (name: string) => {
    const newCategory: Category = {
      id: `cat-${Date.now()}`,
      name,
    };
    setCategories([...categories, newCategory]);
  };

  const handleCancel = () => {
    navigate('/');
  };

  // 【最终修正：字段100%匹配表结构】
  const handlePublish = async () => {
    if (workItems.length === 0) {
      toast.error('请至少添加一个工作事项');
      return;
    }

    for (const item of workItems) {
      if (!item.category.trim()) {
        toast.error('请为所有工作事项选择分类');
        return;
      }
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = item.description;
      const textContent = tempDiv.textContent || tempDiv.innerText || '';
      if (!textContent.trim()) {
        toast.error('请填写所有工作事项的描述');
        return;
      }
    }

    setLoading(true);
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user) {
        throw new Error('请先登录');
      }

      let currentLogId: string;

      if (logId) {
        // 编辑模式：更新现有日志
        const logData = {
          date: selectedDate.toISOString().split('T')[0],
          notes: notes,
          status: 'active',
        };

        const { error: logError } = await supabase
          .from('work_logs')
          .update(logData)
          .eq('id', logId);

        if (logError) {
          console.error('更新日志失败：', logError);
          throw new Error(logError.message);
        }

        currentLogId = logId;

        // 删除现有工作事项和交付物
        const { error: deleteWorkItemsError } = await supabase
          .from('work_items')
          .delete()
          .eq('log_id', currentLogId);

        if (deleteWorkItemsError) {
          console.error('删除工作事项失败：', deleteWorkItemsError);
          throw new Error(deleteWorkItemsError.message);
        }
      } else {
        // 创建模式：创建新日志
        const logData = {
          user_id: user.id,
          date: selectedDate.toISOString().split('T')[0], // NOT NULL，必须传
          notes: notes,
          status: 'active',
        };

        const { data: logResult, error: logError } = await supabase
          .from('work_logs')
          .insert([logData])
          .select('id')
          .single();

        if (logError) {
          console.error('创建日志失败：', logError);
          throw new Error(logError.message);
        }

        currentLogId = logResult.id;
      }

      // 为每个工作事项创建 work_items 记录
      for (let i = 0; i < workItems.length; i++) {
        const item = workItems[i];
        // 创建工作事项记录
        const workItemData = {
            log_id: currentLogId,
            category: item.category,
            description: item.description,
            sort_order: i, // 使用索引作为排序值，保持显示顺序
          };

        const { data: workItemResult, error: workItemError } = await supabase
          .from('work_items')
          .insert([workItemData])
          .select('id')
          .single();

        if (workItemError) {
          console.error('创建工作事项失败：', workItemError);
          throw new Error(workItemError.message);
        }

        const workItemId = workItemResult.id;

        // 为每个文件创建一个 deliverables 记录
        for (const file of item.files) {
          // 确定文件类型
          let fileType = 'OTHER';
          const fileNameLower = file.name.toLowerCase();
          if (fileNameLower.endsWith('.js') || fileNameLower.endsWith('.ts') || fileNameLower.endsWith('.jsx') || fileNameLower.endsWith('.tsx') || fileNameLower.endsWith('.html') || fileNameLower.endsWith('.css')) {
            fileType = 'CODE';
          } else if (fileNameLower.endsWith('.doc') || fileNameLower.endsWith('.docx') || fileNameLower.endsWith('.pdf') || fileNameLower.endsWith('.txt')) {
            fileType = 'DOC';
          } else if (fileNameLower.endsWith('.fig') || fileNameLower.endsWith('.sketch') || fileNameLower.endsWith('.xd')) {
            fileType = 'DESIGN';
          }

          const deliverableData = {
            work_item_id: workItemId,
            name: file.name,
            url: file.url || '',
            type: fileType,
          };

          const { error: deliverableError } = await supabase
            .from('deliverables')
            .insert([deliverableData]);

          if (deliverableError) {
            console.error('创建交付物失败：', deliverableError);
            throw new Error(deliverableError.message);
          }
        }
      }

      toast.success(logId ? '✅ 工作日志已成功更新！' : '✅ 工作日志已成功保存到 Supabase！');
      navigate('/');
      
    } catch (e: any) {
      console.error('发布错误：', e);
      toast.error(e.message || '发布失败');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-white flex flex-col font-sans text-[#171a1f]">
        <TopNav />

        <main className="flex-1 p-6 lg:px-16 lg:py-8 overflow-y-auto">
          <div className="max-w-[1200px] mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-2xl font-bold tracking-tight">撰写工作日志</h1>
                </div>
                <p className="text-sm text-[#565d6d]">结构化记录每日工作，方便团队同步与月底总结。</p>
              </div>
              <button
                onClick={handleCancel}
                className="border border-[#dee1e6] text-[#171a1f] px-4 py-2 rounded-md flex items-center justify-center gap-2 font-medium shadow-sm hover:bg-gray-50 transition-colors w-full md:w-auto"
              >
                <X className="w-4 h-4" />
                <span>返回</span>
              </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-[#dee1e6] overflow-hidden">
              <div className="border-b border-[#dee1e6] p-5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <h2 className="text-lg font-semibold text-[#171a1f]">工作事项列表</h2>
                  <div className="relative">
                    <button
                      onClick={() => setShowDatePicker(!showDatePicker)}
                      className="flex items-center gap-2 px-3 py-1.5 border border-[#dee1e6] rounded-md hover:border-[#1ABC9C] transition-colors bg-white text-sm"
                    >
                      <span className="font-medium text-[#171a1f]">{formatDate(selectedDate)}</span>
                      <Calendar className="w-4 h-4 text-[#565d6d]" />
                    </button>
                    {showDatePicker && (
                      <DatePicker
                        value={selectedDate}
                        onChange={setSelectedDate}
                        onClose={() => setShowDatePicker(false)}
                      />
                    )}
                  </div>
                </div>
                <button
                  onClick={addWorkItem}
                  className="flex items-center gap-2 px-4 py-2 bg-[#1ABC9C] text-[#19191F] rounded-md hover:bg-[#16a085] transition-colors text-sm font-medium shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  添加事项
                </button>
              </div>

              <div className="p-5">
                {workItems.length === 0 ? (
                  <div className="text-center py-12 text-[#565d6d]">
                    <p className="text-sm">暂无工作事项，点击"添加事项"开始记录</p>
                  </div>
                ) : (
                  <div>
                    {workItems.map((item, index) => (
                      <WorkItemCard
                        key={item.id}
                        item={item}
                        index={index}
                        moveItem={moveWorkItem}
                        onDelete={deleteWorkItem}
                        onToggleCollapse={toggleCollapseWorkItem}
                        onUpdateCategory={updateWorkItemCategory}
                        onUpdateDescription={updateWorkItemDescription}
                        onUpdateFiles={updateWorkItemFiles}
                        categories={categories}
                        onAddCategory={addCategory}
                      />
                    ))}
                  </div>
                )}
              </div>

              <div className="border-t border-[#dee1e6] p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Info className="w-4 h-4 text-[#565d6d]" />
                  <h3 className="text-sm font-medium text-[#171a1f]">重点说明</h3>
                </div>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="若本次工作有需同步的重点事项、风险或后续安排，请在此填写说明。"
                  className="w-full px-3 py-2 border border-[#dee1e6] rounded-md text-sm text-[#171a1f] placeholder:text-[#565d6d] focus:outline-none focus:ring-1 focus:ring-[#1ABC9C] resize-none"
                  rows={2}
                />
              </div>

              <div className="bg-[#fafafb]/30 border-t border-[#dee1e6] p-6 flex items-center justify-end">
                <button
                  onClick={handlePublish}
                  disabled={loading}
                  className="flex items-center gap-2 px-6 py-2.5 bg-[#1ABC9C] text-[#19191F] rounded-md hover:bg-[#16a085] transition-colors text-sm font-medium disabled:opacity-50 shadow-sm"
                >
                  <Send className="w-4 h-4" />
                  {loading ? '发布中...' : '发布日志'}
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </DndProvider>
  );
}
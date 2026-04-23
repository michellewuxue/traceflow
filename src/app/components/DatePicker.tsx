import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface DatePickerProps {
  value: Date;
  onChange: (date: Date) => void;
  onClose: () => void;
}

export function DatePicker({ value, onChange, onClose }: DatePickerProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date(value.getFullYear(), value.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState(value);
  const pickerRef = useRef<HTMLDivElement>(null);

  const weekDays = ['日', '一', '二', '三', '四', '五', '六'];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: Array<{ date: Date; isCurrentMonth: boolean; isToday: boolean; isSelected: boolean; isFuture: boolean }> = [];

    // Previous month days
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const date = new Date(year, month - 1, prevMonthLastDay - i);
      days.push({
        date,
        isCurrentMonth: false,
        isToday: false,
        isSelected: false,
        isFuture: false
      });
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      date.setHours(0, 0, 0, 0);
      const isToday = date.getTime() === today.getTime();
      const isSelected = date.getTime() === selectedDate.getTime();
      const isFuture = date > today;
      days.push({
        date,
        isCurrentMonth: true,
        isToday,
        isSelected,
        isFuture
      });
    }

    // Next month days
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      const date = new Date(year, month + 1, i);
      days.push({
        date,
        isCurrentMonth: false,
        isToday: false,
        isSelected: false,
        isFuture: true
      });
    }

    return days;
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const handleDateClick = (day: { date: Date; isFuture: boolean; isCurrentMonth: boolean }) => {
    if (day.isFuture) return;
    setSelectedDate(day.date);
    onChange(day.date);
    onClose();
  };

  const handleToday = () => {
    setSelectedDate(today);
    setCurrentMonth(new Date(today.getFullYear(), today.getMonth(), 1));
    onChange(today);
    onClose();
  };

  const handleClear = () => {
    setSelectedDate(today);
    onChange(today);
    onClose();
  };

  const days = getDaysInMonth(currentMonth);

  return (
    <div
      ref={pickerRef}
      className="absolute top-[50px] right-0 z-50 bg-white rounded-lg shadow-lg border border-zinc-200 p-4 w-[320px]"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={handlePrevMonth}
          className="p-1 hover:bg-zinc-100 rounded transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-zinc-600" />
        </button>
        <div className="font-semibold text-zinc-900">
          {currentMonth.getFullYear()}年{currentMonth.getMonth() + 1}月
        </div>
        <button
          onClick={handleNextMonth}
          className="p-1 hover:bg-zinc-100 rounded transition-colors"
        >
          <ChevronRight className="w-5 h-5 text-zinc-600" />
        </button>
      </div>

      {/* Week days */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map(day => (
          <div key={day} className="text-center text-xs font-medium text-zinc-500 py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar days */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => (
          <button
            key={index}
            onClick={() => handleDateClick(day)}
            disabled={day.isFuture}
            className={`
              aspect-square flex items-center justify-center text-sm rounded transition-colors
              ${!day.isCurrentMonth ? 'text-zinc-300' : 'text-zinc-900'}
              ${day.isToday ? 'border-2 border-emerald-500' : ''}
              ${day.isSelected ? 'bg-emerald-500 text-white font-semibold' : ''}
              ${!day.isSelected && day.isCurrentMonth && !day.isFuture ? 'hover:bg-zinc-100' : ''}
              ${day.isFuture ? 'cursor-not-allowed opacity-40' : 'cursor-pointer'}
            `}
          >
            {day.date.getDate()}
          </button>
        ))}
      </div>

      {/* Footer buttons */}
      <div className="flex justify-between mt-4 pt-3 border-t border-zinc-200">
        <button
          onClick={handleClear}
          className="text-sm text-zinc-600 hover:text-zinc-900 transition-colors"
        >
          清除
        </button>
        <button
          onClick={handleToday}
          className="text-sm text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
        >
          今天
        </button>
      </div>
    </div>
  );
}

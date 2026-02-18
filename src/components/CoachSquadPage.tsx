import React, { useState } from 'react';
import { Search, Phone, ChevronRight, User, ClipboardList, CheckCircle, Flame, TrendingUp, ArrowUpRight, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TaskAssignment } from './TaskAssignment';

interface Student {
  id: string;
  name: string;
  phone: string;
  status: 'Active' | 'Trial';
  avgScore: number;
  streak: number;
  lastActive: string;
  trend: 'up' | 'down' | 'stable';
}

const mockStudents: Student[] = [
  { id: '1', name: 'Arjun Sharma', phone: '+913245321234', status: 'Active', avgScore: 10.2, streak: 7, lastActive: '2h ago', trend: 'up' },
  { id: '2', name: 'Priya Menon', phone: '+919879879879', status: 'Active', avgScore: 10.4, streak: 12, lastActive: '4h ago', trend: 'up' },
  { id: '3', name: 'Rahul Kumar', phone: '+918485678246', status: 'Trial', avgScore: 9.8, streak: 3, lastActive: '1d ago', trend: 'down' },
];

export function CoachSquadPage() {
  const [activeFilter, setActiveFilter] = useState<'All' | 'Active' | 'Trial'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [assigningStudent, setAssigningStudent] = useState<Student | null>(null);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const filteredStudents = mockStudents.filter(student => {
    const matchesFilter = activeFilter === 'All' || student.status === activeFilter;
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleAssignTask = (task: string, category: string) => {
    console.log(`Assigned ${category} task "${task}" to ${assigningStudent?.name}`);
    setAssigningStudent(null);
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 3000);
  };

  return (
    <div className="relative h-full">
      <div className="p-5 space-y-5 pb-32 h-full overflow-y-auto">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl text-white tracking-tight" style={{ fontWeight: 700 }}>My Squad</h1>
          <p className="text-sm text-gray-500">{mockStudents.length} athletes connected</p>
        </motion.header>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="relative"
        >
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
          <input
            type="text"
            placeholder="Search athletes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#111] border border-[#222] rounded-[14px] py-3.5 pl-11 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#2E86C1]/50 transition-colors text-sm"
          />
        </motion.div>

        {/* Filter Tabs */}
        <div className="flex gap-2">
          {(['All', 'Active', 'Trial'] as const).map((filter) => {
            const count = filter === 'All' 
              ? mockStudents.length 
              : mockStudents.filter(s => s.status === filter).length;
            const isActive = activeFilter === filter;
            
            return (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full text-xs transition-all ${
                  isActive 
                    ? 'bg-[#2E86C1] text-white' 
                    : 'bg-[#111] text-gray-500 hover:bg-[#1A1A1A] border border-[#222]'
                }`}
                style={{ fontWeight: isActive ? 700 : 500 }}
              >
                {filter} ({count})
              </button>
            );
          })}
        </div>

        {/* Student Cards */}
        <div className="space-y-3">
          {filteredStudents.map((student, i) => (
            <motion.div
              key={student.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
              className="bg-[#1A1A1A] rounded-[20px] p-5 border border-[#222]"
            >
              {/* Top Row */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-[#222] border border-[#333] flex items-center justify-center">
                  <span className="text-sm text-gray-400" style={{ fontWeight: 700 }}>{student.name[0]}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-white text-sm" style={{ fontWeight: 700 }}>{student.name}</h3>
                    <span className={`text-[8px] px-1.5 py-0.5 rounded-full ${
                      student.status === 'Active' 
                        ? 'bg-[#27AE60]/15 text-[#27AE60]' 
                        : 'bg-[#E67E22]/15 text-[#E67E22]'
                    }`} style={{ fontWeight: 700 }}>
                      {student.status}
                    </span>
                  </div>
                  <span className="text-[10px] text-gray-600">Last active {student.lastActive}</span>
                </div>
              </div>

              {/* Stats Row */}
              <div className="flex items-center gap-4 mb-4 bg-[#111] rounded-[12px] p-3">
                <div className="flex-1 text-center">
                  <div className="text-xs text-gray-500" style={{ fontWeight: 500 }}>Avg Score</div>
                  <div className="flex items-center justify-center gap-1 mt-0.5">
                    <span className="text-sm text-white" style={{ fontWeight: 700 }}>{student.avgScore}</span>
                    {student.trend === 'up' && <ArrowUpRight size={12} className="text-[#27AE60]" />}
                  </div>
                </div>
                <div className="w-px h-8 bg-[#222]" />
                <div className="flex-1 text-center">
                  <div className="text-xs text-gray-500" style={{ fontWeight: 500 }}>Streak</div>
                  <div className="flex items-center justify-center gap-1 mt-0.5">
                    <Flame size={12} className="text-[#E67E22]" />
                    <span className="text-sm text-white" style={{ fontWeight: 700 }}>{student.streak}d</span>
                  </div>
                </div>
                <div className="w-px h-8 bg-[#222]" />
                <div className="flex-1 text-center">
                  <div className="text-xs text-gray-500" style={{ fontWeight: 500 }}>Trend</div>
                  <div className="mt-0.5">
                    <span className={`text-sm ${student.trend === 'up' ? 'text-[#27AE60]' : student.trend === 'down' ? 'text-red-400' : 'text-gray-400'}`} style={{ fontWeight: 700 }}>
                      {student.trend === 'up' ? '↑' : student.trend === 'down' ? '↓' : '→'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setAssigningStudent(student)}
                  className="flex-1 py-3 bg-[#E67E22]/10 border border-[#E67E22]/20 rounded-[12px] flex items-center justify-center gap-2 text-[#E67E22] hover:bg-[#E67E22] hover:text-white transition-colors"
                >
                  <ClipboardList size={16} />
                  <span className="text-xs" style={{ fontWeight: 600 }}>Assign Drill</span>
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="py-3 px-4 bg-[#2E86C1]/10 border border-[#2E86C1]/20 rounded-[12px] flex items-center justify-center text-[#2E86C1] hover:bg-[#2E86C1] hover:text-white transition-colors"
                >
                  <MessageCircle size={16} />
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="py-3 px-4 bg-[#222] border border-[#333] rounded-[12px] flex items-center justify-center text-gray-400 hover:bg-[#333] transition-colors"
                >
                  <Phone size={16} />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Task Assignment Overlay */}
      <AnimatePresence>
        {assigningStudent && (
          <TaskAssignment 
            studentName={assigningStudent.name}
            onClose={() => setAssigningStudent(null)}
            onAssign={handleAssignTask}
          />
        )}
      </AnimatePresence>

      {/* Success Toast */}
      <AnimatePresence>
        {showSuccessToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="absolute bottom-24 left-1/2 -translate-x-1/2 bg-[#27AE60] text-white px-5 py-3 rounded-full shadow-xl flex items-center gap-2 z-50 whitespace-nowrap"
          >
            <CheckCircle size={18} />
            <span className="text-sm" style={{ fontWeight: 700 }}>Drill assigned!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

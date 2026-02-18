import React, { useState } from 'react';
import { Search, CheckCircle, Clock, User, Target, TrendingUp, ChevronRight, Calendar, Filter } from 'lucide-react';
import { motion } from 'motion/react';

interface ReviewSession {
  id: string;
  name: string;
  email: string;
  status: 'Pending' | 'Reviewed';
  shots: number;
  avgScore: number;
  date: string;
  timeAgo: string;
}

const mockSessions: ReviewSession[] = [
  { id: '1', name: 'Arjun S.', email: 's09@gmail.com', status: 'Pending', shots: 45, avgScore: 10.2, date: 'Today', timeAgo: '2h ago' },
  { id: '2', name: 'Priya M.', email: 'priya@gmail.com', status: 'Reviewed', shots: 60, avgScore: 10.4, date: 'Today', timeAgo: '5h ago' },
  { id: '3', name: 'Arjun S.', email: 's09@gmail.com', status: 'Reviewed', shots: 60, avgScore: 10.1, date: 'Yesterday', timeAgo: '1d ago' },
  { id: '4', name: 'Rahul K.', email: 'rahul@gmail.com', status: 'Reviewed', shots: 45, avgScore: 9.8, date: 'Yesterday', timeAgo: '1d ago' },
  { id: '5', name: 'Priya M.', email: 'priya@gmail.com', status: 'Reviewed', shots: 60, avgScore: 10.2, date: 'Feb 15', timeAgo: '3d ago' },
];

export function ReviewsPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'reviewed'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSessions = mockSessions.filter(session => {
    const matchesTab = activeTab === 'all' || 
      (activeTab === 'pending' ? session.status === 'Pending' : session.status === 'Reviewed');
    const matchesSearch = session.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  // Group by date
  const grouped = filteredSessions.reduce((acc, session) => {
    if (!acc[session.date]) acc[session.date] = [];
    acc[session.date].push(session);
    return acc;
  }, {} as Record<string, ReviewSession[]>);

  const pendingCount = mockSessions.filter(s => s.status === 'Pending').length;

  return (
    <div className="p-5 space-y-5 pb-32">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl text-white tracking-tight" style={{ fontWeight: 700 }}>Sessions</h1>
        <p className="text-sm text-gray-500">{mockSessions.length} total · {pendingCount} need review</p>
      </motion.header>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="relative"
      >
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
        <input
          type="text"
          placeholder="Search sessions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-[#111] border border-[#222] rounded-[14px] py-3.5 pl-11 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#2E86C1]/50 transition-colors text-sm"
        />
      </motion.div>

      {/* Tab Pills */}
      <div className="flex gap-2">
        {[
          { id: 'all' as const, label: 'All' },
          { id: 'pending' as const, label: `Pending (${pendingCount})` },
          { id: 'reviewed' as const, label: 'Reviewed' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-full text-xs transition-all ${
              activeTab === tab.id
                ? tab.id === 'pending' 
                  ? 'bg-[#E67E22] text-[#050505]'
                  : 'bg-[#2E86C1] text-white'
                : 'bg-[#111] text-gray-500 border border-[#222]'
            }`}
            style={{ fontWeight: activeTab === tab.id ? 700 : 500 }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Timeline Sessions */}
      <div className="space-y-6">
        {Object.entries(grouped).map(([date, sessions], gi) => (
          <motion.div
            key={date}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + gi * 0.05 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <Calendar size={14} className="text-gray-600" />
              <span className="text-xs text-gray-500" style={{ fontWeight: 600 }}>{date}</span>
              <div className="flex-1 h-px bg-[#1A1A1A]" />
            </div>

            <div className="space-y-3">
              {sessions.map((session, i) => (
                <motion.div
                  key={session.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + gi * 0.05 + i * 0.04 }}
                  whileTap={{ scale: 0.98 }}
                  className={`bg-[#1A1A1A] rounded-[18px] p-4 border transition-colors cursor-pointer ${
                    session.status === 'Pending' 
                      ? 'border-[#E67E22]/20 hover:border-[#E67E22]/40' 
                      : 'border-[#222] hover:border-[#333]'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      session.status === 'Pending' ? 'bg-[#E67E22]/10' : 'bg-[#222]'
                    }`}>
                      <span className={`text-xs ${session.status === 'Pending' ? 'text-[#E67E22]' : 'text-gray-400'}`} style={{ fontWeight: 700 }}>
                        {session.name[0]}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-white text-sm" style={{ fontWeight: 600 }}>{session.name}</span>
                        {session.status === 'Pending' ? (
                          <span className="text-[8px] bg-[#E67E22]/15 text-[#E67E22] px-1.5 py-0.5 rounded-full" style={{ fontWeight: 700 }}>REVIEW</span>
                        ) : (
                          <CheckCircle size={14} className="text-[#27AE60]" />
                        )}
                      </div>
                      <span className="text-[10px] text-gray-600">{session.timeAgo}</span>
                    </div>
                    <ChevronRight size={16} className="text-gray-600" />
                  </div>

                  <div className="flex items-center gap-4 bg-[#111] rounded-[10px] p-3">
                    <div className="flex items-center gap-2">
                      <Target size={14} className="text-[#2E86C1]" />
                      <div>
                        <span className="text-[10px] text-gray-600 block">Shots</span>
                        <span className="text-sm text-white" style={{ fontWeight: 700 }}>{session.shots}</span>
                      </div>
                    </div>
                    <div className="w-px h-8 bg-[#222]" />
                    <div className="flex items-center gap-2">
                      <TrendingUp size={14} className="text-[#27AE60]" />
                      <div>
                        <span className="text-[10px] text-gray-600 block">Avg Score</span>
                        <span className={`text-sm ${session.avgScore >= 10.2 ? 'text-[#27AE60]' : 'text-white'}`} style={{ fontWeight: 700 }}>
                          {session.avgScore.toFixed(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

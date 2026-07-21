import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  BookOpen, Video, Calendar, Star, Search, Download, Award, Clock, CheckCircle, Lock,
  Plus, AlertCircle, LogOut, Filter, ChevronRight, Play, ExternalLink, RefreshCw
} from 'lucide-react';
import { StudentProgress, BookedSession, Mentor, VideoLesson, ChampionDeck } from '../types';
import DeckPreviewModal from './DeckPreviewModal';
import MarkUpLogo from './MarkUpLogo';

interface StudentLMSProps {
  progress: StudentProgress;
  sessions: BookedSession[];
  mentors: Mentor[];
  videos: VideoLesson[];
  decks: ChampionDeck[];
  onCompleteVideo: (videoId: string) => void;
  onBookSession: (mentorId: string, slot: string, topic: string) => void;
  onDownloadDeck: (deckId: string) => void;
  onLogout: () => void;
}

export default function StudentLMS({
  progress,
  sessions,
  mentors,
  videos,
  decks,
  onCompleteVideo,
  onBookSession,
  onDownloadDeck,
  onLogout,
}: StudentLMSProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'videos' | 'mentors' | 'schedule' | 'decks'>('overview');
  const [mentorSearch, setMentorSearch] = useState('');
  const [selectedTagFilter, setSelectedTagFilter] = useState('Semua');

  // Booking states
  const [bookingMentor, setBookingMentor] = useState<Mentor | null>(null);
  const [bookingSlot, setBookingSlot] = useState('');
  const [bookingTopic, setBookingTopic] = useState('');

  // Deck modal states
  const [previewingDeck, setPreviewingDeck] = useState<ChampionDeck | null>(null);

  // Filter mentors based on search & tags
  const filteredMentors = mentors.filter((mentor) => {
    const matchesSearch = mentor.name.toLowerCase().includes(mentorSearch.toLowerCase()) ||
                          mentor.role.toLowerCase().includes(mentorSearch.toLowerCase());
    const matchesTag = selectedTagFilter === 'Semua' || mentor.tags.includes(selectedTagFilter);
    return matchesSearch && matchesTag;
  });

  // Calculate overall module video completion %
  const completedPercentage = Math.round((progress.completedVideos.length / videos.length) * 100);

  const handleBookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingMentor || !bookingSlot || !bookingTopic.trim()) {
      alert('Mohon lengkapi semua isian formulir booking.');
      return;
    }
    if (progress.sessionsUsed >= progress.sessionsTotal) {
      alert('Maaf, kuota sesi mentoring Anda sudah habis. Silakan beli paket baru atau ajukan top up.');
      return;
    }

    onBookSession(bookingMentor.id, bookingSlot, bookingTopic);
    alert(`Sukses! Sesi mentoring Anda bersama ${bookingMentor.name} telah dijadwalkan.`);
    setBookingMentor(null);
    setBookingSlot('');
    setBookingTopic('');
    setActiveTab('schedule');
  };

  // Format date helper
  const formatDate = (isoStr: string) => {
    const date = new Date(isoStr);
    return date.toLocaleDateString('id-ID', {
      weekday: 'long',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }) + ' WIB';
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-paper">
      {/* Sidebar - (3 cols on desktop, responsive bar on mobile) */}
      <aside className="lg:col-span-3 bg-ink text-white p-4 lg:p-6 flex flex-col lg:min-h-screen justify-between border-b lg:border-b-0 border-white/10 z-20">
        <div className="space-y-4 lg:space-y-8">
          <div className="flex items-center justify-between lg:border-b lg:border-white/10 lg:pb-4">
            <div className="flex items-center gap-2">
              <MarkUpLogo size={28} />
              <span className="font-display text-base lg:text-lg font-bold">Mark-Up LMS</span>
            </div>
            
            {/* Quick mobile metadata & Logout */}
            <div className="flex lg:hidden items-center gap-3">
              <span className="rounded bg-gold-custom text-ink px-1.5 py-0.5 text-[8px] font-mono tracking-widest uppercase font-black">
                {progress.teamName}
              </span>
              <button 
                onClick={onLogout} 
                className="p-1 hover:bg-white/10 rounded text-rose-300 hover:text-rose-100" 
                title="Log Out"
              >
                <LogOut className="h-4.5 w-4.5" />
              </button>
            </div>
          </div>

          <nav className="flex lg:flex-col overflow-x-auto lg:overflow-visible pb-1 lg:pb-0 gap-2 lg:gap-1 scrollbar-none">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex-shrink-0 flex items-center gap-2 lg:gap-3 px-3 lg:px-4 py-2 lg:py-3 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                activeTab === 'overview' ? 'bg-white/10 text-white font-bold' : 'text-white/60 hover:bg-white/5'
              }`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${activeTab === 'overview' ? 'bg-gold-custom' : 'bg-transparent'}`} />
              <span>Overview</span>
            </button>

            <button
              onClick={() => setActiveTab('videos')}
              className={`flex-shrink-0 flex items-center gap-2 lg:gap-3 px-3 lg:px-4 py-2 lg:py-3 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                activeTab === 'videos' ? 'bg-white/10 text-white font-bold' : 'text-white/60 hover:bg-white/5'
              }`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${activeTab === 'videos' ? 'bg-gold-custom' : 'bg-transparent'}`} />
              <span>Video Modul</span>
            </button>

            <button
              onClick={() => setActiveTab('mentors')}
              className={`flex-shrink-0 flex items-center gap-2 lg:gap-3 px-3 lg:px-4 py-2 lg:py-3 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                activeTab === 'mentors' ? 'bg-white/10 text-white font-bold' : 'text-white/60 hover:bg-white/5'
              }`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${activeTab === 'mentors' ? 'bg-gold-custom' : 'bg-transparent'}`} />
              <span>Booking Mentor</span>
            </button>

            <button
              onClick={() => setActiveTab('schedule')}
              className={`flex-shrink-0 flex items-center gap-2 lg:gap-3 px-3 lg:px-4 py-2 lg:py-3 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                activeTab === 'schedule' ? 'bg-white/10 text-white font-bold' : 'text-white/60 hover:bg-white/5'
              }`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${activeTab === 'schedule' ? 'bg-gold-custom' : 'bg-transparent'}`} />
              <span>Jadwal Saya</span>
            </button>

            <button
              onClick={() => setActiveTab('decks')}
              className={`flex-shrink-0 flex items-center gap-2 lg:gap-3 px-3 lg:px-4 py-2 lg:py-3 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                activeTab === 'decks' ? 'bg-white/10 text-white font-bold' : 'text-white/60 hover:bg-white/5'
              }`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${activeTab === 'decks' ? 'bg-gold-custom' : 'bg-transparent'}`} />
              <span>Deck Juara</span>
            </button>
          </nav>
        </div>

        {/* Desktop Profile Card */}
        <div className="hidden lg:block space-y-4 pt-6 border-t border-white/10">
          <div className="rounded-xl bg-white/5 p-4 space-y-2">
            <span className="text-[10px] font-mono text-white/50 uppercase tracking-widest block">Logged in as:</span>
            <div className="font-bold text-sm leading-none text-white">{progress.teamName}</div>
            <div className="text-xs text-white/60 leading-none">{progress.packageName}</div>
            <span className="inline-block rounded bg-gold-custom text-ink px-2 py-0.5 text-[8px] font-black tracking-widest font-mono uppercase mt-2">
              STUDENT
            </span>
          </div>

          <button
            onClick={onLogout}
            className="w-full flex items-center justify-between text-rose-300 hover:text-rose-100 text-xs font-bold px-4 py-2 hover:bg-rose-950/20 rounded-lg transition-colors"
          >
            <span>Log Out</span>
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </aside>

      {/* Main Panel - (9 cols) */}
      <main className="lg:col-span-9 p-6 md:p-10 overflow-y-auto max-h-screen">
        {/* Top Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-line pb-6 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-ink font-display">Halo, {progress.teamName}! 👋</h1>
            <p className="text-sm text-ink-soft mt-1">
              Sesi mentoring ke-{(progress.sessionsUsed + 1) <= progress.sessionsTotal ? progress.sessionsUsed + 1 : progress.sessionsTotal} Anda sudah dekat. Tetap fokus sampai hari-H!
            </p>
          </div>

          <div className="rounded-xl bg-white border border-line p-4 text-right self-start shadow-sm flex items-center gap-4">
            <div className="text-left">
              <span className="text-[10px] font-mono font-bold text-rose-500 uppercase tracking-wider block">DEADLINE SUBMIT CASE</span>
              <div className="font-display font-extrabold text-base text-ink">23 Juli 2026 (6 Hari Lagi)</div>
            </div>
            <div className="h-8 w-px bg-line" />
            <div className="text-center rounded-lg bg-rose-50 px-2 py-1">
              <Clock className="h-5 w-5 text-rose-500" />
            </div>
          </div>
        </header>

        {/* Tab 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-fade-in">
            {/* Quick Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
              {/* Progress Card with visual ring */}
              <div className="rounded-2xl border border-line bg-white p-5 flex items-center justify-between shadow-sm">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-bold text-ink-soft uppercase tracking-wider block">Progress Modul</span>
                  <div className="font-display text-2xl font-black text-ink">{completedPercentage}%</div>
                  <span className="text-xs text-ink-soft">
                    {progress.completedVideos.length}/{videos.length} Video Selesai
                  </span>
                </div>
                {/* Simulated circle indicator */}
                <div className="h-14 w-14 rounded-full border-4 border-paper flex items-center justify-center font-display font-bold text-xs text-violet-custom relative" style={{ backgroundImage: `conic-gradient(var(--color-violet-custom) ${completedPercentage}%, transparent ${completedPercentage}%)` }}>
                  <div className="absolute inset-1.5 rounded-full bg-white flex items-center justify-center">
                    {completedPercentage}%
                  </div>
                </div>
              </div>

              {/* Sesi Mentoring */}
              <div className="rounded-2xl border border-line bg-white p-5 shadow-sm space-y-1">
                <span className="text-[10px] font-mono font-bold text-ink-soft uppercase tracking-wider block">Sesi Digunakan</span>
                <div className="font-display text-2xl font-black text-ink">{progress.sessionsUsed}/{progress.sessionsTotal}</div>
                <p className="text-xs text-ink-soft">
                  Sisa {progress.sessionsTotal - progress.sessionsUsed} Sesi Mentoring
                </p>
              </div>

              {/* Feedback Mentor */}
              <div className="rounded-2xl border border-line bg-white p-5 shadow-sm space-y-1">
                <span className="text-[10px] font-mono font-bold text-ink-soft uppercase tracking-wider block">Feedback Rata-rata</span>
                <div className="font-display text-2xl font-black text-ink flex items-center gap-1.5">
                  <span>4.9</span>
                  <small className="text-xs text-ink-soft font-normal">/5.0</small>
                </div>
                <p className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                  <CheckCircle className="h-3.5 w-3.5" />
                  <span>Sangat Memuaskan</span>
                </p>
              </div>

              {/* Deck Terbuka */}
              <div className="rounded-2xl border border-line bg-white p-5 shadow-sm space-y-1">
                <span className="text-[10px] font-mono font-bold text-ink-soft uppercase tracking-wider block">Deck Champion Terbuka</span>
                <div className="font-display text-2xl font-black text-ink">{progress.downloadedDecks.length}</div>
                <p className="text-xs text-ink-soft">
                  Dari total {decks.length} deck juara
                </p>
              </div>
            </div>

            {/* Split row: Videos + Upcoming schedule */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left col: Learning progress */}
              <div className="lg:col-span-7 rounded-2xl border border-line bg-white p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-line pb-3">
                  <h3 className="font-display font-bold text-base text-ink">Aktivitas Belajar Terakhir</h3>
                  <button
                    onClick={() => setActiveTab('videos')}
                    className="text-xs font-bold text-violet-custom hover:underline"
                  >
                    Buka Semua Video →
                  </button>
                </div>

                <div className="space-y-3">
                  {videos.slice(0, 3).map((video) => {
                    const isCompleted = progress.completedVideos.includes(video.id);
                    return (
                      <div key={video.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-line">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => onCompleteVideo(video.id)}
                            className={`h-9 w-9 flex-shrink-0 rounded-lg flex items-center justify-center transition-all ${
                              isCompleted ? 'bg-emerald-100 text-emerald-600' : 'bg-ink text-white hover:bg-ink-soft'
                            }`}
                          >
                            <Play className="h-4 w-4 fill-current" />
                          </button>
                          <div>
                            <div className="font-bold text-xs text-ink leading-tight">{video.title}</div>
                            <span className="text-[10px] font-mono text-ink-soft uppercase block mt-0.5">
                              {video.module} · {video.duration}
                            </span>
                          </div>
                        </div>

                        <span className={`text-[10px] font-mono font-bold uppercase rounded px-2 py-0.5 ${
                          isCompleted ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {isCompleted ? '✓ Selesai' : 'Tonton'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right col: Upcoming mentorship session */}
              <div className="lg:col-span-5 rounded-2xl border border-line bg-white p-6 shadow-sm space-y-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-line pb-3 mb-4">
                    <h3 className="font-display font-bold text-base text-ink">Sesi Terdekat</h3>
                    <button
                      onClick={() => setActiveTab('schedule')}
                      className="text-xs font-bold text-violet-custom hover:underline"
                    >
                      Semua Jadwal
                    </button>
                  </div>

                  {sessions.filter(s => s.status === 'CONFIRMED').length > 0 ? (
                    (() => {
                      const activeSession = sessions.filter(s => s.status === 'CONFIRMED')[0];
                      return (
                        <div className="space-y-4">
                          <div className="rounded-xl border-l-4 border-gold-custom bg-paper-alt p-4">
                            <span className="text-[10px] font-mono font-bold text-violet-custom uppercase tracking-wider block">
                              MENDATANG · {formatDate(activeSession.date).split(' WIB')[0]}
                            </span>
                            <h4 className="font-bold text-sm text-ink mt-1">{activeSession.topic}</h4>
                            <p className="text-xs text-ink-soft mt-0.5">Mentor: {activeSession.mentorName}</p>
                          </div>

                          {activeSession.meetLink && (
                            <a
                              href={activeSession.meetLink}
                              target="_blank"
                              rel="noreferrer"
                              className="w-full rounded-xl bg-ink text-white py-2.5 text-xs font-bold text-center flex items-center justify-center gap-1.5 hover:bg-ink-soft transition-all"
                            >
                              <ExternalLink className="h-4 w-4" />
                              <span>Gabung Google Meet</span>
                            </a>
                          )}
                        </div>
                      );
                    })()
                  ) : (
                    <div className="text-center py-6 text-ink-soft space-y-3">
                      <AlertCircle className="h-8 w-8 text-amber-500 mx-auto" />
                      <p className="text-xs font-medium">Belum ada sesi aktif terdekat.</p>
                      <button
                        onClick={() => setActiveTab('mentors')}
                        className="rounded-lg bg-violet-custom px-4 py-2 text-xs font-bold text-white hover:bg-violet-deep transition-all inline-block"
                      >
                        + Booking Jadwal
                      </button>
                    </div>
                  )}
                </div>

                <div className="text-[10px] font-mono text-ink-soft text-center pt-2 border-t border-line mt-4">
                  Sisa kuota sesi mentoring: <b>{progress.sessionsTotal - progress.sessionsUsed} sesi</b>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: VIDEOS */}
        {activeTab === 'videos' && (
          <div className="space-y-6 animate-fade-in">
            <div className="rounded-2xl border border-line bg-white p-6 shadow-sm">
              <h2 className="font-display text-xl font-bold text-ink mb-2">Silabus Pembelajaran Juara</h2>
              <p className="text-sm text-ink-soft">
                Pelajari materi video terstruktur rancangan praktisi. Klik tombol putar untuk mensimulasikan menonton video modul.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {videos.map((video) => {
                const isCompleted = progress.completedVideos.includes(video.id);
                return (
                  <div
                    key={video.id}
                    className={`rounded-2xl border bg-white p-5 flex flex-col justify-between shadow-sm relative ${
                      video.isLocked ? 'border-line opacity-60' : 'border-line'
                    }`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold text-violet-custom bg-paper-alt px-2.5 py-0.5 rounded-full uppercase">
                          {video.module.split(': ')[0]}
                        </span>
                        <div className="flex items-center gap-1.5 text-[10px] font-mono text-ink-soft">
                          <Clock className="h-3 w-3" />
                          <span>{video.duration}</span>
                        </div>
                      </div>

                      <h4 className="font-display font-bold text-sm text-ink leading-tight">{video.title}</h4>
                      <p className="text-xs text-ink-soft">Tujuan: Memahami fundamental taktik presentasi dan riset.</p>
                    </div>

                    <div className="mt-5 pt-3 border-t border-line flex items-center justify-between">
                      {video.isLocked ? (
                        <div className="flex items-center gap-1 text-xs text-ink-soft font-semibold font-mono">
                          <Lock className="h-3.5 w-3.5 text-rose-500" />
                          <span>TERKUNCI (Modul Berikutnya)</span>
                        </div>
                      ) : (
                        <button
                          onClick={() => onCompleteVideo(video.id)}
                          className={`rounded-lg px-4 py-2 text-xs font-bold flex items-center gap-1.5 transition-all ${
                            isCompleted
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                              : 'bg-ink text-white hover:bg-ink-soft'
                          }`}
                        >
                          <Play className="h-3.5 w-3.5 fill-current" />
                          <span>{isCompleted ? '✓ Tonton Ulang' : 'Putar Video'}</span>
                        </button>
                      )}

                      {!video.isLocked && (
                        <span className={`text-[10px] font-mono font-bold ${isCompleted ? 'text-emerald-600' : 'text-amber-600'}`}>
                          {isCompleted ? 'SELESAI' : 'BELUM SELESAI'}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 3: MENTORS */}
        {activeTab === 'mentors' && (
          <div className="space-y-6 animate-fade-in">
            {/* Header filters */}
            <div className="rounded-2xl border border-line bg-white p-6 shadow-sm space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="font-display text-xl font-bold text-ink">Direktori Mentor & Booking Sesi</h2>
                  <p className="text-sm text-ink-soft">
                    Booking jadwal mentor yang cocok dengan ketersediaan tim Anda. Tanpa menunggu verifikasi admin.
                  </p>
                </div>

                {/* Sesi status info */}
                <div className="rounded-xl bg-paper-alt px-4 py-2 border border-line text-xs font-semibold text-ink">
                  Sisa Kuota Mentoring: <span className="text-violet-custom font-bold">{progress.sessionsTotal - progress.sessionsUsed} Sesi</span>
                </div>
              </div>

              {/* Filters */}
              <div className="flex flex-col md:flex-row gap-3">
                {/* Search */}
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-soft" />
                  <input
                    type="text"
                    value={mentorSearch}
                    onChange={(e) => setMentorSearch(e.target.value)}
                    placeholder="Cari mentor berdasarkan nama, keahlian..."
                    className="w-full rounded-full border border-line bg-paper-alt pl-10 pr-4 py-2.5 text-xs text-ink outline-none transition-all focus:bg-white focus:border-violet-custom"
                  />
                </div>

                {/* Tag Selectors */}
                <div className="flex flex-wrap gap-1.5 self-start">
                  {['Semua', 'Strategy', 'Finance', 'Pitching', 'Business Plan', 'Marketing'].map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setSelectedTagFilter(tag)}
                      className={`rounded-full px-3.5 py-2 text-xs font-semibold transition-all ${
                        selectedTagFilter === tag
                          ? 'bg-violet-custom text-white shadow-sm'
                          : 'bg-white border border-line text-ink-soft hover:text-ink'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Grid directory */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMentors.map((mentor) => (
                <div key={mentor.id} className="rounded-2xl border border-line bg-white p-5 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <img
                        referrerPolicy="no-referrer"
                        src={mentor.avatar}
                        alt={mentor.name}
                        className="h-11 w-11 rounded-xl object-cover border border-line flex-shrink-0"
                      />
                      <div>
                        <h4 className="font-bold text-ink text-sm leading-tight">{mentor.name}</h4>
                        <p className="text-[11px] text-ink-soft mt-0.5 line-clamp-1">{mentor.role}</p>
                        <div className="flex items-center gap-1 mt-1 text-xs font-mono font-bold text-ink">
                          <Star className="h-3.5 w-3.5 fill-gold-custom text-gold-custom stroke-[2.5]" />
                          <span>{mentor.rating.toFixed(1)}</span>
                          <span className="text-[10px] text-ink-soft font-normal">({mentor.totalTeams} tim)</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-ink-soft leading-relaxed line-clamp-3 min-h-[54px]">{mentor.bio}</p>

                    <div className="flex flex-wrap gap-1">
                      {mentor.tags.map((t) => (
                        <span key={t} className="rounded bg-paper-alt px-2 py-0.5 text-[10px] font-semibold text-violet-custom font-mono">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-line">
                    <button
                      onClick={() => {
                        if (progress.sessionsUsed >= progress.sessionsTotal) {
                          alert('Sisa sesi mentoring Anda 0. Silakan hubungi admin atau top up paket bimbingan!');
                          return;
                        }
                        setBookingMentor(mentor);
                      }}
                      className="w-full rounded-xl bg-ink text-white hover:bg-ink-soft py-2.5 text-xs font-bold transition-all flex items-center justify-center gap-1"
                    >
                      <span>Booking Slot Jadwal</span>
                      <ChevronRight className="h-4 w-4" />
                    </button>
                    <span className="text-[10px] text-center text-ink-soft block mt-1.5 font-mono">
                      Ketersediaan: <b>{mentor.availableSlots.length} slot luang</b>
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Booking Scheduler Modal Popup */}
            {bookingMentor && (
              <div className="fixed inset-0 z-[3000] flex items-center justify-center bg-ink/60 p-4 backdrop-blur-sm">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="w-full max-w-md overflow-hidden rounded-2xl border border-line bg-white shadow-2xl p-6"
                  id="booking-scheduler-panel"
                >
                  <div className="flex items-center justify-between border-b border-line pb-4 mb-4">
                    <h3 className="font-display font-bold text-lg text-ink">Booking Mentoring</h3>
                    <button onClick={() => setBookingMentor(null)} className="rounded-full p-1 text-ink-soft hover:bg-paper-alt hover:text-ink">
                      <LogOut className="h-4 w-4 transform rotate-180" />
                    </button>
                  </div>

                  <form onSubmit={handleBookSubmit} className="space-y-4">
                    {/* Mentor Summary */}
                    <div className="rounded-xl bg-paper-alt p-3 flex items-center gap-3 border border-line">
                      <img
                        referrerPolicy="no-referrer"
                        src={bookingMentor.avatar}
                        alt={bookingMentor.name}
                        className="h-9 w-9 rounded-lg object-cover"
                      />
                      <div>
                        <div className="font-bold text-xs text-ink">{bookingMentor.name}</div>
                        <p className="text-[10px] text-ink-soft line-clamp-1">{bookingMentor.role}</p>
                      </div>
                    </div>

                    {/* Slot availability select */}
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-ink-soft mb-1">
                        Pilih Tanggal & Waktu Sesi <span className="text-rose-500">*</span>
                      </label>
                      {bookingMentor.availableSlots.length > 0 ? (
                        <select
                          required
                          value={bookingSlot}
                          onChange={(e) => setBookingSlot(e.target.value)}
                          className="w-full rounded-lg border border-line bg-white px-3 py-2 text-xs font-semibold text-ink outline-none"
                        >
                          <option value="">-- Pilih Tanggal Tersedia --</option>
                          {bookingMentor.availableSlots.map((slot) => (
                            <option key={slot} value={slot}>
                              {formatDate(slot)}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <div className="text-xs text-rose-600 font-semibold border border-rose-200 bg-rose-50 p-3 rounded-lg flex items-center gap-2">
                          <AlertCircle className="h-4 w-4 flex-shrink-0" />
                          <span>Saat ini semua slot mentor ini penuh. Silakan pilih mentor lain.</span>
                        </div>
                      )}
                    </div>

                    {/* Sesi Topic */}
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-ink-soft mb-1">
                        Topik / Bahasan Sesi <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={bookingTopic}
                        onChange={(e) => setBookingTopic(e.target.value)}
                        placeholder="Contoh: Sesi 3 — Review Struktur Proyeksi Financial"
                        className="w-full rounded-lg border border-line bg-white px-3 py-2 text-xs text-ink outline-none transition-all focus:border-violet-custom"
                      />
                      <span className="text-[9px] text-ink-soft mt-1 block">Tuliskan kebutuhan diskusi agar mentor dapat mempelajari berkas Anda terlebih dahulu.</span>
                    </div>

                    <button
                      type="submit"
                      disabled={bookingMentor.availableSlots.length === 0}
                      className="w-full rounded-xl bg-ink hover:bg-ink-soft py-2.5 text-xs font-bold text-white transition-all disabled:opacity-50"
                    >
                      Konfirmasi Booking Jadwal
                    </button>
                  </form>
                </motion.div>
              </div>
            )}
          </div>
        )}

        {/* Tab 4: SCHEDULE */}
        {activeTab === 'schedule' && (
          <div className="space-y-6 animate-fade-in">
            <div className="rounded-2xl border border-line bg-white p-6 shadow-sm">
              <h2 className="font-display text-xl font-bold text-ink mb-1">Riwayat & Jadwal Mentoring</h2>
              <p className="text-sm text-ink-soft">
                Berikut adalah rekam aktivitas sesi bimbingan tim Anda. Klik link Google Meet di bawah untuk masuk ke ruang simulasi presentasi.
              </p>
            </div>

            <div className="space-y-4">
              {sessions.map((sess) => {
                const isCompleted = sess.status === 'COMPLETED';
                return (
                  <div key={sess.id} className="rounded-2xl border border-line bg-white p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex gap-4 items-start">
                      {/* Date Block */}
                      <div className="rounded-xl bg-ink text-white p-3 text-center min-w-[72px] flex-shrink-0">
                        <span className="text-[10px] font-mono uppercase tracking-wider block opacity-75">
                          {new Date(sess.date).toLocaleDateString('id-ID', { month: 'short' })}
                        </span>
                        <span className="font-display font-extrabold text-2xl block leading-tight">
                          {new Date(sess.date).getDate()}
                        </span>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`text-[9px] font-bold font-mono px-2 py-0.5 rounded uppercase tracking-wider ${
                            sess.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {sess.status}
                          </span>
                          <span className="text-xs text-ink-soft font-semibold">{sess.packageName}</span>
                        </div>
                        <h4 className="font-display font-bold text-base text-ink mt-1.5">{sess.topic}</h4>
                        <p className="text-xs text-ink-soft mt-0.5">Mentor Pendamping: <span className="font-bold text-ink">{sess.mentorName}</span></p>
                        <p className="text-xs text-ink-soft mt-0.5 flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5 text-violet-custom" />
                          <span>{formatDate(sess.date)}</span>
                        </p>
                      </div>
                    </div>

                    <div className="self-end md:self-center">
                      {isCompleted ? (
                        <div className="text-xs text-emerald-600 font-bold flex items-center gap-1.5 border border-emerald-100 bg-emerald-50 px-3 py-2 rounded-lg">
                          <CheckCircle className="h-4 w-4 stroke-[2.5]" />
                          <span>Sesi Selesai (Feedback Terkirim)</span>
                        </div>
                      ) : (
                        <div className="flex flex-col md:flex-row gap-2">
                          {sess.meetLink ? (
                            <a
                              href={sess.meetLink}
                              target="_blank"
                              rel="noreferrer"
                              className="rounded-lg bg-ink text-white text-xs font-bold px-4 py-2 hover:bg-ink-soft transition-all text-center flex items-center gap-1.5"
                            >
                              <ExternalLink className="h-4 w-4" />
                              <span>Join G-Meet</span>
                            </a>
                          ) : (
                            <span className="text-[11px] text-ink-soft font-mono italic">Menunggu Link G-Meet</span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 5: DECKS */}
        {activeTab === 'decks' && (
          <div className="space-y-6 animate-fade-in">
            <div className="rounded-2xl border border-line bg-white p-6 shadow-sm">
              <h2 className="font-display text-xl font-bold text-ink mb-1">Library Slide Deck Juara Nasional</h2>
              <p className="text-sm text-ink-soft">
                Pelajari struktur visual, model keuangan, dan alur bercerita (storytelling) dari tim-tim peraih medali emas nasional terdahulu.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {decks.map((deck) => (
                <div key={deck.id} className="rounded-2xl border border-line bg-white p-5 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <span className="rounded bg-gold-custom/20 text-ink text-[10px] font-bold px-2.5 py-0.5 font-mono uppercase tracking-wider">
                        {deck.award}
                      </span>
                      <span className="text-[10px] font-mono text-ink-soft font-bold">{deck.category} Team</span>
                    </div>

                    <div>
                      <h4 className="font-display font-bold text-base text-ink leading-tight">{deck.title}</h4>
                      <p className="text-xs text-ink-soft mt-1">Dibuat oleh: {deck.team} ({deck.year})</p>
                    </div>

                    <div className="bg-paper-alt p-3.5 rounded-xl border border-line space-y-2">
                      <div className="text-[10px] font-mono font-bold text-ink-soft uppercase tracking-wider">Highlight Keunikan:</div>
                      <p className="text-xs text-ink leading-relaxed line-clamp-2">{deck.keyInsights[0]}</p>
                    </div>

                    <div className="flex items-center justify-between text-xs font-mono text-ink-soft pt-1">
                      <span>{deck.slidesCount} Halaman Slide</span>
                      <span>Diunduh {deck.downloads} kali</span>
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-line grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setPreviewingDeck(deck)}
                      className="rounded-lg border border-line bg-white hover:bg-paper-alt text-ink text-xs font-bold py-2 flex items-center justify-center gap-1.5 transition-all"
                    >
                      <BookOpen className="h-4 w-4 text-violet-custom" />
                      <span>Buka Preview</span>
                    </button>
                    <button
                      onClick={() => onDownloadDeck(deck.id)}
                      className="rounded-lg bg-ink hover:bg-ink-soft text-white text-xs font-bold py-2 flex items-center justify-center gap-1.5 transition-all"
                    >
                      <Download className="h-4 w-4" />
                      <span>Unduh PDF</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Slide Deck preview modal */}
      <DeckPreviewModal
        isOpen={previewingDeck !== null}
        onClose={() => setPreviewingDeck(null)}
        deck={previewingDeck}
        onDownload={onDownloadDeck}
      />
    </div>
  );
}

import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  DollarSign, Users, Award, TrendingUp, Search, RefreshCw, Plus, Trash, Shield,
  Activity, Star, CheckCircle, AlertCircle, FileText, ArrowRight, UserPlus, LogOut,
  Calendar, BookOpen, Clock, Video, FileCode, ExternalLink
} from 'lucide-react';
import { Transaction, Mentor, StudentProgress, BookedSession, Competition, LearningMaterial } from '../types';
import MarkUpLogo from './MarkUpLogo';

interface AdminPanelProps {
  transactions: Transaction[];
  mentors: Mentor[];
  studentProgress: StudentProgress;
  sessions: BookedSession[];
  competitions: Competition[];
  materials: LearningMaterial[];
  onAddMentor: (newMentor: Omit<Mentor, 'id' | 'rating' | 'totalTeams' | 'availableSlots'>) => void;
  onAddCompetition: (newComp: Omit<Competition, 'id'>) => void;
  onDeleteCompetition: (compId: string) => void;
  onAddMaterial: (newMat: Omit<LearningMaterial, 'id' | 'addedBy'>) => void;
  onDeleteMaterial: (matId: string) => void;
  onResetDb: () => void;
  onLogout: () => void;
}

export default function AdminPanel({
  transactions,
  mentors,
  studentProgress,
  sessions,
  competitions,
  materials,
  onAddMentor,
  onAddCompetition,
  onDeleteCompetition,
  onAddMaterial,
  onDeleteMaterial,
  onResetDb,
  onLogout,
}: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<'executive' | 'cms' | 'timeline'>('executive');
  const [mentorSearch, setMentorSearch] = useState('');
  const [showAddMentorModal, setShowAddMentorModal] = useState(false);

  // New mentor form state
  const [newMentorName, setNewMentorName] = useState('');
  const [newMentorRole, setNewMentorRole] = useState('');
  const [newMentorBio, setNewMentorBio] = useState('');
  const [newMentorTags, setNewMentorTags] = useState('');

  // New Competition form state
  const [newCompName, setNewCompName] = useState('');
  const [newCompOrganizer, setNewCompOrganizer] = useState('');
  const [newCompDeadline, setNewCompDeadline] = useState('');
  const [newCompReward, setNewCompReward] = useState('');
  const [newCompFee, setNewCompFee] = useState('');
  const [newCompCategory, setNewCompCategory] = useState<'BCC' | 'BPC' | 'UMUM'>('BCC');
  const [newCompLink, setNewCompLink] = useState('');

  // New Material form state
  const [newMatTitle, setNewMatTitle] = useState('');
  const [newMatCategory, setNewMatCategory] = useState<'STUDENT' | 'MENTOR'>('STUDENT');
  const [newMatContentType, setNewMatContentType] = useState<'VIDEO' | 'PDF' | 'SLIDES' | 'TEMPLATE'>('PDF');
  const [newMatDescription, setNewMatDescription] = useState('');
  const [newMatUrl, setNewMatUrl] = useState('');

  // Timeline filters state
  const [timelineSearch, setTimelineSearch] = useState('');
  const [timelineFilter, setTimelineFilter] = useState<'ALL' | 'CONFIRMED' | 'PENDING' | 'COMPLETED'>('ALL');

  // Calculate stats dynamically
  const totalRevenue = transactions
    .filter((tx) => tx.status === 'PAID')
    .reduce((sum, tx) => sum + tx.amount, 0);

  const activeSubscriptions = transactions.filter((tx) => tx.status === 'PAID').length + 400; // Simulated historic offset

  // Filter mentors
  const filteredMentors = mentors.filter((m) =>
    m.name.toLowerCase().includes(mentorSearch.toLowerCase()) ||
    m.role.toLowerCase().includes(mentorSearch.toLowerCase())
  );

  const handleAddMentorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMentorName.trim() || !newMentorRole.trim()) {
      alert('Nama dan role mentor wajib diisi.');
      return;
    }

    const tagsArray = newMentorTags
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    onAddMentor({
      name: newMentorName.trim(),
      role: newMentorRole.trim(),
      avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=200&auto=format&fit=crop',
      bio: newMentorBio.trim() || 'Mentor bimbingan kompetisi bisnis Mark-Up.',
      tags: tagsArray.length > 0 ? tagsArray : ['Strategy', 'Marketing'],
    });

    alert(`Sukses menambahkan ${newMentorName} ke dalam direktori mentor!`);
    setShowAddMentorModal(false);

    // Reset forms
    setNewMentorName('');
    setNewMentorRole('');
    setNewMentorBio('');
    setNewMentorTags('');
  };

  const handleAddCompetitionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCompName.trim() || !newCompOrganizer.trim() || !newCompDeadline) {
      alert('Nama, penyelenggara, dan deadline wajib diisi.');
      return;
    }

    onAddCompetition({
      name: newCompName.trim(),
      organizer: newCompOrganizer.trim(),
      registrationDeadline: newCompDeadline,
      reward: newCompReward.trim() || 'Hadiah Menarik',
      fee: newCompFee.trim() || 'Gratis',
      category: newCompCategory,
      link: newCompLink.trim() || 'https://markup.co.id'
    });

    alert(`Sukses menambahkan kompetisi "${newCompName}"!`);
    
    // Reset forms
    setNewCompName('');
    setNewCompOrganizer('');
    setNewCompDeadline('');
    setNewCompReward('');
    setNewCompFee('');
    setNewCompCategory('BCC');
    setNewCompLink('');
  };

  const handleAddMaterialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMatTitle.trim() || !newMatUrl.trim()) {
      alert('Judul materi dan link URL wajib diisi.');
      return;
    }

    onAddMaterial({
      title: newMatTitle.trim(),
      category: newMatCategory,
      contentType: newMatContentType,
      description: newMatDescription.trim() || 'Materi pembelajaran bimbingan Mark-Up.',
      url: newMatUrl.trim()
    });

    alert(`Sukses menambahkan materi "${newMatTitle}"!`);

    // Reset forms
    setNewMatTitle('');
    setNewMatCategory('STUDENT');
    setNewMatContentType('PDF');
    setNewMatDescription('');
    setNewMatUrl('');
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const formatDate = (isoStr: string) => {
    const date = new Date(isoStr);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-paper">
      {/* Sidebar (3 cols on desktop, responsive bar on mobile) */}
      <aside className="lg:col-span-3 bg-ink text-white p-4 lg:p-6 flex flex-col lg:min-h-screen justify-between border-b lg:border-b-0 border-white/10 z-20">
        <div className="space-y-4 lg:space-y-8">
          <div className="flex items-center justify-between lg:border-b lg:border-white/10 lg:pb-4">
            <div className="flex items-center gap-2">
              <MarkUpLogo size={28} />
              <span className="font-display text-base lg:text-lg font-bold">Mark-Up Admin</span>
            </div>
            
            {/* Quick mobile metadata & Logout */}
            <div className="flex lg:hidden items-center gap-3">
              <span className="rounded bg-rose-600 text-white px-1.5 py-0.5 text-[8px] font-mono tracking-widest uppercase font-black">
                ADMIN
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
              onClick={() => setActiveTab('executive')}
              className={`flex-shrink-0 flex items-center gap-2 lg:gap-3 px-3 lg:px-4 py-2 lg:py-3 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                activeTab === 'executive' ? 'bg-white/10 text-white font-bold' : 'text-white/60 hover:bg-white/5'
              }`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${activeTab === 'executive' ? 'bg-gold-custom' : 'bg-transparent'}`} />
              <span>Executive Dashboard</span>
            </button>

            <button
              onClick={() => setActiveTab('cms')}
              className={`flex-shrink-0 flex items-center gap-2 lg:gap-3 px-3 lg:px-4 py-2 lg:py-3 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                activeTab === 'cms' ? 'bg-white/10 text-white font-bold' : 'text-white/60 hover:bg-white/5'
              }`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${activeTab === 'cms' ? 'bg-cyan-400' : 'bg-transparent'}`} />
              <span>CMS Content & Lomba</span>
            </button>

            <button
              onClick={() => setActiveTab('timeline')}
              className={`flex-shrink-0 flex items-center gap-2 lg:gap-3 px-3 lg:px-4 py-2 lg:py-3 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                activeTab === 'timeline' ? 'bg-white/10 text-white font-bold' : 'text-white/60 hover:bg-white/5'
              }`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${activeTab === 'timeline' ? 'bg-emerald-400' : 'bg-transparent'}`} />
              <span>Timeline Jadwal</span>
            </button>
          </nav>
        </div>

        {/* Desktop Profile Card */}
        <div className="hidden lg:block space-y-4 pt-6 border-t border-white/10">
          <div className="rounded-xl bg-white/5 p-4 space-y-2">
            <span className="text-[10px] font-mono text-white/50 uppercase tracking-widest block">Logged in as:</span>
            <div className="font-bold text-sm leading-none text-white">Administrator</div>
            <span className="inline-block rounded bg-rose-600 text-white px-2 py-0.5 text-[8px] font-black tracking-widest font-mono uppercase mt-2">
              MANAGEMENT
            </span>
          </div>

          <button
            onClick={onResetDb}
            className="w-full flex items-center justify-between text-amber-300 hover:text-amber-100 text-xs font-bold px-4 py-2 bg-amber-950/10 hover:bg-amber-950/30 rounded-lg transition-colors border border-amber-900/30"
          >
            <span>Reset Demo DB</span>
            <RefreshCw className="h-4 w-4" />
          </button>

          <button
            onClick={onLogout}
            className="w-full flex items-center justify-between text-rose-300 hover:text-rose-100 text-xs font-bold px-4 py-2 hover:bg-rose-950/20 rounded-lg transition-colors"
          >
            <span>Log Out</span>
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </aside>

      {/* Main Panel (9 cols) */}
      <main className="lg:col-span-9 p-6 md:p-10 overflow-y-auto max-h-screen space-y-8">
        {/* Top Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-line pb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-ink font-display">
              {activeTab === 'executive' && 'Executive Dashboard'}
              {activeTab === 'cms' && 'CMS Content & Lomba'}
              {activeTab === 'timeline' && 'Timeline Jadwal Latihan'}
            </h1>
            <p className="text-sm text-ink-soft mt-1">
              {activeTab === 'executive' && 'Data real-time operasional bimbingan, pembayaran, dan performa mentor Mark-Up.'}
              {activeTab === 'cms' && 'Kelola modul materi pembelajaran untuk student & mentor, serta jadwal kompetisi landing page.'}
              {activeTab === 'timeline' && 'Pantau, filter, dan cari seluruh sesi konsultasi bimbingan tim mahasiswa bersama mentor.'}
            </p>
          </div>
        </header>

        {/* Stats indicators */}
        {activeTab === 'executive' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          <div className="rounded-2xl border border-line bg-white p-5 shadow-sm space-y-1">
            <span className="text-[10px] font-mono font-bold text-ink-soft uppercase tracking-wider block">Total Revenue (MTD)</span>
            <div className="font-display text-2xl font-black text-ink">{formatCurrency(totalRevenue)}</div>
            <p className="text-xs text-emerald-600 font-semibold">↑ 12.4% dari bulan lalu</p>
          </div>

          <div className="rounded-2xl border border-line bg-white p-5 shadow-sm space-y-1">
            <span className="text-[10px] font-mono font-bold text-ink-soft uppercase tracking-wider block">Subscriptions Active</span>
            <div className="font-display text-2xl font-black text-ink">{activeSubscriptions}</div>
            <p className="text-xs text-ink-soft">Siswa & Tim Terdaftar</p>
          </div>

          <div className="rounded-2xl border border-line bg-white p-5 shadow-sm space-y-1">
            <span className="text-[10px] font-mono font-bold text-ink-soft uppercase tracking-wider block">Mentor Aktif</span>
            <div className="font-display text-2xl font-black text-ink">{mentors.length}</div>
            <p className="text-xs text-ink-soft">Tersedia untuk booking</p>
          </div>

          <div className="rounded-2xl border border-line bg-white p-5 shadow-sm space-y-1">
            <span className="text-[10px] font-mono font-bold text-ink-soft uppercase tracking-wider block">Conversion Rate</span>
            <div className="font-display text-2xl font-black text-ink">8.4%</div>
            <p className="text-xs text-ink-soft">Target industri bimbingan</p>
          </div>
        </div>

        {/* Real-time Sales Graph & Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Interactive Transactions Log (7 cols) */}
          <div className="lg:col-span-7 rounded-2xl border border-line bg-white p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-line pb-3">
              <h3 className="font-display font-bold text-base text-ink">Transaksi Pembayaran Terbaru</h3>
              <span className="rounded bg-emerald-50 text-emerald-700 px-2 py-0.5 text-[9px] font-bold font-mono uppercase">
                Live Log
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-line text-[10px] uppercase font-mono text-ink-soft tracking-wider">
                    <th className="py-2.5">ID</th>
                    <th className="py-2.5">TIM / USER</th>
                    <th className="py-2.5">PAKET</th>
                    <th className="py-2.5">AMOUNT</th>
                    <th className="py-2.5 text-right">STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line text-xs font-semibold text-ink">
                  {transactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-slate-50">
                      <td className="py-3.5 pr-2 font-mono text-ink-soft">{tx.id}</td>
                      <td className="py-3.5 pr-2">{tx.teamName}</td>
                      <td className="py-3.5 pr-2">
                        <div className="font-bold text-xs truncate max-w-[120px]">{tx.packageName}</div>
                        <span className="text-[8px] font-mono text-ink-soft">{formatDate(tx.date)}</span>
                      </td>
                      <td className="py-3.5 font-mono text-ink">{formatCurrency(tx.amount)}</td>
                      <td className="py-3.5 text-right">
                        <span className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold font-mono uppercase ${
                          tx.status === 'PAID'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {tx.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right: Revenue Breakdown & Category Analysis (5 cols) */}
          <div className="lg:col-span-5 rounded-2xl border border-line bg-white p-6 shadow-sm space-y-5">
            <h3 className="font-display font-bold text-base text-ink border-b border-line pb-3">Proporsi Kompetisi</h3>

            {/* Simulated mini visual bar chart for BCC vs BPC */}
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-bold text-ink mb-1.5">
                  <span>Business Case Competition (BCC)</span>
                  <span className="font-mono">60%</span>
                </div>
                <div className="h-3 w-full bg-paper-alt rounded-full overflow-hidden">
                  <div className="h-full bg-violet-custom rounded-full" style={{ width: '60%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-ink mb-1.5">
                  <span>Business Plan Competition (BPC)</span>
                  <span className="font-mono">40%</span>
                </div>
                <div className="h-3 w-full bg-paper-alt rounded-full overflow-hidden">
                  <div className="h-full bg-magenta-custom rounded-full" style={{ width: '40%' }} />
                </div>
              </div>
            </div>

            <div className="bg-paper-alt p-4 rounded-xl border border-line space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-ink">Catatan Admin</h4>
              <p className="text-xs text-ink-soft leading-relaxed">
                Pembelian paket <b>Full-Throttle Coaching</b> merupakan penyumbang pendapatan terbesar (48%) pada batch pendaftaran Juli 2026.
              </p>
            </div>
          </div>
        </div>

        {/* Mentor Directory Management Block */}
        <div className="rounded-2xl border border-line bg-white p-6 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-line pb-3">
            <div>
              <h3 className="font-display font-bold text-base text-ink">Manajemen Direktori Mentor</h3>
              <p className="text-xs text-ink-soft">Tambah atau hapus mentor aktif dalam platform.</p>
            </div>

            <div className="flex gap-3">
              <input
                type="text"
                value={mentorSearch}
                onChange={(e) => setMentorSearch(e.target.value)}
                placeholder="Cari mentor..."
                className="rounded-lg border border-line px-3 py-1.5 text-xs text-ink outline-none"
              />
              <button
                onClick={() => setShowAddMentorModal(true)}
                className="rounded-lg bg-ink text-white px-3.5 py-1.5 text-xs font-bold hover:bg-ink-soft transition-all flex items-center gap-1"
              >
                <UserPlus className="h-4 w-4" />
                <span>Tambah Mentor</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMentors.map((m) => (
              <div key={m.id} className="rounded-xl border border-line p-4 flex gap-3 hover:shadow-sm transition-shadow">
                <img
                  referrerPolicy="no-referrer"
                  src={m.avatar}
                  alt={m.name}
                  className="h-10 w-10 rounded-lg object-cover"
                />
                <div className="space-y-1">
                  <div className="font-bold text-xs text-ink">{m.name}</div>
                  <p className="text-[10px] text-ink-soft line-clamp-1">{m.role}</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {m.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="bg-paper-alt text-violet-custom font-mono text-[8px] px-1 py-0.5 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        </>
        )}

        {/* TAB 2: CMS Content & Lomba */}
        {activeTab === 'cms' && (
          <div className="space-y-12">
            {/* Row 1: Jadwal Lomba Terdekat */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
              {/* Left: Competition List (7 cols) */}
              <div className="xl:col-span-7 bg-white rounded-2xl border border-line p-6 shadow-sm space-y-4">
                <div className="border-b border-line pb-3 flex items-center justify-between">
                  <div>
                    <h3 className="font-display font-bold text-base text-ink">Atur Jadwal Lomba Terdekat</h3>
                    <p className="text-xs text-ink-soft">Daftar lomba aktif yang muncul di landing page.</p>
                  </div>
                  <span className="bg-cyan-50 text-cyan-700 px-2.5 py-1 rounded text-[10px] font-bold font-mono">
                    {competitions.length} AKTIF
                  </span>
                </div>

                {competitions.length === 0 ? (
                  <div className="text-center py-12 text-ink-soft text-xs">
                    Belum ada kompetisi terdaftar. Gunakan formulir di samping untuk menambahkan.
                  </div>
                ) : (
                  <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                    {competitions.map((comp) => (
                      <div key={comp.id} className="flex items-start justify-between p-4 bg-[#FAF8FC] border border-[#E3DCF0] rounded-xl hover:border-violet-custom transition-all">
                        <div className="space-y-1.5 flex-1 pr-3">
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-0.5 rounded text-[9px] font-black tracking-wider uppercase ${
                              comp.category === 'BCC' ? 'bg-[#E0F2FE] text-[#0369A1]' :
                              comp.category === 'BPC' ? 'bg-[#FDF2F8] text-[#BE185D]' :
                              'bg-[#F0FDF4] text-[#15803D]'
                            }`}>
                              {comp.category}
                            </span>
                            <span className="text-[10px] font-mono text-ink-soft">ID: {comp.id}</span>
                          </div>
                          <h4 className="font-bold text-xs text-ink leading-tight">{comp.name}</h4>
                          <p className="text-[11px] text-ink-soft font-semibold">Penyelenggara: {comp.organizer}</p>
                          <div className="grid grid-cols-2 gap-x-4 gap-y-1 pt-1 text-[10px] text-ink-soft font-semibold">
                            <div>📅 Reg. Deadline: <span className="text-violet-custom font-bold">{comp.registrationDeadline}</span></div>
                            <div>🏆 Reward: <span className="text-emerald-600 font-bold">{comp.reward}</span></div>
                            <div>💰 Biaya: <span className="text-ink">{comp.fee}</span></div>
                            <div className="flex items-center gap-0.5">🔗 Link: <a href={comp.link} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline inline-flex items-center gap-0.5">Kunjungi <ExternalLink className="h-2.5 w-2.5" /></a></div>
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            if (confirm('Yakin ingin menghapus kompetisi ini dari landing page?')) {
                              onDeleteCompetition(comp.id);
                            }
                          }}
                          className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 hover:text-rose-800 transition-all self-start"
                          title="Hapus Kompetisi"
                        >
                          <Trash className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Right: Add Competition Form (5 cols) */}
              <div className="xl:col-span-5 bg-white rounded-2xl border border-line p-6 shadow-sm space-y-4">
                <h3 className="font-display font-bold text-base text-ink border-b border-line pb-3">Tambah Kompetisi Baru</h3>
                <form onSubmit={handleAddCompetitionSubmit} className="space-y-4 text-xs font-semibold">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-ink-soft mb-1">Nama Kompetisi</label>
                    <input
                      type="text"
                      required
                      value={newCompName}
                      onChange={(e) => setNewCompName(e.target.value)}
                      placeholder="Contoh: National Business Case Competition (NBCC) 2026"
                      className="w-full rounded-lg border border-line bg-white px-3 py-2 text-ink outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-ink-soft mb-1">Penyelenggara</label>
                      <input
                        type="text"
                        required
                        value={newCompOrganizer}
                        onChange={(e) => setNewCompOrganizer(e.target.value)}
                        placeholder="Contoh: BEM FEB UI"
                        className="w-full rounded-lg border border-line bg-white px-3 py-2 text-ink outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-ink-soft mb-1">Kategori</label>
                      <select
                        value={newCompCategory}
                        onChange={(e) => setNewCompCategory(e.target.value as 'BCC' | 'BPC' | 'UMUM')}
                        className="w-full rounded-lg border border-line bg-white px-3 py-2 text-ink outline-none"
                      >
                        <option value="BCC">Business Case (BCC)</option>
                        <option value="BPC">Business Plan (BPC)</option>
                        <option value="UMUM">Umum / Lainnya</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-ink-soft mb-1">Reg. Deadline</label>
                      <input
                        type="date"
                        required
                        value={newCompDeadline}
                        onChange={(e) => setNewCompDeadline(e.target.value)}
                        className="w-full rounded-lg border border-line bg-white px-3 py-2 text-ink outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-ink-soft mb-1">Biaya Pendaftaran</label>
                      <input
                        type="text"
                        value={newCompFee}
                        onChange={(e) => setNewCompFee(e.target.value)}
                        placeholder="Contoh: Rp150.000/Tim"
                        className="w-full rounded-lg border border-line bg-white px-3 py-2 text-ink outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-ink-soft mb-1">Total Hadiah & Reward</label>
                    <input
                      type="text"
                      value={newCompReward}
                      onChange={(e) => setNewCompReward(e.target.value)}
                      placeholder="Contoh: Total Rp45 Juta + Internship"
                      className="w-full rounded-lg border border-line bg-white px-3 py-2 text-ink outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-ink-soft mb-1">Link Pendaftaran / Info Lomba</label>
                    <input
                      type="url"
                      value={newCompLink}
                      onChange={(e) => setNewCompLink(e.target.value)}
                      placeholder="Contoh: https://bemfebui.org/nbcc"
                      className="w-full rounded-lg border border-line bg-white px-3 py-2 text-ink outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-xl bg-ink text-white py-2.5 text-xs font-bold hover:bg-ink-soft transition-all flex items-center justify-center gap-1.5"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Publish Lomba ke Landing Page</span>
                  </button>
                </form>
              </div>
            </div>

            {/* Row 2: Materi & Modul */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start pt-6 border-t border-line">
              {/* Left: Materials List (7 cols) */}
              <div className="xl:col-span-7 bg-white rounded-2xl border border-line p-6 shadow-sm space-y-4">
                <div className="border-b border-line pb-3 flex items-center justify-between">
                  <div>
                    <h3 className="font-display font-bold text-base text-ink">Bahan & Materi Pembelajaran</h3>
                    <p className="text-xs text-ink-soft">Modul rujukan eksklusif untuk mentor dan pelanggan (student).</p>
                  </div>
                  <span className="bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded text-[10px] font-bold font-mono">
                    {materials.length} MATERI
                  </span>
                </div>

                {materials.length === 0 ? (
                  <div className="text-center py-12 text-ink-soft text-xs">
                    Belum ada materi pembelajaran terdaftar.
                  </div>
                ) : (
                  <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                    {materials.map((mat) => (
                      <div key={mat.id} className="flex items-start justify-between p-4 bg-[#FAF8FC] border border-[#E3DCF0] rounded-xl hover:border-violet-custom transition-all">
                        <div className="space-y-1.5 flex-1 pr-4">
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-0.5 rounded text-[9px] font-black tracking-wider uppercase ${
                              mat.category === 'MENTOR' ? 'bg-[#EEF2F6] text-[#334155]' : 'bg-[#E0F2FE] text-[#0369A1]'
                            }`}>
                              Untuk: {mat.category}
                            </span>
                            <span className="px-1.5 py-0.5 rounded bg-yellow-50 text-yellow-800 border border-yellow-200 text-[9px] font-mono font-bold">
                              {mat.contentType}
                            </span>
                            <span className="text-[10px] font-mono text-ink-soft">ID: {mat.id}</span>
                          </div>
                          <h4 className="font-bold text-xs text-ink leading-tight">{mat.title}</h4>
                          <p className="text-[11px] text-ink-soft leading-relaxed font-medium">{mat.description}</p>
                          <div className="flex items-center gap-4 pt-1 text-[10px] text-ink-soft font-semibold">
                            <div>👤 Pengunggah: <span className="text-ink">{mat.addedBy}</span></div>
                            <div className="flex items-center gap-0.5">🔗 Tautan: <a href={mat.url} target="_blank" rel="noreferrer" className="text-violet-custom hover:underline inline-flex items-center gap-0.5">Buka Materi <ExternalLink className="h-2.5 w-2.5" /></a></div>
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            if (confirm('Yakin ingin menghapus materi ini?')) {
                              onDeleteMaterial(mat.id);
                            }
                          }}
                          className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 hover:text-rose-800 transition-all self-start"
                          title="Hapus Materi"
                        >
                          <Trash className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Right: Add Material Form (5 cols) */}
              <div className="xl:col-span-5 bg-white rounded-2xl border border-line p-6 shadow-sm space-y-4">
                <h3 className="font-display font-bold text-base text-ink border-b border-line pb-3">Tambah Materi Baru</h3>
                <form onSubmit={handleAddMaterialSubmit} className="space-y-4 text-xs font-semibold">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-ink-soft mb-1">Judul Modul / Materi</label>
                    <input
                      type="text"
                      required
                      value={newMatTitle}
                      onChange={(e) => setNewMatTitle(e.target.value)}
                      placeholder="Contoh: Rubrik Penilaian Pitching Terstandarisasi"
                      className="w-full rounded-lg border border-line bg-white px-3 py-2 text-ink outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-ink-soft mb-1">Target Audiens</label>
                      <select
                        value={newMatCategory}
                        onChange={(e) => setNewMatCategory(e.target.value as 'STUDENT' | 'MENTOR')}
                        className="w-full rounded-lg border border-line bg-white px-3 py-2 text-ink outline-none"
                      >
                        <option value="STUDENT">Pelanggan (Student)</option>
                        <option value="MENTOR">Mentor Pembimbing</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-ink-soft mb-1">Jenis Content</label>
                      <select
                        value={newMatContentType}
                        onChange={(e) => setNewMatContentType(e.target.value as 'VIDEO' | 'PDF' | 'SLIDES' | 'TEMPLATE')}
                        className="w-full rounded-lg border border-line bg-white px-3 py-2 text-ink outline-none"
                      >
                        <option value="PDF">Dokumen PDF / Rubrik</option>
                        <option value="VIDEO">Video Webinar / Rekaman</option>
                        <option value="SLIDES">Slide Dek / PPT</option>
                        <option value="TEMPLATE">Template Dokumen / Word</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-ink-soft mb-1">Deskripsi Singkat</label>
                    <textarea
                      required
                      value={newMatDescription}
                      onChange={(e) => setNewMatDescription(e.target.value)}
                      placeholder="Berikan rangkuman isi materi dan kegunaannya..."
                      className="w-full rounded-lg border border-line bg-white px-3 py-2 text-ink outline-none h-20 resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-ink-soft mb-1">Link URL (Google Drive/YouTube/dsb.)</label>
                    <input
                      type="url"
                      required
                      value={newMatUrl}
                      onChange={(e) => setNewMatUrl(e.target.value)}
                      placeholder="Contoh: https://drive.google.com/..."
                      className="w-full rounded-lg border border-line bg-white px-3 py-2 text-ink outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-xl bg-ink text-white py-2.5 text-xs font-bold hover:bg-ink-soft transition-all flex items-center justify-center gap-1.5"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Upload & Publish Materi</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Timeline Jadwal Latihan */}
        {activeTab === 'timeline' && (
          <div className="bg-white rounded-2xl border border-line p-6 shadow-sm space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-line pb-4">
              <div>
                <h3 className="font-display font-bold text-base text-ink">Timeline Latihan & Sesi Mentor</h3>
                <p className="text-xs text-ink-soft">Seluruh log penjadwalan bimbingan yang di-booking oleh tim pelanggan dengan mentor.</p>
              </div>

              <div className="flex flex-wrap gap-3">
                <input
                  type="text"
                  value={timelineSearch}
                  onChange={(e) => setTimelineSearch(e.target.value)}
                  placeholder="Cari nama tim bimbingan..."
                  className="rounded-lg border border-line px-3 py-1.5 text-xs text-ink outline-none"
                />

                <select
                  value={timelineFilter}
                  onChange={(e) => setTimelineFilter(e.target.value as any)}
                  className="rounded-lg border border-line px-3 py-1.5 text-xs text-ink outline-none bg-white font-bold"
                >
                  <option value="ALL">Semua Sesi</option>
                  <option value="PENDING">Menunggu Persetujuan</option>
                  <option value="CONFIRMED">Disetujui / Aktif</option>
                  <option value="COMPLETED">Selesai</option>
                </select>
              </div>
            </div>

            {/* Timeline View List */}
            {(() => {
              const filteredSessions = sessions
                .filter((s) => {
                  const matchSearch = s.studentName.toLowerCase().includes(timelineSearch.toLowerCase());
                  const matchFilter = timelineFilter === 'ALL' || s.status === timelineFilter;
                  return matchSearch && matchFilter;
                })
                .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

              if (filteredSessions.length === 0) {
                return (
                  <div className="text-center py-12 text-ink-soft text-xs bg-[#FAF8FC] rounded-xl border border-[#E3DCF0] p-6">
                    <span className="text-3xl block mb-2">📅</span>
                    <strong className="text-ink">Tidak Ada Sesi Latihan Ditemukan</strong>
                    <p className="text-[11px] text-ink-soft mt-0.5">Silakan sesuaikan filter pencarian atau pastikan telah ada booking masuk.</p>
                  </div>
                );
              }

              return (
                <div className="relative border-l-2 border-[#E3DCF0] ml-4 pl-6 space-y-8 py-2">
                  {filteredSessions.map((session) => {
                    const sessionDate = new Date(session.date);
                    return (
                      <div key={session.id} className="relative group">
                        {/* Timeline Bullet Anchor */}
                        <span className={`absolute -left-[31px] top-1 flex h-4 w-4 items-center justify-center rounded-full border-2 bg-white transition-all ${
                          session.status === 'CONFIRMED' ? 'border-emerald-500 bg-emerald-50' :
                          session.status === 'PENDING' ? 'border-amber-500 bg-amber-50' :
                          'border-slate-300 bg-slate-50'
                        }`} />

                        <div className="bg-white hover:bg-slate-50 p-5 rounded-2xl border-2 border-[#E3DCF0] hover:border-violet-custom transition-all grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                          {/* DateTime Info */}
                          <div className="md:col-span-3">
                            <div className="flex items-center gap-1.5 text-violet-custom font-black text-xs font-mono">
                              <Calendar className="h-3.5 w-3.5" />
                              <span>
                                {sessionDate.toLocaleDateString('id-ID', {
                                  weekday: 'short',
                                  day: 'numeric',
                                  month: 'short'
                                })}
                              </span>
                            </div>
                            <div className="flex items-center gap-1.5 text-ink-soft font-mono text-[10px] mt-1">
                              <Clock className="h-3 w-3" />
                              <span>
                                {sessionDate.toLocaleTimeString('id-ID', {
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })} WIB
                              </span>
                            </div>
                          </div>

                          {/* Client & Mentor Info */}
                          <div className="md:col-span-5">
                            <span className="text-[9px] font-mono text-ink-soft font-bold tracking-wider uppercase block">
                              Tim Peserta & Mentor
                            </span>
                            <h4 className="font-bold text-xs text-ink mt-0.5">{session.studentName}</h4>
                            <p className="text-[10px] text-ink-soft font-semibold mt-0.5">
                              Membahas topik: <span className="text-ink">"{session.topic}"</span>
                            </p>
                            <div className="flex items-center gap-1.5 mt-2 text-[10px] text-ink-soft">
                              <span className="font-bold">Mentor:</span>
                              <span className="font-mono text-violet-custom font-bold bg-violet-50 px-1.5 py-0.5 rounded">
                                {session.mentorName}
                              </span>
                            </div>
                          </div>

                          {/* Package Detail */}
                          <div className="md:col-span-2">
                            <span className="text-[9px] font-mono text-ink-soft font-bold tracking-wider uppercase block">
                              Paket Mentoring
                            </span>
                            <div className="text-[11px] font-black text-ink mt-0.5 leading-tight">{session.packageName}</div>
                            {session.meetLink ? (
                              <a
                                href={session.meetLink}
                                target="_blank"
                                rel="noreferrer"
                                className="text-[10px] text-blue-600 hover:underline flex items-center gap-0.5 mt-1"
                              >
                                <span>Link Meeting</span>
                                <ExternalLink className="h-2 w-2" />
                              </a>
                            ) : (
                              <span className="text-[9px] text-ink-soft italic">Link belum disiapkan</span>
                            )}
                          </div>

                          {/* Status Badge */}
                          <div className="md:col-span-2 md:text-right">
                            <span className={`inline-block rounded-full px-2.5 py-1 text-[10px] font-black tracking-wider uppercase font-mono ${
                              session.status === 'CONFIRMED' ? 'bg-emerald-100 text-emerald-800' :
                              session.status === 'PENDING' ? 'bg-amber-100 text-amber-800' :
                              'bg-slate-100 text-slate-700'
                            }`}>
                              {session.status === 'CONFIRMED' ? 'DISUTUJUI' :
                               session.status === 'PENDING' ? 'MENUNGGU' :
                               'SELESAI'}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })()}
          </div>
        )}

        {/* Add Mentor Modal */}
        {showAddMentorModal && (
          <div className="fixed inset-0 z-[3000] flex items-center justify-center bg-ink/60 p-4 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full max-w-md rounded-2xl border border-line bg-white shadow-2xl p-6"
            >
              <div className="flex items-center justify-between border-b border-line pb-4 mb-4">
                <h3 className="font-display font-bold text-lg text-ink">Tambah Mentor Baru</h3>
                <button
                  onClick={() => setShowAddMentorModal(false)}
                  className="rounded-full p-1 text-ink-soft hover:bg-paper-alt hover:text-ink"
                >
                  <RefreshCw className="h-4 w-4 transform rotate-180" />
                </button>
              </div>

              <form onSubmit={handleAddMentorSubmit} className="space-y-4 text-xs font-semibold">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-ink-soft mb-1">Nama Lengkap</label>
                  <input
                    type="text"
                    required
                    value={newMentorName}
                    onChange={(e) => setNewMentorName(e.target.value)}
                    placeholder="Contoh: Kak Andre Wijaya"
                    className="w-full rounded-lg border border-line bg-white px-3 py-2 text-ink outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-ink-soft mb-1">Role / Pengalaman Juara</label>
                  <input
                    type="text"
                    required
                    value={newMentorRole}
                    onChange={(e) => setNewMentorRole(e.target.value)}
                    placeholder="Contoh: Juara 1 Nasional BCC / Consultant at PwC"
                    className="w-full rounded-lg border border-line bg-white px-3 py-2 text-ink outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-ink-soft mb-1">Bio Singkat</label>
                  <textarea
                    value={newMentorBio}
                    onChange={(e) => setNewMentorBio(e.target.value)}
                    placeholder="Berikan deskripsi singkat latar belakang bimbingan..."
                    className="w-full rounded-lg border border-line bg-white px-3 py-2 text-ink outline-none h-20 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-ink-soft mb-1">Tag Keahlian (pisahkan dengan koma)</label>
                  <input
                    type="text"
                    value={newMentorTags}
                    onChange={(e) => setNewMentorTags(e.target.value)}
                    placeholder="Strategy, Finance, Marketing"
                    className="w-full rounded-lg border border-line bg-white px-3 py-2 text-ink outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-ink text-white py-2.5 text-xs font-bold hover:bg-ink-soft transition-all"
                >
                  Publish Mentor Baru
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </main>
    </div>
  );
}

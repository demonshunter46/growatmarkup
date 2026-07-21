import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Calendar, Star, Clock, CheckCircle, Plus, DollarSign, Users, AlertCircle,
  LogOut, RefreshCw, Layers, MapPin, Send, Trash, ShieldAlert
} from 'lucide-react';
import { Mentor, BookedSession } from '../types';
import MarkUpLogo from './MarkUpLogo';

interface MentorPanelProps {
  mentors: Mentor[];
  sessions: BookedSession[];
  onConfirmSession: (sessionId: string) => void;
  onCompleteSession: (sessionId: string) => void;
  onAddSlot: (mentorId: string, slotStr: string) => void;
  onLogout: () => void;
}

export default function MentorPanel({
  mentors,
  sessions,
  onConfirmSession,
  onCompleteSession,
  onAddSlot,
  onLogout,
}: MentorPanelProps) {
  // Let the user choose which mentor profile to view for simulation
  const [selectedMentorId, setSelectedMentorId] = useState(mentors[0].id);

  // Active mentor object
  const activeMentor = mentors.find((m) => m.id === selectedMentorId) || mentors[0];

  // Specific slots and sessions for active mentor
  const mentorSessions = sessions.filter((s) => s.mentorId === activeMentor.id);
  const pendingSessions = mentorSessions.filter((s) => s.status === 'PENDING');
  const activeSessionsCount = mentorSessions.filter((s) => s.status === 'CONFIRMED').length;

  // Calculate earnings based on sessions completed: Rp125.000 per completed session
  const completedSessions = mentorSessions.filter((s) => s.status === 'COMPLETED');
  const completedSessionsCount = completedSessions.length;
  const estimatedEarnings = completedSessionsCount * 125000 + 4000000; // Base rate + completed sessions

  const [newSlotDate, setNewSlotDate] = useState('2026-07-21');
  const [newSlotTime, setNewSlotTime] = useState('19:00');

  const handleAddSlotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSlotDate || !newSlotTime) return;

    const slotIso = new Date(`${newSlotDate}T${newSlotTime}:00.000Z`).toISOString();
    onAddSlot(activeMentor.id, slotIso);
    alert('Ketersediaan waktu berhasil ditambahkan! Siswa sekarang dapat mem-booking slot ini.');
  };

  // Helper formatting currency
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
      hour: '2-digit',
      minute: '2-digit',
    }) + ' WIB';
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-paper">
      {/* Sidebar (3 cols on desktop, responsive bar on mobile) */}
      <aside className="lg:col-span-3 bg-ink text-white p-4 lg:p-6 flex flex-col lg:min-h-screen justify-between border-b lg:border-b-0 border-white/10 z-20">
        <div className="space-y-4 lg:space-y-6">
          <div className="flex items-center justify-between lg:border-b lg:border-white/10 lg:pb-4">
            <div className="flex items-center gap-2">
              <MarkUpLogo size={28} />
              <span className="font-display text-base lg:text-lg font-bold">Mark-Up Mentor</span>
            </div>
            
            {/* Quick mobile metadata & Logout */}
            <div className="flex lg:hidden items-center gap-3">
              <span className="rounded bg-violet-custom text-white px-1.5 py-0.5 text-[8px] font-mono tracking-widest uppercase font-black">
                MENTOR
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

          <div className="space-y-2 lg:space-y-3">
            <label className="block text-[10px] font-bold uppercase tracking-widest text-white/50">
              Pilih Login Mentor (Simulasi)
            </label>
            <select
              value={selectedMentorId}
              onChange={(e) => setSelectedMentorId(e.target.value)}
              className="w-full rounded-xl bg-white/10 border border-white/20 px-3 py-1.5 lg:py-2 text-xs font-semibold text-white outline-none focus:border-gold-custom"
            >
              {mentors.map((m) => (
                <option key={m.id} value={m.id} className="bg-ink text-white">
                  {m.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex lg:flex-col overflow-x-auto lg:overflow-visible pb-1 lg:pb-0 gap-2 lg:gap-1 scrollbar-none pt-2 lg:pt-4 border-t lg:border-t-0 border-white/10">
            <div className="flex-shrink-0 px-3 lg:px-4 py-1.5 lg:py-2.5 rounded-xl bg-white/5 text-xs font-semibold tracking-wide text-white flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-custom" />
              <span>Jadwal & Ketersediaan</span>
            </div>
            <div className="flex-shrink-0 px-3 lg:px-4 py-1.5 lg:py-2.5 rounded-xl text-xs font-semibold text-white/40 hover:bg-white/5 cursor-not-allowed">
              <span>Invoice & Honorarium</span>
            </div>
          </div>
        </div>

        {/* Desktop Profile Card */}
        <div className="hidden lg:block space-y-4 pt-6 border-t border-white/10">
          <div className="rounded-xl bg-white/5 p-4 space-y-2">
            <span className="text-[10px] font-mono text-white/50 uppercase tracking-widest block">Logged in as:</span>
            <div className="font-bold text-sm leading-none text-white">{activeMentor.name}</div>
            <div className="text-[10px] text-white/60 leading-tight mt-1 line-clamp-1">{activeMentor.role.split(' & ')[0]}</div>
            <span className="inline-block rounded bg-violet-custom text-white px-2 py-0.5 text-[8px] font-black tracking-widest font-mono uppercase mt-2">
              MENTOR
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

      {/* Main Panel (9 cols) */}
      <main className="lg:col-span-9 p-6 md:p-10 overflow-y-auto max-h-screen space-y-8">
        {/* Top Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-line pb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-ink font-display">Ringkasan Mentor</h1>
            <p className="text-sm text-ink-soft mt-1">
              Selamat datang kembali, <span className="font-semibold text-ink">{activeMentor.name}</span>. Anda memiliki {activeSessionsCount} sesi aktif terjadwal minggu ini.
            </p>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          <div className="rounded-2xl border border-line bg-white p-5 shadow-sm space-y-1">
            <span className="text-[10px] font-mono font-bold text-ink-soft uppercase tracking-wider block">Total Tim Dibimbing</span>
            <div className="font-display text-2xl font-black text-ink">{activeMentor.totalTeams}</div>
            <p className="text-xs text-ink-soft">Akumulasi seluruh batch</p>
          </div>

          <div className="rounded-2xl border border-line bg-white p-5 shadow-sm space-y-1">
            <span className="text-[10px] font-mono font-bold text-ink-soft uppercase tracking-wider block">Rating Rata-rata</span>
            <div className="font-display text-2xl font-black text-ink flex items-center gap-1">
              <span>{activeMentor.rating.toFixed(2)}</span>
              <Star className="h-4 w-4 fill-gold-custom text-gold-custom stroke-none" />
            </div>
            <p className="text-xs text-ink-soft">Dari feedback kuesioner siswa</p>
          </div>

          <div className="rounded-2xl border border-line bg-white p-5 shadow-sm space-y-1">
            <span className="text-[10px] font-mono font-bold text-rose-500 uppercase tracking-wider block">Pending Sessions</span>
            <div className="font-display text-2xl font-black text-rose-600">{pendingSessions.length}</div>
            <p className="text-xs text-ink-soft">Menunggu persetujuan Anda</p>
          </div>

          <div className="rounded-2xl border border-line bg-white p-5 shadow-sm space-y-1">
            <span className="text-[10px] font-mono font-bold text-emerald-600 uppercase tracking-wider block">Estimasi Honor Bln Ini</span>
            <div className="font-display text-2xl font-black text-emerald-600">{formatCurrency(estimatedEarnings)}</div>
            <p className="text-xs text-ink-soft">Sesi dikerjakan: {completedSessionsCount}</p>
          </div>
        </div>

        {/* Main Workspace: Calendar / Booking Management + Availability Setter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left panel: Session list (7 cols) */}
          <div className="lg:col-span-7 rounded-2xl border border-line bg-white p-6 shadow-sm space-y-4">
            <h3 className="font-display font-bold text-base text-ink border-b border-line pb-3">Jadwal Sesi Mendatang</h3>

            {mentorSessions.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-line text-[10px] uppercase font-mono text-ink-soft tracking-wider">
                      <th className="py-2.5">WAKTU</th>
                      <th className="py-2.5">TIM PESERTA</th>
                      <th className="py-2.5">TOPIK SESI</th>
                      <th className="py-2.5 text-right">AKSI</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line text-xs font-semibold">
                    {mentorSessions.map((sess) => (
                      <tr key={sess.id} className="hover:bg-slate-50">
                        <td className="py-3.5 pr-2 font-mono text-ink-soft whitespace-nowrap">
                          {formatDate(sess.date)}
                        </td>
                        <td className="py-3.5 pr-2">
                          <div className="font-bold text-ink">{sess.studentName}</div>
                          <span className="text-[9px] font-mono text-violet-custom bg-paper-alt px-1.5 py-0.5 rounded">
                            {sess.packageName.split(' (')[0]}
                          </span>
                        </td>
                        <td className="py-3.5 text-ink-soft font-normal line-clamp-1 max-w-[150px] mt-2">
                          {sess.topic}
                        </td>
                        <td className="py-3.5 text-right whitespace-nowrap">
                          {sess.status === 'COMPLETED' ? (
                            <span className="inline-block rounded-full bg-emerald-100 text-emerald-800 px-2.5 py-1 text-[10px] font-bold">
                              Completed ✓
                            </span>
                          ) : sess.status === 'CONFIRMED' ? (
                            <button
                              onClick={() => onCompleteSession(sess.id)}
                              className="rounded bg-ink text-white px-2.5 py-1 text-[10px] font-bold hover:bg-ink-soft transition-colors"
                            >
                              Selesaikan Sesi
                            </button>
                          ) : (
                            <button
                              onClick={() => onConfirmSession(sess.id)}
                              className="rounded bg-violet-custom text-white px-2.5 py-1 text-[10px] font-bold hover:bg-violet-deep transition-colors"
                            >
                              Setujui Sesi
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12 text-ink-soft space-y-2">
                <AlertCircle className="h-8 w-8 text-amber-500 mx-auto animate-pulse" />
                <p className="text-xs font-medium">Belum ada tim yang mem-booking jadwal Anda minggu ini.</p>
              </div>
            )}
          </div>

          {/* Right panel: Availability Creator (5 cols) */}
          <div className="lg:col-span-5 rounded-2xl border border-line bg-white p-6 shadow-sm space-y-4">
            <h3 className="font-display font-bold text-base text-ink border-b border-line pb-3">Atur Ketersediaan Slot</h3>

            <form onSubmit={handleAddSlotSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-ink-soft mb-1">
                  Pilih Tanggal Slot <span className="text-rose-500">*</span>
                </label>
                <input
                  type="date"
                  required
                  value={newSlotDate}
                  min="2026-07-20"
                  max="2026-07-30"
                  onChange={(e) => setNewSlotDate(e.target.value)}
                  className="w-full rounded-lg border border-line bg-white px-3 py-2 text-xs font-semibold text-ink outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-ink-soft mb-1">
                  Pilih Jam (WIB) <span className="text-rose-500">*</span>
                </label>
                <select
                  required
                  value={newSlotTime}
                  onChange={(e) => setNewSlotTime(e.target.value)}
                  className="w-full rounded-lg border border-line bg-white px-3 py-2 text-xs font-semibold text-ink outline-none"
                >
                  <option value="09:00">09:00 WIB</option>
                  <option value="11:00">11:00 WIB</option>
                  <option value="13:00">13:00 WIB</option>
                  <option value="15:00">15:00 WIB</option>
                  <option value="16:00">16:00 WIB</option>
                  <option value="19:00">19:00 WIB (Sore/Malam)</option>
                  <option value="20:00">20:00 WIB (Malam)</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-ink text-white py-2.5 text-xs font-bold hover:bg-ink-soft transition-all flex items-center justify-center gap-1.5"
              >
                <Plus className="h-4 w-4" />
                <span>Publish Slot Baru</span>
              </button>
            </form>

            <div className="mt-4 pt-4 border-t border-line">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-ink-soft block mb-2">
                Daftar Slot Anda Yang Terpublish ({activeMentor.availableSlots.length})
              </span>
              <div className="flex flex-wrap gap-1.5 max-h-[160px] overflow-y-auto">
                {activeMentor.availableSlots.map((slot, index) => (
                  <span
                    key={index}
                    className="inline-block rounded-md bg-paper-alt px-2 py-1 text-[9px] font-semibold text-ink border border-line font-mono"
                  >
                    {formatDate(slot).split(' WIB')[0]}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

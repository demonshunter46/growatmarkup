import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, Mail, Eye, EyeOff, ShieldCheck, AlertCircle, ArrowRight, X } from 'lucide-react';
import MarkUpLogo from './MarkUpLogo';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (role: 'student' | 'mentor' | 'admin', email: string) => void;
  initialRole?: 'student' | 'mentor' | 'admin' | null;
}

export default function LoginModal({ isOpen, onClose, onLoginSuccess, initialRole = null }: LoginModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Hardcoded valid accounts as specified
  const ACCOUNTS = {
    admin: {
      email: 'administrator@markup.id',
      password: 'markupsukses123',
      roleName: 'Manajer / Admin Board',
      role: 'admin' as const
    },
    student: {
      email: 'mentee1@markup.id',
      password: 'markupsukses123',
      roleName: 'Pelanggan / Student LMS',
      role: 'student' as const
    },
    mentor: {
      email: 'mentor1@markup.id',
      password: 'markupsukses123',
      roleName: 'Mentor Panel',
      role: 'mentor' as const
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError('Email dan Password wajib diisi.');
      return;
    }

    setIsLoading(true);

    // Simulate network delay for a highly polished production feel
    setTimeout(() => {
      setIsLoading(false);
      
      const normalizedEmail = email.trim().toLowerCase();
      
      let matchedRole: 'student' | 'mentor' | 'admin' | null = null;

      if (normalizedEmail === ACCOUNTS.admin.email && password === ACCOUNTS.admin.password) {
        matchedRole = 'admin';
      } else if (normalizedEmail === ACCOUNTS.student.email && password === ACCOUNTS.student.password) {
        matchedRole = 'student';
      } else if (normalizedEmail === ACCOUNTS.mentor.email && password === ACCOUNTS.mentor.password) {
        matchedRole = 'mentor';
      }

      if (matchedRole) {
        onLoginSuccess(matchedRole, normalizedEmail);
        onClose();
        // Clear inputs on success
        setEmail('');
        setPassword('');
      } else {
        setError('ID atau Password yang Anda masukkan salah. Silakan periksa kembali.');
      }
    }, 850);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
        />

        {/* Modal Sheet */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-md overflow-hidden rounded-2xl border border-line bg-white shadow-2xl z-10"
        >
          {/* Header background decoration banner */}
          <div className="h-2 bg-gradient-to-r from-violet-custom via-pink-500 to-gold-custom" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-1 rounded-full text-ink-soft hover:bg-paper-alt hover:text-ink transition-all"
            id="close-login-modal"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="p-6 md:p-8">
            <div className="flex flex-col items-center text-center mb-6">
              <MarkUpLogo size={42} />
              <h2 className="font-display text-xl font-bold text-ink mt-3">Selamat Datang di Mark-Up</h2>
              <p className="text-xs text-ink-soft mt-1">Silakan masuk untuk mengakses dashboard member Anda</p>
            </div>

            {/* Error message block */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 rounded-xl bg-rose-50 border border-rose-200 p-3 flex items-start gap-2.5 text-xs text-rose-700 font-medium"
              >
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </motion.div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-ink-soft mb-1.5">
                  ID / Email Akun
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-ink-soft/60">
                    <Mail className="h-4 w-4" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nama@markup.id"
                    disabled={isLoading}
                    className="w-full rounded-xl border border-line bg-paper-alt pl-10 pr-4 py-3 text-xs font-medium text-ink placeholder-ink-soft/40 outline-none focus:border-violet-custom focus:bg-white transition-all disabled:opacity-60"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-ink-soft mb-1.5">
                  Kata Sandi
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-ink-soft/60">
                    <Lock className="h-4 w-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    disabled={isLoading}
                    className="w-full rounded-xl border border-line bg-paper-alt pl-10 pr-10 py-3 text-xs font-medium text-ink placeholder-ink-soft/40 outline-none focus:border-violet-custom focus:bg-white transition-all disabled:opacity-60"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-ink-soft/60 hover:text-ink transition-all"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-xl bg-ink hover:bg-ink-soft py-3 text-xs font-bold text-white transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-75 cursor-pointer"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Memverifikasi Akun...</span>
                  </span>
                ) : (
                  <>
                    <span>Masuk ke Dashboard</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

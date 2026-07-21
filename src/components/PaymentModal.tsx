import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, CreditCard, Award, QrCode, ArrowRight } from 'lucide-react';
import { Package, Transaction } from '../types';
import MarkUpLogo from './MarkUpLogo';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPackage: Package | null;
  onPaymentSuccess: (transaction: Transaction) => void;
}

export default function PaymentModal({ isOpen, onClose, selectedPackage, onPaymentSuccess }: PaymentModalProps) {
  const [paymentMethod, setPaymentMethod] = useState<'qris' | 'va'>('qris');
  const [teamName, setTeamName] = useState('');
  const [email, setEmail] = useState('');
  const [isSimulating, setIsSimulating] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen || !selectedPackage) return null;

  const handleSimulatePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!teamName.trim() || !email.trim()) {
      alert('Mohon isi nama tim/personal dan email Anda.');
      return;
    }

    setIsSimulating(true);

    // Simulate 1.5 seconds payment gateway response
    setTimeout(() => {
      setIsSimulating(false);
      setIsSuccess(true);

      const newTx: Transaction = {
        id: `TRX-${Math.floor(1000 + Math.random() * 9000)}`,
        date: new Date().toISOString(),
        teamName: teamName.trim(),
        packageName: `${selectedPackage.name} (${selectedPackage.category})`,
        amount: selectedPackage.price,
        paymentMethod: paymentMethod === 'qris' ? 'QRIS GoPay/OVO' : 'Virtual Account BNI',
        status: 'PAID',
      };

      setTimeout(() => {
        onPaymentSuccess(newTx);
        setIsSuccess(false);
        setTeamName('');
        setEmail('');
        onClose();
      }, 2000);
    }, 1500);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-ink/70 p-4 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-line bg-white shadow-2xl"
          id="payment-modal-container"
        >
          {/* Header */}
          <div className="flex items-center justify-between bg-ink p-5 text-white">
            <div className="flex items-center gap-3">
              <MarkUpLogo size={36} />
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-gold-custom">Invoice Simulator</span>
                <h3 className="text-xl font-bold font-display leading-tight">Pembayaran Aman</h3>
              </div>
            </div>
            <button
              onClick={onClose}
              className="rounded-full p-1.5 text-white/70 hover:bg-white/10 hover:text-white transition-all"
              id="close-payment-modal"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {isSuccess ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center p-12 text-center"
              id="payment-success-screen"
            >
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 animate-bounce">
                <Check className="h-8 w-8 stroke-[3]" />
              </div>
              <h4 className="text-2xl font-bold font-display text-ink">Pembayaran Berhasil!</h4>
              <p className="mt-2 text-sm text-ink-soft max-w-sm">
                Sistem mendeteksi transfer Anda secara otomatis. Akun LMS Tim <span className="font-semibold text-violet-custom">{teamName}</span> telah diaktifkan!
              </p>
              <div className="mt-6 rounded-lg bg-paper-alt p-4 text-left w-full">
                <div className="flex justify-between text-xs font-mono text-ink-soft">
                  <span>PAKET:</span>
                  <span className="text-ink font-semibold">{selectedPackage.name}</span>
                </div>
                <div className="mt-2 flex justify-between text-xs font-mono text-ink-soft">
                  <span>TOTAL BAYAR:</span>
                  <span className="text-ink font-semibold">{selectedPackage.priceFormatted}</span>
                </div>
                <div className="mt-2 flex justify-between text-xs font-mono text-ink-soft">
                  <span>STATUS:</span>
                  <span className="text-emerald-600 font-bold uppercase">PAID (ACTIVE)</span>
                </div>
              </div>
              <p className="mt-4 text-xs text-ink-soft animate-pulse">Mengalihkan ke Dashboard LMS...</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSimulatePayment} className="p-6">
              {/* Package Summary */}
              <div className="mb-6 rounded-xl border border-line bg-paper-alt p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="inline-block rounded-md bg-violet-custom/10 px-2 py-0.5 text-[10px] font-bold font-mono uppercase text-violet-custom">
                      {selectedPackage.category}
                    </span>
                    <h4 className="mt-1 font-bold text-ink">{selectedPackage.name}</h4>
                    <p className="text-xs text-ink-soft">{selectedPackage.audience}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-ink font-display">{selectedPackage.priceFormatted}</div>
                    <div className="text-[10px] text-ink-soft font-mono uppercase">{selectedPackage.unit.split(' · ')[1]}</div>
                  </div>
                </div>
              </div>

              {/* Form inputs */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-ink-soft mb-1">
                    Nama Tim / Personal <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    placeholder="Contoh: Tim Elang Muda"
                    className="w-full rounded-lg border border-line bg-white px-3 py-2.5 text-sm text-ink outline-none transition-all focus:border-violet-custom focus:ring-1 focus:ring-violet-custom"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-ink-soft mb-1">
                    Alamat Email Aktif <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Contoh: tim@elangmuda.com"
                    className="w-full rounded-lg border border-line bg-white px-3 py-2.5 text-sm text-ink outline-none transition-all focus:border-violet-custom focus:ring-1 focus:ring-violet-custom"
                  />
                </div>

                {/* Payment Method Selector */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-ink-soft mb-2">
                    Metode Pembayaran Otomatis
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('qris')}
                      className={`flex flex-col items-center justify-center rounded-xl border p-3 text-center transition-all ${
                        paymentMethod === 'qris'
                          ? 'border-violet-custom bg-violet-custom/5 text-violet-custom'
                          : 'border-line bg-white text-ink-soft hover:bg-paper'
                      }`}
                    >
                      <QrCode className="mb-1 h-5 w-5" />
                      <span className="text-xs font-bold font-display">QRIS (Gopay/OVO)</span>
                      <span className="text-[9px] opacity-75">Konfirmasi 2 Detik</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('va')}
                      className={`flex flex-col items-center justify-center rounded-xl border p-3 text-center transition-all ${
                        paymentMethod === 'va'
                          ? 'border-violet-custom bg-violet-custom/5 text-violet-custom'
                          : 'border-line bg-white text-ink-soft hover:bg-paper'
                      }`}
                    >
                      <CreditCard className="mb-1 h-5 w-5" />
                      <span className="text-xs font-bold font-display">Virtual Account</span>
                      <span className="text-[9px] opacity-75">Transfer BNI / Mandiri</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* QRIS Visual Sandbox */}
              <div className="mt-6 border-t border-line pt-4 flex flex-col items-center justify-center">
                {paymentMethod === 'qris' ? (
                  <div className="flex flex-col items-center text-center p-3 border border-dashed border-line rounded-xl bg-paper">
                    <div className="w-36 h-36 bg-white border border-line p-2 rounded-lg flex items-center justify-center shadow-inner relative">
                      <div className="grid grid-cols-5 gap-1.5 opacity-80">
                        {Array.from({ length: 25 }).map((_, i) => (
                          <div
                            key={i}
                            className={`w-5 h-5 rounded-sm ${
                              (i % 3 === 0 || i % 7 === 1 || i < 5 || i % 5 === 0) && i !== 12
                                ? 'bg-ink'
                                : 'bg-transparent'
                            }`}
                          />
                        ))}
                      </div>
                      <div className="absolute inset-0 m-auto w-10 h-10 bg-white rounded-md border border-line flex items-center justify-center font-display font-black text-[10px] text-violet-custom">
                        M-Up
                      </div>
                    </div>
                    <span className="mt-2 text-[10px] font-mono text-ink-soft">Scan QRIS menggunakan Gopay, OVO, Dana, LinkAja</span>
                  </div>
                ) : (
                  <div className="w-full rounded-xl border border-line bg-paper p-4 text-center">
                    <div className="text-xs text-ink-soft uppercase tracking-wider font-semibold">Virtual Account Number</div>
                    <div className="mt-1 font-mono text-lg font-bold text-ink tracking-widest">8842 2026 5521 9921</div>
                    <div className="mt-1 text-[10px] text-ink-soft">Bank BNI Cabang Khusus Mark-Up</div>
                  </div>
                )}
              </div>

              {/* Action */}
              <button
                type="submit"
                disabled={isSimulating}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-ink py-3 font-bold text-white transition-all hover:bg-ink-soft disabled:opacity-50"
                id="submit-payment"
              >
                {isSimulating ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    <span>Memverifikasi Pembayaran...</span>
                  </div>
                ) : (
                  <>
                    <span>Simulasikan Bayar {selectedPackage.priceFormatted}</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

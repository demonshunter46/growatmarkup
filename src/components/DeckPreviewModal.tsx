import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Download, Award, ChevronLeft, ChevronRight, FileText, CheckCircle } from 'lucide-react';
import { ChampionDeck } from '../types';

interface DeckPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  deck: ChampionDeck | null;
  onDownload: (deckId: string) => void;
}

export default function DeckPreviewModal({ isOpen, onClose, deck, onDownload }: DeckPreviewModalProps) {
  const [activeSlide, setActiveSlide] = useState(0);

  if (!isOpen || !deck) return null;

  // Render a list of mockup slide slides for a business competition
  const mockSlides = [
    {
      title: 'Slide 1: Executive Summary / Title Slide',
      subtitle: `${deck.title} — ${deck.award}`,
      description: 'Slide pembuka yang merangkum pain point utama dan proposisi nilai solusi kami secara visual.',
      points: ['Nama tim: ' + deck.team, 'Tahun: ' + deck.year, 'Slogan solusi yang catchy & mudah diingat'],
      bgColor: 'bg-gradient-to-r from-violet-custom to-magenta-custom text-white',
    },
    {
      title: 'Slide 2: Problem Statement',
      subtitle: 'Analisis Permasalahan Lapangan',
      description: 'Menyajikan data statistik valid tentang masalah yang dihadapi target market beserta kerugian finansial/sosial.',
      points: [
        'Data statistik 3 tahun terakhir',
        'Analisis akar masalah (Root Cause Analysis)',
        'Quote dari riset pasar langsung'
      ],
      bgColor: 'bg-slate-900 text-white',
    },
    {
      title: 'Slide 3: Proposed Solution',
      subtitle: 'Solusi Terobosan & Unique Selling Proposition (USP)',
      description: 'Bagaimana produk atau platform kami memecahkan masalah tersebut dengan cara yang lebih murah, lebih cepat, dan lebih efisien.',
      points: [
        'Arsitektur teknologi atau alur operasional',
        '3 pilar keunikan dibandingkan cara konvensional',
        'Mockup visual atau purwarupa (prototype)'
      ],
      bgColor: 'bg-violet-custom text-white',
    },
    {
      title: 'Slide 4: Market Sizing (TAM, SAM, SOM)',
      subtitle: 'Potensi Pasar & Segmentasi',
      description: 'Menghitung Total Addressable Market (TAM), Serviceable Addressable Market (SAM), dan Serviceable Obtainable Market (SOM).',
      points: [
        'TAM: Seluruh pasar pangan berkelanjutan di Indonesia',
        'SAM: Target pasar milenial di area urban Jawa',
        'SOM: Target penjualan tahun pertama (15% SAM)'
      ],
      bgColor: 'bg-white text-ink border border-line',
    },
    {
      title: 'Slide 5: Business Model / Monetisasi',
      subtitle: 'Cara Perusahaan Menghasilkan Uang',
      description: 'Menjabarkan aliran pendapatan (revenue streams), struktur harga, dan siklus hidup pelanggan.',
      points: [
        'Langganan bulanan B2B SaaS',
        'Komisi transaksi marketplace 5%',
        'Jasa konsultasi instalasi kustom'
      ],
      bgColor: 'bg-slate-50 text-ink border border-line',
    },
    {
      title: 'Slide 6: Financial Projection',
      subtitle: 'Proyeksi Keuangan 5 Tahun',
      description: 'Grafik kelayakan keuangan termasuk NPV, IRR, Payback Period, Break-Even Point (BEP), dan rincian alokasi modal.',
      points: [
        'NPV senilai Rp1.2 Miliar dengan IRR 42%',
        'Payback period dalam waktu 18 bulan',
        'Tabel Cash Flow tahunan yang di-audit'
      ],
      bgColor: 'bg-slate-950 text-white',
    },
  ];

  const handlePrev = () => {
    setActiveSlide((prev) => (prev > 0 ? prev - 1 : mockSlides.length - 1));
  };

  const handleNext = () => {
    setActiveSlide((prev) => (prev < mockSlides.length - 1 ? prev + 1 : 0));
  };

  const handleDownloadClick = () => {
    onDownload(deck.id);
    // Create a mock PDF download link effect
    const link = document.createElement('a');
    link.href = '#';
    link.setAttribute('download', `${deck.title.replace(/\s+/g, '_')}_champion_deck.pdf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-ink/70 p-4 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 15 }}
          className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-line bg-white shadow-2xl"
          id="deck-preview-container"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-line p-5 bg-paper">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-custom/10 text-violet-custom">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-gold-custom/20 px-2.5 py-0.5 text-[10px] font-bold text-ink font-mono uppercase">
                    {deck.award}
                  </span>
                  <span className="text-xs text-ink-soft font-semibold">{deck.category} Team</span>
                </div>
                <h3 className="text-lg font-bold font-display text-ink leading-tight">{deck.title}</h3>
              </div>
            </div>
            <button
              onClick={onClose}
              className="rounded-full p-2 text-ink-soft hover:bg-paper-alt hover:text-ink transition-all"
              id="close-deck-preview"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12">
            {/* Interactive Slide Viewer Left (8 cols) */}
            <div className="md:col-span-8 bg-slate-100 p-6 flex flex-col justify-between min-h-[380px]">
              {/* Slide Screen Preview */}
              <motion.div
                key={activeSlide}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className={`flex-1 flex flex-col justify-between rounded-xl p-6 shadow-md ${mockSlides[activeSlide].bgColor}`}
                id={`slide-${activeSlide}`}
              >
                <div>
                  <div className="flex items-center justify-between opacity-80 border-b border-white/20 pb-2 mb-4 text-[10px] font-mono tracking-wider">
                    <span>{deck.team}</span>
                    <span>SLIDE {activeSlide + 1} OF {mockSlides.length}</span>
                  </div>
                  <h4 className="text-lg font-bold font-display">{mockSlides[activeSlide].title}</h4>
                  <p className="text-sm font-semibold opacity-90 mt-1">{mockSlides[activeSlide].subtitle}</p>
                  <p className="text-xs opacity-85 mt-3 leading-relaxed max-w-lg">{mockSlides[activeSlide].description}</p>
                </div>

                <div className="mt-4">
                  <div className="text-[10px] font-mono tracking-widest uppercase opacity-75 mb-2">Key Highlights / Poin Inti:</div>
                  <ul className="space-y-1.5">
                    {mockSlides[activeSlide].points.map((pt, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs font-medium">
                        <CheckCircle className="h-3 w-3 flex-shrink-0" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              {/* Controls */}
              <div className="flex items-center justify-between mt-4">
                <button
                  onClick={handlePrev}
                  className="flex items-center gap-1 rounded-lg bg-white border border-line px-3 py-1.5 text-xs font-semibold text-ink hover:bg-paper-alt transition-all"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span>Slide Sebelumnya</span>
                </button>
                <span className="text-xs font-mono font-bold text-ink-soft">
                  Slide {activeSlide + 1} / {mockSlides.length}
                </span>
                <button
                  onClick={handleNext}
                  className="flex items-center gap-1 rounded-lg bg-white border border-line px-3 py-1.5 text-xs font-semibold text-ink hover:bg-paper-alt transition-all"
                >
                  <span>Berikutnya</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Sidebar Right (4 cols) */}
            <div className="md:col-span-4 p-6 border-t md:border-t-0 md:border-l border-line flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-ink-soft mb-2">Analisis & Key Insights</h4>
                <div className="space-y-3">
                  {deck.keyInsights.map((insight, i) => (
                    <div key={i} className="flex gap-2.5 items-start">
                      <div className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-violet-custom/10 text-violet-custom font-bold text-[9px]">
                        {i + 1}
                      </div>
                      <p className="text-xs text-ink leading-relaxed">{insight}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 border-t border-line pt-4 bg-paper-alt -mx-6 px-6 pb-4">
                  <div className="text-xs font-mono font-bold uppercase tracking-wider text-ink-soft mb-2">Metadata File</div>
                  <div className="grid grid-cols-2 gap-2 text-xs font-medium">
                    <div className="text-ink-soft">Kategori:</div>
                    <div className="text-ink text-right">{deck.category} Proposal</div>
                    <div className="text-ink-soft">Ukuran File:</div>
                    <div className="text-ink text-right">4.8 MB (PDF)</div>
                    <div className="text-ink-soft">Jumlah Slide:</div>
                    <div className="text-ink text-right">{deck.slidesCount} Halaman</div>
                    <div className="text-ink-soft">Total Diunduh:</div>
                    <div className="text-violet-custom font-bold text-right">{deck.downloads} kali</div>
                  </div>
                </div>
              </div>

              <div className="mt-6 border-t border-line pt-4">
                <button
                  onClick={handleDownloadClick}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-ink py-2.5 text-sm font-bold text-white hover:bg-ink-soft transition-all"
                >
                  <Download className="h-4 w-4" />
                  <span>Unduh File Lengkap (.pdf)</span>
                </button>
                <p className="mt-2 text-center text-[10px] text-ink-soft">Unduh berkas PDF asli yang dipresentasikan di babak final.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

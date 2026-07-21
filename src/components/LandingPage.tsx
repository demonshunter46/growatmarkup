import { useState } from 'react';
import { motion } from 'motion/react';
import { Award, ArrowRight, Star, ArrowUpRight, Zap, Play, Check, Shield, Lock, ExternalLink } from 'lucide-react';
import { Package, Mentor, Competition } from '../types';
import MarkUpLogo from './MarkUpLogo';

interface LandingPageProps {
  packages: Package[];
  mentors: Mentor[];
  competitions?: Competition[];
  onSelectPackage: (pkg: Package) => void;
  onLoginClick: (role?: 'student' | 'mentor' | 'admin') => void;
}

export default function LandingPage({ packages, mentors, competitions = [], onSelectPackage, onLoginClick }: LandingPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<'BCC' | 'BPC' | 'AKADEMI'>('BCC');

  const filteredPackages = packages.filter((pkg) => pkg.category === selectedCategory);

  const handlePackageSelect = (pkg: Package) => {
    onSelectPackage(pkg);
  };

  return (
    <div className="relative min-h-screen bg-paper pb-16">
      {/* Navigation */}
      <nav className="flex items-center justify-between border-b border-line bg-white px-6 py-4 md:px-12 relative z-50">
        <div className="flex items-center gap-2">
          <MarkUpLogo size={36} withText={true} />
        </div>

        <div className="hidden items-center gap-8 text-sm font-medium text-ink-soft md:flex">
          <a href="#cara-kerja" className="hover:text-violet-custom transition-all">Cara Beli</a>
          <a href="#paket" className="hover:text-violet-custom transition-all">Paket Mentoring</a>
          <a href="#profil" className="hover:text-violet-custom transition-all">Profil & Visi Misi</a>
          <a href="#lomba" className="hover:text-violet-custom transition-all">Info Lomba</a>
          <a href="#mentor" className="hover:text-violet-custom transition-all">Mentor Kami</a>
        </div>

        <div className="relative">
          <button
            onClick={() => onLoginClick()}
            className="rounded-full bg-ink px-5 py-2 text-xs font-bold text-white hover:bg-ink-soft transition-all flex items-center gap-1.5"
            id="login-button"
          >
            <span>Masuk Member</span>
            <ArrowUpRight className="h-3 w-3" />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="mx-auto max-w-7xl px-6 py-12 md:px-12 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-paper-alt px-3.5 py-1 text-xs font-semibold text-violet-custom">
            <span className="h-2 w-2 rounded-full bg-magenta-custom animate-pulse" />
            <span className="font-mono uppercase tracking-wider text-[10px]">Batch 2026 Registration Open</span>
          </div>

          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-ink leading-[1.12]">
            Dari ide di kertas<br />
            ke <span className="bg-gradient-to-r from-violet-custom to-magenta-custom bg-clip-text text-transparent">panggung final.</span>
          </h1>

          <p className="text-base text-ink-soft md:text-lg max-w-xl leading-relaxed">
            Mark-Up hadir sebagai layanan pendampingan persiapan lomba bisnis untuk mahasiswa dan siswa SMA yang dipandu langsung oleh expert, praktisi, hingga para mahasiswa berprestasi.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#paket"
              className="rounded-full bg-ink px-6 py-3.5 text-xs font-bold text-white hover:bg-ink-soft transition-all flex items-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform duration-150"
            >
              <span>Lihat Paket Mentoring</span>
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#cara-kerja"
              className="rounded-full border border-line bg-white px-5 py-3.5 text-xs font-semibold text-ink hover:bg-paper-alt transition-all"
            >
              Cara Beli
            </a>
          </div>

          {/* Quick Real Stats */}
          <div className="pt-6 border-t border-line grid grid-cols-3 gap-6">
            <div>
              <div className="font-display text-2xl md:text-3xl font-bold text-ink">300+</div>
              <div className="text-[10px] uppercase font-bold tracking-wider text-ink-soft mt-1">Tim Didampingi</div>
            </div>
            <div>
              <div className="font-display text-2xl md:text-3xl font-bold text-ink">42</div>
              <div className="text-[10px] uppercase font-bold tracking-wider text-ink-soft mt-1">Mentor Aktif</div>
            </div>
            <div>
              <div className="font-display text-2xl md:text-3xl font-bold text-ink text-emerald-600">15-25%</div>
              <div className="text-[10px] uppercase font-bold tracking-wider text-ink-soft mt-1">Target Menang ↑</div>
            </div>
          </div>
        </div>

        {/* Dynamic Interactive Ticket Stack Signature Element */}
        <div className="lg:col-span-5 h-[280px] xs:h-[340px] sm:h-[420px] relative mt-10 lg:mt-0 flex items-center justify-center overflow-visible w-full max-w-sm xs:max-w-md mx-auto">
          <div className="absolute inset-0 bg-violet-custom/5 rounded-3xl blur-2xl transform -rotate-6 scale-90" />
          
          {/* Ticket 1 */}
          <motion.div
            whileHover={{ y: -8, rotate: 0, zIndex: 10 }}
            className="absolute top-0 left-1 xs:left-6 md:left-12 w-[240px] xs:w-[280px] bg-white border border-line rounded-xl p-4 xs:p-5 shadow-lg transform -rotate-6 cursor-pointer transition-shadow hover:shadow-2xl z-1 origin-top-left scale-90 xs:scale-100"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="rounded bg-paper-alt text-violet-custom px-2 py-0.5 text-[9px] font-mono font-bold uppercase tracking-wider">
                BPC Proposal
              </span>
              <span className="font-display font-bold text-sm text-ink">Rp200rb</span>
            </div>
            <h4 className="font-bold text-ink text-sm">BPC Strategic Kickstart</h4>
            <p className="text-[11px] text-ink-soft mt-1 leading-relaxed">Ideal untuk perancangan proposal business plan dari nol.</p>
            <div className="mt-4 border-t border-dashed border-line pt-3 flex items-center justify-between text-[10px] font-mono text-ink-soft">
              <span>2 Sesi Premium</span>
              <span className="text-magenta-custom font-bold">Pilih Slot →</span>
            </div>
          </motion.div>

          {/* Ticket 2 */}
          <motion.div
            whileHover={{ y: -8, rotate: 0, zIndex: 10 }}
            className="absolute top-16 xs:top-20 left-4 xs:left-12 md:left-20 w-[240px] xs:w-[280px] bg-white border-2 border-violet-custom rounded-xl p-4 xs:p-5 shadow-xl transform rotate-3 cursor-pointer transition-shadow hover:shadow-2xl z-2 origin-top-left scale-90 xs:scale-100"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="rounded bg-violet-custom text-white px-2 py-0.5 text-[9px] font-mono font-bold uppercase tracking-wider">
                BCC • Terpopuler
              </span>
              <span className="font-display font-bold text-sm text-ink">Rp195rb</span>
            </div>
            <h4 className="font-bold text-ink text-sm">Full-Throttle Coaching</h4>
            <p className="text-[11px] text-ink-soft mt-1 leading-relaxed">3x Sesi intensif, review deck finalis & feedback terarah.</p>
            <div className="mt-4 border-t border-dashed border-line pt-3 flex items-center justify-between text-[10px] font-mono text-ink-soft">
              <span>3 Sesi + Video</span>
              <span className="text-magenta-custom font-bold">Daftar →</span>
            </div>
          </motion.div>

          {/* Ticket 3 */}
          <motion.div
            whileHover={{ y: -8, rotate: 0, zIndex: 10 }}
            className="absolute top-32 xs:top-44 left-2 xs:left-8 md:left-14 w-[240px] xs:w-[280px] bg-white border border-line rounded-xl p-4 xs:p-5 shadow-lg transform -rotate-2 cursor-pointer transition-shadow hover:shadow-2xl z-3 origin-top-left scale-90 xs:scale-100"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="rounded bg-amber-100 text-amber-800 px-2 py-0.5 text-[9px] font-mono font-bold uppercase tracking-wider">
                BCC • Paket Hemat
              </span>
              <span className="font-display font-bold text-sm text-ink">Rp300rb</span>
            </div>
            <h4 className="font-bold text-ink text-sm">PowerPack Bundling</h4>
            <p className="text-[11px] text-ink-soft mt-1 leading-relaxed">Akses materi lengkap ditambah 10 slide deck juara nasional.</p>
            <div className="mt-4 border-t border-dashed border-line pt-3 flex items-center justify-between text-[10px] font-mono text-ink-soft">
              <span>3 Sesi + 10 Deck</span>
              <span className="text-magenta-custom font-bold">Beli Bundling →</span>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Flow Strip (Cara Kerja) */}
      <section id="cara-kerja" className="mx-auto max-w-7xl px-6 py-12 md:px-12 scroll-mt-20">
        <div className="max-w-2xl mb-12">
          <span className="font-mono text-xs font-bold tracking-widest text-magenta-custom uppercase block mb-2">Alur Otomatis</span>
          <h2 className="font-display text-2xl md:text-3xl font-extrabold text-ink leading-tight">
            Empat langkah menuju panggung juara, tanpa admin ribet
          </h2>
          <p className="text-sm text-ink-soft mt-2">
            Lupakan alur lama: isi form manual → tunggu dichat WA admin → mencocokkan jadwal berhari-hari. Di Mark-Up, semua terintegrasi di web dalam beberapa detik.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1.5 rounded-2xl bg-ink p-6 text-white shadow-xl relative overflow-hidden">
          <div className="absolute right-0 bottom-0 opacity-5 pointer-events-none">
            <Zap className="w-96 h-96" />
          </div>

          {/* Step 1 */}
          <div className="p-4 rounded-xl hover:bg-white/5 transition-all space-y-3 relative z-10">
            <span className="font-mono text-xs font-bold text-gold-custom">STEP 01</span>
            <h4 className="font-display font-bold text-base text-white">Pilih Paket Lomba</h4>
            <p className="text-xs text-white/75 leading-relaxed">Bandingkan silabus paket BCC/BPC secara langsung di website.</p>
          </div>

          {/* Step 2 */}
          <div className="p-4 rounded-xl hover:bg-white/5 transition-all space-y-3 relative z-10 md:border-l md:border-white/10">
            <span className="font-mono text-xs font-bold text-gold-custom">STEP 02</span>
            <h4 className="font-display font-bold text-base text-white">Bayar Otomatis</h4>
            <p className="text-xs text-white/75 leading-relaxed">Bayar via QRIS otomatis terverifikasi tanpa perlu kirim bukti transfer.</p>
          </div>

          {/* Step 3 */}
          <div className="p-4 rounded-xl hover:bg-white/5 transition-all space-y-3 relative z-10 lg:border-l lg:border-white/10">
            <span className="font-mono text-xs font-bold text-gold-custom">STEP 03</span>
            <h4 className="font-display font-bold text-base text-white">Pilih Slot Mentor</h4>
            <p className="text-xs text-white/75 leading-relaxed">Cari mentor yang sesuai, pilih hari & jam luang langsung di kalender web.</p>
          </div>

          {/* Step 4 */}
          <div className="p-4 rounded-xl hover:bg-white/5 transition-all space-y-3 relative z-10 lg:border-l lg:border-white/10">
            <span className="font-mono text-xs font-bold text-gold-custom">STEP 04</span>
            <h4 className="font-display font-bold text-base text-white">Akses Modul & Deck</h4>
            <p className="text-xs text-white/75 leading-relaxed">Masuk LMS untuk menonton video materi terstruktur dan unduh file juara.</p>
          </div>
        </div>
      </section>

      {/* Package Selection */}
      <section id="paket" className="mx-auto max-w-7xl px-6 py-12 md:px-12 scroll-mt-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="font-mono text-xs font-bold tracking-widest text-violet-custom uppercase block mb-1">Daftar Paket</span>
            <h2 className="font-display text-2xl md:text-3xl font-extrabold text-ink">Pilih Sesuai Kompetisimu</h2>
          </div>

          {/* BCC vs BPC vs AKADEMI sliding selector */}
          <div className="flex flex-wrap rounded-full bg-paper-alt p-1 self-start gap-1 sm:gap-0">
            <button
              onClick={() => setSelectedCategory('BCC')}
              className={`rounded-full px-5 py-2 text-xs font-bold transition-all ${
                selectedCategory === 'BCC'
                  ? 'bg-ink text-white shadow-sm'
                  : 'text-ink-soft hover:text-ink'
              }`}
            >
              Business Case (BCC)
            </button>
            <button
              onClick={() => setSelectedCategory('BPC')}
              className={`rounded-full px-5 py-2 text-xs font-bold transition-all ${
                selectedCategory === 'BPC'
                  ? 'bg-ink text-white shadow-sm'
                  : 'text-ink-soft hover:text-ink'
              }`}
            >
              Business Plan (BPC)
            </button>
            <button
              onClick={() => setSelectedCategory('AKADEMI')}
              className={`rounded-full px-5 py-2 text-xs font-bold transition-all ${
                selectedCategory === 'AKADEMI'
                  ? 'bg-ink text-white shadow-sm'
                  : 'text-ink-soft hover:text-ink'
              }`}
            >
              Mark-Up Akademi (Akademi)
            </button>
          </div>
        </div>

        {/* Package grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredPackages.map((pkg) => (
            <div
              key={pkg.id}
              className={`rounded-2xl bg-white border overflow-hidden flex flex-col justify-between transition-all hover:shadow-lg ${
                pkg.isPopular
                  ? 'border-violet-custom ring-2 ring-violet-custom/20 relative shadow-md'
                  : 'border-line'
              }`}
            >
              {pkg.isPopular && (
                <div className="absolute top-3 right-3 bg-violet-custom text-white text-[9px] font-bold px-2 py-0.5 rounded-full font-mono uppercase tracking-widest">
                  Terpopuler
                </div>
              )}

              <div className="p-6">
                <span className="inline-block rounded-md bg-paper-alt text-violet-custom px-2 py-0.5 text-[9px] font-bold font-mono tracking-wider uppercase mb-3">
                  {pkg.category} Package
                </span>
                <h3 className="font-display text-lg font-bold text-ink">{pkg.name}</h3>
                <p className="text-xs text-ink-soft mt-1 leading-relaxed min-h-[32px]">{pkg.audience}</p>

                <div className="mt-5 mb-1 flex items-baseline gap-1">
                  <span className="font-display text-2xl font-black text-ink">{pkg.priceFormatted}</span>
                  <span className="text-xs text-ink-soft">{pkg.unit.split(' · ')[0]}</span>
                </div>
                <span className="text-[10px] font-mono text-ink-soft tracking-wider block border-b border-line pb-4 mb-4">
                  {pkg.unit.split(' · ')[1]}
                </span>

                <ul className="space-y-3">
                  {pkg.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-ink-soft">
                      <Check className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5 stroke-[3]" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={() => handlePackageSelect(pkg)}
                  className={`w-full rounded-xl py-3 text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5 ${
                    pkg.isPopular
                      ? 'bg-violet-custom text-white hover:bg-violet-deep'
                      : 'bg-ink text-white hover:bg-ink-soft'
                  }`}
                >
                  <span>Daftar Sekarang</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Company Profile: Visi, Misi & Filosofi Logo */}
      <section id="profil" className="mx-auto max-w-7xl px-6 py-16 md:px-12 scroll-mt-20 border-t border-line mt-12">
        <div className="max-w-3xl mb-12">
          <span className="font-mono text-xs font-bold tracking-widest text-violet-custom uppercase block mb-1">PROFIL PERUSAHAAN</span>
          <h2 className="font-display text-3xl md:text-4xl font-extrabold text-ink leading-tight">
            Uncover the Meaning and Impact of Our Brand
          </h2>
          <p className="text-sm text-ink-soft mt-2">
            Mengenal lebih dekat Mark-Up: wadah akselerasi, bimbingan strategis, dan filosofi nilai yang kami bawa untuk merevolusi kompetensi mahasiswa Indonesia.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Visi & Misi */}
          <div className="lg:col-span-6 space-y-6">
            {/* Vision Card */}
            <div className="rounded-2xl border-2 border-[#E3DCF0] bg-white p-6 md:p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">✨</span>
                <h3 className="font-display text-2xl font-black text-[#5B21B6] tracking-tight">Vision</h3>
              </div>
              <p className="text-sm text-ink-soft leading-relaxed font-medium">
                Memberdayakan mahasiswa dalam dunia marketing melalui kompetisi bisnis, program mentoring, dan internship, agar mereka siap menghadapi industri dengan keahlian yang teruji.
              </p>
            </div>

            {/* Mission Card */}
            <div className="rounded-2xl border-2 border-[#E3DCF0] bg-white p-6 md:p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <span className="text-2xl">🚀</span>
                <h3 className="font-display text-2xl font-black text-[#C026A3] tracking-tight">Mission</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#FAF8FC] text-[10px] font-black text-[#5B21B6] border border-[#E3DCF0]">1</span>
                  <div>
                    <h4 className="text-xs font-bold text-ink">Menyelenggarakan Kompetisi Bisnis</h4>
                    <p className="text-[11px] text-ink-soft mt-0.5">Mengadakan lomba marketing dan bisnis untuk melatih pola pikir strategis dan inovatif mahasiswa.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#FAF8FC] text-[10px] font-black text-[#5B21B6] border border-[#E3DCF0]">2</span>
                  <div>
                    <h4 className="text-xs font-bold text-ink">Mentoring & Coaching</h4>
                    <p className="text-[11px] text-ink-soft mt-0.5">Menghubungkan mahasiswa dengan mentor profesional di bidang bisnis dan marketing untuk berbagi wawasan dan pengalaman nyata.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#FAF8FC] text-[10px] font-black text-[#5B21B6] border border-[#E3DCF0]">3</span>
                  <div>
                    <h4 className="text-xs font-bold text-ink">Fasilitasi Diskusi Seputar Internship</h4>
                    <p className="text-[11px] text-ink-soft mt-0.5">Menyediakan wadah bagi mahasiswa untuk mendapatkan insight dan informasi terkait internship di perusahaan besar, terutama di bidang digital marketing.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#FAF8FC] text-[10px] font-black text-[#5B21B6] border border-[#E3DCF0]">4</span>
                  <div>
                    <h4 className="text-xs font-bold text-ink">Membangun Networking & Komunitas</h4>
                    <p className="text-[11px] text-ink-soft mt-0.5">Mempertemukan mahasiswa dengan profesional dan teman-teman satu minat untuk berbagi pengalaman, berdiskusi, dan memperluas koneksi.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#FAF8FC] text-[10px] font-black text-[#5B21B6] border border-[#E3DCF0]">5</span>
                  <div>
                    <h4 className="text-xs font-bold text-ink">Mengembangkan Keterampilan Praktis</h4>
                    <p className="text-[11px] text-ink-soft mt-0.5">Membantu mahasiswa menguasai keterampilan pemasaran, komunikasi, dan strategi bisnis yang dibutuhkan di dunia kerja.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#FAF8FC] text-[10px] font-black text-[#5B21B6] border border-[#E3DCF0]">6</span>
                  <div>
                    <h4 className="text-xs font-bold text-ink">Menyediakan Materi & Panduan Lomba Bisnis</h4>
                    <p className="text-[11px] text-ink-soft mt-0.5">Memberikan akses ke materi, strategi, dan studi kasus untuk meningkatkan peluang menang dalam kompetisi bisnis dan marketing.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Filosofi Logo */}
          <div className="lg:col-span-6 rounded-2xl border-2 border-[#E3DCF0] bg-white p-6 md:p-8 shadow-sm space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🎨</span>
              <h3 className="font-display text-2xl font-black text-ink tracking-tight">Filosofi Logo</h3>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 items-center bg-[#FAF8FC] p-4 rounded-xl border border-[#E3DCF0]">
              <div className="flex-shrink-0 bg-white p-4 rounded-2xl border-2 border-[#E3DCF0] flex flex-col items-center gap-1.5 shadow-sm">
                <MarkUpLogo size={100} />
                <span className="text-[10px] font-bold text-[#4A4E73] uppercase tracking-wider font-mono">Official Emblem</span>
              </div>
              <div className="space-y-2">
                <p className="text-xs text-[#1B1E3D] leading-relaxed font-medium">
                  Logo Mark-Up menampilkan garis <span className="italic font-bold text-[#5B21B6]">"equal"</span> yang dimiringkan ke samping dengan tanda panah ke atas.
                </p>
                <p className="text-xs text-[#4A4E73] leading-relaxed">
                  Logo ini merepresentasikan perjalanan mahasiswa dalam meningkatkan nilai dan kompetensinya, khususnya dalam bidang marketing.
                </p>
              </div>
            </div>

            {/* Shape Philosophy */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold text-[#1B1E3D] uppercase tracking-wider font-mono">Bentuk & Simbol</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-xs">
                  <span className="text-emerald-500 mt-0.5">➡️</span>
                  <span>
                    <strong className="text-[#1B1E3D]">Garis "equal" yang miring</strong> — Melambangkan perkembangan dan transformasi, dari mahasiswa biasa menjadi profesional yang unggul.
                  </span>
                </li>
                <li className="flex items-start gap-2 text-xs">
                  <span className="text-emerald-500 mt-0.5">➡️</span>
                  <span>
                    <strong className="text-[#1B1E3D]">Tanda panah ke atas</strong> — Menunjukkan pertumbuhan, inovasi, dan peningkatan keterampilan dalam bidang marketing.
                  </span>
                </li>
              </ul>
            </div>

            {/* Color Philosophy */}
            <div className="space-y-3 pt-2 border-t border-dashed border-[#E3DCF0]">
              <h4 className="text-xs font-bold text-[#1B1E3D] uppercase tracking-wider font-mono">Filosofi Warna</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 bg-white border border-[#E3DCF0] rounded-xl flex gap-2.5 items-start">
                  <span className="h-3.5 w-3.5 rounded-full bg-[#0C1E5B] shrink-0 mt-0.5 border border-black/10" />
                  <div>
                    <h5 className="text-[11px] font-bold text-[#0C1E5B]">Biru</h5>
                    <p className="text-[10px] text-[#4A4E73] mt-0.5">Mewakili kepercayaan, stabilitas, dan profesionalisme bisnis & marketing.</p>
                  </div>
                </div>

                <div className="p-3 bg-white border border-[#E3DCF0] rounded-xl flex gap-2.5 items-start">
                  <span className="h-3.5 w-3.5 rounded-full bg-[#AA008C] shrink-0 mt-0.5 border border-black/10" />
                  <div>
                    <h5 className="text-[11px] font-bold text-[#AA008C]">Ungu</h5>
                    <p className="text-[10px] text-[#4A4E73] mt-0.5">Simbol kreativitas, inovasi, dan imajinasi strategi pemasaran.</p>
                  </div>
                </div>

                <div className="p-3 bg-white border border-[#E3DCF0] rounded-xl flex gap-2.5 items-start">
                  <span className="h-3.5 w-3.5 rounded-full bg-[#F3E61C] shrink-0 mt-0.5 border border-black/10" />
                  <div>
                    <h5 className="text-[11px] font-bold text-[#9D8F00]">Kuning</h5>
                    <p className="text-[10px] text-[#4A4E73] mt-0.5">Melambangkan semangat, optimisme, dan energi mahasiswa berkarya.</p>
                  </div>
                </div>

                <div className="p-3 bg-white border border-[#E3DCF0] rounded-xl flex gap-2.5 items-start">
                  <span className="h-3.5 w-3.5 rounded-full bg-[#F65DC2] shrink-0 mt-0.5 border border-black/10" />
                  <div>
                    <h5 className="text-[11px] font-bold text-[#F65DC2]">Merah Muda</h5>
                    <p className="text-[10px] text-[#4A4E73] mt-0.5">Menunjukkan antusiasme, koneksi sosial, dan jiwa kolaboratif.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Competition Schedules Section */}
      <section id="lomba" className="mx-auto max-w-7xl px-6 py-16 md:px-12 scroll-mt-20 border-t border-line">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="max-w-2xl">
            <span className="font-mono text-xs font-bold tracking-widest text-violet-custom uppercase block mb-1">
              INFO KOMPETISI TERKINI
            </span>
            <h2 className="font-display text-2xl md:text-3xl font-extrabold text-ink leading-tight">
              Jadwal & Info Lomba Terdekat
            </h2>
            <p className="text-sm text-ink-soft mt-1">
              Daftar kompetisi bisnis dan marketing nasional terverifikasi yang bisa Anda ikuti. Gunakan materi Mark-Up untuk mempersiapkan diri dan memenangkan piala juara!
            </p>
          </div>
          <div className="flex items-center gap-2 bg-[#FAF8FC] border border-[#E3DCF0] rounded-xl px-4 py-2.5 shrink-0 self-start md:self-auto shadow-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-medium text-ink-soft">
              Diperbarui secara real-time oleh Admin
            </span>
          </div>
        </div>

        {competitions.length === 0 ? (
          <div className="text-center py-12 rounded-2xl bg-[#FAF8FC] border-2 border-dashed border-[#E3DCF0] p-6">
            <span className="text-3xl">📅</span>
            <h3 className="font-bold text-ink mt-2">Belum Ada Jadwal Lomba Terdekat</h3>
            <p className="text-xs text-ink-soft mt-1">Admin sedang menyusun jadwal lomba terbaru. Silakan kembali beberapa saat lagi!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {competitions.map((comp) => (
              <div
                key={comp.id}
                className="group relative rounded-2xl bg-white border-2 border-[#E3DCF0] p-6 hover:border-violet-custom hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Badge & Category */}
                  <div className="flex items-center justify-between">
                    <span
                      className={`rounded-md px-2.5 py-1 text-[10px] font-black tracking-wider uppercase ${
                        comp.category === 'BCC'
                          ? 'bg-[#E0F2FE] text-[#0369A1]'
                          : comp.category === 'BPC'
                          ? 'bg-[#FDF2F8] text-[#BE185D]'
                          : 'bg-[#F0FDF4] text-[#15803D]'
                      }`}
                    >
                      {comp.category === 'BCC'
                        ? 'Business Case (BCC)'
                        : comp.category === 'BPC'
                        ? 'Business Plan (BPC)'
                        : 'Umum / Lainnya'}
                    </span>
                    <span className="text-[10px] font-mono font-bold text-ink-soft bg-paper-alt px-2 py-0.5 rounded border border-line">
                      ID: {comp.id}
                    </span>
                  </div>

                  {/* Title and Organizer */}
                  <div>
                    <h3 className="font-display font-black text-base text-ink line-clamp-2 leading-snug group-hover:text-violet-custom transition-colors">
                      {comp.name}
                    </h3>
                    <p className="text-xs text-ink-soft font-medium mt-1">
                      Penyelenggara: <span className="text-ink">{comp.organizer}</span>
                    </p>
                  </div>

                  {/* Highlight Specs */}
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="bg-[#FAF8FC] p-2.5 rounded-xl border border-[#E3DCF0]">
                      <span className="block text-[9px] font-bold text-ink-soft uppercase tracking-wider font-mono">
                        Deadline Daftar
                      </span>
                      <span className="block text-xs font-black text-violet-custom mt-0.5">
                        {new Date(comp.registrationDeadline).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </span>
                    </div>

                    <div className="bg-[#FAF8FC] p-2.5 rounded-xl border border-[#E3DCF0]">
                      <span className="block text-[9px] font-bold text-ink-soft uppercase tracking-wider font-mono">
                        Biaya Daftar
                      </span>
                      <span className="block text-xs font-bold text-ink mt-0.5 line-clamp-1">
                        {comp.fee}
                      </span>
                    </div>
                  </div>

                  <div className="bg-[#FAF8FC] p-3 rounded-xl border border-[#E3DCF0] flex items-center justify-between">
                    <div>
                      <span className="block text-[9px] font-bold text-ink-soft uppercase tracking-wider font-mono">
                        Hadiah & Reward
                      </span>
                      <span className="block text-xs font-black text-emerald-600">
                        {comp.reward}
                      </span>
                    </div>
                    <span className="text-xl">🏆</span>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-line">
                  <a
                    href={comp.link}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full rounded-xl bg-ink text-white py-2.5 px-4 text-xs font-bold hover:bg-violet-custom transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>Kunjungi Website Lomba</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Mentor Spotlight */}
      <section id="mentor" className="mx-auto max-w-7xl px-6 py-12 md:px-12 scroll-mt-20">
        <div className="max-w-2xl mb-10">
          <span className="font-mono text-xs font-bold tracking-widest text-magenta-custom uppercase block mb-1">Barisan Ahli</span>
          <h2 className="font-display text-2xl md:text-3xl font-extrabold text-ink">Belajar Langsung Dari Para Juara</h2>
          <p className="text-sm text-ink-soft mt-1">
            Bukan sekadar teori. Semua mentor kami adalah eks-finalis dan pemenang kompetisi bisnis tingkat nasional & regional bergengsi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mentors.slice(0, 4).map((mentor) => (
            <div key={mentor.id} className="rounded-2xl bg-white border border-line p-5 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <img
                    referrerPolicy="no-referrer"
                    src={mentor.avatar}
                    alt={mentor.name}
                    className="h-12 w-12 rounded-xl object-cover border border-line flex-shrink-0"
                  />
                  <div>
                    <h4 className="font-bold text-ink text-sm leading-tight">{mentor.name}</h4>
                    <p className="text-[11px] text-ink-soft line-clamp-1 mt-0.5">{mentor.role.split(' & ')[0]}</p>
                  </div>
                </div>

                <p className="text-xs text-ink-soft leading-relaxed line-clamp-3 min-h-[54px]">{mentor.bio}</p>

                <div className="flex flex-wrap gap-1">
                  {mentor.tags.map((tag) => (
                    <span key={tag} className="rounded-md bg-paper-alt px-2 py-0.5 text-[10px] font-semibold text-violet-custom font-mono">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-line flex items-center justify-between text-xs">
                <span className="font-mono text-ink-soft font-semibold">{mentor.totalTeams} tim dibimbing</span>
                <div className="flex items-center gap-1 text-ink font-bold font-mono">
                  <Star className="h-3.5 w-3.5 fill-gold-custom text-gold-custom stroke-[2.5]" />
                  <span>{mentor.rating.toFixed(1)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="mx-auto max-w-7xl px-6 md:px-12 mt-16 pt-8 border-t border-line flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-ink-soft">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <MarkUpLogo size={28} withText={true} />
          <p>© 2026. Pembimbingan & Akselerasi Kompetisi Bisnis Mahasiswa. All rights reserved.</p>
        </div>
        <p className="font-mono text-[10px] opacity-75">Sistem Integrasi Wireframe Demo - Batch 2026</p>
      </footer>
    </div>
  );
}

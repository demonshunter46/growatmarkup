import { Mentor, BookedSession, StudentProgress, VideoLesson, ChampionDeck, Transaction, Package, Competition, LearningMaterial } from './types';

export const DEFAULT_PACKAGES: Package[] = [
  {
    id: 'pkg-bcc-1',
    name: 'Essential Sprint',
    category: 'BCC',
    price: 150000,
    priceFormatted: 'Rp150.000',
    unit: '/tim · 2 sesi (60 menit)',
    audience: 'Tim yang sudah daftar, butuh pendampingan singkat',
    features: ['Review solusi & strategi', 'Persiapan waktu terbatas', 'Konsultasi via WhatsApp', 'Akses 2 Video Modul'],
  },
  {
    id: 'pkg-bcc-2',
    name: 'Full-Throttle Coaching',
    category: 'BCC',
    price: 195000,
    priceFormatted: 'Rp195.000',
    unit: '/tim · 3 sesi (60 menit)',
    audience: 'Tim aktif lomba, ingin solusi matang',
    features: ['Solusi & presentasi matang', 'Simulasi pitching langsung', 'Konsultasi via WhatsApp', 'Bonus sesi jika lolos final', 'Akses semua Video Modul'],
    isPopular: true,
  },
  {
    id: 'pkg-bcc-3',
    name: 'Bundling PowerPack',
    category: 'BCC',
    price: 300000,
    priceFormatted: 'Rp300.000',
    unit: '/personal · 3 sesi (60 menit)',
    audience: 'Pemula, ingin belajar bcc dari nol',
    features: ['Akses 10 deck finalis nasional', '10 framework analisis BCC', 'Guidance dari nol + tools lengkap', 'Konsultasi WA gratis', 'Akses semua Video Modul'],
  },
  {
    id: 'pkg-bpc-1',
    name: 'BPC Kickstart',
    category: 'BPC',
    price: 200000,
    priceFormatted: 'Rp200.000',
    unit: '/tim · 2 sesi (60 menit)',
    audience: 'Ideal untuk perancangan ide bisnis dari nol',
    features: ['Brainstorming ide bisnis unik', 'Analisis kelayakan pasar', 'Feedback modul business plan', 'Akses 2 Video Modul'],
  },
  {
    id: 'pkg-bpc-2',
    name: 'BPC Strategic Master',
    category: 'BPC',
    price: 275000,
    priceFormatted: 'Rp275.000',
    unit: '/tim · 3 sesi (60 menit)',
    audience: 'Review mendalam proposal plan & analisis financial',
    features: ['Review proposal bab-per-bab', 'Koreksi proyeksi keuangan', 'Akses 10 deck juara BPC', 'Konsultasi WA prioritas 24/7'],
    isPopular: true,
  },
  {
    id: 'pkg-bpc-3',
    name: 'BPC Pitching Clinic',
    category: 'BPC',
    price: 180000,
    priceFormatted: 'Rp180.000',
    unit: '/tim · 2 sesi (45 menit)',
    audience: 'Khusus persiapan finalis presentasi di depan juri',
    features: ['Slide deck visual overhaul', 'Latihan intonasi & body language', 'Simulasi tanya jawab killer Q&A', 'Akses rekaman evaluasi'],
  },
  {
    id: 'pkg-akademi-1',
    name: 'Mark-Up Akademi',
    category: 'AKADEMI',
    price: 439000,
    priceFormatted: 'Rp439.000',
    unit: '/personal · 4 bulan',
    audience: 'Khusus mahasiswa baru & siswa SMA untuk belajar fondasi bisnis & kompetisi dari nol',
    features: [
      'Pelatihan intensif terstruktur selama 4 bulan',
      'Pendampingan personal & evaluasi portofolio',
      'Akses lengkap ke video pembelajaran & webinar',
      'Grup komunitas eksklusif siswa berprestasi',
      'Review proposal & persiapan lomba tingkat awal',
      'E-Certificate kelulusan resmi Mark-Up'
    ],
    isPopular: true,
  },
];

export const DEFAULT_MENTORS: Mentor[] = [
  {
    id: 'mentor-1',
    name: 'Kak Rani Amalia',
    role: 'Ex-Finalis BCC Nasional & Management Trainee',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop',
    tags: ['Strategy', 'Finance', 'Pitching'],
    bio: 'Berpengalaman memenangkan 5+ kompetisi business case tingkat nasional. Saat ini bekerja sebagai Business Analyst di perusahaan multinasional.',
    rating: 4.9,
    totalTeams: 32,
    availableSlots: [
      '2026-07-21T12:00:00.000Z',
      '2026-07-21T16:00:00.000Z',
      '2026-07-22T13:00:00.000Z',
      '2026-07-23T15:00:00.000Z',
      '2026-07-24T19:00:00.000Z',
    ],
  },
  {
    id: 'mentor-2',
    name: 'Kak Fajar Setyawan',
    role: 'Juara 1 BPC Regional & Founder Startup Edukasi',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    tags: ['Business Plan', 'Pitching', 'Operations'],
    bio: 'Spesialisasi dalam validasi ide bisnis awal dan pembuatan business model canvas yang kokoh untuk proposal kompetisi BPC.',
    rating: 5.0,
    totalTeams: 28,
    availableSlots: [
      '2026-07-21T10:00:00.000Z',
      '2026-07-22T14:00:00.000Z',
      '2026-07-23T10:00:00.000Z',
      '2026-07-23T16:00:00.000Z',
    ],
  },
  {
    id: 'mentor-3',
    name: 'Kak Nadia Putri',
    role: 'Konsultan Strategi Muda & Growth Marketer',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop',
    tags: ['Data', 'Marketing', 'Go-To-Market'],
    bio: 'Ahli merancang strategi pemasaran (Go-To-Market) yang tajam dan didukung data riset pasar aktual untuk memikat hati juri.',
    rating: 4.8,
    totalTeams: 19,
    availableSlots: [
      '2026-07-22T09:00:00.000Z',
      '2026-07-22T11:00:00.000Z',
      '2026-07-24T14:00:00.000Z',
    ],
  },
  {
    id: 'mentor-4',
    name: 'Kak Dimas Pratama',
    role: 'Ex-Panitia Kompetisi Bisnis & Venture Capital Analyst',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    tags: ['Case Method', 'Ops', 'Valuation'],
    bio: 'Menilai ratusan deck bisnis dari kacamata investor dan panitia juri. Memberikan feedback blak-blakan untuk menyempurnakan deck Anda.',
    rating: 4.9,
    totalTeams: 24,
    availableSlots: [
      '2026-07-21T14:00:00.000Z',
      '2026-07-22T16:00:00.000Z',
      '2026-07-23T14:00:00.000Z',
      '2026-07-24T10:00:00.000Z',
    ],
  },
];

export const DEFAULT_SESSIONS: BookedSession[] = [
  {
    id: 'sess-1',
    studentName: 'Tim Elang Muda',
    packageName: 'Full-Throttle Coaching',
    topic: 'Sesi 1 — Ideation & Problem Validation',
    date: '2026-07-15T12:00:00.000Z',
    mentorId: 'mentor-1',
    mentorName: 'Kak Rani Amalia',
    status: 'COMPLETED',
  },
  {
    id: 'sess-2',
    studentName: 'Tim Elang Muda',
    packageName: 'Full-Throttle Coaching',
    topic: 'Sesi 2 — Strategic Review & Deck Draft',
    date: '2026-07-21T12:00:00.000Z', // 19:00 WIB
    mentorId: 'mentor-1',
    mentorName: 'Kak Rani Amalia',
    meetLink: 'https://meet.google.com/abc-defg-hij',
    status: 'CONFIRMED',
  },
];

export const DEFAULT_PROGRESS: StudentProgress = {
  teamName: 'Tim Elang Muda',
  packageName: 'Full-Throttle Coaching',
  sessionsUsed: 2,
  sessionsTotal: 3,
  completedVideos: ['vid-1'],
  downloadedDecks: ['deck-1'],
};

export const DEFAULT_VIDEOS: VideoLesson[] = [
  {
    id: 'vid-1',
    title: 'Framework Analisis Kasus BCC & MECE Method',
    module: 'Modul 1: Foundation',
    duration: '12 menit',
    isLocked: false,
  },
  {
    id: 'vid-2',
    title: 'Menyusun Struktur Rekomendasi Bisnis & GTM Strategy',
    module: 'Modul 2: Recommendation',
    duration: '18 menit',
    isLocked: false,
  },
  {
    id: 'vid-3',
    title: 'Startup Financial Model & Valuation projections',
    module: 'Modul 3: Finance',
    duration: '22 menit',
    isLocked: false,
  },
  {
    id: 'vid-4',
    title: 'Simulasi Q&A Juri & Handling Objections',
    module: 'Modul 4: Advanced Pitching',
    duration: '15 menit',
    isLocked: true,
  },
];

export const DEFAULT_DECKS: ChampionDeck[] = [
  {
    id: 'deck-1',
    title: 'EcoPack: Sustainable Food Packaging Solution',
    team: 'Tim Elang Muda',
    award: '1st Winner BPC Nasional 2025',
    year: 2025,
    category: 'BPC',
    downloads: 142,
    slidesCount: 15,
    keyInsights: ['Analisis MECE yang sangat mendalam', 'Model finansial komprehensif 5 tahun', 'Prototype visualisasi produk yang jelas'],
  },
  {
    id: 'deck-2',
    title: 'Nusantara AgriTech: AI-Powered Supply Chain platform',
    team: 'Nusantara Team',
    award: 'Gold Medal BCC Nasional 2024',
    year: 2024,
    category: 'BCC',
    downloads: 320,
    slidesCount: 12,
    keyInsights: ['Strategi penetrasi pasar B2B terstruktur', 'Riset kompetitor menggunakan Porter 5 Forces', 'Presentasi financial yang clean'],
  },
  {
    id: 'deck-3',
    title: 'CareFlow: Elderly healthcare booking App plan',
    team: 'Alpha Consulting',
    award: 'Runner Up BPC Regional 2024',
    year: 2024,
    category: 'BPC',
    downloads: 98,
    slidesCount: 18,
    keyInsights: ['Rencana implementasi roadmap 3 fase', 'Proyeksi kelayakan investasi NPV & IRR', 'Survei validasi masalah dengan 200 responden'],
  },
  {
    id: 'deck-4',
    title: 'WasteLoop: Circular Economy waste processing proposal',
    team: 'Sakti Rangers',
    award: 'Best Presentation Award BCC 2024',
    year: 2024,
    category: 'BCC',
    downloads: 215,
    slidesCount: 10,
    keyInsights: ['Storytelling visual yang luar biasa menonjol', 'Analisis risiko operasional yang detail', 'GTM (Go-To-Market) dengan influencer partnership'],
  },
];

export const DEFAULT_TRANSACTIONS: Transaction[] = [
  {
    id: 'TRX-9921',
    date: '2026-07-20T01:30:00.000Z',
    teamName: 'Tim Elang Muda',
    packageName: 'Full-Throttle Coaching (BCC)',
    amount: 195000,
    paymentMethod: 'QRIS Gopay',
    status: 'PAID',
  },
  {
    id: 'TRX-9920',
    date: '2026-07-20T00:15:00.000Z',
    teamName: 'Budi Sanjaya',
    packageName: 'Bundling PowerPack (BCC)',
    amount: 300000,
    paymentMethod: 'BNI Virtual Account',
    status: 'PAID',
  },
  {
    id: 'TRX-9919',
    date: '2026-07-19T18:45:00.000Z',
    teamName: 'Tim Nusantara',
    packageName: 'Essential Sprint (BCC)',
    amount: 150000,
    paymentMethod: 'ShopeePay',
    status: 'WAITING',
  },
  {
    id: 'TRX-9918',
    date: '2026-07-19T10:10:00.000Z',
    teamName: 'Tim Srikandi',
    packageName: 'BPC Strategic Master (BPC)',
    amount: 275000,
    paymentMethod: 'Mandiri Virtual Account',
    status: 'PAID',
  },
];

export const DEFAULT_COMPETITIONS: Competition[] = [
  {
    id: 'comp-1',
    name: 'National Business Case Competition (NBCC) UI 2026',
    organizer: 'Universitas Indonesia',
    registrationDeadline: '2026-08-15',
    reward: 'Total Hadiah Rp45.000.000',
    fee: 'Rp150.000/Tim',
    category: 'BCC',
    link: 'https://ui.ac.id/nbcc2026'
  },
  {
    id: 'comp-2',
    name: 'Gadjah Mada Business Plan Competition (GMBPC) 2026',
    organizer: 'Universitas Gadjah Mada',
    registrationDeadline: '2026-08-28',
    reward: 'Total Hadiah Rp50.000.000',
    fee: 'Rp200.000/Tim',
    category: 'BPC',
    link: 'https://ugm.ac.id/gmbpc2026'
  },
  {
    id: 'comp-3',
    name: 'Indonesia Marketing Competition (IMC) 2026',
    organizer: 'Binus University',
    registrationDeadline: '2026-09-10',
    reward: 'Beasiswa Penuh + Uang Tunai Rp30 Juta',
    fee: 'Rp100.000/Orang',
    category: 'UMUM',
    link: 'https://binus.ac.id/imc2026'
  }
];

export const DEFAULT_MATERIALS: LearningMaterial[] = [
  {
    id: 'mat-1',
    title: 'Template Pitch Deck Standar Kompetisi Juara Nasional',
    category: 'STUDENT',
    contentType: 'SLIDES',
    description: 'Struktur slide deck PowerPoint/Google Slides yang biasa digunakan oleh para pemenang tingkat nasional, lengkap dengan guidance di setiap slide.',
    url: 'https://drive.google.com/drive/folders/markup-student-template-pitchdeck',
    addedBy: 'Admin Mark-Up'
  },
  {
    id: 'mat-2',
    title: 'Panduan Penilaian Juri BCC & BPC Indonesia',
    category: 'STUDENT',
    contentType: 'PDF',
    description: 'Dokumen panduan indikator penilaian juri di berbagai kompetisi besar di Indonesia, membantu Anda memprioritaskan slide yang bernilai tinggi.',
    url: 'https://drive.google.com/file/d/markup-rubrik-penilaian-juri',
    addedBy: 'Admin Mark-Up'
  },
  {
    id: 'mat-3',
    title: 'Rubrik Evaluasi & Feedback Standard Mentoring Mark-Up',
    category: 'MENTOR',
    contentType: 'TEMPLATE',
    description: 'Template evaluasi terstandarisasi untuk para mentor guna memberikan nilai terukur kepada tim bimbingan.',
    url: 'https://docs.google.com/document/d/markup-mentor-evaluation-framework',
    addedBy: 'Admin Mark-Up'
  },
  {
    id: 'mat-4',
    title: 'Video Webinar: Strategi Menaklukkan Q&A Juri Kritis',
    category: 'MENTOR',
    contentType: 'VIDEO',
    description: 'Rekaman eksklusif pelatihan mentor tentang taktik mengarahkan mahasiswa menjawab pertanyaan jebakan dari dewan juri.',
    url: 'https://youtube.com/watch?v=markup-qa-session-strategy',
    addedBy: 'Admin Mark-Up'
  }
];


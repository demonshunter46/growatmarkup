import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Sparkles, RefreshCw, Layers, Monitor, ChevronRight } from 'lucide-react';

// Models and Default Data
import { Package, Mentor, BookedSession, StudentProgress, VideoLesson, ChampionDeck, Transaction, Competition, LearningMaterial } from './types';
import {
  DEFAULT_PACKAGES,
  DEFAULT_MENTORS,
  DEFAULT_SESSIONS,
  DEFAULT_PROGRESS,
  DEFAULT_VIDEOS,
  DEFAULT_DECKS,
  DEFAULT_TRANSACTIONS,
  DEFAULT_COMPETITIONS,
  DEFAULT_MATERIALS
} from './data';

// Custom Sub-components
import LandingPage from './components/LandingPage';
import StudentLMS from './components/StudentLMS';
import MentorPanel from './components/MentorPanel';
import AdminPanel from './components/AdminPanel';
import PaymentModal from './components/PaymentModal';
import LoginModal from './components/LoginModal';

export default function App() {
  // Login Session & Persistence state
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('markup_is_logged_in') === 'true';
  });
  const [activeRole, setActiveRole] = useState<'landing' | 'student' | 'mentor' | 'admin'>(() => {
    const savedRole = localStorage.getItem('markup_active_role');
    return (savedRole as 'landing' | 'student' | 'mentor' | 'admin') || 'landing';
  });
  const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(() => {
    return localStorage.getItem('markup_user_email');
  });
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  // Unified State Engine
  const [packages, setPackages] = useState<Package[]>(DEFAULT_PACKAGES);
  const [mentors, setMentors] = useState<Mentor[]>(DEFAULT_MENTORS);
  const [sessions, setSessions] = useState<BookedSession[]>(DEFAULT_SESSIONS);
  const [progress, setProgress] = useState<StudentProgress>(DEFAULT_PROGRESS);
  const [videos, setVideos] = useState<VideoLesson[]>(DEFAULT_VIDEOS);
  const [decks, setDecks] = useState<ChampionDeck[]>(DEFAULT_DECKS);
  const [transactions, setTransactions] = useState<Transaction[]>(DEFAULT_TRANSACTIONS);
  const [competitions, setCompetitions] = useState<Competition[]>(DEFAULT_COMPETITIONS);
  const [materials, setMaterials] = useState<LearningMaterial[]>(DEFAULT_MATERIALS);

  // Landing Page Interactive Payment flow State
  const [checkoutPackage, setCheckoutPackage] = useState<Package | null>(null);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  // Initialize and load state from localStorage (persistent persistence)
  useEffect(() => {
    const cachedMentors = localStorage.getItem('markup_mentors');
    const cachedSessions = localStorage.getItem('markup_sessions');
    const cachedProgress = localStorage.getItem('markup_progress');
    const cachedVideos = localStorage.getItem('markup_videos');
    const cachedDecks = localStorage.getItem('markup_decks');
    const cachedTransactions = localStorage.getItem('markup_transactions');
    const cachedCompetitions = localStorage.getItem('markup_competitions');
    const cachedMaterials = localStorage.getItem('markup_materials');

    if (cachedMentors) setMentors(JSON.parse(cachedMentors));
    if (cachedSessions) setSessions(JSON.parse(cachedSessions));
    if (cachedProgress) setProgress(JSON.parse(cachedProgress));
    if (cachedVideos) setVideos(JSON.parse(cachedVideos));
    if (cachedDecks) setDecks(JSON.parse(cachedDecks));
    if (cachedTransactions) setTransactions(JSON.parse(cachedTransactions));
    if (cachedCompetitions) setCompetitions(JSON.parse(cachedCompetitions));
    if (cachedMaterials) setMaterials(JSON.parse(cachedMaterials));
  }, []);

  // Save changes to localStorage on state changes
  const saveState = (
    updatedMentors?: Mentor[],
    updatedSessions?: BookedSession[],
    updatedProgress?: StudentProgress,
    updatedVideos?: VideoLesson[],
    updatedDecks?: ChampionDeck[],
    updatedTransactions?: Transaction[],
    updatedCompetitions?: Competition[],
    updatedMaterials?: LearningMaterial[]
  ) => {
    if (updatedMentors) {
      setMentors(updatedMentors);
      localStorage.setItem('markup_mentors', JSON.stringify(updatedMentors));
    }
    if (updatedSessions) {
      setSessions(updatedSessions);
      localStorage.setItem('markup_sessions', JSON.stringify(updatedSessions));
    }
    if (updatedProgress) {
      setProgress(updatedProgress);
      localStorage.setItem('markup_progress', JSON.stringify(updatedProgress));
    }
    if (updatedVideos) {
      setVideos(updatedVideos);
      localStorage.setItem('markup_videos', JSON.stringify(updatedVideos));
    }
    if (updatedDecks) {
      setDecks(updatedDecks);
      localStorage.setItem('markup_decks', JSON.stringify(updatedDecks));
    }
    if (updatedTransactions) {
      setTransactions(updatedTransactions);
      localStorage.setItem('markup_transactions', JSON.stringify(updatedTransactions));
    }
    if (updatedCompetitions) {
      setCompetitions(updatedCompetitions);
      localStorage.setItem('markup_competitions', JSON.stringify(updatedCompetitions));
    }
    if (updatedMaterials) {
      setMaterials(updatedMaterials);
      localStorage.setItem('markup_materials', JSON.stringify(updatedMaterials));
    }
  };

  // Reset local database completely
  const handleResetDb = () => {
    if (confirm('Apakah Anda yakin ingin menyetel ulang seluruh database simulasi ke pengaturan bawaan?')) {
      localStorage.clear();
      setMentors(DEFAULT_MENTORS);
      setSessions(DEFAULT_SESSIONS);
      setProgress(DEFAULT_PROGRESS);
      setVideos(DEFAULT_VIDEOS);
      setDecks(DEFAULT_DECKS);
      setTransactions(DEFAULT_TRANSACTIONS);
      setCompetitions(DEFAULT_COMPETITIONS);
      setMaterials(DEFAULT_MATERIALS);
      setIsLoggedIn(false);
      setCurrentUserEmail(null);
      setActiveRole('landing');
      alert('Database demo berhasil disetel ulang ke kondisi awal.');
    }
  };

  const handleLoginSuccess = (role: 'student' | 'mentor' | 'admin', email: string) => {
    setIsLoggedIn(true);
    setCurrentUserEmail(email);
    setActiveRole(role);
    localStorage.setItem('markup_is_logged_in', 'true');
    localStorage.setItem('markup_user_email', email);
    localStorage.setItem('markup_active_role', role);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUserEmail(null);
    setActiveRole('landing');
    localStorage.removeItem('markup_is_logged_in');
    localStorage.removeItem('markup_active_role');
    localStorage.removeItem('markup_user_email');
  };

  const handleDemoPanelClick = (role: 'landing' | 'student' | 'mentor' | 'admin') => {
    if (role === 'landing') {
      setActiveRole('landing');
      return;
    }

    // Verify if the active role matches the selection and they are already logged in
    if (isLoggedIn && activeRole === role) {
      setActiveRole(role);
    } else {
      setIsLoginOpen(true);
    }
  };

  // Add new Competition
  const handleAddCompetition = (newComp: Omit<Competition, 'id'>) => {
    const comp: Competition = {
      ...newComp,
      id: `comp-${Math.floor(100 + Math.random() * 900)}`
    };
    const updated = [...competitions, comp];
    saveState(mentors, sessions, progress, videos, decks, transactions, updated, materials);
  };

  // Delete Competition
  const handleDeleteCompetition = (compId: string) => {
    const updated = competitions.filter(c => c.id !== compId);
    saveState(mentors, sessions, progress, videos, decks, transactions, updated, materials);
  };

  // Add new LearningMaterial
  const handleAddMaterial = (newMat: Omit<LearningMaterial, 'id' | 'addedBy'>) => {
    const mat: LearningMaterial = {
      ...newMat,
      id: `mat-${Math.floor(100 + Math.random() * 900)}`,
      addedBy: 'Admin Mark-Up'
    };
    const updated = [...materials, mat];
    saveState(mentors, sessions, progress, videos, decks, transactions, competitions, updated);
  };

  // Delete LearningMaterial
  const handleDeleteMaterial = (matId: string) => {
    const updated = materials.filter(m => m.id !== matId);
    saveState(mentors, sessions, progress, videos, decks, transactions, competitions, updated);
  };

  // 1. Purchase Package trigger on Landing
  const handleSelectPackage = (pkg: Package) => {
    setCheckoutPackage(pkg);
    setIsPaymentOpen(true);
  };

  // 2. Simulate Success Payment -> creates transaction, unlocks features, sets student role
  const handlePaymentSuccess = (newTx: Transaction) => {
    const updatedTx = [newTx, ...transactions];

    // Configure new student settings based on bought package
    const updatedProgressObj: StudentProgress = {
      teamName: newTx.teamName,
      packageName: newTx.packageName,
      sessionsUsed: 0,
      sessionsTotal: newTx.packageName.includes('Akademi') ? 4 : (newTx.packageName.includes('Sprint') || newTx.packageName.includes('Kickstart') ? 2 : 3),
      completedVideos: [],
      downloadedDecks: [],
    };

    saveState(mentors, sessions, updatedProgressObj, videos, decks, updatedTx);
    
    // Auto login
    setIsLoggedIn(true);
    setCurrentUserEmail('mentee1@markup.id');
    localStorage.setItem('markup_is_logged_in', 'true');
    localStorage.setItem('markup_user_email', 'mentee1@markup.id');
    localStorage.setItem('markup_active_role', 'student');
    
    setActiveRole('student');
  };

  // 3. Complete/Toggle Video state in LMS
  const handleCompleteVideo = (videoId: string) => {
    const isCompleted = progress.completedVideos.includes(videoId);
    let updatedCompleted = [...progress.completedVideos];

    if (isCompleted) {
      updatedCompleted = updatedCompleted.filter((id) => id !== videoId);
    } else {
      updatedCompleted.push(videoId);
    }

    const updatedProgressObj = {
      ...progress,
      completedVideos: updatedCompleted,
    };

    saveState(mentors, sessions, updatedProgressObj, videos, decks, transactions);
  };

  // 4. Booking Mentor Session in LMS
  const handleBookSession = (mentorId: string, slot: string, topic: string) => {
    const chosenMentor = mentors.find((m) => m.id === mentorId);
    if (!chosenMentor) return;

    // Remove slot from mentor availability
    const updatedMentors = mentors.map((m) => {
      if (m.id === mentorId) {
        return {
          ...m,
          availableSlots: m.availableSlots.filter((s) => s !== slot),
        };
      }
      return m;
    });

    // Generate new booked session
    const newSession: BookedSession = {
      id: `sess-${Math.floor(100 + Math.random() * 900)}`,
      studentName: progress.teamName,
      packageName: progress.packageName,
      topic: topic,
      date: slot,
      mentorId: mentorId,
      mentorName: chosenMentor.name,
      status: 'CONFIRMED', // Instant auto-confirmation for better mockup test loop
      meetLink: 'https://meet.google.com/qrs-tuvw-xyz',
    };

    const updatedSessions = [newSession, ...sessions];

    const updatedProgressObj = {
      ...progress,
      sessionsUsed: progress.sessionsUsed + 1,
    };

    saveState(updatedMentors, updatedSessions, updatedProgressObj, videos, decks, transactions);
  };

  // 5. Download deck inside LMS library
  const handleDownloadDeck = (deckId: string) => {
    const updatedDecks = decks.map((dk) => {
      if (dk.id === deckId) {
        return {
          ...dk,
          downloads: dk.downloads + 1,
        };
      }
      return dk;
    });

    const isAlreadyUnlocked = progress.downloadedDecks.includes(deckId);
    let updatedUnlocked = [...progress.downloadedDecks];
    if (!isAlreadyUnlocked) {
      updatedUnlocked.push(deckId);
    }

    const updatedProgressObj = {
      ...progress,
      downloadedDecks: updatedUnlocked,
    };

    saveState(mentors, sessions, updatedProgressObj, videos, updatedDecks, transactions);
  };

  // 6. Confirm Pending Session in Mentor Panel
  const handleConfirmSession = (sessionId: string) => {
    const updatedSessions = sessions.map((sess) => {
      if (sess.id === sessionId) {
        return {
          ...sess,
          status: 'CONFIRMED' as const,
          meetLink: 'https://meet.google.com/abc-defg-hij',
        };
      }
      return sess;
    });
    saveState(mentors, updatedSessions, progress, videos, decks, transactions);
  };

  // 7. Complete Active Session in Mentor Panel
  const handleCompleteSession = (sessionId: string) => {
    const updatedSessions = sessions.map((sess) => {
      if (sess.id === sessionId) {
        return {
          ...sess,
          status: 'COMPLETED' as const,
        };
      }
      return sess;
    });
    saveState(mentors, updatedSessions, progress, videos, decks, transactions);
  };

  // 8. Add Slot availability in Mentor Panel
  const handleAddSlot = (mentorId: string, slotStr: string) => {
    const updatedMentors = mentors.map((m) => {
      if (m.id === mentorId) {
        return {
          ...m,
          availableSlots: [...m.availableSlots, slotStr],
        };
      }
      return m;
    });
    saveState(updatedMentors, sessions, progress, videos, decks, transactions);
  };

  // 9. Add new mentor in Admin Dashboard
  const handleAddMentor = (newMentorData: Omit<Mentor, 'id' | 'rating' | 'totalTeams' | 'availableSlots'>) => {
    const newMentor: Mentor = {
      ...newMentorData,
      id: `mentor-${Math.floor(100 + Math.random() * 900)}`,
      rating: 5.0,
      totalTeams: 0,
      availableSlots: [
        '2026-07-22T10:00:00.000Z',
        '2026-07-23T14:00:00.000Z',
      ],
    };

    const updatedMentors = [...mentors, newMentor];
    saveState(updatedMentors, sessions, progress, videos, decks, transactions);
  };

  return (
    <div className="relative min-h-screen">
      {/* Global Interactive View-Toggle Controller Panel (Floating on top of all sheets) */}
      <div className="sticky top-0 z-[1000] w-full bg-slate-900 border-b border-slate-800 text-white py-2.5 px-4 shadow-xl">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <div className="flex h-5 w-5 items-center justify-center rounded-md bg-gold-custom text-slate-950 font-black text-[9px] animate-pulse">
              ★
            </div>
            <p className="font-mono text-[10px] tracking-wider text-slate-300 uppercase">
              Demo Panel: {isLoggedIn ? (
                <span>Masuk Sebagai <span className="text-gold-custom font-bold">{currentUserEmail}</span></span>
              ) : (
                <span className="text-slate-400">Belum Masuk (Butuh Login untuk LMS/Panel)</span>
              )}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-1">
            <button
              onClick={() => handleDemoPanelClick('landing')}
              className={`rounded-md px-3 py-1.5 font-mono text-[10px] tracking-wider uppercase font-bold transition-all ${
                activeRole === 'landing' ? 'bg-gold-custom text-slate-950 shadow-md' : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              Landing Page
            </button>

            <button
              onClick={() => handleDemoPanelClick('student')}
              className={`rounded-md px-3 py-1.5 font-mono text-[10px] tracking-wider uppercase font-bold transition-all ${
                activeRole === 'student' ? 'bg-violet-custom text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              Student LMS
            </button>

            <button
              onClick={() => handleDemoPanelClick('mentor')}
              className={`rounded-md px-3 py-1.5 font-mono text-[10px] tracking-wider uppercase font-bold transition-all ${
                activeRole === 'mentor' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              Mentor Panel
            </button>

            <button
              onClick={() => handleDemoPanelClick('admin')}
              className={`rounded-md px-3 py-1.5 font-mono text-[10px] tracking-wider uppercase font-bold transition-all ${
                activeRole === 'admin' ? 'bg-rose-600 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              Admin Board
            </button>

            {isLoggedIn && (
              <button
                onClick={handleLogout}
                className="rounded-md px-2.5 py-1.5 bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white font-mono text-[9px] tracking-wider uppercase font-bold transition-all"
                title="Selesaikan Sesi Anda"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Render selected screen view based on active tab state */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeRole}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.15 }}
          className="min-h-[calc(100vh-45px)]"
        >
          {activeRole === 'landing' && (
            <LandingPage
              packages={packages}
              mentors={mentors}
              competitions={competitions}
              onSelectPackage={handleSelectPackage}
              onLoginClick={() => setIsLoginOpen(true)}
            />
          )}

          {activeRole === 'student' && (
            <StudentLMS
              progress={progress}
              sessions={sessions}
              mentors={mentors}
              videos={videos}
              decks={decks}
              onCompleteVideo={handleCompleteVideo}
              onBookSession={handleBookSession}
              onDownloadDeck={handleDownloadDeck}
              onLogout={handleLogout}
            />
          )}

          {activeRole === 'mentor' && (
            <MentorPanel
              mentors={mentors}
              sessions={sessions}
              onConfirmSession={handleConfirmSession}
              onCompleteSession={handleCompleteSession}
              onAddSlot={handleAddSlot}
              onLogout={handleLogout}
            />
          )}

          {activeRole === 'admin' && (
            <AdminPanel
              transactions={transactions}
              mentors={mentors}
              studentProgress={progress}
              sessions={sessions}
              competitions={competitions}
              materials={materials}
              onAddMentor={handleAddMentor}
              onAddCompetition={handleAddCompetition}
              onDeleteCompetition={handleDeleteCompetition}
              onAddMaterial={handleAddMaterial}
              onDeleteMaterial={handleDeleteMaterial}
              onResetDb={handleResetDb}
              onLogout={handleLogout}
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Shared Modals */}
      <PaymentModal
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        selectedPackage={checkoutPackage}
        onPaymentSuccess={handlePaymentSuccess}
      />

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}

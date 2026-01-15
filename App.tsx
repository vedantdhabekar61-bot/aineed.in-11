import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { User, ViewState } from './types';
import { supabase } from './services/supabaseClient';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.HOME);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setIsLoadingAuth(false);
    });

    // Listen for changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        // Automatically go to Home if logged in
        setCurrentView(ViewState.HOME);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setCurrentView(ViewState.HOME);
  };

  const navigate = (view: ViewState) => {
    setCurrentView(view);
  };

  if (isLoadingAuth) {
     // Optional: Simple loading state while checking auth
     return <div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-400">Loading...</div>;
  }

  return (
    <div className="min-h-screen font-sans flex flex-col relative overflow-x-hidden">
      <Navbar 
        user={user} 
        onNavigate={navigate} 
        onLogout={handleLogout} 
      />
      
      {currentView === ViewState.LOGIN && !user ? (
        <Login onBack={() => navigate(ViewState.HOME)} />
      ) : (
        <Home user={user} onNavigate={navigate} />
      )}

      <Footer />
    </div>
  );
}

export default App;

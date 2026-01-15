import React from 'react';
import { Bot, LogIn, LogOut } from 'lucide-react';
import { Button } from './Button';
import { User, ViewState } from '../types';

interface NavbarProps {
  user: User | null;
  onNavigate: (view: ViewState) => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ user, onNavigate, onLogout }) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/60 bg-white/70 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <div 
          className="flex items-center space-x-2.5 cursor-pointer group" 
          onClick={() => onNavigate(ViewState.HOME)}
        >
          <div className="relative">
            <div className="absolute -inset-1 rounded-lg bg-indigo-500/20 opacity-0 blur group-hover:opacity-100 transition duration-300"></div>
            <div className="relative h-9 w-9 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-xl flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
              <Bot size={20} />
            </div>
          </div>
          <span className="font-['Inter_Tight'] font-bold text-xl tracking-tight text-slate-900">aineed.</span>
        </div>

        <nav className="flex items-center gap-3 md:gap-4">
          {user ? (
            <>
               <span className="hidden sm:inline-block text-sm text-slate-500">
                {user.user_metadata?.full_name ? `Hi, ${user.user_metadata.full_name}` : user.email}
              </span>
              <Button 
                variant="ghost" 
                onClick={() => onNavigate(ViewState.HOME)}
                className="hidden sm:flex"
              >
                Search
              </Button>
              <Button 
                variant="secondary" 
                onClick={onLogout}
                className="flex items-center gap-2"
              >
                <LogOut size={16} />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </>
          ) : (
            <Button 
              variant="primary" 
              onClick={() => onNavigate(ViewState.LOGIN)}
              className="flex items-center gap-2 shadow-lg shadow-indigo-500/20"
            >
              <LogIn size={16} />
              Sign In / Sign Up
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
};

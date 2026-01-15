import React, { useState } from 'react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { ShieldCheck, ArrowLeft, Mail } from 'lucide-react';
import { supabase } from '../services/supabaseClient';

interface LoginProps {
  onBack: () => void;
}

export const Login: React.FC<LoginProps> = ({ onBack }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (isSignUp) {
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
            },
          },
        });
        if (signUpError) throw signUpError;
        // Depending on Supabase settings, email confirmation might be required.
        // For this demo, we assume auto-confirm or we just show a message.
        // However, Supabase often logs you in immediately if email confirm is off.
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (signInError) throw signInError;
      }
      // Auth state change listener in App.tsx will handle the rest (redirection)
    } catch (err: any) {
      setError(err.message || 'An error occurred during authentication.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
      {/* Background Pastel Orbs */}
      <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-100/50 rounded-full blur-[100px] mix-blend-multiply"></div>
      </div>

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-10 border border-slate-100 relative overflow-hidden z-10">
        
        <button 
          onClick={onBack}
          className="text-slate-500 hover:text-slate-800 mb-6 flex items-center text-sm transition-colors relative z-10 font-medium"
        >
          <ArrowLeft size={16} className="mr-1.5" />
          Back to Search
        </button>

        <div className="text-center mb-8 relative z-10">
          <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 mb-6 shadow-sm">
            <ShieldCheck size={28} />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 font-['Inter_Tight']">
            {isSignUp ? 'Create an account' : 'Welcome back'}
          </h1>
          <p className="text-slate-500 mt-2 text-sm">
            {isSignUp ? 'Get started with your free account today.' : 'Enter your credentials to access your dashboard.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
          {error && (
            <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg">
              {error}
            </div>
          )}

          {isSignUp && (
             <Input 
             label="Full Name" 
             type="text" 
             placeholder="John Doe" 
             value={fullName}
             onChange={(e) => setFullName(e.target.value)}
             required
           />
          )}

          <Input 
            label="Email" 
            type="email" 
            placeholder="you@example.com" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input 
            label="Password" 
            type="password" 
            placeholder="••••••••" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
          
          <div className="pt-2">
            <Button 
              type="submit" 
              className="w-full h-11 text-base shadow-lg shadow-indigo-500/20" 
              isLoading={isLoading}
            >
              {isSignUp ? 'Sign Up' : 'Sign In'}
            </Button>
          </div>
        </form>

        <div className="mt-6 text-center text-sm relative z-10">
          <span className="text-slate-500">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}
          </span>
          <button 
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError(null);
            }}
            className="ml-2 font-semibold text-indigo-600 hover:text-indigo-700 hover:underline"
          >
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </button>
        </div>
      </div>
    </div>
  );
};

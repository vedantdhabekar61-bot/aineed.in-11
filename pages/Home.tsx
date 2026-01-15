import React, { useState } from 'react';
import { Search, Sparkles, AlertCircle, Lock } from 'lucide-react';
import { Button } from '../components/Button';
import { ToolCard } from '../components/ToolCard';
import { getToolRecommendations } from '../services/geminiService';
import { Tool, User, ViewState } from '../types';

interface HomeProps {
  user: User | null;
  onNavigate: (view: ViewState) => void;
}

export const Home: React.FC<HomeProps> = ({ user, onNavigate }) => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<Tool[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    if (!user) {
      // Just in case form submission bypasses disabled state
      return; 
    }

    setIsSearching(true);
    setHasSearched(true);
    setError(null);
    setResults([]);

    try {
      const tools = await getToolRecommendations(query);
      setResults(tools);
      if (tools.length === 0) {
        setError("I couldn't find any specific tools for that. Try rephrasing?");
      }
    } catch (err) {
      setError("Something went wrong while connecting to the AI.");
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-slate-50">
      {/* Background Ambience - Light Pastel */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-grid-pattern opacity-60"></div>
        {/* Animated Pastel Orbs */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-indigo-200/40 rounded-full mix-blend-multiply filter blur-[128px] animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-purple-200/40 rounded-full mix-blend-multiply filter blur-[128px] animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-1/3 w-[600px] h-[600px] bg-pink-200/40 rounded-full mix-blend-multiply filter blur-[128px] animate-blob animation-delay-4000"></div>
      </div>

      <main className="relative z-10 flex-grow container mx-auto px-4 py-16 md:py-24 max-w-5xl">
        
        {/* Hero Section */}
        <div className={`text-center transition-all duration-700 ease-in-out ${hasSearched ? 'mb-12' : 'mb-32 mt-12'}`}>
          
          <div className="inline-flex items-center rounded-full border border-indigo-100 bg-white/60 px-4 py-1.5 text-sm font-semibold text-indigo-600 mb-8 backdrop-blur-md shadow-sm animate-fade-in">
            <Sparkles size={14} className="mr-2 text-indigo-500" />
            <span>Powered by Gemini 3.0</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-6 leading-[1.1]">
            Describe a problem. <br />
            <span className="gradient-text">Find the perfect AI tool.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-12 leading-relaxed font-normal">
            Skip the directory fatigue. Describe your specific workflow challenge, and our AI will architect the perfect stack for you.
          </p>

          <form onSubmit={handleSearch} className="relative max-w-3xl mx-auto">
            <div className="relative group">
              {/* Subtle colored shadow for depth */}
              <div className={`absolute -inset-1 bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 rounded-2xl opacity-40 blur-lg transition duration-500 ${user ? 'group-hover:opacity-70' : 'opacity-20'}`}></div>
              
              <div className="relative flex items-center bg-white border border-slate-200/80 rounded-2xl shadow-xl shadow-indigo-500/5 transition-all duration-200 focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-500/50">
                <div className="pl-6 text-slate-400">
                  <Search size={22} />
                </div>
                <input
                  type="text"
                  className="w-full bg-transparent py-5 pl-4 pr-36 text-lg text-slate-900 placeholder:text-slate-400 focus:outline-none font-normal disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder={user ? "e.g., I need to translate a video and dub it into French..." : "Please sign in to search..."}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  disabled={!user}
                />
                <div className="absolute right-2.5">
                  {user ? (
                    <Button 
                      type="submit" 
                      disabled={!query.trim() || isSearching}
                      isLoading={isSearching}
                      className="h-11 rounded-xl px-6 text-base shadow-md shadow-indigo-500/20"
                    >
                      Search
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      variant="secondary"
                      className="h-11 rounded-xl px-6 text-base"
                      onClick={() => onNavigate(ViewState.LOGIN)}
                    >
                      <Lock size={16} className="mr-2 opacity-50" />
                      Sign in
                    </Button>
                  )}
                </div>
              </div>
            </div>
            {!user && (
               <div className="mt-4 animate-fade-in">
                 <p className="text-slate-500 text-sm font-medium flex items-center justify-center gap-2">
                   <AlertCircle size={16} className="text-indigo-500" />
                   Please sign in to find tools.
                 </p>
               </div>
            )}
          </form>

          {/* Suggested Prompts - Only show if logged in */}
          {!hasSearched && user && (
             <div className="mt-8 flex flex-wrap justify-center gap-3 text-sm text-slate-600">
                <span className="text-slate-400 uppercase tracking-wider text-[11px] font-bold mr-1 pt-1.5">Try:</span>
                {["Edit podcast audio", "Generate 3D assets", "Automate email replies"].map((suggestion) => (
                  <button 
                    key={suggestion}
                    onClick={() => setQuery(suggestion)}
                    className="px-4 py-1.5 rounded-full border border-slate-200 bg-white/50 hover:bg-white hover:border-indigo-200 hover:text-indigo-600 hover:shadow-sm transition-all duration-200"
                  >
                    {suggestion}
                  </button>
                ))}
             </div>
          )}
        </div>

        {/* Results Section */}
        {error && (
          <div className="max-w-2xl mx-auto p-4 bg-red-50 border border-red-100 rounded-xl flex items-center text-red-600 mb-8">
            <AlertCircle size={20} className="mr-3 flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {results.length > 0 && (
          <div className="animate-fade-in-up">
            <div className="flex items-center justify-between mb-8 border-b border-slate-200 pb-4">
              <h2 className="text-2xl font-['Inter_Tight'] font-bold text-slate-900">Recommended Stack</h2>
              <span className="text-sm text-slate-500 font-mono font-medium">{results.length} TOOLS FOUND</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((tool, index) => (
                <ToolCard key={index} tool={tool} />
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <p className="text-slate-400 text-sm">
                AI recommendations can make mistakes. Always verify important details.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
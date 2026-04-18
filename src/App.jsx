import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Shield, Lock, X } from 'lucide-react';

export default function App() {
  const [screen, setScreen] = useState('landing');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const inputRef = useRef(null);

  const handleEnter = () => {
    setScreen('login');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'bob67') {
      setScreen('result');
    } else {
      setError(true);
      setTimeout(() => setError(false), 800);
      setPassword('');
    }
  };

  useEffect(() => {
    if (screen === 'login' && inputRef.current) {
      inputRef.current.focus();
    }
  }, [screen]);

  return (
    <div className="relative h-screen w-screen bg-[#050805] overflow-hidden font-mono selection:bg-neon-green/30 selection:text-neon-green">
      {/* Background Mesh */}
      <div className="background-mesh absolute inset-0 z-0 filter blur-[100px] opacity-40" />
      {/* Scanlines */}
      <div className="scanlines absolute inset-0 z-[1] pointer-events-none opacity-30" />

      <AnimatePresence mode="wait">
        {screen === 'landing' && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleEnter}
            className="flex h-full w-full cursor-pointer flex-col items-center justify-center relative z-10"
          >
            <motion.h1 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="text-3xl md:text-5xl font-bold tracking-[0.5rem] text-neon-green text-glow border-2 border-neon-green py-8 px-16 bg-black/80 shadow-[inset_0_0_20px_rgba(0,255,65,0.2)] uppercase"
            >
              CLICK TO ENTER
            </motion.h1>
            <p className="mt-8 text-neon-green/50 text-xs tracking-[0.2em] font-bold uppercase">
              CONNECTION: ENCRYPTED
            </p>
          </motion.div>
        )}

        {screen === 'login' && (
          <motion.div
            key="login"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="flex h-full w-full items-center justify-center p-4 relative z-10"
          >
            <motion.div 
              animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
              className="glass-terminal w-full max-w-[450px] p-10 flex flex-col items-center"
            >
              <div className="text-[0.8rem] opacity-70 uppercase tracking-[2px] border-b border-glass-border pb-2 mb-5 w-full">
                System // Network / Nodes
              </div>
              <h2 className="text-2xl font-bold mb-8 tracking-wider uppercase">Proxies</h2>
              
              <p className="text-[0.7rem] mb-3 opacity-80 uppercase font-bold self-start">
                ENTER SECURE ACCESS KEY:
              </p>
              
              <form onSubmit={handleLogin} className="w-full">
                <input
                  ref={inputRef}
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="********"
                  className="w-full bg-transparent border border-neon-green text-neon-green p-3 text-xl outline-none mb-5 text-center shadow-[inset_0_0_5px_rgba(0,255,65,0.2)] placeholder:opacity-30"
                />
                <button
                  type="submit"
                  className="w-full bg-neon-green text-black font-bold py-3 uppercase transition-all hover:bg-white hover:shadow-[0_0_15px_#00ff41] active:translate-y-0.5"
                >
                  Execute
                </button>
              </form>

              {error && (
                <p className="mt-5 text-[#ff3e3e] text-[0.9rem] font-bold uppercase animate-pulse">
                  INVALID KEYCARD. UPLINK DENIED.
                </p>
              )}
            </motion.div>
          </motion.div>
        )}

        {screen === 'result' && (
          <motion.div
            key="result"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex h-full w-full flex-col bg-black/40 backdrop-blur-sm p-8 relative z-10"
          >
            <div className="flex items-center justify-between border-b border-glass-border pb-4 mb-8">
              <div className="flex items-center gap-3">
                <Terminal className="h-4 w-4 text-neon-green" />
                <span className="text-[0.8rem] opacity-70 uppercase tracking-widest font-bold">Root@SecureShell: ~/Proxies</span>
              </div>
              <div className="text-[0.8rem] opacity-50 uppercase tracking-widest font-bold">
                ENCRYPTED_SESSION: 492
              </div>
            </div>

            <div className="flex-1 max-w-2xl mx-auto w-full flex flex-col justify-center">
              <div className="text-[0.9rem] mb-12 space-y-2 opacity-80 font-bold">
                <p># SCANNING GLOBAL SUBNETS...</p>
                <p># DECRYPTING LOCAL NODES...</p>
                <p className="text-neon-green"># ACCESS GRANTED. STATUS REPORT BELOW.</p>
              </div>

              <div className="glass-terminal p-12 text-center relative overflow-hidden group">
                {/* Horizontal scanline for result card */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-green/5 to-transparent h-[10%] w-full animate-scan pointer-events-none" />
                
                <h3 className="text-[#ff3e3e] text-2xl font-bold mb-4 uppercase tracking-tighter">
                  ERROR: NO PROXIES FOUND
                </h3>
                <div className="h-[2px] w-12 bg-neon-green/20 mx-auto mb-6" />
                <p className="text-neon-green/60 text-sm leading-relaxed max-w-sm mx-auto uppercase">
                  THE SCANNING NETWORK REPORTS ZERO ACTIVE PROXY NODES IN YOUR LOCAL SUBNET. SECURITY COVERAGE: 0%.
                </p>
              </div>

              <div className="mt-12 flex justify-between items-center opacity-40 text-[0.7rem] uppercase font-bold tracking-[0.2em]">
                <button 
                  onClick={() => { setScreen('landing'); setPassword(''); }}
                  className="hover:text-neon-green transition-colors"
                >
                  {`[ TERMINAL_EXIT ]`}
                </button>
                <span>UPLINK_STATUS_NULL</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes scan {
          from { top: -100px; }
          to { top: 100%; }
        }
        .animate-scan {
          animation: scan 3s linear infinite;
        }
      `}</style>
    </div>
  );
}

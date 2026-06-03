'use client';

import React, { useState, useRef, useEffect, use } from 'react';
import { MessageSquare, Send, User, Bot, Activity, AlertTriangle, ShieldCheck, RefreshCw } from 'lucide-react';

interface Message {
  sender: 'bot' | 'user';
  text: string;
  isResult?: boolean;
  data?: {
    status: string;
    risk_score_percentage: number;
    severity_level: 'mild' | 'moderate' | 'severe';
    treatment_plan: {
      first_aid: string[];
      medications: {
        allowed: string[];
        forbidden: string[];
      };
      home_care: string;
      referral: string;
    };
    disclaimer: string;
  };
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'bot', text: 'Salam! I am your Dengue Alert PK Health Assistant. Is this health assessment for a human or an animal?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<'species' | 'symptoms' | 'complete'>('species');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    setMessages((prev) => [...prev, { sender: 'user', text: userText }]);
    setInput('');

    if (step === 'species') {
      const textLower = userText.toLowerCase();
      if (textLower.includes('animal') || textLower.includes('janwar') || textLower.includes('dog') || textLower.includes('cat')) {
        setIsLoading(true);
        setTimeout(() => {
          setIsLoading(false);
          setMessages((prev) => [
            ...prev,
            { sender: 'bot', text: 'Notice: The veterinary/animal diagnostic module is currently offline for re-calibration. We are strictly processing human clinical profiles right now. Is the patient a human?' }
          ]);
        }, 600);
      } else {
        setStep('symptoms');
        setMessages((prev) => [
          ...prev,
          { 
            sender: 'bot', 
            text: 'Understood. Please describe the symptoms in detail. You can mention fever, severe headache, behind-eye pain, joint/muscle pain, rashes, vomiting, or any bleeding issues if you are experiencing them.' 
          }
        ]);
      }
    } else if (step === 'symptoms') {
      setIsLoading(true);
      
      const textLower = userText.toLowerCase();
      
      // Feature Mapping Vector for /predict/human
      const payload = {
        symptoms: {
          fever: textLower.includes('fever') || textLower.includes('bukhar') || textLower.includes('b बुखार') ? 1 : 0,
          headache: textLower.includes('headache') || textLower.includes('sar dard') ? 1 : 0,
          retro_orbital_pain: textLower.includes('eye') || textLower.includes('ankh') || textLower.includes('behind') ? 1 : 0,
          muscle_joint_pain: textLower.includes('joint') || textLower.includes('pain') || textLower.includes('haddi') || textLower.includes('body') ? 1 : 0,
          rash: textLower.includes('rash') || textLower.includes('daane') || textLower.includes('jild') ? 1 : 0,
          nausea: textLower.includes('nausea') || textLower.includes('matli') || textLower.includes('g ghabrana') ? 1 : 0,
          vomiting: textLower.includes('vomit') || textLower.includes('ulti') ? 1 : 0,
          mild_bleeding: textLower.includes('bleed') || textLower.includes('khoon') || textLower.includes('gum') || textLower.includes('nose') ? 1 : 0,
          easy_bruising: textLower.includes('bruise') || textLower.includes('daagh') || textLower.includes('neel') ? 1 : 0,
          fatigue: textLower.includes('fatigue') || textLower.includes('weak') || textLower.includes('kamzori') || textLower.includes('thakan') ? 1 : 0,
          abdominal_pain: textLower.includes('stomach') || textLower.includes('pet dard') || textLower.includes('belly') ? 1 : 0,
          persistent_vomiting: textLower.includes('constant vomit') || textLower.includes('musalsal ulti') ? 1 : 0,
          mucous_membrane_bleeding: textLower.includes('severe bleed') || textLower.includes('zyada khoon') ? 1 : 0,
          difficulty_breath: textLower.includes('breath') || textLower.includes('saans') || textLower.includes('cough') ? 1 : 0,
          restlessness: textLower.includes('restless') || textLower.includes('bechaini') ? 1 : 0
        },
        risk_factors: {
          recent_mosquito_bites: textLower.includes('bite') || textLower.includes('machar') ? 1 : 1, // Baseline conditional logic triggers positive weight
          travel_to_endemic_areas: 0,
          stagnant_water_zone: textLower.includes('water') || textLower.includes('pani') || textLower.includes('stagnant') ? 1 : 0,
          low_platelet_history: textLower.includes('platelet') || textLower.includes('cell') ? 1 : 0
        }
      };

      try {
        const response = await fetch('https://dengue-backend-production.up.railway.app/predict/human', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        const data = await response.json();
        setIsLoading(false);

        if (data.status === 'success') {
          setStep('complete');
          setMessages((prev) => [
            ...prev,
            { 
              sender: 'bot', 
              text: `AI Diagnostic Pipeline completed. We have structured your dynamic dengue threat matrix analysis below.`,
              isResult: true,
              data: data
            }
          ]);
        } else {
          setMessages((prev) => [...prev, { sender: 'bot', text: 'Error executing AI model. Response verification payload failed.' }]);
        }
      } catch (error) {
        setIsLoading(false);
        setMessages((prev) => [...prev, { sender: 'bot', text: 'Unable to communicate with the cloud core engine. Please ensure backend services are up.' }]);
      }
    }
  };

  const resetChat = () => {
    setMessages([{ sender: 'bot', text: 'Salam! I am your Dengue Alert PK Health Assistant. Is this health assessment for a human or an animal?' }]);
    setStep('species');
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans">
      {/* Header Profile Module */}
      <header className="bg-neutral-900 border-b border-neutral-800 p-4 sticky top-0 z-10 flex justify-between items-center shadow-lg">
        <div className="flex items-center gap-3">
          <div className="bg-red-950/60 border border-red-800 p-2 rounded-xl text-red-500 animate-pulse">
            <Activity size={22} />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white tracking-wide">DengueAlert PK</h1>
            <p className="text-xs text-neutral-400">Salim Habib University AI Core Deployment</p>
          </div>
        </div>
        <button 
          onClick={resetChat} 
          className="text-neutral-400 hover:text-white p-2 rounded-xl border border-neutral-800 hover:bg-neutral-800 transition shadow-inner"
          title="Reset Conversation"
        >
          <RefreshCw size={16} />
        </button>
      </header>

      {/* Main Chat Interface */}
      <main className="flex-1 max-w-3xl w-full mx-auto p-4 flex flex-col justify-between overflow-hidden">
        <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-1 scrollbar-thin scrollbar-thumb-neutral-800">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex gap-3 max-w-[88%] ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}>
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center border shrink-0 shadow-sm ${msg.sender === 'user' ? 'bg-blue-950 border-blue-800 text-blue-400' : 'bg-neutral-900 border-neutral-800 text-emerald-400'}`}>
                {msg.sender === 'user' ? <User size={14} /> : <Bot size={14} />}
              </div>
              
              <div className="space-y-3 flex-1">
                <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm tracking-wide ${msg.sender === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-neutral-900 border border-neutral-800 text-neutral-200 rounded-tl-none'}`}>
                  {msg.text}
                </div>

                {/* AI Result Reporting Vector Card */}
                {msg.isResult && msg.data && (
                  <div className="space-y-4 mt-2 animate-in fade-in duration-300">
                    {/* Severity Probability Level UI */}
                    <div className={`p-5 rounded-2xl border-2 border-l-8 ${
                      msg.data.severity_level === 'severe' ? 'bg-red-950/30 border-red-900/80 text-red-200 border-l-red-500' : 
                      msg.data.severity_level === 'moderate' ? 'bg-amber-950/30 border-amber-900/80 text-amber-200 border-l-amber-500' : 
                      'bg-emerald-950/30 border-emerald-900/80 text-emerald-200 border-l-emerald-500'
                    }`}>
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-[11px] font-bold uppercase tracking-wider opacity-80">Threat Diagnostics Matrix</span>
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-neutral-950/80 border border-neutral-800">HUMAN CORE</span>
                      </div>
                      <div className="text-4xl font-black tracking-tight mb-1">{msg.data.risk_score_percentage}%</div>
                      <div className="text-xs font-extrabold capitalize flex items-center gap-1.5">
                        <AlertTriangle size={14} /> Severity Assessment: {msg.data.severity_level}
                      </div>
                    </div>

                    {/* First Aid & Treatment Protocols Block */}
                    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 space-y-4 shadow-md">
                      <div>
                        <h3 className="font-bold text-white text-sm flex items-center gap-2 mb-2">
                          <ShieldCheck className="text-emerald-500" size={16} /> Immediate Critical First Aid
                        </h3>
                        <ul className="space-y-1.5 text-xs text-neutral-300 list-disc pl-4 leading-relaxed">
                          {msg.data.treatment_plan.first_aid.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-neutral-800 text-xs">
                        <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800">
                          <span className="text-neutral-500 font-bold block mb-1 uppercase text-[10px]">Allowed Management Drugs</span>
                          <span className="text-emerald-400 font-bold">{msg.data.treatment_plan.medications.allowed.join(', ')}</span>
                        </div>
                        <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800">
                          <span className="text-neutral-500 font-bold block mb-1 uppercase text-[10px]">Strictly Contraindicated (Forbidden)</span>
                          <span className="text-red-400 font-bold">{msg.data.treatment_plan.medications.forbidden.join(', ')}</span>
                        </div>
                      </div>

                      <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800 text-xs leading-relaxed">
                        <span className="text-neutral-400 font-bold block mb-1">Home Care Monitoring:</span>
                        <p className="text-neutral-300 text-[13px]">{msg.data.treatment_plan.home_care}</p>
                      </div>

                      <div className="bg-neutral-950 p-3 rounded-xl border border-l-4 border-l-blue-500 border-neutral-800 text-xs">
                        <span className="text-blue-400 font-bold block mb-0.5">Clinical Referral Pathway:</span>
                        <p className="text-neutral-300">{msg.data.treatment_plan.referral}</p>
                      </div>
                    </div>

                    {/* Disclaimer Notification Footer */}
                    <p className="text-[10px] text-neutral-500 leading-relaxed bg-neutral-950 p-3 rounded-xl border border-neutral-900 text-justify">
                      ⚠️ <strong>Disclaimer:</strong> {msg.data.disclaimer}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3 mr-auto items-center">
              <div className="w-8 h-8 rounded-xl bg-neutral-900 border border-neutral-800 text-emerald-400 flex items-center justify-center animate-spin">
                <RefreshCw size={12} />
              </div>
              <div className="bg-neutral-900 border border-neutral-800 text-neutral-400 px-3 py-2 rounded-2xl rounded-tl-none text-xs tracking-wide">
                Analyzing features via model pipeline...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Control Console */}
        <form onSubmit={handleSendMessage} className="bg-neutral-900 border border-neutral-800 rounded-2xl p-2 flex gap-2 items-center shadow-2xl">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading || step === 'complete'}
            placeholder={
              step === 'species' ? "Type 'Human' or 'Animal' to route configuration..." : 
              step === 'symptoms' ? "Describe clinical signs (e.g., severe fever, joint pain, gums bleeding)..." : 
              "Analysis completed. Click the reload icon above to evaluate again."
            }
            className="flex-1 bg-transparent px-3 py-2 text-sm focus:outline-none text-white placeholder-neutral-500 disabled:opacity-40"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading || step === 'complete'}
            className="bg-blue-600 hover:bg-blue-500 text-white p-2.5 rounded-xl disabled:opacity-20 disabled:hover:bg-blue-600 transition shrink-0 shadow-md"
          >
            <Send size={14} />
          </button>
        </form>
      </main>
    </div>
  );
}

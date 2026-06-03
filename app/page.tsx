'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  Activity, Send, User, Bot, AlertTriangle, ShieldCheck, 
  RefreshCw, BookOpen, ClipboardCheck, MessageSquare, Globe 
} from 'lucide-react';

// Language Localization Dictionary
const langData = {
  en: {
    dir: 'ltr',
    title: 'DengueAlert PK',
    subtitle: 'Salim Habib University AI Core Deployment',
    tabs: { info: 'Dengue Info', form: 'Standard Diagnostic', chat: 'AI Chatbot' },
    info: {
      title: 'Dengue Knowledge Base',
      desc: 'Understand the virus, vectors, and safety protocols.',
      cards: [
        { t: 'Transmission', d: 'Spread by the bite of an infected Aedes aegypti mosquito. They usually bite during the day.' },
        { t: 'Key Symptoms', d: 'High fever, severe headache, retro-orbital pain (behind eyes), severe muscle/joint pain, and skin rashes.' },
        { t: 'Prevention Matrix', d: 'Eliminate stagnant water around home, use mosquito repellents, and wear long-sleeved clothes.' },
        { t: 'Critical Warning Signs', d: 'Persistent abdominal pain, continuous vomiting, gum bleeding, and extreme fatigue demand immediate ER care.' }
      ]
    },
    form: {
      title: 'Standard Diagnostic Assessment',
      desc: 'Select your clinical parameters manually for an automated assessment.',
      fever: 'High Fever',
      headache: 'Severe Headache',
      jointPain: 'Severe Joint/Muscle Pain',
      bleeding: 'Mild Bleeding Signs (Nose/Gums)',
      breathing: 'Difficulty Breathing',
      waterZone: 'Living near Stagnant Water Zone',
      btn: 'Run Diagnostic Vector'
    },
    chat: {
      init: 'Salam! I am your Dengue Alert PK Health Assistant. Is this health assessment for a human or an animal?',
      placeholder: 'Describe your symptoms or reply to the assistant...',
      onlineMsg: 'Notice: The veterinary module is currently offline. We are only processing human clinical profiles. Is the patient a human?'
    },
    ui: {
      reset: 'Reset',
      loading: 'Analyzing engine features...',
      allowed: 'Allowed Management Drugs',
      forbidden: 'Strictly Contraindicated (Forbidden)',
      homeCare: 'Home Care Monitoring:',
      referral: 'Clinical Referral Pathway:',
      disclaimer: 'Disclaimer: This assessment is an AI-generated suggestion for reference. It is not a replacement for professional clinical laboratory tests.'
    }
  },
  ur: {
    dir: 'rtl',
    title: 'ڈینگی الرٹ PK',
    subtitle: 'سلیم حبیب یونیورسٹی اے آئی کور ڈپلائمنٹ',
    tabs: { info: 'معلومات', form: 'فارم ٹیسٹنگ', chat: 'اے آئی چیٹ بوٹ' },
    info: {
      title: 'ڈینگی معلومات مرکز',
      desc: 'وائرس، مچھروں کی افزائش اور حفاظتی تدابیر کو سمجھیں۔',
      cards: [
        { t: 'وائرس کا پھیلاؤ', d: 'یہ ایک متاثرہ ایڈیز مچھر کے کاٹنے سے پھیلتا ہے۔ یہ مچھر عام طور پر دن کے وقت کاٹتے ہیں۔' },
        { t: 'بنیادی علامات', d: 'شدید بخار، سر میں شدید درد، آنکھوں کے پیچھے درد، جوڑوں اور پٹھوں کا شدید درد، اور جلد پر سرخ دھبے ہونا۔' },
        { t: 'حفاظتی تدابیر', d: 'گھر کے آس پاس کھڑے پانی کو ختم کریں، مچھر بھگانے والے لوشن کا استعمال کریں، اور پوری آستین کے کپڑے پہنیں۔' },
        { t: 'خطرناک علامات', d: 'پیٹ میں مستقل درد، مسلسل الٹیاں، مسوڑھوں سے خون آنا اور شدید کمزوری کی صورت میں فوری ایمرجنسی سے رجوع کریں۔' }
      ]
    },
    form: {
      title: 'معیاری تشخیصی اسیسمنٹ',
      desc: 'خودکار تشخیص کے لیے اپنی طبی علامات کو مینوئلی منتخب کریں۔',
      fever: 'تیز بخار',
      headache: 'سر میں شدید درد',
      jointPain: 'جوڑوں یا پٹھوں میں شدید درد',
      bleeding: 'خون آنے کی علامات (ناک یا مسوڑھے)',
      breathing: 'سانس لینے میں دشواری',
      waterZone: 'کھڑے پانی والے علاقے کے قریب رہائش',
      btn: 'تشخیص شروع کریں'
    },
    chat: {
      init: 'سلام! میں آپ کا ڈینگی الرٹ ہیلتھ اسسٹنٹ ہوں۔ کیا یہ تشخیصی اسیسمنٹ انسان کے لیے ہے یا جانور کے لیے؟',
      placeholder: 'اپنی علامات لکھیں یا اسسٹنٹ کو جواب دیں...',
      onlineMsg: 'نوٹس: جانوروں کا تشخیصی ماڈیول فی الحال آف لائن ہے۔ ہم صرف انسانی طبی ڈیٹا پر کارروائی کر رہے ہیں۔ کیا مریض انسان ہے؟'
    },
    ui: {
      reset: 'دوبارہ شروع کریں',
      loading: 'اے آئی انجن تجزیہ کر رہا ہے...',
      allowed: 'تجویز کردہ ادویات',
      forbidden: 'ممنوعہ ادویات (سختی سے پرہیز کریں)',
      homeCare: 'گھریلو دیکھ بھال اور نگرانی:',
      referral: 'طبی مشورہ اور راستہ:',
      disclaimer: 'تنبیہ: یہ تشخیص صرف ابتدائی رہنمائی کے لیے ایک اے آئی سے تیار کردہ تجویز ہے۔ یہ کسی پیشہ ور طبی معائنے یا لیبارٹری ٹیسٹ کا متبادل نہیں ہے۔'
    }
  }
};

interface Message {
  sender: 'bot' | 'user';
  text: string;
  isResult?: boolean;
  data?: any;
}

export default function Home() {
  const [lang, setLang] = useState<'en' | 'ur'>('en');
  const [activeTab, setActiveTab] = useState<'info' | 'form' | 'chat'>('info');
  const t = langData[lang];

  // Chat State
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const [chatStep, setChatStep] = useState<'species' | 'symptoms' | 'complete'>('species');

  // Form State
  const [formSymptoms, setFormSymptoms] = useState({
    fever: false, headache: false, jointPain: false, bleeding: false, breathing: false, waterZone: false
  });
  const [formResult, setFormResult] = useState<any>(null);
  const [formLoading, setFormLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize Chat context based on language selection
  useEffect(() => {
    setMessages([{ sender: 'bot', text: t.chat.init }]);
    setChatStep('species');
    setFormResult(null);
  }, [lang, t.chat.init]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, chatLoading]);

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'en' ? 'ur' : 'en'));
  };

  // Form Execution Engine
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setFormResult(null);

    const payload = {
      symptoms: {
        fever: formSymptoms.fever ? 1 : 0,
        headache: formSymptoms.headache ? 1 : 0,
        retro_orbital_pain: formSymptoms.headache ? 1 : 0, 
        muscle_joint_pain: formSymptoms.jointPain ? 1 : 0,
        rash: 0, nausea: 0, vomiting: 0,
        mild_bleeding: formSymptoms.bleeding ? 1 : 0,
        easy_bruising: 0, fatigue: 0, abdominal_pain: 0, persistent_vomiting: 0,
        mucous_membrane_bleeding: 0,
        difficulty_breath: formSymptoms.breathing ? 1 : 0,
        restlessness: 0
      },
      risk_factors: {
        recent_mosquito_bites: 1,
        travel_to_endemic_areas: 0,
        stagnant_water_zone: formSymptoms.waterZone ? 1 : 0,
        low_platelet_history: 0
      }
    };

    try {
      const res = await fetch('https://dengue-backend-production.up.railway.app/predict/human', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.status === 'success') setFormResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setFormLoading(false);
    }
  };

  // Chat Execution Engine
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || chatLoading) return;

    const userText = chatInput.trim();
    setMessages((prev) => [...prev, { sender: 'user', text: userText }]);
    setChatInput('');

    if (chatStep === 'species') {
      const textLower = userText.toLowerCase();
      if (textLower.includes('animal') || textLower.includes('janwar')) {
        setChatLoading(true);
        setTimeout(() => {
          setChatLoading(false);
          setMessages((prev) => [...prev, { sender: 'bot', text: t.chat.onlineMsg }]);
        }, 600);
      } else {
        setChatStep('symptoms');
        setMessages((prev) => [
          ...prev,
          { sender: 'bot', text: lang === 'en' ? 'Understood. Please describe your symptoms naturally now.' : 'بہتر۔ اب اپنی علامات تفصیلاً بیان کریں۔' }
        ]);
      }
    } else if (chatStep === 'symptoms') {
      setChatLoading(true);
      const textLower = userText.toLowerCase();

      const payload = {
        symptoms: {
          fever: textLower.includes('fever') || textLower.includes('bukhar') ? 1 : 0,
          headache: textLower.includes('headache') || textLower.includes('sar dard') ? 1 : 0,
          retro_orbital_pain: textLower.includes('eye') || textLower.includes('ankh') ? 1 : 0,
          muscle_joint_pain: textLower.includes('joint') || textLower.includes('pain') || textLower.includes('haddi') ? 1 : 0,
          rash: textLower.includes('rash') || textLower.includes('daane') ? 1 : 0,
          nausea: textLower.includes('nausea') || textLower.includes('matli') ? 1 : 0,
          vomiting: textLower.includes('vomit') || textLower.includes('ulti') ? 1 : 0,
          mild_bleeding: textLower.includes('bleed') || textLower.includes('khoon') ? 1 : 0,
          easy_bruising: 0, fatigue: 0, abdominal_pain: 0, persistent_vomiting: 0,
          mucous_membrane_bleeding: 0, difficulty_breath: textLower.includes('saans') || textLower.includes('breath') ? 1 : 0,
          restlessness: 0
        },
        risk_factors: { recent_mosquito_bites: 1, travel_to_endemic_areas: 0, stagnant_water_zone: 0, low_platelet_history: 0 }
      };

      try {
        const res = await fetch('https://dengue-backend-production.up.railway.app/predict/human', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (data.status === 'success') {
          setChatStep('complete');
          setMessages((prev) => [...prev, { sender: 'bot', text: 'Pipeline Execution Completed.', isResult: true, data }]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setChatLoading(false);
      }
    }
  };

  const ResultCard = ({ data }: { data: any }) => (
    <div className="space-y-4 mt-4 animate-in fade-in duration-300">
      <div className={`p-5 rounded-2xl border-2 border-l-8 ${
        data.severity_level === 'severe' ? 'bg-red-950/30 border-red-900 text-red-200 border-l-red-500' : 
        data.severity_level === 'moderate' ? 'bg-amber-950/30 border-amber-900 text-amber-200 border-l-amber-500' : 
        'bg-emerald-950/30 border-emerald-900 text-emerald-200 border-l-emerald-500'
      }`}>
        <div className="text-4xl font-black mb-1">{data.risk_score_percentage}%</div>
        <div className="text-xs font-extrabold capitalize flex items-center gap-1.5">
          <AlertTriangle size={14} /> Severity Assessment: {data.severity_level}
        </div>
      </div>
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 space-y-3">
        <h3 className="font-bold text-white text-sm flex items-center gap-2"><ShieldCheck className="text-emerald-500" size={16} /> {t.ui.allowed}</h3>
        <span className="text-emerald-400 font-bold text-xs">{data.treatment_plan.medications.allowed.join(', ')}</span>
        <h3 className="font-bold text-white text-sm flex items-center gap-2 pt-2 border-t border-neutral-800"><AlertTriangle className="text-red-500" size={16} /> {t.ui.forbidden}</h3>
        <span className="text-red-400 font-bold text-xs">{data.treatment_plan.medications.forbidden.join(', ')}</span>
        <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800 text-xs text-neutral-300 mt-2">
          <strong>{t.ui.homeCare}</strong> {data.treatment_plan.home_care}
        </div>
        <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800 text-xs text-neutral-300">
          <strong>{t.ui.referral}</strong> {data.treatment_plan.referral}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-blue-500/30" dir={t.dir}>
      {/* Header Container */}
      <header className="bg-neutral-900/80 backdrop-blur-md border-b border-neutral-800 p-4 sticky top-0 z-50 flex justify-between items-center shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="bg-red-950/60 border border-red-800 p-2 rounded-xl text-red-500 animate-pulse">
            <Activity size={22} />
          </div>
          <div>
            <h1 className="text-lg font-black tracking-wider text-white">{t.title}</h1>
            <p className="text-[11px] text-neutral-400 font-medium tracking-tight">{t.subtitle}</p>
          </div>
        </div>

        {/* Global Control Cluster */}
        <div className="flex items-center gap-2">
          <button 
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 text-xs font-bold text-blue-400 hover:text-white px-3 py-2 rounded-xl border border-neutral-800 hover:bg-neutral-800 transition"
          >
            <Globe size={14} /> {lang === 'en' ? 'اردو' : 'English'}
          </button>
        </div>
      </header>

      {/* Navigation Sub-Menu Tab Module */}
      <nav className="max-w-3xl w-full mx-auto px-4 pt-6 flex gap-2">
        {(['info', 'form', 'chat'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border font-bold text-xs tracking-wide transition-all duration-200 ${
              activeTab === tab 
                ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-600/10 scale-[1.02]' 
                : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:bg-neutral-800 hover:text-neutral-200'
            }`}
          >
            {tab === 'info' && <BookOpen size={14} />}
            {tab === 'form' && <ClipboardCheck size={14} />}
            {tab === 'chat' && <MessageSquare size={14} />}
            {t.tabs[tab]}
          </button>
        ))}
      </nav>

      {/* Main Structural Display Frame */}
      <main className="flex-1 max-w-3xl w-full mx-auto p-4 flex flex-col justify-start overflow-hidden">
        
        {/* Tab 1: Knowledge Hub Display */}
        {activeTab === 'info' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="bg-neutral-900 border border-neutral-800 p-5 rounded-2xl">
              <h2 className="text-base font-bold text-white mb-1">{t.info.title}</h2>
              <p className="text-xs text-neutral-400">{t.info.desc}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {t.info.cards.map((c, i) => (
                <div key={i} className="bg-neutral-900/40 border border-neutral-800/80 p-4 rounded-2xl hover:border-neutral-700 transition">
                  <h3 className="text-xs font-black text-blue-400 mb-1.5 uppercase tracking-wider">{c.t}</h3>
                  <p className="text-xs text-neutral-300 leading-relaxed text-justify">{c.d}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Standard Analytical Form Module */}
        {activeTab === 'form' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <form onSubmit={handleFormSubmit} className="bg-neutral-900 border border-neutral-800 p-5 rounded-2xl space-y-4 shadow-xl">
              <div>
                <h2 className="text-base font-bold text-white mb-1">{t.form.title}</h2>
                <p className="text-xs text-neutral-400">{t.form.desc}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {Object.keys(formSymptoms).map((key) => (
                  <label key={key} className="flex items-center gap-3 bg-neutral-950 p-4 rounded-xl border border-neutral-800 hover:border-neutral-700 transition cursor-pointer">
                    <input
                      type="checkbox"
                      checked={(formSymptoms as any)[key]}
                      onChange={(e) => setFormSymptoms(prev => ({ ...prev, [key]: e.target.checked }))}
                      className="w-4 h-4 rounded text-blue-600 bg-neutral-900 border-neutral-800 focus:ring-0"
                    />
                    <span className="text-xs font-semibold text-neutral-200">
                      {key === 'fever' && t.form.fever}
                      {key === 'headache' && t.form.headache}
                      {key === 'jointPain' && t.form.jointPain}
                      {key === 'bleeding' && t.form.bleeding}
                      {key === 'breathing' && t.form.breathing}
                      {key === 'waterZone' && t.form.waterZone}
                    </span>
                  </label>
                ))}
              </div>
              <button
                type="submit"
                disabled={formLoading}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl text-xs font-black uppercase tracking-wider transition disabled:opacity-40"
              >
                {formLoading ? t.ui.loading : t.form.btn}
              </button>
            </form>
            {formResult && <ResultCard data={formResult} />}
          </div>
        )}

        {/* Tab 3: Interactive Chatbot Module */}
        {activeTab === 'chat' && (
          <div className="flex-1 flex flex-col justify-between overflow-hidden animate-in fade-in duration-200 min-h-[500px]">
            <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-1 scrollbar-thin scrollbar-thumb-neutral-800">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex gap-3 max-w-[88%] ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}>
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center border shrink-0 ${msg.sender === 'user' ? 'bg-blue-950 border-blue-800 text-blue-400' : 'bg-neutral-900 border-neutral-800 text-emerald-400'}`}>
                    {msg.sender === 'user' ? <User size={14} /> : <Bot size={14} />}
                  </div>
                  <div className="space-y-2 flex-1">
                    <div className={`p-4 rounded-2xl text-sm leading-relaxed tracking-wide ${msg.sender === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-neutral-900 border border-neutral-800 text-neutral-200 rounded-tl-none'}`}>
                      {msg.text}
                    </div>
                    {msg.isResult && msg.data && <ResultCard data={msg.data} />}
                  </div>
                </div>
              ))}
              {chatLoading && (
                <div className="flex gap-3 mr-auto items-center">
                  <div className="w-8 h-8 rounded-xl bg-neutral-900 border border-neutral-800 text-emerald-400 flex items-center justify-center animate-spin">
                    <RefreshCw size={12} />
                  </div>
                  <div className="bg-neutral-900 border border-neutral-800 text-neutral-400 px-3 py-2 rounded-2xl rounded-tl-none text-xs tracking-wide">
                    {t.ui.loading}
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Controls Action Bar */}
            <form onSubmit={handleSendMessage} className="bg-neutral-900 border border-neutral-800 rounded-2xl p-2 flex gap-2 items-center shadow-2xl">
              <input
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                disabled={chatLoading || chatStep === 'complete'}
                placeholder={t.chat.placeholder}
                className="flex-1 bg-transparent px-3 py-2 text-sm focus:outline-none text-white placeholder-neutral-500 disabled:opacity-40"
              />
              <button
                type="submit"
                disabled={!chatInput.trim() || chatLoading || chatStep === 'complete'}
                className="bg-blue-600 hover:bg-blue-500 text-white p-2.5 rounded-xl disabled:opacity-20 transition shrink-0"
              >
                <Send size={14} />
              </button>
            </form>
          </div>
        )}

        {/* Dynamic Shared Disclaimer Footer */}
        <p className="text-[10px] text-neutral-500 leading-relaxed bg-neutral-950 mt-4 p-3 rounded-xl border border-neutral-900 text-justify">
          ⚠️ {t.ui.disclaimer}
        </p>
      </main>
    </div>
  );
}

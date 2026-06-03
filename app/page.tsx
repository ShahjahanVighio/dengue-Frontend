'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Activity, Send, User, Bot, AlertTriangle, ShieldCheck,
  RefreshCw, BookOpen, ClipboardCheck, MessageSquare, Globe,
  Phone, MapPin, Clock, ChevronRight
} from 'lucide-react';

const langData = {
  en: {
    dir: 'ltr',
    title: 'DengueAlert PK',
    subtitle: 'Salim Habib University — AI Core Deployment',
    utilBar: {
      // emergency: 'Emergency: 021-111-911-911',
      // hours: 'Mon – Sat, 8am – 8pm',
      // location: 'Karachi, Pakistan',
    },
    tabs: { info: 'Dengue Info', form: 'Standard Diagnostic', chat: 'AI Chatbot' },
    info: {
      title: 'Dengue Knowledge Base',
      desc: 'Understand the virus, vectors, and safety protocols to protect yourself and your community.',
      cards: [
        { t: 'Transmission', d: 'Spread by the bite of an infected Aedes aegypti mosquito. They usually bite during the day.' },
        { t: 'Key Symptoms', d: 'High fever, severe headache, retro-orbital pain (behind eyes), severe muscle/joint pain, and skin rashes.' },
        { t: 'Prevention Matrix', d: 'Eliminate stagnant water around home, use mosquito repellents, and wear long-sleeved clothes.' },
        { t: 'Critical Warning Signs', d: 'Persistent abdominal pain, continuous vomiting, gum bleeding, and extreme fatigue demand immediate ER care.' }
      ]
    },
    form: {
      title: 'Standard Diagnostic Assessment',
      desc: 'Select your clinical parameters manually for an automated risk assessment.',
      fever: 'High Fever',
      headache: 'Severe Headache',
      jointPain: 'Severe Joint / Muscle Pain',
      bleeding: 'Mild Bleeding Signs (Nose / Gums)',
      breathing: 'Difficulty Breathing',
      waterZone: 'Living near Stagnant Water Zone',
      btn: 'Run Diagnostic Assessment'
    },
    chat: {
      init: 'Salam! I am your Dengue Alert PK Health Assistant. Is this health assessment for a human or an animal?',
      placeholder: 'Describe your symptoms or reply to the assistant…',
      onlineMsg: 'Notice: The veterinary module is currently offline. We are only processing human clinical profiles. Is the patient a human?'
    },
    ui: {
      reset: 'Reset',
      loading: 'Analysing clinical parameters…',
      allowed: 'Permitted Medications',
      forbidden: 'Strictly Contraindicated',
      homeCare: 'Home Care Monitoring:',
      referral: 'Clinical Referral Pathway:',
      disclaimer: 'This assessment is an AI-generated suggestion for reference only. It is not a replacement for professional clinical laboratory tests or physician consultation.'
    }
  },
  ur: {
    dir: 'rtl',
    title: 'ڈینگی الرٹ PK',
    subtitle: 'سلیم حبیب یونیورسٹی — اے آئی کور ڈپلائمنٹ',
    utilBar: {
      emergency: 'ایمرجنسی: 021-111-911-911',
      hours: 'پیر – ہفتہ، صبح 8 – شام 8',
      location: 'کراچی، پاکستان',
    },
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
      onlineMsg: 'نوٹس: جانوروں کا تشخیصی ماڈیول فی حالیہ آف لائن ہے۔ ہم صرف انسانی طبی ڈیٹا پر کارروائی کر رہے ہیں۔ کیا مریض انسان ہے؟'
    },
    ui: {
      reset: 'دوبارہ شروع کریں',
      loading: 'اے آئی انجن تجزیہ کر رہا ہے...',
      allowed: 'تجویز کردہ ادویات',
      forbidden: 'ممنوعہ ادویات',
      homeCare: 'گھریلو دیکھ بھال:',
      referral: 'طبی مشورہ:',
      disclaimer: 'یہ تشخیص صرف ابتدائی رہنمائی کے لیے ہے۔ یہ کسی پیشہ ور طبی معائنے یا لیبارٹری ٹیسٹ کا متبادل نہیں ہے۔'
    }
  }
};

interface Message {
  sender: 'bot' | 'user';
  text: string;
  isResult?: boolean;
  data?: any;
}

const C = {
  teal: '#005C50',
  tealLight: '#E8F4F2',
  tealMid: '#0B8C7A',
  red: '#9B2335',
  redLight: '#FBF0F1',
  amber: '#B85C00',
  amberLight: '#FFF5E6',
  green: '#1A6B3C',
  greenLight: '#EBF5EF',
  border: '#DDE4E2',
  borderStrong: '#B0C4C0',
  bg: '#F5F7F6',
  bgWhite: '#FFFFFF',
  textPrimary: '#1A2B28',
  textSecondary: '#4A6560',
  textMuted: '#7A9490',
};

export default function Home() {
  const [lang, setLang] = useState<'en' | 'ur'>('en');
  const [activeTab, setActiveTab] = useState<'info' | 'form' | 'chat'>('info');
  const t = langData[lang];

  const [messages, setMessages] = useState<Message[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const [chatStep, setChatStep] = useState<'species' | 'symptoms' | 'complete'>('species');

  const [formSymptoms, setFormSymptoms] = useState({
    fever: false, headache: false, jointPain: false,
    bleeding: false, breathing: false, waterZone: false
  });
  const [formResult, setFormResult] = useState<any>(null);
  const [formLoading, setFormLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([{ sender: 'bot', text: t.chat.init }]);
    setChatStep('species');
    setFormResult(null);
  }, [lang, t.chat.init]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, chatLoading]);

  const toggleLanguage = () => setLang(prev => prev === 'en' ? 'ur' : 'en');

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setFormResult(null);
    const payload = {
      symptoms: {
        fever: formSymptoms.fever ? 1 : 0,
        headache: formSymptoms.headache ? 1 : 0,
        retro_orbital_pain: 0,
        muscle_joint_pain: formSymptoms.jointPain ? 1 : 0,
        rash: 0, nausea: 0, vomiting: 0,
        mild_bleeding: formSymptoms.bleeding ? 1 : 0,
        easy_bruising: 0, fatigue: 0, abdominal_pain: 0,
        persistent_vomiting: 0, mucous_membrane_bleeding: 0,
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

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || chatLoading) return;
    const userText = chatInput.trim();
    setMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setChatInput('');

    if (chatStep === 'species') {
      const lower = userText.toLowerCase();
      if (lower.includes('animal') || lower.includes('janwar')) {
        setChatLoading(true);
        setTimeout(() => {
          setChatLoading(false);
          setMessages(prev => [...prev, { sender: 'bot', text: t.chat.onlineMsg }]);
        }, 600);
      } else {
        setChatStep('symptoms');
        setMessages(prev => [...prev, {
          sender: 'bot',
          text: lang === 'en'
            ? 'Understood. Please describe your symptoms in detail.'
            : 'بہتر۔ اب اپنی علامات تفصیلاً بیان کریں۔'
        }]);
      }
    } else if (chatStep === 'symptoms') {
      setChatLoading(true);
      const lower = userText.toLowerCase();
      const payload = {
        symptoms: {
          fever: lower.includes('fever') || lower.includes('bukhar') ? 1 : 0,
          headache: lower.includes('headache') || lower.includes('sar dard') ? 1 : 0,
          retro_orbital_pain: lower.includes('eye') || lower.includes('ankh') ? 1 : 0,
          muscle_joint_pain: lower.includes('joint') || lower.includes('pain') || lower.includes('haddi') ? 1 : 0,
          rash: lower.includes('rash') || lower.includes('daane') ? 1 : 0,
          nausea: lower.includes('nausea') || lower.includes('matli') ? 1 : 0,
          vomiting: lower.includes('vomit') || lower.includes('ulti') ? 1 : 0,
          mild_bleeding: lower.includes('bleed') || lower.includes('khoon') ? 1 : 0,
          easy_bruising: 0, fatigue: 0, abdominal_pain: 0,
          persistent_vomiting: 0, mucous_membrane_bleeding: 0,
          difficulty_breath: lower.includes('saans') || lower.includes('breath') ? 1 : 0,
          restlessness: 0
        },
        risk_factors: {
          recent_mosquito_bites: 1,
          travel_to_endemic_areas: 0,
          stagnant_water_zone: 0,
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
        if (data.status === 'success') {
          setChatStep('complete');
          setMessages(prev => [...prev, {
            sender: 'bot',
            text: 'Assessment complete. Results below:',
            isResult: true,
            data
          }]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setChatLoading(false);
      }
    }
  };

  const ResultCard = ({ data }: { data: any }) => {
    const isSevere = data.severity_level === 'severe';
    const isModerate = data.severity_level === 'moderate';
    const severityColor = isSevere ? C.red : isModerate ? C.amber : C.green;
    const severityBg = isSevere ? C.redLight : isModerate ? C.amberLight : C.greenLight;

    return (
      <div style={{ marginTop: 16 }}>
        <div style={{
          background: severityBg,
          border: `1px solid ${severityColor}30`,
          borderLeft: `4px solid ${severityColor}`,
          borderRadius: 4,
          padding: '16px 20px',
          marginBottom: 12,
          display: 'flex',
          alignItems: 'center',
          gap: 20
        }}>
          <div>
            <div style={{ fontSize: 36, fontWeight: 800, color: severityColor, lineHeight: 1, fontFamily: 'Arial, sans-serif' }}>
              {data.risk_score_percentage}%
            </div>
            <div style={{ fontSize: 11, fontWeight: 700, color: severityColor, textTransform: 'uppercase' as const, letterSpacing: 1, marginTop: 4, fontFamily: 'Arial, sans-serif' }}>
              Risk Score
            </div>
          </div>
          <div style={{ borderLeft: `1px solid ${severityColor}30`, paddingLeft: 20 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: severityColor, textTransform: 'capitalize' as const, fontFamily: 'Arial, sans-serif' }}>
              Severity: {data.severity_level}
            </div>
            <div style={{ fontSize: 12, color: C.textSecondary, marginTop: 2, fontFamily: 'Arial, sans-serif' }}>
              AI-generated clinical assessment
            </div>
          </div>
        </div>

        <div style={{ background: C.bgWhite, border: `1px solid ${C.border}`, borderRadius: 4, overflow: 'hidden' }}>
          <div style={{
            background: C.teal, padding: '10px 16px',
            fontSize: 12, fontWeight: 700, color: '#ffffff',
            letterSpacing: 0.5, textTransform: 'uppercase' as const, fontFamily: 'Arial, sans-serif'
          }}>
            Treatment Guidance
          </div>
          <div style={{ padding: '14px 16px', display: 'grid', gap: 12 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                <ShieldCheck size={14} color={C.green} />
                <span style={{ fontSize: 11, fontWeight: 700, color: C.green, textTransform: 'uppercase' as const, letterSpacing: 0.5, fontFamily: 'Arial, sans-serif' }}>
                  {t.ui.allowed}
                </span>
              </div>
              <div style={{ fontSize: 13, color: C.textPrimary, background: C.greenLight, padding: '6px 10px', borderRadius: 3 }}>
                {data.treatment_plan.medications.allowed.length > 0
                  ? data.treatment_plan.medications.allowed.join(', ')
                  : 'None'}
              </div>
            </div>

            <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                <AlertTriangle size={14} color={C.red} />
                <span style={{ fontSize: 11, fontWeight: 700, color: C.red, textTransform: 'uppercase' as const, letterSpacing: 0.5, fontFamily: 'Arial, sans-serif' }}>
                  {t.ui.forbidden}
                </span>
              </div>
              <div style={{ fontSize: 13, color: C.textPrimary, background: C.redLight, padding: '6px 10px', borderRadius: 3 }}>
                {data.treatment_plan.medications.forbidden.length > 0
                  ? data.treatment_plan.medications.forbidden.join(', ')
                  : 'None'}
              </div>
            </div>

            <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 12 }}>
              <div style={{ fontSize: 12, marginBottom: 4, fontFamily: 'Arial, sans-serif' }}>
                <strong style={{ color: C.textPrimary }}>{t.ui.homeCare}</strong>
              </div>
              <div style={{ fontSize: 13, color: C.textPrimary, lineHeight: 1.6, fontFamily: 'Arial, sans-serif' }}>
                {data.treatment_plan.home_care}
              </div>
            </div>

            <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 12 }}>
              <div style={{ fontSize: 12, marginBottom: 4, fontFamily: 'Arial, sans-serif' }}>
                <strong style={{ color: C.textPrimary }}>{t.ui.referral}</strong>
              </div>
              <div style={{ fontSize: 13, color: C.textPrimary, lineHeight: 1.6, fontFamily: 'Arial, sans-serif' }}>
                {data.treatment_plan.referral}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const infoIconBg = [C.tealLight, C.amberLight, C.greenLight, C.redLight];
  const infoIconColor = [C.teal, C.amber, C.green, C.red];

  return (
    <div style={{
      minHeight: '100vh',
      background: C.bg,
      color: C.textPrimary,
      fontFamily: 'Georgia, "Times New Roman", serif',
      direction: t.dir as any
    }}>

      {/* Utility Bar */}
      <div style={{
        background: C.teal,
        padding: '7px 0',
        fontSize: 12,
        color: 'rgba(255,255,255,0.85)',
        fontFamily: 'Arial, Helvetica, sans-serif'
      }}>
        <div style={{
          maxWidth: 1100, margin: '0 auto', padding: '0 24px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' as const, gap: 8
        }}>
          <div style={{ display: 'flex', gap: 20, alignItems: 'center', flexWrap: 'wrap' as const }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <Phone size={11} /> {t.utilBar.emergency}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <Clock size={11} /> {t.utilBar.hours}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <MapPin size={11} /> {t.utilBar.location}
            </span>
          </div>
          <button
            onClick={toggleLanguage}
            style={{
              background: 'rgba(255,255,255,0.15)',
              border: '1px solid rgba(255,255,255,0.3)',
              color: '#ffffff',
              padding: '3px 12px',
              borderRadius: 2,
              cursor: 'pointer',
              fontSize: 11,
              fontFamily: 'Arial, sans-serif',
              display: 'flex', alignItems: 'center', gap: 5
            }}
          >
            <Globe size={11} />
            {lang === 'en' ? 'اردو' : 'English'}
          </button>
        </div>
      </div>

      {/* Header */}
      <header style={{
        background: C.bgWhite,
        borderBottom: `3px solid ${C.teal}`,
        boxShadow: '0 2px 8px rgba(0,92,80,0.08)'
      }}>
        <div style={{
          maxWidth: 1100, margin: '0 auto', padding: '18px 24px',
          display: 'flex', alignItems: 'center', gap: 14
        }}>
          <div style={{
            width: 52, height: 52,
            background: C.teal,
            borderRadius: 3,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0
          }}>
            <Activity size={26} color="#ffffff" />
          </div>
          <div>
            <h1 style={{
              margin: 0, fontSize: 22, fontWeight: 700,
              color: C.teal, letterSpacing: '-0.3px',
              fontFamily: 'Georgia, serif'
            }}>
              {t.title}
            </h1>
            <p style={{
              margin: 0, fontSize: 12,
              color: C.textSecondary,
              fontFamily: 'Arial, sans-serif', marginTop: 2
            }}>
              {t.subtitle}
            </p>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <nav style={{ background: C.bgWhite, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px', display: 'flex', gap: 0 }}>
          {(['info', 'form', 'chat'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                background: 'transparent',
                border: 'none',
                borderBottom: activeTab === tab ? `3px solid ${C.teal}` : '3px solid transparent',
                color: activeTab === tab ? C.teal : C.textSecondary,
                padding: '14px 22px',
                fontSize: 13,
                fontFamily: 'Arial, Helvetica, sans-serif',
                fontWeight: activeTab === tab ? 700 : 400,
                cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 7,
                transition: 'all 0.15s',
                whiteSpace: 'nowrap' as const,
                marginBottom: -1
              }}
            >
              {tab === 'info' && <BookOpen size={15} />}
              {tab === 'form' && <ClipboardCheck size={15} />}
              {tab === 'chat' && <MessageSquare size={15} />}
              {t.tabs[tab]}
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main style={{ maxWidth: 1100, margin: '0 auto', padding: '28px 24px', minHeight: 'calc(100vh - 200px)' }}>

        {/* TAB 1 — Info */}
        {activeTab === 'info' && (
          <div>
            <div style={{ marginBottom: 24 }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8,
                paddingBottom: 12, borderBottom: `1px solid ${C.border}`
              }}>
                <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: C.teal, fontFamily: 'Georgia, serif' }}>
                  {t.info.title}
                </h2>
                <span style={{
                  background: C.red, color: '#fff',
                  fontSize: 10, fontWeight: 700, padding: '2px 8px',
                  borderRadius: 2, fontFamily: 'Arial, sans-serif',
                  textTransform: 'uppercase' as const, letterSpacing: 0.5
                }}>
                  Live Alert
                </span>
              </div>
              <p style={{ margin: 0, fontSize: 14, color: C.textSecondary, fontFamily: 'Arial, sans-serif', lineHeight: 1.6 }}>
                {t.info.desc}
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
              {t.info.cards.map((card, i) => (
                <div key={i} style={{
                  background: C.bgWhite,
                  border: `1px solid ${C.border}`,
                  borderTop: `3px solid ${infoIconColor[i]}`,
                  borderRadius: 3,
                  padding: '20px 18px'
                }}>
                  <div style={{
                    width: 36, height: 36,
                    background: infoIconBg[i],
                    borderRadius: 3,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: 12
                  }}>
                    {i === 0 && <Activity size={18} color={infoIconColor[i]} />}
                    {i === 1 && <ClipboardCheck size={18} color={infoIconColor[i]} />}
                    {i === 2 && <ShieldCheck size={18} color={infoIconColor[i]} />}
                    {i === 3 && <AlertTriangle size={18} color={infoIconColor[i]} />}
                  </div>
                  <h3 style={{
                    margin: '0 0 8px', fontSize: 12, fontWeight: 700,
                    color: infoIconColor[i], fontFamily: 'Arial, sans-serif',
                    textTransform: 'uppercase' as const, letterSpacing: 0.5
                  }}>
                    {card.t}
                  </h3>
                  <p style={{ margin: 0, fontSize: 13, color: C.textSecondary, lineHeight: 1.65, fontFamily: 'Arial, sans-serif' }}>
                    {card.d}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2 — Form */}
        {activeTab === 'form' && (
          <div style={{ maxWidth: 680 }}>
            <div style={{ marginBottom: 20, paddingBottom: 14, borderBottom: `1px solid ${C.border}` }}>
              <h2 style={{ margin: '0 0 6px', fontSize: 20, fontWeight: 700, color: C.teal, fontFamily: 'Georgia, serif' }}>
                {t.form.title}
              </h2>
              <p style={{ margin: 0, fontSize: 13, color: C.textSecondary, fontFamily: 'Arial, sans-serif', lineHeight: 1.5 }}>
                {t.form.desc}
              </p>
            </div>

            <form onSubmit={handleFormSubmit}>
              <div style={{
                background: C.bgWhite,
                border: `1px solid ${C.border}`,
                borderRadius: 3,
                overflow: 'hidden',
                marginBottom: 16
              }}>
                <div style={{
                  background: C.tealLight,
                  borderBottom: `1px solid ${C.border}`,
                  padding: '10px 16px',
                  fontSize: 11, fontWeight: 700,
                  color: C.teal,
                  textTransform: 'uppercase' as const,
                  letterSpacing: 0.5,
                  fontFamily: 'Arial, sans-serif'
                }}>
                  Clinical Parameters
                </div>

                {(Object.keys(formSymptoms) as Array<keyof typeof formSymptoms>).map((key, idx, arr) => (
                  <label
                    key={key}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      padding: '13px 16px',
                      cursor: 'pointer',
                      borderBottom: idx < arr.length - 1 ? `1px solid ${C.border}` : 'none',
                      background: formSymptoms[key] ? C.tealLight : 'transparent',
                      transition: 'background 0.1s'
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={formSymptoms[key]}
                      onChange={e => setFormSymptoms(prev => ({ ...prev, [key]: e.target.checked }))}
                      style={{ width: 15, height: 15, accentColor: C.teal, cursor: 'pointer' }}
                    />
                    <span style={{
                      fontSize: 13,
                      color: formSymptoms[key] ? C.teal : C.textPrimary,
                      fontFamily: 'Arial, sans-serif',
                      fontWeight: formSymptoms[key] ? 600 : 400,
                      flex: 1
                    }}>
                      {key === 'fever' && t.form.fever}
                      {key === 'headache' && t.form.headache}
                      {key === 'jointPain' && t.form.jointPain}
                      {key === 'bleeding' && t.form.bleeding}
                      {key === 'breathing' && t.form.breathing}
                      {key === 'waterZone' && t.form.waterZone}
                    </span>
                    {formSymptoms[key] && <ChevronRight size={14} color={C.teal} />}
                  </label>
                ))}
              </div>

              <button
                type="submit"
                disabled={formLoading}
                style={{
                  background: formLoading ? C.textMuted : C.teal,
                  color: '#ffffff',
                  border: 'none',
                  padding: '12px 28px',
                  borderRadius: 2,
                  fontSize: 13,
                  fontWeight: 700,
                  fontFamily: 'Arial, sans-serif',
                  cursor: formLoading ? 'default' : 'pointer',
                  letterSpacing: 0.3,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  transition: 'background 0.2s'
                }}
              >
                {formLoading
                  ? <><RefreshCw size={14} style={{ animation: 'spin 1s linear infinite' }} /> {t.ui.loading}</>
                  : <><ClipboardCheck size={14} /> {t.form.btn}</>
                }
              </button>
            </form>

            {formResult && <ResultCard data={formResult} />}
          </div>
        )}

        {/* TAB 3 — Chat */}
        {activeTab === 'chat' && (
          <div style={{ maxWidth: 680, display: 'flex', flexDirection: 'column', minHeight: 500 }}>
            <div style={{ marginBottom: 16, paddingBottom: 14, borderBottom: `1px solid ${C.border}` }}>
              <h2 style={{ margin: '0 0 4px', fontSize: 20, fontWeight: 700, color: C.teal, fontFamily: 'Georgia, serif' }}>
                {t.tabs.chat}
              </h2>
              <p style={{ margin: 0, fontSize: 13, color: C.textSecondary, fontFamily: 'Arial, sans-serif' }}>
                AI-powered symptom analysis. Describe your symptoms in natural language.
              </p>
            </div>

            <div style={{
              flex: 1, minHeight: 360, maxHeight: 420,
              overflowY: 'auto',
              background: C.bgWhite,
              border: `1px solid ${C.border}`,
              borderRadius: 3,
              padding: 16,
              marginBottom: 12,
              display: 'flex',
              flexDirection: 'column',
              gap: 12
            }}>
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row',
                    gap: 10,
                    maxWidth: '88%',
                    alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start'
                  }}
                >
                  <div style={{
                    width: 32, height: 32,
                    borderRadius: 2,
                    background: msg.sender === 'user' ? C.teal : C.tealLight,
                    border: `1px solid ${msg.sender === 'user' ? C.tealMid : C.borderStrong}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    {msg.sender === 'user'
                      ? <User size={14} color="#ffffff" />
                      : <Bot size={14} color={C.teal} />}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      padding: '10px 14px',
                      borderRadius: 3,
                      fontSize: 13,
                      lineHeight: 1.6,
                      fontFamily: 'Arial, sans-serif',
                      background: msg.sender === 'user' ? C.teal : C.tealLight,
                      color: msg.sender === 'user' ? '#ffffff' : C.textPrimary,
                      border: `1px solid ${msg.sender === 'user' ? C.tealMid : C.borderStrong}`
                    }}>
                      {msg.text}
                    </div>
                    {msg.isResult && msg.data && <ResultCard data={msg.data} />}
                  </div>
                </div>
              ))}

              {chatLoading && (
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: 2,
                    background: C.tealLight, border: `1px solid ${C.borderStrong}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    <RefreshCw size={13} color={C.teal} style={{ animation: 'spin 1s linear infinite' }} />
                  </div>
                  <div style={{
                    padding: '8px 14px',
                    background: C.tealLight,
                    border: `1px solid ${C.borderStrong}`,
                    borderRadius: 3,
                    fontSize: 12,
                    color: C.textSecondary,
                    fontFamily: 'Arial, sans-serif'
                  }}>
                    {t.ui.loading}
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <form
              onSubmit={handleSendMessage}
              style={{
                display: 'flex', gap: 8,
                background: C.bgWhite,
                border: `1px solid ${C.borderStrong}`,
                borderRadius: 3,
                padding: '6px 6px 6px 12px',
                alignItems: 'center'
              }}
            >
              <input
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                disabled={chatLoading || chatStep === 'complete'}
                placeholder={t.chat.placeholder}
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  fontSize: 13,
                  color: C.textPrimary,
                  fontFamily: 'Arial, sans-serif',
                  opacity: (chatLoading || chatStep === 'complete') ? 0.5 : 1
                }}
              />
              <button
                type="submit"
                disabled={!chatInput.trim() || chatLoading || chatStep === 'complete'}
                style={{
                  background: (!chatInput.trim() || chatLoading || chatStep === 'complete') ? C.textMuted : C.teal,
                  border: 'none',
                  color: '#ffffff',
                  width: 36, height: 36,
                  borderRadius: 2,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer',
                  flexShrink: 0,
                  transition: 'background 0.15s'
                }}
              >
                <Send size={15} />
              </button>
            </form>
          </div>
        )}

        {/* Disclaimer */}
        <div style={{
          marginTop: 32, padding: '12px 16px',
          background: '#FFF8E1',
          border: `1px solid #FFD54F`,
          borderLeft: `4px solid ${C.amber}`,
          borderRadius: 3,
          display: 'flex', gap: 10, alignItems: 'flex-start'
        }}>
          <AlertTriangle size={15} color={C.amber} style={{ flexShrink: 0, marginTop: 1 }} />
          <p style={{
            margin: 0, fontSize: 11.5,
            color: C.textSecondary,
            fontFamily: 'Arial, sans-serif',
            lineHeight: 1.6
          }}>
            <strong style={{ color: C.textPrimary }}>Disclaimer:</strong> {t.ui.disclaimer}
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer style={{
        background: C.teal,
        color: 'rgba(255,255,255,0.7)',
        padding: '16px 24px',
        marginTop: 24,
        fontFamily: 'Arial, sans-serif',
        fontSize: 11,
        textAlign: 'center' as const
      }}>
        <p style={{ margin: 0 }}>
          © 2025 DengueAlert PK — Salim Habib University AI Core Deployment &nbsp;|&nbsp;
          <span style={{ color: 'rgba(255,255,255,0.9)' }}>For medical emergencies dial 021-111-911-911</span>
        </p>
      </footer>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

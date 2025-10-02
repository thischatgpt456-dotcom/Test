import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Star,
  Brain,
  LineChart,
  Clock,
  GraduationCap,
  CheckCircle2,
  ShieldCheck,
  BookOpen,
  Users2,
  Mail,
  Phone,
  Globe,
  Sparkles,
  HeartHandshake,
  Award,
  Rocket,
  Menu,
  X,
  Quote,
} from "lucide-react";
import { DollarSign, Plus, Minus, AlertTriangle } from "lucide-react";

// ========= Config =========
const FORM_ENDPOINT = "https://formspree.io/f/your-id"; // replace with your form endpoint

// ========= UI primitives =========
const Section = ({ id, children, className = "" }) => (
  <section id={id} className={`scroll-mt-24 py-20 ${className}`}>
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  </section>
);

const Container = ({ children, className = "" }) => (
  <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
);

const Pill = ({ children }) => (
  <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold tracking-wide text-white backdrop-blur">
    {children}
  </span>
);

const Stat = ({ value, label }) => (
  <div className="rounded-2xl bg-white/80 p-6 text-center shadow-sm ring-1 ring-black/5">
    <div className="text-3xl font-extrabold text-slate-900">{value}</div>
    <div className="mt-1 text-sm text-slate-600">{label}</div>
  </div>
);

const FeatureCard = ({ icon: Icon, title, children }) => (
  <motion.div
    className="group rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 transition hover:shadow-md"
    initial={{ opacity: 0, y: 14 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.45, ease: "easeOut" }}
  >
    <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--gold)]/15 text-[var(--navy)]">
      <Icon className="h-6 w-6" />
    </div>
    <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
    <p className="mt-2 text-slate-600">{children}</p>
  </motion.div>
);

const HowStep = ({ step, title, children }) => (
  <motion.div
    className="relative rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5"
    initial={{ opacity: 0, y: 14 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.45, ease: "easeOut" }}
  >
    <div className="absolute -top-4 left-6 rounded-full bg-[var(--gold)] px-3 py-1 text-xs font-bold text-[var(--navy)]">STEP {step}</div>
    <h4 className="mt-2 text-base font-semibold text-slate-900">{title}</h4>
    <p className="mt-2 text-slate-600">{children}</p>
  </motion.div>
);

const TestimonialCard = ({ quote, name, role }) => (
  <motion.div
    className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5"
    initial={{ opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.4, ease: "easeOut" }}
  >
    <p className="text-slate-700">“{quote}”</p>
    <div className="mt-4 flex items-center gap-3">
      <div className="h-10 w-10 shrink-0 rounded-full bg-[var(--navy)]/10" />
      <div>
        <div className="font-semibold text-slate-900">{name}</div>
        <div className="text-sm text-slate-600">{role}</div>
      </div>
    </div>
  </motion.div>
);

const FAQItem = ({ q, a }) => (
  <details className="group rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
    <summary className="cursor-pointer list-none">
      <div className="flex items-start justify-between gap-6">
        <h4 className="text-base font-semibold text-slate-900">{q}</h4>
        <span className="mt-1 rounded-full border px-2 py-0.5 text-xs text-slate-500 group-open:hidden">+</span>
        <span className="mt-1 hidden rounded-full border px-2 py-0.5 text-xs text-slate-500 group-open:inline">–</span>
      </div>
    </summary>
    <p className="mt-3 text-slate-600">{a}</p>
  </details>
);

// ========= Pricing helpers =========
function formatUSD(n) {
  return n.toLocaleString(undefined, { style: "currency", currency: "USD" });
}
function getSmoothRate(hours) {
  if (hours <= 9) return 195;
  if (hours <= 19) return 195 - ((hours - 10) * (195 - 185)) / (19 - 10); // 195 → 185
  if (hours <= 40) return 180 - ((hours - 20) * (180 - 160)) / (40 - 20); // 180 → 160
  if (hours <= 80) return 160 - ((hours - 40) * (160 - 150)) / (80 - 40); // 160 → 150
  if (hours <= 120) return 150 - ((hours - 80) * (150 - 145)) / (120 - 80); // 150 → 145
  return 145;
}
function getDiscount(hours) {
  if (hours < 20) return 0;
  if (hours <= 40) return 600 - 10 * (hours - 20); // 600 → 400
  return 400; // 40h+
}
function LineItem({ label, value, bold = false, accent }) {
  const color = accent === "emerald" ? "text-emerald-600" : value < 0 ? "text-emerald-600" : "";
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-neutral-700">{label}</span>
      <span className={`${bold ? "font-semibold" : ""} ${color}`}>
        {value < 0 ? "-" + formatUSD(Math.abs(value)) : formatUSD(value)}
      </span>
    </div>
  );
}
function RadioRow({ label, caption, right, selected, onSelect }) {
  return (
    <button
      onClick={onSelect}
      className={`flex w-full items-center justify-between rounded-xl border p-3 text-left transition ${
        selected ? "border-fuchsia-300 bg-fuchsia-50 ring-1 ring-fuchsia-200" : "border-neutral-200 hover:bg-neutral-50"
      }`}
    >
      <div>
        <div className="text-sm font-medium">{label}</div>
        {caption && <div className="text-xs text-neutral-500">{caption}</div>}
      </div>
      <div className="text-sm font-semibold">{right}</div>
    </button>
  );
}

// ========= Page =========
export default function FutureMDAcademySite() {
  const [open, setOpen] = useState(false);
  const [hours, setHours] = useState(15);
  const [installments, setInstallments] = useState(null);

  const rate = getSmoothRate(hours);
  const subtotal = hours * rate;
  const discount = getDiscount(hours);
  const total = Math.max(0, subtotal - discount);

  useEffect(() => {
    try {
      const approxEq = (a, b, tol = 1e-9) => Math.abs(a - b) < tol;
      console.assert(getSmoothRate(0) === 195, "rate(0)=195");
      console.assert(getSmoothRate(9) === 195, "rate(9)=195");
      console.assert(approxEq(getSmoothRate(10), 195), "rate(10)=195");
      console.assert(approxEq(getSmoothRate(19), 185), "rate(19)=~185");
      console.assert(approxEq(getSmoothRate(20), 180), "rate(20)=~180");
      console.assert(approxEq(getSmoothRate(40), 160), "rate(40)=~160");
      console.assert(approxEq(getSmoothRate(80), 150), "rate(80)=~150");
      console.assert(approxEq(getSmoothRate(120), 145), "rate(120)=~145");
      console.assert(getDiscount(0) === 0, "disc(0)=0");
      console.assert(getDiscount(19) === 0, "disc(19)=0");
      console.assert(getDiscount(20) === 600, "disc(20)=600");
      console.assert(getDiscount(40) === 400, "disc(40)=400");
      console.assert(getDiscount(80) === 400, "disc(80)=400");
      console.assert(Math.max(0, 0 - getDiscount(100)) === 0, "total clamped >= 0");
      console.assert(getSmoothRate(21) <= getSmoothRate(20), "rate non-increasing around 20");
    } catch (e) {
      console.warn("Test failure:", e);
    }
  }, []);

  return (
    <div className="min-h-screen scroll-smooth bg-[var(--light)] [--navy:#0b2a3c] [--gold:#e0b84d]">
      {/* SEO */}
      <Helmet>
        <title>Future MD Academy — MCAT Tutoring</title>
        <meta name="description" content="Top 5% tutors. Top 1% section specialists. Personalized MCAT tutoring with a +10 point improvement guarantee." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Future MD Academy — MCAT Tutoring" />
        <meta property="og:description" content="Crush the MCAT with personalized coaching designed around you." />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* Top bar */}
      <div className="sticky top-0 z-40 w-full border-b border-white/10 bg-[var(--navy)]/90 backdrop-blur">
        <Container className="flex items-center justify-between py-4">
          <a href="#home" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[var(--navy)]">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div className="text-white">
              <div className="text-sm uppercase tracking-wider text-white/70">Future MD Academy</div>
              <div className="-mt-1 text-lg font-extrabold">MCAT Tutoring</div>
            </div>
          </a>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-6 text-sm text-white/90 md:flex">
            <a href="#services" className="hover:text-white">Services</a>
            <a href="#how" className="hover:text-white">How it Works</a>
            <a href="#guarantee" className="hover:text-white">Guarantee</a>
            <a href="#pricing" className="hover:text-white">Pricing</a>
            <a href="#faq" className="hover:text-white">FAQ</a>
            <a href="#contact" className="rounded-xl bg-[var(--gold)] px-4 py-2 font-semibold text-[var(--navy)] hover:opacity-90">Free Consultation</a>
          </nav>

          {/* Mobile menu */}
          <button
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 text-white"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </Container>
        {open && (
          <div className="md:hidden border-t border-white/10 bg-[var(--navy)]/95">
            <Container className="py-3">
              <div className="flex flex-col gap-2 text-white/90">
                <a href="#services" onClick={() => setOpen(false)} className="py-2">Services</a>
                <a href="#how" onClick={() => setOpen(false)} className="py-2">How it Works</a>
                <a href="#guarantee" onClick={() => setOpen(false)} className="py-2">Guarantee</a>
                <a href="#pricing" onClick={() => setOpen(false)} className="py-2">Pricing</a>
                <a href="#faq" onClick={() => setOpen(false)} className="py-2">FAQ</a>
                <a href="#contact" onClick={() => setOpen(false)} className="mt-2 inline-flex items-center justify-center rounded-xl bg-[var(--gold)] px-4 py-2 font-semibold text-[var(--navy)]">Free Consultation</a>
              </div>
            </Container>
          </div>
        )}
      </div>

      {/* Hero */}
      <Section id="home" className="relative overflow-hidden bg-[var(--navy)]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80rem_40rem_at_50%_-10%,rgba(255,255,255,0.18),transparent)]" />
        <Container>
          <div className="grid items-center gap-12 py-6 md:grid-cols-2">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Pill>
                <Sparkles className="h-4 w-4" />
                Top 5% Tutors • Top 1% Section Specialists • +10 Points Guaranteed
              </Pill>
              <h1 className="mt-6 text-4xl font-extrabold leading-tight text-white sm:text-5xl">
                Crush the MCAT with personalized coaching designed around <span className="text-[var(--gold)]">you</span>
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-white/80">
                One-on-one tutoring with specialists for C/P, CARS, B/B, and P/S, custom study plans, and test-taking systems built by 100th percentile scorers.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a href="#contact" className="inline-flex items-center gap-2 rounded-2xl bg-[var(--gold)] px-5 py-3 font-semibold text-[var(--navy)] shadow-sm hover:opacity-90">Get Your FREE Consultation <ArrowRight className="h-5 w-5" /></a>
                <a href="#services" className="inline-flex items-center gap-2 rounded-2xl border border-white/20 px-5 py-3 font-semibold text-white hover:bg-white/10">Explore Our Programs</a>
              </div>
              <div className="mt-8 grid max-w-xl grid-cols-3 gap-4">
                <Stat value={<span className="text-[var(--gold)]">518+</span>} label="Tutor composite scores" />
                <Stat value={<span className="text-[var(--gold)]">131/132</span>} label="Section subscores" />
                <Stat value={<span className="text-[var(--gold)]">+10</span>} label="Point Guarantee" />
              </div>
            </motion.div>

            {/* Student Score Trend card (kept here in hero) */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
              <div className="relative rounded-3xl bg-white/10 p-2 shadow-2xl ring-1 ring-white/20">
                <div className="rounded-2xl bg-white p-6 text-[var(--navy)]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-xl bg-[var(--navy)]/10 text-[var(--gold)] flex items-center justify-center">
                        <svg viewBox="0 0 40 40" className="h-7 w-7">
                          <polyline points="4,28 14,22 22,24 30,16 36,14" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <div className="text-lg font-semibold text-slate-900">Student Score Trend</div>
                    </div>
                    <div className="flex items-center gap-1 text-[var(--gold)]">{[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}</div>
                  </div>
                  <div className="mt-6 grid items-stretch gap-6 md:grid-cols-[1fr_auto_1fr]">
                    <div className="rounded-2xl bg-slate-50 p-6 text-center ring-1 ring-slate-200">
                      <div className="text-5xl font-extrabold text-[var(--gold)]">516.3</div>
                      <div className="mt-3 text-lg font-medium text-slate-900"><span className="inline-block rounded-sm bg-[var(--gold)]/80 px-1 text-[var(--navy)]">Average</span><span className="ml-2">Student Score</span></div>
                    </div>
                    <div className="hidden h-auto w-px bg-slate-200 md:block" />
                    <div className="rounded-2xl bg-slate-50 p-6 text-center ring-1 ring-slate-200">
                      <div className="text-5xl font-extrabold text-[var(--gold)]">14.1</div>
                      <div className="mt-3 text-lg font-medium text-slate-900"><span className="inline-block rounded-sm bg-[var(--gold)]/80 px-1 text-[var(--navy)]">Average</span><span className="ml-2">Score Increase</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* Trust strip */}
      <div className="border-y bg-white">
        <Container>
          <div className="flex flex-wrap items-center justify-center gap-6 py-6 text-slate-500">
            <div className="flex items-center gap-2"><ShieldCheck className="h-5 w-5"/> Guaranteed Score Growth</div>
            <div className="flex items-center gap-2"><Award className="h-5 w-5"/> Top 5% Tutors</div>
            <div className="flex items-center gap-2"><Rocket className="h-5 w-5"/> Fast Score Momentum</div>
            <div className="flex items-center gap-2"><HeartHandshake className="h-5 w-5"/> Compatibility Match</div>
          </div>
        </Container>
      </div>

      {/* Services */}
      <Section id="services">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-extrabold text-slate-900">Not all MCAT prep is created equal. Here's why serious students choose us.</h2>
            <p className="mt-3 text-slate-600">Expert-led MCAT prep with proven results and personalized coaching designed around your unique needs</p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard icon={Brain} title="Top 1% Section Specialists">Tutors with ≥518 overall and 131/132 in their specialized section. Get expert guidance in C/P, CARS, B/B, and P/S from those who've mastered each domain.</FeatureCard>
            <FeatureCard icon={LineChart} title="Compatibility-Based Matching">We match you with a tutor based on compatibility and comprehensive strength/weakness analysis to ensure the best learning experience.</FeatureCard>
            <FeatureCard icon={Clock} title="Study Schedules by 100th Percentile Scorers">Custom study plans and strategies created by 100th percentile scorers, designed around your timeline and goals.</FeatureCard>
            <FeatureCard icon={Clock} title="Flexible Scheduling">Evenings, weekends, and accelerated plans available. Regular check-ins in between sessions to maintain consistency.</FeatureCard>
            <FeatureCard icon={Users2} title="10% Hours Refunded After 20 Hours">If you don't see a +10 point increase after 20 hours of tutoring, we'll refund 10% of your hours. We stand behind our results.</FeatureCard>
            <FeatureCard icon={BookOpen} title="Personalized Content Review">Focused content review tailored to your specific knowledge gaps and learning style, not generic one-size-fits-all approaches.</FeatureCard>
          </div>
        </Container>
      </Section>

      {/* How it works */}
      <Section id="how" className="bg-white">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-extrabold text-slate-900">How it works</h2>
            <p className="mt-3 text-slate-600">Simple, transparent, effective.</p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <HowStep step={1} title="Free Consultation">Share your target schools, test date, and constraints. We identify your quickest win conditions.</HowStep>
            <HowStep step={2} title="Match with a Specialist">We pair you with a tutor whose strengths and teaching style complement your needs.</HowStep>
            <HowStep step={3} title="Custom Plan + Coaching">Follow a week-by-week schedule. Meet regularly to refine timing, reasoning, and endurance.</HowStep>
          </div>
        </Container>
      </Section>

      {/* Guarantee */}
      <Section id="guarantee" className="bg-[var(--navy)] text-white">
        <Container>
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <h2 className="text-3xl font-extrabold">+10 Points Guaranteed</h2>
              <p className="mt-4 text-white/80">Complete 20 hours of tutoring and follow your custom plan. If you don't gain at least 10 points from your verified baseline, we'll refund 10% of your hours.</p>
              <ul className="mt-6 space-y-2 text-white/90">
                <li className="flex items-start gap-2"><CheckCircle2 className="mt-1 h-5 w-5 text-[var(--gold)]"/> Eligibility reviewed during your consult</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="mt-1 h-5 w-5 text-[var(--gold)]"/> Applies to official AAMC full-length scaled scores</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="mt-1 h-5 w-5 text-[var(--gold)]"/> Transparent terms, no fine print surprises</li>
              </ul>
            </div>
            {/* Tutor testimonial replacing duplicate card */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="rounded-3xl bg-white/10 p-2 ring-1 ring-white/20">
                <div className="rounded-2xl bg-white p-8 text-[var(--navy)]">
                  <Quote className="mb-4 h-8 w-8 text-[var(--gold)] opacity-70" />
                  <p className="text-lg leading-8">Working with students at Future MD Academy, I’ve seen how much of a difference a structured, personalized plan makes. When students know they’re not studying alone and have someone guiding the process, their confidence—and scores—move fast.</p>
                  <div className="mt-6 font-semibold">Teri Johnson</div>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* Pricing */}
      <Section id="pricing" className="bg-white">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-extrabold text-slate-900">Build your plan</h2>
            <p className="mt-3 text-slate-600">Slide to choose hours. Pricing adjusts automatically. Pay in full or split into installments.</p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
            <motion.div layout className="lg:col-span-2 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
              <div className="mt-2 rounded-xl border border-neutral-200 p-4">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2"><DollarSign className="h-4 w-4 text-neutral-400" /><p className="text-sm font-medium">Select Your Tutoring Hours</p></div>
                  <div className="flex items-center gap-3">
                    <button onClick={() => setHours((h) => Math.max(0, h - 1))} className="rounded-full border border-neutral-200 p-1 hover:bg-neutral-50" aria-label="decrease hours"><Minus className="h-4 w-4" /></button>
                    <div className="min-w-10 text-center text-lg font-semibold">{hours}</div>
                    <button onClick={() => setHours((h) => Math.min(120, h + 1))} className="rounded-full border border-neutral-200 p-1 hover:bg-neutral-50" aria-label="increase hours"><Plus className="h-4 w-4" /></button>
                  </div>
                </div>
                <input type="range" min={0} max={120} step={1} value={hours} onChange={(e) => setHours(parseInt(e.target.value))} className="w-full accent-[var(--gold)]" />
                <div className="mt-4 grid grid-cols-3 items-end gap-4">
                  <div><div className="text-xs text-neutral-500">Hours</div><div className="text-lg font-semibold">{hours}</div></div>
                  <div><div className="text-xs text-neutral-500">Rate/hr</div><div className="text-lg font-semibold">{formatUSD(rate)}</div></div>
                  <div><div className="text-xs text-neutral-500">Total</div><div className="text-lg font-semibold">{formatUSD(total)}</div></div>
                </div>
                <div className="mt-3 text-xs text-neutral-600"><div className="mt-2 inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700 ring-1 ring-amber-200"><AlertTriangle className="h-3.5 w-3.5" /> Limited-time: secure these rates while seats last.</div></div>
              </div>
            </motion.div>
            <motion.div layout className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
              <h3 className="text-lg font-semibold">Your Program</h3>
              <div className="mt-4 space-y-3">
                <LineItem label={`Tutoring – ${hours} hr${hours === 1 ? "" : "s"} @ ${formatUSD(rate)}/hr`} value={subtotal} />
                {discount > 0 && <LineItem label="Bundle Discount" value={-discount} accent="emerald" />}
                <div className="my-2 border-t" />
                <LineItem label="Total" value={total} bold />
              </div>
              <div className="mt-6">
                <h4 className="mb-2 text-sm font-semibold text-neutral-700">Payment Options</h4>
                <div className="space-y-2">
                  <RadioRow label="One-time payment" caption="Pay in full today" selected={installments === null} onSelect={() => setInstallments(null)} right={formatUSD(total)} />
                  {[2,3,4,5,6].map((n) => (
                    <RadioRow key={n} label={`${n} installments`} caption={`${n} monthly payments`} selected={installments === n} onSelect={() => setInstallments(n)} right={`${formatUSD(total / n)}/mo`} />
                  ))}
                </div>
              </div>
              <a href="#contact" className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-[var(--navy)] px-4 py-3 font-semibold text-white shadow-sm hover:opacity-90">Start now — lock in {hours} hours</a>
              <p className="mt-3 text-center text-xs text-neutral-500">No interest. No hidden fees. You can edit your plan anytime.</p>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* Testimonials */}
      <Section id="testimonials" className="bg-[var(--light)]">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-extrabold text-slate-900">Student wins</h2>
            <p className="mt-3 text-slate-600">Real outcomes from tailored coaching.</p>
          </div>

          {/* Carousel */}
          {(() => {
            const testimonials = [
              { quote: "Went from a 503 diagnostic to a 515 in 8 weeks. Timing strategies changed everything for CARS.", name: "Riya P.", role: "Accepted to UA COM" },
              { quote: "My B/B plateau broke after two sessions with a 132 scorer who showed me how to read passages like a scientist.", name: "Jason M.", role: "520 official" },
              { quote: "I finally had a plan I could follow with school. The weekly check-ins kept me consistent.", name: "Amrita K.", role: "+12 point increase" },
              { quote: "+14 points in 6 weeks. Custom passages and error logs made the difference.", name: "Lauren S.", role: "NYU applicant" },
              { quote: "C/P clicked once we switched to a data-first approach. I hit 131 on my next FL.", name: "Marcus D.", role: "131 C/P" },
              { quote: "I always felt stuck at 508. Pacing + reasoning drills took me to a 519 official.", name: "Sofia H.", role: "519 official" },
              { quote: "Tutor matched me by personality and schedule. Studying finally felt sustainable and my stress dropped.", name: "Neha L.", role: "+11 point jump" },
              { quote: "The passage-mapping method for B/B was a game changer. I stopped rereading and started answering with confidence.", name: "Caleb W.", role: "131 B/B" },
              { quote: "Their weekly accountability texts kept me honest. Hit my 515 goal a month early.", name: "Janelle T.", role: "515 official" },
            ];
            const [idx, setIdx] = React.useState(0);
            const perSlide = 1; // 1 card per slide → 9 slides for 9 testimonials
            const totalSlides = Math.ceil(testimonials.length / perSlide);
            const slideTo = (n) => setIdx((prev) => (n + totalSlides) % totalSlides);

            return (
              <div className="mt-10">
                <div className="relative overflow-hidden">
                  <motion.div
                    className="flex"
                    animate={{ x: `-${(idx * 100) / totalSlides}%` }}
                    transition={{ type: "tween", ease: "easeInOut", duration: 0.45 }}
                    style={{ width: `${100 * totalSlides}%` }}
                  >
                    {Array.from({ length: totalSlides }).map((_, slide) => (
                      <div key={slide} className="grid shrink-0 grid-cols-1 gap-6 px-2" style={{ width: `${100 / totalSlides}%` }}>
                        {testimonials.slice(slide * perSlide, slide * perSlide + perSlide).map((t, i) => (
                          <TestimonialCard key={`${slide}-${i}`} quote={t.quote} name={t.name} role={t.role} />
                        ))}
                      </div>
                    ))}
                  </motion.div>

                  {/* Controls */}
                  <div className="mt-6 flex items-center justify-between">
                    <div className="flex gap-2">
                      <button
                        onClick={() => slideTo(idx - 1)}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 shadow-sm hover:bg-slate-50"
                        aria-label="Previous"
                      >
                        ‹
                      </button>
                      <button
                        onClick={() => slideTo(idx + 1)}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 shadow-sm hover:bg-slate-50"
                        aria-label="Next"
                      >
                        ›
                      </button>
                    </div>

                    {/* Progress dots */}
                    <div className="flex items-center gap-2">
                      {Array.from({ length: totalSlides }).map((_, i) => (
                        <button
                          key={i}
                          onClick={() => slideTo(i)}
                          className={`h-2.5 w-6 rounded-full transition ${i === idx ? 'bg-[var(--navy)]' : 'bg-slate-300'}`}
                          aria-label={`Go to slide ${i + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
        </Container>
      </Section>

      {/* FAQ */}
      <Section id="faq" className="bg-white">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-extrabold text-slate-900">FAQ</h2>
            <p className="mt-3 text-slate-600">Quick answers to common questions.</p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <FAQItem q="Who are the tutors?" a="All coaches are top 5% scorers (≥518) with demonstrated section expertise (131/132). We match you based on strengths and teaching style." />
            <FAQItem q="Do you offer online sessions?" a="Yes. We tutor via Zoom/Google Meet with shared whiteboarding and recorded notes when requested." />
            <FAQItem q="What materials do you use?" a="AAMC resources first, paired with high-yield third-party practice tailored to your needs." />
            <FAQItem q="How does the guarantee work?" a="With 20 hours completed and adherence to your plan, we guarantee a +10 point increase from your verified baseline or refund 10% of your hours." />
          </div>
        </Container>
      </Section>

      {/* Contact */}
      <Section id="contact" className="bg-[var(--light)]">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-extrabold text-slate-900">Book your free consultation</h2>
            <p className="mt-3 text-slate-600">Tell us your target date and goals. We’ll reply within 24 hours with next steps and available times.</p>
          </div>
          <div className="mx-auto mt-10 grid max-w-4xl gap-6 md:grid-cols-2">
            <form method="POST" action={FORM_ENDPOINT} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
              <div className="grid gap-4">
                <input required name="name" placeholder="Full name" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 focus:border-[var(--navy)]" />
                <input required type="email" name="email" placeholder="Email" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 focus:border-[var(--navy)]" />
                <input name="phone" placeholder="Phone (optional)" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 focus:border-[var(--navy)]" />
                <input name="test_date" placeholder="Target MCAT date (e.g., June 28, 2026)" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 focus:border-[var(--navy)]" />
                <textarea required name="message" rows={5} placeholder="Tell us about your goals and biggest hurdles" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 focus:border-[var(--navy)]" />
                <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[var(--navy)] px-5 py-3 font-semibold text-white hover:opacity-90">Request Consultation <ArrowRight className="h-5 w-5" /></button>
              </div>
              <p className="mt-3 text-xs text-slate-500">By submitting, you agree to be contacted about scheduling and services. No spam ever.</p>
            </form>
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
              <div className="space-y-4 text-slate-700">
                <div className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-5 w-5 text-[var(--navy)]" />
                  <div>
                    <div className="text-sm font-semibold text-slate-900">Email</div>
                    <a href="mailto:hello@futuremdacademy.org" className="text-[var(--navy)] hover:underline">hello@futuremdacademy.org</a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-5 w-5 text-[var(--navy)]" />
                  <div>
                    <div className="text-sm font-semibold text-slate-900">Phone</div>
                    <a href="tel:123456789" className="text-[var(--navy)] hover:underline">(123) 456-789</a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Globe className="mt-0.5 h-5 w-5 text-[var(--navy)]" />
                  <div>
                    <div className="text-sm font-semibold text-slate-900">Website</div>
                    <a href="https://FutureMDAcademy.org" className="text-[var(--navy)] hover:underline">FutureMDAcademy.org</a>
                  </div>
                </div>
                <div className="rounded-xl bg-[var(--navy)]/5 p-4 text-sm">Prefer email? Send your availability and target score to <span className="font-semibold">hello@futuremdacademy.org</span> and we’ll set it up.</div>
              </div>
              <div className="mt-6 rounded-xl border border-dashed border-slate-200 p-4 text-sm text-slate-500">Optional: embed your flyer or QR here.</div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Footer */}
      <footer className="border-t bg-white">
        <Container className="grid gap-8 py-10 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--navy)] text-white"><GraduationCap className="h-6 w-6" /></div>
              <div className="text-slate-900"><div className="text-lg font-extrabold">Future MD Academy</div><div className="text-xs text-slate-500">MCAT Tutoring</div></div>
            </div>
            <p className="mt-4 text-sm text-slate-600">Top 5% tutors. Top 1% section specialists. Guaranteed score growth.</p>
          </div>
          <div>
            <div className="text-sm font-semibold text-slate-900">Company</div>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li><a href="#services" className="hover:text-slate-900">Services</a></li>
              <li><a href="#pricing" className="hover:text-slate-900">Pricing</a></li>
              <li><a href="#faq" className="hover:text-slate-900">FAQ</a></li>
            </ul>
          </div>
          <div>
            <div className="text-sm font-semibold text-slate-900">Legal</div>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li><a href="#" className="hover:text-slate-900">Terms</a></li>
              <li><a href="#" className="hover:text-slate-900">Privacy</a></li>
            </ul>
          </div>
          <div>
            <div className="text-sm font-semibold text-slate-900">Contact</div>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li className="flex items-center gap-2"><Mail className="h-4 w-4"/> hello@futuremdacademy.org</li>
              <li className="flex items-center gap-2"><Phone className="h-4 w-4"/> 123-456-789</li>
              <li className="flex items-center gap-2"><Globe className="h-4 w-4"/> FutureMDAcademy.org</li>
            </ul>
          </div>
        </Container>
        <div className="border-t py-6 text-center text-xs text-slate-500">© {new Date().getFullYear()} Future MD Academy. All rights reserved.</div>
      </footer>
    </div>
  );
}

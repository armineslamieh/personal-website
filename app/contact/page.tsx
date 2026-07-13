"use client";

import FadeIn from "@/app/components/FadeIn";
import { FaLinkedin, FaWhatsapp, FaTelegramPlane } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import {HiOutlineChevronDoubleDown} from "react-icons/hi2";


const EMAIL = "eslamieh.armin@gmail.com";
const LINKEDIN = "https://www.linkedin.com/in/armin-eslamieh/";
const WHATSAPP = "https://wa.me/31614367654";
const TELEGRAM = "https://t.me/LetsAskBot?start=Ib2GjE";
const EMAIL_SUBJECT = "Hey Armin,";

export default function ContactPage() {


    return (
        <main className="relative min-h-screen">
            <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom_left,_#ff4500_0%,_#c2410c_25%,_#3a2419_55%,_#1f1f23_85%)]" />

            <FadeIn>
                <div className="max-w-6xl mx-auto px-6 pt-32 pb-20">

                    <div className="flex flex-col items-start gap-1 mb-16">
                        <span className="text-white/40 uppercase tracking-[0.4em] text-[9px] md:text-[10px] font-light">Section</span>
                        <span className="text-white/80 uppercase tracking-[0.3em] text-xs md:text-sm font-semibold">Contact</span>
                    </div>

                    <div className="max-w-2xl mb-20">
                        <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight mb-6">Let&apos;s talk.</h1>
                        <p className="text-white/70 text-base md:text-lg leading-relaxed max-w-xl">There&apos;s no one right way to reach me. Some people come with a job offer, some with a question, some with a story they need to tell someone. All of it is welcome.</p>
                        <p className="text-white/60 text-sm md:text-base leading-relaxed max-w-xl mt-4">Pick whatever feels right.</p>
                        <div className="flex items-center gap-3 mt-3 text-white/50">
                            <span className="text-xs uppercase tracking-[0.3em]">Keep scrolling — there&apos;s one more</span>
                            <HiOutlineChevronDoubleDown className="w-4 h-4 animate-bounce" />
                        </div>
                    </div>


                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-24">

                        <a href={`mailto:${EMAIL}?subject=${encodeURIComponent(EMAIL_SUBJECT)}`} className="group relative flex flex-col items-start gap-3 p-6 rounded-2xl border border-orange-400/30 bg-black/40 hover:bg-black/60 hover:border-orange-400/60 transition-all duration-300 overflow-hidden" style={{ boxShadow: "0 0 30px rgba(251,146,60,0.1)" }}>
                            <div className="flex items-center gap-3">
                                <HiOutlineMail className="w-6 h-6 text-orange-400" />
                                <span className="text-orange-400 uppercase tracking-widest text-[10px] font-semibold">Email</span>
                            </div>
                            <p className="text-white text-lg font-semibold leading-tight">When the message deserves a paragraph.</p>
                            <p className="text-white/60 text-sm leading-relaxed">For work, questions, or anything you want written down.</p>
                            <div className="mt-2 text-white/40 text-xs uppercase tracking-widest group-hover:text-orange-400 transition-colors">Open mail app ↗</div>
                        </a>

                        <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="group relative flex flex-col items-start gap-3 p-6 rounded-2xl border border-blue-400/30 bg-black/40 hover:bg-black/60 hover:border-blue-400/60 transition-all duration-300 overflow-hidden" style={{ boxShadow: "0 0 30px rgba(59,130,246,0.1)" }}>
                            <div className="flex items-center gap-3">
                                <FaLinkedin className="w-6 h-6 text-blue-400" />
                                <span className="text-blue-400 uppercase tracking-widest text-[10px] font-semibold">LinkedIn</span>
                            </div>
                            <p className="text-white text-lg font-semibold leading-tight">When it&apos;s about work.</p>
                            <p className="text-white/60 text-sm leading-relaxed">Collaborations, opportunities, or professional intros.</p>
                            <div className="mt-2 text-white/40 text-xs uppercase tracking-widest group-hover:text-blue-400 transition-colors">Open profile ↗</div>
                        </a>

                        <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="group relative flex flex-col items-start gap-3 p-6 rounded-2xl border border-green-400/30 bg-black/40 hover:bg-black/60 hover:border-green-400/60 transition-all duration-300 overflow-hidden" style={{ boxShadow: "0 0 30px rgba(34,197,94,0.1)" }}>
                            <div className="flex items-center gap-3">
                                <FaWhatsapp className="w-6 h-6 text-green-400" />
                                <span className="text-green-400 uppercase tracking-widest text-[10px] font-semibold">WhatsApp</span>
                            </div>
                            <p className="text-white text-lg font-semibold leading-tight">When you&apos;d rather just talk.</p>
                            <p className="text-white/60 text-sm leading-relaxed">Quick messages, voice notes, faster back-and-forth.</p>
                            <div className="mt-2 text-white/40 text-xs uppercase tracking-widest group-hover:text-green-400 transition-colors">Start a chat ↗</div>
                        </a>
                    </div>

                    <div className="relative">
                        <div className="flex flex-col md:flex-row items-center md:justify-between gap-8 md:gap-12">

                            <div className="flex-1 max-w-xl">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-8 h-px bg-purple-400/60" />
                                    <span className="text-purple-300 uppercase tracking-[0.3em] text-[10px] font-semibold">Something quieter</span>
                                </div>

                                <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight mb-6">Talk to me,<br />without telling me who you are.</h2>

                                <div className="flex flex-col gap-4 text-white/70 text-base leading-relaxed">
                                    <p>I believe people should talk. About everything. The clean things and the messy things. The questions you&apos;d never ask out loud.</p>
                                    <p>If there&apos;s something you need to say to someone, <em className="text-white/90">Talk to me.</em></p>
                                    <p className="text-white/60 text-sm">No names. No expectations. Just words. I read everything. I answer when I can.</p>
                                </div>
                            </div>

                            <a href={TELEGRAM} target="_blank" rel="noopener noreferrer" className="group relative flex flex-col items-center justify-center gap-4 p-8 md:p-10 rounded-3xl border border-purple-400/40 bg-black/50 hover:bg-black/70 hover:border-purple-400/70 transition-all duration-500 min-w-[240px] md:min-w-[280px]" style={{ boxShadow: "0 0 60px rgba(168,85,247,0.15)" }}>
                                <div className="w-16 h-16 rounded-full border border-purple-400/50 flex items-center justify-center group-hover:scale-110 group-hover:border-purple-400 transition-all duration-500">
                                    <FaTelegramPlane className="w-7 h-7 text-purple-300 group-hover:text-purple-200 transition-colors" />
                                </div>
                                <div className="flex flex-col items-center gap-2">
                                    <span className="text-white text-base font-semibold">Open anonymous chat</span>
                                    <span className="text-white/40 text-[10px] uppercase tracking-[0.3em]">Telegram · No sign-in required</span>
                                </div>
                            </a>
                        </div>
                    </div>

                    <div className="mt-24 pt-8 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        <p className="text-white/60 text-sm italic">— Armin Eslamieh</p>
                        <div className="flex items-center gap-4 text-white/40 text-xs uppercase tracking-widest">
                            <span>Currently CET</span>
                            <span>·</span>
                            <span>Usually replies within 1–3 days</span>
                        </div>
                    </div>
                </div>
            </FadeIn>
        </main>
    );
}
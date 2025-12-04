import React from 'react';
import { Phone, Mail, MapPin, Globe, Shield, Zap, Award, HelpCircle, FileText, MessageSquare } from 'lucide-react';
import { CONTACT_PHONE, APP_NAME } from '../constants';

// --- Contact Page ---
export const ContactPage: React.FC = () => (
  <div className="max-w-4xl mx-auto p-8 animate-fade-in">
    <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
      <Phone className="text-blue-500" /> Contact Us
    </h1>
    
    <div className="grid md:grid-cols-2 gap-8">
      <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700">
        <h2 className="text-xl font-semibold mb-6">Get in Touch</h2>
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-500/10 rounded-lg text-blue-400">
              <Phone size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-400">Phone Support</p>
              <p className="text-lg font-bold text-white tracking-wide">{CONTACT_PHONE}</p>
              <p className="text-xs text-slate-500 mt-1">Available Mon-Fri, 9am - 6pm</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-indigo-500/10 rounded-lg text-indigo-400">
              <Mail size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-400">Email</p>
              <p className="text-lg font-medium text-white">support@bizgenius.ai</p>
            </div>
          </div>

           <div className="flex items-start gap-4">
            <div className="p-3 bg-emerald-500/10 rounded-lg text-emerald-400">
              <MapPin size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-400">Headquarters</p>
              <p className="text-base font-medium text-white">123 Innovation Dr, Tech Valley, CA</p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-slate-800/30 p-6 rounded-xl border border-slate-700/50">
          <h3 className="font-semibold mb-2">Enterprise Solutions</h3>
          <p className="text-slate-400 text-sm">Need a custom integration? Contact our sales team for tailored AI solutions.</p>
        </div>
        <div className="bg-slate-800/30 p-6 rounded-xl border border-slate-700/50">
          <h3 className="font-semibold mb-2">Press Inquiries</h3>
          <p className="text-slate-400 text-sm">For media kits and interview requests, please email press@bizgenius.ai</p>
        </div>
      </div>
    </div>
  </div>
);

// --- About Page ---
export const AboutPage: React.FC = () => (
  <div className="max-w-4xl mx-auto p-8 animate-fade-in">
    <div className="text-center mb-12">
      <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
        About {APP_NAME}
      </h1>
      <p className="text-xl text-slate-400 max-w-2xl mx-auto">
        Revolutionizing business consulting with state-of-the-art Artificial Intelligence.
      </p>
    </div>

    <div className="grid md:grid-cols-3 gap-6 mb-12">
      <div className="p-6 bg-slate-800/40 rounded-xl border border-slate-700 hover:border-blue-500/50 transition-all text-center group">
        <div className="mx-auto w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-400 mb-4 group-hover:scale-110 transition-transform">
          <Zap size={24} />
        </div>
        <h3 className="font-semibold text-lg mb-2">Instant Strategy</h3>
        <p className="text-sm text-slate-400">Get comprehensive marketing plans and business strategies in seconds, not weeks.</p>
      </div>

      <div className="p-6 bg-slate-800/40 rounded-xl border border-slate-700 hover:border-indigo-500/50 transition-all text-center group">
        <div className="mx-auto w-12 h-12 bg-indigo-500/10 rounded-full flex items-center justify-center text-indigo-400 mb-4 group-hover:scale-110 transition-transform">
          <Award size={24} />
        </div>
        <h3 className="font-semibold text-lg mb-2">Expert Knowledge</h3>
        <p className="text-sm text-slate-400">Trained on millions of successful business cases, trends, and financial models.</p>
      </div>

      <div className="p-6 bg-slate-800/40 rounded-xl border border-slate-700 hover:border-cyan-500/50 transition-all text-center group">
        <div className="mx-auto w-12 h-12 bg-cyan-500/10 rounded-full flex items-center justify-center text-cyan-400 mb-4 group-hover:scale-110 transition-transform">
          <Shield size={24} />
        </div>
        <h3 className="font-semibold text-lg mb-2">Private & Secure</h3>
        <p className="text-sm text-slate-400">Your business ideas are your intellectual property. We prioritize data security.</p>
      </div>
    </div>

    <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-8 rounded-2xl border border-slate-700">
      <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
      <p className="text-slate-300 leading-relaxed">
        To democratize access to high-level business consultancy. Whether you are a solopreneur starting a coffee shop 
        or a startup founder scaling a tech unicorn, BizGenius provides the insights you need to succeed.
      </p>
    </div>
  </div>
);

// --- Help Page ---
export const HelpPage: React.FC = () => (
  <div className="max-w-3xl mx-auto p-8 animate-fade-in">
    <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
      <HelpCircle className="text-blue-500" /> Help Center
    </h1>

    <div className="space-y-6">
      <div className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700">
        <div className="p-4 bg-slate-700/50 border-b border-slate-700 font-semibold flex items-center gap-2">
          <MessageSquare size={18} /> Frequently Asked Questions
        </div>
        <div className="divide-y divide-slate-700">
          <div className="p-4">
            <h3 className="text-white font-medium mb-2">Is the business advice guaranteed?</h3>
            <p className="text-slate-400 text-sm">BizGenius uses advanced AI to provide suggestions based on best practices. However, all business decisions should be reviewed by human professionals.</p>
          </div>
          <div className="p-4">
            <h3 className="text-white font-medium mb-2">How do I save my chat history?</h3>
            <p className="text-slate-400 text-sm">Currently, chats are saved for the duration of your session. We are working on a cloud sync feature for the next update.</p>
          </div>
          <div className="p-4">
            <h3 className="text-white font-medium mb-2">Can I export marketing plans?</h3>
            <p className="text-slate-400 text-sm">Yes, you can simply copy the text from the chat interface. A PDF export feature is coming soon.</p>
          </div>
        </div>
      </div>

      <div className="bg-blue-900/20 p-6 rounded-xl border border-blue-500/30 flex items-start gap-4">
        <FileText className="text-blue-400 shrink-0 mt-1" />
        <div>
          <h3 className="font-semibold text-blue-100 mb-1">Documentation</h3>
          <p className="text-slate-400 text-sm mb-3">Read our detailed guide on how to prompt the AI for best results.</p>
          <button className="text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded transition-colors">
            View Docs
          </button>
        </div>
      </div>
    </div>
  </div>
);
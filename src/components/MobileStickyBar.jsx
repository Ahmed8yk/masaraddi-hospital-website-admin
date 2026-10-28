import React from 'react';
import { Phone, MessageSquare, MapPin } from 'lucide-react';
import { useHospitalData } from '../context/HospitalContext.jsx';

export const MobileStickyBar = () => {
  const { data } = useHospitalData();

  return (
    <aside
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#080E1A]/95 backdrop-blur-xl border-t border-white/10 px-3 pt-2 pb-3 shadow-[0_-10px_30px_rgba(0,0,0,0.45)]"
      aria-label="Mobile Quick Hospital Actions"
    >
      <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
        {/* Call Hospital Desk */}
        <a
          href={`tel:${data.contact.phone}`}
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 active:from-sky-600 active:to-blue-700 text-white active:scale-95 transition-all text-center border border-sky-400/30 shadow-md shadow-sky-600/25"
          aria-label="Call Hospital Desk"
        >
          <Phone className="w-4 h-4 mb-0.5" />
          <span className="text-[11px] font-bold tracking-tight">Call Hospital</span>
        </a>

        {/* WhatsApp */}
        <a
          href={`https://wa.me/${data.contact.whatsappNumber}?text=${encodeURIComponent(
            data.contact.whatsappMessage
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-emerald-950/90 active:bg-emerald-900 text-emerald-300 active:scale-95 transition-all text-center border border-emerald-500/40"
          aria-label="WhatsApp Hospital Desk"
        >
          <MessageSquare className="w-4 h-4 mb-0.5 text-emerald-400" />
          <span className="text-[11px] font-bold tracking-tight">WhatsApp</span>
        </a>

        {/* Directions */}
        <a
          href={data.contact.googleMapsDirectionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-slate-900/90 active:bg-slate-800 text-slate-200 active:scale-95 transition-all text-center border border-white/10"
          aria-label="Directions to Bagalkot Hospital"
        >
          <MapPin className="w-4 h-4 text-sky-400 mb-0.5" />
          <span className="text-[11px] font-medium tracking-tight">Directions</span>
        </a>
      </div>
    </aside>
  );
};

import React from 'react';
import { X, Maximize2, Download, Printer } from 'lucide-react';

export default function PDFViewer({ url, title, onClose }) {
  if (!url) return null;

  // Handle Google Drive links for better embedding
  const getEmbedUrl = (link) => {
    if (link.includes('drive.google.com')) {
      return link.replace('/view', '/preview').replace('/edit', '/preview');
    }
    return link;
  };

  const embedUrl = getEmbedUrl(url);

  return (
    <div className="fixed inset-0 z-[9999] bg-slate-900/95 backdrop-blur-md flex flex-col items-center justify-start pt-24 md:pt-28 pb-10 px-4 overflow-y-auto">
      {/* Header Bar */}
      <div className="w-full max-w-6xl bg-white rounded-t-2xl p-4 flex items-center justify-between border-b shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-red-600">
            <Download size={20} />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 line-clamp-1">{title || 'Dokumen Pelajaran'}</h3>
            <p className="text-xs text-slate-500">Membaca di Portal Edukasi Pancasila</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => window.open(url, '_blank')}
            className="p-2.5 rounded-xl hover:bg-slate-100 text-slate-600 transition-colors"
            title="Buka di Tab Baru"
          >
            <Maximize2 size={20} />
          </button>
          <button 
            onClick={onClose}
            className="p-2.5 rounded-xl bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-600 transition-all"
            title="Tutup"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Viewer Container */}
      <div className="w-full max-w-6xl flex-1 bg-slate-800 rounded-b-2xl overflow-hidden shadow-2xl relative group">
        <iframe
          src={embedUrl}
          className="w-full h-full border-none"
          title={title}
          allow="autoplay"
        />
        
        {/* Floating Controls hint */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <div className="bg-slate-900/80 text-white px-4 py-2 rounded-full text-xs font-medium backdrop-blur-md">
            Gunakan kontrol di dalam viewer untuk navigasi halaman
          </div>
        </div>
      </div>
      
      {/* Footer / Shortcut hint for accessibility */}
      <p className="mt-4 text-white/50 text-[10px] uppercase tracking-widest font-bold">
        Tekan ESC untuk menutup viewer
      </p>
    </div>
  );
}

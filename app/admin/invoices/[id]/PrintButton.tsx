'use client';

import { Printer } from 'lucide-react';

export default function PrintButton() {
  return (
    <button 
      onClick={() => window.print()}
      className="bg-black text-white px-6 py-3 uppercase tracking-wider text-xs hover:bg-gray-800 transition-colors flex items-center"
    >
      <Printer className="h-4 w-4 mr-2" />
      Print Invoice
    </button>
  );
}

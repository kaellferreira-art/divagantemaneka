import Image from "next/image";

import { WHATSAPP_URL } from "@/lib/contact";

export function WhatsAppBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-[#1E1A18]/10 bg-[#ece1d2] p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden">
      <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-cta btn-cta-primary w-full gap-2">
        <Image src="/icons/whatsapp.svg" alt="" width={20} height={20} className="h-5 w-5 object-contain" />
        Pedir orçamento no WhatsApp
      </a>
    </div>
  );
}

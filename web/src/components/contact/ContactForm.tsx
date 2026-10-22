"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

const TOPICS = [
  { id: "rituel", label: "Kişisel Ritüel & Ürün Danışmanlığı", icon: "spa" },
  { id: "siparis", label: "Sipariş & Kargo Bilgisi", icon: "local_shipping" },
  { id: "hediye", label: "Kurumsal Çözüm & Özel Hediye Kutusu", icon: "featured_seasonal_and_gifts" },
  { id: "workshop", label: "Workshop & Atölye Katılımı", icon: "group" },
  { id: "diger", label: "Diğer Konular", icon: "chat_bubble" },
];

export default function ContactForm() {
  const [selectedTopic, setSelectedTopic] = useState(TOPICS[0].id);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [botcheck, setBotcheck] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !message) return;

    setStatus("submitting");
    setErrorMessage(null);

    try {
      const topicObj = TOPICS.find((t) => t.id === selectedTopic);
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          topicLabel: topicObj?.label || "Genel İletişim",
          message,
          botcheck,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMessage(
          data.error || "Mesajınız iletilemedi. Lütfen daha sonra tekrar deneyiniz."
        );
      }
    } catch {
      setStatus("error");
      setErrorMessage(
        "Bağlantı sağlanamadı. Lütfen internet bağlantınızı kontrol ediniz veya WhatsApp üzerinden bize ulaşınız."
      );
    }
  };

  const handleReset = () => {
    setFullName("");
    setEmail("");
    setPhone("");
    setMessage("");
    setBotcheck("");
    setSelectedTopic(TOPICS[0].id);
    setStatus("idle");
    setErrorMessage(null);
  };

  if (status === "success") {
    return (
      <div className="bg-[#FAF7F4] border border-[#E8DFD8] rounded-[28px] p-8 md:p-14 text-center shadow-xs flex flex-col items-center justify-center animate-in fade-in zoom-in-95 duration-500">
        <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-6">
          <span className="material-symbols-outlined text-[32px]">check_circle</span>
        </div>
        <p className="text-[11px] uppercase tracking-[0.25em] text-primary font-bold mb-2">
          MESAJINIZ ALINDI
        </p>
        <h3 className="font-serif text-[28px] md:text-[34px] font-semibold text-foreground leading-[1.2] mb-4">
          Şefkatle dinliyoruz.
        </h3>
        <p className="text-[15.5px] text-muted-foreground leading-[1.8] max-w-[460px] mb-8 font-light">
          Merhaba <span className="font-medium text-foreground">{fullName}</span>, mesajınız ekibimize ulaştı. 
          En kısa sürede bir fincan çay dinginliğinde e-posta adresiniz üzerinden sizinle iletişime geçeceğiz.
        </p>
        <Button
          onClick={handleReset}
          variant="outline"
          className="rounded-[14px] h-[48px] px-8 text-[14px] font-medium border-border hover:bg-white"
        >
          Yeni Bir Mesaj Gönder
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-card border border-border/60 rounded-[32px] p-6 sm:p-10 md:p-12 shadow-[0_8px_32px_rgba(30,20,10,0.04)] relative overflow-hidden"
    >
      {/* Decorative background aura */}
      <div className="absolute -top-32 -right-32 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      {/* Honeypot field for bot spam prevention */}
      <input
        type="text"
        name="botcheck"
        value={botcheck}
        onChange={(e) => setBotcheck(e.target.value)}
        style={{ display: "none" }}
        tabIndex={-1}
        autoComplete="off"
      />

      {/* ERROR BANNER */}
      {status === "error" && errorMessage && (
        <div className="mb-8 p-5 rounded-[20px] bg-red-50 border border-red-200/80 text-left animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined text-red-600 text-[20px] shrink-0 mt-0.5">
              error
            </span>
            <div className="flex-1">
              <p className="text-[13.5px] text-red-800 font-medium leading-[1.5]">
                {errorMessage}
              </p>
              <div className="mt-3 flex items-center gap-3">
                <a
                  href="https://wa.me/905358296000?text=Merhaba%2C%20web%20sitenizden%20ulasmak%20istedim."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-[#25D366] hover:underline"
                >
                  <span className="material-symbols-outlined text-[15px]">chat</span>
                  <span>WhatsApp ile Hızlı Ulaşın</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TOPIC SELECTION */}
      <div className="mb-10">
        <label className="block text-[11.5px] uppercase tracking-[0.2em] text-muted-foreground font-semibold mb-4">
          1. Nasıl Yardımcı Olabiliriz? <span className="text-primary">*</span>
        </label>
        <div className="flex flex-wrap gap-2.5">
          {TOPICS.map((topic) => {
            const isSelected = selectedTopic === topic.id;
            return (
              <button
                type="button"
                key={topic.id}
                onClick={() => setSelectedTopic(topic.id)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-[13px] font-medium transition-all duration-200 border cursor-pointer ${
                  isSelected
                    ? "bg-primary text-white border-primary shadow-sm scale-[1.02]"
                    : "bg-background text-foreground/80 border-border/80 hover:border-primary/40 hover:bg-muted/30"
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">
                  {topic.icon}
                </span>
                <span>{topic.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* INPUT FIELDS */}
      <div className="space-y-6">
        <div className="block text-[11.5px] uppercase tracking-[0.2em] text-muted-foreground font-semibold mb-2">
          2. İletişim Bilgileriniz
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Full Name */}
          <div className="space-y-2">
            <label htmlFor="fullName" className="text-[12.5px] font-medium text-foreground">
              Adınız & Soyadınız <span className="text-primary">*</span>
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[18px] text-muted-foreground/60">
                person
              </span>
              <input
                id="fullName"
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Örn: İlayda Sivaslı Daşdemir"
                className="w-full bg-background border border-border/80 focus:border-primary rounded-[16px] h-[52px] pl-11 pr-4 text-[14.5px] text-foreground focus:outline-none focus:ring-3 focus:ring-primary/10 transition-all placeholder:text-muted-foreground/40 font-light"
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label htmlFor="email" className="text-[12.5px] font-medium text-foreground">
              E-Posta Adresiniz <span className="text-primary">*</span>
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[18px] text-muted-foreground/60">
                mail
              </span>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Örn: ilayda@ornek.com"
                className="w-full bg-background border border-border/80 focus:border-primary rounded-[16px] h-[52px] pl-11 pr-4 text-[14.5px] text-foreground focus:outline-none focus:ring-3 focus:ring-primary/10 transition-all placeholder:text-muted-foreground/40 font-light"
              />
            </div>
          </div>
        </div>

        {/* Phone (Optional) */}
        <div className="space-y-2">
          <label htmlFor="phone" className="text-[12.5px] font-medium text-foreground flex items-center justify-between">
            <span>Telefon Numaranız</span>
            <span className="text-[11px] text-muted-foreground font-normal">(İsteğe Bağlı)</span>
          </label>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[18px] text-muted-foreground/60">
              phone
            </span>
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="05XX XXX XX XX"
              className="w-full bg-background border border-border/80 focus:border-primary rounded-[16px] h-[52px] pl-11 pr-4 text-[14.5px] text-foreground focus:outline-none focus:ring-3 focus:ring-primary/10 transition-all placeholder:text-muted-foreground/40 font-light"
            />
          </div>
        </div>

        {/* Message */}
        <div className="space-y-2 pt-2">
          <label htmlFor="message" className="text-[12.5px] font-medium text-foreground">
            Mesajınız <span className="text-primary">*</span>
          </label>
          <textarea
            id="message"
            required
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Aklınızdaki soruları, özel taleplerinizi veya ritüel detaylarınızı buraya yazabilirsiniz..."
            className="w-full bg-background border border-border/80 focus:border-primary rounded-[18px] p-4 text-[14.5px] text-foreground focus:outline-none focus:ring-3 focus:ring-primary/10 transition-all placeholder:text-muted-foreground/40 font-light resize-none leading-[1.6]"
          />
        </div>
      </div>

      {/* SUBMIT BUTTON & PRIVACY NOTE */}
      <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-border/40 mt-8">
        <p className="text-[12px] text-muted-foreground/80 leading-[1.6] max-w-[340px]">
          Gönder butonuna basarak bilgilerinizin iletişim amacıyla işlenmesini onaylamış olursunuz.
        </p>

        <Button
          type="submit"
          disabled={status === "submitting"}
          className="w-full sm:w-auto bg-[#B95B32] hover:bg-[#A34F2A] text-white rounded-[16px] h-[54px] px-9 text-[14.5px] font-semibold transition-all duration-300 shadow-lg shadow-[#B95B32]/20 hover:shadow-xl hover:shadow-[#B95B32]/30 active:scale-98 cursor-pointer"
        >
          {status === "submitting" ? (
            <span className="inline-flex items-center gap-2">
              <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>
              İletiliyor...
            </span>
          ) : (
            <span className="inline-flex items-center gap-2">
              <span>Mesajı Gönder</span>
              <span className="material-symbols-outlined text-[18px]">send</span>
            </span>
          )}
        </Button>
      </div>
    </form>
  );
}

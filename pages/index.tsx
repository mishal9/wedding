import React, { useMemo, useState, useEffect, FormEvent, useCallback } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Clock, Mail, Phone, Image as ImageIcon } from "lucide-react";
import confetti from "canvas-confetti";

// If you use shadcn/ui, keep these imports. Make sure you actually have these files:
// components/ui/card.tsx and components/ui/button.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

/** ---------- Types ---------- */
type Attending = "yes" | "no" | "maybe";
type Meal = "none" | "veg" | "vegan" | "chicken" | "fish";

type RSVPData = {
  name: string;
  email: string;
  phone?: string;
  attending: Attending;
  meal?: Meal;
  plusOne?: string;
  notes?: string;
};

/** Convert FormData to a typed payload */
function formToRSVP(fd: FormData): RSVPData {
  return {
    name: String(fd.get("name") ?? ""),
    email: String(fd.get("email") ?? ""),
    phone: fd.get("phone")?.toString(),
    attending: (fd.get("attending") ?? "yes") as Attending,
    meal: (fd.get("meal") ?? "none") as Meal,
    plusOne: fd.get("plusOne")?.toString(),
    notes: fd.get("notes")?.toString(),
  };
}

/** ---------- Page ---------- */
export default function WeddingMicrosite(): React.JSX.Element {
  // Change to your real date/time
  const targetDate = useMemo(() => new Date("2025-11-27T17:00:00-05:00"), []);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const triggerConfetti = useCallback(() => {
    if (typeof window !== 'undefined' && isMounted) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f43f5e', '#ec4899', '#d946ef', '#a855f7', '#6366f1']
      });
    }
  }, [isMounted]);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 bg-slate-50">
          {/* Floating code symbols - representing how you met */}
          <motion.div
            className="absolute top-20 left-10 text-6xl opacity-10"
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 5, 0]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            {"{ }"}
          </motion.div>
          <motion.div
            className="absolute top-40 right-20 text-4xl opacity-10"
            animate={{ 
              y: [0, -15, 0],
              rotate: [0, -3, 0]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          >
            {"</>"}
          </motion.div>
          <motion.div
            className="absolute bottom-40 left-20 text-5xl opacity-10"
            animate={{ 
              y: [0, -10, 0],
              rotate: [0, 2, 0]
            }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          >
            {"()=>"}
          </motion.div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Illustrated couple */}
            <motion.div 
              className="mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <CoupleIllustration />
            </motion.div>
            
            {/* Clean, readable typography */}
            <motion.h1 
              className="text-6xl md:text-8xl font-light text-slate-900 tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Mishal <span className="font-serif italic">&</span> Shraddha
            </motion.h1>
            
            <motion.div 
              className="w-24 h-px bg-slate-300 mx-auto"
              initial={{ width: 0 }}
              animate={{ width: 96 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            />
            
            <motion.p 
              className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              We're getting married and would love for you to join us in celebrating this new chapter of our lives.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row items-center justify-center gap-8 text-slate-700"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
            >
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5" />
                <span>November 27, 2025</span>
              </div>
              <div className="hidden sm:block w-px h-6 bg-slate-300" />
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5" />
                <span>Vadodara, Gujarat</span>
              </div>
            </motion.div>
            
            <Countdown targetDate={targetDate} />
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center pt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.5 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  asChild
                  className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-3 text-base"
                >
                  <a href="#rsvp">RSVP</a>
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  variant="outline" 
                  asChild
                  className="border-slate-300 text-slate-700 hover:bg-slate-50 px-8 py-3 text-base"
                >
                  <a href="#details">View Details</a>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section id="story" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-light text-slate-900 mb-4">Our Story</h2>
            <div className="w-24 h-px bg-slate-300 mx-auto" />
          </motion.div>
          
          <div className="space-y-24">
            {[
              { 
                year: "2019", 
                title: "We met", 
                text: "At a hackathon in San Francisco. Mishal was debugging Python, Shraddha was perfecting her CSS. We ended up collaborating on a project and haven't stopped since.",
                illustration: "hackathon"
              },
              { 
                year: "2023", 
                title: "The proposal", 
                text: "During a quiet morning walk in Golden Gate Park. No grand gestures, no crowds—just us, the sunrise, and a simple question that changed everything.",
                illustration: "proposal"
              },
              { 
                year: "2025", 
                title: "Our wedding", 
                text: "We're bringing together our families, friends, and two cultures to celebrate the beginning of our married life. We can't wait to share this day with you.",
                illustration: "wedding"
              },
            ].map((story, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
                viewport={{ once: true }}
                className={`flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12`}
              >
                {/* Illustration */}
                <div className="flex-1 flex justify-center">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <StoryIllustration type={story.illustration} />
                  </motion.div>
                </div>
                
                {/* Content */}
                <div className="flex-1 text-center lg:text-left">
                  <motion.div
                    className="text-6xl font-light text-slate-300 mb-4"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    {story.year}
                  </motion.div>
                  <motion.h3 
                    className="text-2xl font-medium text-slate-900 mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                  >
                    {story.title}
                  </motion.h3>
                  <motion.p 
                    className="text-slate-600 leading-relaxed text-lg"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    viewport={{ once: true }}
                  >
                    {story.text}
                  </motion.p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Details */}
      <section id="details" className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-light text-slate-900 mb-4">Wedding Details</h2>
            <div className="w-24 h-px bg-slate-300 mx-auto" />
          </motion.div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Schedule */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white border-0 shadow-sm">
                <CardContent className="p-8">
                  <h3 className="text-xl font-medium text-slate-900 mb-6 flex items-center gap-3">
                    <Clock className="h-5 w-5" />
                    Schedule
                  </h3>
                  <div className="space-y-4">
                    {[
                      { time: "5:00 PM", event: "Arrival & Welcome Drinks" },
                      { time: "5:30 PM", event: "Wedding Ceremony" },
                      { time: "6:30 PM", event: "Cocktail Hour & Photos" },
                      { time: "7:30 PM", event: "Dinner & Toasts" },
                      { time: "9:00 PM", event: "Dancing & Celebration" },
                      { time: "11:30 PM", event: "Farewell" },
                    ].map((item, i) => (
                      <div key={i} className="flex justify-between items-center py-2 border-b border-slate-100 last:border-0">
                        <span className="font-medium text-slate-900">{item.time}</span>
                        <span className="text-slate-600">{item.event}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 p-4 bg-slate-50 rounded-lg">
                    <h4 className="font-medium text-slate-900 mb-2">Dress Code</h4>
                    <p className="text-slate-600 text-sm">
                      Cocktail attire. We'll be celebrating outdoors, so comfortable shoes are recommended.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Venue */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white border-0 shadow-sm overflow-hidden">
                <CardContent className="p-0">
                  <div className="p-8 pb-6">
                    <h3 className="text-xl font-medium text-slate-900 mb-2 flex items-center gap-3">
                      <MapPin className="h-5 w-5" />
                      Venue
                    </h3>
                    <p className="text-slate-600 mb-4">
                      Banyan Paradise Resort<br />
                      Vadodara, Gujarat, India
                    </p>
                  </div>
                  <div className="relative">
                    <iframe
                      title="Venue Map"
                      width="100%"
                      height="250"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3689.7875103739148!2d73.19861201120304!3d22.36165084058331!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fcec39ff45793%3A0x79fa9e5bbda7549f!2sBanyan%20Paradise%20Resort%20(%20Best%20Wedding%20Venue%20In%20Vadodara%20)!5e0!3m2!1sen!2sus!4v1756873465789!5m2!1sen!2sus"
                    />
                  </div>
                  <div className="p-8 pt-6">
                    <div className="text-sm text-slate-600 space-y-2">
                      <div>• Parking available on-site</div>
                      <div>• Accessible facilities</div>
                      <div>• Guest accommodation available</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Registry */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-light text-slate-900 mb-4">Registry</h2>
            <div className="w-24 h-px bg-slate-300 mx-auto mb-8" />
            <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto">
              Your presence at our wedding is the greatest gift. For those who wish to honor us with a gift, 
              we've registered at a few places.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { name: "Amazon", url: "#" },
                { name: "Crate & Barrel", url: "#" },
                { name: "Honeyfund", url: "#" },
              ].map((registry, i) => (
                <motion.a
                  key={i}
                  href={registry.url}
                  className="block p-6 border border-slate-200 rounded-lg hover:border-slate-300 transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <span className="text-lg font-medium text-slate-900">{registry.name}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Photos */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-light text-slate-900 mb-4">Photos</h2>
            <div className="w-24 h-px bg-slate-300 mx-auto" />
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={i}
                className="aspect-square bg-slate-200 rounded-lg overflow-hidden"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                viewport={{ once: true }}
              >
                <div className="w-full h-full flex items-center justify-center text-slate-400">
                  <ImageIcon className="h-8 w-8" />
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-slate-600 mb-6">
              Have photos of us you'd like to share? We'd love to see them.
            </p>
            <Button 
              variant="outline"
              className="border-slate-300 text-slate-700 hover:bg-slate-100"
            >
              Share Photos
            </Button>
          </motion.div>
        </div>
      </section>

      {/* RSVP */}
      <section id="rsvp" className="py-20 bg-white">
        <div className="max-w-2xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-light text-slate-900 mb-4">RSVP</h2>
            <div className="w-24 h-px bg-slate-300 mx-auto mb-8" />
            <p className="text-xl text-slate-600">
              Please let us know if you'll be joining us by October 27th.
            </p>
          </motion.div>
          
          <Card className="bg-white border border-slate-200 shadow-sm">
            <CardContent className="p-8">
              {sent ? (
                <div className="text-center py-8">
                  <div className="text-2xl font-medium text-slate-900 mb-4">Thank you!</div>
                  <p className="text-slate-600">
                    We've received your RSVP and will be in touch with any updates.
                  </p>
                </div>
              ) : (
                <form
                  className="space-y-6"
                  onSubmit={async (e: FormEvent<HTMLFormElement>) => {
                    e.preventDefault();
                    const fd = new FormData(e.currentTarget as HTMLFormElement);
                    const payload = formToRSVP(fd);
                    setLoading(true);
                    try {
                      const res = await fetch("/api/rsvp", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(payload),
                      });
                      if (!res.ok) throw new Error("RSVP failed");
                      setSent(true);
                    } catch {
                      alert("Could not send RSVP. Please try again or contact us directly.");
                    } finally {
                      setLoading(false);
                    }
                  }}
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    <label className="space-y-2">
                      <span className="text-sm font-medium text-slate-900">Name</span>
                      <input 
                        name="name" 
                        required 
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent" 
                      />
                    </label>
                    
                    <label className="space-y-2">
                      <span className="text-sm font-medium text-slate-900">Email</span>
                      <input 
                        name="email" 
                        type="email" 
                        required 
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent" 
                      />
                    </label>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <label className="space-y-2">
                      <span className="text-sm font-medium text-slate-900">Phone (optional)</span>
                      <input 
                        name="phone" 
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent" 
                      />
                    </label>
                    
                    <label className="space-y-2">
                      <span className="text-sm font-medium text-slate-900">Will you attend?</span>
                      <select 
                        name="attending" 
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent" 
                        defaultValue="yes"
                      >
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                        <option value="maybe">Maybe</option>
                      </select>
                    </label>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <label className="space-y-2">
                      <span className="text-sm font-medium text-slate-900">Meal preference</span>
                      <select 
                        name="meal" 
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent" 
                        defaultValue="none"
                      >
                        <option value="none">No preference</option>
                        <option value="veg">Vegetarian</option>
                        <option value="vegan">Vegan</option>
                        <option value="chicken">Chicken</option>
                        <option value="fish">Fish</option>
                      </select>
                    </label>
                    
                    <label className="space-y-2">
                      <span className="text-sm font-medium text-slate-900">Plus one name</span>
                      <input 
                        name="plusOne" 
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent" 
                      />
                    </label>
                  </div>
                  
                  <label className="space-y-2">
                    <span className="text-sm font-medium text-slate-900">Additional notes</span>
                    <textarea 
                      name="notes" 
                      rows={4} 
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent resize-none" 
                      placeholder="Dietary restrictions, accessibility needs, etc."
                    />
                  </label>
                  
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
                    <div className="text-sm text-slate-600">
                      Questions? <a className="underline hover:text-slate-900" href="tel:+15551234567">Call us</a>
                    </div>
                    <Button 
                      disabled={loading} 
                      className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-2"
                    >
                      {loading ? "Sending..." : "Submit RSVP"}
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-slate-50 text-center">
        <div className="text-slate-600">
          © {new Date().getFullYear()} Mishal & Shraddha
        </div>
      </footer>
    </div>
  );
}



function Countdown({ targetDate }: { targetDate: Date }): React.JSX.Element {
  const [{ d, h, m, s }, setT] = useState<{ d: number; h: number; m: number; s: number }>({
    d: 0,
    h: 0,
    m: 0,
    s: 0,
  });

  useEffect(() => {
    const id = setInterval(() => {
      const diff = Math.max(0, targetDate.getTime() - Date.now());
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor(diff / (1000 * 60 * 60)) % 24;
      const m = Math.floor(diff / (1000 * 60)) % 60;
      const s = Math.floor(diff / 1000) % 60;
      setT({ d, h, m, s });
    }, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  return (
    <div className="mt-12 grid grid-cols-4 gap-6 max-w-lg mx-auto">
      {[
        { label: "Days", value: d },
        { label: "Hours", value: h },
        { label: "Minutes", value: m },
        { label: "Seconds", value: s },
      ].map((x, i) => (
        <motion.div 
          key={i} 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: i * 0.1 }}
        >
          <motion.div 
            className="text-4xl font-light text-slate-900 mb-2"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.25 }}
          >
            {String(x.value).padStart(2, "0")}
          </motion.div>
          <div className="text-sm text-slate-600 uppercase tracking-wide">
            {x.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// Custom Illustrations
function CoupleIllustration(): React.JSX.Element {
  return (
    <div className="w-48 h-48 mx-auto relative">
      {/* Simple cartoon-style illustration using CSS and SVG */}
      <svg viewBox="0 0 200 200" className="w-full h-full">
        {/* Background circle */}
        <motion.circle
          cx="100"
          cy="100"
          r="95"
          fill="none"
          stroke="#e2e8f0"
          strokeWidth="2"
          strokeDasharray="10,5"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "100px 100px" }}
        />
        
        {/* Male figure (Mishal) */}
        <g>
          {/* Head */}
          <circle cx="75" cy="70" r="20" fill="#fbbf24" opacity="0.8" />
          {/* Body */}
          <rect x="65" y="85" width="20" height="35" rx="10" fill="#3b82f6" opacity="0.8" />
          {/* Laptop */}
          <rect x="60" y="115" width="30" height="20" rx="2" fill="#1f2937" opacity="0.9" />
          <rect x="62" y="117" width="26" height="15" rx="1" fill="#22c55e" opacity="0.3" />
          {/* Code symbols */}
          <text x="75" y="127" textAnchor="middle" fontSize="8" fill="#22c55e">{"{ }"}</text>
        </g>
        
        {/* Female figure (Shraddha) */}
        <g>
          {/* Head */}
          <circle cx="125" cy="70" r="20" fill="#f59e0b" opacity="0.8" />
          {/* Body */}
          <rect x="115" y="85" width="20" height="35" rx="10" fill="#ec4899" opacity="0.8" />
          {/* Laptop */}
          <rect x="110" y="115" width="30" height="20" rx="2" fill="#1f2937" opacity="0.9" />
          <rect x="112" y="117" width="26" height="15" rx="1" fill="#8b5cf6" opacity="0.3" />
          {/* CSS symbols */}
          <text x="125" y="127" textAnchor="middle" fontSize="8" fill="#8b5cf6">{"#"}</text>
        </g>
        
        {/* Heart between them */}
        <motion.path
          d="M100 85 C95 80, 85 80, 85 90 C85 95, 100 110, 100 110 C100 110, 115 95, 115 90 C115 80, 105 80, 100 85 Z"
          fill="#ef4444"
          opacity="0.7"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </svg>
    </div>
  );
}

function StoryIllustration({ type }: { type: string }): React.JSX.Element {
  const illustrations = {
    hackathon: (
      <svg viewBox="0 0 300 200" className="w-80 h-52">
        {/* Desk */}
        <rect x="50" y="140" width="200" height="40" rx="5" fill="#8b5cf6" opacity="0.2" />
        
        {/* Laptops */}
        <rect x="70" y="120" width="50" height="30" rx="3" fill="#1f2937" />
        <rect x="73" y="123" width="44" height="22" rx="2" fill="#22c55e" opacity="0.3" />
        
        <rect x="180" y="120" width="50" height="30" rx="3" fill="#1f2937" />
        <rect x="183" y="123" width="44" height="22" rx="2" fill="#8b5cf6" opacity="0.3" />
        
        {/* Coffee cups */}
        <motion.circle
          cx="140"
          cy="135"
          r="8"
          fill="#f59e0b"
          animate={{ y: [0, -2, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.circle
          cx="160"
          cy="135"
          r="8"
          fill="#f59e0b"
          animate={{ y: [0, -2, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
        />
        
        {/* Code floating around */}
        <motion.text
          x="100"
          y="60"
          fontSize="12"
          fill="#22c55e"
          opacity="0.6"
          animate={{ 
            y: [60, 50, 60],
            opacity: [0.6, 1, 0.6]
          }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          {"function love() {"}
        </motion.text>
        
        <motion.text
          x="180"
          y="80"
          fontSize="12"
          fill="#8b5cf6"
          opacity="0.6"
          animate={{ 
            y: [80, 70, 80],
            opacity: [0.6, 1, 0.6]
          }}
          transition={{ duration: 4, repeat: Infinity, delay: 1 }}
        >
          {"  return true;"}
        </motion.text>
        
        <motion.text
          x="120"
          y="100"
          fontSize="12"
          fill="#ef4444"
          opacity="0.6"
          animate={{ 
            y: [100, 90, 100],
            opacity: [0.6, 1, 0.6]
          }}
          transition={{ duration: 4, repeat: Infinity, delay: 2 }}
        >
          {"}"}
        </motion.text>
      </svg>
    ),
    
    proposal: (
      <svg viewBox="0 0 300 200" className="w-80 h-52">
        {/* Sun */}
        <motion.circle
          cx="250"
          cy="50"
          r="25"
          fill="#fbbf24"
          opacity="0.8"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "250px 50px" }}
        />
        
        {/* Sun rays */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
          <motion.line
            key={i}
            x1="250"
            y1="50"
            x2={250 + Math.cos(angle * Math.PI / 180) * 40}
            y2={50 + Math.sin(angle * Math.PI / 180) * 40}
            stroke="#fbbf24"
            strokeWidth="2"
            opacity="0.6"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
        
        {/* Trees */}
        <rect x="20" y="120" width="10" height="40" fill="#92400e" />
        <circle cx="25" cy="120" r="15" fill="#22c55e" opacity="0.7" />
        
        <rect x="260" y="130" width="8" height="30" fill="#92400e" />
        <circle cx="264" cy="130" r="12" fill="#22c55e" opacity="0.7" />
        
        {/* Path */}
        <path d="M50 160 Q150 140 250 160" stroke="#d1d5db" strokeWidth="20" fill="none" opacity="0.5" />
        
        {/* Couple silhouettes */}
        <g>
          {/* Male figure kneeling */}
          <motion.circle
            cx="130"
            cy="130"
            r="12"
            fill="#1f2937"
            animate={{ y: [0, -2, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.rect
            x="125"
            y="140"
            width="10"
            height="20"
            fill="#1f2937"
            animate={{ y: [0, -2, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          
          {/* Female figure */}
          <motion.circle
            cx="150"
            cy="120"
            r="12"
            fill="#1f2937"
            animate={{ y: [0, -1, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          />
          <motion.rect
            x="145"
            y="130"
            width="10"
            height="25"
            fill="#1f2937"
            animate={{ y: [0, -1, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          />
          
          {/* Ring sparkle */}
          <motion.circle
            cx="140"
            cy="145"
            r="3"
            fill="#fbbf24"
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [1, 0.5, 1]
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </g>
      </svg>
    ),
    
    wedding: (
      <svg viewBox="0 0 300 200" className="w-80 h-52">
        {/* Venue outline */}
        <rect x="50" y="100" width="200" height="80" rx="10" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="2" />
        
        {/* Decorative elements */}
        <motion.path
          d="M70 90 Q150 70 230 90"
          stroke="#ec4899"
          strokeWidth="3"
          fill="none"
          animate={{ pathLength: [0, 1, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        
        {/* Guests (small circles) */}
        {Array.from({ length: 12 }).map((_, i) => {
          const x = 70 + (i % 4) * 40;
          const y = 120 + Math.floor(i / 4) * 20;
          return (
            <motion.circle
              key={i}
              cx={x}
              cy={y}
              r="4"
              fill={i % 3 === 0 ? "#3b82f6" : i % 3 === 1 ? "#ec4899" : "#22c55e"}
              opacity="0.7"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
            />
          );
        })}
        
        {/* Bride and groom at altar */}
        <g>
          {/* Altar */}
          <rect x="140" y="110" width="20" height="30" rx="2" fill="#8b5cf6" opacity="0.3" />
          
          {/* Couple */}
          <circle cx="145" cy="115" r="6" fill="#1f2937" />
          <circle cx="155" cy="115" r="6" fill="#1f2937" />
          
          {/* Hearts floating up */}
          {[0, 1, 2].map((i) => (
            <motion.path
              key={i}
              d={`M${145 + i * 5} 100 C${143 + i * 5} 98, ${140 + i * 5} 98, ${140 + i * 5} 102 C${140 + i * 5} 104, ${145 + i * 5} 110, ${145 + i * 5} 110 C${145 + i * 5} 110, ${150 + i * 5} 104, ${150 + i * 5} 102 C${150 + i * 5} 98, ${147 + i * 5} 98, ${145 + i * 5} 100 Z`}
              fill="#ef4444"
              opacity="0.6"
              animate={{ 
                y: [0, -30, -60],
                opacity: [0.6, 1, 0]
              }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.7 }}
            />
          ))}
        </g>
        
        {/* Celebration text */}
        <motion.text
          x="150"
          y="50"
          textAnchor="middle"
          fontSize="16"
          fill="#8b5cf6"
          opacity="0.8"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.8, 1, 0.8]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          🎉 Celebration! 🎉
        </motion.text>
      </svg>
    )
  };
  
  return (
    <div className="w-full max-w-sm mx-auto">
      {illustrations[type as keyof typeof illustrations] || illustrations.hackathon}
    </div>
  );
}



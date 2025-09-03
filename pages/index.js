import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Clock, Mail, Phone, Music, Heart, Image as ImageIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// ✅ Drop this component into a Next.js (app or pages) project to preview.
// Tailwind classes assume you've run `npx tailwindcss init -p` and wired up globals.
// RSVP submit posts to "/api/rsvp" — add an API route that stores the data in Google Sheets/Airtable/Supabase.

export default function WeddingMicrosite() {
  const date = useMemo(() => new Date("2026-02-14T17:00:00-05:00"), []); // ← change to your real date/time
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-slate-50 text-slate-800">
      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_50%_-10%,rgba(244,114,182,0.25),transparent_70%)]"/>
        <div className="mx-auto max-w-4xl px-6 pt-16 pb-12 text-center">
          <motion.h1 initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{duration:0.6}} className="text-4xl md:text-6xl font-serif tracking-tight">
            Mishal & Shraddha
          </motion.h1>
          <p className="mt-4 text-lg md:text-xl text-slate-600">We’re getting married — and you’re invited.</p>
          <div className="mt-6 flex items-center justify-center gap-4 text-slate-600">
            <div className="flex items-center gap-2"><Calendar className="h-5 w-5"/> <span>Feb 14, 2026</span></div>
            <div className="flex items-center gap-2"><MapPin className="h-5 w-5"/> <span>New York, NY</span></div>
          </div>
          <Countdown targetDate={date} />
          <div className="mt-8 flex justify-center gap-3">
            <a href="#rsvp"><Button className="rounded-2xl px-6 py-6 text-base">RSVP</Button></a>
            <a href="#details"><Button variant="outline" className="rounded-2xl px-6 py-6 text-base">Event Details</Button></a>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section id="story" className="mx-auto max-w-5xl px-6 py-16">
        <SectionTitle icon={<Heart className="h-5 w-5"/>} title="Our Story" subtitle="A tiny timeline of big moments"/>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            {year:"2019", title:"We met", text:"Met at a hackathon; argued about tabs vs spaces; sparks flew."},
            {year:"2023", title:"Said yes", text:"A quiet sunrise proposal. She said yes before coffee."},
            {year:"2026", title:"Tying the knot", text:"Come celebrate with us — dress sharp, dance harder."},
          ].map((x,i)=> (
            <Card key={i} className="rounded-2xl shadow-sm">
              <CardContent className="p-6">
                <div className="text-2xl font-serif">{x.year}</div>
                <div className="mt-1 font-semibold">{x.title}</div>
                <p className="mt-2 text-slate-600 text-sm">{x.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Details */}
      <section id="details" className="mx-auto max-w-5xl px-6 py-16">
        <SectionTitle icon={<MapPin className="h-5 w-5"/>} title="Event Details" subtitle="When, where, dress code"/>
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="rounded-2xl shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 text-slate-700 font-semibold"><Clock className="h-4 w-4"/> Schedule</div>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                <li><b>5:00 PM</b> — Guests arrive, welcome drinks</li>
                <li><b>5:30 PM</b> — Ceremony</li>
                <li><b>6:30 PM</b> — Cocktails & Photos</li>
                <li><b>7:30 PM</b> — Dinner & Speeches</li>
                <li><b>9:00 PM</b> — Dancing till late</li>
                <li><b>11:30 PM</b> — Send-off ✨</li>
              </ul>
              <div className="mt-4 text-sm text-slate-600">Dress code: Black tie optional. Comfortable shoes encouraged for the dance floor.</div>
            </CardContent>
          </Card>
          <Card className="rounded-2xl shadow-sm">
            <CardContent className="p-0 overflow-hidden">
              <iframe
                title="Venue Map"
                width="100%"
                height="320"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src={"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.901274280385!2d-73.968!3d40.7831!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQ2JzU5LjIiTiA3M8KwNTgnMDQuOCJX!5e0!3m2!1sen!2sus!4v1715555555555"}
              />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Registry & Playlist */}
      <section id="extras" className="mx-auto max-w-5xl px-6 py-16">
        <SectionTitle icon={<Music className="h-5 w-5"/>} title="Extras" subtitle="Registry & playlist"/>
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="rounded-2xl shadow-sm">
            <CardContent className="p-6">
              <div className="font-semibold">Registry</div>
              <p className="mt-2 text-sm text-slate-600">We’re grateful for your presence — gifts are optional. If you’d like, here are links:</p>
              <ul className="mt-2 list-disc list-inside text-sm text-rose-700">
                <li><a href="#" className="underline">Amazon</a></li>
                <li><a href="#" className="underline">Crate & Barrel</a></li>
                <li><a href="#" className="underline">Honeyfund</a></li>
              </ul>
            </CardContent>
          </Card>
          <Card className="rounded-2xl shadow-sm">
            <CardContent className="p-6">
              <div className="font-semibold">Playlist</div>
              <p className="mt-2 text-sm text-slate-600">Add a song you want to hear on the dance floor.</p>
              <div className="mt-4 aspect-video w-full bg-slate-100 rounded-xl grid place-items-center text-slate-500">
                <div className="flex items-center gap-2"><Music className="h-5 w-5"/> Spotify embed goes here</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Gallery (optional) */}
      <section id="gallery" className="mx-auto max-w-5xl px-6 py-16">
        <SectionTitle icon={<ImageIcon className="h-5 w-5"/>} title="Gallery" subtitle="Engagement photos & guest uploads"/>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="aspect-square rounded-xl bg-slate-100"/>
          ))}
        </div>
        <p className="mt-4 text-sm text-slate-600">Got pics of us? <a className="underline" href="#">Upload to our shared album</a>.</p>
      </section>

      {/* RSVP */}
      <section id="rsvp" className="mx-auto max-w-3xl px-6 py-20">
        <SectionTitle icon={<Mail className="h-5 w-5"/>} title="RSVP" subtitle="Let us know you’re coming"/>
        <Card className="rounded-2xl shadow-sm">
          <CardContent className="p-6">
            {sent ? (
              <div className="text-center">
                <div className="text-xl font-semibold">Thank you! 🎉</div>
                <p className="mt-2 text-slate-600">We’ve recorded your RSVP. We’ll reach out with any updates.</p>
              </div>
            ) : (
              <form
                className="grid md:grid-cols-2 gap-4"
                onSubmit={async (e) => {
                  e.preventDefault();
                  const fd = new FormData(e.currentTarget as HTMLFormElement);
                  const payload = Object.fromEntries(fd.entries());
                  setLoading(true);
                  try {
                    const res = await fetch("/api/rsvp", { method: "POST", headers: {"Content-Type":"application/json"}, body: JSON.stringify(payload) });
                    if (!res.ok) throw new Error("RSVP failed");
                    setSent(true);
                  } catch (err) {
                    alert("Could not send RSVP. Try again or email us.");
                  } finally { setLoading(false); }
                }}
              >
                <label className="grid gap-1"><span className="text-sm">Full name</span><input name="name" required className="rounded-xl border p-3"/></label>
                <label className="grid gap-1"><span className="text-sm">Email</span><input name="email" type="email" required className="rounded-xl border p-3"/></label>
                <label className="grid gap-1"><span className="text-sm">Phone</span><input name="phone" className="rounded-xl border p-3"/></label>
                <label className="grid gap-1"><span className="text-sm">Attending?</span>
                  <select name="attending" className="rounded-xl border p-3">
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                    <option value="maybe">Maybe</option>
                  </select>
                </label>
                <label className="grid gap-1 md:col-span-2"><span className="text-sm">Meal preference</span>
                  <select name="meal" className="rounded-xl border p-3">
                    <option value="none">No preference</option>
                    <option value="veg">Vegetarian</option>
                    <option value="vegan">Vegan</option>
                    <option value="chicken">Chicken</option>
                    <option value="fish">Fish</option>
                  </select>
                </label>
                <label className="grid gap-1 md:col-span-2"><span className="text-sm">Plus one name (if any)</span><input name="plusOne" className="rounded-xl border p-3"/></label>
                <label className="grid gap-1 md:col-span-2"><span className="text-sm">Notes (allergies, access needs, song requests)</span><textarea name="notes" rows={4} className="rounded-xl border p-3"/></label>
                <div className="md:col-span-2 flex items-center justify-between">
                  <div className="text-sm text-slate-500 flex items-center gap-2"><Phone className="h-4 w-4"/> Questions? <a className="underline" href="tel:+15551234567">Call us</a></div>
                  <Button disabled={loading} className="rounded-2xl px-6 py-6 text-base">{loading?"Sending...":"Submit RSVP"}</Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="pb-16 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} Mishal & Shraddha • Built with ❤ • <a className="underline" href="#">#MishalWedsShraddha</a>
      </footer>
    </div>
  );
}

function SectionTitle({icon, title, subtitle}:{icon: React.ReactNode; title: string; subtitle?: string}){
  return (
    <div className="text-center mb-8">
      <div className="mx-auto flex items-center justify-center gap-2 text-rose-600">{icon}<span className="uppercase tracking-wider text-xs">{subtitle}</span></div>
      <h2 className="mt-1 font-serif text-3xl md:text-4xl">{title}</h2>
    </div>
  );
}

function Countdown({ targetDate }:{ targetDate: Date }){
  const [{d,h,m,s}, setT] = React.useState<{d:number,h:number,m:number,s:number}>({d:0,h:0,m:0,s:0});
  React.useEffect(()=>{
    const id = setInterval(()=>{
      const diff = Math.max(0, targetDate.getTime() - Date.now());
      const d = Math.floor(diff / (1000*60*60*24));
      const h = Math.floor(diff / (1000*60*60)) % 24;
      const m = Math.floor(diff / (1000*60)) % 60;
      const s = Math.floor(diff / 1000) % 60;
      setT({d,h,m,s});
    }, 1000);
    return ()=>clearInterval(id);
  },[targetDate]);
  return (
    <div className="mt-8 grid grid-cols-4 gap-2 max-w-md mx-auto">
      {[{label:"Days",value:d},{label:"Hours",value:h},{label:"Minutes",value:m},{label:"Seconds",value:s}].map((x,i)=> (
        <div key={i} className="rounded-2xl bg-white/70 backdrop-blur p-3 shadow-sm">
          <div className="text-2xl font-semibold text-slate-800 text-center">{String(x.value).padStart(2,'0')}</div>
          <div className="text-xs text-slate-500 text-center">{x.label}</div>
        </div>
      ))}
    </div>
  );
}

/*
======== Quick wiring for RSVP backend (Next.js) =========
// app/api/rsvp/route.ts (App Router)
export async function POST(req: Request){
  const data = await req.json();
  // TODO: validate + store
  // Example: send email via Resend; store in Airtable/Supabase/Google Sheets
  return new Response(JSON.stringify({ok:true}), {status: 200});
}

// pages/api/rsvp.ts (Pages Router)
import type { NextApiRequest, NextApiResponse } from 'next'
export default async function handler(req: NextApiRequest, res: NextApiResponse){
  if(req.method !== 'POST') return res.status(405).end();
  const data = req.body; // validate + store
  return res.status(200).json({ok:true});
}
=========================================================
*/

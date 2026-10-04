import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, Palette, Flame, Smile, Stethoscope, Coffee } from 'lucide-react';
import { sfx } from '../utils/audio.ts';

interface QualityItem {
  number: string;
  icon: React.ReactNode;
  tag: string;
  title: string;
  hindiTitle: string;
  badge: string;
  description: string;
  accentBg: string;
  borderColor: string;
  tagColor: string;
}

const QUALITIES: QualityItem[] = [
  {
    number: '01',
    icon: <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 text-amber-700" />,
    tag: 'Diary & Snap Story',
    title: 'Diary Ki Lines & Snap Story Vibes 📖',
    hindiTitle: 'Jo dil me aaya, seedha snap story pe!',
    badge: 'Secret Poetess',
    description:
      'Tumhari sabse iconic aadat! Diary me jo bhi deep thoughts, English quotes ya heartfelt poetry likhti ho, woh sab seedha aesthetic background ke sath Snapchat story pe post ho jata hai. Tumhari snap stories padh ke din ban jata hai — genuinely thoughtful, deep, and so uniquely you.',
    accentBg: 'bg-amber-50/70',
    borderColor: 'border-amber-200/80',
    tagColor: 'text-amber-800'
  },
  {
    number: '02',
    icon: <Palette className="h-5 w-5 sm:h-6 sm:w-6 text-rose-700" />,
    tag: 'Colors & Canvas',
    title: 'The Aesthetic Art & Painting Mind 🎨',
    hindiTitle: 'Art aur painting ka junoon',
    badge: 'Creative Soul',
    description:
      'Colors, sketchbooks, aur tumhara creative vision. Tum jab kisi painting ke baare me sochti ho ya canvas pe rang bikherti ho, ek alag hi sukoon dikhta hai. You have an eye for beauty that turns ordinary things into aesthetic masterpieces.',
    accentBg: 'bg-rose-50/70',
    borderColor: 'border-rose-200/80',
    tagColor: 'text-rose-800'
  },
  {
    number: '03',
    icon: <Flame className="h-5 w-5 sm:h-6 sm:w-6 text-orange-700" />,
    tag: 'Pep-Talk Master',
    title: 'The Ultimate Motivator In The Room 🌟',
    hindiTitle: 'Dil se himmat badhane wali dost',
    badge: 'Pure Energy',
    description:
      'Jab bhi lagta hai sab messy ho raha hai ya energy low hai, tumhara ek voice note ya ek pep-talk sab theek kar deta hai. Tum jis tareeqe se motivate karti ho na, seedha confidence wapas aa jata hai. A friend who genuinely wants everyone to win.',
    accentBg: 'bg-orange-50/70',
    borderColor: 'border-orange-200/80',
    tagColor: 'text-orange-800'
  },
  {
    number: '04',
    icon: <Smile className="h-5 w-5 sm:h-6 sm:w-6 text-pink-700" />,
    tag: 'Pure Comfort',
    title: 'Effortlessly Cool & Friendly Vibe ✨',
    hindiTitle: 'Bilauti 🐱 ka unmatched charm',
    badge: 'Bilauti 🐱',
    description:
      'No attitude, no formalities, bas 100% genuine warmth. Tumse koi paanch minute baat kare toh instantly comfortable feel karta hai. That chill Bilauti 🐱 energy, cute laughter, and welcoming vibe makes you everyone’s favorite person to talk to.',
    accentBg: 'bg-pink-50/70',
    borderColor: 'border-pink-200/80',
    tagColor: 'text-pink-800'
  },
  {
    number: '05',
    icon: <Coffee className="h-5 w-5 sm:h-6 sm:w-6 text-amber-800" />,
    tag: 'Chai Enthusiast',
    title: 'Garma-Garam Chai Lover ☕',
    hindiTitle: 'Chai ke bina Navi adhuri hai!',
    badge: 'Chai Queen ☕',
    description:
      'Chai is literally pure emotion for Navi! Chahe late night NEET biology preparation ho, ya diary me deep English poetry likhna ho — bas ek cup garma-garam chai mil jaye aur Navi ka din 100% sorted ho jata hai. Fuel for the soul!',
    accentBg: 'bg-amber-100/60',
    borderColor: 'border-amber-300/80',
    tagColor: 'text-amber-900'
  },
  {
    number: '06',
    icon: <Stethoscope className="h-5 w-5 sm:h-6 sm:w-6 text-teal-700" />,
    tag: 'Dr. Navi Loading',
    title: 'Future Doctor & NEET Warrior 🩺',
    hindiTitle: 'Sapna: White coat & stethoscope',
    badge: 'Destined to Heal',
    description:
      'NEET ki prep, late night study sessions, NCERT ke highlights, biology ke diagrams... We see your silent dedication every single day. Trust me, woh din door nahi jab tumhare naam ke aage officially "Dr. Navi" likha hoga, and you will be treating people with that same kind heart!',
    accentBg: 'bg-teal-50/70',
    borderColor: 'border-teal-200/80',
    tagColor: 'text-teal-800'
  }
];

export const SpecialQualities: React.FC = () => {
  return (
    <section id="qualities" className="relative py-20 sm:py-28 px-4 bg-[#FFF5F7] border-y border-pink-100">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-14 sm:mb-18">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-wider uppercase text-pink-700 mb-2">
            <span>Special Things About Navi</span>
            <span aria-hidden="true">·</span>
            <span>Little Moments We Love</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900 tracking-tight text-balance mb-3">
            What Makes You So Special 🌸
          </h2>
          <p className="text-stone-600 text-xs sm:text-base leading-relaxed text-balance px-2">
            Woh choti choti baatein aur aadat jo hum sab hamesha notice karte hain!
          </p>
        </div>

        {/* Quality Cards Stack - Phone Optimized */}
        <div className="space-y-5 sm:space-y-6">
          {QUALITIES.map((q, idx) => (
            <motion.div
              key={q.number}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{
                duration: 0.45,
                delay: idx * 0.08,
                type: 'spring',
                stiffness: 130,
                damping: 15
              }}
              whileHover={{
                scale: 1.015,
                transition: { duration: 0.2 }
              }}
              onMouseEnter={() => sfx.playPop()}
              className={`relative overflow-hidden rounded-2xl sm:rounded-3xl p-5 sm:p-7 bg-white border ${q.borderColor} shadow-xs hover:shadow-md transition-shadow`}
            >
              <div className="flex items-start gap-4 sm:gap-6">
                {/* Left Number & Icon */}
                <div className="flex flex-col items-center gap-2 shrink-0">
                  <div className={`w-11 h-11 sm:w-13 sm:h-13 rounded-2xl ${q.accentBg} flex items-center justify-center border ${q.borderColor}`}>
                    {q.icon}
                  </div>
                  <span className="font-serif font-black text-lg sm:text-2xl text-stone-300">
                    {q.number}
                  </span>
                </div>

                {/* Content Area */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-1">
                    <span className={`text-[11px] sm:text-xs font-bold uppercase tracking-wider ${q.tagColor}`}>
                      {q.tag}
                    </span>
                    <span className="text-stone-300">·</span>
                    <span className="text-[11px] sm:text-xs text-stone-500 font-medium">
                      {q.hindiTitle}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg sm:text-2xl font-bold text-stone-900 mb-2">
                    {q.title}
                  </h3>

                  <p className="font-sans text-stone-700 text-xs sm:text-base leading-relaxed">
                    {q.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

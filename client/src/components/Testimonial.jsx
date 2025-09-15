import React from "react";
import { assets } from "../assets/assets";
import { BadgeCheck, Twitter } from "lucide-react";

const Testimonial = () => {
  const cardsData = [
    {
      image: assets.sharukh,
      name: "Hakla Sharukh",
      handle: "@haklasharukh",
      date: "April 20, 2025",
      testimonial: "Hehehehehe, Zz.ai kya kamal ki chhez hai",
    },

    {
      image: assets.jonny,
      name: "Doctor Jonny",
      handle: "@doctor",
      date: "June 5, 2025",
      testimonial:
        "Mannn, This AI really helped me with my resume—I’ve worked hard in many jobs",
    },
    {
      image: assets.salmon,
      name: "Salmon Bhai",
      handle: "@wantedbhai",
      date: "May 10, 2025",
      testimonial: "Mujh par ek Ahesaan karna, Zz.ai ko Zarur use karna",
    },
    {
      image: assets.baba,
      name: "BaBa Ramdev",
      handle: "@yogababa",
      date: "May 10, 2025",
      testimonial:
        "AI bhi ek sadhan hai jaise pranayama. Isse apna jeevan aur saral, satvik aur safal banaiye",
    },
  ];

  const CreateCard = ({ card }) => (
    <div className="p-4 rounded-lg mx-4 shadow hover:shadow-lg transition-all duration-200 w-72 shrink-0">
      <div className="flex gap-2">
        <img
          className="size-11 rounded-full"
          src={card.image}
          alt="User Image"
        />
        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <p>{card.name}</p>
            <BadgeCheck size={14} className="text-sky-500" />
          </div>
          <span className="text-xs text-slate-500">{card.handle}</span>
        </div>
      </div>
      <p className="text-sm py-4 text-gray-800">{card.testimonial}</p>
      <div className="flex items-center justify-between text-slate-500 text-xs">
        <div className="flex items-center gap-1">
          <span>Posted on</span>
          <a
            href="https://x.com"
            target="_blank"
            className="hover:text-sky-500"
          >
            <Twitter size={12} className="text-slate-500 hover:text-sky-500" />
          </a>
        </div>
        <p>{card.date}</p>
      </div>
    </div>
  );

  return (
    <>
      {/* Headline */}
      <div className="max-w-2xl mx-auto text-center mb-10 sm:mt-10 mt-2">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          What Our Users Say
        </h1>
        <p className="text-sm md:text-base text-gray-700 mt-2">
          Hear from professionals who boosted their skills and careers with our
          AI tools.
        </p>
      </div>

      {/* Row 1 */}
      <div className="marquee-row w-full mx-auto max-w-6xl overflow-hidden relative">
        <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent"></div>
        <div className="marquee-inner flex transform-gpu min-w-[200%] pt-10 pb-5">
          {[...cardsData, ...cardsData].map((card, index) => (
            <CreateCard key={index} card={card} />
          ))}
        </div>
        <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent"></div>
      </div>

      {/* Row 2 reversed  */}
      <div className="marquee-row w-full mx-auto max-w-6xl overflow-hidden relative mt-6">
        <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent"></div>
        <div className="marquee-inner marquee-reverse flex transform-gpu min-w-[200%] pt-10 pb-5">
          {[...cardsData.slice().reverse(), ...cardsData.slice().reverse()].map(
            (card, index) => (
              <CreateCard key={index} card={card} />
            )
          )}
        </div>
        <div  className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent"></div>
      </div>

      {/* Styles */}
      <style>{`
    @keyframes marqueeScroll {
      0% { transform: translateX(0%); }
      100% { transform: translateX(-50%); }
    }

    @media (max-width: 768px) {
      @keyframes marqueeScroll {
        0% { transform: translateX(0%); }
        100% { transform: translateX(-200%); } /* Scroll more on small screens */
      }
    }

    .marquee-inner {
      animation: marqueeScroll 25s linear infinite;
    }

    .marquee-reverse {
      animation-direction: reverse;
    }

    @media (max-width: 768px) {
      .marquee-inner {
        animation-duration: 20s;
      }
      .marquee-reverse {
        animation-duration: 15s;
      }
    }
  `}</style>
    </>
  );
};

export default Testimonial;

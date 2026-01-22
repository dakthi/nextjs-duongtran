import {
  FaceSmileIcon,
  ChartBarSquareIcon,
  CursorArrowRaysIcon,
  DevicePhoneMobileIcon,
  AdjustmentsHorizontalIcon,
  SunIcon,
} from "@heroicons/react/24/solid";

import { legacyMediaUrl } from "@/lib/media/media-client";

const heroImg = legacyMediaUrl('/img/duong-tran-hero.jpg');
const benefitOneImg = legacyMediaUrl('/img/duong-tran-hero.jpg');
const benefitTwoImg = legacyMediaUrl('/img/duong-tran-hero.jpg');

export const heroData = {
  title: "Your Journey to Success Starts Here",
  description1: `Whether you're dreaming of studying abroad, preparing for university applications, or seeking career direction — I'm here to guide you every step of the way.`,
  description2: `With personalized mentoring, I help you build real skills, craft compelling applications, and develop the confidence to pursue your dreams.`,
  image: heroImg,
  ctaLink: "/contact",
  ctaText: "Start Your Journey",
};

const benefitOne = {
  title: "Personalized Guidance for Your Unique Path",
  desc: "Every student is different. I take the time to understand your goals, strengths, and dreams to create a tailored roadmap for your success.",
  image: benefitOneImg,
  bullets: [
    {
      title: "University Application Support",
      desc: "From choosing the right universities to crafting standout personal statements, I guide you through the entire application process with confidence.",
      icon: <FaceSmileIcon />,
    },
    {
      title: "Scholarship & Financial Aid Consulting",
      desc: "Navigate the complex world of scholarships and financial aid. I help you identify opportunities and present your best self to selection committees.",
      icon: <ChartBarSquareIcon />,
    },
    {
      title: "Study Abroad Preparation",
      desc: "Dreaming of studying overseas? I'll help you prepare academically, culturally, and emotionally for your international education journey.",
      icon: <CursorArrowRaysIcon />,
    },
  ],
};

const benefitTwo = {
  title: "Beyond Applications: Building Your Future",
  desc: "Success isn't just about getting into university — it's about developing the skills and mindset to thrive throughout your career.",
  image: benefitTwoImg,
  bullets: [
    {
      title: "Career Coaching & Planning",
      desc: "Unsure about your career path? Let's explore your interests, skills, and market opportunities to chart a fulfilling professional journey.",
      icon: <DevicePhoneMobileIcon />,
    },
    {
      title: "Personal Development & Confidence",
      desc: "Build the soft skills, communication abilities, and self-confidence that will serve you throughout your academic and professional life.",
      icon: <AdjustmentsHorizontalIcon />,
    },
    {
      title: "Ongoing Mentorship & Support",
      desc: "Your success is my success. I'm here for you not just during applications, but as you navigate university life and early career decisions.",
      icon: <SunIcon />,
    },
  ],
};

export { benefitOne, benefitTwo };

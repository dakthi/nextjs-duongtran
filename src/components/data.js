import {
  FaceSmileIcon,
  ChartBarSquareIcon,
  CursorArrowRaysIcon,
  DevicePhoneMobileIcon,
  AdjustmentsHorizontalIcon,
  SunIcon,
} from "@heroicons/react/24/solid";

import { legacyMediaUrl } from "@/lib/media/media-client";

const heroImg = legacyMediaUrl('/img/lieu-barbican.jpg');
const benefitOneImg = legacyMediaUrl('/img/lieu-liv-street.jpg');
const benefitTwoImg = legacyMediaUrl('/img/lieu-vietnam.jpg');

export const heroData = {
  title: "Your business deserves numbers you can trust",
  description1: `I do more than balance books. I help businesses save money, stay compliant, and focus on what truly matters: growth, family, and peace of mind.`,
  description2: `Accounting is not just numbers. it's trust, it's care, it's supporting your journey to live a better and freer life.`,
  image: heroImg,
  ctaLink: "/contact",
  ctaText: "Talk to me",
};

const benefitOne = {
  title: "Driven by care, backed by results",
  desc: "I care about more than just your business figures. I care about your peace of mind, your family, and your ability to focus on the parts of life that truly matter.",
  image: benefitOneImg,
  bullets: [
    {
      title: "Practical and professional",
      desc: "Over 2 years of experience serving SMEs across London, from VAT returns to full-cycle financial reporting, with the right mix of precision and understanding.",
      icon: <FaceSmileIcon />,
    },
    {
      title: "Problem-solver at heart",
      desc: "I have helped clients recover thousands of pounds through strategic tax reviews and process improvements, saving time and reducing stress.",
      icon: <ChartBarSquareIcon />,
    },
    {
      title: "Trusted by clients, respected by colleagues",
      desc: "Through communication, care, and results, I build strong client relationships and mentor junior team members to uphold the same high standards.",
      icon: <CursorArrowRaysIcon />,
    },
  ],
};

const benefitTwo = {
  title: "Efficiency that lets you breathe easier",
  desc: "Work should be smarter, not harder. I constantly optimise workflows so you spend less time worrying about compliance and more time building your dreams.",
  image: benefitTwoImg,
  bullets: [
    {
      title: "Cutting through complexity",
      desc: "From payroll for 200+ clients to monthly VAT for 13+ companies, I streamline the numbers so you can focus on your real priorities.",
      icon: <DevicePhoneMobileIcon />,
    },
    {
      title: "Designed for growth",
      desc: "I create templates, improve systems, and share best practices, helping businesses become more efficient, agile, and ready for what's next.",
      icon: <AdjustmentsHorizontalIcon />,
    },
    {
      title: "Technology that serves people",
      desc: "Automation and optimisation are powerful, but the heart of business is human. I use tech to make life easier, not to replace personal connection.",
      icon: <SunIcon />,
    },
  ],
};

export { benefitOne, benefitTwo };

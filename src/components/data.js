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
  title: "I streamline and automate, so there is more time to listen to you",
  desc: "AI, contrary to what some may think, might be the secret sauce that accounting industry have been waiting for so long. It saves my time, so I can focus on what matters the most, you, your business and your story.",
  image: benefitOneImg,
  bullets: [
    {
      title: "Streamlined process means higher accuracy",
      desc: "By standardising the team finely and intricately honed procedures over the years, it helps us see the bigger picture and fix bottleneck and improve accuracy among all phases.",
      icon: <FaceSmileIcon />,
    },
    {
      title: "Automation means less human errors in mundane tasks",
      desc: "Instead of spending 3 hours typing VAT invoices into spreadsheets, AI agents now do that in 3 minutes, and our team spend the rest of the 3 hours checking it, spotting more anomalies and accounting risks.",
      icon: <ChartBarSquareIcon />,
    },
    {
      title: "Innovation means you benefit more everyday",
      desc: "Every single day, we look at our playbook and think \"is there a better way to do this?\", \"can it be easier for the clients?\". As a result, working with accountants become more and more pleasant and strategic, instead of pedantic.",
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

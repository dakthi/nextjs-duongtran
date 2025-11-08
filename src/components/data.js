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
      desc: "By standardising the finely and intricately honed procedures our team has developed over the years, it helps us see the bigger picture, fix bottlenecks and improve accuracy across all phases.",
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
  title: "I listen attentively, and understand empathically",
  desc: "Accounting should be less about technical stuff and more about the visionary and strategic aspects of you and your business.",
  image: benefitTwoImg,
  bullets: [
    {
      title: "Empathy is what makes a great accountant I believe",
      desc: "Not putting themselves in a client's shoes, accountants would never truly be able to make meaningful and valuable advice, because they don't understand how it feels, and what's good, what's not.",
      icon: <DevicePhoneMobileIcon />,
    },
    {
      title: "Always with you in mind, every process, each tax return",
      desc: "Sometimes things would take more time for us to explain, but it is crucial for you to understand. We value the latter much more.",
      icon: <AdjustmentsHorizontalIcon />,
    },
    {
      title: "It's about helping people",
      desc: "I nearly became a doctor just because I wanted to help people. As an accountant, the means is different but the end is the same. So whatever it takes to head in that direction.",
      icon: <SunIcon />,
    },
  ],
};

export { benefitOne, benefitTwo };

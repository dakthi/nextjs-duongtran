import { legacyMediaUrl } from "@/lib/media/media-client";

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  date: string;
  relationship: string;
  image: string;
  body: string[];
}

export const testimonials: Testimonial[] = [
  {
    id: "james-price",
    name: "James Price",
    role: "Creative Industries Accounts Assistant",
    date: "June 2025",
    relationship: "Worked with Lieu on the same team",
    image: legacyMediaUrl('/img/testimonials/james-price.jpeg'),
    body: [
      "Lieu is a talented and ambitious woman with a range of skills spanning the full spectrum of accountancy. During my time working alongside her, I benefited greatly from her guidance - especially in developing my technical knowledge.",
      "She is kind, helpful, and extremely skilled. Her attention to detail is exceptional, and she consistently produces work of the highest standard. Lieu communicates complex information clearly to both internal teams and external clients - even those with no background in finance.",
      "She's always learning, always improving, and actively drives positive change in the workplace. I've seen firsthand how her programming and automation skills have saved time and made our processes far more efficient.",
      "I would not hesitate to recommend her to any future employer. She's a brilliant asset to any team.",
    ],
  },
  {
    id: "duc-nguyen",
    name: "Duc Nguyen",
    role: "Accounts Assistant, MSc FinTech '24",
    date: "May 2025",
    relationship: "Reported directly to Lieu",
    image: legacyMediaUrl('/img/testimonials/duc-nguyen.jpeg'),
    body: [
      "I've learned so much from working with Lieu. She has excellent technical knowledge - especially around tax - and her work is always detailed, organised, and deeply trusted by clients.",
      "What stands out most is her supportive nature and calm, practical problem-solving. No matter how busy things get, she always takes time to help the team.",
      "On top of that, she's built automation tools that save us a huge amount of time. Her ability to combine deep expertise with efficiency is rare - she's someone you can learn a lot from, and she's a true asset to any team.",
    ],
  },
];

import { legacyMediaUrl } from '@/lib/media/media-client'

export interface TestimonialFallback {
  id: string
  name: string
  role?: string
  dateLabel?: string
  relationship?: string
  image?: string
  body: string[]
}

export const testimonials: TestimonialFallback[] = [
  {
    id: 'student-1',
    name: 'Minh Anh',
    role: 'University Student',
    dateLabel: '2024',
    relationship: 'Mentee',
    image: legacyMediaUrl('/img/Portrait_Placeholder.png'),
    body: [
      'Duong helped me navigate the overwhelming university application process with patience and expertise. Her guidance on crafting my personal statement made all the difference.',
      'Thanks to her mentorship, I gained the confidence to apply to my dream universities and received multiple offers. She truly cares about each student\'s success.',
    ],
  },
  {
    id: 'student-2',
    name: 'Thanh Hà',
    role: 'Scholarship Recipient',
    dateLabel: '2024',
    relationship: 'Mentee',
    image: legacyMediaUrl('/img/Portrait_Placeholder.png'),
    body: [
      'Working with Duong transformed my scholarship application journey. She helped me identify opportunities I didn\'t know existed and prepared me thoroughly for interviews.',
      'Her practical advice and genuine support gave me the skills and confidence to succeed. I\'m forever grateful for her mentorship.',
    ],
  },
]

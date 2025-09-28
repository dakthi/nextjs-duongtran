import Image from 'next/image'

import { Container } from '@/components/Container'
import { isMediaRemoteUrl, legacyMediaUrl } from '@/lib/media/media-client'
import { listActiveTestimonials, testimonialToView } from '@/lib/testimonial-service'
import type { TestimonialView } from '@/types/testimonial.types'
import { testimonials as fallbackTestimonials } from './testimonialsData'

const mapFallbackToView = (): TestimonialView[] =>
  fallbackTestimonials.map((testimonial, index) => ({
    id: testimonial.id,
    name: testimonial.name,
    role: testimonial.role ?? null,
    relationship: testimonial.relationship ?? null,
    dateLabel: testimonial.dateLabel ?? null,
    content: testimonial.body.join('\n\n'),
    paragraphs: testimonial.body,
    image: testimonial.image ?? legacyMediaUrl('/img/Portrait_Placeholder.png'),
    order: index,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  }))

const resolveTestimonials = async (): Promise<TestimonialView[]> => {
  const records = await listActiveTestimonials()
  if (records.length === 0) {
    return mapFallbackToView()
  }
  return records.map((record) => testimonialToView(record))
}

export const Testimonials = async () => {
  const testimonials = await resolveTestimonials()

  return (
    <Container>
      <div className="grid gap-10 lg:grid-cols-2 xl:grid-cols-3">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="lg:col-span-2 xl:col-auto pl-5 pr-5 xl:p-0"
          >
            <div className="flex flex-col justify-between w-full h-full bg-gray-100 px-14 rounded-2xl py-14">
              <p className="text-2xl leading-normal">
                &ldquo;{testimonial.paragraphs[0]}&rdquo;
              </p>

              <Avatar
                image={testimonial.image}
                name={testimonial.name}
                role={testimonial.role}
                dateLabel={testimonial.dateLabel}
                relationship={testimonial.relationship}
              />
            </div>
          </div>
        ))}
      </div>
    </Container>
  )
}

interface AvatarProps {
  image: string | null
  name: string
  role: string | null
  dateLabel: string | null
  relationship: string | null
}

function Avatar({ image, name, role, dateLabel, relationship }: Readonly<AvatarProps>) {
  const resolvedImage = image ?? legacyMediaUrl('/img/Portrait_Placeholder.png')
  return (
    <div className="flex items-center mt-8 space-x-3">
      <div className="items-center overflow-hidden object-cover rounded-full w-14 h-14 shadow-sm shadow-black">
        <Image
          src={resolvedImage}
          width={56}
          height={56}
          alt={name}
          unoptimized={isMediaRemoteUrl(resolvedImage)}
        />
      </div>
      <div>
        <div className="text-lg font-medium">{name}</div>
        {role && <div className="text-gray-600">{role}</div>}
        {(dateLabel || relationship) && (
          <div className="text-gray-500 text-sm">
            {[dateLabel, relationship].filter(Boolean).join(' · ')}
          </div>
        )}
      </div>
    </div>
  )
}

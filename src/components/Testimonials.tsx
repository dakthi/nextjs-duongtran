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
    imagePosition: null,
    imageZoom: null,
    imageFit: null,
    order: index,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  }))

const resolveTestimonials = async (locale?: string): Promise<TestimonialView[]> => {
  const records = await listActiveTestimonials(locale)
  if (records.length === 0) {
    return mapFallbackToView()
  }
  return records.map((record) => testimonialToView(record))
}

interface TestimonialsProps {
  locale?: string
}

export const Testimonials = async ({ locale }: TestimonialsProps = {}) => {
  const testimonials = await resolveTestimonials(locale)

  return (
    <Container>
      <div className="grid gap-8 lg:grid-cols-2">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="border-2 border-slate-800 bg-amber-50 p-8 shadow-md hover:shadow-xl transition-shadow"
          >
            <div className="flex flex-col justify-between w-full h-full">
              <div className="mb-6">
                <div className="text-6xl text-amber-500 leading-none mb-3">&ldquo;</div>
                <div
                  className="text-base leading-relaxed text-slate-700 italic prose prose-slate max-w-none"
                  dangerouslySetInnerHTML={{ __html: testimonial.content }}
                />
              </div>

              <Avatar
                image={testimonial.image}
                name={testimonial.name}
                role={testimonial.role}
                dateLabel={testimonial.dateLabel}
                relationship={testimonial.relationship}
                imagePosition={testimonial.imagePosition}
                imageZoom={testimonial.imageZoom}
                imageFit={testimonial.imageFit}
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
  imagePosition?: string | null
  imageZoom?: number | null
  imageFit?: string | null
}

function Avatar({ image, name, role, dateLabel, relationship, imagePosition, imageZoom, imageFit }: Readonly<AvatarProps>) {
  const resolvedImage = image ?? legacyMediaUrl('/img/Portrait_Placeholder.png')
  return (
    <div className="flex items-center space-x-4 pt-5 border-t-2 border-amber-500">
      <div className="items-center overflow-hidden object-cover w-14 h-14 border-2 border-slate-800">
        <Image
          src={resolvedImage}
          width={56}
          height={56}
          alt={name}
          unoptimized={isMediaRemoteUrl(resolvedImage)}
          style={{
            objectFit: (imageFit as 'cover' | 'contain' | 'fill') || 'cover',
            objectPosition: imagePosition || 'center',
            transform: `scale(${(imageZoom || 100) / 100})`
          }}
        />
      </div>
      <div>
        <div className="text-base font-bold text-slate-800">{name}</div>
        {role && <div className="text-sm text-slate-600">{role}</div>}
        {(dateLabel || relationship) && (
          <div className="text-xs text-amber-600 font-medium">
            {[dateLabel, relationship].filter(Boolean).join(' · ')}
          </div>
        )}
      </div>
    </div>
  )
}

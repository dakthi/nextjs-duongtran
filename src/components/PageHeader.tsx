import { Container } from '@/components/Container'

interface PageHeaderProps {
  eyebrow?: string
  title: string
  description?: string
}

export const PageHeader = ({ eyebrow, title, description }: PageHeaderProps) => {
  return (
    <div className="relative py-8 rounded-b-3xl overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(/pexels-frostroomhead-16073667.jpg)' }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Content */}
      <Container className="relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {eyebrow && (
            <p className="text-xs font-semibold tracking-widest uppercase text-white bg-jungle-green px-3 py-1 inline-block mb-4 border-2 border-jungle-green shadow-[2px_2px_0px_0px_rgba(64,178,145,1)]">
              {eyebrow}
            </p>
          )}
          <h1 className="text-2xl md:text-4xl font-sans font-bold text-white leading-tight mb-6">
            {title}
          </h1>
          {description && (
            <p className="text-lg font-normal text-outer-space leading-relaxed bg-white/95 backdrop-blur-sm rounded-2xl p-6 inline-block">
              {description}
            </p>
          )}
        </div>
      </Container>
    </div>
  )
}

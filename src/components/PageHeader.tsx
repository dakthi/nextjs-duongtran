import { Container } from '@/components/Container'

interface PageHeaderProps {
  eyebrow?: string
  title: string
  description?: string
}

export const PageHeader = ({ eyebrow, title, description }: PageHeaderProps) => {
  return (
    <div className="bg-warm-cream py-16 md:py-20">
      <Container>
        <div className="max-w-3xl mx-auto text-center">
          {eyebrow && (
            <p className="text-sm font-medium tracking-widest uppercase text-warm-gold mb-4">
              {eyebrow}
            </p>
          )}
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-outer-space leading-tight mb-6">
            {title}
          </h1>
          {description && (
            <p className="text-lg text-feldgrau leading-relaxed max-w-2xl mx-auto">
              {description}
            </p>
          )}
        </div>
      </Container>
    </div>
  )
}

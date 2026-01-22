import { Container } from '@/components/Container'

interface PageHeaderProps {
  eyebrow?: string
  title: string
  description?: string
}

export const PageHeader = ({ eyebrow, title, description }: PageHeaderProps) => {
  return (
    <div className="bg-card py-16 md:py-24">
      <Container>
        <div className="max-w-3xl mx-auto text-center">
          {eyebrow && (
            <p className="text-sm font-medium tracking-widest uppercase text-accent-2 mb-4">
              {eyebrow}
            </p>
          )}
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-fg leading-tight mb-6">
            {title}
          </h1>
          {description && (
            <p className="text-lg text-muted leading-relaxed max-w-2xl mx-auto">
              {description}
            </p>
          )}
        </div>
      </Container>
    </div>
  )
}

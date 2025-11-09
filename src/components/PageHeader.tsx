import { Container } from '@/components/Container'

interface PageHeaderProps {
  eyebrow?: string
  title: string
  description?: string
}

export const PageHeader = ({ eyebrow, title, description }: PageHeaderProps) => {
  return (
    <div className="py-8 bg-white border-b-2 border-jungle-green">
      <Container>
        <div className="max-w-3xl mx-auto text-center">
          {eyebrow && (
            <p className="text-xs font-semibold tracking-widest uppercase text-feldgrau mb-4">
              {eyebrow}
            </p>
          )}
          <h1 className="text-2xl md:text-4xl font-sans font-bold text-outer-space leading-tight mb-6">
            {title}
          </h1>
          {description && (
            <p className="text-lg font-medium text-feldgrau leading-relaxed">
              {description}
            </p>
          )}
        </div>
      </Container>
    </div>
  )
}

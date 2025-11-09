import { mergeAttributes } from '@tiptap/core'
import TiptapImage from '@tiptap/extension-image'

export interface ImageOptions {
  inline: boolean
  allowBase64: boolean
  HTMLAttributes: Record<string, any>
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    customImage: {
      setImage: (options: { src: string; alt?: string; title?: string; width?: string; alignment?: string }) => ReturnType
      updateImageAttributes: (attrs: { width?: string; alignment?: string; alt?: string }) => ReturnType
    }
  }
}

export const CustomImage = TiptapImage.extend<ImageOptions>({
  name: 'customImage',

  addAttributes() {
    return {
      ...this.parent?.(),
      src: {
        default: null,
      },
      alt: {
        default: null,
      },
      title: {
        default: null,
      },
      width: {
        default: '100',
        parseHTML: element => element.getAttribute('data-width') || '100',
        renderHTML: attributes => {
          if (!attributes.width) {
            return {}
          }
          return {
            'data-width': attributes.width,
            style: `width: ${attributes.width}%; max-width: 100%;`,
          }
        },
      },
      alignment: {
        default: 'center',
        parseHTML: element => element.getAttribute('data-alignment') || 'center',
        renderHTML: attributes => {
          if (!attributes.alignment) {
            return {}
          }
          return {
            'data-alignment': attributes.alignment,
          }
        },
      },
    }
  },

  renderHTML({ HTMLAttributes }) {
    const { alignment, ...restAttributes } = HTMLAttributes

    // Apply alignment class
    let alignmentClass = ''
    if (alignment === 'left') {
      alignmentClass = 'float-left mr-4 mb-4'
    } else if (alignment === 'right') {
      alignmentClass = 'float-right ml-4 mb-4'
    } else {
      alignmentClass = 'mx-auto block'
    }

    return [
      'img',
      mergeAttributes(this.options.HTMLAttributes, restAttributes, {
        class: `${alignmentClass} h-auto border-4 border-outer-space shadow-lg my-4`,
      }),
    ]
  },

  addCommands() {
    return {
      ...this.parent?.(),
      setImage: (options: any) => ({ commands }) => {
        // Convert width to string if it's a number (from base Image extension)
        const width = typeof options.width === 'number' ? options.width.toString() : (options.width || '100')

        return commands.insertContent({
          type: this.name,
          attrs: {
            src: options.src,
            alt: options.alt || '',
            title: options.title || '',
            width,
            alignment: options.alignment || 'center',
          },
        })
      },
      updateImageAttributes: (attrs: { width?: string; alignment?: string; alt?: string }) => ({ commands }) => {
        return commands.updateAttributes(this.name, attrs)
      },
    }
  },
})

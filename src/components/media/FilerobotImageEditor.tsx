'use client'

import { useState } from 'react'
import FilerobotImageEditor, { TABS, TOOLS } from 'react-filerobot-image-editor'

interface FilerobotImageEditorDialogProps {
  imageUrl: string
  onComplete: (editedImageBlob: Blob, imageUrl: string) => void
  onCancel: () => void
  aspectRatio?: number
}

export function FilerobotImageEditorDialog({
  imageUrl,
  onComplete,
  onCancel,
  aspectRatio = 16 / 9,
}: FilerobotImageEditorDialogProps) {
  const [isImgEditorShown, setIsImgEditorShown] = useState(true)

  const handleSave = (editedImageObject: any, designState: any) => {
    // Convert the edited image to blob
    fetch(editedImageObject.imageBase64)
      .then(res => res.blob())
      .then(blob => {
        onComplete(blob, editedImageObject.imageBase64)
        setIsImgEditorShown(false)
      })
      .catch(error => {
        console.error('Error converting image:', error)
        alert('Failed to process image')
      })
  }

  const handleClose = () => {
    setIsImgEditorShown(false)
    onCancel()
  }

  if (!isImgEditorShown) return null

  return (
    <FilerobotImageEditor
      source={imageUrl}
      onSave={handleSave}
      onClose={handleClose}
      annotationsCommon={{
        fill: '#f59e0b', // amber-500
      }}
      Text={{ text: 'Add text...' }}
      Rotate={{ angle: 90, componentType: 'slider' }}
      Crop={{
        presetsItems: [
          {
            titleKey: 'original',
            descriptionKey: 'Original',
            ratio: 0, // 0 means free crop without ratio constraint
          },
          {
            titleKey: 'landscape',
            descriptionKey: '16:9',
            ratio: 16 / 9,
          },
          {
            titleKey: 'square',
            descriptionKey: '1:1',
            ratio: 1,
          },
          {
            titleKey: 'portrait',
            descriptionKey: '9:16',
            ratio: 9 / 16,
          },
        ],
        ratio: 0, // Start with free crop (no aspect ratio constraint)
      }}
      tabsIds={[TABS.ADJUST, TABS.ANNOTATE, TABS.FILTERS, TABS.FINETUNE, TABS.RESIZE]}
      defaultTabId={TABS.ADJUST}
      savingPixelRatio={4}
      previewPixelRatio={window.devicePixelRatio || 1}
      theme={{
        palette: {
          'bg-primary': '#ffffff',
          'bg-secondary': '#f8fafc', // slate-50
          'bg-primary-active': '#fffbeb', // amber-50
          'accent-primary': '#f59e0b', // amber-500
          'accent-primary-active': '#fbbf24', // amber-400
          'accent-stateless': '#1e293b', // slate-800
          'txt-primary': '#0f172a', // slate-900
          'txt-secondary': '#334155', // slate-700
          'borders-primary': '#1e293b', // slate-800
          'borders-secondary': '#cbd5e1', // slate-300
          'icons-primary': '#475569', // slate-600
          'icons-secondary': '#94a3b8', // slate-400
        },
        typography: {
          fontFamily: 'Inter, system-ui, sans-serif',
        },
      }}
    />
  )
}

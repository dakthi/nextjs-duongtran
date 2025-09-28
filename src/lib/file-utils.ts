// Utility functions to handle File API compatibility between browser and Node.js

export interface FileData {
  name: string
  size: number
  type: string
  buffer: Buffer
}

export async function extractFileData(file: unknown): Promise<FileData> {
  if (!file || typeof file === 'string') {
    throw new Error('No file provided')
  }

  // Check if it's a file-like object with required methods
  const fileObj = file as any

  if (!fileObj.name || typeof fileObj.size !== 'number') {
    throw new Error('Invalid file object - missing name or size')
  }

  if (!fileObj.arrayBuffer || typeof fileObj.arrayBuffer !== 'function') {
    throw new Error('Invalid file object - missing arrayBuffer method')
  }

  try {
    const arrayBuffer = await fileObj.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    return {
      name: fileObj.name,
      size: fileObj.size,
      type: fileObj.type || 'application/octet-stream',
      buffer
    }
  } catch (error) {
    throw new Error(`Failed to read file data: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

// Alternative check without using instanceof File
export function isValidFileObject(obj: unknown): boolean {
  if (!obj || typeof obj !== 'object') return false

  const fileObj = obj as any
  return (
    typeof fileObj.name === 'string' &&
    typeof fileObj.size === 'number' &&
    typeof fileObj.arrayBuffer === 'function'
  )
}
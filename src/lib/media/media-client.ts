const MEDIA_BASE_URL = (process.env.NEXT_PUBLIC_MEDIA_BASE_URL || process.env.NEXT_PUBLIC_R2_MEDIA_URL || '').replace(/\/$/, '')

const LEGACY_PREFIX = 'legacy'

const isRemote = (value: string) => value.startsWith('http://') || value.startsWith('https://')

export function legacyMediaUrl(localPath: string): string {
  if (!localPath) return localPath
  if (isRemote(localPath)) return localPath

  const normalized = localPath.replace(/^\/+/, '')
  const relative = normalized.startsWith('img/') ? normalized.slice(4) : normalized

  if (!MEDIA_BASE_URL) {
    return `/${normalized}`
  }

  return `${MEDIA_BASE_URL}/${LEGACY_PREFIX}/${relative}`
}

export function optionalLegacyMediaUrl(localPath?: string | null): string | undefined {
  if (!localPath) return undefined
  return legacyMediaUrl(localPath)
}

export function mediaKeyFromLocalPath(localPath: string): string {
  const normalized = localPath.replace(/^\/+/, '')
  const relative = normalized.startsWith('img/') ? normalized.slice(4) : normalized
  return `${LEGACY_PREFIX}/${relative}`
}

export function getMediaBaseUrl(): string | null {
  return MEDIA_BASE_URL || null
}

export function isMediaRemoteUrl(src?: string | null): boolean {
  if (!src) return false
  return isRemote(src)
}

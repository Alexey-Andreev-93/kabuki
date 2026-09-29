// Корректный путь к ассетам с учётом BASE_URL (задан в vite.config.ts)
export function assetPath(src: string): string {
  if (src.startsWith('/')) {
    const base = import.meta.env.BASE_URL || '/'
    const prefix = base.endsWith('/') ? base : base + '/'
    return prefix + src.slice(1)
  }
  return src
}
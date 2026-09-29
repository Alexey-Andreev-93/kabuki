// Корректный путь к ассетам с учётом BASE_URL
export function assetPath(src: string): string {
  if (src.startsWith('/')) {
    const base = (window as any).__vite_asset_base__ || '/'
    const prefix = base.endsWith('/') ? base : base + '/'
    return prefix + src.slice(1)
  }
  return src
}
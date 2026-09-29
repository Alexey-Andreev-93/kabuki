interface TitleCardProps {
  jp: string    // 序幕
  ru: string    // Пролог
  sub?: string  // подзаголовок
  onNext: () => void
}

export default function TitleCard({ jp, ru, sub, onNext }: TitleCardProps) {
  return (
    <div
      style={{
        width: '100vw', height: '100vh', background: '#0a0a0a',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: '24px', cursor: 'pointer',
      }}
      onClick={onNext}
    >
      <div style={{ color: '#cc0000', fontSize: '36px', fontWeight: 'bold', letterSpacing: '0.3em', opacity: 0.6 }}>
        {jp}
      </div>
      <div style={{ width: '60px', height: '1px', background: '#333' }} />
      <div style={{ color: '#eee', fontSize: '32px', letterSpacing: '0.15em' }}>
        {ru}
      </div>
      {sub && (
        <div style={{ color: '#555', fontSize: '14px', letterSpacing: '0.2em', marginTop: '12px' }}>
          {sub}
        </div>
      )}
    </div>
  )
}
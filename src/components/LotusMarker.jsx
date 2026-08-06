import './LotusMarker.css'

function LotusArtwork({ idPrefix }) {
  const gradientId = (name) => `${idPrefix}-${name}`

  return (
    <>
      <defs>
        <linearGradient id={gradientId('coral-up')} x1="50%" y1="100%" x2="50%" y2="0%">
          <stop offset="0%" stopColor="#ffc64a" />
          <stop offset="68%" stopColor="#ffc64a" />
          <stop offset="100%" stopColor="#da5640" />
        </linearGradient>
        <linearGradient id={gradientId('blue-up')} x1="50%" y1="100%" x2="50%" y2="0%">
          <stop offset="0%" stopColor="#ffc64a" />
          <stop offset="68%" stopColor="#ffc64a" />
          <stop offset="100%" stopColor="#396cbf" />
        </linearGradient>
        <linearGradient id={gradientId('pale-up')} x1="50%" y1="100%" x2="50%" y2="0%">
          <stop offset="0%" stopColor="#ffc64a" />
          <stop offset="68%" stopColor="#ffc64a" />
          <stop offset="100%" stopColor="#f5d97f" />
        </linearGradient>
        <linearGradient id={gradientId('violet-up')} x1="50%" y1="100%" x2="50%" y2="0%">
          <stop offset="0%" stopColor="#ffc64a" />
          <stop offset="68%" stopColor="#ffc64a" />
          <stop offset="100%" stopColor="#976fde" />
        </linearGradient>
        <linearGradient id={gradientId('violet-left')} x1="100%" y1="50%" x2="0%" y2="50%">
          <stop offset="0%" stopColor="#ffc64a" />
          <stop offset="68%" stopColor="#ffc64a" />
          <stop offset="100%" stopColor="#976fde" />
        </linearGradient>
        <linearGradient id={gradientId('coral-left')} x1="100%" y1="50%" x2="0%" y2="50%">
          <stop offset="0%" stopColor="#ffc64a" />
          <stop offset="68%" stopColor="#ffc64a" />
          <stop offset="100%" stopColor="#da5640" />
        </linearGradient>
        <linearGradient id={gradientId('blue-right')} x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="#ffc64a" />
          <stop offset="68%" stopColor="#ffc64a" />
          <stop offset="100%" stopColor="#396cbf" />
        </linearGradient>
        <linearGradient id={gradientId('violet-right')} x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="#ffc64a" />
          <stop offset="68%" stopColor="#ffc64a" />
          <stop offset="100%" stopColor="#976fde" />
        </linearGradient>
        <linearGradient id={gradientId('coral-down')} x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#ffc64a" />
          <stop offset="68%" stopColor="#ffc64a" />
          <stop offset="100%" stopColor="#da5640" />
        </linearGradient>
      </defs>

      <path className="lotus-marker__petal" fill={`url(#${gradientId('pale-up')})`} d="M48 4C37 16 36 31 48 47 60 31 59 16 48 4Z" />
      <path className="lotus-marker__petal" fill={`url(#${gradientId('coral-up')})`} d="M30 10C20 23 22 39 41 51 41 32 37 18 30 10Z" />
      <path className="lotus-marker__petal" fill={`url(#${gradientId('violet-up')})`} d="M66 10C76 23 74 39 55 51 55 32 59 18 66 10Z" />
      <path className="lotus-marker__petal" fill={`url(#${gradientId('blue-up')})`} d="M13 21C11 36 21 48 39 54 35 38 26 27 13 21Z" />
      <path className="lotus-marker__petal" fill={`url(#${gradientId('pale-up')})`} d="M83 21C85 36 75 48 57 54 61 38 70 27 83 21Z" />
      <path className="lotus-marker__petal" fill={`url(#${gradientId('blue-up')})`} d="M48 17C35 31 34 48 48 61 62 48 61 31 48 17Z" />
      <path className="lotus-marker__petal" fill={`url(#${gradientId('pale-up')})`} d="M26 27C23 43 32 55 46 60 43 43 35 32 26 27Z" />
      <path className="lotus-marker__petal" fill={`url(#${gradientId('coral-up')})`} d="M70 27C73 43 64 55 50 60 53 43 61 32 70 27Z" />
      <path className="lotus-marker__petal" fill={`url(#${gradientId('violet-left')})`} d="M4 45C16 37 30 41 45 59 27 62 13 57 4 45Z" />
      <path className="lotus-marker__petal" fill={`url(#${gradientId('blue-right')})`} d="M92 45C80 37 66 41 51 59 69 62 83 57 92 45Z" />
      <path className="lotus-marker__petal" fill={`url(#${gradientId('coral-left')})`} d="M17 57C29 48 40 51 48 61 35 70 23 68 17 57Z" />
      <path className="lotus-marker__petal" fill={`url(#${gradientId('violet-right')})`} d="M79 57C67 48 56 51 48 61 61 70 73 68 79 57Z" />
      <path className="lotus-marker__petal" fill={`url(#${gradientId('coral-down')})`} d="M48 59C39 65 40 75 48 79 56 75 57 65 48 59Z" />

      <g className="lotus-marker__veins">
        <path d="M48 8c-2 14-2 26 0 38M31 15c2 13 6 24 10 34M65 15c-2 13-6 24-10 34" />
        <path d="M16 25c8 9 15 18 22 27M80 25c-8 9-15 18-22 27M48 22v36" />
        <path d="M9 46c14 2 25 6 34 12M87 46c-14 2-25 6-34 12" />
        <path d="M22 57c8 1 16 2 23 4M74 57c-8 1-16 2-23 4M48 63v12" />
      </g>
      <circle className="lotus-marker__heart" cx="48" cy="59" r="3.2" />
    </>
  )
}

function LotusMarker({ className = '', idPrefix = 'lotus' }) {
  return (
    <span className={`lotus-marker ${className}`.trim()}>
      <svg className="lotus-marker__art" viewBox="0 0 96 80" aria-hidden="true" focusable="false">
        <LotusArtwork idPrefix={idPrefix} />
      </svg>
    </span>
  )
}

export { LotusArtwork }
export default LotusMarker

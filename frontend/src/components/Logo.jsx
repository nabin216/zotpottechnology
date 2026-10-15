import { useId } from 'react'

// ZotPot mark: a geometric "Z" with a light-green "pixel" accent.
// Keep in sync with public/favicon.svg.
function Logo({ size = 32 }) {
  const gradientId = `zotpot-logo-${useId()}`
  return (
    <svg
      className="logo-mark"
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
    >
      <rect width="32" height="32" rx="8" fill={`url(#${gradientId})`} />
      <path d="M8.5 8h15v3.6L13.3 20.4h6.2V24h-11v-3.6L18.7 11.6H8.5z" fill="#ffffff" />
      <rect x="20.9" y="20.4" width="3.6" height="3.6" rx="1" fill="#a6e3a1" />
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2f8a55" />
          <stop offset="1" stopColor="#173a27" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export default Logo

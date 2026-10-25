import { useRef } from 'react'

// Lightweight graphics for the home page: inline SVG and CSS only, so they
// prerender, load instantly and need no image files.

// Tilts its children in 3D towards the pointer. Static (but still angled)
// for touch screens and visitors who prefer reduced motion.
export function TiltStage({ children, className = '' }) {
  const ref = useRef(null)

  const onMove = (e) => {
    const el = ref.current
    if (!el || e.pointerType !== 'mouse') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    el.style.setProperty('--ry', `${(x * 14 - 8).toFixed(2)}deg`)
    el.style.setProperty('--rx', `${(4 - y * 10).toFixed(2)}deg`)
  }
  const onLeave = () => {
    ref.current?.style.removeProperty('--ry')
    ref.current?.style.removeProperty('--rx')
  }

  return (
    <div className={`tilt-scene ${className}`} onPointerMove={onMove} onPointerLeave={onLeave}>
      <div className="tilt-stage" ref={ref}>{children}</div>
    </div>
  )
}

const flowIcons = {
  message: <path d="M5 6h14a2 2 0 012 2v7a2 2 0 01-2 2h-6l-4 3v-3H5a2 2 0 01-2-2V8a2 2 0 012-2z" />,
  spark: <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM18 15l.8 2.2L21 18l-2.2.8L18 21l-.8-2.2L15 18l2.2-.8z" />,
  calendar: <><rect x="3.5" y="5" width="17" height="15" rx="2.5" /><path d="M3.5 10h17M8 3v4M16 3v4M8.5 14.5l2 2 4-4" /></>,
  bell: <path d="M6 16V11a6 6 0 1112 0v5l1.5 2h-15zM10 20.5a2 2 0 004 0" />,
  star: <path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8L3.5 9.7l5.9-.9z" />,
  tag: <><path d="M3.5 12.5V5a1.5 1.5 0 011.5-1.5h7.5l8 8a1.5 1.5 0 010 2.1l-7.4 7.4a1.5 1.5 0 01-2.1 0z" /><circle cx="8" cy="8" r="1.5" /></>,
  key: <><circle cx="8" cy="15" r="4.5" /><path d="M11.2 11.8L20 3M16 7l3 3M18 5l2 2" /></>,
  life: <><circle cx="12" cy="12" r="8.5" /><circle cx="12" cy="12" r="3.5" /><path d="M5.9 5.9l3.6 3.6M14.5 14.5l3.6 3.6M18.1 5.9l-3.6 3.6M9.5 14.5l-3.6 3.6" /></>,
  shield: <><path d="M12 3l7.5 3v5.5c0 4.6-3.2 8.2-7.5 9.5-4.3-1.3-7.5-4.9-7.5-9.5V6z" /><path d="M8.5 12l2.5 2.5 4.5-5" /></>,
}

export function FlowIcon({ name }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {flowIcons[name]}
    </svg>
  )
}

// One enquiry, handled end to end without anyone touching it.
const flowSteps = [
  { icon: 'message', title: 'New enquiry', note: 'WhatsApp, web or missed call' },
  { icon: 'spark', title: 'AI replies', note: 'In seconds, day or night' },
  { icon: 'calendar', title: 'Slot booked', note: 'Straight into your diary' },
  { icon: 'bell', title: 'Reminder sent', note: 'The day before' },
  { icon: 'star', title: 'Review asked', note: 'After the visit' },
]

export function AutomationFlow() {
  return (
    <ol className="flow" aria-label="How an automated enquiry is handled">
      {flowSteps.map((s, i) => (
        <li className="flow-step" key={s.title} style={{ '--i': i }}>
          <span className="flow-node"><FlowIcon name={s.icon} /></span>
          <span className="flow-text">
            <strong>{s.title}</strong>
            <small>{s.note}</small>
          </span>
        </li>
      ))}
    </ol>
  )
}

// Small illustration for each business line on the home page.
export function LineArt({ id }) {
  if (id === 'websites') {
    return (
      <svg className="line-art" viewBox="0 0 220 150" aria-hidden="true">
        <rect x="10" y="12" width="200" height="126" rx="12" fill="#fff" stroke="#e2e9e0" />
        <rect x="10" y="12" width="200" height="22" rx="12" fill="#f3f5f1" />
        <circle cx="26" cy="23" r="3.5" fill="#e2786c" /><circle cx="38" cy="23" r="3.5" fill="#e9b949" /><circle cx="50" cy="23" r="3.5" fill="#6cc070" />
        <rect x="26" y="50" width="86" height="10" rx="5" fill="#1a3a28" />
        <rect x="26" y="66" width="64" height="10" rx="5" fill="#1a3a28" />
        <rect x="26" y="84" width="76" height="6" rx="3" fill="#dfe6e0" />
        <rect x="26" y="100" width="48" height="16" rx="6" fill="#2c7a4b" />
        <rect x="126" y="48" width="70" height="70" rx="10" fill="#8cc898" />
        <circle cx="172" cy="68" r="10" fill="#fff" opacity=".6" />
        <path d="M126 108l22-22 16 14 12-10 20 18v10h-70z" fill="#2c7a4b" />
      </svg>
    )
  }
  if (id === 'software') {
    return (
      <svg className="line-art" viewBox="0 0 220 150" aria-hidden="true">
        <path className="line-art-wire" d="M50 40 C90 40 90 75 110 75 M110 75 C130 75 130 40 170 40 M110 75 C130 75 130 112 170 112 M50 112 C90 112 90 75 110 75" fill="none" stroke="#8cc898" strokeWidth="2.5" strokeDasharray="5 6" />
        <rect x="18" y="24" width="56" height="32" rx="9" fill="#fff" stroke="#e2e9e0" />
        <rect x="18" y="96" width="56" height="32" rx="9" fill="#fff" stroke="#e2e9e0" />
        <rect x="146" y="24" width="56" height="32" rx="9" fill="#fff" stroke="#e2e9e0" />
        <rect x="146" y="96" width="56" height="32" rx="9" fill="#fff" stroke="#e2e9e0" />
        <rect x="28" y="36" width="36" height="8" rx="4" fill="#6366f1" opacity=".7" />
        <rect x="28" y="108" width="28" height="8" rx="4" fill="#d97706" opacity=".7" />
        <rect x="156" y="36" width="30" height="8" rx="4" fill="#2c7a4b" opacity=".7" />
        <rect x="156" y="108" width="36" height="8" rx="4" fill="#0ea5e9" opacity=".7" />
        <circle cx="110" cy="75" r="24" fill="#1a3a28" />
        <path d="M110 62l3 8.6 8.6 3-8.6 3-3 8.6-3-8.6-8.6-3 8.6-3z" fill="#8cc898" />
      </svg>
    )
  }
  return (
    <svg className="line-art" viewBox="0 0 220 150" aria-hidden="true">
      <rect x="10" y="12" width="200" height="126" rx="12" fill="#fff" stroke="#e2e9e0" />
      <path d="M30 118h160" stroke="#e2e9e0" strokeWidth="2" />
      {[34, 52, 70, 88, 104].map((h, i) => (
        <rect className="line-art-bar" key={h} x={40 + i * 30} y={118 - h * 0.8} width="18" height={h * 0.8} rx="4" fill={i === 4 ? '#2c7a4b' : '#8cc898'} style={{ '--i': i }} />
      ))}
      <path d="M44 96 L74 84 L104 70 L134 58 L166 34" fill="none" stroke="#1a3a28" strokeWidth="3" strokeLinecap="round" />
      <circle cx="166" cy="34" r="6" fill="#1a3a28" />
    </svg>
  )
}

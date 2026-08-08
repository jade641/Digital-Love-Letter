import { useState, useMemo, useCallback, useEffect, useRef } from 'react'

// ─── Seeded RNG ───────────────────────────────────────────────────────────────
function makeRng(seed: number) {
  let s = seed
  return () => {
    s = (Math.imul(1664525, s) + 1013904223) >>> 0
    return s / 4294967296
  }
}

// ─── Floating Particles ───────────────────────────────────────────────────────
function FloatingParticles({
  count = 20,
  emojis = ['❤️', '🩷', '✨'],
  seed = 1,
}: {
  count?: number
  emojis?: string[]
  seed?: number
}) {
  const particles = useMemo(() => {
    const r = makeRng(seed)
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      emoji: emojis[Math.floor(r() * emojis.length)],
      left: r() * 95 + 2,
      delay: r() * 14,
      duration: 10 + r() * 14,
      size: 12 + r() * 22,
      opacity: 0.2 + r() * 0.45,
    }))
  }, [count, seed])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <span
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.left}%`,
            bottom: '-8%',
            fontSize: `${p.size}px`,
            opacity: p.opacity,
            animation: `floatUp ${p.duration}s ${p.delay}s infinite ease-in-out`,
            ['--po' as string]: p.opacity,
          }}
        >
          {p.emoji}
        </span>
      ))}
    </div>
  )
}

// ─── Sparkle Stars ────────────────────────────────────────────────────────────
function Sparkles({ count = 40, seed = 7 }: { count?: number; seed?: number }) {
  const stars = useMemo(() => {
    const r = makeRng(seed)
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: r() * 100,
      top: r() * 100,
      size: 2 + r() * 4.5,
      delay: r() * 6,
      duration: 1.6 + r() * 3.2,
      color: r() > 0.5 ? '#fff8b0' : '#ffd6e7',
    }))
  }, [count, seed])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((s) => (
        <div
          key={s.id}
          className="absolute rounded-full"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            background: `radial-gradient(circle, ${s.color}, transparent)`,
            animation: `twinkle ${s.duration}s ${s.delay}s infinite ease-in-out`,
          }}
        />
      ))}
    </div>
  )
}

// ─── Confetti ─────────────────────────────────────────────────────────────────
function Confetti({ active }: { active: boolean }) {
  const pieces = useMemo(() => {
    const r = makeRng(303)
    const colors = ['#ff85a1', '#ffd700', '#c77dff', '#ff6b9d', '#ffb3c6', '#e0aaff', '#ffe066', '#fff']
    return Array.from({ length: 100 }, (_, i) => ({
      id: i,
      left: r() * 100,
      color: colors[Math.floor(r() * colors.length)],
      delay: r() * 2.5,
      duration: 2.5 + r() * 2,
      size: 6 + r() * 10,
      round: r() > 0.5,
    }))
  }, [])

  if (!active) return null
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-50">
      {pieces.map((p) => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.left}%`,
            top: '-20px',
            width: p.round ? `${p.size}px` : `${p.size * 0.55}px`,
            height: p.round ? `${p.size}px` : `${p.size * 1.3}px`,
            background: p.color,
            borderRadius: p.round ? '50%' : '2px',
            animation: `confettiFall ${p.duration}s ${p.delay}s forwards ease-in`,
          }}
        />
      ))}
    </div>
  )
}

// ─── Scene 1 — Welcome ───────────────────────────────────────────────────────
function Scene1Welcome({ onNext }: { onNext: () => void }) {
  return (
    <div
      className="relative w-full h-full flex items-center justify-center overflow-hidden"
      style={{
        background:
          'radial-gradient(ellipse at 28% 18%, #fce4ec 0%, transparent 55%), ' +
          'radial-gradient(ellipse at 72% 82%, #e8d5f5 0%, transparent 55%), ' +
          'radial-gradient(ellipse at 50% 50%, #fff5f8 0%, #fdeef5 100%)',
      }}
    >
      <FloatingParticles count={35} emojis={['❤️', '🩷', '✨', '🌸', '💕', '💫']} seed={1} />
      <Sparkles count={45} seed={11} />

      <div
        className="relative z-10 flex flex-col items-center text-center px-6"
        style={{ maxWidth: '480px' }}
      >
        {/* Decorative accent */}
        <div
          style={{
            fontSize: '1.1rem',
            letterSpacing: '0.6em',
            color: '#d4af37',
            marginBottom: '1rem',
            opacity: 0.8,
            animation: 'fadeIn 1.4s ease-out both',
          }}
        >
          ✦ &nbsp; ✦ &nbsp; ✦
        </div>

        <h1
          style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: 'clamp(3rem, 10vw, 5.5rem)',
            fontWeight: 700,
            color: '#8b3a6b',
            lineHeight: 1.15,
            textShadow: '0 2px 24px rgba(255, 133, 161, 0.45)',
            animation: 'fadeInUp 1s 0.25s ease-out both',
            marginBottom: '1rem',
          }}
        >
          Hi, Love ❤️
        </h1>

        <p
          style={{
            fontFamily: '"Lora", serif',
            fontStyle: 'italic',
            fontSize: 'clamp(1rem, 3vw, 1.25rem)',
            color: '#a05580',
            lineHeight: 1.7,
            animation: 'fadeInUp 1s 0.65s ease-out both',
            marginBottom: '2.5rem',
          }}
        >
          I made something special just for you...
        </p>

        <button
          onClick={onNext}
          style={{
            fontFamily: '"Lora", serif',
            fontSize: '1.05rem',
            fontWeight: 600,
            color: '#fff',
            padding: '0.85rem 2.4rem',
            borderRadius: '9999px',
            border: 'none',
            cursor: 'pointer',
            background: 'linear-gradient(135deg, #ff85a1 0%, #c77dff 100%)',
            boxShadow: '0 8px 32px rgba(255, 133, 161, 0.5)',
            animation:
              'fadeInUp 1s 1.1s ease-out both, glowPulse 3s 2.2s infinite ease-in-out',
            transition: 'transform 0.2s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.06)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.96)')}
          onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1.06)')}
        >
          Open My Heart ❤️
        </button>
      </div>
    </div>
  )
}

// ─── Scene 2 — Our Memories ───────────────────────────────────────────────────
const MEMORIES = [
  {
    src: '/Pics/20240812182009316.jpg',
    alt: 'Sweet couple moment',
    caption: 'Our playful moments 🤗',
    rotate: '-5deg',
  },
  {
    src: '/Pics/IMG_1894.jpeg',
    alt: 'Restaurant date',
    caption: 'Coffee dates with you ☕',
    rotate: '6deg',
  },
  {
    src: '/Pics/IMG_1936.jpeg',
    alt: 'Happy together',
    caption: 'Just being silly together 😊',
    rotate: '-3deg',
  },
  {
    src: '/Pics/IMG_2079.jpeg',
    alt: 'Sweet selfie',
    caption: 'Your smile lights up my day ✨',
    rotate: '7deg',
  },
  {
    src: '/Pics/IMG_2137.jpeg',
    alt: 'Beautiful moment',
    caption: 'You shine so bright 💫',
    rotate: '-7deg',
  },
  {
    src: '/Pics/IMG_20230819_202430.jpg',
    alt: 'Us together',
    caption: 'Forever by your side 💕',
    rotate: '4deg',
  },
]

function Scene2Memories({ onNext }: { onNext: () => void }) {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null)

  return (
    <div
      className="relative w-full h-full overflow-hidden flex flex-col"
      style={{
        background:
          'radial-gradient(ellipse at 18% 28%, #ffe0ec 0%, transparent 52%), ' +
          'radial-gradient(ellipse at 82% 72%, #f3e5f5 0%, transparent 52%), ' +
          'linear-gradient(160deg, #fdf6f0 0%, #fce4ec 60%, #f8e8f8 100%)',
      }}
    >
      <FloatingParticles count={28} emojis={['🌸', '🩷', '💕', '✨', '🌷']} seed={2} />
      <Sparkles count={35} seed={22} />

      {/* Enlarged Photo Modal */}
      {selectedPhoto !== null && (
        <div
          onClick={() => setSelectedPhoto(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.9)',
            zIndex: 999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            animation: 'fadeIn 0.3s ease-out',
          }}
        >
          <div
            style={{
              background: '#fff',
              padding: '20px',
              borderRadius: '8px',
              maxWidth: '90%',
              maxHeight: '90%',
              animation: 'scaleIn 0.4s ease-out',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={MEMORIES[selectedPhoto].src}
              alt={MEMORIES[selectedPhoto].alt}
              style={{
                maxWidth: '100%',
                maxHeight: '70vh',
                objectFit: 'contain',
                display: 'block',
              }}
            />
            <p
              style={{
                fontFamily: '"Dancing Script", cursive',
                color: '#8b3a6b',
                fontSize: '1.2rem',
                textAlign: 'center',
                marginTop: '12px',
              }}
            >
              {MEMORIES[selectedPhoto].caption}
            </p>
          </div>
        </div>
      )}

      {/* Header */}
      <div
        className="relative z-10 text-center pt-7 pb-2 flex-shrink-0"
        style={{ animation: 'fadeInUp 0.9s ease-out both' }}
      >
        <p
          style={{
            fontFamily: '"Dancing Script", cursive',
            fontSize: '1rem',
            color: '#c77dff',
            letterSpacing: '0.1em',
            marginBottom: '0.25rem',
          }}
        >
          — a little scrapbook —
        </p>
        <h2
          style={{
            fontFamily: '"Playfair Display", serif',
            fontStyle: 'italic',
            fontSize: 'clamp(1.8rem, 5vw, 2.4rem)',
            fontWeight: 600,
            color: '#8b3a6b',
            textShadow: '0 2px 12px rgba(255, 133, 161, 0.3)',
          }}
        >
          Our Memories ✨
        </h2>
      </div>

      {/* Polaroid grid */}
      <div
        className="relative z-10 overflow-y-auto scroll-hide flex-1 px-4 py-3"
        style={{ paddingBottom: '80px' }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '18px',
            alignItems: 'center',
          }}
        >
          {/* Top row - 3 images */}
          <div
            style={{
              display: 'flex',
              gap: '16px',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            {MEMORIES.slice(0, 3).map((mem, i) => (
              <div
                key={i}
                onClick={() => setSelectedPhoto(i)}
                style={{
                  transform: `rotate(${mem.rotate})`,
                  animation: `scaleIn 0.65s ${i * 0.12 + 0.3}s ease-out both`,
                  transition: 'transform 0.25s ease',
                  flexShrink: 0,
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = `rotate(${mem.rotate}) scale(1.07)`)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = `rotate(${mem.rotate})`)
                }
              >
                <div
                  style={{
                    background: '#fff',
                    padding: '12px 12px 38px 12px',
                    boxShadow: '0 6px 24px rgba(139, 58, 107, 0.18), 0 2px 6px rgba(0,0,0,0.08)',
                    width: '190px',
                  }}
                >
                  <img
                    src={mem.src}
                    alt={mem.alt}
                    style={{
                      width: '166px',
                      height: '166px',
                      objectFit: 'cover',
                      display: 'block',
                      background: '#fce4ec',
                    }}
                  />
                  <p
                    style={{
                      fontFamily: '"Dancing Script", cursive',
                      color: '#8b3a6b',
                      fontSize: '13.5px',
                      textAlign: 'center',
                      marginTop: '8px',
                      lineHeight: 1.4,
                    }}
                  >
                    {mem.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom row - 3 images */}
          <div
            style={{
              display: 'flex',
              gap: '16px',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            {MEMORIES.slice(3, 6).map((mem, i) => (
              <div
                key={i + 3}
                onClick={() => setSelectedPhoto(i + 3)}
                style={{
                  transform: `rotate(${mem.rotate})`,
                  animation: `scaleIn 0.65s ${(i + 3) * 0.12 + 0.3}s ease-out both`,
                  transition: 'transform 0.25s ease',
                  flexShrink: 0,
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = `rotate(${mem.rotate}) scale(1.07)`)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = `rotate(${mem.rotate})`)
                }
              >
                <div
                  style={{
                    background: '#fff',
                    padding: '12px 12px 38px 12px',
                    boxShadow: '0 6px 24px rgba(139, 58, 107, 0.18), 0 2px 6px rgba(0,0,0,0.08)',
                    width: '190px',
                  }}
                >
                  <img
                    src={mem.src}
                    alt={mem.alt}
                    style={{
                      width: '166px',
                      height: '166px',
                      objectFit: 'cover',
                      display: 'block',
                      background: '#fce4ec',
                    }}
                  />
                  <p
                    style={{
                      fontFamily: '"Dancing Script", cursive',
                      color: '#8b3a6b',
                      fontSize: '13.5px',
                      textAlign: 'center',
                      marginTop: '8px',
                      lineHeight: 1.4,
                    }}
                  >
                    {mem.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Next */}
      <div className="absolute bottom-5 left-0 right-0 flex justify-center z-20">
        <button
          onClick={onNext}
          style={{
            fontFamily: '"Lora", serif',
            fontStyle: 'italic',
            fontSize: '1rem',
            color: '#fff',
            padding: '0.75rem 2rem',
            borderRadius: '9999px',
            border: 'none',
            cursor: 'pointer',
            background: 'linear-gradient(135deg, #ff85a1, #c77dff)',
            boxShadow: '0 6px 24px rgba(255, 133, 161, 0.4)',
            animation: 'fadeInUp 0.9s 1.1s ease-out both',
            transition: 'transform 0.2s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.06)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          Tell Me More ❤️
        </button>
      </div>
    </div>
  )
}

// ─── Scene 3 — Reasons I Love You ────────────────────────────────────────────
const REASONS = [
  { text: 'Your smile makes my whole world brighter. 🌟', icon: '🌟' },
  { text: 'Thank you for always being there for me.', icon: '🤗' },
  { text: 'You make every ordinary moment magical. ✨', icon: '✨' },
  { text: 'I love your kindness and gentle heart. 🩷', icon: '🩷' },
  { text: 'You are my favorite person in the world.', icon: '🌍' },
  { text: 'Your laugh is the most beautiful sound. 🎵', icon: '🎵' },
  { text: 'You inspire me to be better every day.', icon: '🌱' },
  { text: 'Every day with you is a gift I treasure. 🎁', icon: '🎁' },
]

function Scene3Reasons({ onNext }: { onNext: () => void }) {
  return (
    <div
      className="relative w-full h-full overflow-hidden flex flex-col"
      style={{
        background:
          'radial-gradient(ellipse at 50% 0%, #3d0030 0%, transparent 60%), ' +
          'radial-gradient(ellipse at 15% 100%, #1a0a2e 0%, transparent 55%), ' +
          'radial-gradient(ellipse at 85% 50%, #250820 0%, transparent 55%), ' +
          'linear-gradient(180deg, #220018 0%, #12010f 50%, #0b0012 100%)',
      }}
    >
      <FloatingParticles
        count={30}
        emojis={['❤️', '💕', '✨', '🌸', '💜', '🩷']}
        seed={3}
      />
      <Sparkles count={60} seed={33} />

      {/* Header */}
      <div
        className="relative z-10 text-center pt-7 pb-2 flex-shrink-0"
        style={{ animation: 'fadeInUp 0.9s ease-out both' }}
      >
        <p
          style={{
            fontFamily: '"Dancing Script", cursive',
            fontSize: '1rem',
            color: 'rgba(199, 125, 255, 0.7)',
            letterSpacing: '0.1em',
            marginBottom: '0.25rem',
          }}
        >
          — written from the heart —
        </p>
        <h2
          style={{
            fontFamily: '"Playfair Display", serif',
            fontStyle: 'italic',
            fontSize: 'clamp(1.8rem, 5vw, 2.4rem)',
            fontWeight: 600,
            color: '#ffb3c6',
            textShadow: '0 0 30px rgba(255, 133, 161, 0.6)',
          }}
        >
          Why I Love You ❤️
        </h2>
      </div>

      {/* Cards */}
      <div
        className="relative z-10 overflow-y-auto scroll-hide flex-1 px-4 py-3"
        style={{ paddingBottom: '76px' }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
            alignItems: 'center',
          }}
        >
          {/* Top row - 4 cards */}
          <div
            style={{
              display: 'flex',
              gap: '12px',
              justifyContent: 'center',
              flexWrap: 'wrap',
              maxWidth: '100%',
            }}
          >
            {REASONS.slice(0, 4).map((r, i) => (
              <div
                key={i}
                style={{
                  background:
                    'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(199, 125, 255, 0.06) 100%)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255, 179, 198, 0.18)',
                  borderRadius: '1rem',
                  padding: '1.1rem 1rem',
                  boxShadow:
                    '0 4px 24px rgba(199, 125, 255, 0.08), inset 0 1px 0 rgba(255,255,255,0.08)',
                  animation: `scaleIn 0.55s ${i * 0.1 + 0.25}s ease-out both, cardFloat ${6 + i * 0.4}s ${i * 0.35}s infinite ease-in-out`,
                  ['--cr' as string]: '0deg',
                  width: '165px',
                  flexShrink: 0,
                }}
              >
                <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{r.icon}</div>
                <p
                  style={{
                    fontFamily: '"Lora", serif',
                    fontStyle: 'italic',
                    fontSize: '0.88rem',
                    lineHeight: 1.65,
                    color: '#ffe0ee',
                  }}
                >
                  {r.text}
                </p>
              </div>
            ))}
          </div>

          {/* Bottom row - 4 cards */}
          <div
            style={{
              display: 'flex',
              gap: '12px',
              justifyContent: 'center',
              flexWrap: 'wrap',
              maxWidth: '100%',
            }}
          >
            {REASONS.slice(4, 8).map((r, i) => (
              <div
                key={i + 4}
                style={{
                  background:
                    'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(199, 125, 255, 0.06) 100%)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255, 179, 198, 0.18)',
                  borderRadius: '1rem',
                  padding: '1.1rem 1rem',
                  boxShadow:
                    '0 4px 24px rgba(199, 125, 255, 0.08), inset 0 1px 0 rgba(255,255,255,0.08)',
                  animation: `scaleIn 0.55s ${(i + 4) * 0.1 + 0.25}s ease-out both, cardFloat ${6 + (i + 4) * 0.4}s ${(i + 4) * 0.35}s infinite ease-in-out`,
                  ['--cr' as string]: '0deg',
                  width: '165px',
                  flexShrink: 0,
                }}
              >
                <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{r.icon}</div>
                <p
                  style={{
                    fontFamily: '"Lora", serif',
                    fontStyle: 'italic',
                    fontSize: '0.88rem',
                    lineHeight: 1.65,
                    color: '#ffe0ee',
                  }}
                >
                  {r.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Next */}
      <div className="absolute bottom-5 left-0 right-0 flex justify-center z-20">
        <button
          onClick={onNext}
          style={{
            fontFamily: '"Lora", serif',
            fontStyle: 'italic',
            fontSize: '1rem',
            color: '#fff',
            padding: '0.75rem 2rem',
            borderRadius: '9999px',
            border: 'none',
            cursor: 'pointer',
            background: 'linear-gradient(135deg, #ff85a1, #c77dff)',
            boxShadow: '0 6px 24px rgba(255, 133, 161, 0.4)',
            animation: 'fadeInUp 0.9s 1.2s ease-out both, glowPulse 3s 2.2s infinite',
            transition: 'transform 0.2s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.06)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          One More Surprise... ❤️
        </button>
      </div>
    </div>
  )
}

// ─── Floating Love Quotes ─────────────────────────────────────────────────────
function FloatingQuotes({ seed = 10 }: { seed?: number }) {
  const quotes = useMemo(() => {
    const r = makeRng(seed)
    const texts = [
      '"You make me smile"',
      '"Thank you for being you"',
      '"My favorite person"',
      '"I love you"',
      '"Always & Forever"',
    ]
    return Array.from({ length: 5 }, (_, i) => ({
      id: i,
      text: texts[i],
      left: r() * 85 + 5,
      top: r() * 80 + 10,
      delay: r() * 8,
      duration: 12 + r() * 8,
      size: 11 + r() * 3,
    }))
  }, [seed])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {quotes.map((q) => (
        <div
          key={q.id}
          style={{
            position: 'absolute',
            left: `${q.left}%`,
            top: `${q.top}%`,
            fontSize: `${q.size}px`,
            fontFamily: '"Dancing Script", cursive',
            color: 'rgba(255, 200, 220, 0.3)',
            animation: `cardFloat ${q.duration}s ${q.delay}s infinite ease-in-out`,
            whiteSpace: 'nowrap',
          }}
        >
          {q.text}
        </div>
      ))}
    </div>
  )
}

// ─── Scene 4 — Our Journey Timeline ───────────────────────────────────────────
const MILESTONES = [
  { 
    date: 'The Beginning', 
    title: 'Our First Conversation', 
    emoji: '💬', 
    description: 'Random chats turned into hours of talking' 
  },
  { 
    date: 'Getting Closer', 
    title: 'When I Knew You Were Special', 
    emoji: '💫', 
    description: 'The moment I realized you mean more to me' 
  },
  { 
    date: 'Sweet Memories', 
    title: 'Our Favorite Moments Together', 
    emoji: '🎭', 
    description: 'Late night calls, random jokes, and shared dreams' 
  },
  { 
    date: 'Growing Together', 
    title: 'Learning To Love Each Other', 
    emoji: '🌱', 
    description: 'Through ups and downs, we keep choosing us' 
  },
  { 
    date: 'Today', 
    title: 'Happy Monthsary, My Love', 
    emoji: '💝', 
    description: 'Still grateful for every day with you' 
  },
]

function Scene4Timeline({ onNext }: { onNext: () => void }) {
  return (
    <div
      className="relative w-full h-full overflow-hidden flex flex-col"
      style={{
        background:
          'radial-gradient(ellipse at 30% 20%, #4a1942 0%, transparent 55%), ' +
          'radial-gradient(ellipse at 70% 80%, #1e0a30 0%, transparent 55%), ' +
          'linear-gradient(180deg, #2a0520 0%, #0f0215 100%)',
      }}
    >
      <FloatingParticles count={25} emojis={['✨', '💫', '⭐', '🌟', '💕']} seed={5} />
      <Sparkles count={45} seed={55} />
      <FloatingQuotes seed={15} />

      {/* Header */}
      <div
        className="relative z-10 text-center pt-7 pb-2 flex-shrink-0"
        style={{ animation: 'fadeInUp 0.9s ease-out both' }}
      >
        <p
          style={{
            fontFamily: '"Dancing Script", cursive',
            fontSize: '1rem',
            color: 'rgba(212, 175, 55, 0.7)',
            letterSpacing: '0.1em',
            marginBottom: '0.25rem',
          }}
        >
          — our story —
        </p>
        <h2
          style={{
            fontFamily: '"Playfair Display", serif',
            fontStyle: 'italic',
            fontSize: 'clamp(1.8rem, 5vw, 2.4rem)',
            fontWeight: 600,
            color: '#ffb3c6',
            textShadow: '0 0 30px rgba(255, 133, 161, 0.6)',
          }}
        >
          Our Journey Together 💕
        </h2>
      </div>

      {/* Timeline */}
      <div
        className="relative z-10 overflow-y-auto scroll-hide flex-1 px-4 py-6"
        style={{ paddingBottom: '80px' }}
      >
        <div style={{ maxWidth: '600px', margin: '0 auto', position: 'relative' }}>
          {/* Timeline Line */}
          <div
            style={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              top: '20px',
              bottom: '20px',
              width: '3px',
              background: 'linear-gradient(180deg, rgba(255, 133, 161, 0.6), rgba(199, 125, 255, 0.4))',
            }}
          />

          {/* Milestones */}
          {MILESTONES.map((milestone, i) => {
            const isLeft = i % 2 === 0
            return (
              <div
                key={i}
                style={{
                  position: 'relative',
                  display: 'flex',
                  justifyContent: isLeft ? 'flex-start' : 'flex-end',
                  marginBottom: i === MILESTONES.length - 1 ? 0 : '50px',
                  animation: isLeft 
                    ? `slideInLeft 0.8s ${i * 0.2 + 0.3}s ease-out both`
                    : `slideInRight 0.8s ${i * 0.2 + 0.3}s ease-out both`,
                }}
              >
                {/* Timeline Dot */}
                <div
                  style={{
                    position: 'absolute',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    top: '20px',
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #ff85a1, #c77dff)',
                    boxShadow: '0 0 25px rgba(255, 133, 161, 0.7)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '14px',
                    animation: `heartbeat 2s ${i * 0.5}s infinite ease-in-out`,
                    border: '3px solid rgba(13, 2, 18, 0.8)',
                    zIndex: 10,
                  }}
                >
                  {milestone.emoji}
                </div>

                {/* Content Card */}
                <div
                  style={{
                    width: '45%',
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(199, 125, 255, 0.06))',
                    backdropFilter: 'blur(20px)',
                    border: '1.5px solid rgba(255, 179, 198, 0.25)',
                    borderRadius: '16px',
                    padding: '1.2rem 1.4rem',
                    boxShadow: '0 8px 32px rgba(199, 125, 255, 0.15)',
                    position: 'relative',
                  }}
                >
                  {/* Arrow pointing to timeline */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '24px',
                      [isLeft ? 'right' : 'left']: '-10px',
                      width: 0,
                      height: 0,
                      borderTop: '10px solid transparent',
                      borderBottom: '10px solid transparent',
                      [isLeft ? 'borderLeft' : 'borderRight']: '10px solid rgba(255, 179, 198, 0.25)',
                    }}
                  />
                  
                  <p
                    style={{
                      fontFamily: '"Dancing Script", cursive',
                      fontSize: '0.95rem',
                      color: 'rgba(255, 200, 220, 0.75)',
                      marginBottom: '0.4rem',
                      fontWeight: 600,
                    }}
                  >
                    {milestone.date}
                  </p>
                  <h3
                    style={{
                      fontFamily: '"Playfair Display", serif',
                      fontSize: '1.3rem',
                      fontWeight: 700,
                      color: '#ffb3c6',
                      marginBottom: '0.5rem',
                      lineHeight: 1.3,
                    }}
                  >
                    {milestone.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: '"Lora", serif',
                      fontStyle: 'italic',
                      fontSize: '0.95rem',
                      color: 'rgba(255, 224, 238, 0.85)',
                      lineHeight: 1.6,
                    }}
                  >
                    {milestone.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Next Button */}
      <div className="absolute bottom-5 left-0 right-0 flex justify-center z-20">
        <button
          onClick={onNext}
          style={{
            fontFamily: '"Lora", serif',
            fontStyle: 'italic',
            fontSize: '1rem',
            color: '#fff',
            padding: '0.75rem 2rem',
            borderRadius: '9999px',
            border: 'none',
            cursor: 'pointer',
            background: 'linear-gradient(135deg, #ff85a1, #c77dff)',
            boxShadow: '0 6px 24px rgba(255, 133, 161, 0.4)',
            animation: 'fadeInUp 0.9s 1.2s ease-out both, glowPulse 3s 2s infinite',
            transition: 'transform 0.2s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.06)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          Read My Letter ❤️
        </button>
      </div>
    </div>
  )
}

// ─── Envelope Component ───────────────────────────────────────────────────────
function Envelope({ onOpen }: { onOpen: () => void }) {
  const [phase, setPhase] = useState<'closed' | 'opening' | 'open'>('closed')

  const handleClick = () => {
    if (phase !== 'closed') return
    setPhase('opening')
    setTimeout(() => {
      setPhase('open')
      onOpen()
    }, 900)
  }

  const flapRotated = phase === 'opening' || phase === 'open'

  return (
    <div
      className="relative flex flex-col items-center"
      style={{ userSelect: 'none' }}
    >
      {/* Envelope */}
      <div
        onClick={handleClick}
        style={{
          position: 'relative',
          width: '280px',
          height: '195px',
          cursor: phase === 'closed' ? 'pointer' : 'default',
          transition: 'transform 0.2s ease',
        }}
        onMouseEnter={(e) => {
          if (phase === 'closed') e.currentTarget.style.transform = 'scale(1.04)'
        }}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      >
        {/* Body */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(160deg, #fff5f7, #ffe0ec)',
            borderRadius: '4px',
            boxShadow:
              '0 12px 48px rgba(139, 58, 107, 0.3), 0 4px 14px rgba(0,0,0,0.1)',
            border: '1px solid rgba(255, 133, 161, 0.25)',
            overflow: 'hidden',
          }}
        >
          {/* Side folds */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(100deg, rgba(255,182,193,0.35) 0%, transparent 50%)',
              clipPath: 'polygon(0 0, 52% 50%, 0 100%)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(260deg, rgba(225,190,231,0.35) 0%, transparent 50%)',
              clipPath: 'polygon(100% 0, 48% 50%, 100% 100%)',
            }}
          />
          {/* Bottom V fold */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '55%',
              background: 'linear-gradient(0deg, #ffd6e4, #fce4ec)',
              clipPath: 'polygon(0 100%, 50% 0, 100% 100%)',
            }}
          />
        </div>

        {/* Wax seal */}
        {!flapRotated && (
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '52px',
              height: '52px',
              borderRadius: '50%',
              background: 'radial-gradient(circle at 38% 38%, #e8c845, #b8860b)',
              boxShadow: '0 2px 12px rgba(180, 130, 11, 0.55)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '22px',
              zIndex: 10,
              animation: 'heartbeat 2.5s infinite ease-in-out',
            }}
          >
            ❤
          </div>
        )}

        {/* Flap — top triangle that folds back */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '55%',
            background: 'linear-gradient(180deg, #ffe0ec, #fce4ec)',
            clipPath: 'polygon(0 0, 50% 78%, 100% 0)',
            transformOrigin: 'top center',
            transform: flapRotated
              ? 'perspective(700px) rotateX(-180deg)'
              : 'perspective(700px) rotateX(0deg)',
            transition: 'transform 0.9s cubic-bezier(0.4, 0, 0.2, 1)',
            zIndex: 8,
            borderRadius: '4px 4px 0 0',
          }}
        />
      </div>

      {/* Hint text */}
      {phase === 'closed' && (
        <p
          style={{
            fontFamily: '"Dancing Script", cursive',
            fontStyle: 'italic',
            color: 'rgba(255, 200, 220, 0.75)',
            fontSize: '0.95rem',
            marginTop: '0.8rem',
            animation: 'fadeIn 1s 0.8s ease-out both',
          }}
        >
          Tap to open ❤️
        </p>
      )}
    </div>
  )
}

// ─── Love Letter — replace this text with your own ───────────────────────────
const LOVE_LETTER = `Happy Monthsary, My Love ❤️

As I write this, I honestly don't know where to begin. 
There are so many things running through my mind, and 
every memory of us keeps coming back. The happy moments, 
the late night conversations, the random laughter, the 
little misunderstandings we eventually fixed, the dreams 
we talked about, and even the difficult days we went 
through all of them together.

Looking back, I realize how much you've become a part of 
my life. You weren't just someone I loved—you became my 
comfort, my safe place, and one of the biggest reasons 
why so many ordinary days felt special.

First of all, thank you.

Thank you for choosing to love me despite my flaws. Thank 
you for your patience whenever I became difficult to 
understand. Thank you for staying beside me during moments 
when I wasn't even the best version of myself. Thank you 
for every little effort you made that probably seemed 
small to you but meant everything to me.

Thank you for every good morning and good night, every 
"ingat ka," every random message that made me smile, every 
call, every laugh, every hug, and every memory we've 
shared. Those moments may seem simple, but they'll always 
be unforgettable to me because they happened with you.

You taught me so much without even realizing it.

You taught me how love isn't just about happy moments. 
It's about understanding, forgiving, being patient, and 
choosing each other even when things become difficult. 
Because of you, I experienced a kind of love I'll always 
be grateful for.

But there's something I've carried in my heart that I 
need to say.

I'm sorry.

I'm sorry for every time I hurt you, disappointed you, 
made you cry, made you overthink, or made you question 
your worth. I know there were moments when my actions 
caused you pain, and I regret every single one of them.

I know saying "I'm sorry" doesn't erase everything that 
happened. I know some wounds take time to heal, and I 
understand if there are things that are still difficult 
for you to forget. If I could go back and change the 
moments that hurt you, I would. Without hesitation.

The truth is, seeing you hurt because of me became one 
of my biggest regrets.

You deserved reassurance, understanding, and peace. 
Instead, there were times when I gave you worries and 
tears. For that, I'm deeply sorry.

I don't know if this letter will change anything.
Maybe it won't.
Maybe it's already too late.

But I didn't want this day to pass without telling you 
everything I've been keeping in my heart.

No matter what happened between us, I'll never regret 
meeting you.

Loving you was never a mistake.

If life gave me another chance to meet someone, I 
honestly believe I'd still choose you all over again.

Because being with you gave me memories that no one can 
ever replace.

Thank you for every smile that made my bad days better.
Thank you for believing in me when I couldn't believe 
in myself.
Thank you for encouraging me to become better.
Thank you for loving me in ways I never thought I 
deserved.

You became one of the greatest blessings God ever gave 
me, and I'll always be thankful for that.

If life allows us to continue writing our story together, 
I promise I'll do better—not because I have to, but 
because loving you made me realize how much I still need 
to grow.

I want to become someone who gives you peace instead of 
pain.
Someone you can always rely on.
Someone you'll never have to doubt.

But if life has a different plan for us...
If this is truly where our story ends...

Then I just want you to know that I'll always be grateful 
for every single moment we shared.

I hope you continue chasing your dreams.
I hope you achieve everything you've been working so hard 
for.
I hope life becomes kinder to you.
I hope your heart heals from every pain, whether I caused 
it or not.

Most of all, I hope you never lose the beautiful person 
you are.

Please continue believing in yourself.
You are stronger than you think.
Kinder than you realize.
And more amazing than you often give yourself credit for.

You deserve genuine happiness.
You deserve peace.
You deserve someone who will always remind you how 
valuable you are.

As for me, wherever life takes us, I'll always carry the 
memories we created together.

Those memories helped shape the person I am today, and 
I'll treasure them for the rest of my life.

I don't know what tomorrow will bring.
Maybe we'll find our way back to each other.
Maybe we won't.

But whatever happens...

Please remember that there was someone who truly loved 
you with all his heart.

Someone who prayed for your happiness, even in silence.
Someone who always wanted the best for you, even if it 
meant putting your happiness before his own.
And someone who will never stop being thankful that you 
became part of his life.

Thank you for every memory.
Thank you for every lesson.
Thank you for every moment.
Thank you for loving me.
Thank you for accepting me.
Thank you for being you.

Happy Monthsary, my love.

No matter where life leads us, a part of my heart will 
always be thankful that our paths crossed.

I'll always wish for your happiness, your success, your 
good health, and the beautiful future you deserve.

Please take care of yourself.
Keep smiling.
Keep believing in your dreams.
And never forget how incredibly special you are.

I love you.
I always have.
And a part of me always will.

                                       Forever grateful, ❤️
                                            Your Love`

// ─── Scene 5 — Happy Monthsary ────────────────────────────────────────────────
function Scene5Monthsary({ onCelebrate }: { onCelebrate: () => void }) {
  const [letterOpen, setLetterOpen] = useState(false)

  return (
    <div
      className="relative w-full h-full overflow-hidden flex flex-col items-center"
      style={{
        background:
          'radial-gradient(ellipse at 50% 5%, #4a0040 0%, transparent 55%), ' +
          'radial-gradient(ellipse at 20% 95%, #160a30 0%, transparent 55%), ' +
          'radial-gradient(ellipse at 80% 65%, #2a0620 0%, transparent 50%), ' +
          'linear-gradient(180deg, #1e0518 0%, #0d0212 100%)',
      }}
    >
      <FloatingParticles
        count={40}
        emojis={['❤️', '🩷', '💕', '✨', '🌸', '⭐', '💫', '🌟']}
        seed={4}
      />
      <Sparkles count={70} seed={44} />

      {/* Heading */}
      <div
        className="relative z-10 text-center pt-7 flex-shrink-0"
        style={{ animation: 'fadeInUp 1s ease-out both' }}
      >
        <p
          style={{
            fontFamily: '"Dancing Script", cursive',
            fontSize: '1rem',
            color: 'rgba(212, 175, 55, 0.75)',
            letterSpacing: '0.12em',
            marginBottom: '0.3rem',
          }}
        >
          ✦ &nbsp; a message for you &nbsp; ✦
        </p>
        <h2
          style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: 'clamp(2rem, 6vw, 3rem)',
            fontWeight: 700,
            color: '#ffb3c6',
            textShadow:
              '0 0 40px rgba(255, 133, 161, 0.8), 0 0 80px rgba(255, 133, 161, 0.35)',
            lineHeight: 1.2,
          }}
        >
          Happy Monthsary
        </h2>
        <div
          style={{
            fontSize: '2.2rem',
            animation: 'heartbeat 2s infinite ease-in-out',
            marginTop: '0.2rem',
          }}
        >
          ❤️
        </div>
      </div>

      {/* Envelope / Letter */}
      <div
        className="relative z-10 flex flex-col items-center justify-center"
        style={{ flex: 1, width: '100%', padding: '0 1rem' }}
      >
        {!letterOpen ? (
          <Envelope onOpen={() => setTimeout(() => setLetterOpen(true), 300)} />
        ) : (
          <div
            className="scroll-hide"
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '440px',
              maxHeight: '52vh',
              overflowY: 'auto',
              background: 'linear-gradient(160deg, #fffef5, #fff9e8)',
              boxShadow:
                '0 20px 80px rgba(139, 58, 107, 0.45), 0 4px 16px rgba(0,0,0,0.18)',
              border: '1px solid rgba(212, 175, 55, 0.28)',
              borderRadius: '6px',
              padding: '1.8rem 1.6rem 1.4rem',
              animation: 'scaleIn 0.7s ease-out both',
            }}
          >
            {/* Subtle ruled lines */}
            {Array.from({ length: 18 }, (_, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  left: '1.4rem',
                  right: '1.2rem',
                  top: `${3.5 + i * 1.85}rem`,
                  height: '1px',
                  background: 'rgba(212, 175, 55, 0.1)',
                  pointerEvents: 'none',
                }}
              />
            ))}

            {/* Left margin line */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: '2.8rem',
                width: '1px',
                background: 'rgba(255, 133, 161, 0.12)',
                pointerEvents: 'none',
              }}
            />

            <pre
              style={{
                fontFamily: '"Dancing Script", cursive',
                fontSize: 'clamp(0.95rem, 2.5vw, 1.05rem)',
                lineHeight: 1.85,
                color: '#5d3a4a',
                whiteSpace: 'pre-wrap',
                fontWeight: 500,
                position: 'relative',
                zIndex: 1,
                margin: 0,
                paddingLeft: '1.2rem',
              }}
            >
              {LOVE_LETTER}
            </pre>

            <div
              style={{
                fontFamily: '"Dancing Script", cursive',
                fontSize: '1.2rem',
                fontWeight: 700,
                color: '#8b3a6b',
                textAlign: 'right',
                marginTop: '0.8rem',
                paddingRight: '0.5rem',
                position: 'relative',
                zIndex: 1,
              }}
            >
              Forever & Always ❤️
            </div>
          </div>
        )}
      </div>

      {/* I Love You button */}
      {letterOpen && (
        <div className="relative z-10 flex-shrink-0 pb-6 pt-2">
          <button
            onClick={onCelebrate}
            style={{
              fontFamily: '"Lora", serif',
              fontWeight: 600,
              fontSize: '1.1rem',
              color: '#fff',
              padding: '0.9rem 2.6rem',
              borderRadius: '9999px',
              border: 'none',
              cursor: 'pointer',
              background: 'linear-gradient(135deg, #ff85a1 0%, #c77dff 100%)',
              boxShadow:
                '0 8px 32px rgba(255, 133, 161, 0.5), 0 0 60px rgba(199, 125, 255, 0.25)',
              animation:
                'fadeInUp 0.8s 0.3s ease-out both, glowPulse 3s 1.3s infinite ease-in-out',
              transition: 'transform 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.06)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.96)')}
            onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1.06)')}
          >
            I Love You ❤️
          </button>
        </div>
      )}
    </div>
  )
}

// ─── Finale Overlay ───────────────────────────────────────────────────────────
function FinaleOverlay() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 40,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background:
          'radial-gradient(ellipse at center, rgba(255, 133, 161, 0.12) 0%, rgba(0,0,0,0.55) 100%)',
        animation: 'fadeIn 2s ease-out both',
        pointerEvents: 'none',
      }}
    >
      <div style={{ textAlign: 'center', animation: 'scaleIn 1.2s 0.6s ease-out both' }}>
        <div
          style={{
            fontSize: '5rem',
            animation: 'heartbeat 1.4s infinite ease-in-out',
            marginBottom: '1rem',
          }}
        >
          ❤️
        </div>
        <p
          style={{
            fontFamily: '"Playfair Display", serif',
            fontStyle: 'italic',
            fontWeight: 400,
            color: '#ffb3c6',
            fontSize: 'clamp(1.5rem, 5vw, 2.2rem)',
            textShadow: '0 0 30px rgba(255, 133, 161, 0.6)',
            lineHeight: 1.5,
          }}
        >
          I love you endlessly...
        </p>
        <p
          style={{
            fontFamily: '"Dancing Script", cursive',
            color: 'rgba(255, 200, 220, 0.65)',
            fontSize: '1.1rem',
            marginTop: '0.6rem',
            animation: 'fadeIn 1s 1.5s ease-out both',
          }}
        >
          ✦ &nbsp; always & forever &nbsp; ✦
        </p>
      </div>
    </div>
  )
}

// ─── Background Music ─────────────────────────────────────────────────────────
function BackgroundMusic({ onStart }: { onStart: (startFn: () => void) => void }) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const startMusic = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true)
        })
        .catch((err) => {
          console.error('Playback failed:', err)
        })
    }
  }, [])

  const togglePlay = useCallback(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true)
          })
          .catch((err) => {
            console.error('Playback failed:', err)
          })
      }
    }
  }, [isPlaying])

  useEffect(() => {
    onStart(startMusic)
  }, [onStart, startMusic])

  return (
    <>
      <audio
        ref={audioRef}
        loop
        preload="auto"
      >
        <source src="/libu-libong-buwan.mp3" type="audio/mpeg" />
      </audio>

      {/* Music Control Button */}
      <button
        onClick={togglePlay}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 100,
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          border: 'none',
          background: 'linear-gradient(135deg, #ff85a1 0%, #c77dff 100%)',
          boxShadow: '0 4px 20px rgba(255, 133, 161, 0.4)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.5rem',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          animation: 'musicPulse 2s infinite ease-in-out',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)'
          e.currentTarget.style.boxShadow = '0 6px 28px rgba(255, 133, 161, 0.6)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)'
          e.currentTarget.style.boxShadow = '0 4px 20px rgba(255, 133, 161, 0.4)'
        }}
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
        title={isPlaying ? 'Pause Music' : 'Play Music'}
      >
        {isPlaying ? '⏸️' : '🎵'}
      </button>
    </>
  )
}

// ─── Root App ─────────────────────────────────────────────────────────────────
type SceneId = 0 | 1 | 2 | 3 | 4

export default function App() {
  const [scene, setScene] = useState<SceneId>(0)
  const [visible, setVisible] = useState(true)
  const [confetti, setConfetti] = useState(false)
  const [finale, setFinale] = useState(false)
  const [startMusicFn, setStartMusicFn] = useState<(() => void) | null>(null)

  const goTo = useCallback((next: SceneId) => {
    setVisible(false)
    setTimeout(() => {
      setScene(next)
      setVisible(true)
    }, 800)
  }, [])

  const handleOpenHeart = useCallback(() => {
    // Start music when "Open My Heart" is clicked
    if (startMusicFn) {
      startMusicFn()
    }
    goTo(1)
  }, [startMusicFn, goTo])

  const celebrate = useCallback(() => {
    setConfetti(true)
    setTimeout(() => setFinale(true), 2200)
  }, [])

  const handleMusicStart = useCallback((fn: () => void) => {
    setStartMusicFn(() => fn)
  }, [])

  return (
    <div
      style={{
        width: '100%',
        height: '100dvh',
        overflow: 'hidden',
        position: 'relative',
        background: '#0d0212',
        fontFamily: '"Lora", serif',
      }}
    >
      <BackgroundMusic onStart={handleMusicStart} />
      <Confetti active={confetti} />
      {finale && <FinaleOverlay />}

      {/* Scene Progress Indicator */}
      {scene > 0 && !finale && (
        <div
          style={{
            position: 'fixed',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 90,
            display: 'flex',
            gap: '8px',
            animation: 'fadeIn 1s ease-out',
          }}
        >
          {[1, 2, 3, 4, 5].map((s) => (
            <div
              key={s}
              style={{
                width: '40px',
                height: '4px',
                borderRadius: '2px',
                background: scene >= s 
                  ? 'linear-gradient(90deg, #ff85a1, #c77dff)'
                  : 'rgba(255, 255, 255, 0.2)',
                transition: 'all 0.5s ease',
                boxShadow: scene >= s ? '0 0 10px rgba(255, 133, 161, 0.5)' : 'none',
              }}
            />
          ))}
        </div>
      )}

      {/* Extra burst hearts on celebrate */}
      {confetti && (
        <FloatingParticles
          count={40}
          emojis={['❤️', '🩷', '💕', '💖', '💗', '✨', '🌸']}
          seed={999}
        />
      )}

      {/* Scene wrapper with fade transition */}
      <div
        style={{
          width: '100%',
          height: '100%',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.65s ease-in-out',
        }}
      >
        {scene === 0 && <Scene1Welcome onNext={handleOpenHeart} />}
        {scene === 1 && <Scene2Memories onNext={() => goTo(2)} />}
        {scene === 2 && <Scene3Reasons onNext={() => goTo(3)} />}
        {scene === 3 && <Scene4Timeline onNext={() => goTo(4)} />}
        {scene === 4 && <Scene5Monthsary onCelebrate={celebrate} />}
      </div>
    </div>
  )
}

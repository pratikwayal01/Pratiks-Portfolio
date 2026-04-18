import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const PANIC_LINES = [
  '============================================================',
  'BUG: unable to handle kernel NULL pointer dereference',
  'at address 0x00000000',
  '',
  'Oops: 0002 [#1] SMP',
  '',
  'page not found on this machine',
  '',
  'Modules linked in: react typescript tailwind aws kubernetes docker',
  '',
  'Attempting recovery...',
  '[  OK  ] Rerouting to safe state',
  '',
  '$ cd / && ls -la',
  'drwxr-xr-x  home/',
  '============================================================',
]

const KernelPanic = () => {
  const [visibleCount, setVisibleCount] = useState(0)

  useEffect(() => {
    const timers: number[] = []
    PANIC_LINES.forEach((_, index) => {
      const timer = window.setTimeout(() => {
        setVisibleCount(index + 1)
      }, 70 * (index + 1))
      timers.push(timer)
    })

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer))
    }
  }, [])

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-5 py-8 font-mono text-white">
      <div className="w-full max-w-4xl text-sm leading-7 md:text-base">
        {PANIC_LINES.slice(0, visibleCount).map((line, index) => {
          if (line === 'drwxr-xr-x  home/') {
            return (
              <p key={`${line}-${index}`}>
                <span>{line}</span>
                <span className="text-[#E5A445]"> {'<- '}</span>
                <Link to="/" className="text-[#E5A445] underline-offset-4 hover:underline">
                  [click to go home]
                </Link>
              </p>
            )
          }

          return <p key={`${line}-${index}`}>{line || '\u00A0'}</p>
        })}
      </div>
    </main>
  )
}

export default KernelPanic

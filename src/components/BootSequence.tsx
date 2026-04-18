import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'

const BOOT_LINES = [
  'Pratik OS v2.0 initializing...',
  'Loading kernel modules... OK',
  'Mounting filesystems... OK',
  'Starting DevOps daemon... OK',
  'Connecting to AWS... OK',
  'Spawning portfolio process (PID 2520)... OK',
  'All systems nominal.',
  'Welcome, visitor.',
]

interface BootSequenceProps {
  onComplete: () => void
}

const formatTimestamp = (index: number) => {
  const base = 0.11 + index * 0.12
  const jitter = Math.random() * 0.03
  return (base + jitter).toFixed(6).padStart(12, ' ')
}

const BootSequence = ({ onComplete }: BootSequenceProps) => {
  const [visibleCount, setVisibleCount] = useState(0)
  const [startWipe, setStartWipe] = useState(false)

  const linesWithTime = useMemo(
    () => BOOT_LINES.map((line, index) => `[${formatTimestamp(index)}] ${line}`),
    [],
  )

  useEffect(() => {
    const revealTimers: number[] = []

    linesWithTime.forEach((_, index) => {
      const timer = window.setTimeout(() => {
        setVisibleCount(index + 1)
      }, 170 * (index + 1))
      revealTimers.push(timer)
    })

    const wipeStartTimer = window.setTimeout(() => {
      setStartWipe(true)
    }, 1900)

    const endTimer = window.setTimeout(() => {
      onComplete()
    }, 2500)

    return () => {
      revealTimers.forEach((timer) => window.clearTimeout(timer))
      window.clearTimeout(wipeStartTimer)
      window.clearTimeout(endTimer)
    }
  }, [linesWithTime, onComplete])

  return (
    <div className="fixed inset-0 z-[200] bg-[#0D0D0D] text-[#4A7C59] font-mono overflow-hidden">
      <div className="mx-auto max-w-4xl px-6 py-12 text-sm leading-7 md:text-base">
        {linesWithTime.slice(0, visibleCount).map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>

      <AnimatePresence>
        {startWipe && (
          <motion.div
            initial={{ top: '-2px' }}
            animate={{ top: '100%' }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: 'linear' }}
            className="absolute left-0 right-0 h-[2px] bg-[#4A7C59] shadow-[0_0_20px_#4A7C59]"
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default BootSequence

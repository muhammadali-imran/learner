import { useRef, useState } from 'react'

/**
 * <VideoPlayer src="https://…/lecture.mp4" title="Introduction to React" poster="/thumb.jpg" />
 * <VideoPlayer src="https://www.youtube.com/embed/xxx" type="youtube" />
 */
export default function VideoPlayer({
  src,
  title = '',
  poster,
  type = 'native', // 'native' | 'youtube' | 'vimeo'
  onProgress,
  className = '',
}) {
  const videoRef = useRef(null)
  const [playing, setPlaying]   = useState(false)
  const [muted,   setMuted]     = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [fullscreen, setFullscreen] = useState(false)

  if (!src) return (
    <div className={`flex items-center justify-center bg-slate-900 rounded-2xl aspect-video ${className}`}>
      <p className="text-slate-400 text-sm">No video source</p>
    </div>
  )

  /* ── Embedded iframe (YouTube / Vimeo) ── */
  if (type === 'youtube' || type === 'vimeo') {
    const embedSrc = type === 'youtube'
      ? src.replace('watch?v=', 'embed/')
      : src
    return (
      <div className={`relative w-full aspect-video rounded-2xl overflow-hidden bg-black shadow-lg ${className}`}>
        <iframe
          src={embedSrc}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      </div>
    )
  }

  /* ── Native HTML5 video ── */
  const togglePlay = () => {
    const v = videoRef.current
    if (!v) return
    playing ? v.pause() : v.play()
    setPlaying((p) => !p)
  }

  const handleTimeUpdate = () => {
    const v = videoRef.current
    if (!v) return
    const pct = (v.currentTime / v.duration) * 100
    setProgress(pct)
    onProgress?.(v.currentTime, v.duration)
  }

  const handleSeek = (e) => {
    const v = videoRef.current
    if (!v) return
    const rect = e.currentTarget.getBoundingClientRect()
    const ratio = (e.clientX - rect.left) / rect.width
    v.currentTime = ratio * v.duration
  }

  const fmt = (s) => {
    const m = Math.floor(s / 60)
    const sec = Math.floor(s % 60)
    return `${m}:${String(sec).padStart(2, '0')}`
  }

  const toggleFS = () => {
    const el = videoRef.current?.parentElement
    if (!document.fullscreenElement) {
      el?.requestFullscreen()
      setFullscreen(true)
    } else {
      document.exitFullscreen()
      setFullscreen(false)
    }
  }

  return (
    <div className={`relative w-full aspect-video bg-black rounded-2xl overflow-hidden group shadow-lg ${className}`}>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted={muted}
        className="w-full h-full object-contain"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={() => setDuration(videoRef.current?.duration || 0)}
        onEnded={() => setPlaying(false)}
      />

      {/* Big play button overlay */}
      {!playing && (
        <button
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity"
          aria-label="Play"
        >
          <span className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center text-purple-700 text-2xl shadow-xl">
            ▶
          </span>
        </button>
      )}

      {/* Controls bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/80 to-transparent px-4 py-3 opacity-0 group-hover:opacity-100 transition-opacity">
        {/* Progress bar */}
        <div
          className="w-full h-1.5 bg-white/30 rounded-full cursor-pointer mb-3 relative"
          onClick={handleSeek}
        >
          <div
            className="absolute top-0 left-0 h-full bg-purple-500 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center gap-3 text-white">
          <button onClick={togglePlay} className="text-lg leading-none" aria-label={playing ? 'Pause' : 'Play'}>
            {playing ? '⏸' : '▶'}
          </button>
          <button onClick={() => setMuted((m) => !m)} className="text-lg leading-none" aria-label="Mute">
            {muted ? '🔇' : '🔊'}
          </button>
          <span className="text-xs text-white/80 ml-1">
            {fmt((progress / 100) * duration)} / {fmt(duration)}
          </span>
          {title && (
            <span className="flex-1 text-xs text-white/70 truncate text-center">{title}</span>
          )}
          <button onClick={toggleFS} className="text-lg leading-none ml-auto" aria-label="Fullscreen">
            {fullscreen ? '⛶' : '⛶'}
          </button>
        </div>
      </div>
    </div>
  )
}

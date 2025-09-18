type VideoCard = {
  title: string
  href: string
  thumb: string
  alt: string
  duration?: string
}

const FREE_VIDEOS: VideoCard[] = [
  {
    title: "Getting Started Guide",
    href: "/video/getting-started",
    thumb: "/thumbnail1.jpg",
    alt: "Video thumbnail: Getting Started Guide",
    duration: "5:30",
  },
  {
    title: "Basic Setup Tutorial",
    href: "/video/basic-setup",
    thumb: "/thumbnail2.jpg",
    alt: "Video thumbnail: Basic Setup Tutorial",
    duration: "7:15",
  },
  {
    title: "Platform Introduction",
    href: "/video/introduction",
    thumb: "/thumbnail1.jpg",
    alt: "Video thumbnail: Platform Introduction",
    duration: "4:45",
  },
]

export function FreeItems() {
  return (
    <section aria-labelledby="free-items-heading" className="w-full mt-2">
      <header className="mb-4 md:mb-6">
        <h2 id="free-items-heading" className="text-xl md:text-2xl font-semibold text-pretty">
          Free Contents
        </h2>
        <p className="text-sm md:text-base text-[color:var(--usp-foreground)]/70 mt-1">
          Learn the basics and explore core concepts with these free videos.
        </p>
      </header>

      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6" role="list">
        {FREE_VIDEOS.map((v) => (
          <li key={v.href}>
            <a
              href={v.href}
              className="group block overflow-hidden rounded-lg border border-[color:var(--usp-foreground)]/10 bg-[color:var(--usp-foreground)]/5 hover:bg-[color:var(--usp-foreground)]/10 transition-colors"
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={v.thumb}
                  alt={v.alt}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  onError={(e) => {
                    e.target.src = '/placeholder.svg'
                  }}
                />
                {/* Play overlay */}
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[color:var(--usp-foreground)]/20 bg-[color:var(--usp-bg)]/70 backdrop-blur-sm transition-opacity duration-300 opacity-90 group-hover:opacity-100">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                      className="text-[color:var(--usp-foreground)]"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    <span className="sr-only">Play video</span>
                  </span>
                </div>
                {v.duration ? (
                  <span className="absolute bottom-2 right-2 rounded bg-[color:var(--usp-bg)]/80 px-2 py-0.5 text-xs border border-[color:var(--usp-foreground)]/15">
                    {v.duration}
                  </span>
                ) : null}
              </div>
              <div className="p-3">
                <h3 className="text-sm font-medium leading-6">{v.title}</h3>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}

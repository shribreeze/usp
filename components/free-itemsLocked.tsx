type VideoCard = {
  title: string
  href: string
  thumb: string
  alt: string
  duration?: string
}


const FREE_VIDEOS: VideoCard[] = [
  {
    title: "Getting Started with Streams",
    href: "https://example.com/videos/getting-started",
    thumb: "/thumbnail1.jpg",
    alt: "Video thumbnail: Getting Started with Streams",
    duration: "4:12",
  },
  {
    title: "Set Up in 5 Minutes",
    href: "https://example.com/videos/quick-setup",
    thumb: "/thumbnail2.jpg",
    alt: "Video thumbnail: Set Up in 5 Minutes",
    duration: "5:02",
  },
  {
    title: "Top 5 Use Cases",
    href: "https://example.com/videos/use-cases",
    thumb: "/thumbnail1.jpg",
    alt: "Video thumbnail: Top 5 Use Cases",
    duration: "6:45",
  },
]

export function FreeItemsLocked() {
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
            <div
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
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <div className="text-center">
                    <div className="text-4xl mb-2">💳</div>
                    <p className="text-white text-sm font-medium">Connect to Wallet</p>
                  </div>
                </div>
              </div>
              <div className="p-3">
                <h3 className="text-sm font-medium leading-6">{v.title}</h3>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

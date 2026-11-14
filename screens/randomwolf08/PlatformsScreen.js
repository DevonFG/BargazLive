const PLATFORM_GROUPS = [
  {
    title: "Livestreaming & Video",
    links: [
      {
        name: "YouTube (@RandomWolf08)",
        url: "https://youtube.com",
        description: "Main channel for videos, highlights, and creative projects.",
      },
      {
        name: "YouTube (@WolfRandom08)",
        url: "https://youtube.com",
        description: "Secondary YouTube channel.",
      },
      {
        name: "YouTube (Constellation Community)",
        url: "https://youtube.com",
        description: "Community channel and collaborative content.",
      },
      {
        name: "Twitch (RandomWolf08)",
        url: "https://twitch.tv",
        description: "Livestreams, gaming, and community hangouts.",
      },
      {
        name: "Twitch (Constellation Community)",
        url: "https://twitch.tv",
        description: "Community streams and events.",
      },
      {
        name: "Kick (RandomWolf08)",
        url: "https://kick.com",
        description: "Livestreams on Kick.",
      },
      {
        name: "Rumble",
        url: "https://rumble.com",
        description: "Video uploads and streams.",
      },
      {
        name: "TikTok (@randomwolf08)",
        url: "https://tiktok.com",
        description: "Short-form clips, edits, and updates.",
      },
    ],
  },
  {
    title: "Portfolios & Commissions",
    links: [
      {
        name: "VGen Commissions",
        url: "https://vgen.co",
        description: "Commission graphic design, stream assets, and creative services.",
      },
      {
        name: "Behance",
        url: "https://behance.net",
        description: "Main graphic design and visual portfolio.",
      },
      {
        name: "GitHub (@DevonFG)",
        url: "https://github.com",
        description: "Open-source repositories, BargazBot, and BargazLive code.",
      },
      {
        name: "Tinkercad",
        url: "https://tinkercad.com",
        description: "3D design and CAD models.",
      },
    ],
  },
  {
    title: "Social Media & Community",
    links: [
      {
        name: "The Wolf Den Discord Server",
        url: "https://discord.gg",
        description: "Community server, stream announcements, and Bargaz support.",
      },
      {
        name: "Linktree (@randomwolf08)",
        url: "https://linktr.ee",
        description: "All-in-one directory of active links and shop items.",
      },
      {
        name: "X / Twitter (@RandomWolf08)",
        url: "https://x.com",
        description: "Updates, announcements, and thoughts.",
      },
      {
        name: "Instagram (@randomwolf08)",
        url: "https://instagram.com",
        description: "Photography, design work, and creator updates.",
      },
      {
        name: "Reddit",
        url: "https://reddit.com",
        description: "Community posts and discussions.",
      },
    ],
  },
  {
    title: "Websites & Software",
    links: [
      {
        name: "Bargaz.app",
        url: "https://bargaz.app",
        description: "Software, tools, and services for creators and communities.",
      },
      {
        name: "BargazBot",
        url: "https://bargaz.app",
        description: "Multipurpose Discord bot for creator notifications and server management.",
      },
      {
        name: "BargazLive",
        url: "https://bargaz.app",
        description: "Websites and livestreaming tools.",
      },
    ],
  },
];

export default function PlatformsScreen() {
  return (
    <main className="page-container">
      <h1>Platforms &amp; Links</h1>
      <p>
        Official channels, social profiles, portfolios, and commission pages for
        RandomWolf08 (Devon Finney-Gaitan).
      </p>

      {PLATFORM_GROUPS.map((group) => (
        <section key={group.title}>
          <h2>{group.title}</h2>
          <ul>
            {group.links.map((item) => (
              <li key={item.name}>
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  {item.name}
                </a>{" "}
                — {item.description}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </main>
  );
}

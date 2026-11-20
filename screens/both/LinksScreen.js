const DISCORD_URL = "https://discord.gg/PvYFVshGrZ";
const TOP_GG_URL = "https://top.gg/bot/1472482809095393384";

const COMMON_GROUPS = [
  {
    title: "Websites & software",
    links: [
      { name: "RandomWolf08.com", url: "https://randomwolf08.com", description: "Creator profile, portfolios, and commission information." },
      { name: "Bargaz.app", url: "https://bargaz.app", description: "Software, tools, and services for creators and communities." },
      { name: "BargazBot™", url: "https://bot.bargaz.app", description: "Multipurpose Discord bot for creator notifications and server management." },
      { name: "BargazLive™", url: "https://live.bargaz.app", description: "Websites and upcoming livestreaming tools." },
      { name: "Bargaz Base", url: "https://base.bargaz.app", description: "Shared core infrastructure and host monitoring." },
    ],
  },
  {
    title: "Community",
    links: [
      { name: "The Wolf Den Discord server", url: DISCORD_URL, description: "Community server, stream announcements, and Bargaz support." },
    ],
  },
];

const BARGAZ_GROUPS = [
  {
    title: "Bargaz links",
    links: [
      { name: "BargazBot on Top.gg", url: TOP_GG_URL, description: "Bot listing, description, and community reviews." },
      { name: "GitHub (@DevonFG)", url: "https://github.com/DevonFG", description: "Source repositories for Bargaz, BargazBot, and BargazLive." },
      { name: "System status", url: "https://bargaz.app/status", description: "Live host health, diagnostics, backups, and versions." },
    ],
  },
];

const RANDOMWOLF_GROUPS = [
  {
    title: "Livestreaming & video",
    links: [
      { name: "YouTube (@RandomWolf08)", url: "https://www.youtube.com/channel/UCQX1SOkrN4GDPhCZJKtxZ8Q", description: "Main channel for videos, highlights, and creative projects." },
      { name: "YouTube (@WolfRandom08)", url: "https://www.youtube.com/@wolfrandom08", description: "Secondary YouTube channel." },
      { name: "YouTube (Constellation Community)", url: "https://youtube.com/@constellationcommunity", description: "Community channel and collaborative content." },
      { name: "Twitch (@randomwolf08)", url: "https://www.twitch.tv/randomwolf08", description: "Livestreams, gaming, and community hangouts." },
      { name: "Twitch (Constellation Community)", url: "https://twitch.tv/ConstellationCommunity", description: "Community streams and events." },
      { name: "Kick (@randomwolf08)", url: "https://kick.com/randomwolf08", description: "Livestreams on Kick." },
      { name: "Rumble", url: "https://rumble.com/user/RandomWolf08", description: "Video uploads and streams." },
      { name: "TikTok (@randomwolf08)", url: "https://www.tiktok.com/@randomwolf08", description: "Short-form clips, edits, and updates." },
    ],
  },
  {
    title: "Portfolios & commissions",
    links: [
      { name: "Behance — main portfolio", url: "https://www.behance.net/theranddevon", description: "Main graphic design and visual portfolio." },
      { name: "Bark — photography portfolio", url: "https://www.bark.com/en/us/company/devon-finney-gaitan/wJzNEE", description: "Photography portfolio and client listings." },
      { name: "VGen — commissions", url: "https://vgen.co/DevonFG", description: "Commission graphic design, stream assets, and creative services." },
      { name: "Instagram (@devon_6608)", url: "https://www.instagram.com/devon_6608", description: "Personal design and photography account." },
      { name: "Instagram (@randomwolf08)", url: "https://www.instagram.com/randomwolf08/", description: "Creator account." },
      { name: "Facebook", url: "https://www.facebook.com/Devon6608", description: "Creator updates and posts." },
      { name: "Tinkercad", url: "https://www.tinkercad.com/users/desk64GZwHc-devon-fg", description: "3D design and CAD models." },
      { name: "GitHub (@DevonFG)", url: "https://github.com/DevonFG", description: "Open-source repositories and Bargaz code." },
      { name: "Devon FG Services (Nextdoor)", url: "https://nextdoor.com/pages/devon-fg-services", description: "Local services listing." },
    ],
  },
  {
    title: "Endorsed creators & sites",
    links: [
      { name: "CM Stars Creations", url: "https://cmstarscreations.com", description: "Community partner website." },
      { name: "YouTube (@pikxles)", url: "https://www.youtube.com/@pikxles", description: "Endorsed creator channel." },
      { name: "Twitch (@XmaceAll)", url: "https://twitch.tv/XmaceAll", description: "Endorsed creator channel." },
    ],
  },
  {
    title: "Published work & other",
    links: [
      { name: "River Road letter to the editor", url: "https://lookouteugene-springfield.com/story/community-voices/2026/05/01/river-roads-speed-limit-reduction-fails-to-address-the-real-safety-problem", description: "Published letter in Lookout Eugene-Springfield." },
      { name: "Steam", url: "https://steamcommunity.com/id/randomwolf08", description: "Steam profile." },
      { name: "CMStars profile", url: "https://www.cmstarscreations.com/profile/randomwolf08/profile", description: "Creator profile." },
      { name: "X / Twitter (@RandomWolf08)", url: "https://x.com/RandomWolf08", description: "Updates and announcements." },
      { name: "Support on StreamElements", url: "https://streamelements.com/randomwolf08/tip", description: "Financially support the channel." },
    ],
  },
];

export default function LinksScreen({ domain = "bargaz" }) {
  const isRandomWolf = domain === "randomwolf08";
  const groups = isRandomWolf
    ? [...RANDOMWOLF_GROUPS, ...COMMON_GROUPS]
    : [...BARGAZ_GROUPS, ...COMMON_GROUPS];

  return (
    <main className="page-container">
      <section className="hero-section">
        <h1>Links</h1>
        <p>
          {isRandomWolf
            ? "Official channels, social profiles, portfolios, and commission pages for RandomWolf08 (Devon Finney-Gaitan)."
            : "Official Bargaz™ projects, repositories, community spaces, and useful links."}
        </p>
      </section>

      {groups.map((group) => (
        <section key={group.title}>
          <h2>{group.title}</h2>
          <div className="link-grid">
            {group.links.map((item) => (
              <article className="link-card" key={item.name + item.url}>
                <h3>
                  <a href={item.url} target="_blank" rel="noopener noreferrer">
                    {item.name}
                  </a>
                </h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
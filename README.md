# BargazLive

BargazLive is a project focused on hosting the Bargaz websites and developing tools and services for livestreamers and content creators.

The project provides the website infrastructure for the Bargaz software ecosystem and the foundation for future livestreaming applications.

## Project Scope

### Website Hosting

BargazLive hosts and manages the websites associated with Bargaz, including:

- **[bargaz.app](https://bargaz.app)** — The main Bargaz website, providing information about Bargaz, updates, status, feedback, and links.
- **[bot.bargaz.app](https://bot.bargaz.app)** — The BargazBot website, providing project information, documentation, and related resources.
- **[live.bargaz.app](https://live.bargaz.app)** — The BargazLive website, providing information about the project as development progresses.
- **[base.bargaz.app](https://base.bargaz.app)** — The Bargaz Base website, providing host information and changelogs.
- **[legal.bargaz.app](https://legal.bargaz.app)** and **[legal.randomwolf08.com](https://legal.randomwolf08.com)** — Privacy, terms, licensing, and trademark documents.
- **[randomwolf08.com](https://randomwolf08.com)** — The RandomWolf08 website, including its portfolio, links, and contact pages.
- **photos.randomwolf08.com**, **design.randomwolf08.com**, **3d.randomwolf08.com**, and **other.randomwolf08.com** — RandomWolf08 portfolio category subdomains.

The website uses Next.js, with its source organized under `app/`, `components/`, `public/`, and `screens/`. `proxy.js` maps each hostname to the matching folder in `app/`. Project information and documentation are retrieved from the public BargazBot, BargazLive, and Bargaz repositories.

Every site uses a shared `/links` page instead of a separate platforms page or Linktree. The `/features` and `/setup` pages are private placeholders and are not linked from navigation or the sitemap.

Website appearance settings support themes, accent colors, and accessibility preferences.

### Livestreaming Tools

BargazLive will serve as a platform for tools supporting livestreamers and their communities.

Planned development includes a chatbot supporting multiple livestreaming platforms, along with other tools and services as the project evolves. Features, integrations, and supported platforms will be determined during development.

Livestreaming functionality is currently planned for future development.

### Shared Infrastructure

BargazLive runs alongside **[Bargaz](https://github.com/DevonFG/Bargaz)** and BargazBot on the Raspberry Pi.

Bargaz provides host monitoring, diagnostics, and shutdown coordination. BargazLive manages the website application, its appearance settings, and the local feedback API proxies. The feedback backend runs in BargazBot, which handles the Discord forum, replies, and email notifications.

PM2 manages the website process, while Cloudflare Tunnel provides public access. Health and diagnostics endpoint requests are routed separately to the Bargaz health service.

## Installation

The current Raspberry Pi deployment uses a parent Bargaz repository with separate BargazBot and BargazLive checkouts inside it.

```text
/home/devon/Bargaz
/home/devon/Bargaz/BargazBot
/home/devon/Bargaz/BargazLive
```

Run `npm ci` and `npm run build` from the BargazLive repository root. The Next.js app is located at the repository root.

The production website listens on `127.0.0.1:3100` by default. Its PM2 configuration is provided in `ecosystem.config.cjs`.

For a host-specific local preview, run `./bargaz host <screen name>` and open `http://127.0.0.1:3100/preview`. Stop it with `./bargaz stop`.

### Private Configuration

Environment files, credentials, saved appearance settings, logs, and PM2 runtime files remain outside Git.

Optional website settings are documented in `.env.example`. Place private environment overrides in `.env.local`. The feedback proxy uses `BARGAZBOT_URL`, which defaults to `http://127.0.0.1:3500`. Ad, analytics, and Discord widget identifiers are added when available and are not stored in this repository.

## Related Projects and Links

- **[Bargaz](https://github.com/DevonFG/Bargaz)** — Shared infrastructure, monitoring, and system management.
- **[BargazBot](https://github.com/DevonFG/BargazBot)** — A Discord bot providing content creator notifications and community management tools.
- **[Bargaz Website](https://bargaz.app)** — Information about Bargaz and its projects.
- **[RandomWolf08 Website](https://randomwolf08.com)** — Creator profiles, portfolio, and commission information.
- **[The Wolf Den Discord Server](https://discord.gg/PvYFVshGrZ)** — Project feedback, bug reports, support, and Bargaz status.
- **[BargazBot Invite Link](https://discord.com/oauth2/authorize?client_id=1472482809095393384)** — Invite BargazBot to your Discord server.

## License

The website source code is governed by a custom license. See [legal.bargaz.app/licensing](https://legal.bargaz.app/licensing) for details.

Third-party dependencies retain their respective licenses.
# BargazLive

BargazLive is a project focused on hosting the Bargaz websites and developing tools and services for livestreamers and content creators.

The project provides the website infrastructure for the Bargaz software ecosystem and the foundation for future livestreaming applications.

## Project Scope

### Website Hosting

BargazLive hosts and manages the websites associated with Bargaz, including:

- **[bargaz.app](https://bargaz.app)** — The main Bargaz website, providing information about Bargaz and its projects.
- **[bot.bargaz.app](https://bot.bargaz.app)** — The BargazBot website, providing project information, documentation, and related resources.
- **[live.bargaz.app](https://live.bargaz.app)** — The BargazLive website, providing information about the project as development progresses.
- **[randomwolf08.com](https://randomwolf08.com)** — The RandomWolf08 website.

The website uses Next.js, with its source organized under `website/`. Project information and documentation are retrieved from the public BargazBot and BargazLive repositories.

Website appearance settings support themes, accent colors, and accessibility preferences.

### Livestreaming Tools

BargazLive will serve as a platform for tools supporting livestreamers and their communities.

Planned development includes a chatbot supporting multiple livestreaming platforms, along with other tools and services as the project evolves. Features, integrations, and supported platforms will be determined during development.

Livestreaming functionality is currently planned for future development.

### Shared Infrastructure

BargazLive runs alongside **[Bargaz](https://github.com/DevonFG/Bargaz)** and BargazBot on the Raspberry Pi.

Bargaz provides host monitoring, diagnostics, and shutdown coordination. BargazLive manages the website application and its appearance settings.

PM2 manages the website process, while Cloudflare Tunnel provides public access. Health and diagnostics endpoint requests are routed separately to the Bargaz health service.

## Installation

The current Raspberry Pi deployment uses a parent Bargaz repository with separate BargazBot and BargazLive checkouts inside it.

```text
/home/devon/Bargaz
/home/devon/Bargaz/BargazBot
/home/devon/Bargaz/BargazLive
```

Run `npm ci` and `npm run build` from the BargazLive repository root. The npm scripts use `website/` as the Next.js application directory.

The production website listens on `127.0.0.1:3100` by default. Its PM2 configuration is provided in `ecosystem.config.cjs`.

### Private Configuration

Environment files, credentials, saved appearance settings, logs, and PM2 runtime files remain outside Git.

Optional website settings are documented in `website/.env.example`. Place private environment overrides in `website/.env.local`.

## Related Projects and Links

- **[Bargaz](https://github.com/DevonFG/Bargaz)** — Shared infrastructure, monitoring, and system management.
- **[BargazBot](https://github.com/DevonFG/BargazBot)** — A Discord bot providing content creator notifications and community management tools.
- **[Bargaz Website](https://bargaz.app)** — Information about Bargaz and its projects.
- **[The Wolf Den Discord Server](https://discord.gg/PvYFVshGrZ)** — Project feedback, bug reports, support, and Bargaz status.
- **[BargazBot Invite Link](https://discord.com/oauth2/authorize?client_id=1472482809095393384)** — Invite BargazBot to your Discord server.

## License

A license for Bargaz, BargazBot, and BargazLive has not yet been selected. Once selected, it will be posted at [bargaz.app/license](https://bargaz.app/license).

Third-party dependencies retain their respective licenses.
# Changelog

### Format: YY.FEATURE.PATCH-NOTE.V
- YY = The year the feature was introduced
- FEATURE = The feature number from that year
    - When a new feature is released in a new year, FEATURE starts at 1
- PATCH = Bug fixes since the last feature added (Year doesn't turn over till new feature is added)
- NOTE = Optional development status "dev", "beta", or "error" to indicate an in-progress version
    - "dev" is refering to a version that has not been deployed
    - "beta" is refering to a version that is deployed while undergoing testing
    - "error" is refering to a version that exists due to system errors that require edits, it can be deployed or not
- V = Optional revision number that corresponds with the current development status (NOTE), starting at 1

A feature is when something is added/removed that changes what the user can do.
Any other changes, regardless of size, is considered a patch. (Very few exceptions)

Note: A change from dev or beta to a release is not impacted by an untestable feature like needing to wait for a
specific platform to have new content. In cases like that, the untested feature can be logged and the version released.
Additional Note: Error versions can have beta, dev, and release version
before and afterwards due to the multi-use of the version type.

## v26.2.0-dev.1 - Nov 14
- Added new multi-subdomain routing supporting the new subdomains on either site (proxy.js)
- Created next.config.mjs to inject package.json into NEXT_PUBLIC_SITE_VERSION at build time for both Server and Client components
- Reorganized all pages (views) as screens with folders for screens on both sites, screens on one site, and added new route wrappers and subdomain-specific layout.js metadata
- Added new deticated project subpages
- Added about page for bargaz
- Added feedback page for bargaz
- Added legal document hub (new page)
- Added dynamic licensing pages
- Added raw & formatted versions of the endpoints rather than just the raw version
- Added randomwolf08.com directory
- Added portolios for randomwolf08.com including a combined page and per-category pages
- Added album pages that branch off of the portfolios
- Updated Privacy, Terms, Licensing, LicenseDetail, RepoMarkdown, and Updates screens to read .md files from the Bargaz repo
- Removed the website parent folder
- Updated PM2 to start -H 127.0.0.1 -p 3100 directly
- Updated header.js, footer.js, back-link.js, layout.js, robots.js, and sitemap.js to support all the new subdomains and track previous page history using hostname + pathname
- Moved the logos to be in the public folder directly rather than a logos folder in the public folder.
- Moved site-version.js functionality into next.config.mjs
- Moved server.cjs functionality into package.json
- Consolidated proxy.js and ecosystem.config.cjs
- Removed app/status placeholder folder
- Removed site-info.js

## v26.1.1 - Nov 13
- Moved the Privacy Policy and Terms of Service to the Bargaz repo (legal/privacy.md, legal/terms.md)
  - Pages fetch the Markdown from GitHub and render it on the site
  - Removed the BargazLive docs/ folder and the BargazBot legal pages (/bot/privacy, /bot/terms)
- Renamed /license to /legal
  - /license permanently redirects to /legal
  - /legal shows the Licenses document and links to Privacy and Terms
- Added Privacy Policy and Terms of Service to the header and footer
- Added a back link ("Back to ...") to all pages except the raw status endpoints
- Added a version number to the footer
- Added canonical tags, a sitemap, and robots.txt for each host
- Removed the accent color option from appearance settings
  - Theme, high contrast, and colorblind options remain
  - Saved accent values are cleared from browsers and the appearance store
- Removed unused dependencies (sanitize-html, html-react-parser)

## v26.1.0 - Nov 13
- Added a public status page at bargaz.app/status
  - Shows live host health including status, power source, battery level, shutdown state, and last report
  - lists the raw JSON endpoints for health, diagnostics, versions, backups, and network
  - /endpoints and /endpoints/* redirects to /status
- Added a website route that proxies status requests to the local health server
  - Forwards only five known endpoints and never caches responses
  - Passes through the health server's status code so a degraded host reports a non-200 response
  - Reports 503 when the health server is unreachable
- Added a custom server entry point and pointed PM2 at it so it reports the bot version and not the next.js version
- Capped stored appearance preferences at 10000 records
  - Migrated the preferences file to a per-record format with its own timestamp
- Added permanent 308 redirects for www.bargaz.app and www.randomwolf08.com to their cannonical hosts
- Added shared contact email configuration used by the contact and license pages
- Updated the BargazBot page to use its own metadata
- Removed the duplicate README heading from the BargazBot page
- Confirmed all dependencies and files are in use

## v26.0.2 - Nov 10
- Confirmed all features working!

## v26.0.2-error.1 - Nov 10
- Removed root level app/, proxy.js, and public symlinkgs, keeping the website source under website/
- Moved page components from website/pages/ to website/views/ and updated their imports
- Updated npm scripts to run Next.js from website/
- Updated website/app/layout.js
  - Removed conflicting metadata exports
  - Preserved homename-specific titles and favicons
  - Moved the footer inside the page body
- Replaces GitHub App authentication with public repository reads
  - Added five-minute content caching and request timeouts
  - Removed the octokit dependency
- Updated appearance settings to serialize simultaneous writes and support a configurable data directory
- Added ecosystem.config.cjs with a single website process and a 65-second PM2 shutdown timeout
- Added website/.env.example and cleaned up .gitignore
- Verifier the production build, JavaScript syntax, and whitespace checks
Pending testing: Live Pi deployment, domain and endpoint routing, and system shutdown behavior.

## v26.0.2-beta.1 - Nov 9
- Fully connected bargaz.app, bot.bargaz.app, live.bargaz.app, and randomwolf08.com
- Added deticated pages for BargazBot, BargazLive, and RandomWolf08
- Added dynamic Github readme, changelog, and legal document pages
- Added website appearance settings, including light/dark mode, accent colors, high contrasn mode, and colorblind accessibility options
- Added a ssytem for synchronizing appearance preperences across sites
- Added domain-specific browser-tab favicons
- Added a shared footer with project links, contact information, and licensing information
- Updated the site to use the associated colors for either brand (#3D5A77 and #8D0122)
- Updated internal navigation and external-link handling
- Reduced flashes during navigation while in dark mode
Note: This update wasn't meant to be committed yet. I still need to crop one of the favicons and retest.
I just ran into an issue that I felt worth committing first for.

## v26.0.1 - Nov 9
- Set up Node.js, npm, and Next.js
- Configured .env and .gitignore
- Configured a GitHub App with read-only access to the BargazBot repository
- Set up GitHub App authentication
- Added functionality to retrieve files, including BargazBot's README
- Succesfully tested authenticated GITHUB repository access
- Created the inital Bargaz homepage
- Created placeholder websites for BargazBot and BargazLive
- Integrated BargazBot's README into the website
- Liked the BargazBot and BargazLive pages to the homepage
- Configured Next.js to run on port 3100
- Successfully tested development and production builds
- Added BargazLive to PM2
- Installed and configured Cloudflare Tunnel
- Added and connected the bot and live subdomains
- Verified all three sites load over HTTPS
- Created the inital README for BargazLive
- Created CHANGELOG.md

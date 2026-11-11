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

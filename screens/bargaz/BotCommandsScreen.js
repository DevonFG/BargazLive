import Link from "next/link";

const TOP_GG_URL = "https://top.gg/bot/1472482809095393384";

const COMMAND_GROUPS = [
  {
    category: "Creator notifications",
    description:
      "Manage YouTube, Twitch, and Kick creator alerts, custom nicknames, destination channels, and announcement templates.",
    commands: [
      {
        name: "/entitlement",
        access: "Server admins / authorized roles",
        summary:
          "Allocate notification capacity to your server before adding creator subscriptions (all three platforms currently support unlimited capacity).",
      },
      {
        name: "/notification",
        access: "Server admins / authorized roles",
        summary:
          "Add, edit, list, or remove creator notification subscriptions for YouTube, Twitch, and Kick, including destination channels, nicknames, and custom announcement messages.",
      },
    ],
  },
  {
    category: "Server configuration & permissions",
    description:
      "Configure how BargazBot interacts with your server channels and who is allowed to manage bot settings.",
    commands: [
      {
        name: "/config",
        access: "Server owner / administrators",
        summary:
          "Set destination channels for announcements, welcome/goodbye messages, server logs, status alerts, and project updates.",
      },
      {
        name: "/permissions",
        access: "Server owner / administrators",
        summary:
          "Grant or revoke BargazBot command access for specific Discord roles or individual users.",
      },
    ],
  },
  {
    category: "Privacy & data management",
    description: "Manage stored server or user records directly inside Discord.",
    commands: [
      {
        name: "/data delete",
        access: "Server admins / individual users",
        summary:
          "Request deletion of stored BargazBot configuration and identifier records for your server or Discord account.",
      },
    ],
  },
  {
    category: "General & help",
    description: "Quick reference and support utilities.",
    commands: [
      {
        name: "/help",
        access: "Everyone",
        summary:
          "View available BargazBot commands, setup tips, and links to documentation and support.",
      },
    ],
  },
];

export default function BotCommandsScreen() {
  return (
    <main className="page-container">
      <section className="hero-section">
        <h1>BargazBot™ commands</h1>
        <p>
          BargazBot™ uses native Discord slash commands (<code>/</code>). Server
          owners and administrators have full configuration access by default,
          and can delegate access to specific roles or users.
        </p>
        <div className="hero-actions">
          <Link href="/setup" className="button">
            Setup guide
          </Link>
          <a
            href={TOP_GG_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="button button-secondary"
          >
            BargazBot on Top.gg
          </a>
        </div>
      </section>

      {COMMAND_GROUPS.map((group) => (
        <section key={group.category}>
          <h2>{group.category}</h2>
          <p>{group.description}</p>
          <table className="data-table">
            <thead>
              <tr>
                <th>Command</th>
                <th>Access</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {group.commands.map((cmd) => (
                <tr key={cmd.name}>
                  <td><code>{cmd.name}</code></td>
                  <td>{cmd.access}</td>
                  <td>{cmd.summary}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      ))}
    </main>
  );
}
import Link from "next/link";

const COMMAND_GROUPS = [
  {
    category: "Creator Notifications",
    description:
      "Manage YouTube, Twitch, and Kick creator alerts, custom nicknames, destination channels, and announcement templates.",
    commands: [
      {
        name: "/entitlement",
        access: "Server Admins / Authorized Roles",
        summary:
          "Allocate notification capacity to your server before adding creator subscriptions (all three platforms currently support unlimited capacity).",
      },
      {
        name: "/notification",
        access: "Server Admins / Authorized Roles",
        summary:
          "Add, edit, list, or remove creator notification subscriptions for YouTube, Twitch, and Kick, including destination channels, nicknames, and custom announcement messages.",
      },
    ],
  },
  {
    category: "Server Configuration & Permissions",
    description:
      "Configure how BargazBot interacts with your server channels and who is allowed to manage bot settings.",
    commands: [
      {
        name: "/config",
        access: "Server Owner / Administrators",
        summary:
          "Set destination channels for announcements, welcome/goodbye messages, server logs, status alerts, and project updates.",
      },
      {
        name: "/permissions",
        access: "Server Owner / Administrators",
        summary:
          "Grant or revoke BargazBot command access for specific Discord roles or individual users.",
      },
    ],
  },
  {
    category: "Privacy & Data Management",
    description:
      "Manage stored server or user records directly inside Discord.",
    commands: [
      {
        name: "/data delete",
        access: "Server Admins / Individual Users",
        summary:
          "Request deletion of stored BargazBot configuration and identifier records for your server or Discord account.",
      },
    ],
  },
  {
    category: "General & Help",
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
      <h1>BargazBot Commands</h1>
      <p>
        BargazBot uses native Discord slash commands (<code>/</code>). Server
        owners and administrators have full configuration access by default, and
        can delegate access to specific roles or users.
      </p>

      <p>
        Need help getting started? Check the{" "}
        <Link href="/setup">Setup Guide</Link> or view the{" "}
        <a
          href="https://top.gg"
          target="_blank"
          rel="noopener noreferrer"
        >
          BargazBot Top.gg Page
        </a>
        .
      </p>

      {COMMAND_GROUPS.map((group) => (
        <section key={group.category}>
          <h2>{group.category}</h2>
          <p>{group.description}</p>
          <ul>
            {group.commands.map((cmd) => (
              <li key={cmd.name}>
                <strong>
                  <code>{cmd.name}</code>
                </strong>{" "}
                <em>({cmd.access})</em> — {cmd.summary}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </main>
  );
}

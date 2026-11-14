import Link from "next/link";

export default function FeedbackScreen() {
  return (
    <main className="page-container">
      <h1>Feedback</h1>
      <p>
        Have a feature request, bug report, or suggestion for Bargaz,
        BargazBot, BargazLive, or RandomWolf08.com?
      </p>

      <section>
        <h2>Feedback Form Coming Soon</h2>
        <p>
          An interactive feedback submission form is currently under
          development and will be available here in a future update.
        </p>
      </section>

      <section>
        <h2>Share Feedback Now</h2>
        <p>
          In the meantime, you can submit ideas, report issues, or share
          thoughts directly through Discord or email:
        </p>
        <ul>
          <li>
            <a
              href="https://discord.gg"
              target="_blank"
              rel="noopener noreferrer"
            >
              Join The Wolf Den Discord Server
            </a>{" "}
            — Post in the feedback, bug reports, or support channels.
          </li>
          <li>
            <a href="mailto:devon6608@gmail.com">devon6608@gmail.com</a> — Send
            detailed feedback or bug reports by email.
          </li>
          <li>
            <Link href="/contact">Contact Us</Link> — View all support and
            contact options.
          </li>
        </ul>
      </section>
    </main>
  );
}

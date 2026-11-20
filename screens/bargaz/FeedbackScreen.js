"use client";

import { useEffect, useState } from "react";

const DISCORD_FORUMS_URL = "https://discord.gg/v4qqSutTvy";
const SUPPORT_EMAIL = "support@bargaz.app";

const EMPTY_FORM = {
  title: "",
  message: "",
  tag: "",
  emoji: "",
  email: "",
};

export default function FeedbackScreen() {
  const [tags, setTags] = useState([]);
  const [tagsFailed, setTagsFailed] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [postUrl, setPostUrl] = useState("");
  const [notifiedEmail, setNotifiedEmail] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadTags() {
      try {
        const response = await fetch("/api/feedback/tags", {
          cache: "no-store",
        });
        if (!response.ok) throw new Error("Tag load failed");

        const data = await response.json();
        if (!cancelled) setTags(data.tags || []);
      } catch {
        if (!cancelled) setTagsFailed(true);
      }
    }

    loadTags();
    return () => {
      cancelled = true;
    };
  }, []);

  function update(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function submit(event) {
    event.preventDefault();
    setStatus("sending");
    setError("");

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to submit feedback");
      }

      setNotifiedEmail(form.email.trim() ? form.email.trim() : "");
      setPostUrl(data.url || "");
      setForm(EMPTY_FORM);
      setStatus("sent");
    } catch (caught) {
      setError(caught.message || "Unable to submit feedback");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <main className="page-container">
        <section className="hero-section">
          <h1>Feedback sent</h1>
          <p>
            Your feedback was posted to the Bargaz feedback forum. Thanks for
            helping improve Bargaz™, BargazBot™, and BargazLive™.
          </p>
          {postUrl && (
            <p>
              <a
                href={postUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open the forum post
              </a>
            </p>
          )}
          {notifiedEmail && (
            <div className="notice">
              You&apos;ll get an email at <strong>{notifiedEmail}</strong> when
              someone replies. Every email includes an unsubscribe link.
            </div>
          )}
          <div className="hero-actions">
            <button
              type="button"
              className="button button-secondary"
              onClick={() => setStatus("idle")}
            >
              Send more feedback
            </button>
            <a
              href={DISCORD_FORUMS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="button button-secondary"
            >
              Join the Discord forums
            </a>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="page-container">
      <section className="hero-section">
        <h1>Feedback</h1>
        <p>
          Have a feature request, bug report, or suggestion for Bargaz™,
          BargazBot™, BargazLive™, or RandomWolf08.com? Submit it here and it
          becomes a post in the Bargaz feedback forum on Discord.
        </p>
        <div className="hero-actions">
          <a
            href={DISCORD_FORUMS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="button button-secondary"
          >
            Join the Discord forums
          </a>
          <a href={`mailto:${SUPPORT_EMAIL}`} className="button button-secondary">
            Email support
          </a>
        </div>
      </section>

      {tagsFailed && (
        <div className="notice is-warning">
          Forum tags couldn&apos;t be loaded. You can still post feedback, but
          no tag will be applied.
        </div>
      )}

      <section>
        <h2>Submit feedback</h2>
        <form onSubmit={submit}>
          <label className="form-field">
            Title
            <input
              type="text"
              required
              maxLength={100}
              value={form.title}
              onChange={(event) => update("title", event.target.value)}
              placeholder="Short summary of your feedback"
            />
          </label>

          <label className="form-field">
            Message
            <textarea
              required
              maxLength={2000}
              value={form.message}
              onChange={(event) => update("message", event.target.value)}
              placeholder="Describe the idea, bug, or suggestion"
            />
          </label>

          <label className="form-field">
            Tag
            <select
              value={form.tag}
              onChange={(event) => update("tag", event.target.value)}
              required={tags.length > 0}
              disabled={tags.length === 0}
            >
              <option value="">
                {tags.length === 0 ? "No tags available" : "Choose a tag"}
              </option>
              {tags.map((tag) => (
                <option key={tag.id} value={tag.id}>
                  {tag.emoji ? `${tag.emoji} ` : ""}{tag.name}
                </option>
              ))}
            </select>
          </label>

          <label className="form-field">
            Emoji
            <input
              type="text"
              value={form.emoji}
              onChange={(event) => update("emoji", event.target.value)}
              placeholder="🐛"
              aria-describedby="emoji-help"
            />
          </label>
          <p id="emoji-help" className="appearance-note">
            This is added as a reaction to your post in Discord. Paste an emoji
            or its shortcode.
          </p>

          <label className="form-field">
            Email for reply notifications (optional)
            <input
              type="email"
              value={form.email}
              onChange={(event) => update("email", event.target.value)}
              placeholder="you@example.com"
              aria-describedby="email-help"
            />
          </label>
          <p id="email-help" className="appearance-note">
            We&apos;ll email you when someone replies. Emails include an
            unsubscribe link and instructions if the forum is deleted. We only
            store your email address.
          </p>

          {error && <div className="notice is-warning">{error}</div>}

          <div className="form-actions">
            <button
              type="submit"
              className="button"
              disabled={status === "sending" || (tags.length === 0 && !tagsFailed)}
            >
              {status === "sending" ? "Posting…" : "Post feedback"}
            </button>
          </div>
        </form>
      </section>

      <section>
        <h2>Other ways to reach us</h2>
        <p>
          Prefer to talk directly? Post in the feedback, bug report, or support
          channels on Discord, or see the <a href="/contact">Contact page</a>{" "}
          for every support option.
        </p>
      </section>
    </main>
  );
}
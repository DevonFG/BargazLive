
"use client";

import { useEffect, useRef, useState } from "react";

const TRUSTED_DOMAINS = ["bargaz.app", "randomwolf08.com"];

const ID_KEY = "bargaz-appearance-id";
const TRANSFER_KEY = "bargazAppearanceLink";

const DEFAULTS = {
  theme: "light",
  highContrast: false,
  colorblind: false,
};

function isTrusted(hostname) {
  const host = hostname.toLowerCase();

  return TRUSTED_DOMAINS.some(
    (domain) =>
      host === domain || host.endsWith("." + domain)
  );
}

function isBargaz(hostname) {
  const host = hostname.toLowerCase();

  return host === "bargaz.app" ||
    host.endsWith(".bargaz.app");
}

function getCookie(name) {
  const item = document.cookie
    .split("; ")
    .find((part) => part.startsWith(name + "="));

  return item
    ? decodeURIComponent(item.substring(name.length + 1))
    : null;
}

function saveIdentifier(id) {
  localStorage.setItem(ID_KEY, id);

  if (isBargaz(window.location.hostname)) {
    document.cookie =
      `${ID_KEY}=${encodeURIComponent(id)}; ` +
      "Domain=bargaz.app; Path=/; " +
      "Max-Age=31536000; SameSite=Lax; Secure";
  }
}

function getIdentifier() {
  const url = new URL(window.location.href);

  const transferred = url.searchParams.get(TRANSFER_KEY);

  if (transferred) {
    url.searchParams.delete(TRANSFER_KEY);

    window.history.replaceState(
      window.history.state,
      "",
      url.pathname + url.search + url.hash
    );

    if (/^[0-9a-f-]{36}$/i.test(transferred)) {
      saveIdentifier(transferred);
      return transferred;
    }
  }

  if (isBargaz(window.location.hostname)) {
    const cookieId = getCookie(ID_KEY);

    if (cookieId) {
      saveIdentifier(cookieId);
      return cookieId;
    }
  }

  const saved = localStorage.getItem(ID_KEY);

  if (saved) {
    saveIdentifier(saved);
    return saved;
  }

  const id = crypto.randomUUID();
  saveIdentifier(id);
  return id;
}

function getInitialPreferences() {
  const savedTheme = localStorage.getItem("bargaz-theme");

  return {
    theme: ["light", "dark"].includes(savedTheme)
      ? savedTheme
      : window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light",
    highContrast:
      localStorage.getItem("bargaz-high-contrast") === "true",
    colorblind:
      localStorage.getItem("bargaz-colorblind") === "true",
  };
}

export default function SiteControls() {
  const [preferences, setPreferences] = useState(DEFAULTS);
  const [ready, setReady] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [destination, setDestination] = useState(null);

  const identifier = useRef(null);
  const preferencesRef = useRef(DEFAULTS);

  function applyPreferences(next) {
    preferencesRef.current = next;
    setPreferences(next);

    const root = document.documentElement;

    root.dataset.theme = next.theme;
    root.dataset.contrast = next.highContrast
      ? "high"
      : "normal";
    root.dataset.colorblind = next.colorblind
      ? "on"
      : "off";

    localStorage.removeItem("bargaz-accent");
    localStorage.setItem("bargaz-theme", next.theme);
    localStorage.setItem(
      "bargaz-high-contrast",
      String(next.highContrast)
    );
    localStorage.setItem(
      "bargaz-colorblind",
      String(next.colorblind)
    );
  }

  useEffect(() => {
    let cancelled = false;

    async function initialize() {
      const id = getIdentifier();
      identifier.current = id;

      const initial = getInitialPreferences();
      applyPreferences(initial);

      try {
        const response = await fetch(
          `/api/appearance?id=${encodeURIComponent(id)}`,
          { cache: "no-store" }
        );

        if (!response.ok) throw new Error("Load failed");

        const result = await response.json();

        if (cancelled) return;

        if (result.preferences) {
          applyPreferences(result.preferences);
        } else {
          const save = await fetch("/api/appearance", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id,
              preferences: initial,
            }),
          });

          if (!save.ok) throw new Error("Initial save failed");
        }
      } catch (error) {
        console.error("Appearance synchronization failed:", error);
      }

      if (!cancelled) setReady(true);
    }

    initialize();

    return () => {
      cancelled = true;
    };
  }, []);

  async function updatePreferences(changes) {
    if (!ready || !identifier.current) return;

    const next = {
      ...preferencesRef.current,
      ...changes,
    };

    applyPreferences(next);

    try {
      const response = await fetch("/api/appearance", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: identifier.current,
          preferences: next,
        }),
      });

      if (!response.ok) throw new Error("Save failed");
    } catch (error) {
      console.error("Unable to save appearance:", error);
    }
  }

  useEffect(() => {
    function handleLinkClick(event) {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const anchor = event.target.closest?.("a[href]");
      if (!anchor) return;

      const url = new URL(anchor.href, window.location.href);

      if (!["http:", "https:"].includes(url.protocol)) return;

      if (!isTrusted(url.hostname)) {
        event.preventDefault();
        setDestination(url.href);
        return;
      }

      if (url.origin === window.location.origin) return;

      if (!identifier.current) return;

      // Transfer only the browser identifier,
      // not the entire appearance configuration.
      url.searchParams.set(
        TRANSFER_KEY,
        identifier.current
      );

      event.preventDefault();
      window.location.assign(url.href);
    }

    document.addEventListener("click", handleLinkClick, true);

    return () => {
      document.removeEventListener(
        "click",
        handleLinkClick,
        true
      );
    };
  }, []);

  return (
    <>
      <button
        type="button"
        className="theme-toggle"
        onClick={() => setSettingsOpen(true)}
        aria-label="Open appearance settings"
      >
        ⚙ Appearance
      </button>

      {settingsOpen && (
        <div className="external-overlay">
          <div
            className="external-dialog appearance-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="appearance-title"
          >
            <h2 id="appearance-title">
              Appearance Settings
            </h2>

            <label className="appearance-field">
              Theme
              <select
                value={preferences.theme}
                disabled={!ready}
                onChange={(event) =>
                  updatePreferences({
                    theme: event.target.value
                  })
                }
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </label>

            <label className="appearance-check">
              <input
                type="checkbox"
                disabled={!ready}
                checked={preferences.highContrast}
                onChange={(event) =>
                  updatePreferences({
                    highContrast: event.target.checked
                  })
                }
              />
              High Contrast Mode
            </label>

            <label className="appearance-check">
              <input
                type="checkbox"
                disabled={!ready}
                checked={preferences.colorblind}
                onChange={(event) =>
                  updatePreferences({
                    colorblind: event.target.checked
                  })
                }
              />
              Colorblind-Friendly Mode
            </label>

            <p className="appearance-note">
              Your appearance preferences are shared
              across Bargaz and RandomWolf08 websites
              after your browser has been linked.
            </p>

            <div className="external-actions">
              <button
                type="button"
                onClick={() => setSettingsOpen(false)}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {destination && (
        <div className="external-overlay">
          <div
            className="external-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="external-title"
          >
            <h2 id="external-title">
              Leaving this website
            </h2>

            <p>
              You are about to visit an external website
              outside Bargaz and RandomWolf08.
            </p>

            <p className="external-url">
              {destination}
            </p>

            <div className="external-actions">
              <button
                type="button"
                onClick={() => setDestination(null)}
              >
                Stay Here
              </button>

              <button
                type="button"
                onClick={() => {
                  window.open(
                    destination,
                    "_blank",
                    "noopener,noreferrer"
                  );
                  setDestination(null);
                }}
              >
                Open in New Tab
              </button>

              <button
                type="button"
                onClick={() => {
                  const url = destination;
                  setDestination(null);
                  window.location.assign(url);
                }}
              >
                Continue to External Site
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

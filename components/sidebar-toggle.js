"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function SidebarToggle() {
  const pathname = usePathname();

  useEffect(() => {
    const shell = document.querySelector(".app-shell");
    const button = shell?.querySelector(".sidebar-toggle");
    const backdrop = shell?.querySelector(".sidebar-backdrop");
    if (!shell || !button) return;

    const setOpen = (open) => {
      shell.classList.toggle("sidebar-open", open);
      button.setAttribute("aria-expanded", String(open));
    };
    const onToggle = () => setOpen(!shell.classList.contains("sidebar-open"));
    const onClose = () => setOpen(false);
    const onKey = (event) => {
      if (event.key === "Escape") onClose();
    };

    button.addEventListener("click", onToggle);
    backdrop?.addEventListener("click", onClose);
    document.addEventListener("keydown", onKey);

    return () => {
      button.removeEventListener("click", onToggle);
      backdrop?.removeEventListener("click", onClose);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    const shell = document.querySelector(".app-shell");
    const button = shell?.querySelector(".sidebar-toggle");
    shell?.classList.remove("sidebar-open");
    button?.setAttribute("aria-expanded", "false");
  }, [pathname]);

  return (
    <button type="button" className="sidebar-toggle" aria-expanded="false" aria-label="Toggle navigation">
      <span aria-hidden="true">☰</span> Menu
    </button>
  );
}
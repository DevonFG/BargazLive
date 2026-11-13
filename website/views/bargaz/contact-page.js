import { CONTACT_EMAIL } from "../../other/site-info.js";
export const metadata = {title: "Contact Us | Bargaz", description: "Contact Bargaz for support and inquiries.",};
export default function ContactPage() {return (
  <main><h1>Contact Us</h1>
    <p>
      Have a question, need support, or want to share feedback?
      You can contact us using the options below.
    </p>
    <h2>Email</h2>
    <p><a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></p>
    <h2>Discord Support</h2>
    <p>
      For BargazBot support, bug reports, and suggestions,
      join our Discord server.
    </p>
    <p><a href="https://discord.gg/PvYFVshGrZ">Join the Bargaz Discord Server</a></p>
  </main>
);}

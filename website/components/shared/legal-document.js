import sanitizeHtml from "sanitize-html";
import parse from "html-react-parser";

export default function LegalDocument({ html }) {
  const safeHtml = sanitizeHtml(html, {
    allowedTags: [
      ...sanitizeHtml.defaults.allowedTags,
      "h1", "h2", "h3", "h4",
      "img", "table", "thead", "tbody", "tr", "th", "td"
    ],
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      a: ["href", "name", "target", "rel"],
      img: ["src", "alt", "width", "height"]
    },
    allowedSchemes: ["http", "https", "mailto"],
    disallowedTagsMode: "discard"
  });

  return (
    <article className="legal-document">
      {parse(safeHtml)}
    </article>
  );
}

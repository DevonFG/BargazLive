export function linkifyPlainUrls(markdown) {return markdown 
  .split(/(```[\s\S]*?```|`[^`\n]*`)/g)
  .map((part, index) => {if (index % 2 === 1) 
    return part;
    return part.replace(/(?<!\]\()https?:\/\/[^\s<>)]+/g, (match) => {
      const url = match.replace(/[.,;!?]+$/, "");
      const punctuation = match.slice(url.length);
      return `<${url}>${punctuation}`;
  });
}).join("");}

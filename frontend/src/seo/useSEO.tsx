import { useHead } from "@unhead/react";

interface SEOProps {
  title: string;
  description: string;
  url: string;
  image?: string;
  keywords?: string;
}

const SITE_NAME = "NoteVault – Secure Notes & Todo App";
const DEFAULT_IMAGE = "https://notevault.moinnaik.bio/og-image.png";

const useSEO = ({
  title,
  description,
  url,
  image = DEFAULT_IMAGE,
  keywords,
}: SEOProps) => {
  useHead({
    title,

    meta: [
      // Basic SEO
      { name: "description", content: description },
      keywords ? { name: "keywords", content: keywords } : {},

      // ✅ Open Graph (WhatsApp, Facebook, LinkedIn)
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:image", content: image },
      { property: "og:image:secure_url", content: image },
      { property: "og:image:type", content: "image/png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },

      // Twitter (nice to have)
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: image },
    ],

    link: [
      { rel: "canonical", href: url },
    ],
  });
}

export default useSEO;
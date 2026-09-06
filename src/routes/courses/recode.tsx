import { createFileRoute } from "@tanstack/react-router";
import Layout from "@/components/Layout";
import RecodeContent from "@/components/courses/RecodeContent";

export const Route = createFileRoute("/courses/recode")({
  component: RecodeDetail,
  head: () => ({
    meta: [
      { title: "RECODE — Foundational Movement Course | Kasratshala" },
      { name: "description", content: "Realign how you move with RECODE, the foundational movement recoding process taught at Kasratshala." },
      { property: "og:title", content: "RECODE — Foundational Movement Course | Kasratshala" },
      { property: "og:description", content: "Realign how you move with RECODE, the foundational movement recoding process taught at Kasratshala." },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "https://thekasratshala.lovable.app/courses/recode" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://thekasratshala.lovable.app/courses/recode" }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(
      {
        "@context": "https://schema.org",
        "@type": "Course",
        name: 'RECODE — Foundational Movement',
        description: 'Realign how you move through the foundational movement recoding process at Kasratshala.',
        provider: { "@type": "Organization", name: "Kasratshala", url: "https://thekasratshala.lovable.app" },
      }
    ) }],
  }),
});

function RecodeDetail() {
  return (
    <Layout>
      <RecodeContent />
    </Layout>
  );
}

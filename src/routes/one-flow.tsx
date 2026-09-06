import { createFileRoute } from "@tanstack/react-router";
import Layout from "@/components/Layout";
import OneFlowContent from "@/components/OneFlowContent";

export const Route = createFileRoute("/one-flow")({
  component: OneFlowPage,
  head: () => ({
    meta: [
      { title: "One Flow Gathering — Kasratshala" },
      { name: "description", content: "One day, one field, a shared movement practice at the Kasratshala Dojo in Naggar, Himachal." },
      { property: "og:title", content: "One Flow Gathering — Kasratshala" },
      { property: "og:description", content: "One day, one field, a shared movement practice at the Kasratshala Dojo in Naggar, Himachal." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://thekasratshala.lovable.app/one-flow" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://thekasratshala.lovable.app/one-flow" }],
  }),
});

function OneFlowPage() {
  return (
    <Layout>
      <OneFlowContent />
    </Layout>
  );
}

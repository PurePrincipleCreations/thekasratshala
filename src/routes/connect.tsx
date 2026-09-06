import { createFileRoute } from "@tanstack/react-router";
import Layout from "@/components/Layout";
import ContactContent from "@/components/ContactContent";

export const Route = createFileRoute("/connect")({
  component: ConnectPage,
  head: () => ({
    meta: [
      { title: "Connect with Kasratshala — Naggar, Himachal" },
      { name: "description", content: "Reach the Kasratshala Dojo in Naggar, Himachal Pradesh. Ask about schedules, certifications and residential camps." },
      { property: "og:title", content: "Connect with Kasratshala — Naggar, Himachal" },
      { property: "og:description", content: "Reach the Kasratshala Dojo in Naggar, Himachal Pradesh. Ask about schedules, certifications and residential camps." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://thekasratshala.lovable.app/connect" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://thekasratshala.lovable.app/connect" }],
  }),
});

function ConnectPage() {
  return (
    <Layout>
      <ContactContent />
    </Layout>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import Layout from "@/components/Layout";
import ContactContent from "@/components/ContactContent";

export const Route = createFileRoute("/connect" as any)({
  component: ConnectPage,
  head: () => ({
    meta: [
      { title: "Connect — Kasratshala" },
      { name: "description", content: "Start your movement practice with Kasratshala." },
    ],
  }),
});

function ConnectPage() {
  return (
    <Layout>
      <ContactContent />
    </Layout>
  );
}

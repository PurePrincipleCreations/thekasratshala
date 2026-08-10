import { createFileRoute } from "@tanstack/react-router";
import Layout from "@/components/Layout";
import OneFlowContent from "@/components/OneFlowContent";

export const Route = createFileRoute("/one-flow" as any)({
  component: OneFlowPage,
  head: () => ({
    meta: [
      { title: "One Flow Gathering — Kasratshala" },
      { name: "description", content: "One day. One field. A shared movement practice." },
    ],
  }),
});

function OneFlowPage() {
  return (
    <Layout>
      <OneFlowContent />
    </Layout>
  );
}

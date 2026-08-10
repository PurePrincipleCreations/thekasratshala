import { createFileRoute } from "@tanstack/react-router";
import Layout from "@/components/Layout";
import RecodeContent from "@/components/courses/RecodeContent";

export const Route = createFileRoute("/courses/recode" as any)({
  component: RecodeDetail,
  head: () => ({
    meta: [
      { title: "RECODE — Foundational Movement | Kasratshala" },
      { name: "description", content: "Realign how you move through our foundational recoding process." },
    ],
  }),
});

function RecodeDetail() {
  return (
    <Layout>
      <RecodeContent />
    </Layout>
  );
}

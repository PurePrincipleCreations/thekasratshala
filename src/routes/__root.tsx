import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner";
import CartDrawer from "@/components/shop/CartDrawer";
import { Provider } from "jotai";
import ErrorBoundary, { ErrorFallback } from "@/components/ErrorBoundary";


import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#090a09" },
      { property: "og:site_name", content: "Kasratshala" },
      { property: "og:locale", content: "en_IN" },
      { name: "robots", content: "index, follow" },
      { name: "author", content: "Kasratshala" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Kasratshala",
          alternateName: "The Kasratshala",
          url: "https://thekasratshala.lovable.app",
          logo: "https://thekasratshala.lovable.app/favicon.png",
          telephone: "+918307929691",
          sameAs: [
            "https://www.instagram.com/thekasratshala/",
            "https://www.youtube.com/@thekasratshala",
          ],
        }),
      },
    ],

    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=Inter:wght@200;300;400;500;600&family=Caveat:wght@400;700&display=swap",
      },
    ],
  }),
  errorComponent: ({ reset }) => <ErrorFallback onReset={() => { reset(); window.location.reload(); }} />,
  shellComponent: RootShell,
  component: RootComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Provider>
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
        <CartDrawer />
        <Toaster theme="dark" position="bottom-right" />
      </Provider>
    </QueryClientProvider>
  );
}


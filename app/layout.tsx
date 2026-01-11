import "./global.css";
import type { Metadata } from "next";
import { Navbar } from "./components/nav";
import NextTopLoader from "nextjs-toploader";
import { Geist } from "next/font/google";
import { PostHogProvider } from "./components/PostHogProvider";
import { ThemeProvider } from "./components/theme-provider";
import { ThemeToggle } from "./components/theme-toggle";
import { TooltipProvider } from "@/components/ui/tooltip";
import Border from "./components/border";

const sans = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tanav.me"),
  title: {
    default: "Tanav",
    template: "%s • Tanav",
  },
  description: "Developer, problem solver and creator.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://tanav.me",
    siteName: "Tanav Poswal",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Tanav Poswal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@tanavtwt", // Replace with your Twitter handle
    creator: "@tanavtwt", // Replace with your Twitter handle
    images: "/opengraph-image", // Absolute URL to your OG image
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "eZSdmzAXlLkKhNJzfgwDqWORghxnJ8qR9_CHdAh5-xw",
    yandex: "14d2e73487fa6c71",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${sans.className} antialiased`}>
        <TooltipProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <PostHogProvider>
              <NextTopLoader
                initialPosition={0.08}
                crawlSpeed={200}
                height={2}
                showSpinner={false}
              />
              <div className="mx-auto max-w-2xl py-5 border-l border-r border-(--border) border-double-l min-h-screen main">
                <Border />
                <header className="px-3 sm:px-6 flex items-center justify-between py-3">
                  <Navbar />
                  <ThemeToggle />
                </header>
                <Border />
                <main className="my-6 min-h-[77vh]">{children}</main>
                <Border />
                <footer className="my-3">
                  <div className="flex flex-col items-center justify-center gap-2 text-sm text-(--text-muted)">
                    tanav poswal
                  </div>
                </footer>
                <Border />
              </div>
            </PostHogProvider>
          </ThemeProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}

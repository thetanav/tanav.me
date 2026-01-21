import "./global.css";
import type { Metadata } from "next";
import { Navbar } from "./components/nav";
import { Inter } from "next/font/google";
import { PostHogProvider } from "./components/PostHogProvider";
import { ThemeProvider } from "./components/theme-provider";
import { ThemeToggle } from "./components/theme-toggle";
import { TooltipProvider } from "@/components/ui/tooltip";
import Border from "./components/border";
import { ScrollProgress } from "@/components/ui/scroll-progress";

const sans = Inter({
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
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Tanav Poswal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@tanavtwt",
    creator: "@tanavtwt",
    images: ["https://tanav.me/og.png"],
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
    <html suppressHydrationWarning>
      <body className={`${sans.className} antialiased`}>
        <TooltipProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <PostHogProvider>
              <ScrollProgress className="h-1" />
              <div className="mx-auto max-w-2xl overflow-- py-5 border-l border-r border-(--border) border-dotted-r min-h-screen main scroll-smooth">
                <Border />
                <header className="px-3 sm:px-6 flex items-center justify-between py-3">
                  <Navbar />
                  <ThemeToggle />
                </header>
                <Border />
                <main className="my-6">{children}</main>
                <Border />
                <footer className="my-3">
                  <div className="flex flex-col items-center justify-center gap-2 text-sm text-(--text-muted)">
                    built with ❤️ by Tanav
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

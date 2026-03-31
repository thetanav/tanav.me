import "./global.css";
import type { Metadata } from "next";
import { Navbar } from "./components/nav";
import { DM_Sans } from "next/font/google";
import { PostHogProvider } from "./components/PostHogProvider";
import { ThemeProvider } from "./components/theme-provider";
import { ThemeToggle } from "./components/theme-toggle";
import { TooltipProvider } from "@/components/ui/tooltip";
import Border from "./components/border";
import { ViewTransition } from "react";

const sans = DM_Sans({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tanav.me"),
  title: {
    default: "Tanav",
    template: "%s",
  },
  description:
    "Tanav Poswal is a Fullstack developer from India with proficiency in Web and AI.",
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
      <ViewTransition>
        <body className={`${sans.className} antialiased`}>
          <TooltipProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange={false}>
              <PostHogProvider>
                <div className="mx-auto max-w-2xl overflow-hidden py-5 min-h-screen border scroll-smooth bg-background relative sm:px-[18px]">
                  <header className="px-2 sm:px-5 flex items-center justify-between py-4 pt-0">
                    <Navbar />
                    <ThemeToggle />
                  </header>
                  <Border />
                  <main className="my-6">{children}</main>
                  <Border />

                  <div className="absolute h-full w-5 bottom-0 top-0 -right-px border-x border-x-(--border) bg-[image:repeating-linear-gradient(315deg,_var(--border)_0,_var(--border)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed hidden sm:block" />
                  <div className="absolute h-full w-5 top-0 bottom-0 -left-px border-x border-x-(--border) bg-[image:repeating-linear-gradient(315deg,_var(--border)_0,_var(--border)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed hidden sm:block" />
                </div>
              </PostHogProvider>
            </ThemeProvider>
          </TooltipProvider>
        </body>
      </ViewTransition>
    </html>
  );
}

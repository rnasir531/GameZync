import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import GlobalLayoutWrapper from "@/components/GlobalLayoutWrapper";
import { getCachedSettings } from "@/lib/getSettings";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"]
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"]
});

export const dynamic = 'force-dynamic';

export const viewport = {
  themeColor: '#10b981',
};

export async function generateMetadata() {
  let siteName = "Gamer's Cafe";
  let siteDesc = "The ultimate PC gaming platform. Sync your hardware specs, play instant web games, and download PC titles.";
  let keywords = "";

  try {
    const settings = await getCachedSettings();
    if (settings.site_name) siteName = settings.site_name;
    if (settings.site_description) siteDesc = settings.site_description;
    if (settings.seo_keywords) keywords = settings.seo_keywords;
  } catch (e) {
    console.error("Error fetching SEO settings:", e);
  }

  const siteUrl = 'https://game-zync.vercel.app';
  const shareImageUrl = 'https://game-zync.vercel.app/og-image.jpg';
  const logoUrl = 'https://game-zync.vercel.app/gamezync-logo.png';

  return {
    metadataBase: new URL(siteUrl),
    manifest: '/manifest.json',
    title: {
      template: '%s | ' + siteName,
      default: siteName,
    },
    description: siteDesc,
    keywords: keywords,
    icons: {
      icon: [
        { url: '/favicon.png?v=2', type: 'image/png' },
        { url: '/icon-192.png?v=2', sizes: '192x192', type: 'image/png' },
        { url: '/icon-512.png?v=2', sizes: '512x512', type: 'image/png' },
      ],
      shortcut: '/favicon.png?v=2',
      apple: '/apple-icon.png?v=2',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      title: siteName,
      description: siteDesc,
      url: siteUrl,
      siteName: siteName,
      images: [
        {
          url: shareImageUrl,
          secureUrl: shareImageUrl,
          width: 1200,
          height: 630,
          type: 'image/jpeg',
          alt: siteName,
        },
        {
          url: logoUrl,
          secureUrl: logoUrl,
          width: 512,
          height: 512,
          type: 'image/png',
          alt: siteName,
        }
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: siteName,
      description: siteDesc,
      images: [shareImageUrl],
    },
    alternates: {
      canonical: '/',
    },
  };
}

export default async function RootLayout({ children }) {
  let googleAnalyticsId = "";
  let siteSettings = {};
  
  try {
    siteSettings = await getCachedSettings();
    if (siteSettings.seo_google_analytics) {
      googleAnalyticsId = siteSettings.seo_google_analytics.trim();
    }
  } catch (e) {
    console.error("Error fetching settings in layout:", e);
  }

  const bodyClass = siteSettings.nav_sidebar_splitter === 'true' ? "nav-splitter-on" : "";

  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth" className={`${inter.variable} ${jakarta.variable}`}>
      <head>
        <meta httpEquiv="Content-Security-Policy" content="script-src 'self' 'unsafe-inline' 'unsafe-eval' blob: https:; script-src-elem 'self' 'unsafe-inline' 'unsafe-eval' blob: https:; worker-src 'self' blob:; frame-src 'self' https: blob:; child-src 'self' https: blob:; default-src 'self' http: https: data: blob: 'unsafe-inline' 'unsafe-eval';" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/icon-512.png" />
        <link rel="icon" type="image/svg+xml" href="/icon.svg" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icon-192.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        {googleAnalyticsId ? (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}></script>
            <script dangerouslySetInnerHTML={{__html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${googleAnalyticsId}',{page_path:window.location.pathname});`}} />
          </>
        ) : null}
      </head>
      <body suppressHydrationWarning className={`${bodyClass} frontend-app`.trim()}>
        <GlobalLayoutWrapper siteSettings={siteSettings}>
          {children}
        </GlobalLayoutWrapper>
      </body>
    </html>
  );
}

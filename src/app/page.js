import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import FeaturedCarousel from '../components/home/FeaturedCarousel';
import LatestGames from '../components/home/LatestGames';

const InstantGames = dynamic(() => import('../components/home/InstantGames'), { loading: () => <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>Loading instant games...</div> });
const LowEndGames = dynamic(() => import('../components/home/LowEndGames'), { loading: () => <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>Loading low end games...</div> });
const HighEndGames = dynamic(() => import('../components/home/HighEndGames'), { loading: () => <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>Loading high end games...</div> });

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "url": process.env.NEXT_PUBLIC_SITE_URL || 'https://gamezync.vercel.app',
    "name": "GameZync",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://gamezync.vercel.app'}/library?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <h1 style={{ position: 'absolute', width: '1px', height: '1px', padding: '0', margin: '-1px', overflow: 'hidden', clip: 'rect(0, 0, 0, 0)', whiteSpace: 'nowrap', borderWidth: '0' }}>
        GameZync - Download Free PC Games
      </h1>
      <Suspense fallback={<div style={{ height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading featured games...</div>}>
        <FeaturedCarousel />
      </Suspense>

      <div id="home-view-wrapper">
        <Suspense fallback={<div style={{ padding: '40px', textAlign: 'center' }}>Loading latest games...</div>}>
          <LatestGames />
        </Suspense>

        <InstantGames />
        <LowEndGames />
        <HighEndGames />
      </div>
    </>
  );
}

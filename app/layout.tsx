// import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import { Messages } from '@/utils/types.d';
import { Metadata } from 'next';
import { GoogleAnalytics } from '@next/third-parties/google';

export async function generateMetadata(): Promise<Metadata> {
  const messages = (await getMessages()) as Messages;
  const meta = messages.MetaTags;
  return {
    metadataBase: new URL('https://mike-vega.dev'),
    title: meta?.title,
    description: meta?.description,
    keywords: meta?.keywords,
    authors: [{ name: meta?.author }],
    openGraph: {
      title: meta?.ogTitle,
      description: meta?.description,
      images: [meta?.ogImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: meta?.ogTitle,
      description: meta?.description,
      images: [meta?.twitterImage],
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const messages = await getMessages();
  const locale = await getLocale();

  return (
    <html lang={locale}>
      <head>
        <GoogleAnalytics gaId='G-6RY5XLBCK1' />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <AppProvider>{children}</AppProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

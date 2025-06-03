// import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import { GoogleTagManager } from '@next/third-parties/google';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const messages = await getMessages();
  const locale = await getLocale();

  return (
    <html lang={locale}>
      <body>
        <GoogleTagManager gtmId='G-ZHDVTEFPSH' />
        <NextIntlClientProvider messages={messages}>
          <AppProvider>{children}</AppProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

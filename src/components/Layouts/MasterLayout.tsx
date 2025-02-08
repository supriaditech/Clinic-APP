import React from 'react';
import Navbar from './Navbar';
import Head from 'next/head';

interface MasterLayoutProps {
  children: React.ReactNode;
  title: string;
  navbarShow?: boolean;
}

function MasterLayout({
  children,
  title,
  navbarShow = true,
}: MasterLayoutProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="relative flex flex-col min-h-screen">
        <Navbar navbarShow={navbarShow} />
        <main className="flex-grow w-full mx-auto mt-16 sm:mt-20 ">
          {children}
        </main>
      </div>
    </>
  );
}

export default MasterLayout;

import React from 'react';
import Navbar from './Navbar';
import Head from 'next/head';

interface MasterLayoutProps {
  children: React.ReactNode;
  title: string;
}

function MasterLayout({ children, title }: MasterLayoutProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="relative flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow w-full mx-auto mt-20 ">{children}</main>
      </div>
    </>
  );
}

export default MasterLayout;

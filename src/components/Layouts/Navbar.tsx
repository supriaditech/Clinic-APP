import Link from 'next/link';
import { LoadingImage } from './LazyLoading/LoadingImage';
import { useRouter } from 'next/router';
import { div } from 'framer-motion/client';

interface TabItem {
  nama: string;
  slug: string;
}

interface navbarProps {
  navbarShow: boolean;
}
const Navbar = ({ navbarShow }: navbarProps) => {
  const router = useRouter();
  const tabs = [
    {
      nama: 'Beranda',
      slug: '',
    },
    {
      nama: 'Layanan',
      slug: 'layanan',
    },
    {
      nama: 'Cari Klinik',
      slug: 'cari-klinik',
    },
    {
      nama: 'Tentang Kami',
      slug: 'tentang-kami',
    },
    {
      nama: 'Blog',
      slug: 'blog',
    },
    {
      nama: 'Hubungi Kami',
      slug: 'hubungi-kami',
    },
  ];

  return (
    <nav className="fixed w-full  z-[999] top-0 p-4 bg-white text-gray-700 shadow">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-lg font-bold">
          <Link href="/">
            <LoadingImage
              src="/image/Logo.png"
              width={120}
              height={20}
              className="w-28 lg:w-auto h-auto aspect-auto"
              alt="Logo"
            />
          </Link>
        </div>

        {/* Desktop Navbar */}
        <div className="hidden sm:flex flex-row justify-between items-center w-full">
          {navbarShow ? (
            <ul className="flex space-x-2 lg:space-x-8 w-full justify-center">
              {tabs.map((item: TabItem, index: number) => (
                <li
                  key={index}
                  className={`${
                    router.pathname === `/${item.slug}` ? 'text-green-600' : ''
                  }`}
                >
                  <Link
                    href={`/${item.slug}`}
                    className="hover:text-green-600 text-sm lg:text-md font-bold"
                  >
                    {item.nama}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div />
          )}
          <div className="px-6 py-1 bg-[radial-gradient(circle,_#F3FFFD,_#eef5eb)] rounded-[2vw]">
            <LoadingImage
              src="/image/photoProfile.png"
              width={120}
              height={20}
              className="w-8 h-8 lg:w-auto lg:h-auto aspect-auto"
              alt="Logo"
            />
          </div>
        </div>

        {/* Mobile Navbar */}
        {/* <div className="flex flex-row gap-1 items-center lg:hidden">
          <LanguageSwitcher />
          {session != null ? (
            <div
              onClick={openDrawer}
              className={`p-2 rounded-full ${theme === 'dark' ? 'bg-white text-gray-800 hover:bg-gray-100' : 'bg-gray-800 text-white hover:bg-gray-500'}`}
            >
              <GiHamburgerMenu />
            </div>
          ) : (
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full flex flex-col justify-center items-center ${theme === 'dark' ? 'bg-white text-gray-800' : 'bg-gray-800 text-white'}`}
            >
              {theme === 'light' ? <MdOutlineNightlight /> : <MdNightlight />}
            </button>
          )}
          {open && (
            <DrawerNavbar
              session={session}
              open={open}
              openDrawer={openDrawer}
              closeDrawer={closeDrawer}
              handleLogout={handleLogout}
            />
          )}
        </div> */}
      </div>
    </nav>
  );
};

export default Navbar;

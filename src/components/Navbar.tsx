// components/Navbar.js
import Link from 'next/link';
import { Button } from './ui/button';

const Navbar = () => {
  return (
    <nav className="flex justify-between bg-transparent text-white pt-6 px-48">
      <figure>
        <img className="h-8 w-48" src="/logo.svg" alt="Logo" />
      </figure>
      <article className="flex flex-row gap-x-2">
        <Link href="/">
          <p className="px-3 py-2 rounded-md text-sm font-medium">Exchange</p>
        </Link>
        <Link href="/transactions">
          <p className="px-3 py-2 rounded-md text-sm font-medium">Last Transactions</p>
        </Link>
        <Link href="/invite-friends">
          <p className="px-3 py-2 rounded-md text-sm font-medium">Invite Friend</p>
        </Link>
        <Link href="/notifications">
          <p className="px-3 py-2 rounded-md text-sm font-medium">Notifications</p>
        </Link>
      </article>
      <article className="flex gap-x-4">
        <Button variant="custom" className="bg-transparent">
          LOG IN
        </Button>
        <Button variant="custom" className="">
          SIGN UP
        </Button>
      </article>
    </nav>
  );
};

export default Navbar;

{
  /* <nav className="text-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center justify-between">
            <div className="flex-shrink-0">
            <img className="h-8 w-48" src="/logo.svg" alt="Logo" />
            </div>
            <div>
              <div className="ml-10 flex items-baseline space-x-4">
                <Link href="/">
                  <p className="px-3 py-2 rounded-md text-sm font-medium">Exchange</p>
                </Link>
                <Link href="/transactions">
                  <p className="px-3 py-2 rounded-md text-sm font-medium">Last Transactions</p>
                </Link>
                <Link href="/invite-friends">
                  <p className="px-3 py-2 rounded-md text-sm font-medium">Invite Friend</p>
                </Link>
                <Link href="/notifications">
                  <p className="px-3 py-2 rounded-md text-sm font-medium">Notifications</p>
                </Link>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <div>
              <div className="ml-4 flex items-center md:ml-6 gap-4">
                  <Button variant='custom' className="bg-transparent">LOG IN</Button>
                  <Button variant='custom' className="">SIGN UP</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav> */
}

import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="sticky -top-px bg-white text-sm font-medium text-black ring-1 ring-gray-900 ring-opacity-5 border-t shadow-sm shadow-gray-100 pt-6 md:pb-6 -mt-px dark:bg-slate-900 dark:border-gray-800 dark:shadow-slate-700/[.7]" aria-label="Jump links">
            <div className="max-w-7xl snap-x w-full flex items-center overflow-x-auto scrollbar-x px-4 sm:px-6 lg:px-8 pb-4 md:pb-0 mx-auto dark:scrollbar-x">
                <div className="snap-center shrink-0 pr-5 sm:pr-8 sm:last-pr-0">
                    <Link className="inline-flex items-center gap-x-2 hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-500" href="/product">Product</Link>
                </div>
                <div className="snap-center shrink-0 pr-5 sm:pr-8 sm:last:pr-0">
                    <Link className="inline-flex items-center gap-x-2 hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-500" href="#">OnSale</Link>
                </div>
                <div className="snap-center shrink-0 pr-5 sm:pr-8 sm:last:pr-0">
                    <Link className="inline-flex items-center gap-x-2 hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-500" href="#">PC</Link>
                </div>
                <div className="snap-center shrink-0 pr-5 sm:pr-8 sm:last:pr-0">
                    <Link className="inline-flex items-center gap-x-2 hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-500" href="#">Console</Link>
                </div>
                <div className="snap-center shrink-0 pr-5 sm:pr-8 sm:last:pr-0">
                    <Link className="inline-flex items-center gap-x-2 hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-500" href="#">Accessories</Link>
                </div>
                <div className="snap-center shrink-0 pr-5 sm:pr-8 sm:last:pr-0">
                    <Link className="inline-flex items-center gap-x-2 hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-500" href="#">Controllers</Link>
                </div>
            </div>
        </nav>
    )
}

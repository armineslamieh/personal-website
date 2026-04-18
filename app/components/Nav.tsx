import Link from 'next/link'


const links = [
    {href: '/about', label: 'About'},
    {href: '/contact', label: 'Contact'},
    {href: '/dpb', label: 'DPB'},
    {href: '/projects', label: 'Projects'},
];

export default function Nav() {
    return (
        <nav className="absolute top-2 left-0 right-0 z-10 flex justify-between items-center px-6 py-4 ml-10 mr-10">
            <Link href="/" className="font-extrabold text-2xl">Armin Eslamieh</Link>
            <div className="flex gap-30 ">
            {links.map((l) => (
                <Link href={l.href} key={l.href} className="text-white hover:scale-130 transition-all duration-300">
                    {l.label}
                </Link>
            ))}
            </div>
            <Link href="/thoughts" className="text-white hover:scale-130 transition-all duration-300">Thoughts →</Link>
        </nav>
    )
}
import Link from 'next/link'


const links = [
    {href: '/', label: 'Home'},
    {href: '/about', label: 'About'},
    {href: '/contact', label: 'Contact'},
    {href: '/dpb', label: 'DPB'},
    {href: '/projects', label: 'Projects'},
    {href: '/thoughts', label: 'Thoughts'},
];

export default function Nav() {
    return (
        <nav className="flex gap-6 border-b border-zinc-200 dark:border-zinc-800 px-6 py-4">
            {links.map((l) => (
                <Link href={l.href} key={l.href} className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50">
                    {l.label}
                </Link>
            ))}
        </nav>
    )
}
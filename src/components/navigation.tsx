'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"


const navItems = [
    {href: "/", label: "Home"},
    {href: "/build", label: "Build Resume"},
    {href: "/about", label: "About Us"}
]

export default function Navigation(){
    const pathname: String = usePathname();

    return (
        <nav className="bg-white/95 backdrop-blur-md rounded-2xl p-6 mb-8 shadow-lg">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-2xl font-bold text-blue-600">
                🎓 Resume Builder
                </div>
                <div className="flex gap-8">
                {navItems.map((item) => (
                    <Link
                    key={item.href}
                    href={item.href}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                        pathname === item.href
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-700 hover:bg-blue-600 hover:text-white'
                    }`}
                    >
                    {item.label}
                    </Link>
                ))}
                </div>
            </div>
        </nav>
    )


}
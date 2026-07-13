"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const TRANSPARENT = "#00000000"; // fully transparent (some browsers ignore)
const DARK = "#0b0505";           // your body color

const THEME_COLORS: Record<string, string> = {
    "/": DARK,
    "/about": DARK,
    "/thoughts": DARK,
    "/projects": DARK,
    "/contact": DARK,
};

function getThemeColor(pathname: string): string {
    if (THEME_COLORS[pathname]) return THEME_COLORS[pathname];
    for (const [route, color] of Object.entries(THEME_COLORS)) {
        if (route !== "/" && pathname.startsWith(route)) return color;
    }
    return DARK;
}

export default function ThemeColorUpdater() {
    const pathname = usePathname();

    useEffect(() => {
        const color = getThemeColor(pathname);
        let meta = document.querySelector('meta[name="theme-color"]');
        if (!meta) {
            meta = document.createElement("meta");
            meta.setAttribute("name", "theme-color");
            document.head.appendChild(meta);
        }
        meta.setAttribute("content", color);
    }, [pathname]);

    return null;
}
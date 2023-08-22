'use client'

import React from "react"
import { useTheme as useNextThemeHook } from "next-themes"

export default function useTheme() {
    const [first, setFirst] = React.useState<boolean>()
    const { theme, setTheme } = useNextThemeHook()
    const isDark = theme === 'dark'

    React.useEffect(() => {
        if (isDark) {
            setFirst(true);
        } else {
            setFirst(false);
        }
    }, [isDark])

    const toggleTheme: () => any = () => {
        if (isDark) {
            setTheme('light')
        } else {
            setTheme('dark')
        }
    }

    return { isDark: !!first, toggleTheme }
}
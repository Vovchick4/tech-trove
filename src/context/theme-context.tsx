'use client'

import { useLocalStorage } from "@/hooks"
import React from "react"

interface IThemeContext {
    isDark: boolean,
    toggleTheme: () => void
}

const ThemeContext = React.createContext<IThemeContext>({} as IThemeContext)

interface IThemeProvider {
    children: React.ReactNode
}

export function useTheme() {
    return React.useContext(ThemeContext)
}

export default function ThemeProvider({ children }: IThemeProvider) {
    const [theme, setTheme] = useLocalStorage<boolean>("isDark", false)

    React.useEffect(() => {
        if (theme) {
            document.documentElement.classList.add('dark')
            document.documentElement.classList.remove('light')
        } else {
            document.documentElement.classList.add('light')
            document.documentElement.classList.remove('dark')
        }
    }, [theme])

    function toggleTheme() {
        setTheme((prev) => !prev)
    }

    return (
        <ThemeContext.Provider value={{ isDark: theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

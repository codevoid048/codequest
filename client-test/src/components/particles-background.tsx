import { useCallback, useEffect, useState } from "react"
import Particles from "react-tsparticles"
import { loadSlim } from "tsparticles-slim"
import { useTheme } from "@/context/ThemeContext"

export function ParticlesBackground() {
    const { theme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const particlesInit = useCallback(async (engine: any) => {
        await loadSlim(engine)
    }, [])

    if (!mounted) return null

    const isDarkMode = theme === "dark"

    return (
        <Particles
            id="tsparticles"
            init={particlesInit}
            className="absolute inset-0 -z-10"
            options={{
                fullScreen: false,
                background: {
                    color: {
                        value: "transparent",
                    },
                },
                fpsLimit: 120,
                particles: {
                    color: {
                        value: isDarkMode ? "#ffffff" : "#3b82f6",
                    },
                    links: {
                        color: isDarkMode ? "#ffffff" : "#3b82f6",
                        distance: 150,
                        enable: true,
                        opacity: isDarkMode ? 0.2 : 0.3,
                        width: 1,
                    },
                    move: {
                        direction: "none",
                        enable: true,
                        outModes: {
                            default: "bounce",
                        },
                        random: false,
                        speed: 1,
                        straight: false,
                    },
                    number: {
                        density: {
                            enable: true,
                            area: 800,
                        },
                        value: 80,
                    },
                    opacity: {
                        value: isDarkMode ? 0.3 : 0.5,
                    },
                    shape: {
                        type: "circle",
                    },
                    size: {
                        value: { min: 1, max: 3 },
                    },
                },
                detectRetina: true,
            }}
        />
    )
}
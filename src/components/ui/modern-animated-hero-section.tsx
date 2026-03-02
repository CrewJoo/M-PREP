"use client"

import type React from "react"
import { useState, useEffect, useCallback, useRef } from "react"

interface Character {
    char: string
    x: number
    y: number
    speed: number
}

export class TextScramble {
    el: HTMLElement
    chars: string
    queue: Array<{
        from: string
        to: string
        start: number
        end: number
        char?: string
    }>
    frame: number
    frameRequest: number
    resolve: (value: void | PromiseLike<void>) => void

    constructor(el: HTMLElement) {
        this.el = el
        this.chars = '!<>-_\\/[]{}?=+*^?#ヲあ가나다'
        this.queue = []
        this.frame = 0
        this.frameRequest = 0
        this.resolve = () => { }
        this.update = this.update.bind(this)
    }

    setText(newText: string) {
        const oldText = this.el.innerText
        const length = Math.max(oldText.length, newText.length)
        const promise = new Promise<void>((resolve) => this.resolve = resolve)
        this.queue = []

        for (let i = 0; i < length; i++) {
            const from = oldText[i] || ''
            const to = newText[i] || ''
            const start = Math.floor(Math.random() * 40)
            const end = start + Math.floor(Math.random() * 40)
            this.queue.push({ from, to, start, end })
        }

        cancelAnimationFrame(this.frameRequest)
        this.frame = 0
        this.update()
        return promise
    }

    update() {
        let output = ''
        let complete = 0

        for (let i = 0, n = this.queue.length; i < n; i++) {
            const item = this.queue[i]
            if (!item) continue;
            const { from, to, start, end } = item
            let char = item.char

            if (this.frame >= end) {
                complete++
                output += to
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.chars[Math.floor(Math.random() * this.chars.length)]
                    item.char = char // TS ERROR FIXED
                }
                output += `<span class="text-slate-400 opacity-70">${char}</span>`
            } else {
                output += from
            }
        }

        this.el.innerHTML = output
        if (complete === this.queue.length) {
            this.resolve()
        } else {
            this.frameRequest = requestAnimationFrame(this.update)
            this.frame++
        }
    }
}

export const ScrambledText: React.FC<{ phrases: string[], className?: string }> = ({ phrases, className }) => {
    const elementRef = useRef<HTMLSpanElement>(null)
    const scramblerRef = useRef<TextScramble | null>(null)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        if (elementRef.current && !scramblerRef.current) {
            scramblerRef.current = new TextScramble(elementRef.current)
            setMounted(true)
        }
    }, [])

    useEffect(() => {
        if (mounted && scramblerRef.current && phrases.length > 0) {
            let counter = 0
            let isUnmounted = false;

            const next = () => {
                if (isUnmounted || !scramblerRef.current) return;
                const nextPhrase = phrases[counter] || "";
                scramblerRef.current.setText(nextPhrase).then(() => {
                    if (!isUnmounted) {
                        setTimeout(next, 3000)
                    }
                })
                counter = (counter + 1) % phrases.length
            }

            next()
            return () => { isUnmounted = true; }
        }
    }, [mounted, phrases])

    return (
        <span
            ref={elementRef}
            className={className}
            style={{ fontFamily: 'monospace' }}
        >
            {phrases[0] || ""}
        </span>
    )
}

export const RainingLettersBg: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className = "" }) => {
    const [characters, setCharacters] = useState<Character[]>([])
    const [activeIndices, setActiveIndices] = useState<Set<number>>(new Set())

    const createCharacters = useCallback(() => {
        const allChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?"
        // Reduce density for light theme to not be too overwhelming
        const charCount = 100
        const newCharacters: Character[] = []

        for (let i = 0; i < charCount; i++) {
            newCharacters.push({
                char: allChars[Math.floor(Math.random() * allChars.length)] || "A",
                x: Math.random() * 100,
                y: Math.random() * 100,
                speed: 0.05 + Math.random() * 0.15,
            })
        }

        return newCharacters
    }, [])

    useEffect(() => {
        setCharacters(createCharacters())
    }, [createCharacters])

    useEffect(() => {
        const updateActiveIndices = () => {
            const newActiveIndices = new Set<number>()
            const numActive = Math.floor(Math.random() * 3) + 2 // 2~4 active at a time
            for (let i = 0; i < numActive; i++) {
                newActiveIndices.add(Math.floor(Math.random() * characters.length))
            }
            setActiveIndices(newActiveIndices)
        }

        const flickerInterval = setInterval(updateActiveIndices, 100)
        return () => clearInterval(flickerInterval)
    }, [characters.length])

    useEffect(() => {
        let animationFrameId: number

        const updatePositions = () => {
            setCharacters(prevChars =>
                prevChars.map(char => ({
                    ...char,
                    y: char.y + char.speed,
                    ...(char.y >= 100 && {
                        y: -5,
                        x: Math.random() * 100,
                        char: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?"[
                            Math.floor(Math.random() * "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?".length)
                        ],
                    }),
                }))
            )
            animationFrameId = requestAnimationFrame(updatePositions)
        }

        animationFrameId = requestAnimationFrame(updatePositions)
        return () => cancelAnimationFrame(animationFrameId)
    }, [])

    return (
        <div className={`relative w-full ${className}`}>
            {/* Raining Characters Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none flex items-center justify-center">
                {/* Adds a slight gradient overlay to make the letters blend nicely with light background */}
                <div className="absolute inset-0 z-10 bg-gradient-to-b from-white/20 via-transparent to-white/80" />

                {characters.map((char, index) => {
                    const isActive = activeIndices.has(index);
                    const isGreen = index % 2 === 0; // mix of green and purple

                    return (
                        <span
                            key={index}
                            className={`absolute text-xl transition-all duration-300 pointer-events-none ${isActive
                                ? (isGreen ? "text-emerald-500 font-bold scale-125 z-0" : "text-violet-500 font-bold scale-125 z-0")
                                : "text-slate-200/60 font-light"
                                }`}
                            style={{
                                left: `${char.x}%`,
                                top: `${char.y}%`,
                                textShadow: isActive
                                    ? (isGreen ? '0 0 12px rgba(16,185,129,0.3)' : '0 0 12px rgba(139,92,246,0.3)')
                                    : 'none',
                                opacity: isActive ? 0.6 : 0.3,
                                transition: 'color 0.2s, transform 0.2s, text-shadow 0.2s',
                                willChange: 'transform, top',
                            }}
                        >
                            {char.char}
                        </span>
                    )
                })}
            </div>

            {/* Foreground Content */}
            <div className="relative z-20">
                {children}
            </div>
        </div>
    )
}

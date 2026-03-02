import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://think-prep.vercel.app' // Update with your actual domain

    // Static routes
    const routes = [
        '',
        '/about/prep',
        '/prep-word-dancing',
        '/prep-training',
        '/prep-transform',
        '/prep-level-check',
        '/m-prep-intro',
        '/m-prep-models',
        '/m-prep-cases',
        '/m-prep-simulator',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: route === '' ? 1 : 0.8,
    }))

    return routes
}

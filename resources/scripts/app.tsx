import '@/app.css'
import { ThemeProvider } from '@/providers/theme-provider.tsx'
import '@fontsource/geist-sans'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import React from 'react'
import ReactDOM from 'react-dom/client'

import NotFound from '@/components/ui/Navigation/NotFound.tsx'

import { routeTree } from './routeTree.gen'

const router = createRouter({
    routeTree,
    defaultNotFoundComponent: NotFound,
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <ThemeProvider storageKey='theme'>
            <RouterProvider router={router} />
        </ThemeProvider>
    </React.StrictMode>
)

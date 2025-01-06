import '@/app.css'
import { ThemeProvider } from '@/providers/theme-provider.tsx'
import '@fontsource/geist-sans'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import React from 'react'
import ReactDOM from 'react-dom/client'

import ErrorComponent from '@/components/ui/Navigation/ErrorPages/ErrorComponent.tsx'
import NotFoundComponent from '@/components/ui/Navigation/ErrorPages/NotFoundComponent.tsx'

import { routeTree } from './routeTree.gen'

const router = createRouter({
    routeTree,
    defaultNotFoundComponent: NotFoundComponent,
    defaultErrorComponent: ErrorComponent,
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <ThemeProvider storageKey='theme'>
            <RouterProvider router={router} />
        </ThemeProvider>
    </React.StrictMode>
)

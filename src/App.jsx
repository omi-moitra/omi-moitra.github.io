// =============================================================================
// src/App.jsx — application routes composed inside the shared Main layout
// -----------------------------------------------------------------------------
// 1. Imports & route metadata   layout, route views, and required paths
// 2. App                        nested route registration and fallback
// =============================================================================

import { Navigate, Route, Routes } from 'react-router-dom'
import Main from './layouts/Main.jsx'
import SetupRoutePage from './pages/SetupRoutePage.jsx'
import './App.css'

const routeDefinitions = [
  {
    path: '/',
    title: 'Home',
    description: 'The public home page foundation is ready for its page feature.',
  },
  {
    path: '/portfolio',
    title: 'Portfolio',
    description: 'The portfolio route is ready for verified project and resume content.',
  },
  {
    path: '/links',
    title: 'Links',
    description: 'The links route is ready for curated professional resources.',
  },
  {
    path: '/contact',
    title: 'Contact',
    description: 'The contact route is ready for its validated message form.',
  },
  {
    path: '/login',
    title: 'Administrator Login',
    description: 'This hidden route is reserved for the administrator sign-in feature.',
  },
  {
    path: '/back-office',
    title: 'Back Office',
    description: 'This route is registered, but no private data is loaded during setup.',
  },
]

function App() {
  return (
    <Routes>
      <Route element={<Main />}>
        {routeDefinitions.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              <SetupRoutePage
                description={route.description}
                routePath={route.path}
                title={route.title}
              />
            }
          />
        ))}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default App

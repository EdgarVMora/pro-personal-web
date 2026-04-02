import { createBrowserRouter } from 'react-router-dom'
import Home from '../pages/Home'
import Projects from '../pages/Projects'
import Methodology from '../pages/Methodology'

export const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/projects', element: <Projects /> },
  { path: '/methodology', element: <Methodology /> },
])

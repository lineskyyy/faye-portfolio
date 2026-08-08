import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Scrolls the window to the top whenever the route changes.
 * This component should be rendered once inside the router (e.g., inside <BrowserRouter>).
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to the top of the window (0, 0) on every pathname change.
    window.scrollTo(0, 0);
  }, [pathname]);

  // This component doesn't render anything visually.
  return null;
}
import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { NavigationHeader } from './components/ui/NavigationHeader';
import { ErrorBoundary } from './components/ui/ErrorBoundary';
import HomePage from './pages/HomePage';
import ShowcasePage from './pages/ShowcasePage';
import StorePage from './pages/StorePage';

// Lazy load the StudioPage
const StudioPage = lazy(() => import('./pages/StudioPage'));

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0B0E14] text-slate-100 flex flex-col w-full">
      <NavigationHeader />
      <main className="flex-1 relative flex flex-col min-h-0">
        <Outlet />
      </main>
    </div>
  );
};

const LoadingScreen: React.FC = () => (
  <div className="w-full h-full min-h-[60vh] flex flex-col items-center justify-center gap-4">
    <div className="w-12 h-12 border-4 border-neonCyan/20 border-t-neonCyan rounded-full animate-spin" />
    <p className="text-slate-400 font-mono text-sm animate-pulse">Initializing 3D Engine...</p>
  </div>
);

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary componentName="AppRoot">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="showcase" element={<ShowcasePage />} />
            <Route path="store" element={<StorePage />} />
            <Route 
              path="studio" 
              element={
                <Suspense fallback={<LoadingScreen />}>
                  <StudioPage />
                </Suspense>
              } 
            />
          </Route>
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default App;

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { PropsWithChildren } from 'react';
import { useAuth } from '@companyio/auth-react';

import { AppLayout, ScrollToTop } from '@companyio/platform-ui';
import { sidebarConfig } from './config/sidebar';

import SignIn from './pages/AuthPages/SignIn';
import SignUp from './pages/AuthPages/SignUp';
import NotFound from './pages/OtherPage/NotFound';
import UserProfiles from './pages/UserProfiles';
import Calendar from './pages/Calendar';
import Blank from './pages/Blank';
import Home from './pages/Dashboard/Home';

function RequireAuth({ children }: PropsWithChildren) {
  const { user, isLoading } = useAuth();
  if (isLoading)
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>;
  return user ? children : <Navigate to="/signin" replace />;
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />

      <Routes>
        <Route
          element={
            <RequireAuth>
              <AppLayout config={sidebarConfig} />
            </RequireAuth>
          }
        >
          <Route index path="/" element={<Home />} />

          <Route path="/profile" element={<UserProfiles />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/blank" element={<Blank />} />
        </Route>

        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

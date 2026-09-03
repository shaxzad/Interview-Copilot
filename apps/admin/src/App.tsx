import { AppLayout, ScrollToTop } from '@companyio/platform-ui';
import { PropsWithChildren } from 'react';
import { useAuth } from '@companyio/auth-react';
import { sidebarConfig } from './config/sidebar';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import SignIn from './pages/AuthPages/SignIn';
import SignUp from './pages/AuthPages/SignUp';

import NotFound from './pages/OtherPage/NotFound';
import UserProfiles from './pages/UserProfiles';
import Calendar from './pages/Calendar';
import Blank from './pages/Blank';

import Home from './pages/Dashboard/Home';

import FormElements from './pages/Forms/FormElements';

import BasicTables from './pages/Tables/BasicTables';

import Alerts from './pages/UiElements/Alerts';
import Avatars from './pages/UiElements/Avatars';
import Badges from './pages/UiElements/Badges';
import Buttons from './pages/UiElements/Buttons';
import Images from './pages/UiElements/Images';
import Videos from './pages/UiElements/Videos';

import LineChart from './pages/Charts/LineChart';
import BarChart from './pages/Charts/BarChart';

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
        {/* Dashboard Layout */}
        <Route
          element={
            <RequireAuth>
              <AppLayout config={sidebarConfig} />
            </RequireAuth>
          }
        >
          {/* Dashboard */}
          <Route index path="/" element={<Home />} />

          {/* Other Pages */}
          <Route path="/profile" element={<UserProfiles />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/blank" element={<Blank />} />

          {/* Forms */}
          <Route path="/form-elements" element={<FormElements />} />

          {/* Tables */}
          <Route path="/basic-tables" element={<BasicTables />} />

          {/* UI Elements */}
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/avatars" element={<Avatars />} />
          <Route path="/badge" element={<Badges />} />
          <Route path="/buttons" element={<Buttons />} />
          <Route path="/images" element={<Images />} />
          <Route path="/videos" element={<Videos />} />

          {/* Charts */}
          <Route path="/line-chart" element={<LineChart />} />
          <Route path="/bar-chart" element={<BarChart />} />
        </Route>

        {/* Authentication */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

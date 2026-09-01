import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { AppLayout, ScrollToTop } from '@companyio/platform-ui';
import { sidebarConfig } from './config/sidebar';

import SignIn from './pages/AuthPages/SignIn';
import SignUp from './pages/AuthPages/SignUp';
import NotFound from './pages/OtherPage/NotFound';
import UserProfiles from './pages/UserProfiles';
import Calendar from './pages/Calendar';
import Blank from './pages/Blank';
import Home from './pages/Dashboard/Home';

export default function App() {
  return (
    <Router>
      <ScrollToTop />

      <Routes>
        <Route element={<AppLayout config={sidebarConfig} />}>
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

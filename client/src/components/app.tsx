import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './pages/home-page';
import GuildPage from './pages/guild-page';
import LoginPage from './pages/auth/login-page';
import RegisterPage from './pages/auth/register-page';
import OverviewPage from './pages/overview-page';
import LogoutPage from './pages/auth/logout-page';
import PrivateRoute from './routing/private-route';
import NotFoundPage from './pages/not-found-page';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ready } from '../store/auth';
import { initPings } from '../store/pings';
import VerifyPage from './pages/auth/verify-page';
import InvitePage from './pages/invite-page';
import ThemePage from './pages/theme-page';
import '../types/src/permissions.types';

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ready());
    dispatch(initPings());
  }, []);

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Switch>
        {/* These routes are public and can be accessed by anyone. */}
        <Route exact path="/" component={HomePage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/logout" component={LogoutPage} />
        <Route exact path="/verify" component={VerifyPage} />
        <Route exact path="/join/:inviteId" component={InvitePage} />

        {/* Users must be logged in to use private routes. */}
        <PrivateRoute exact path="/themes/:themeCode" component={ThemePage} />
        <PrivateRoute exact path="/channels/@me" component={OverviewPage} />
        <PrivateRoute exact path="/channels/:guildId/:channelId?" component={GuildPage} />

        {/* This route is a catch-all for any other routes that don't exist. */}
        <Route path="*" component={NotFoundPage} />
      </Switch>
    </Router>
  );
}

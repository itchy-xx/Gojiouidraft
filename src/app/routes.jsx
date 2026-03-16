import { createBrowserRouter, Navigate } from 'react-router';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { HomePage } from './pages/HomePage';
import { ExplorePage } from './pages/ExplorePage';
import { ActivityDetailPage } from './pages/ActivityDetailPage';
import { MessagesPage } from './pages/MessagesPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { SettingsPage } from './pages/SettingsPage';
import { EditActivityPage } from './pages/EditActivityPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { CreateActivityPage } from './pages/CreateActivityPage';
import { MyActivitiesPage } from './pages/MyActivitiesPage';
import { ParticipantActivitiesPage } from './pages/ParticipantActivitiesPage';
import { OrganiserActivitiesPage } from './pages/OrganiserActivitiesPage';
import { PopularEventsPage } from './pages/PopularEventsPage';
import { UpcomingEventsPage } from './pages/UpcomingEventsPage';
import { BookedEventsPage } from './pages/BookedEventsPage';
import { RecommendedEventsPage } from './pages/RecommendedEventsPage';
import { AppLayout } from './components/AppLayout';
import { ChatPage } from './pages/ChatPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Protected layout wrapper
const ProtectedLayout = ({ children }) => {
  return <AppLayout>{children}</AppLayout>;
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" replace />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/home',
    element: <ProtectedLayout><HomePage /></ProtectedLayout>,
  },
  {
    path: '/explore',
    element: <ProtectedLayout><ExplorePage /></ProtectedLayout>,
  },
  {
    path: '/activity',
    element: <ProtectedLayout><MyActivitiesPage /></ProtectedLayout>,
  },
  {
    path: '/activity/my-activities',
    element: <ProtectedLayout><MyActivitiesPage /></ProtectedLayout>,
  },
  {
    path: '/activity/participant',
    element: <ProtectedLayout><ParticipantActivitiesPage /></ProtectedLayout>,
  },
  {
    path: '/activity/organiser',
    element: <ProtectedLayout><OrganiserActivitiesPage /></ProtectedLayout>,
  },
  {
    path: '/activity/create',
    element: <ProtectedLayout><CreateActivityPage /></ProtectedLayout>,
  },
  {
    path: '/activity/edit/:id',
    element: <ProtectedLayout><EditActivityPage /></ProtectedLayout>,
  },
  {
    path: '/activity/analytics',
    element: <ProtectedLayout><AnalyticsPage /></ProtectedLayout>,
  },
  {
    path: '/activity/:id',
    element: <ProtectedLayout><ActivityDetailPage /></ProtectedLayout>,
  },
  {
    path: '/messages',
    element: <ProtectedLayout><MessagesPage /></ProtectedLayout>,
  },
  {
    path: '/messages/:chatId',
    element: <ProtectedLayout><ChatPage /></ProtectedLayout>,
  },
  {
    path: '/notifications',
    element: <ProtectedLayout><NotificationsPage /></ProtectedLayout>,
  },
  {
    path: '/settings',
    element: <ProtectedLayout><SettingsPage /></ProtectedLayout>,
  },
  {
    path: 'events/popular',
    element: <ProtectedLayout><PopularEventsPage /></ProtectedLayout>,
  },
  {
    path: 'events/upcoming',
    element: <ProtectedLayout><UpcomingEventsPage /></ProtectedLayout>,
  },
  {
    path: 'events/booked',
    element: <ProtectedLayout><BookedEventsPage /></ProtectedLayout>,
  },
  {
    path: 'events/recommended',
    element: <ProtectedLayout><RecommendedEventsPage /></ProtectedLayout>,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
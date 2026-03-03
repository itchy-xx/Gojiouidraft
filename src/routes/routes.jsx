import { CreateActivityPage } from '../frontend/boundary/CreateActivityBoundary';
import { MyActivitiesPage } from '../frontend/boundary/MyActivitiesBoundary';
import { PopularEventsPage } from '../frontend/boundary/PopularEventsBoundary';
import { UpcomingEventsPage } from '../frontend/boundary/UpcomingEventsBoundary';
import { createBrowserRouter, Navigate } from 'react-router';
import { LoginPage } from '../frontend/boundary/LoginBoundary';
import { RegisterPage } from '../frontend/boundary/RegisterBoundary';
import { HomePage } from '../frontend/boundary/HomeBoundary';
import { ExplorePage } from '../frontend/boundary/ExploreBoundary';
import { ActivityDetailPage } from '../frontend/boundary/ActivityDetailBoundary';
import { MessagesPage } from '../frontend/boundary/MessagesBoundary';
import { NotificationsPage } from '../frontend/boundary/NotificationsBoundary';
import { SettingsPage } from '../frontend/boundary/SettingsBoundary';
import { EditActivityPage } from '../frontend/boundary/EditActivityBoundary';
import { AnalyticsPage } from '../frontend/boundary/AnalyticsBoundary';
import { AppLayout } from '../frontend/components/AppLayout';
import { ChatPage } from '../frontend/boundary/ChatBoundary';
// Protected layout wrapper
const ProtectedLayout = ({ children }) => {
    return <AppLayout>{children}</AppLayout>;
};
export const router = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to="/login" replace/>,
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
        path: '*',
        element: <Navigate to="/home" replace/>,
    },
]);

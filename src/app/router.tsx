import React, { Suspense, lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { AppShell } from './AppShell';
import { GatewayScreen } from '../features/gateway/GatewayScreen';
import { ProjectDocsScreen } from '../features/docs/ProjectDocsScreen';
import { ProjectOverviewDocsScreen } from '../features/docs/ProjectOverviewDocsScreen';
import { HomeScreen } from '../features/home/HomeScreen';
import { MechanicsDirectoryScreen } from '../features/mechanics/MechanicsDirectoryScreen';
import { VendorProfileScreen } from '../features/mechanics/VendorProfileScreen';
import { BookingScreen } from '../features/mechanics/BookingScreen';
import { PartsLocatorScreen } from '../features/parts/PartsLocatorScreen';
import { RequestsScreen } from '../features/requests/RequestsScreen';
import { GarageScreen } from '../features/garage/GarageScreen';
import { DssScreen } from '../features/dss/DssScreen';
import { SosScreen } from '../features/sos/SosScreen';
import {
  ProfileScreen,
  NotificationsScreen,
  LoginScreen,
  StyleguideScreen,
} from '../features/profile/ProfileAndExtras';

const CairoMapScreen = lazy(() =>
  import('../features/map/CairoMapScreen').then((m) => ({
    default: m.CairoMapScreen,
  }))
);

const FuelLogScreen = lazy(() =>
  import('../features/garage/FuelLogScreen').then((m) => ({
    default: m.FuelLogScreen,
  }))
);

const FallbackLoader: React.FC = () => (
  <div className="p-8 text-center text-body-md text-neutral-slate">
    Loading...
  </div>
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: <GatewayScreen />,
  },
  {
    path: '/docs',
    element: <ProjectDocsScreen />,
  },
  {
    path: '/docs/overview',
    element: <ProjectOverviewDocsScreen />,
  },
  {
    element: <AppShell />,
    children: [
      { path: '/home', element: <HomeScreen /> },
      { path: '/demo', element: <HomeScreen /> },
      { path: '/mechanics', element: <MechanicsDirectoryScreen /> },
      { path: '/mechanics/:id', element: <VendorProfileScreen /> },
      { path: '/book/:providerId', element: <BookingScreen /> },
      { path: '/parts', element: <PartsLocatorScreen /> },
      { path: '/parts/:id', element: <PartsLocatorScreen /> },
      {
        path: '/map',
        element: (
          <Suspense fallback={<FallbackLoader />}>
            <CairoMapScreen />
          </Suspense>
        ),
      },
      { path: '/requests', element: <RequestsScreen /> },
      { path: '/garage', element: <GarageScreen /> },
      {
        path: '/garage/fuel',
        element: (
          <Suspense fallback={<FallbackLoader />}>
            <FuelLogScreen />
          </Suspense>
        ),
      },
      { path: '/diagnose', element: <DssScreen /> },
      { path: '/sos', element: <SosScreen /> },
      { path: '/notifications', element: <NotificationsScreen /> },
      { path: '/profile', element: <ProfileScreen /> },
      { path: '/login', element: <LoginScreen /> },
      { path: '/register', element: <LoginScreen /> },
      { path: '/styleguide', element: <StyleguideScreen /> },
    ],
  },
]);

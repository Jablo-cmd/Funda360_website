/**
 * Top-level paths of the Funda360 application.
 *
 * The application used to be served from this domain and now lives on its
 * own host (see siteConfig.appLoginUrl). Old bookmarks and links in emails
 * (dashboard, password reset, account activation, parent portal, ...) still
 * point here, so the 404 page forwards any of these paths to the same path
 * on the application host, keeping the query string and #fragment.
 *
 * Source: src/app/AppRoutes.tsx in the Funda360 application repository
 * (main @ 6857975, read-only). Update this list when the application adds
 * a new top-level route. Paths owned by this website are never listed.
 */
export const appRoutePrefixes = [
  'academic',
  'activate-account',
  'admissions',
  'alumni',
  'announcements',
  'apply',
  'attendance',
  'compliance',
  'dashboard',
  'employees',
  'fees',
  'forgot-password',
  'guardians',
  'homework',
  'learner',
  'learners',
  'messages',
  'mfa-challenge',
  'my-classes',
  'my-profile',
  'notifications',
  'operations',
  'parent',
  'report-cards',
  'reports',
  'reset-password',
  'safeguarding',
  'school',
  'schools',
  'settings',
  'timetable',
  'transport',
  'trust',
  'users',
  'verify-email',
] as const;

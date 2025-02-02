import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: 'https://0d0e4724a8d0d184d33d57651747d8c2@o4508747207409664.ingest.us.sentry.io/4508747212980224',
  // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
  tracesSampleRate: 1,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
});

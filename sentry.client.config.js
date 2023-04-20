// This file configures the initialization of Sentry on the browser.
// The config you add here will be used whenever a page is visited.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import {
	ExtraErrorData as ExtraErrorDataIntegration,
	HttpClient as HttpClientIntegration,
} from '@sentry/integrations';
import * as Sentry from '@sentry/nextjs';

import {
	getSentryEnvironment,
	SENTRY_DSN,
	SENTRY_TRACE_SAMPLE_RATE,
} from './configs/sentry';

Sentry.init({
	// enabled: process.env.NODE_ENV !== 'development',
	enabled: false,
	environment: getSentryEnvironment(),
	dsn: SENTRY_DSN,
	tracesSampleRate: SENTRY_TRACE_SAMPLE_RATE,
	integrations: [
		new ExtraErrorDataIntegration({
			depth: 10,
		}),
		new HttpClientIntegration({
			failedRequestStatusCodes: [[500, 599]],
		}),
	],
	sendDefaultPii: true,
	tunnel: '/api/sentry/tunnel', // should be configured here for self hosted
});

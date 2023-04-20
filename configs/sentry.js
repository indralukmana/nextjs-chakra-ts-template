export const SENTRY_DSN =
	process.env.SENTRY_DSN ||
	process.env.NEXT_PUBLIC_SENTRY_DSN ||
	'https://c823007a653e4758b385e80bc9a1b56e@sentry-scrum.impstudio.id/19';

export const SENTRY_HOST = 'sentry-scrum.impstudio.id';

export const SENTRY_PROJECT_ID = '19';

export const SENTRY_TRACE_SAMPLE_RATE = 0.1;

export const getSentryEnvironment = () => {
	const deploymentVersion = process.env.DEPLOYMENT_ENVIRONMENT;

	const isStaging = deploymentVersion?.toLowerCase().includes('staging');
	const isProduction = deploymentVersion?.toLowerCase().includes('production');

	if (isStaging) {
		return 'staging';
	}
	if (isProduction) {
		return 'production';
	}

	return 'development';
};

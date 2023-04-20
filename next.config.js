// This file sets a custom webpack configuration to use your Next.js app
// with Sentry.
// https://nextjs.org/docs/api-reference/next.config.js/introduction
// https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/
const { withSentryConfig } = require('@sentry/nextjs');
const {
	PHASE_DEVELOPMENT_SERVER,
	PHASE_PRODUCTION_BUILD,
} = require('next/dist/shared/lib/constants');

/** @type {import('next').NextConfig} */
const nextConfigDevelopment = {
	reactStrictMode: true,
	transpilePackages: ['jotai-devtools'],
	webpack: (config) => {
		config.watchOptions = {
			poll: 1000,
			aggregateTimeout: 300,
		};
		return config;
	},
};

/** @type {import('next').NextConfig} */
const nextConfigProduction = {
	...nextConfigDevelopment,
	swcMinify: false,
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const configs = (phase, { defaultConfig }) => {
	if (phase === PHASE_DEVELOPMENT_SERVER) {
		return nextConfigDevelopment;
	}

	if (phase === PHASE_PRODUCTION_BUILD) {
		return nextConfigProduction;
	}

	return nextConfigProduction;
};

module.exports = withSentryConfig(
	configs,
	{
		silent: true,
	},
	{
		hideSourceMaps: true,
	}
);

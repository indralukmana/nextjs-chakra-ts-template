// https://github.com/getsentry/examples/issues/161

import { NextApiRequest, NextApiResponse } from 'next';

import { SENTRY_HOST, SENTRY_PROJECT_ID } from '../../../../configs/sentry';

// Change host appropriately if you run your own Sentry instance.
const sentryHost = SENTRY_HOST;
const sentryProjectId = SENTRY_PROJECT_ID;

// Set knownProjectIds to an array with your Sentry project IDs which you
// want to accept through this proxy.
//  https://sentry-scrum.impstudio.id/organizations/sentry/projects/chatbot/?project=12
const knownProjectIds = new Set([sentryProjectId]);

export default async function tunnel(
	request: NextApiRequest,
	response: NextApiResponse
) {
	try {
		const envelope = request.body;
		const pieces = envelope.split('\n');
		const header = JSON.parse(pieces[0]);
		// DSNs are of the form `https://<key>@o<orgId>.ingest.sentry.io/<projectId>`
		const { host, pathname } = new URL(header.dsn);
		// Remove leading slash
		const projectId = pathname.slice(1);

		if (host !== sentryHost) {
			throw new Error(`invalid host: ${host}`);
		}

		if (!knownProjectIds.has(projectId)) {
			throw new Error(`invalid project id: ${projectId}`);
		}

		const sentryIngestURL = `https://${sentryHost}/api/${projectId}/envelope/`;
		const sentryResponse = await fetch(sentryIngestURL, {
			method: 'POST',
			body: envelope,
		});

		// Relay response from Sentry servers to front end
		for (const [key, value] of sentryResponse.headers.entries()) {
			response.setHeader(key, value);
		}
		response.status(sentryResponse.status).send(sentryResponse.body);
	} catch (error) {
		console.error('tunnel error', error);
		return response.status(400).json({ status: 'invalid request' });
	}
}

import { setUser } from '@sentry/nextjs';

export const setSentryUser = ({ username }: { username: string }) => {
	setUser({
		username,
	});
};

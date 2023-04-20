import { Box, Spinner } from '@chakra-ui/react';
import { useAtomValue } from 'jotai';
import { useRouter } from 'next/router';
import * as React from 'react';

import { initializeParse } from '@/lib/parse/initialize';
import { useGetCurrentUser } from '@/hooks/auth/useGetCurrentUser';

import { currentUserAtom } from '@/store/auth';
const unauthedPaths = new Set(['/login', '/register', '/']);

const AuthWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const { isLoading } = useGetCurrentUser();

	const router = useRouter();

	const currentUser = useAtomValue(currentUserAtom);

	const pathname = router.pathname;

	const noCheck = unauthedPaths.has(pathname);

	React.useEffect(() => {
		//  Initialize Parse Backend
		initializeParse();
	}, []);

	React.useEffect(() => {
		if (noCheck) {
			return;
		}

		if (isLoading) {
			return;
		}

		if (!isLoading && !currentUser) {
			router.push('/login');
		}
	}, [currentUser, isLoading, noCheck, router]);

	if (!noCheck && (isLoading || !currentUser)) {
		return (
			<Box w="100vw" h="100vh" display="grid" placeItems="center">
				<Spinner />
			</Box>
		);
	}

	return <>{children}</>;
};

export default AuthWrapper;

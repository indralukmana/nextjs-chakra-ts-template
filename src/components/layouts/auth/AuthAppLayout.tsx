import { Box, Flex } from '@chakra-ui/react';
import Head from 'next/head';
import * as React from 'react';

import { useDesktopMode } from '@/hooks/useDesktopMode';

import Header from '@/components/layouts/auth/components/Header';
import Sidebar from '@/components/layouts/auth/components/Sidebar';

export interface AuthAppLayoutProps {
	children: React.ReactNode;
	pageTitle?: string;
	overridePageTitle?: boolean;
}

/**
 * Layout for logged in user
 * @author Rohmad Eko Wahyudi
 *
 */
const AuthAppLayout: React.FC<AuthAppLayoutProps> = ({
	children,
	pageTitle = 'Page',
	overridePageTitle,
}) => {
	const pageTitleFormatted = overridePageTitle
		? pageTitle
		: `Portal | ${pageTitle}`;

	useDesktopMode();

	return (
		<Box w="full" h="100vh">
			<Head>
				<title>{pageTitleFormatted}</title>
			</Head>
			<Flex flexDirection="column">
				<Box w="full" h="63px">
					<Header />
				</Box>
				<Flex w="full" h="calc(100vh - 63px)" pb={['8', '0']}>
					<Sidebar />
					<Box h="full" w="full" overflow="auto" bg="white">
						{children}
					</Box>
				</Flex>
			</Flex>
		</Box>
	);
};

export default AuthAppLayout;

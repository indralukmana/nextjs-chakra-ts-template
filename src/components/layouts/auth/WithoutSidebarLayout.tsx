import { Box, Flex } from '@chakra-ui/react';
import Head from 'next/head';
import * as React from 'react';

import { useDesktopMode } from '@/hooks/useDesktopMode';

import Header from '@/components/layouts/auth/components/Header';

export interface WithoutSidebarLayoutProps {
	children: React.ReactNode;
	pageTitle?: string;
	overridePageTitle?: boolean;
}

/**
 * Layout for logged in user
 * @author Rohmad Eko Wahyudi
 *
 */
const WithoutSidebarLayout: React.FC<WithoutSidebarLayoutProps> = ({
	children,
	pageTitle = 'Page',
	overridePageTitle,
}) => {
	const pageTitleFormatted = overridePageTitle
		? pageTitle
		: `Portal | ${pageTitle}`;

	useDesktopMode();

	return (
		<Box w="full" h="100vh" bgColor="gray.100">
			<Head>
				<title>{pageTitleFormatted}</title>
			</Head>
			<Flex flexDirection="column">
				<Box w="full" h="63px">
					<Header withSidebar={false} />
				</Box>
				<Flex w="full" h="calc(100vh - 63px)">
					<Box h="full" w="full" overflow="auto" bg="white">
						{children}
					</Box>
				</Flex>
			</Flex>
		</Box>
	);
};

export default WithoutSidebarLayout;

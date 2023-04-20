import { Box } from '@chakra-ui/react';
import Head from 'next/head';
import * as React from 'react';

export interface AppLayoutProps {
	children: React.ReactNode;
	pageTitle?: string;
	overridePageTitle?: boolean;
}

const AppLayout: React.FC<AppLayoutProps> = ({
	children,
	pageTitle = '',
	overridePageTitle,
}) => {
	const pageTitleFormatted = overridePageTitle
		? pageTitle
		: `AMAN | ${pageTitle}`;

	return (
		<>
			<Head>
				<title>{pageTitleFormatted}</title>
			</Head>
			<Box as="main" w="full" h="100vh" bg="white">
				{children}
			</Box>
		</>
	);
};

export default AppLayout;

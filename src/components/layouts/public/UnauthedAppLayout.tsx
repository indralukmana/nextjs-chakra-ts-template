import { Box, Show } from '@chakra-ui/react';
import Head from 'next/head';
import * as React from 'react';

export interface AppLayoutProps {
	children: React.ReactNode;
	pageTitle?: string;
	overridePageTitle?: boolean;
}

const UnauthedAppLayout: React.FC<AppLayoutProps> = ({
	children,
	pageTitle = 'Project Management Platform',
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
				<Box
					position="relative"
					h="100vh"
					display="grid"
					gridTemplateColumns={{ base: '1fr', md: '40% 60%' }}
					alignItems="center"
					justifyItems="center"
					maxW="1440px"
					m="auto"
				>
					{children}
					<Show above="md">
						<Box
							h="full"
							w="full"
							bgColor="teal"
							display="grid"
							placeItems="center"
						>
							Side Tag Line
						</Box>
					</Show>
				</Box>
			</Box>
		</>
	);
};

export default UnauthedAppLayout;

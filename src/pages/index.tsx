import { Center, HStack } from '@chakra-ui/react';
import * as React from 'react';

import AppLayout from '@/components/layouts/public/AppLayout';
import ButtonLink from '@/components/links/ButtonLink';

import { NextPageWithLayout } from '@/types/declarations/page';

const IndexPage: NextPageWithLayout = () => {
	return (
		<Center h="full" w="full">
			<HStack>
				<ButtonLink
					href="/login"
					buttonProps={{
						colorScheme: 'green',
					}}
				>
					Login
				</ButtonLink>
				<ButtonLink
					href="/register"
					buttonProps={{
						colorScheme: 'green',
					}}
				>
					Register
				</ButtonLink>
			</HStack>
		</Center>
	);
};

IndexPage.getLayout = (page) => {
	return <AppLayout>{page}</AppLayout>;
};

export default IndexPage;

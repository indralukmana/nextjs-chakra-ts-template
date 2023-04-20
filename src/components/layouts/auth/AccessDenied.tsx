import { Img, Text, VStack } from '@chakra-ui/react';
import * as React from 'react';

import BaseLink from '@/components/links/BaseLink';

const AccessDeniedComponent = (): JSX.Element => {
	return (
		<VStack pt="20">
			<Img w="211px" src="/images/access-denied.svg" alt="Access Denied" />
			<Text
				color="gray.600"
				fontSize="22px"
				fontWeight="bold"
				w="473px"
				align="center"
			>
				Anda tidak memiliki hak akses untuk halaman ini, silakan kembali ke
				dashboard.
			</Text>
			<BaseLink href="/dashboard">
				<Text variant="normal" as="u" textColor="gray.600">
					Klik untuk kembali Dashboard
				</Text>
			</BaseLink>
		</VStack>
	);
};

export default AccessDeniedComponent;

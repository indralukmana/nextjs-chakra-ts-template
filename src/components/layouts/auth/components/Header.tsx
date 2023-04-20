import { Flex, Stack } from '@chakra-ui/react';
import * as React from 'react';

interface HeaderProps {
	withSidebar?: boolean;
}

const Header: React.FC<HeaderProps> = () => {
	return (
		<Flex
			height="63px"
			alignItems="center"
			bg="white"
			borderBottom="1px solid"
			borderBottomColor="gray.200"
			justifyContent="space-between"
		>
			<Flex cursor="pointer">
				<Stack
					justify="center"
					ml="20px"
					alignSelf="center"
					h={{ base: '8px', md: '20px' }}
				>
					Logo
				</Stack>
			</Flex>
			<Stack>Avatar</Stack>
		</Flex>
	);
};

export default Header;

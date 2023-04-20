import { Box, Center, Flex, Heading, Text, theme } from '@chakra-ui/react';

import ButtonLink from '@/components/links/ButtonLink';

const Custom404 = () => {
	return (
		<Flex
			direction="column"
			justifyContent="center"
			alignItems="center"
			minHeight="100vh"
			bg={theme.colors.green[500]}
		>
			<Center mb="6">
				<Heading as="h1" fontSize="6xl" fontWeight="bold" color="white">
					404
				</Heading>
			</Center>
			<Text fontSize="2xl" fontWeight="semibold" color="white" mb="6">
				Halaman tidak ditemukan
			</Text>
			<Box textAlign="center" mb="6">
				<Text fontSize="lg" color="white">
					Maaf, halaman yang anda cari tidak ditemukan, silakan kembali ke
					halaman utama.
				</Text>
			</Box>
			<ButtonLink
				href="/"
				buttonProps={{
					colorScheme: 'yellow',
					variant: 'solid',
				}}
			>
				Kembali
			</ButtonLink>
		</Flex>
	);
};

export default Custom404;

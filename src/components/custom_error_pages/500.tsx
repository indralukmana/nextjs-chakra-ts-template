import {
	Box,
	Button,
	Center,
	Flex,
	Heading,
	Text,
	theme,
} from '@chakra-ui/react';
import { captureException } from '@sentry/nextjs';
import Cookies from 'js-cookie';
import { signOut } from 'next-auth/react';

// eslint-disable-next-line sonarjs/cognitive-complexity
function clearSiteDataAndReload() {
	// Clear session cookies
	let isError = false;
	if (navigator.cookieEnabled) {
		for (const cookieName of Object.keys(Cookies.get())) {
			Cookies.remove(cookieName);
		}
	} else {
		console.error('Cookies are not enabled in this browser.');
		isError = true;
	}

	// Clear localStorage
	if (typeof Storage !== 'undefined' && localStorage) {
		try {
			localStorage.clear();
		} catch (error) {
			console.error('Error clearing localStorage:', error);
			isError = true;
		}
	} else {
		console.error('localStorage is not supported in this browser.');
		isError = true;
	}

	// Clear sessionStorage
	if (typeof Storage !== 'undefined' && sessionStorage) {
		try {
			sessionStorage.clear();
		} catch (error) {
			console.error('Error clearing sessionStorage:', error);
			isError = true;
		}
	} else {
		console.error('sessionStorage is not supported in this browser.');
		isError = true;
	}

	if (isError) {
		captureException(new Error('Error clearing site data'));
	}

	// Force logout the site
	signOut({ callbackUrl: '/login' });
}

const Custom500 = () => {
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
					Kesalahan Server
				</Heading>
			</Center>
			<Text fontSize="2xl" fontWeight="semibold" color="white" mb="6">
				Maaf, terjadi kesalahan pada server.
			</Text>
			<Box textAlign="center" mb="6">
				<Text fontSize="lg" color="white">
					Silakan klik tombol berikut untuk memuat ulang aplikasi, jika masih
					terjadi kesalahan silakan hubungi admin.
				</Text>
			</Box>
			<Button
				colorScheme="yellow"
				variant="solid"
				onClick={clearSiteDataAndReload}
			>
				Muat Ulang
			</Button>
		</Flex>
	);
};

export default Custom500;

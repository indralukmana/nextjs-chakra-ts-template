import { ChakraProvider } from '@chakra-ui/react';
import {
	DehydratedState,
	Hydrate,
	QueryClient,
	QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { setDefaultOptions } from 'date-fns';
import { id } from 'date-fns/locale';
import { Provider as JotaiProvider } from 'jotai';
import { DevTools as JotaiDevelopmentTools } from 'jotai-devtools';
import { NextPageContext } from 'next';
import type { AppContext, AppProps } from 'next/app';
import App from 'next/app';
import Head from 'next/head';
import { Session } from 'next-auth';
import React from 'react';

import '@fontsource/inter/variable-full.css';

import AuthWrapper from '@/lib/auth/AuthWrapper';
import {
	publicEnvironmentVariables,
	serverEnvironmentVariables,
} from '@/lib/environments';
import { useClearQueriesOnLogin } from '@/hooks/utils/useClearQueriesOnLogin';
import { useNotifyBrowserUpdates } from '@/hooks/utils/useNotifyBrowserUpdates';

import { theme } from '@/theme';

import { NextPageWithLayout } from '@/types/declarations/page';

type PageProps = {
	dehydratedState?: DehydratedState;
	session: Session;
};

// eslint-disable-next-line @typescript-eslint/ban-types
type AppPropsWithLayout<P = {}> = {
	err?: NextPageContext['err'];
	Component: NextPageWithLayout;
} & AppProps<P>;

const AppHead = () => {
	return (
		<Head>
			<meta name="google" content="notranslate" />
			<link rel="shortcut icon" href="/favicon/favicon.svg" />
			<link rel="icon" href="/favicon/favicon.svg" />
			<link
				rel="apple-touch-icon"
				sizes="180x180"
				href="/favicon/apple-touch-icon.png"
			/>
			<link
				rel="icon"
				type="image/png"
				sizes="32x32"
				href="/favicon/favicon-32x32.png"
			/>
			<link
				rel="icon"
				type="image/png"
				sizes="16x16"
				href="/favicon/favicon-16x16.png"
			/>
		</Head>
	);
};

function MyApp({
	Component,
	pageProps: { ...pageProps },
}: AppPropsWithLayout<PageProps>) {
	// Use the layout defined at the page level, if available
	const getLayout = Component.getLayout || ((page) => page);
	const [queryClient] = React.useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						refetchOnWindowFocus: false,
						refetchOnReconnect: false,
					},
				},
			})
	);

	useClearQueriesOnLogin({ queryClient });

	useNotifyBrowserUpdates();

	setDefaultOptions({ locale: id });

	// environment variables runtime checking
	publicEnvironmentVariables.parse(process.env);
	serverEnvironmentVariables.parse(process.env);

	return (
		<>
			<AppHead />
			<QueryClientProvider client={queryClient}>
				<Hydrate state={pageProps.dehydratedState}>
					<JotaiProvider>
						<ChakraProvider theme={theme}>
							<AuthWrapper>
								{getLayout(<Component {...pageProps} />)}
							</AuthWrapper>
						</ChakraProvider>
						<JotaiDevelopmentTools />
					</JotaiProvider>
				</Hydrate>
				<ReactQueryDevtools position="bottom-right" />
			</QueryClientProvider>
		</>
	);
}

MyApp.getInitialProps = async (context: AppContext) => {
	if (context?.ctx?.res) {
		context.ctx.res?.setHeader(
			'Cache-Control',
			'public, s-maxage=10, stale-while-revalidate=59'
		);
	}

	const appProps = await App.getInitialProps(context);

	return {
		...appProps,
	};
};

export default MyApp;

/**
 * NOTE: This requires `@sentry/nextjs` version 7.3.0 or higher.
 *
 * NOTE: If using this with `next` version 12.2.0 or lower, uncomment the
 * penultimate line in `CustomErrorComponent`.
 *
 * This page is loaded by Nextjs:
 *  - on the server, when data-fetching methods throw or reject
 *  - on the client, when `getInitialProps` throws or rejects
 *  - on the client, when a React lifecycle method throws or rejects, and it's
 *    caught by the built-in Nextjs error boundary
 *
 * See:
 *  - https://nextjs.org/docs/basic-features/data-fetching/overview
 *  - https://nextjs.org/docs/api-reference/data-fetching/get-initial-props
 *  - https://reactjs.org/docs/error-boundaries.html
 */

import { captureException, flush } from '@sentry/nextjs';
import { NextPageContext } from 'next';
import NextErrorComponent, { ErrorProps as NextErrorProps } from 'next/error';

import Custom404 from '@/components/custom_error_pages/404';
import Custom500 from '@/components/custom_error_pages/500';
export type ErrorPageProps = {
	err: Error;
	statusCode: number;
	isReadyToRender: boolean;
	children?: React.ReactElement;
};

export type ErrorProps = {
	isReadyToRender: boolean;
} & NextErrorProps;

const CustomErrorComponent = (props: ErrorPageProps): JSX.Element => {
	const { statusCode, isReadyToRender, err, children = null } = props;

	// eslint-disable-next-line no-console
	console.warn(
		'ErrorPage - Unexpected error caught, it was captured and sent to Sentry. Error details:'
	);
	console.error(err);

	if (!isReadyToRender && err) {
		captureException(err);
	}

	if (statusCode === 404) {
		return <>{children ?? <Custom404 />}</>;
	}

	if (statusCode === 500) {
		return <>{children ?? <Custom500 />}</>;
	}

	return <>{children ?? <NextErrorComponent statusCode={statusCode} />}</>;
};

CustomErrorComponent.getInitialProps = async (
	props: NextPageContext
): Promise<ErrorProps> => {
	const { res, err, asPath } = props;

	const errorInitialProps: ErrorProps =
		(await NextErrorComponent.getInitialProps({
			res,
			err,
		} as NextPageContext)) as ErrorProps;

	if (process.env.NEXT_PUBLIC_APP_STAGE !== 'production') {
		console.error(
			'ErrorPage.getInitialProps - Unexpected error caught, it was captured and sent to Sentry. Error details:',
			err
		);
	}

	errorInitialProps.isReadyToRender = true;

	if (res?.statusCode === 404) {
		return { statusCode: 404, isReadyToRender: true };
	}

	if (err) {
		//get all variables from process.env and put them to env object
		const environmentVariables = Object.keys(process.env).reduce(
			(environment, key) => {
				environment[key] = process.env[key] ?? '';
				return environment;
			},
			{} as { [key: string]: string }
		);

		captureException(err, {
			extra: {
				environmentVariables,
			},
		});
		await flush(2000);
		return errorInitialProps;
	}

	captureException(
		new Error(`_error.js getInitialProps missing data at path: ${asPath}`)
	);
	await flush(2000);

	return errorInitialProps;
};

export default CustomErrorComponent;

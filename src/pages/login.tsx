import { useRouter } from 'next/router';
import * as React from 'react';

import { useLogin } from '@/hooks/auth/useLogin';

import UnauthedAppLayout from '@/components/layouts/public/UnauthedAppLayout';
import AMANForm from '@/components/ts-form/AMANForm';

import {
	loginFormSchema,
	LoginFormSchemaType,
} from '@/zodSchemas/loginFormSchema';

import { NextPageWithLayout } from '@/types/declarations/page';

const LoginPage: NextPageWithLayout = () => {
	const router = useRouter();
	const { mutate: login } = useLogin();

	const handleLoginSubmit = (values: LoginFormSchemaType) => {
		login(values, {
			onSuccess: (data) => {
				// eslint-disable-next-line no-console
				console.log({ data });
				router.push('/dashboard');
			},
		});
	};

	return (
		<AMANForm
			schema={loginFormSchema}
			onSubmit={handleLoginSubmit}
			props={{
				email: {
					label: 'Email',
					inputProps: { placeholder: 'Masukkan Email' },
				},
				password: {
					label: 'Password',
					inputProps: { placeholder: 'Masukkan Password' },
				},
			}}
		/>
	);
};

LoginPage.getLayout = (page) => {
	return <UnauthedAppLayout pageTitle="Login">{page}</UnauthedAppLayout>;
};

export default LoginPage;

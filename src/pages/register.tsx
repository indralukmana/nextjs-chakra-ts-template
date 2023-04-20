import { useRouter } from 'next/router';
import * as React from 'react';

import { useRegister } from '@/hooks/auth/useRegister';

import UnauthedAppLayout from '@/components/layouts/public/UnauthedAppLayout';
import AMANForm from '@/components/ts-form/AMANForm';

import {
	registerFormSchema,
	RegisterFormSchemaType,
} from '@/zodSchemas/registerFormSchema';

import { NextPageWithLayout } from '@/types/declarations/page';

const LoginPage: NextPageWithLayout = () => {
	const router = useRouter();

	const { mutate: register } = useRegister();

	const handleRegisterSubmit = (values: RegisterFormSchemaType) => {
		register(values, {
			onSuccess: () => {
				router.push('/login');
			},
		});
	};

	return (
		<AMANForm
			schema={registerFormSchema}
			onSubmit={handleRegisterSubmit}
			props={{
				email: {
					label: 'Email',
					inputProps: { placeholder: 'Masukkan Email' },
				},
				password: {
					label: 'Password',
					inputProps: { placeholder: 'Masukkan Password' },
				},
				passwordConfirmation: {
					label: 'Konfirmasi Password',
					inputProps: { placeholder: 'Masukkan Konfirmasi Password' },
				},
			}}
		/>
	);
};

LoginPage.getLayout = (page) => {
	return <UnauthedAppLayout pageTitle="Login">{page}</UnauthedAppLayout>;
};

export default LoginPage;

import { Button, VStack } from '@chakra-ui/react';
import { createTsForm } from '@ts-react/form';
import { ReactNode } from 'react';
import { z } from 'zod';

import CheckboxInput from '@/components/ts-form/CheckboxInput';
import NumberField from '@/components/ts-form/NumberField';
import TextField from '@/components/ts-form/TextField';

// create the mapping
const mapping = [
	[z.string(), TextField] as const,
	[z.boolean(), CheckboxInput] as const,
	[z.number(), NumberField] as const,
] as const; // 👈 `as const` is necessary

const FormContainer = ({
	onSubmit,
	children,
	loading,
}: {
	onSubmit: () => void;
	children: ReactNode;
	loading?: boolean;
}) => {
	return (
		<VStack as="form" onSubmit={onSubmit}>
			{children}
			<Button colorScheme="green" type="submit" isLoading={loading}>
				Submit
			</Button>
		</VStack>
	);
};

const AMANForm = createTsForm(mapping, {
	FormComponent: FormContainer,
});

export default AMANForm;

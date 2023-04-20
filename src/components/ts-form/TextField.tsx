import {
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	InputProps,
} from '@chakra-ui/react';
import { useTsController } from '@ts-react/form';

import { BaseFieldProps } from '@/components/ts-form/types/base_field_props';

interface TextFieldProps extends BaseFieldProps {
	inputProps?: InputProps;
}

const TextField = (props: TextFieldProps) => {
	const { label, inputProps } = props;

	const {
		field: { onChange, value },
		error,
	} = useTsController<string>();

	return (
		<FormControl isInvalid={!!error}>
			<FormLabel>{label}</FormLabel>
			<Input
				{...inputProps}
				onChange={(event) => onChange(event.target.value)}
				value={value ?? ''}
			/>
			<FormErrorMessage>{error?.errorMessage}</FormErrorMessage>
		</FormControl>
	);
};

export default TextField;

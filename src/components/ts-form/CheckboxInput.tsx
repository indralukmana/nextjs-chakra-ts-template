import {
	Checkbox,
	CheckboxProps,
	FormControl,
	FormErrorMessage,
	FormLabel,
} from '@chakra-ui/react';
import { useTsController } from '@ts-react/form';

import { BaseFieldProps } from '@/components/ts-form/types/base_field_props';

interface CheckboxInputProps extends BaseFieldProps {
	checkboxProps?: CheckboxProps;
}

const CheckboxInput = (props: CheckboxInputProps) => {
	const { label, checkboxProps } = props;

	const {
		field: { onChange, value },
		error,
	} = useTsController<boolean>();

	return (
		<FormControl isInvalid={!!error}>
			<FormLabel>{label}</FormLabel>
			<Checkbox
				{...checkboxProps}
				onChange={(event) => onChange(event.target.checked)}
				checked={value ?? false}
			/>
			<FormErrorMessage>{error?.errorMessage}</FormErrorMessage>
		</FormControl>
	);
};
export default CheckboxInput;

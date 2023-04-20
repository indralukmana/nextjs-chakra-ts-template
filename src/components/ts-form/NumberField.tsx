import {
	FormControl,
	FormErrorMessage,
	FormLabel,
	NumberDecrementStepper,
	NumberIncrementStepper,
	NumberInput,
	NumberInputField,
	NumberInputProps,
	NumberInputStepper,
} from '@chakra-ui/react';
import { useTsController } from '@ts-react/form';

import { BaseFieldProps } from '@/components/ts-form/types/base_field_props';

interface NumberFieldProps extends BaseFieldProps {
	numberInputProps?: NumberInputProps;
}

const NumberField = (props: NumberFieldProps) => {
	const {
		field: { onChange, value },
		error,
	} = useTsController<number>();

	const { label, numberInputProps } = props;

	return (
		<FormControl isInvalid={!!error}>
			<FormLabel>{label}</FormLabel>
			<NumberInput
				{...numberInputProps}
				value={value ?? 0}
				onChange={(_stringValue, numberValue) => {
					onChange(numberValue);
				}}
			>
				<NumberInputField />
				<NumberInputStepper>
					<NumberIncrementStepper />
					<NumberDecrementStepper />
				</NumberInputStepper>
			</NumberInput>
			<FormErrorMessage>{error?.errorMessage}</FormErrorMessage>
		</FormControl>
	);
};

export default NumberField;

import {
	FormControl,
	FormErrorMessage,
	Select,
	SelectProps,
} from '@chakra-ui/react';
import { useTsController } from '@ts-react/form';

import { BaseFieldProps } from '@/components/ts-form/types/base_field_props';

interface SelectFieldProps extends BaseFieldProps {
	selectProps?: SelectProps;
	options: string[];
}

const SelectField = (props: SelectFieldProps) => {
	const { options, selectProps } = props;

	const { field, error } = useTsController<string>();
	return (
		<FormControl isInvalid={!!error}>
			<Select
				{...selectProps}
				value={field.value ?? 'none'}
				onChange={(event) => {
					field.onChange(event.target.value);
				}}
			>
				{!field.value && <option value="none">Silakan pilih...</option>}
				{options.map((option) => (
					<option key={option} value={option}>
						{option}
					</option>
				))}
			</Select>
			<FormErrorMessage>{error?.errorMessage}</FormErrorMessage>
		</FormControl>
	);
};

export default SelectField;

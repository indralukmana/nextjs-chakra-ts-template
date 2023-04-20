import { useTsController } from '@ts-react/form';

const MultiCheckbox = ({ options }: { options: string[] }) => {
	const {
		field: { onChange, value },
	} = useTsController<string[]>();

	function toggleField(option: string) {
		if (value) {
			onChange(
				value.includes(option)
					? value.filter((event) => event !== option)
					: [...value, option]
			);
		} else {
			onChange([option]);
		}
	}

	return (
		<>
			{options.map((optionValue) => (
				<label
					htmlFor={optionValue}
					style={{ display: 'flex', flexDirection: 'row' }}
					key={optionValue}
				>
					{optionValue}
					<input
						name={optionValue}
						type="checkbox"
						onChange={() => toggleField(optionValue)}
						checked={value?.includes(optionValue) ? true : false}
					/>
				</label>
			))}
		</>
	);
};

export default MultiCheckbox;

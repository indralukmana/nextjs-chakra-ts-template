// 1. Import the extendTheme function
import {
	Button,
	extendTheme,
	FormErrorMessage,
	FormHelperText,
	FormLabel,
	Input,
	Select,
	Textarea,
	ThemeConfig,
} from '@chakra-ui/react';

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
	brand: {
		900: '#1a365d',
		800: '#153e75',
		700: '#2a69ac',
	},
	BluePrimary: {
		100: '#F7FAFC',
		200: '#47ABF7',
		500: '#1572E9',
	},
	GreenPrimary: {
		50: '#F0F8F2',
		100: '#ECFCF3',
		200: '#3FCE36',
		300: '#21D173',
		400: '#0F8445',
		500: '#025628',
		600: '#0F8445',
		700: '#025628',
		800: '#285E61',
		900: '#00411E',
	},
	YellowPrimary: {
		'50': '#fffef9',
		'100': '#fffad9',
		'200': '#feef88',
		'300': '#fddf1e',
		'400': '#e7cc1b',
		'500': '#bea816',
		'600': '#988612',
		'700': '#77690e',
		'800': '#594e0a',
		'900': '#494109',
	},
	GrayPrimary: {
		600: '#828282',
	},
	OrangePrimary: {
		400: '#FFF3E4',
		500: '#FFFBE4',
		600: '#FEBD1E',
	},
	BlackPrimary: {
		200: 'rgba(75,75,75,0.38)',
		400: '#2D3748',
	},
};

const config: ThemeConfig = {
	initialColorMode: 'light',
	useSystemColorMode: false,
};

FormLabel.defaultProps = {
	...FormLabel.defaultProps,
	fontSize: '13px',
	fontWeight: 'medium',
};
FormHelperText.defaultProps = {
	...FormHelperText.defaultProps,
	fontSize: 'xs',
	fontWeight: 'light',
};
Input.defaultProps = {
	...Input.defaultProps,
	focusBorderColor: 'GreenPrimary.400',
	fontSize: '13px',
};
Button.defaultProps = {
	...Button.defaultProps,
	fontSize: '14px',
};
FormErrorMessage.defaultProps = {
	...FormErrorMessage.defaultProps,
	fontSize: '13px',
};
Select.defaultProps = {
	...Select.defaultProps,
	fontSize: '13px',
};
Textarea.defaultProps = {
	...Textarea.defaultProps,
	fontSize: '13px',
};

const fonts = {
	heading: `'Inter', sans-serif`,
	body: `'Inter', sans-serif`,
};

export const theme = extendTheme({
	colors,
	config,
	fonts,
	components: {
		Text: {
			variants: {
				normal: {
					fontSize: '13px',
				},
			},
		},
		Button: {
			variants: {
				white: {
					bg: 'white',
					border: '1px',
					borderColor: 'gray.400',
				},
			},
		},
	},
});

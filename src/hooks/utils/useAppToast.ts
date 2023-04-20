import { useToast, UseToastOptions } from '@chakra-ui/react';

export const baseInfoToastOptions: UseToastOptions = {
	status: 'info',
	duration: 3000,
	isClosable: true,
	position: 'top-right',
	title: 'Info',
};

export const baseSuccessToastOptions: UseToastOptions = {
	status: 'success',
	duration: 3000,
	isClosable: true,
	position: 'top-right',
	title: 'Berhasil',
};

export const baseErrorToastOptions: UseToastOptions = {
	status: 'error',
	duration: 8000,
	isClosable: true,
	position: 'top-right',
	title: 'Gagal',
};

export const baseGeneralToastOptions: UseToastOptions = {
	duration: 8000,
	isClosable: true,
	position: 'top-right',
};

export const useAppToast = () => {
	const toast = useToast();

	const infoToast = (options: UseToastOptions) => {
		toast({
			...baseInfoToastOptions,
			...options,
		});
	};

	const successToast = (options: UseToastOptions) => {
		toast({
			...baseSuccessToastOptions,
			...options,
		});
	};

	const errorToast = (options: UseToastOptions) => {
		toast({
			...baseErrorToastOptions,
			...options,
		});
	};

	/**
	 * General toast is function for success or error toast based on status option
	 * @author Rohmad Eko Wahyudi
	 *
	 * @param {UseToastOptions} options
	 */
	const generalToast = (options: UseToastOptions) => {
		if (options.status === undefined) {
			console.error('Status option for generalToast is mandatory');
		} else {
			toast({
				...baseGeneralToastOptions,
				...options,
			});
		}
	};

	return { errorToast, successToast, generalToast, infoToast, toast };
};

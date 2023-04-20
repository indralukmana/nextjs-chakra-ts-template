import React from 'react';

type StorageType = 'localStorage' | 'sessionStorage';

export const useCheckWebStorageAvalability = (type: StorageType) => {
	const [storageIsAvailable, setStorageIsAvailable] = React.useState(false);

	React.useEffect(() => {
		try {
			const storage = window[type];
			const x = '__storage_test__';
			storage.setItem(x, x);
			storage.removeItem(x);
			setStorageIsAvailable(true);
		} catch (error) {
			// eslint-disable-next-line no-console
			console.log('Storage is not available:', error);

			setStorageIsAvailable(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return storageIsAvailable;
};

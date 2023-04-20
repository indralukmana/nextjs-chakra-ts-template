import { useAtomValue } from 'jotai';

import AuthAppLayout from '@/components/layouts/auth/AuthAppLayout';

import { currentUserAtom } from '@/store/auth';

import { NextPageWithLayout } from '@/types/declarations/page';

const MainDashboardPage: NextPageWithLayout = () => {
	const currentUser = useAtomValue(currentUserAtom);

	return (
		<div>
			<h1>Dashboard</h1>
			<p>{currentUser?.getUsername()}</p>
		</div>
	);
};

MainDashboardPage.getLayout = (page) => {
	return <AuthAppLayout pageTitle="Dashboard">{page}</AuthAppLayout>;
};

export default MainDashboardPage;

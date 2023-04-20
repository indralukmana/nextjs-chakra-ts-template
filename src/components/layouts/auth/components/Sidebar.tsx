import {
	Box,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerHeader,
	DrawerOverlay,
	Flex,
	Icon,
	IconButton,
	Link,
	Menu,
	Text,
	Tooltip,
	useDisclosure,
} from '@chakra-ui/react';
import { useAtom } from 'jotai';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { BiHomeAlt, BiMenu } from 'react-icons/bi';
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
import { IconType } from 'react-icons/lib';

import { useDesktopMode } from '@/hooks/useDesktopMode';

import { sidebarAtom } from '@/store/UI';

export interface SidebarMenu {
	name: string;
	icon: IconType;
	href: string;
	path: string;
	roles?: Array<string>;
}

export const SidebarLinks: SidebarMenu[] = [
	{
		name: 'Home',
		icon: BiHomeAlt,
		href: `/`,
		path: `/`,
		roles: [],
	},
];

interface SidebarContentProps {
	isOpenSideBar: boolean;
}

export const SidebarContent = ({ isOpenSideBar }: SidebarContentProps) => {
	const router = useRouter();

	return (
		<Flex
			mt={30}
			flexDir="column"
			w="100%"
			alignItems={isOpenSideBar ? 'flex-start' : 'center'}
		>
			{SidebarLinks.map((link) => {
				const isHighlight = router.pathname.startsWith(link.href);
				const activeColor = 'green.600';

				return (
					<Menu key={link.name}>
						<Flex
							key={link.name}
							py={3}
							borderLeft={isOpenSideBar ? '4px solid' : 0}
							color={isHighlight ? activeColor : 'blackAlpha.800'}
							borderLeftColor={isHighlight ? activeColor : 'white'}
							bgColor={isHighlight ? 'gray.100' : 'white'}
							w="full"
							justifyContent={isOpenSideBar ? 'flex-start' : 'center'}
						>
							<Tooltip
								isDisabled={isOpenSideBar}
								hasArrow
								ml={2}
								placement="right"
								label={link.name}
							>
								<Link
									_hover={{
										color: activeColor,
									}}
									as={NextLink}
									href={link.href}
									pl={isOpenSideBar ? '14px' : 0}
								>
									<Flex align="center" gap={isOpenSideBar ? '14px' : 0}>
										<Icon as={link.icon} fontSize="md" />
										<Text
											fontSize={{ base: '12px', md: '13px' }}
											fontWeight={500}
											display={isOpenSideBar ? 'block' : 'none'}
										>
											{link.name}
										</Text>
									</Flex>
								</Link>
							</Tooltip>
						</Flex>
					</Menu>
				);
			})}
		</Flex>
	);
};

const SidebarMenus = () => {
	const [isOpenSideBar, setIsOpenSideBar] = useAtom(sidebarAtom);

	return (
		<Flex h="full" w="full" flexDir="column" justify="space-between">
			<SidebarContent isOpenSideBar={isOpenSideBar} />
			<Box w="full">
				<Text
					textAlign="center"
					display={isOpenSideBar ? 'block' : 'none'}
					fontSize="xs"
					color="blackAlpha.600"
					bg="gray.50"
					p={4}
				>
					PMP Kemenag RI Versi 1.0
				</Text>
				<IconButton
					display={['none', 'block']}
					w="full"
					borderRadius="0"
					aria-label="Toggle Sidebar"
					icon={
						<Icon
							as={isOpenSideBar ? HiChevronDoubleLeft : HiChevronDoubleRight}
						/>
					}
					onClick={() => setIsOpenSideBar(!isOpenSideBar)}
				/>
			</Box>
		</Flex>
	);
};

const MobileDrawerMenus = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [_, setIsOpenSideBar] = useAtom(sidebarAtom);

	const router = useRouter();

	React.useEffect(() => {
		setIsOpenSideBar(true);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	React.useEffect(() => {
		const handleRouteChange = () => {
			onClose();
		};

		router.events.on('routeChangeStart', handleRouteChange);

		return () => {
			router.events.off('routeChangeStart', handleRouteChange);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<Flex
				position="fixed"
				h="full"
				alignItems="flex-end"
				bottom="2"
				left="2"
				zIndex={1}
			>
				<IconButton
					aria-label="Toggle Menu"
					icon={<Icon as={BiMenu} />}
					colorScheme="green"
					onClick={onOpen}
				/>
			</Flex>
			<Drawer isOpen={isOpen} placement="right" onClose={onClose}>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton />
					<DrawerHeader borderBottomWidth="1px">Menu PMP</DrawerHeader>

					<DrawerBody p="0">
						<SidebarMenus />
					</DrawerBody>
				</DrawerContent>
			</Drawer>
		</>
	);
};

interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = () => {
	const [desktopMode] = useDesktopMode();
	const [isOpenSideBar] = useAtom(sidebarAtom);

	if (!desktopMode) {
		return <MobileDrawerMenus />;
	}

	return (
		<Flex
			pos="sticky"
			w={isOpenSideBar ? '270px' : '60px'}
			bg="white"
			borderRight="1px solid"
			borderRightColor="gray.200"
		>
			<SidebarMenus />
		</Flex>
	);
};

export default Sidebar;

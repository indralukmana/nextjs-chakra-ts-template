import { chakra } from '@chakra-ui/react';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';

const BaseLink = chakra<typeof NextLink, NextLinkProps>(NextLink, {
	// ensure that you're forwarding all of the required props for your case
	shouldForwardProp: (property) =>
		['href', 'target', 'children'].includes(property),
});

export default BaseLink;

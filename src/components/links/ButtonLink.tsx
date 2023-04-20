import { Button, ButtonProps, LinkProps } from '@chakra-ui/react';
import { UrlObject } from 'node:url';
import * as React from 'react';

import BaseLink from '@/components/links/BaseLink';

export interface ButtonLinkProps extends Omit<LinkProps, 'href' | 'as'> {
	buttonProps?: ButtonProps;
	href: string | UrlObject;
}

const ButtonLink: React.FC<React.PropsWithChildren<ButtonLinkProps>> = ({
	children,
	buttonProps,
	...rest
}) => {
	return (
		<BaseLink
			_hover={{
				textDecoration: 'none',
			}}
			{...rest}
		>
			<Button {...buttonProps}>{children}</Button>
		</BaseLink>
	);
};

export default ButtonLink;

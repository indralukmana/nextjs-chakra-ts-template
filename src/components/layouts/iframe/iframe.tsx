import { useSession } from 'next-auth/react';
import * as React from 'react';

export interface IframeProps {
	src: string;
	height?: number;
}

/**
 * IFrame for embeded other apps
 * @author Rohmad Eko Wahyudi
 *
 * @param {{ src: any; }} { src }
 * @returns {*}
 */
const Iframe: React.FC<IframeProps> = ({ src, height = 450 }) => {
	const { data: session } = useSession();

	return (
		<iframe
			src={`${src}?token=${session?.token}`}
			sandbox="allow-same-origin allow-forms allow-scripts allow-modals allow-popups"
			style={{ width: '100%', height: `${height}px` }}
			seamless={true}
			scrolling="no"
			frameBorder="0"
		></iframe>
	);
};

export default Iframe;

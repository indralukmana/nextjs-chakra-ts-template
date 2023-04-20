import parse from 'html-react-parser';

import sanitizer from '@/lib/html/sanitizer';

export function replaceNode() {}

/**
 *
 * Render HTML string to React components using html-react-parser
 * and sanitize it using sanitizer function from this module
 * @param {string} html
 * @param {object} options
 * @returns {React.ReactNode}
 * @see https://www.npmjs.com/package/html-react-parser
 * @see https://www.npmjs.com/package/isomorphic-dompurify
 */
export default function htmlParser(
	html: string,
	options: object = {}
): React.ReactNode {
	return parse(sanitizer(html), {
		replace: replaceNode,
		...options,
	});
}

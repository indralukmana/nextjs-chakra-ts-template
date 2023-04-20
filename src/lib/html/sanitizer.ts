import DOMPurify from 'isomorphic-dompurify';

/**
 * Sanitize HTML string using DOMPurify
 * @param {string} html
 * @returns {string}
 * @see https://www.npmjs.com/package/isomorphic-dompurify
 * @see https://www.npmjs.com/package/dompurify
 */
export default function sanitizer(html: string): string {
	return DOMPurify.sanitize(html);
}

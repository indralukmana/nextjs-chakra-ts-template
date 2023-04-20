// Import Parse minified version
import Parse from 'parse';

export const initializeParse = () => {
	// Your Parse initialization configuration goes here
	const PARSE_HOST_URL = process.env.NEXT_PUBLIC_AMAN_PARSE_URL
	const PARSE_JAVASCRIPT_KEY = process.env.NEXT_PUBLIC_JAVASCRIPT_KEY;
	const PARSE_APPLICATION_ID = process.env.NEXT_PUBLIC_APPLICATION_ID;
	Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
	Parse.serverURL = PARSE_HOST_URL;

}

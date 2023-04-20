import { z } from 'zod';

export const publicEnvironmentVariables = z.object({
	NEXT_PUBLIC_AMAN_PARSE_URL: z.string(),
	NEXT_PUBLIC_APPLICATION_ID: z.string(),
	NEXT_PUBLIC_JAVASCRIPT_KEY: z.string(),
});

export const serverEnvironmentVariables = z.object({
	NEXTAUTH_URL: z.string(),
	DEPLOYMENT_ENVIRONMENT: z.string(),
});

export type PublicENV = z.infer<typeof publicEnvironmentVariables>;
export type ServerENV = z.infer<typeof serverEnvironmentVariables>;

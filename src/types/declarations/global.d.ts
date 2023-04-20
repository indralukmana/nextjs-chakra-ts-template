import type { PublicENV, ServerENV } from '@/lib/environments';

type EnvironmentVariables = PublicENV & ServerENV;

declare global {
	namespace NodeJS {
		interface ProcessEnv extends EnvironmentVariables {}
	}
}

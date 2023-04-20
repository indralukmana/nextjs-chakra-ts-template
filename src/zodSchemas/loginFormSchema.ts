import { z } from 'zod';

export const loginFormSchema = z.object({
	email: z.string().email('Masukkan Email'), // renders TextField
	password: z.string(),
});

export type LoginFormSchemaType = z.infer<typeof loginFormSchema>;

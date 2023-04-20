import { z } from "zod";


export const registerFormSchema = z
	.object({
		email: z.string().email('Masukkan Email'),
		password: z.string().regex(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.{8,})/,
			`minimal 8 karakter, terdiri dari huruf besar, huruf kecil, dan angka`
		),
		passwordConfirmation: z.string(),
	})
	.refine((data) => data.password === data.passwordConfirmation, {
		message: 'Password tidak sama',
		path: ['passwordConfirmation'],
	});

export type RegisterFormSchemaType = z.infer<typeof registerFormSchema>;

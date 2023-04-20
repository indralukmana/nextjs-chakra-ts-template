import { useMutation } from "@tanstack/react-query"
import { useSetAtom } from "jotai"
import Parse from "parse"

import { useAppToast } from "@/hooks/utils/useAppToast"

import { currentUserAtom } from "@/store/auth"

import { RegisterFormSchemaType } from "@/zodSchemas/registerFormSchema"

export const useRegister = () => {

	const { successToast, errorToast } = useAppToast()
	const setCurrentUser = useSetAtom(currentUserAtom)

	return useMutation(async (variables: RegisterFormSchemaType) => {
		const { email: username, password } = variables

		return await Parse.User.signUp(username, password, {})
	}, {
		onSuccess: (registeredUser) => {

			setCurrentUser(registeredUser)
			successToast({
				title: `${registeredUser.get('username')} berhasil didaftarkan`,
				description: 'Silahkan cek email untuk verifikasi',
			})
		}, onError: (error) => {
			console.error(error)

			const parseError = error as Parse.Error

			errorToast({
				description: parseError?.message ?? 'Terjadi kesalahan',
			})
		}
	})
}

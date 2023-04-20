import { useMutation } from "@tanstack/react-query"
import { useSetAtom } from "jotai"
import Parse from "parse"

import { useAppToast } from "@/hooks/utils/useAppToast"

import { currentUserAtom } from "@/store/auth"

import { LoginFormSchemaType } from "@/zodSchemas/loginFormSchema"

export const useLogin = () => {

	const { successToast, errorToast } = useAppToast()

	const setCurrentUser = useSetAtom(currentUserAtom)

	return useMutation(async (variables: LoginFormSchemaType) => {

		const { email: username, password } = variables

		return await Parse.User.logIn(username, password)
	}, {
		onSuccess: (loggedInUser) => {
			setCurrentUser(loggedInUser)
			const username = loggedInUser.getUsername()
			successToast({
				title: `${username} berhasil login`,
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

import { useQuery } from "@tanstack/react-query";
import { useSetAtom } from "jotai";
import Parse from 'parse'

import { currentUserAtom } from "@/store/auth";

export const currentGetUserKey = 'get-current-user'

export const useGetCurrentUser = () => {

	const setCurrentUser = useSetAtom(currentUserAtom)

	return useQuery([currentGetUserKey],
		async () => {
			const currentUser = await Parse.User.currentAsync()
			setCurrentUser(currentUser)
			return currentUser
		})
}

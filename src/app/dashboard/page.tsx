import React from 'react'
import { auth } from '@/auth'

const page = async () => {

	const session = await auth();

	const user = session?.user

	console.log(" user information ",user)


	return (
		<div>

			Hello {user?.name} !

			You email id is {user?.email}

		</div>
	)
}

export default page

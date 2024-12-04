import { Button } from '@/components/ui/button'
import React from 'react'

const HomeHeader = () => {
	return (
		<div className='w-full flex justify-between items-center border p-5 bg-transparent'>

			<div>
				<h1>Logo</h1>
			</div>

			<div className='flex gap-8'>
				<div className='flex gap-3'>
				<button>About us</button>
				<button>Pricing</button>
				<button>Features</button>
				<button>New Project</button>
				<button>Blog</button>
				</div>

				<Button className='bg-white text-black font-semibold hover:bg-gray-200 rounded-full p-4'>Log in</Button>

			</div>

		</div>
	)
}

export default HomeHeader

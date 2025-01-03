import { Button } from '@/components/ui/button'
import React from 'react'
import Link from 'next/link'

const HomeHeader = () => {
	return (
		<div className='w-full flex justify-between items-center p-5 bg-transparent'>

			<div>
				<h1>Script AI</h1>
			</div>

			<div className='flex gap-8'>
				<div className='flex gap-3 items-center justify-center'>
					<button>About us</button>
					<button>Pricing</button>
					<button>Features</button>
					<Link href={'/login'}>
						<button>New Project</button>
					</Link>
					<button>Blog</button>
				</div>

				<Link href={'/login'}>
					<Button className='bg-white text-black font-semibold hover:bg-gray-200 rounded-full p-4'>Log in</Button>
				</Link>

			</div>

		</div>
	)
}

export default HomeHeader

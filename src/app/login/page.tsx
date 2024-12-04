'use client'

import React from 'react'
import { signIn } from 'next-auth/react'
import HomeHeader from '../components/HomeHeader'
import { Button } from '@/components/ui/button'
import { IconBrandGoogleFilled, IconBrandGithubFilled } from '@tabler/icons-react'
import Footer from '../components/Footer'

const LoginPage = () => {
	const handleGoogleClick = async () => {
		try {
			await signIn('google', {
				callbackUrl: '/', // Redirect to home page after successful login
			})
		} catch (error) {
			console.error('Error signing in with Google:', error)
		}
	}

	const handleGithubClick = async () => {
		try {
			await signIn('github', {
				callbackUrl: '/',
			})
		} catch (error) {
			console.error('Error signing in with Github:', error)
		}
	}

	return (
		<div className='w-full min-h-screen bg-black text-white'>
			<HomeHeader />
			<div className='flex w-full min-h-screen'>
				<div className='text-xl w-1/2 flex flex-col justify-center items-center'>
					<p className='text-2xl font-semibold'>LOG IN</p>
					<p>Unlock the full potential of <span className='font-semibold'>Film-making</span></p>
					<p>with our cutting-edge platform</p>
				</div>
				<div className='w-1/2 flex flex-col justify-center items-center'>
					<div className='bg-black p-4 flex flex-col justify-center items-center w-2/3'>
						<div className='text-3xl'> Log In </div>
						<div className='flex flex-col gap-4 w-full items-center justify-center'>
							<Button
								onClick={handleGoogleClick}
								className='bg-white p-3 text-black hover:bg-gray-200 flex justify-center gap-5 w-1/2'
							>
								<IconBrandGoogleFilled />
								<p className='font-semibold'>Continue with Google</p>
							</Button>
							<Button
								onClick={handleGithubClick}
								className='bg-white p-3 text-black hover:bg-gray-200 flex justify-center gap-5 w-1/2'
							>
								<IconBrandGithubFilled />
								<p className='font-semibold'>Continue with GitHub</p>
							</Button>
						</div>
					</div>
					<p className='text-sm mt-4'>
						By signing up, you agree to the <span className='text-blue-500'>Terms of Service</span> and{' '}
						<span className='text-blue-600'>Privacy Policy.</span>
					</p>
				</div>
			</div>
			<Footer />
		</div>
	)
}

export default LoginPage

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
				callbackUrl: '/dashboard', // Redirect to dashboard after successful login
			})
		} catch (error) {
			console.error('Error signing in with Google:', error)
		}
	}

	const handleGithubClick = async () => {
		try {
			await signIn('github', {
				callbackUrl: '/dashboard',
			})
		} catch (error) {
			console.error('Error signing in with Github:', error)
		}
	}

	return (
		<div className='w-full min-h-screen bg-black text-white'>
			<HomeHeader />
			<div className='flex flex-col md:flex-row w-full min-h-[calc(100vh-80px)]'>
				{/* Left Side - Text Section */}
				<div className='md:w-1/2 flex flex-col justify-center items-center p-6 md:p-12 text-center'>
					<div className='max-w-md'>
						<h2 className='text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-400'>
							Welcome Back
						</h2>
						<p className='text-lg md:text-xl text-gray-300'>
							Unlock the full potential of <span className='font-semibold text-blue-400'>Film-making</span> with our cutting-edge platform
						</p>
					</div>
				</div>

				{/* Right Side - Login Section */}
				<div className='md:w-1/2 flex flex-col justify-center items-center p-6 md:p-12'>
					<div className='bg-gray-900/50 border border-gray-800 rounded-2xl p-8 md:p-10 w-full max-w-md shadow-2xl backdrop-blur-lg'>
						<h3 className='text-2xl md:text-3xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-400'>
							Log In
						</h3>
						<div className='space-y-4 w-full'>
							<Button
								onClick={handleGoogleClick}
								className='w-full bg-white text-black hover:bg-gray-200 flex items-center justify-center gap-4 py-3 rounded-xl'
							>
								<IconBrandGoogleFilled className='w-5 h-5 md:w-6 md:h-6' />
								<span className='font-semibold text-sm md:text-base'>Continue with Google</span>
							</Button>
							<Button
								onClick={handleGithubClick}
								className='w-full bg-white text-black hover:bg-gray-200 flex items-center justify-center gap-4 py-3 rounded-xl'
							>
								<IconBrandGithubFilled className='w-5 h-5 md:w-6 md:h-6' />
								<span className='font-semibold text-sm md:text-base'>Continue with GitHub</span>
							</Button>
						</div>
						<div className='text-center text-xs md:text-sm text-gray-400 mt-6'>
							By signing up, you agree to the{' '}
							<a href="#" className='text-blue-500 hover:underline'>Terms of Service</a>{' '}
							and{' '}
							<a href="#" className='text-blue-500 hover:underline'>Privacy Policy</a>.
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	)
}

export default LoginPage

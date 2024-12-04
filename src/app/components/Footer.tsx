import React from 'react';
import { IconBrandInstagramFilled, IconBrandXFilled, IconBrandYoutubeFilled, IconBrandDiscordFilled, IconBrandThreads } from '@tabler/icons-react';

const Footer = () => {
	return (
		<div className='w-full h-full bg-black flex items-center justify-between px-16 p-4 pb-10'>

			<div>
				<h1>Logo</h1>
			</div>

			<div className='flex flex-col items-center justify-center'>
				<p>© CraftErsa, Inc. 2024</p>

				<div className='flex gap-1 text-white'>
					<button>Testinomials |</button>
					<button>Privacy Policy |</button>
					<button>Terms of Service |</button>
					<button>Referral program |</button>
					<button>Releases |</button>
					<button>FAQ</button>
				</div>

			</div>

			<div className='flex items-center justify-center gap-3 ' >
				<IconBrandInstagramFilled size={30} />
				<IconBrandXFilled size={30} />
				<IconBrandYoutubeFilled size={30} />
				<IconBrandThreads stroke={3} />
				<IconBrandDiscordFilled size={30} />
			</div>





		</div>
	)
}

export default Footer

import React from 'react'
import { Button } from '@/components/ui/button'

const NavHeader = ({ setNewProject }: { setNewProject: React.Dispatch<React.SetStateAction<boolean>> }) => {
	return (
		<div className="flex justify-between items-center mb-8">
			<div className="flex items-center gap-4">
				<div className="text-2xl">CraftErsa</div>
				<div className="text-gray-600">Dashboard</div>
			</div>
			<div className="flex items-center gap-4">
				<Button variant="outline" className="bg-white text-blue-600 border border-blue-100">
					Upgrade your plan
				</Button>
				<Button onClick={() => setNewProject(true)} className="bg-blue-600 text-white">
					Start new project
				</Button>
			</div>
		</div>
	)
}

export default NavHeader

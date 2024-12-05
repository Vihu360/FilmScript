"use client"
import React, { useEffect, useState } from 'react'
import { Loader2, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
	DialogDescription
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Skeleton } from "@/components/ui/skeleton"
import NavHeader from '../components/NavHeader'


const Dashboard = () => {

	const router = useRouter();

	interface Project {
		id: string;
		name: string;
		description: string;
	}

	const [newProject, setNewProject] = useState(false);
	const [projectData, setProjectData] = useState({
		name: '',
		description: ''
	});
	const [isLoading, setIsLoading] = useState(false);
	const [projectList, setProjectList] = useState<Project[]>([]);
	const [projectListLoading, setProjectListLoading] = useState(false);

	const handleCreate = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		console.log('New Project Data:', projectData);

		const response = await axios.post('/api/projectcreation', projectData);
		console.log('Response:', response);

		router.push(`/project/${response.data.project}`)

		setNewProject(false);
		// Reset form
		setProjectData({ name: '', description: '' });
		setIsLoading(false);
	};

	useEffect(() => {
		const fetchProjects = async () => {
			setProjectListLoading(true); // Start loading
			try {
				const response = await axios.get('/api/fetchprojects');
				console.log('Fetched Projects:', response.data);

				setProjectList(response.data); // Update projectList with fetched data
			} catch (error) {
				console.error('Error fetching projects:', error);
			} finally {
				setProjectListLoading(false); // End loading
			}
		};

		fetchProjects();
	}, []);

	return (
		<div className="min-h-screen bg-[#F5F7FF] p-6">
			{/* Top Navigation */}

			<NavHeader setNewProject={setNewProject} />

			{/* Tabs */}
			<div className="flex gap-4 mb-8">
				<Button variant="ghost" className="bg-white px-6 py-2 rounded-full font-medium">
					My Projects
				</Button>
				<Button variant="ghost" className="text-gray-600 px-6 py-2 rounded-full font-medium">
					Shared with me
				</Button>
			</div>

			{/* Featured Cards */}
			<div className="grid grid-cols-2 gap-6 mb-8">
				{/* Community Spotlight Card */}
				<div className="bg-white p-6 rounded-xl">
					<div className="flex gap-4">
						<img
							src="/logo.png"
							alt="Profile"
							className="rounded-full w-12 h-12"
						/>
						<div>
							<h3 className="font-semibold text-lg">Community Spotlight</h3>
							<p className="text-gray-600">Behind the scenes with NolanAI community filmmaker Damarrus Grant</p>
						</div>
					</div>
					<Button variant="link" className="text-blue-600 mt-4">
						Read the Interview →
					</Button>
				</div>

				{/* Discord Card */}
				<div className="bg-white p-6 rounded-xl">
					<div className="flex gap-4">
						<div className="bg-[#5865F2] p-3 rounded-full">
							<MessageCircle className="w-6 h-6 text-white" />
						</div>
						<div>
							<h3 className="font-semibold text-lg">Join us on Discord!</h3>
							<p className="text-gray-600">Check out our Discord page to be a part of the NolanAI community</p>
						</div>
					</div>
					<Button variant="link" className="text-blue-600 mt-4">
						Join group →
					</Button>
				</div>
			</div>

			{/* Projects Section */}
			<div className="grid grid-cols-3 gap-6">
			</div>

			{/* Create Project Dialog */}
			<Dialog open={newProject} onOpenChange={setNewProject}>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>
							<DialogDescription>
								Create New Project
							</DialogDescription>

						</DialogTitle>
					</DialogHeader>
					<form onSubmit={handleCreate} className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="project-name">Project Name</Label>
							<Input
								id="project-name"
								placeholder="Enter project name"
								value={projectData.name}
								onChange={(e) => setProjectData({ ...projectData, name: e.target.value })}
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="project-description">Description</Label>
							<Textarea
								id="project-description"
								placeholder="Enter project description"
								value={projectData.description}
								onChange={(e) => setProjectData({ ...projectData, description: e.target.value })}
							/>
						</div>
						<DialogFooter>
							<Button type="submit" className="bg-blue-600 text-white">
								{isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Create Project"}
							</Button>
						</DialogFooter>
					</form>
				</DialogContent>
			</Dialog>

			<div>
				{/* Projects Section */}
				<div>
					{projectListLoading ? (
						// Show  animation while loading api
						<div className="flex  items-center gap-3 ">
							<div className='flex flex-col space-y-3'>
								<Skeleton className="h-[125px] w-[250px] rounded-xl" />
								<div className="space-y-2">
									<Skeleton className="h-4 w-[250px]" />
									<Skeleton className="h-4 w-[200px]" />
								</div>
							</div>
							<div className='flex flex-col space-y-3'>
								<Skeleton className="h-[125px] w-[250px] rounded-xl" />
								<div className="space-y-2">
									<Skeleton className="h-4 w-[250px]" />
									<Skeleton className="h-4 w-[200px]" />
								</div>
							</div>
						</div>
					) : (
						// Show project list
						<div className="grid grid-cols-3 gap-6">
							{projectList.length > 0 ? (
								projectList.map((item) => (
									<button onClick={()=> router.push(`/project/${item.id}`)} key={item.id} className="bg-white p-4 rounded-lg shadow flex flex-col items-start">
										<h3 className="text-lg font-bold">{item.name}</h3>
										<p className="text-gray-600">{item.description}</p>
									</button>
								))
							) : (
								<p className="text-gray-500">No projects found.</p>
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default Dashboard

"use client"

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import axios from 'axios';
import { useParams } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import NavHeader from '@/app/components/NavHeader';

// Zod validation schema with TypeScript typing
const scriptFormSchema = z.object({
	videoType: z.string().min(1, "Please select a video type"),
	targetAudience: z.string().min(1, "Please specify target audience"),
	tone: z.string().min(1, "Please select a tone"),
	mainMessage: z.string().min(10, "Main message must be at least 10 characters"),
	keyPoints: z.string().min(20, "Please provide key points (at least 20 characters)"),
	duration: z.string().min(1, "Please select duration"),
});

type ScriptFormValues = z.infer<typeof scriptFormSchema>;


const VideoScriptGenerator = () => {
	const [generatedScript, setGeneratedScript] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [selectedProject, setSelectedProject] = useState<{ name: string; description: string } | null>(null);
	const [newProject, setNewProject] = useState(false);
	const [scriptLoaded, setScriptLoaded] = useState(false);

	console.log(newProject);

	const form = useForm<ScriptFormValues>({
		resolver: zodResolver(scriptFormSchema),
		defaultValues: {
			videoType: "",
			targetAudience: "",
			tone: "",
			mainMessage: "",
			keyPoints: "",
			duration: ""
		}
	});

	const onSubmit = async (data: ScriptFormValues) => {
		setIsLoading(true);
		try {
			const response = await axios.post('/api/generate-script', {
				selectedProject,
				...data
			});

			console.log("response from apis", response.data)

			setGeneratedScript(response.data.result);

			setScriptLoaded(true);

		} catch (error) {
			console.error("Script generation error:", error);
			form.setError("root", {
				message: "Failed to generate script. Please try again."
			});
		} finally {
			setIsLoading(false);
		}
	};

	// getting project info

	const params = useParams<{ id: string }>();
	const projectId = params?.id;

	useEffect(() => {
		const fetchProject = async () => {
			try {
				setIsLoading(true);
				const response = await axios.post(`/api/selectedproject`, { projectId });
				console.log(response.data.project[0]);
				setSelectedProject(response.data.project[0]);
			} catch (error) {
				console.error("Error fetching project:", error);
			} finally {
				setIsLoading(false);
			}
		};

		if (projectId) {
			fetchProject();
		}
	}, [projectId]);

	return (
		<div className="container mx-auto p-4">

			<NavHeader setNewProject={setNewProject} />
			{isLoading ? (
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
				<Card className="w-full max-w-3xl mx-auto">
					{selectedProject && (
						<CardHeader>
							<CardTitle>{selectedProject.name} - Let&apos;s generate script</CardTitle>
							<p className="text-muted-foreground">{selectedProject.description}</p>
						</CardHeader>
					)}
					<CardContent>

						{scriptLoaded ? (

							<div>
								{generatedScript}
							</div>

						) : (
							<Form {...form}>
								<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
									<div className="grid md:grid-cols-2 gap-4">
										<FormField
											control={form.control}
											name="videoType"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Video Type</FormLabel>
													<Select onValueChange={field.onChange} defaultValue={field.value}>
														<FormControl>
															<SelectTrigger>
																<SelectValue placeholder="Select video type" />
															</SelectTrigger>
														</FormControl>
														<SelectContent>
															{['Explainer', 'Tutorial', 'Testimonial', 'Product Demo', 'Marketing'].map(type => (
																<SelectItem key={type} value={type}>{type}</SelectItem>
															))}
														</SelectContent>
													</Select>
													<FormMessage />
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name="targetAudience"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Target Audience</FormLabel>
													<FormControl>
														<Input placeholder="e.g., Tech professionals, Startup founders" {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>

									<div className="grid md:grid-cols-2 gap-4">
										<FormField
											control={form.control}
											name="tone"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Tone</FormLabel>
													<Select onValueChange={field.onChange} defaultValue={field.value}>
														<FormControl>
															<SelectTrigger>
																<SelectValue placeholder="Select tone" />
															</SelectTrigger>
														</FormControl>
														<SelectContent>
															{['Professional', 'Conversational', 'Energetic', 'Empathetic', 'Technical'].map(tone => (
																<SelectItem key={tone} value={tone}>{tone}</SelectItem>
															))}
														</SelectContent>
													</Select>
													<FormMessage />
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name="duration"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Duration</FormLabel>
													<Select onValueChange={field.onChange} defaultValue={field.value}>
														<FormControl>
															<SelectTrigger>
																<SelectValue placeholder="Select duration" />
															</SelectTrigger>
														</FormControl>
														<SelectContent>
															{['1 minutes', '2 minutes', '5 minutes', '8 minutes', '10 minutes'].map(duration => (
																<SelectItem key={duration} value={duration}>{duration}</SelectItem>
															))}
														</SelectContent>
													</Select>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>

									<FormField
										control={form.control}
										name="mainMessage"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Main Message</FormLabel>
												<FormControl>
													<Textarea
														placeholder="Briefly describe the core message of your video"
														className="min-h-[100px]"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name="keyPoints"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Key Points</FormLabel>
												<FormControl>
													<Textarea
														placeholder="List the main points you want to cover (one per line)"
														className="min-h-[120px]"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<Button type="submit" className="w-full">Generate Script</Button>
								</form>
							</Form>

						)}


					</CardContent>
				</Card>
			)}
		</div>
	);
};

export default VideoScriptGenerator;

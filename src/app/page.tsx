import React from 'react';
import { ArrowRight, Film, BookOpen, Zap } from 'lucide-react';
import HomeHeader from './components/HomeHeader';
import Footer from './components/Footer';

const HomePage = () => {
	return (
		<div className="min-h-screen bg-black text-white overflow-x-hidden">
			{/* Navigation */}

			<HomeHeader />

			{/* Hero Section */}
			<header className="relative min-h-screen flex items-center justify-center text-center px-4">
				<div className="absolute inset-0 bg-gradient-to-br from-black via-black to-blue-900/10 opacity-80"></div>
				<div className="relative z-10 max-w-4xl mx-auto">
					<h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-400">
						Unleash Your Story&apos;s Potential
					</h1>
					<p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
						Transform your creative vision into professional screenplays with cutting-edge AI that understands the art of storytelling.
					</p>
					<a
						href="/dashboard"
						className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all hover:scale-105 hover:shadow-xl"
					>
						Start Creating <ArrowRight className="ml-3" />
					</a>
				</div>
			</header>

			{/* Features Section */}
			<section id="features" className="py-16 bg-black">
				<div className="container mx-auto px-4">
					<div className="text-center mb-16">
						<h2 className="text-4xl font-bold mb-4">Revolutionize Your Writing Process</h2>
						<p className="text-xl text-gray-400 max-w-2xl mx-auto">
							ScriptAI isn&apos;t just a tool it&apos;s your creative partner, designed to elevate your storytelling.
						</p>
					</div>

					<div className="grid md:grid-cols-3 gap-8">
						{[
							{
								icon: <Film className="text-blue-400" size={48} />,
								title: "Genre Mastery",
								description: "From sci-fi epics to intimate dramas, our AI understands the nuanced language of every genre."
							},
							{
								icon: <BookOpen className="text-green-400" size={48} />,
								title: "Intelligent Storytelling",
								description: "Advanced algorithms that analyze narrative structure, character development, and plot dynamics."
							},
							{
								icon: <Zap className="text-purple-400" size={48} />,
								title: "Rapid Iteration",
								description: "Generate multiple script variations instantly, giving you unprecedented creative flexibility."
							}
						].map((feature, index) => (
							<div key={index} className="bg-gray-900/50 p-6 rounded-xl border border-gray-800 hover:border-blue-600 transition-all">
								<div className="mb-4">{feature.icon}</div>
								<h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
								<p className="text-gray-400">{feature.description}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Call to Action */}
			<section className="bg-black py-24 text-center">
				<div className="container mx-auto px-4">
					<h2 className="text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-400">
						Your Story Starts Here
					</h2>
					<p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
						Whether you&pos;re a seasoned screenwriter or a first-time storyteller, ScriptAI empowers you to bring your vision to life.
					</p>
					<a
						href="/dashboard"
						className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-full text-xl font-semibold transition-all hover:scale-105 hover:shadow-xl"
					>
						Begin Your Writing Journey <ArrowRight className="ml-4" size={24} />
					</a>
				</div>
			</section>

			{/* Footer */}

			<Footer />
		</div>
	);
};

export default HomePage;

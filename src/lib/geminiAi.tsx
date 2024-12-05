import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY as string;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
	model: "gemini-1.5-pro",
});

const generationConfig = {
	temperature: 1,
	topP: 0.95,
	topK: 40,
	maxOutputTokens: 8192,
	responseMimeType: "text/plain",
};

export const chatSession = model.startChat({
	generationConfig,
	history: [
		{
			role: "user",
			parts: [
				{ text: "create a script for a video to be posted on social media on topic of Indian early girl marriages  which has description How early marriages affecting the Indian girls. The video types is explainer and my target audience would be mainly gen z. The video script should contain tone that should be energetic. While the main message is about showing early message impact girl physically as well as sexually. The key points will be like giving real life example. The video will  be about for 1 minutes durations. used good hooks so that viewer can stay at the starting of video to the last make it interesting. Just give me direct script. Direct script no voiceover things nor the scenario based background that you are giving, give me just the pure raw script that need to be spoken\n " },
			],
		},
		{
			role: "model",
			parts: [
				{ text: "Hold up! Did you know that somewhere in India, a girl the same age as you is getting married? Yeah, seriously. Not prom, not graduation, *marriage*. Let's talk about how early marriage wrecks lives.  Think you're too young to be a mom? You are! A girl's body isn't ready for pregnancy and childbirth that young. We're talking serious health risks, even death. It's not just physical. Forced marriage robs girls of their education, their dreams, their childhood. Imagine being told your future is decided, you can't go to school anymore, you're someone's property now.  Meet Rani. Rani's story is sadly not unique. Countless girls are trapped in this cycle. But we can break it. Education is power! By raising awareness and empowering girls, we can end child marriage. Share this video, talk to your friends, let's make some noise for change! #EndChildMarriage #GirlsNotBrides\n" },
			],
		},
	],
});

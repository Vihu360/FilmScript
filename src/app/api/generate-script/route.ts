import { NextRequest, NextResponse } from "next/server";
import { chatSession } from "@/lib/geminiAi";
import { AxiosError } from "axios";

export const POST = async (req: NextRequest) => {
 try {
	 const body = await req.json();

	  const { selectedProject, ...data } = body;

	 console.log(selectedProject, data);

	 const prompt =
     `create a script for a video to be posted on social media on topic of ${selectedProject.name}  which has description ${selectedProject.description}. The video types is ${data.videoType} and my target audience would be mainly ${data.targetAudience}. The video script should contain tone that should be ${data.tone}. While the main message is about ${data.mainMessage}. The key points will be like ${data.keyPoints}. The video will  be about for ${data.duration} durations. used good hooks so that viewer can stay at the starting of video to the last make it interesting. also make you are ending the video nicely as per the script. `;

	 const result = await chatSession.sendMessage(prompt);


		return NextResponse.json({
	    result: (result.response.text()),
	  });
 } catch (error) {

if (error instanceof AxiosError) {
			console.log("Axios Error:", error);
			return NextResponse.json(error.response?.data || { message: 'An error occurred' }, { status: 500 });
		}

		// Handle other types of errors
		if (error instanceof Error) {
			console.log("Error:", error.message);
			return NextResponse.json({ error: error.message }, { status: 500 });
		}

		// Fallback for unknown errors
		console.log("Unknown error:", error);
		return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
	}


 }

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/dbConnect";
import { projects } from "@/lib/schema";
import { eq } from "drizzle-orm";

export const POST = async (req: NextRequest) => {
  try {
		const { projectId } = await req.json();

		console.log(projectId)

    if (!projectId) {
      return NextResponse.json(
        { error: "Project ID is required" },
        { status: 400 }
      );
    }

    // Process the request using the projectId
    const project = await db
      .select()
      .from(projects)
      .where(eq(projects.id, projectId));
    return NextResponse.json({ project });
  } catch (error) {
    console.error("Error fetching selected project:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};

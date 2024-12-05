import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { db } from "@/lib/dbConnect";
import { projects } from "@/lib/schema";
import { eq } from "drizzle-orm";

export const GET = async () => {
  try {
    const session = await auth();

    if (!session || !session.user) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }

    if (session.user && session.user.id) {
      const projectsData = await db
        .select()
        .from(projects)
				.where(eq(projects.userId, session.user.id));

			console.log("projects data", projectsData);
      return NextResponse.json(projectsData);
		} else {
			return NextResponse.json(
				{ error: "internal error" },
				{ status: 401 }
			)
    }
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 501 }
    );
  }
};

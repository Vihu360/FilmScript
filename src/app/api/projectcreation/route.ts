import { db } from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { projects } from "@/lib/schema";
import { v4 as uuidv4 } from 'uuid';


export const POST = async (req: NextRequest) => {
  try {
    // check session
    const session = await auth();

    if (!session || !session.user) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }

    const { name, description } = await req.json();

    if (!name || !description) {
      return NextResponse.json(
        { error: "please fill out all the field before creating project" },
        { status: 401 }
      );
    }

    // Insert new project

   const newproject = await db
     .insert(projects)
     .values({
       id: uuidv4(),
       name: name!,
       description: description!,
       userId: session.user?.id ?? '',
     })
     .returning();

    return NextResponse.json(
      {
        message: "project credated successfully",
        project: newproject[0].id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      { error: "Internal sevrer error" },
      { status: 404 }
    );
  }
};

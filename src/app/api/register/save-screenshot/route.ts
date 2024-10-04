import { NextRequest, NextResponse } from "next/server";
import { writeFile, unlink } from "fs/promises";
import path from "path";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const previousFile = formData.get("previousFile") as string;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Delete the previous file if it exists
    if (previousFile) {
      const previousFilePath = path.join(
        process.cwd(),
        "public/uploads",
        previousFile
      );
      try {
        await unlink(previousFilePath);
      } catch (error) {
        console.error("Error deleting previous file:", error);
      }
    }

    const buffer = await file.arrayBuffer();
    const filename = Date.now() + "-" + file.name.replaceAll(" ", "_");
    const filepath = path.join(process.cwd(), "public/uploads", filename);

    await writeFile(filepath, Buffer.from(buffer));

    const fileUrl = `/uploads/${filename}`;
    return NextResponse.json(
      { url: fileUrl, fileName: filename },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json(
      { error: "Error uploading file" },
      { status: 500 }
    );
  }
}

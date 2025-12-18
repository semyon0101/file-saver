"use server"
import { uploadFile } from "@/app/lib/data";
import { z } from "zod"

const FormSchema = z.object({
	file: z.string(),
});

export async function POST(req: Request) {
	const formData = await req.formData();
	const file = formData.get('file') as File;

	if (file == null) {
		return Response.json({ error: 'No file received.' }, { status: 400 });
	}

	const arrayBuffer = await file.arrayBuffer();
	const buffer = Buffer.from(arrayBuffer);

	const { data, error } = await uploadFile(buffer, file.name);
	if (error != null) {
		console.log(error);
		return Response.json({ error: error }, { status: 400 });
	}

	return Response.json({ "message": data });
}
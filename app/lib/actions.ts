'use server'

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from 'zod';

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SECRET_KEY!);

export type State = {
	error?: string | null;
};


const UploadFileSchema = z.object({
	file: z.file(),
});

export async function uploadFilesasdfsdfsdfsd(prevState: State, formData: FormData): Promise<State> {
	const validatedFields = UploadFileSchema.safeParse({
		file: formData.get('file'),
	});

	if (!validatedFields.success) {
		return {
			error: validatedFields.error.message,
		};
	}
	const { file } = validatedFields.data;


	const arrayBuffer = await file.arrayBuffer();
	const buffer = Buffer.from(arrayBuffer);

	const { error } = await supabase.storage.from('files').upload(file.name, buffer);

	if (error != null) {
		return { error: error.message };
	}

	revalidatePath("/");
	return {};
}

export async function getSignedUploadUrl(fileName: string, fileType: string) {
	const filePath = `${fileName}`;

	const { data, error } = await supabase.storage
		.from('files')
		.createSignedUploadUrl(filePath, {
			upsert: false,
		});

	if (error) {
		console.error('Error creating signed URL:', error);
		return { error: error.message };
	}

	// 3. Return the token and path to the client
	return {
		signedUrl: data.signedUrl
	};
}
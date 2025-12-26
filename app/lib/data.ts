'use server'

import { createClient } from "@supabase/supabase-js";
import { User } from "@/app/lib/definitions";

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SECRET_KEY!);


export async function fetchUsers() {
	const { data, error } = await supabase.from("users").select("*");

	if (error != null) {
		return { data: null, error: error.message };
	}

	const users = data as User[];

	console.log(users);

	return { data: users, error: null };
}

export async function fetchFiles() {
	const { data, error } = await supabase.storage.from("files").list();

	if (error != null) {
		return { data: null, error: error.message };
	}

	return { data: data, error: null };
}

export async function getSignedUploadUrl(fileName: string, fileType: string) {
	const filePath = `${fileName}`;

	const { data, error } = await supabase.storage
		.from('files')
		.createSignedUploadUrl(filePath, {
			upsert: false,
		});

	if (error) {
		return { url: null, error: error.message };
	}


	return { url: data.signedUrl, error: null };
}
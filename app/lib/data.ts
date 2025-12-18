'use server';

import { createClient } from "@supabase/supabase-js";
import { User, File } from "@/app/lib/definitions";

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SECRET_KEY!);

export async function getUsers() {
	console.log('Fetching revenue data...');
	const { data, error } = await supabase.from("users").select("*");

	if (error != null) {
		console.log('Database Error:', error.message);
		throw new Error('Failed to fetch revenue data.');
	}

	// console.log(data);
	const users = data as User[];
	console.log('Data fetch completed.');

	console.log(users);

	return users;
}

export async function getFiles() {
	console.log('Fetching revenue data...');

	const { data, error } = await supabase.storage.from("files").list();

	if (error != null) {
		console.log('Database Error:', error.message);
		throw new Error('Failed to fetch revenue data.');
	}

	// console.log(data);
	const files = data.map((fileObj): File => {
		return {
			name: fileObj.name,
		}
	});
	console.log('Data fetch completed.');

	console.log(files);


	return files;
}


'use server';

import { createClient } from "@supabase/supabase-js";
import { User } from "@/app/lib/definitions";

const supabase = createClient(process.env.SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export async function getUsers() {
	console.log('Fetching revenue data...');
	const { data, error } = await supabase.from("users").select("*");

	if (error != null) {
		console.log('Database Error:', error.message);
		throw new Error('Failed to fetch revenue data.');
	}

	console.log(data);
	const users = data as User[];
	console.log('Data fetch completed.');

	return users;
}

export async function getFiles() {
	console.log('Fetching revenue data...');

	// Use the JS library to create a bucket.
	// Use the JS library to create a bucket.

	const data = await supabase.storage.createBucket("files");

	//const users = data as User[];
	console.log(data);
	console.log('Data fetch completed.');



	return data;
}


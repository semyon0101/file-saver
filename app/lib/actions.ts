'use server'

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SECRET_KEY!);

export type State = {
	errors?: {
		customerId?: string[];
		amount?: string[];
		status?: string[];
	};
	message: string | null;
};

export async function uploadFile(buffer: Buffer<ArrayBuffer>, fileName: string) {
	const { data, error } = await supabase.storage.from('files').upload(fileName, buffer);

	if (error != null) {
		console.log('Database Error: ' + error.message);

	}

	//revalidatePath("");
}


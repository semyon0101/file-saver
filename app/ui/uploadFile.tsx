'use client';
import { ChangeEvent, useState } from 'react';

export default function UploadFile() {
	const [file, setFile] = useState();

	const handleUpload = async () => {
		console.log(file);
		return;
		if (!file) return;

		const formData = new FormData();
		//formData.append('file', file);

		// Send to YOUR server, not Supabase directly
		const response = await fetch('/api/upload-secret', {
			method: 'POST',
			body: formData,
		});

		const result = await response.json();
		console.log(result);
	};

	const setFiles = (e: ChangeEvent<HTMLInputElement>) => {
		console.log(e);

	};

	return (
		< div >
			<input type="file" onChange={setFiles} /> <br />
			<button onClick={handleUpload}>Secure Upload</button>
		</div >
	);
}
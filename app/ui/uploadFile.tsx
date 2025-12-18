'use client';
import { ChangeEvent, useState } from 'react';

export default function UploadFile() {
	const [file, setFile] = useState<File>();

	const handleUpload = async () => {
		if (!file) return;

		const formData = new FormData();
		formData.append('file', file);

		const response = await fetch('/api/upload', {
			method: 'POST',
			body: formData,
		});

		const result = await response.json();
		console.log(result);
	};

	const setFiles = (e: ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files) return;
		setFile(e.target.files[0]);
	};

	return (
		< div >
			<input type="file" onChange={setFiles} /> <br />
			<button onClick={handleUpload}>Secure Upload</button>
		</div >
	);
}
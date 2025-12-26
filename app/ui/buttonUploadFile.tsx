'use client';

import { ChangeEvent, FormEvent, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function ButtonUploadFile() {
	const [file, setFile] = useState<File | null>(null);
	const [status, setStatus] = useState<string>('Idle');
	const [progress, setProgress] = useState(0);
	const router = useRouter();

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) setFile(e.target.files[0]);
	};

	const handleUpload = async () => {
		if (!file) return;

		setStatus('Uploading...');
		setProgress(0);

		await axios.put("/api/upload", file, {
			headers: {
				'file-type': file.type,
				'file-name': file.name,
			},
			onUploadProgress: (progressEvent) => {
				const total = progressEvent.total || file.size;
				const percentage = Math.round((progressEvent.loaded * 100) / total);
				setProgress(percentage);
			},
		})
			.then((res) => {
				setStatus('Success!');
				router.refresh();
			})
			.catch((err) => {
				setStatus('Error');
				console.log(err.response.data);
			})

	};

	return (
		<div className="p-4 border rounded max-w-md">
			<h3 className="mb-4 text-lg font-bold">Upload with Progress</h3>

			<input type="file" onChange={handleFileChange} className="mb-4" />

			{/* Progress Bar UI */}
			{status === 'Uploading...' && (
				<div className="w-full bg-gray-200 rounded-full h-4 mb-4">
					<div
						className="bg-blue-600 h-4 rounded-full transition-all duration-300"
						style={{ width: `${progress}%` }}
					></div>
					<p className="text-xs text-center mt-1">{progress}%</p>
				</div>
			)}

			<button
				onClick={handleUpload}
				className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
			>
				{status === 'Uploading...' ? 'Uploading...' : 'Upload'}
			</button>

			{status}
		</div>
	);
}

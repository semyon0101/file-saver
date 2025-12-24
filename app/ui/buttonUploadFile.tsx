'use client';

import { FormEvent, useState } from 'react';
import { uploadFilesasdfsdfsdfsd, State } from '@/app/lib/actions';

export default function ButtonUploadFile() {
	const [status, setStatus] = useState<string>('Idle');

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setStatus('Uploading...');

		const formData = new FormData(e.currentTarget);


		const response = await fetch('/api/upload', {
			method: 'POST',
			body: formData,
		});
		console.log("123");

		if (!response.ok) {
			console.error("Something went wrong");
			setStatus('Error');

		} else {
			setStatus('Success!');
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<input type="file" name="file" /> <br />
			<button type="submit">Secure Upload</button>
			<p>Status: {status}</p>
		</form>
	);
}

/*
export default function ButtonUploadFile() {
	const initialState: State = {};
	const [state, formAction] = useActionState(uploadFilesasdfsdfsdfsd, initialState);

	return (
		<form action={formAction}>
			<input type="file" name="file" defaultValue="hi.txt" /> <br />
			<button type="submit">Secure Upload</button>
			{(state.error) &&
				<div>
					---------
					<p className="rounded-md bg-gray-50 p-4 md:p-6">
						{state.error}
					</p>
					-------------
				</div>
			}
		</form>
	);
}
*/
'use client';

import { useActionState } from 'react';
import { uploadFilesasdfsdfsdfsd, State } from '@/app/lib/actions';

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
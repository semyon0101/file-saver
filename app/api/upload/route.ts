import { getSignedUploadUrl } from '@/app/lib/data';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(request: NextRequest) {
	const headers = request.headers;
	const fileType = headers.get("file-type");
	const fileName = headers.get("file-name");

	const { url, error } = await getSignedUploadUrl(fileName!, fileType!);

	if (error || !url) {
		return new NextResponse(error, { status: 400 });
	}

	const response = await fetch(url, {
		method: 'PUT',
		headers: {
			"Content-type": fileType,
		},
		body: request.body,
		duplex: "half",
	} as RequestInit);

	console.log("PUT", url, response.status);
	if (!response.ok) {
		return new NextResponse("Couldn't upload file", { status: 400 });
	}

	return new NextResponse("OK", { status: 200 });
}

import { getFiles } from "@/app/lib/data"

export default async function Page() {
	const data = await getFiles();

	return (
		<div>hello world</div>
	);
}
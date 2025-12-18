import { getFiles, getUsers } from "@/app/lib/data"
import UploadFile from "@/app/ui/uploadFile"

export default async function Page() {
	//const data = getFiles();

	return (
		<UploadFile />
	);
}
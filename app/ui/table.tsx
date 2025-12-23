import { fetchFiles } from "@/app/lib/data"

export default async function Table() {
	const { data, error } = await fetchFiles();

	if (error != null) {
		console.log(error);
		throw new Error("Something wrong");
	}

	return (
		< div >
			{data.map((invoice) =>
				(<div key={invoice.name}>{invoice.name}</div>)
			)}
		</div >
	);
}
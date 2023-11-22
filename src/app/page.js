import Post from "@/components/Post";
import db from "@/lib/db";

export const getData = async () => {
	const posts = await db.post.findMany({
		where: { nac: true },
		include: {
			author: {
				select: { name: true },
			},
		},
	});

	//console.log(await db.user.findMany());
	return posts;
};

export default async function Home() {
	const posts = await getData();
	return (
		<main>
			<h1>test</h1>
			<div>
				{posts.map((post) => (
					<div key={post.id} className="post">
						<Post post={post} />
					</div>
				))}
			</div>
		</main>
	);
}

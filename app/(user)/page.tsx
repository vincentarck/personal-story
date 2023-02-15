import { previewData } from "next/headers";
import { groq } from "next-sanity";
import { client } from "../../lib/sanity.client";
import PreviewSuspense from "../../components/PreviewSuspense";

// Piping by created
const queryAllPosts = groq`
*[type=='post']{
  ...,
  author->,
  categories[]->
} | order(_createdAt desc)
`;
export default async function HomePage() {
  if (previewData())
    return (
      <PreviewSuspense
        fallback={
          <div role={"status"}>
            <p className="text-center text-lg animate-pulse text-blue-400">
              Loading preview Data ...
            </p>
          </div>
        }
      >
        <PreviewBlogList />
      </PreviewSuspense>
    );

  const posts = await client.fetch(queryAllPosts);

  return <div>page</div>;
}

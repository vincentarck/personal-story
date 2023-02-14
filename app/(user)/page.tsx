import {previewData} from "next/headers"
import {groq} from 'next-sanity'
import { client } from "../../lib/sanity.client"

// Piping by created
const queryAllPosts = groq`
*[type=='post']{
  ...,
  author->,
  categories[]->
} | order(_createdAt desc)
`
export default async function HomePage() {
if(previewData())return <div>Preview Mode</div>

const posts = await client.fetch(queryAllPosts);

  return (
    <div>page</div>
  )
}

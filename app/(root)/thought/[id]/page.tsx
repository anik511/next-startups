import { Suspense } from "react";
import { client } from "@/sanity/lib/client";
import { THOUGHTS_BY_ID_QUERY } from "@/sanity/lib/queries/thought";
import { notFound } from "next/navigation";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { BookHeart, ThumbsDown } from "lucide-react";
import markdownit from 'markdown-it'

const md = markdownit()
const relatedReviews = [
  {
    likes: 2,
    dislikes: 0,
    description: "Great book as long as you recognize that it is fiction.\n\nYou can't believe everything in it. It is not a history textbook. That having been said this is an excellent book. Not quite as good as \"Angels and Demons\", and not nearly as good as Dan Brown's latest \"The Lost Symbol\", but still a great read.",
    reviewer: {
      _id: "d7d800e7-64d7-4bac-9735-3a6eb0693d61",
      name: "Anik",
      image: "https://avatars.githubusercontent.com/u/47003868?v=4",
      bio: "A book reader."
    },
    author: {
      name: "Dan Brown",
      id: 1
    },
    views: 2,
    image: "https://i0.wp.com/eveninglandbooks.com/wp-content/uploads/2025/01/IMG_0707-2-scaled.jpg?fit=2560%2C2133&ssl=1",
    slug: {
      current: "the-da-vinci-code",
      _type: "slug"
    },
    _id: "d1c609ef-fecb-44b2-8a7e-896357301656",
    title: "The Da Vinci Code",
    _createdAt: "2025-03-22T13:46:20Z",
    category: "Mystery, detective fiction, conspiracy fiction, thriller"
  },
  {
    author: {
      name: "Dan Brown",
      id: 1
    },
    category: "Crime, Mystery, Thriller",
    likes: 10,
    _id: "0f520e07-c9e4-410d-bd05-df6c80a6d758",
    title: "The Lost Symbol",
    views: 0,
    image: "https://simpleinsights.in/wp-content/uploads/2020/07/3953175645_4b57dcaf21_b.jpg",
    dislikes: 0,
    slug: {
      current: "the-lost-symbol",
      _type: "slug"
    },
    description: "The Lost Symbol by Dan Brown delivers a fast-paced, puzzle-driven thriller centered on symbologist Robert Langdon’s race through Washington D.C. to unravel Masonic secrets and rescue his mentor from a fanatical villain.\n\nPacked with cryptic codes, historical intrigue, and nods to noetic science, Brown’s signature blend of ancient lore and modern suspense keeps pages turning. While the breakneck pacing and D.C. landmarks (like the Capitol and Smithsonian) add cinematic flair, the plot leans heavily on familiar tropes—underdeveloped villains and formulaic twists—that may feel repetitive for longtime fans. Still, its exploration of Freemasonry and the clash between science and spirituality offers enough intrigue for readers craving a quick, entertaining dive into conspiracy-laden adventure.",
    reviewer: {
      _id: "d7d800e7-64d7-4bac-9735-3a6eb0693d61",
      name: "Anik",
      image: "https://avatars.githubusercontent.com/u/47003868?v=4",
      bio: "A book reader."
    },
    _createdAt: "2025-03-21T15:54:17Z"
  }
]

export const experimental_ppr = true;

const Thought = async ({params}:{params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const post = await client.fetch(THOUGHTS_BY_ID_QUERY, {id});
  if (!post) return notFound();

  const parsedDescription = md.render(post?.description||"");
  return (
    <>
      <div className="max-w-4xl mx-auto p-6  shadow-md rounded-2xl my-10" style={{ backgroundColor: "#f5ecd9" }}>
        <img src={post.image} alt={post.title} className="w-full h-130 object-cover rounded-xl" />
        <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
          <span className="startup-card_date">{formatDate(post?._createdAt)}</span>
          <span>{post.category}</span>
          <span>{post.views} views</span>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mt-2">{post.title}</h1>
        <Link href={`/author/${post.author?._id}`}>
          <p className="text-md text-gray-700">by <span className="font-semibold">{post.author.name}</span></p>
        </Link>
        {/* <p className="text-lg mt-2 text-gray-700">{post.description}</p> */}
        {
          parsedDescription ? (
            <article className="mt-4 prose max-w-4xl break-all" dangerouslySetInnerHTML={{__html:parsedDescription}}/>
          ) : (
            <p className="no-result mt-4">No Thoughts Found</p>
          )
        }

        <div className="flex gap-4 mt-6 text-gray-600 text-sm">
          <div className="flex gap-1.5">
            <BookHeart className="size-6 text-primary " />
            <span className="text-14-medium">{post.likes}</span>
          </div>
          <div className="flex gap-1.5">
            <ThumbsDown className="size-6 text-primary " />
            <span className="text-14-medium">{post.dislikes}</span>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-4 border-t pt-4">
          <Link href={`/user/${post.reviewer._id}`}>
            <Image
              src={post.reviewer.image!}
              alt={post.reviewer.name!}
              width={48}
              height={48}
              className="rounded-full drop-shadow-lg"
            />
          </Link>
          
          
          <div>
            <Link href={`/user/${post.reviewer._id}`}>
              <p className="font-semibold text-gray-800">{post.reviewer.name}</p>
            </Link>
            <p className="text-gray-600 text-sm">{post.reviewer.bio}</p>
          </div>
        </div>
      </div>
      {/* related posts */}
        <div className="max-w-6xl mx-auto my-16 px-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Related Reviews</h2>
          <hr className="mb-4" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedReviews.map((review) => (
              <div key={review._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300">
                <img src={review.image} alt={review.title} className="w-full h-48 object-cover" />
                
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900">{review.title}</h3>
                  <p className="text-sm text-gray-600">by {review.author.name}</p>
                  
                  <div className="flex justify-between text-xs text-gray-500 mt-3">
                    <span>👁 {review.views}</span>
                    <span>👍 {review.likes}</span>
                    <span>👎 {review.dislikes}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
    </>
  )
}
export default Thought;
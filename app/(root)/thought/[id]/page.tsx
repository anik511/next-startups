import { Suspense } from "react";
import { client } from "@/sanity/lib/client";
import { THOUGHTS_BY_ID_QUERY } from "@/sanity/lib/queries/thought";
import { notFound } from "next/navigation";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { BookHeart, ThumbsDown } from "lucide-react";

export const experimental_ppr = true;

const Thought = async ({params}:{params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const post = await client.fetch(THOUGHTS_BY_ID_QUERY, {id});
  if (!post) return notFound();
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
        <p className="text-lg mt-2 text-gray-700">{post.description}</p>

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
              className="rounded-full"
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
    </>
  )
}
export default Thought;
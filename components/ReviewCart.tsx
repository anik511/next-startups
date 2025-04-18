import { EyeIcon, BookHeart, ThumbsDown } from "lucide-react"
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { Author, Reviewer, Thought } from "@/sanity/types";

export type ReviewTypeCard = Omit<Thought, "reviewer" | "author"> & {
  reviewer?:Reviewer, author?: Author} 


export const ReviewCart = ({post}:{post:ReviewTypeCard}) => {
  const {
    _createdAt,
    views,
    likes,
    dislikes,
    reviewer,
    title,
    author,
    category,
    _id,
    image,
    description,
  } = post;
  return (
    <li className="startup-card group hover:shadow-blue-500">
      <div className="flex-between">
        <p className="startup-card_date">{formatDate(_createdAt)}</p>
        { likes?
        <div className="flex gap-1.5">
          <BookHeart className="size-6 text-primary " />
          <span className="text-16-medium">{likes}</span>
        </div>:''
        }
        { dislikes?
        <div className="flex gap-1.5">
          <ThumbsDown className="size-6 text-primary " />
          <span className="text-16-medium">{dislikes}</span>
        </div>
        :''}
        <div className="flex gap-1.5">
          <EyeIcon className="size-6 text-primary " />
          <span className="text-16-medium">{views}</span>
        </div>
      </div>
      <div className="flex-between mt-5 gap-5">
        <div className="flex-1">
          <Link href={`/user/${reviewer?._id}`}>
            <p className="text-16-medium line-clamp-1">{reviewer?.name}</p>
          </Link>
          <Link href={`/startup/${_id}`}>
            <h3 className="text-26-semibold line-clamp-1">{title}</h3>
          </Link>
          <Link href={`/author/${author?._id}`}>
            <p className="text-16-medium line-clamp-1"><strong>{author?.name}</strong></p>
          </Link>
        </div>
        <Link href={`/user/${reviewer?._id}`}>
          <Image
            src={reviewer?.image!}
            alt={reviewer?.name!}
            width={48}
            height={48}
            className="rounded-full"
          />
        </Link>
      </div>

      <Link href={`/thought/${_id}`}>
        <p className="startup-card_desc">{description}</p>
        <img src={image} alt="placeholder" className="startup-card_img" />
      </Link>

      <div className="flex-between gap-3 mt-5">
        <Link href={`/?query=${category?.toLowerCase()}`}>
          <p className="text-16-medium">{category}</p>
        </Link>
        <Button className="startup-card_btn" asChild>
          <Link href={`/thought/${_id}`}>Details</Link>
        </Button>
      </div>
    </li>
  )
}

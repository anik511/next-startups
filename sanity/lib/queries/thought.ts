import { defineQuery } from "next-sanity";

export const THOUGHTS_QUERY =  defineQuery(
  `
  *[_type == "thought" && defined(slug.current)]|order(_createdAt desc){
  _id,
  title,
  _createdAt,
  author->{
    name,
    id
  },
  category,
  views,
  likes,
  image,
  dislikes,
  slug,
  description,
  reviewer->{
    _id,
    name,
    image,
    bio
    }
  }
  `
);
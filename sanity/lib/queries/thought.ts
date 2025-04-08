import { defineQuery } from "next-sanity";

export const THOUGHTS_QUERY =  defineQuery(
  `
  *[_type == "thought" && defined(slug.current) && !defined($search) ||
  category match $search ||
  title match $search ||
  author->name match $search ||
  reviewer->name match $search]|order(_createdAt desc){
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

export const THOUGHTS_BY_ID_QUERY =  defineQuery(
  `
  *[_type == "thought" && _id==$id][0]{
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
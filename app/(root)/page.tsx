import SearchForm from "@/components/SearchForm";
import { ReviewCart, ReviewTypeCard } from "@/components/ReviewCart";
import { THOUGHTS_QUERY } from "@/sanity/lib/queries/thought";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";


export default async function Home({searchParams}:{searchParams: Promise<{query?: string}>}) {
  const query = (await searchParams).query;
  const params = {search: query||null};
  const {data:posts} = await sanityFetch({query: THOUGHTS_QUERY, params});
  console.log(JSON.stringify(posts));
  
  // const posts = [
  //   {
  //     _createdAt: "Yesterday",
  //     _id: 1,
  //     title: "The Vinci Code",
  //     description: "Description 1",
  //     image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     author: {name: "Author",_id: "1", image: "https://placehold.co/48x48"},
  //     category: "Thriller",
  //     views: 100,
  //   }
  // ]
  return (
    <>
      <section className="pink_container">
        <h3 className="heading">Books you Read,
          <br />Books you Love
        </h3>
        <p className="sub-heading !max-w-3xl">Write Your Thought About Books Read</p>
        <SearchForm query={query}/>
      </section>
      <section className="section_container">
        <p className="text-30-semibold">
          {query? `Search results for "${query}"` : "Latest Thoughts"}
        </p>
        <ul className="mt-7 card_grid">
          {posts?.length>0?posts.map((post:ReviewTypeCard, index) => (
            <ReviewCart key={post?._id} post={post} />
          )):`No Thoughts found`}
        </ul>
      </section>
      <SanityLive />
    </>
  );
}
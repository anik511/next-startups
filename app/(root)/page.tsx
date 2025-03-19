import SearchForm from "@/components/SearchForm";
import { StartupCart } from "@/components/StartupCart";


export default async function Home({searchParams}:{searchParams: Promise<{query?: string}>}) {
  const query = (await searchParams).query;
  const posts = [
    {
      _createdAt: "Yesterday",
      _id: 1,
      title: "Startup 1",
      description: "Description 1",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      author: {id: "1"},
      category: "Tech",
      views: 100,
    }
  ]
  return (
    <>
      <section className="pink_container">
        <h3 className="heading">Pitch Your Startup,
          <br />Connect with Entrepreneurs
        </h3>
        <p className="sub-heading !max-w-3xl">Join the community of entrepreneurs and investors</p>
        <SearchForm query={query}/>
      </section>
      <section className="section_container">
        <p className="text-30-semibold">
          {query? `Search results for "${query}"` : "Latest Startups"}
        </p>
        <ul className="mt-7 card_grid">
          {posts?.length>0?posts.map((post, index) => (
            <StartupCart key={post?._id} post={post} />
          )):`No startups found`}
        </ul>
      </section>
    </>
  );
}
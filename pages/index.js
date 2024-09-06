import { createClient } from 'contentful'
import PostCard from '../components/PostCard'

export async function getStaticProps() {

  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  })

  const res = await client.getEntries({ content_type: "blogPost" })

  return {
    props: {
      posts: res.items
    },
    revalidate: 1
  }
}

export default function posts({ posts }) {
  console.log(posts)

  return (
    <div className="blogPost-list">
      {posts.map(blogPost => (
        <PostCard key={blogPost.sys.id} blogPost={blogPost} />
      ))}

      <style jsx>{`
        .blogPost-list {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-gap: 20px 60px;
        }
      `}</style>
    </div>
  )
}
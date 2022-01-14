import Head from "next/head";
import styles from "../styles/Home.module.css";
import supabase from "../utils/supabase";

export async function getServerSideProps({ params }) {
  const { data: post, error } = await supabase
    .from("posts")
    .select("*, comments(*)")
    .eq("id", params.id)
    .single();

  if (error) {
    throw new Error(error);
  }
  return {
    props: {
      post,
    },
  };
}

export default function PostPage({ post }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Get by ID</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>{post.title}</h1>
      <p>{post.description}</p>
      <p>{JSON.stringify(post, null, 2)}</p>
    </div>
  );
}

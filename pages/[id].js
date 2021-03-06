import Head from "next/head";
import { useEffect, useState } from "react";
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
  const [comments, setComments] = useState("");

  useEffect(() => {
    const subscriptionEvent = supabase
      .from("comments")
      .on("INSERT", (payload) => {
        console.log(payload);
        if (payload.new) {
          setComments((oldComments) => [...oldComments, payload.new]);
        }
      })
      .on("INSERT", (message) => {
        if (message.new) {
          console.log("Added");
        }
      })
      .subscribe();

    return () => {
      supabase.removeSubscription(subscriptionEvent);
    };
  }, []);

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
      <p>{JSON.stringify(comments, null, 2)}</p>
    </div>
  );
}

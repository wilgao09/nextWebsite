import { useRouter } from "next/router";
import Markdown from "markdown-to-jsx";

import Blogs from "../../scripts/brepo";
import React from "react";

import Header from "../../components/Cheader";
import Layout from "../../components/Clayout";
import MContent from "../../components/MContent";
import Head from "next/head";

function processID(s) {
  let b =
    Blogs[s] ??
    `Server error 404: Failed to fetch blog titled \"${s.substring(
      8
    )}\" of date \"${s.substring(0, 4)}.${s.substring(4, 6)}.${s.substring(
      6,
      8
    )}\"`;
  console.log(b);
  return b;
}

export default function BlogPost() {
  const router = useRouter();
  const { blogno } = router.query;

  if (blogno) {
    return (
      <Layout location={"/blog/" + blogno}>
        <Head>
          {" "}
          <title> {blogno.substring(8)} </title>{" "}
          <meta
            http-equiv="Content-Security-Policy"
            content="upgrade-insecure-requests"
          ></meta>
        </Head>
        <Header tno={2} />
        <MContent>
          <Markdown>{processID(blogno)}</Markdown>
        </MContent>
      </Layout>
    );
  } else {
    return <div>Loading</div>;
  }
}

import Head from "next/head";
import Link from "next/link";
import Header from "../components/Cheader";
import Layout from "../components/Clayout";
import MContent from "../components/MContent";

export default function Projects(props) {
  return (
    <Layout terminal={props.terminal} location={"/projects"} title="Projects">
      <Head>
        <title> Projects </title>
      </Head>
      <Header tno={3} terminal={props.terminal} />

      <MContent>
        <p>
          This page is intended to host and showcase the projects that I think
          are both noteworthy and easily displayable on the web. For a
          comprehensive list of my projects, please visit{" "}
          <a
            href="https://github.com/wilgao09?tab=repositories"
            target="_blank"
          >
            my github
          </a>
          .
        </p>

        <h3> BetterChatRoom </h3>
        <p>
          Here's a link to my chatroom project (I cannot guarantee the security
          of anything):{" "}
          <a
            href="https://chatroom8982.herokuapp.com"
            style={{ textDecoration: "line-through" }}
          >
            https://chatroom8982.herokuapp.com
          </a>
        </p>

        <p>
          Heroku has ended its free service; this project won't be back up until
          I pay for a proper MongoDB+Digital Ocean instance (at that point, I
          might as well buy an OK domain name)
        </p>

        <h3> More </h3>
        <p>
          When I have projects that can be compiled to WebAssembly, they'll be
          showcased here or contain a link to them here.
        </p>
      </MContent>
    </Layout>
  );
}

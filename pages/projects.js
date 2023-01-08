import Head from "next/head";
import Link from "next/link";
import Header from "../components/Cheader";
import Layout from "../components/Clayout";
import MContent from "../components/MContent";

export default function Projects(props) {
    return (
        <Layout
            terminal={props.terminal}
            location={"/projects"}
            title="Projects"
        >
            <Head>
                <title> Projects </title>
            </Head>
            <Header tno={3} terminal={props.terminal} />

            <MContent>
                <p>
                    This page is intended to host and showcase the projects that
                    I think are both noteworthy and easily displayable on the
                    web. For a comprehensive list of my projects, please visit{" "}
                    <a href="https://github.com/wilgao09" target="_blank">
                        my github
                    </a>
                    .
                </p>

                <h3> BetterChatRoom </h3>
                <p>
                    Here's a link to my chatroom project (I cannot guarantee the
                    security of anything):{" "}
                    <a
                        href="https://chatroom8982.herokuapp.com"
                        target="_blank"
                        style={{ textDecoration: "line-through" }}
                    >
                        https://chatroom8982.herokuapp.com
                    </a>
                </p>

                <p>
                    Heroku has ended its free service; this project won't be
                    back up until I pay for a proper MongoDB+Digital Ocean
                    instance (at that point, I might as well buy an OK domain
                    name)
                </p>

                <h3>Tracker</h3>
                <p>
                    Here's a link to my tracker project. The tracker project's
                    objective is to aggregate data from users (by observing web
                    traffic on websites) and to display it nicely. As of writing
                    this, the Tracker project only tracks the traffic on my
                    personal website. The project's backend is done in Java
                    Spring Boot and MySQL; the frontend is done in Typescript,
                    with the graphs done in VictoryJS. A link to the project can
                    be found{" "}
                    <a
                        href="https://tracker-dashboard.vercel.app"
                        target="_blank"
                    >
                        here
                    </a>
                    .
                </p>

                <h3> More </h3>
                <p>
                    When I have projects that can be compiled to WebAssembly,
                    they'll be showcased here or contain a link to them here.
                </p>
            </MContent>
        </Layout>
    );
}

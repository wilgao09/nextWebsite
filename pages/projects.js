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
                    This page is intended to host and
                    showcase the projects that I think are
                    both noteworthy and easily displayable
                    on the web. For a comprehensive list of
                    my projects, please visit{" "}
                    <a
                        href="https://github.com/wilgao09"
                        target="_blank"
                    >
                        my github
                    </a>
                    . Some links are crossed out. This means
                    they aren't deployed anymore, and won't
                    be for the foreseeable future.
                </p>

                <h3> BetterChatRoom </h3>
                <p>
                    Here's a link to my chatroom project (I
                    cannot guarantee the security of
                    anything):{" "}
                    <a
                        href="https://chatroom8982.herokuapp.com"
                        target="_blank"
                        style={{
                            textDecoration: "line-through",
                        }}
                    >
                        https://chatroom8982.herokuapp.com
                    </a>
                </p>

                <p>
                    Heroku has ended its free service; this
                    project won't be back up until I pay for
                    a proper MongoDB+Digital Ocean instance
                    (at that point, I might as well buy an
                    OK domain name)
                </p>

                <h3>Tracker</h3>
                <p>
                    Here's a link to my tracker project. The
                    tracker project's objective is to
                    aggregate data from users (by observing
                    web traffic on websites) and to display
                    it nicely. As of writing this, the
                    Tracker project only tracks the traffic
                    on my personal website. The project's
                    backend is done in Java Spring Boot and
                    MySQL; the frontend is done in
                    Typescript, with the graphs done in
                    VictoryJS. A link to the project can be
                    found{" "}
                    <a
                        href="https://tracker-dashboard.vercel.app"
                        target="_blank"
                        style={{
                            textDecoration: "line-through",
                        }}
                    >
                        here
                    </a>
                    .
                </p>

                <h3>Playlister</h3>
                <p>
                    A music playing webapp. It leverages
                    YouTube's Web API. The project is a
                    M(ySQL)ERN stack, with the React portion
                    done in TypeScript. Although it was
                    largely a school project, it is
                    important because it was the first
                    project I did in TypeScript. Originally
                    deployed with this website on a
                    DigitalOcean droplet that I have since
                    deleted.
                </p>
                <h3>DisOrganized</h3>
                <p>
                    Born out of the dissatisfaction with the
                    state of online whiteboards, I built my
                    own. It features exclusively local
                    hosting and a custom plugin API so
                    user's can develop their own tools. It
                    was built using Golang, SvelteKit, and
                    Electron, with data being stored in an
                    SQLite file. A copy of the project can
                    be found{" "}
                    <a
                        href="https://github.com/wilgao09/DisOrganized"
                        target="_blank"
                    >
                        here
                    </a>
                </p>

                <h3>autouml</h3>
                <p>
                    Inspired by{" "}
                    <a
                        href="https://github.com/terrastruct/d2"
                        target="_blank"
                    >
                        terrastruct's d2 project
                    </a>
                    , this project seeks to programatically
                    build out UML diagrams for TypeScript
                    projects. It makes extensive use of the
                    TypeScript compiler API, compiles
                    information about classes, interfaces,
                    and namespaces, and spits out d2 code.
                    This d2 code compiles into a UML diagram
                    of the input codebase. More information
                    can be found on{" "}
                    <a
                        href="https://github.com/wilgao09/autouml"
                        target="_blank"
                    >
                        its github page
                    </a>
                    .
                </p>

                <h3> More </h3>
                <p>
                    When I have projects that can be
                    compiled to WebAssembly, they'll be
                    showcased here or contain a link to them
                    here.
                </p>
            </MContent>
        </Layout>
    );
}

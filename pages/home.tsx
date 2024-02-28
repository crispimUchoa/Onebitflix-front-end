import HeaderAuth from "@/components/common/headerAuth";
import HeadersGenerics from "@/components/common/headersGenerics";
import Head from "next/head";
import { Container } from "reactstrap";

export default function Home(){
    return <>
    <Head>
        <title>Onebitflix - home</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
    </Head>
    <main>
        <HeaderAuth/>
    </main>
    </>
}
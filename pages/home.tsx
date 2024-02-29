import HeaderAuth from "@/components/common/headerAuth";
import HeadersGenerics from "@/components/common/headersGenerics";
import FavoriteCategory from "@/components/homeAuth/favoriteCategory";
import FeaturedCategory from "@/components/homeAuth/featuredCategory";
import FeaturedSection from "@/components/homeAuth/featuredSection";
import ListCategories from "@/components/homeAuth/listCategories";
import NewestCategory from "@/components/homeAuth/newestCategory";
import Head from "next/head";
import { Container } from "reactstrap";

export default function Home(){
    return <>
    <Head>
        <title>Onebitflix - home</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
    </Head>
    <main>
        <FeaturedSection/>
        <NewestCategory/>
        <FavoriteCategory/>
        <FeaturedCategory/>
        <ListCategories/>
    </main>
    </>
}
import Footer from "@/components/common/footer";
import HeaderAuth from "@/components/common/headerAuth";
import HeadersGenerics from "@/components/common/headersGenerics";
import FavoriteCategory from "@/components/homeAuth/favoriteCategory";
import FeaturedCategory from "@/components/homeAuth/featuredCategory";
import FeaturedSection from "@/components/homeAuth/featuredSection";
import ListCategories from "@/components/homeAuth/listCategories";
import NewestCategory from "@/components/homeAuth/newestCategory";
import Head from "next/head";
import { Container } from "reactstrap";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import PageSpinner from "@/components/common/spinner";

export default function Home(){
    const router = useRouter()
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        if(!sessionStorage.getItem('onebitflix-token')){
            router.push('/login') 
        } else {
            setLoading(false)
        }
    },[])

    if(loading) {
        return 
        <PageSpinner/>

    }
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
        <Footer/>
    </main>
    </>
}
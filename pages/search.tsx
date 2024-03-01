import HeaderAuth from "@/components/common/headerAuth";
import couseService, { CourseType } from "@/services/courseService";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from '../styles/search.module.scss'
import { Container } from "reactstrap";
import SearchCard from "@/components/searchCard";
import Footer from "@/components/common/footer";

export default function Search(){
    const router = useRouter()
    const [searchResult, setSearchResult] = useState<CourseType[]>([])
    const searchName = String(router.query.name)

    async function searchCourses() {
            const res = await couseService.getSearch(searchName)
            setSearchResult(res.data.courses)

    }

    useEffect(()=>{
        searchCourses()
    }, [searchName])

    return <>
    <Head>
        <title>Onebitflix - {searchName}</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
    </Head>
    <main className={styles.main}>
        <div className={styles.headerFooterBg}>
        <HeaderAuth/>
        </div>
        <Container>
        <p className={styles.youSearch}>Você pesquisou por "{searchName}"...</p>
        </Container>
        {searchResult.length>=1&&searchName!=='' ? 
        <div className={styles.searchContainer}>
            <Container className='d-flex flex-wrap justify-content-center gap-4 py-4 px-1'>
                {searchResult?.map((course)=>(
                <SearchCard course={course}/>
            ))}
        </Container>
        </div>
        : (
        <div className={styles.searchContainer}>
            <p className={styles.noSearchResult}>Nenhum resultado encontrado.</p>
        </div>
        
        )}
        <div className={styles.headerFooterBg}>
        <Footer/>
        </div>
    </main>
    </>
}
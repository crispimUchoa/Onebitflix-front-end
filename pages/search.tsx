import HeaderAuth from "@/components/common/headerAuth";
import couseService, { CourseType } from "@/services/courseService";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

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
    <main>
        <HeaderAuth/>
        {searchResult?.map((course)=>(
            <div key={course.id}>
                <p>{course.name}</p>
            </div>
        ))}
    </main>
    </>
}
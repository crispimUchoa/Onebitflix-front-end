import couseService, { CourseType } from '@/services/courseService';
import styles from '../../styles/coursePage.module.scss'
import HeaderAuth from "@/components/common/headerAuth";
import Head from "next/head";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useState } from 'react';

export default function CoursePage(){
    const [course, setCourse] = useState<CourseType>()
    const router = useRouter()
    const {id} = router.query

    async function getCourse() {
        if(typeof id !=='string') return
        const res = await couseService.getResults(id)

        if(res.status === 200) {
            setCourse(res.data)
        }  
    }

    useEffect(()=>{
        getCourse()
    }, [id])

    return<>
    <Head>
        <title>Onebitflix - {course ? course.name : 'curso inexistente'}</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
    </Head>
    <main>
        <HeaderAuth/>
        <p>{course?.name}</p>
    </main>
    </>
    }
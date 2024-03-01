import { useRouter } from 'next/router'
import styles from '../../../styles/episodePlayer.module.scss'
import Head from 'next/head'
import HeadersGenerics from '@/components/common/headersGenerics'
import { useEffect, useState } from 'react'
import couseService, { CourseType, EpisodeType } from '@/services/courseService'
import PageSpinner from '@/components/common/spinner'
import Footer from '@/components/common/footer'
import { Button, Container } from 'reactstrap'
import ReactPlayer from 'react-player'

export default function EpisodePlayer(){
    const router = useRouter()
    const [course, setCourse] = useState<CourseType>()
    const [episode, setEpisode] = useState<EpisodeType>()

    const episodeOrder = parseFloat(router.query.id?.toString() || '')
    const courseId = router.query.courseId?.toString() || ''

    async function getCourse() {
        if(typeof courseId !=='string') return 

        const res = await couseService.getEpisodes(courseId)
        
        if(res.status ===200){
            setCourse(res.data)
            setEpisode(res.data.episodes[episodeOrder])
        }
    }

    useEffect(()=>{
        getCourse()
    }, [episodeOrder])

    if(course?.episodes===undefined || episode === undefined) return <PageSpinner/>

    function handleLastEpisode(){
        router.push(`/course/episode/${episodeOrder-1}?courseId=${course?.id}`)
    }

    function handleNextEpisode(){
        router.push(`/course/episode/${episodeOrder+1}?courseId=${course?.id}`)
    }

    return<>
    <Head>
        <title>Onebitflix - {episode.name}</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
    </Head>
    <main>
        <HeadersGenerics logoUrl='/home' btnContent='Voltar para o curso' btnUrl={`/course/${courseId}`} />
        <Container className='d-flex flex-column align-items-center gap-3 pt-5'>
        <p className={styles.episodeTitle}>{episode.name}</p>
        {typeof window === 'undefined' ? null : (
            <ReactPlayer url={`${process.env.NEXT_PUBLIC_BASEURL}episodes/stream?videoUrl=${episode.videoUrl}&token=${sessionStorage.getItem('onebitflix-token')}`} controls className = {styles.player}/>
        )}
        <div className={styles.episodeButtonDiv}>
            <Button className={styles.episodeButton} disabled={episodeOrder===0} onClick={handleLastEpisode}>
                <img src="/episode/iconArrowLeft.svg" alt="setaEsquerda" className={styles.arrowImg}/>
            </Button>
            <Button className={styles.episodeButton} disabled={episodeOrder===course.episodes.length-1} onClick={handleNextEpisode}>
                <img src="/episode/iconArrowRight.svg" alt="setaDireita" className={styles.arrowImg} />
            </Button>
        </div>
        <p className="text-center">{episode.synopsis}</p>
        </Container>
        <Footer/>
    </main>
    </> 
}
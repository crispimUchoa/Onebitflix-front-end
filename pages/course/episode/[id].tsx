import { useRouter } from 'next/router'
import styles from '../../../styles/episodePlayer.module.scss'
import Head from 'next/head'
import HeadersGenerics from '@/components/common/headersGenerics'
import { useEffect, useRef, useState } from 'react'
import couseService, { CourseType, EpisodeType } from '@/services/courseService'
import PageSpinner from '@/components/common/spinner'
import Footer from '@/components/common/footer'
import { Button, Container } from 'reactstrap'
import ReactPlayer from 'react-player'
import watchEpisodeService from '@/services/episodeService'

export default function EpisodePlayer(){
    const router = useRouter()
    const [course, setCourse] = useState<CourseType>()
    const [isReady, setIsReady] = useState(false)
    const [episode, setEpisode] = useState<EpisodeType>()
    const episodeOrder = parseFloat(router.query.id?.toString() || '')
    const episodeId = parseFloat(router.query.episodeid?.toString() || '')
    const courseId = router.query.courseid?.toString() || ''
 
    const [loading, setLoading] = useState(true)

    
    const [getEpisodeTime, setGetEpisodeTime] = useState(0)
    const [episodeTime, setEpisodeTime] = useState(0)
    
    const playerRef = useRef<ReactPlayer>(null)
    
    async function handleGetEpisodeTime(){
        const res = await watchEpisodeService.getWatchTime(episodeId)
        console.log(res)
        if(res.data!==null){
            setGetEpisodeTime(res.data.seconds)
        }
    }
    
    async function handleSetEpisodeTime(){
        const res = await watchEpisodeService.setWatchTime({episodeId, seconds: Math.round(episodeTime)})
        
    }
    
    useEffect(()=>{
        if(!sessionStorage.getItem('onebitflix-token')){
            router.push('/login') 
        } else {
            setLoading(false)
        }
    },[])
    useEffect(()=>{
        handleGetEpisodeTime()
    },[router])
    
    function handlePlayerTime(){
        playerRef.current?.seekTo(getEpisodeTime)
        setIsReady(true)
    }
    
    if(isReady === true){
        setTimeout(()=>{
            handleSetEpisodeTime()
        }, 1000*3)
    }
    
    async function getCourse() {
        if(typeof courseId !=='string') return 
        console.log()
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
        router.push(`/course/episode/${episodeOrder-1}?courseid=${course?.id}&episodeid=${course?.episodes![episodeOrder-1].id}`)
    }
    
    function handleNextEpisode(){
        router.push(`/course/episode/${episodeOrder+1}?courseid=${course?.id}&episodeid=${course?.episodes![episodeOrder+1].id}`)
    }
    
    if(episodeOrder + 1 < course.episodes.length){
        if(Math.round(episodeTime) === course.episodes[episodeOrder].secondsLong){
            playerRef.current?.seekTo(0)
            handleSetEpisodeTime()
            handleNextEpisode()
        }
    }

    if(loading) {
        return 
        (<PageSpinner/>)
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
            <ReactPlayer url={`${process.env.NEXT_PUBLIC_BASEURL}episodes/stream?videoUrl=${episode.videoUrl}&token=${sessionStorage.getItem('onebitflix-token')}`} controls
            ref={playerRef}
            onStart={handlePlayerTime}
           onProgress={(progress)=>{setEpisodeTime(progress.playedSeconds)}}
            className = {styles.player}/>
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
import couseService, { CourseType } from '@/services/courseService';
import styles from '../../styles/coursePage.module.scss'
import HeaderAuth from "@/components/common/headerAuth";
import Head from "next/head";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useState } from 'react';
import { Button, Container } from 'reactstrap';
import PageSpinner from '@/components/common/spinner';
import Footer from '@/components/common/footer';
import EpisodesList from '@/components/episodesList';

export default function CoursePage(){
    const [course, setCourse] = useState<CourseType>()
    const [liked, setLiked] = useState(false)
    const [favorited, setFavorited] = useState(false)
    const router = useRouter()
    const {id} = router.query

    async function getCourse() {
        if(typeof id !=='string') return
        const res = await couseService.getResults(id)

        if(res.status === 200) {
            setCourse(res.data)
            setLiked(res.data.liked)
            setFavorited(res.data.favorited)
        }  
    }

    useEffect(()=>{
        getCourse()
    }, [id])

    async function handleLikeCourse(){
        if(typeof id !== 'string') return
        setLiked(like => !like)
        if(liked){
            await couseService.removeLike(id)
        } else{
            await couseService.like(id)
        }
    }
    async function handleFavCourse(){
        if(typeof id !== 'string') return
        setFavorited(fav => !fav)
        if(favorited){
            await couseService.removeFav(id)
        } else{
            await couseService.addToFav(id)
        }
    }

    if (course === undefined) return (<>
    <Head>
        <title>Onebitflix - curso inexistente</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
    </Head>
    <main>
        <div>
            <HeaderAuth/>
            <PageSpinner/>
            <Footer/>
        </div>
    </main>
    </>)
        
    

    return<>
    <Head>
        <title>Onebitflix - {course.name}</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
    </Head>
    <main>
        <div style={{
            backgroundImage: `linear-gradient(to bottom, #6666661a, #151515), url(${process.env.NEXT_PUBLIC_BASEURL}${course?.thumbnailUrl})`,
            backgroundSize: 'cover',
            minHeight: '550px',
            backgroundPosition: 'center'
        }}>
            <HeaderAuth/>
        </div>
        <Container className={styles.courseInfo}>
            <p className={styles.courseTitle}>{course.name}</p>
            <p className={styles.courseDescription}>{course.synopsis}</p>
            <Button outline className={styles.courseBtn} disabled={course?.episodes?.length===0}>
                ASSISTIR AGORA
                <img src="/buttonPlay.svg" alt="buttonImg" className={styles.buttonImg} />
            </Button>
            <div className={styles.interactions}>
                {/* Renderiza imagem do LIKE */}
                {liked === false ? (
                    <img src="/course/iconLike.svg" alt="likeImg" className={styles.interactionsImg} 
                    onClick={handleLikeCourse}
                    />
                ): (
                    <img src="/course/iconLiked.svg" alt="likeImg" className={styles.interactionsImg} 
                onClick={handleLikeCourse}
                />
                )}

                {/* Renderiza imagem do FAVORITO */}
                {favorited === false ? (
                    <img src="/course/iconAddFav.svg" alt="likeImg" className={styles.interactionsImg} 
                    onClick={handleFavCourse}
                    />
                ): (
                    <img src="/course/iconFavorited.svg" alt="likeImg" className={styles.interactionsImg} 
                    onClick={handleFavCourse}
                    />
                )}
                
            </div>
        </Container>
        {/* Renderiza os EPISÓDIOS */}
        <Container className={styles.episodeInfo}>
            <p className={styles.episodeDivision}>EPISÓDIOS</p>
            <p className={styles.episodeLength}>{course?.episodes?.length} episódios</p>
            {course?.episodes?.length ===0 ? 
            (<p>
                <strong>Não temos episódios desse curso ainda. Volte outra hora! &#x1F606; &#x1F918;</strong>
            </p>) :
            (
                course?.episodes?.map((episode)=>(
                    <EpisodesList key={episode.id} episode={episode}/>
                ))
            )}
        </Container>
        <Footer/>
    </main>
    </>
    }
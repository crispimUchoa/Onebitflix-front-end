import { CourseType, EpisodeType } from '@/services/courseService'
import styles from './styles.module.scss'
import { useRouter } from 'next/router'

interface props{
    episode: EpisodeType
    course: CourseType
}

export default function EpisodesList({episode, course}:props){
    const router = useRouter()

    function handleSecondsToMin(totalSeconds:number){
        const minutes = Math.floor(totalSeconds/60).toString().padStart(2,'0')
        const seconds = (totalSeconds%60).toString().padStart(2,'0')
        
        return `${minutes}:${seconds}`
    }

    function handleEpisodePlayer(){
        router.push(`/course/episode/${episode.order -1}?courseId=${course.id}`)
    }

    return <>
    <div className={styles.episodeCard } onClick={handleEpisodePlayer}>
        <div className={styles.episodeOrderTime}>
            <p className={styles.episodeOrder}>Episódio Nº {episode.order}</p>
            <p className={styles.episodeTime}>{handleSecondsToMin(episode.secondsLong)}</p>
        </div>
        <div className={styles.episodeTitleDescription}>
            <p className={styles.episodeTitle}>{episode.name}</p>
            <p className={styles.episodeDescription}>{episode.synopsis}</p>
        </div>
    </div>
    </>
}
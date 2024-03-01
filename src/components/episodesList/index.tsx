import { EpisodeType } from '@/services/courseService'
import styles from './styles.module.scss'

interface props{
    episode: EpisodeType
}

export default function EpisodesList({episode}:props){
    function handleSecondsToMin(totalSeconds:number){
        const minutes = Math.floor(totalSeconds/60).toString().padStart(2,'0')
        const seconds = (totalSeconds%60).toString().padStart(2,'0')
        
        return `${minutes}:${seconds}`
    }
    return <>
    <div className={styles.episodeCard}>
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
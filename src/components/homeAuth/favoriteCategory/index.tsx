import useSWR from 'swr';
import styles from '../../../../styles/slideCategory.module.scss'
import couseService from '@/services/courseService';
import SlideComponent from '@/components/common/slideComponent';

export default function FavoriteCategory(){
    const {data, error} = useSWR('/favorites', couseService.getFavCourses)

    if (error) return error;
    if(!data) return (<p>Loading...</p>)

    return <>
    <p className={styles.titleCategory}>Minha lista</p>
    {data.data.courses.length > 0 ? (
        <SlideComponent course={data.data.courses}/>
    ) : (
        <p className='text-center pt-3 h5'><strong>Você não tem nenhum curso na lista.</strong></p>
    )}
    </>
}
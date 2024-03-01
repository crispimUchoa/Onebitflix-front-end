import useSWR from 'swr';
import styles from '../../../../styles/slideCategory.module.scss'
import couseService from '@/services/courseService';
import SlideComponent from '@/components/common/slideComponent';
import PageSpinner from '@/components/common/spinner';

export default function FeaturedCategory(){
    const {data, error} = useSWR('/featured', couseService.getFeaturedCourses)

    if (error) return error;
    if(!data) return (<PageSpinner/>)

    return <>
    <p className={styles.titleCategory}>Destaques</p>
    {data.data.length > 0 ? (
        <SlideComponent course={data.data}/>
    ) : (
        <p className='text-center pt-3 h5'><strong>Não há cursos em destaque.</strong></p>
    )}
    </>
}
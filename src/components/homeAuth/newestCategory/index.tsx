import styles from '../../../../styles/slideCategory.module.scss'
import SlideComponent from "@/components/common/slideComponent";
import couseService from "@/services/courseService";
import useSWR from "swr";

export default function NewestCategory(){
    const {data, error} = useSWR('/newest', couseService.getNewestCourses)

    if (error) return error;
    if(!data) return (<p>Loading...</p>)

    return <>
    <p className={styles.titleCategory}>LANÇAMENTOS</p>
    <SlideComponent course={data.data}/>
    </>
}
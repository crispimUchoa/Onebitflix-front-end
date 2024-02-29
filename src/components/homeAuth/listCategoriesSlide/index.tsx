import SlideComponent from "@/components/common/slideComponent";
import categoryService from "@/services/categoryServices";
import useSWR from "swr";
import styles from '../../../../styles/slideCategory.module.scss'

interface props{
    categoryId: number
    categoryName: string
}

export default function ListCategoriesSlide({categoryId, categoryName}:props){
    const {data, error} = useSWR(`/categoriesCourses/${categoryId}`, ()=>categoryService.getCourses(categoryId))

    if (error) return error;
    if(!data) return (<p>Loading...</p>)

    return <>
    <p className={styles.titleCategory}>{categoryName}</p>
    <SlideComponent course={data.data.courses}/>
    </>
}
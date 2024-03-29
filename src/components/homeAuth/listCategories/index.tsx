import useSWR from 'swr';
import categoryService, { CategoryType } from '@/services/categoryServices';
import SlideComponent from '@/components/common/slideComponent';
import styles from '../../../../styles/slideCategory.module.scss'
import ListCategoriesSlide from '../listCategoriesSlide';
import PageSpinner from '@/components/common/spinner';

export default function ListCategories(){
    const {data, error} = useSWR('/listCategories', categoryService.getCategories)

    if (error) return error;
    if(!data) return (<PageSpinner/>)

    return <>
    {data.data.categories?.map((category:CategoryType)=> (
       <div key={category.id}>
            <ListCategoriesSlide categoryId={category.id} categoryName={category.name} key={category.id}/>
       </div>
    ))}
    </>
}
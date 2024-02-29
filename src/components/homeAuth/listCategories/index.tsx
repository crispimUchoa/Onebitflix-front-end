import useSWR from 'swr';
import categoryService, { CategoryType } from '@/services/categoryServices';
import SlideComponent from '@/components/common/slideComponent';
import styles from '../../../../styles/slideCategory.module.scss'
import ListCategoriesSlide from '../listCategoriesSlide';

export default function ListCategories(){
    const {data, error} = useSWR('/listCategories', categoryService.getCategories)

    if (error) return error;
    if(!data) return (<p>Loading...</p>)

    return <>
    {data.data.categories?.map((category:CategoryType)=> (
       <div key={category.id}>
            <ListCategoriesSlide categoryId={category.id} categoryName={category.name} key={category.id}/>
       </div>
    ))}
    </>
}
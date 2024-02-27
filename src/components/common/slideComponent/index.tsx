//@ts-ignore
import {Splide, SplideSlide} from '@splidejs/react-splide';
import { CourseType } from '../../../services/courseService';
import "@splidejs/splide/dist/css/splide.min.css";
import SlideCard from '../slideCard';

interface props{
    course: CourseType[]
}

export default function SlideComponent({course}:props){
    return <>
    <div>
        <Splide options={{
            type: 'loop',
            perPage: 4,
            perMove: 1,
            pagination: false
        }}>
            {course?.map((course)=>(
                <SplideSlide key={course.id}>
                    <SlideCard course={course}></SlideCard>
                </SplideSlide>
            ))}
        </Splide>
    </div>
    </>
}
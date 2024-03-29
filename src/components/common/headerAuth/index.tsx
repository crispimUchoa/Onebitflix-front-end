import styles from './styles.module.scss'
import Link from "next/link";
import { FormEvent, useEffect, useState } from 'react';
import { Container, Form, Input} from "reactstrap";
import Modal from 'react-modal'
import { useRouter } from 'next/router';
import { UserParams, profileService } from '@/services/profileService';

Modal.setAppElement('#__next')

export default function HeaderAuth(){
    const router = useRouter()
    const [initials, setInitials] = useState('')
    const [searchName, setSearchName] = useState('')
    const [modalOpen, setModalOpen] = useState(false)

    async function handleSearch(event:FormEvent<HTMLFormElement>) {
        event.preventDefault()
        router.push(`/search?name=${searchName}`)
        setSearchName('')
    }

    function handleSearchClick() {
        router.push(`/search?name=${searchName}`)
        setSearchName('')
    }

    useEffect(()=>{
        profileService.fetchCurrent().then((user: UserParams)=>{
            const firstNameInitial = user.firstName.charAt(0)
            const lastNameInitial = user.lastName.charAt(0)
            setInitials(`${firstNameInitial}${lastNameInitial}`)
        })
    },[])
    

    function handleOpenModal(){
        setModalOpen(true)
    }
    function handleCloseModal(){
        setModalOpen(false)
    }

    function handleLogout(){
        sessionStorage.clear()
        router.push('/')
    }
    

    return <>
    <Container className={styles.nav}>
        <Link href='/home'>
            <img src="/logoOnebitflix.svg" alt="logoOnebitflix" className={styles.imgLogoNav}/>
        </Link>

        <div className='d-flex align-items-center'>
            <Form onSubmit={handleSearch}>
                <Input name='search' type='search' placeholder='Pesquisar' className={styles.input}
                value={searchName} onChange={(event)=>setSearchName(event.currentTarget.value.toLowerCase())}
                />
            </Form>
            <img src="/homeAuth/iconSearch.svg" alt="lupaHeader" className={styles.searchImg} onClick={handleSearchClick}/>

            <p className={styles.userProfile} onClick={handleOpenModal}>{initials}</p>

        </div>
        <Modal isOpen={modalOpen} onRequestClose={handleCloseModal} shouldCloseOnEsc={true} 
        className={styles.modal} overlayClassName={styles.overlayerModal}>
            <Link href='/profile' style={{textDecoration: 'none'}}>
                <p className={styles.modalLink}>Meus dados</p>
            </Link>
            <p className={styles.modalLink} onClick={handleLogout}>Sair</p>
        </Modal>
    </Container>
    </>
}
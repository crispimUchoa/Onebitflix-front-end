import styles from './styles.module.scss'
import Link from "next/link";
import { useState } from 'react';
import { Container, Form, Input} from "reactstrap";
import Modal from 'react-modal'
import { useRouter } from 'next/router';

Modal.setAppElement('#__next')

export default function HeaderAuth(){
    const router = useRouter()
    const [modalOpen, setModalOpen] = useState(false)

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
            <Form>
                <Input name='search' type='search' placeholder='Pesquisar' className={styles.input}/>
            </Form>
            <img src="/homeAuth/iconSearch.svg" alt="lupaHeader" className={styles.searchImg} />

            <p className={styles.userProfile} onClick={handleOpenModal}>AB</p>

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
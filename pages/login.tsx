import Head from 'next/head'
import styles from '../styles/registerLogin.module.scss'
import HeadersGenerics from '@/components/common/headersGenerics'
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap'
import Footer from '@/components/common/footer'
import { useRouter } from 'next/router'
import { FormEvent, useEffect, useState } from 'react'
import ToastComponent from '@/components/common/toast'
import authService from '@/services/authService'

export default function Login(){
    const router = useRouter()  
    const [toastColor, setToastColor] = useState('')
    const [toastIsOpen, setToastIsOpen] = useState(false)
    const [toastMessage, setToastMessage] = useState('')

    useEffect(()=>{
        if(sessionStorage.getItem('onebitflix-token')){
            router.push('/home')
        }
    }, [])

    useEffect(()=>{
        const registerSucess = router.query.registered

        if(registerSucess === 'true'){
            setToastColor('bg-success')
            setToastIsOpen(true)
            setTimeout(()=>{
                setToastIsOpen(false)
            }, 1000*3)
            setToastMessage('Cadastro feito com sucesso!')
        }
    },[router.query])

    const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)
        const email = formData.get('email')!.toString() 
        const password = formData.get('password')!.toString() 

        const params = {email, password}

        const {status} = await authService.login(params)
        
        if(status ===200){
            router.push('/home')
        } else{
            setToastColor('bg-danger')
            setToastIsOpen(true)
            setTimeout(()=>{
                setToastIsOpen(false)
            }, 1000*3)
            setToastMessage('Email ou senha incorretos')
        }
    }

    return<>
    <Head>
        <title>Onebitflix - login</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
    </Head>
    <main className={styles.main}>
        <HeadersGenerics logoUrl='/' btnUrl='/register' btnContent='Quero fazer parte'  />

        <Container className='py-5'>
            <p className={styles.formTitle}>Bem-vindo(a) de volta!</p>
            <Form className={styles.form} onSubmit={handleLogin}>
                <p className='text-center'><strong>Bem-vindo(a) ao OneBitFlix!</strong></p>

            <FormGroup>
                <Label for='email'>EMAIL</Label>
                <Input 
                id='email' 
                name='email' 
                type='email' 
                placeholder='Qual o seu email?' 
                required
                className={styles.input}
                />
            </FormGroup>

            <FormGroup>
                <Label for='password'>senha</Label>
                <Input 
                id='password' 
                name='password' 
                type='password' 
                placeholder='Qual o seu senha?' 
                required
                className={styles.input}
                />  
            </FormGroup>

            <Button outline className={styles.formBtn}>ENTRAR</Button>

            

            </Form>
        </Container>
        <Footer/>
        <ToastComponent color={toastColor} isOpen={toastIsOpen} message={toastMessage} />
    </main>
    </>
}
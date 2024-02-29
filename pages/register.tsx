import HeadersGenerics from '@/components/common/headersGenerics'
import styles from '../styles/registerLogin.module.scss'
import Head from 'next/head'
import { Form, FormGroup, Label, Input, Container, Button } from 'reactstrap'
import Footer from '@/components/common/footer'
import { FormEvent, useEffect, useState } from 'react'
import authService from '@/services/authService'
import { useRouter } from 'next/router'
import ToastComponent from '@/components/common/toast'

const currentDate = new Date()
const currentYear = currentDate.getFullYear()
const currentMonth = currentDate.getMonth().toString().padStart(2, '0')
const currentDay = currentDate.getDate().toString().padStart(2, '0')
const allowedYear = currentYear-13

const alloweDate = `${allowedYear}-${currentMonth}-${currentDay}`


export default function Register(){
    const router = useRouter()  
    const [toastIsOpen, setToastIsOpen] = useState(false)
    const [toastMessage, setToastMessage] = useState('')

    useEffect(()=>{
        if(sessionStorage.getItem('onebitflix-token')){
            router.push('/home')
        }
    }, [])

    const handleRegister = async (event: FormEvent<HTMLFormElement>)=>{
        event.preventDefault()

        const formData = new FormData(event.currentTarget)
        const firstName = formData.get('firstName')!.toString()
        const lastName = formData.get('lastName')!.toString()
        const birth = formData.get('birth')!.toString()
        const email = formData.get('email')!.toString() 
        const phone = formData.get('phone')!.toString()
        const password = formData.get('password')!.toString()
        const confirmPassword = formData.get('confirmPassword')!.toString()

        const params = {firstName, lastName, birth, email, password, phone}

        if(password!==confirmPassword) {
            setToastIsOpen(true)
            setTimeout(()=>{
                setToastIsOpen(false)
            }, 1000*3)
            setToastMessage('Senhas e confirmação diferentes')

            return;
        }

        const {data, status} = await authService.register(params)

        if(status===201){
            router.push('/login?registered=true')
        } else{
            setToastIsOpen(true)
            setTimeout(()=>{
                setToastIsOpen(false)
            }, 1000*3)
            setToastMessage(data.message)
        }
    }

    return <>
    <Head>
        <title>Onebitflix - Registro</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />

        <script src="https://jsuites.net/v4/jsuites.js"></script>
    </Head>
    <main className={styles.main}>
    <HeadersGenerics logoUrl='/' btnUrl='/login' btnContent='Quero fazer login'/>

    <Container className='py-5'>
        <p className={styles.formTitle}>Bem-vindo(a) ao OneBitFlix!</p>
        <Form onSubmit={handleRegister} className={styles.form} >
            <p className='text-center'><strong>Faça a sua conta!</strong></p>

            <FormGroup>
                <Label for='firstName' className={styles.label}>NOME</Label>
                <Input 
                id='firstName' 
                name='firstName' 
                type='text' 
                placeholder='Qual o seu nome?' 
                required maxLength={20}
                className={styles.inputName}
                />
            </FormGroup>

            <FormGroup>
                <Label for='lastName' className={styles.label}>SOBRENOME</Label>
                <Input 
                id='lastName' 
                name='lastName' 
                type='text' 
                placeholder='Qual o seu sobrenome?' 
                required maxLength={20}
                className={styles.inputName}
                />
            </FormGroup>

            <FormGroup>
                <Label for='phone' className={styles.label}>WHATSAPP / TELEGRAM</Label>
                <Input 
                id='phone' 
                name='phone' 
                type='tel'
                data-mask='[-]+55 (00) 00000-0000'
                placeholder='(xx) 9xxxx-xxxx' 
                required maxLength={20}
                className={styles.input}
                />
            </FormGroup>

            <FormGroup>
                <Label for='email' className={styles.label}>EMAIL</Label>
                <Input 
                id='email' 
                name='email' 
                type='email' 
                placeholder='Digite seu email' 
                required maxLength={50}
                className={styles.input}
                />
            </FormGroup>

            <FormGroup>
                <Label for='birth' className={styles.label}>DATA DE NASCIMENTO</Label>
                <Input 
                id='birth' 
                name='birth' 
                type='date' 
                min='1930-01-01' 
                max={alloweDate}
                required
                className={styles.input}
                />
            </FormGroup>

            <FormGroup>
                <Label for='password' className={styles.label}>SENHA</Label>
                <Input 
                id='password' 
                name='password' 
                type='password' 
                placeholder='Digite sua senha (MIN: 6)' 
                minLength={6}
                required 
                className={styles.input}
                />
            </FormGroup>

            <FormGroup>
                <Label for='confirmPassword' className={styles.label}>CONFIRMAÇÃO DE SENHA</Label>
                <Input 
                id='confirmPassword' 
                name='confirmPassword' 
                type='password' 
                placeholder='confirme sua senha' 
                minLength={6}
                required 
                className={styles.input}
                />
            </FormGroup>
            <Button type={'submit'} outline color='light' className={styles.formBtn}>CADASTRAR</Button>
        </Form>
    </Container>
    <Footer/>
    <ToastComponent color='bg-danger' isOpen={toastIsOpen} message={toastMessage} />
    </main>
    </>
}
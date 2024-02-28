import HeadersGenerics from '@/components/common/headersGenerics'
import styles from '../styles/registerLogin.module.scss'
import Head from 'next/head'

export default function Register(){
    return <>
    <Head>
        <title>Onebitflix - Registro</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
    </Head>
    <main>
    <HeadersGenerics logoUrl='/' btnUrl='/login' btnContent='Quero fazer login'/>
    </main>
    </>
}
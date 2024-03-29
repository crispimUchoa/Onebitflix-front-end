import { Container } from 'reactstrap'
import styles from './styles.module.scss'

export default function Footer(){
    return <>
    <Container className={styles.footer}>
        <img src='/logoOneBitCode.svg' alt="logoFooter" className={styles.footerLogo} />
        <a href="http://onebitcode.com" target={'_blank'} className={styles.footerLink}>ONEBITCODE.COM</a>
    </Container>
    </>
}
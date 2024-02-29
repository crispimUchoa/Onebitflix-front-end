import { Button, Form, FormGroup, Input, Label } from 'reactstrap'
import styles from '../../../styles/profile.module.scss'

export default function UserForm(){
    return<>
    <Form className={styles.form}>
        <div className={styles.formName}>
            <p className={styles.nameAbbreviation}>NT</p>
            <p className={styles.userName}>NAME TEST</p>
        </div>
        <div className={styles.memberTime}>
            <img src="/profile/iconUserAccount.svg" alt="iconProfile" className={styles.memberTimeImg} />
            <p className={styles.memberTimeText}>Membro desde <br /> 20 de abril de 2020</p>
        </div>
        <hr />
       <div className={styles.inputFlexDiv}>
       <FormGroup>
            <Label className={styles.label} for='firstName'>NOME</Label>
            <Input id='firstName' type='text' name='firstName' placeholder='Qual seu primeiro nome?' 
            required
            maxLength={20}
            className={styles.inputFlex}
            value='Name'
            />
        </FormGroup>
        <FormGroup>
            <Label className={styles.label} for='lastName'>SOBRENOME</Label>
            <Input id='lastName' type='text' name='lastName' placeholder='Qual seu sobrenome?' 
            required
            maxLength={20}
            className={styles.inputFlex}
            value='Last name'
            />
        </FormGroup>
       </div>
       <div className={styles.inputNormalDiv}>
       <FormGroup>
            <Label className={styles.label} for='phone'>WHATSAPP / TELEGRAM</Label>
            <Input id='phone' type='tel' name='phone' placeholder='(xx) 9xxxx-xxxx' 
            required
            className={styles.input}
            value='+55 (88) 99261-8557'
            />
        </FormGroup>
        <FormGroup>
            <Label className={styles.label} for='email'>EMAIL</Label>
            <Input id='email' type='email' name='email' placeholder='email@email.com' 
            required
            className={styles.input}
            value='crispim.uneto@gmail.clm'
            />
        </FormGroup>
        <Button className={styles.formBtn} outline type='submit'>Salvar alterações</Button>
       </div>
    </Form>
    </>
}
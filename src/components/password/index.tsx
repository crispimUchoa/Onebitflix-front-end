import styles from '../../../styles/profile.module.scss'
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

export default function PasswordForm(){
    return <>
    <Form className={styles.form}>
        <div className={styles.inputNormalDiv}>
            <FormGroup>
                <Label for='currentPassword' className={styles.label}>SENHA ATUAL</Label>
                <Input id="currentPassword" name='currentPassword' type="password" placeholder="******" minLength={6} required className={styles.input}/>
            </FormGroup>
            
        </div>
        <div className={styles.inputFlexDiv}>
        <FormGroup>
                <Label for='newPassword' className={styles.label}>NOVA SENHA</Label>
                <Input id="newPassword" name='newPassword' type="password" placeholder="******" minLength={6} required className={styles.inputFlex}/>
            </FormGroup>
            <FormGroup>
                <Label for='confirmNewPassword' className={styles.label}>CONFIRMAR NOVA SENHA</Label>
                <Input id="confirmNewPassword" name='confirmNewPassword' type="password" placeholder="******" minLength={6} required className={styles.inputFlex}/>
            </FormGroup>
            <Button className={styles.formBtn} outline>SALVAR ALTERAÇÕES</Button>
        </div>
    </Form>
    </>
}
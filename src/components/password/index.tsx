import { FormEvent, useEffect, useState } from 'react';
import styles from '../../../styles/profile.module.scss'
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { profile } from 'console';
import { profileService } from '@/services/profileService';
import ToastComponent from '../common/toast';

export default function PasswordForm(){
    const [color, setColor] = useState('')
    const [toastIsOpen, setToastIsOpen] = useState(false)
    const [toastMessage, setToastMessage] = useState('')
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('')

    useEffect(()=>{
        profileService.fetchCurrent().then((password) => {
            setCurrentPassword(password.currentPassword)
            setNewPassword(password.newPassword)
            
        })
    },[])

    const handlePasswordUpdate= async (event:FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if(newPassword!==confirmNewPassword){
            setToastIsOpen(true)
            setToastMessage('Senha e confirmação de senha diferentes!')
            setColor('bg-danger')
            setTimeout(()=>{setToastIsOpen(false)},1000*3)
            return
        }
        if(currentPassword===newPassword){
            setToastIsOpen(true)
            setToastMessage('Não coloque a nova senha igual a antiga')
            setColor('bg-danger')
            setTimeout(()=>{setToastIsOpen(false)},1000*3)
            return
        }
        const res = await profileService.passwordUpdate({currentPassword, newPassword})

        if(res===204){
            setToastIsOpen(true)
            setToastMessage('Senha alterada com sucesso!')
            setColor('bg-success')
            setTimeout(()=>{setToastIsOpen(false)},1000*3)
            setCurrentPassword('')
            setNewPassword('')
            setConfirmNewPassword('')
            return
        }

        if(res===400){
            setToastIsOpen(true)
            setToastMessage('Senha atual incorreta!')
            setColor('bg-danger')
            setTimeout(()=>{setToastIsOpen(false)},1000*3)
            return
        }
    }

    return <>
    <Form className={styles.form} onSubmit={handlePasswordUpdate}>
        <div className={styles.inputNormalDiv}>
            <FormGroup>
                <Label for='currentPassword' className={styles.label}>SENHA ATUAL</Label>
                <Input id="currentPassword" name='currentPassword' type="password" placeholder="******" minLength={6} required className={styles.input}
                value={currentPassword} onChange={(event)=>setCurrentPassword(event.currentTarget.value)}/>
            </FormGroup>
            
        </div>
        <div className={styles.inputFlexDiv}>
        <FormGroup>
                <Label for='newPassword' className={styles.label}>NOVA SENHA</Label>
                <Input id="newPassword" name='newPassword' type="password" placeholder="******" minLength={6} required className={styles.inputFlex}
                value={newPassword} onChange={(event)=>setNewPassword(event.currentTarget.value)}/>
            </FormGroup>
            <FormGroup>
                <Label for='confirmNewPassword' className={styles.label}>CONFIRMAR NOVA SENHA</Label>
                <Input id="confirmNewPassword" name='confirmNewPassword' type="password" placeholder="******" minLength={6} required className={styles.inputFlex}
                value={confirmNewPassword} onChange={(event)=>setConfirmNewPassword(event.currentTarget.value)}/>
            </FormGroup>
            <Button className={styles.formBtn} outline>SALVAR ALTERAÇÕES</Button>
        </div>
    </Form>
    <ToastComponent isOpen={toastIsOpen} color={color} message={toastMessage} />

    </>
}
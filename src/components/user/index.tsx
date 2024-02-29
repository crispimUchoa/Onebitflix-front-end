import { Button, Form, FormGroup, Input, Label } from 'reactstrap'
import styles from '../../../styles/profile.module.scss'
import { FormEvent, useEffect, useState } from 'react'
import { profileService } from '@/services/profileService'
import ToastComponent from '../common/toast'
import { useRouter } from 'next/router'

export default function UserForm(){
    const router = useRouter()
    const [color, setColor] = useState('')
    const [toastIsOpen, setToastIsOpen] = useState(false)
    const [toastMessage, setToastMessage] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [initialEmail, setInitialEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [createdAt, setCreatedAt] = useState('')
    const date = new Date(createdAt)
    const month = date.toLocaleDateString('default', {month: 'long'})

    useEffect(()=>{
        profileService.fetchCurrent().then(user=>{
            setFirstName(user.firstName)
            setLastName(user.lastName)
            setEmail(user.email)
            setInitialEmail(user.email)
            setPhone(user.phone)
            setCreatedAt(user.createdAt)
        
        })
    },[])

    const handleUserUpdate = async (event: FormEvent<HTMLFormElement>) =>{
        event.preventDefault()

        if(!firstName || !lastName || !phone || !email) {
            setToastIsOpen(true)
            setToastMessage('Preencha todos os dados do formulário!')
            setColor('bg-danger')
            setTimeout(()=>{setToastIsOpen(false)}, 1000*3)
            return
        }

        const res = await profileService.userUpdate({firstName, lastName, phone, email, createdAt})
        
        
        if(res===200){
            setToastIsOpen(true)
            setToastMessage('Informações alteradas com sucesso!')
            setColor('bg-success')
            
            if(email!=initialEmail){
                sessionStorage.clear()

                setTimeout(()=>{router.push('/')},1000*1)

            }
        } else{
            setToastIsOpen(true)
            setToastMessage('Você não pode mudar para esse email!')
            setColor('bg-danger')
        }
        setTimeout(()=>{
            setToastIsOpen(false)
    }, 1000*3)
    }

    return<>
    <Form className={styles.form} onSubmit={handleUserUpdate}>
        <div className={styles.formName}>
            <p className={styles.nameAbbreviation}>{`${firstName.charAt(0)}${lastName.charAt(0)}`}</p>
            <p className={styles.userName}>{`${firstName} ${lastName}`}</p>
        </div>
        <div className={styles.memberTime}>
            <img src="/profile/iconUserAccount.svg" alt="iconProfile" className={styles.memberTimeImg} />
            <p className={styles.memberTimeText}>Membro desde <br /> {`${date.getDate()} de ${month} de ${date.getFullYear()}`}</p>
        </div>
        <hr />
       <div className={styles.inputFlexDiv}>
       <FormGroup>
            <Label className={styles.label} for='firstName'>NOME</Label>
            <Input id='firstName' type='text' name='firstName' placeholder='Qual seu primeiro nome?' 
            required
            maxLength={20}
            className={styles.inputFlex}
            value={firstName}
            onChange={event => setFirstName(event.target.value)}
            />
        </FormGroup>
        <FormGroup>
            <Label className={styles.label} for='lastName'>SOBRENOME</Label>
            <Input id='lastName' type='text' name='lastName' placeholder='Qual seu sobrenome?' 
            required
            maxLength={20}
            className={styles.inputFlex}
            value={lastName}
            onChange={event => setLastName(event.target.value)}

            />
        </FormGroup>
       </div>
       <div className={styles.inputNormalDiv}>
       <FormGroup>
            <Label className={styles.label} for='phone'>WHATSAPP / TELEGRAM</Label>
            <Input id='phone' type='tel' name='phone' placeholder='(xx) 9xxxx-xxxx' 
            required
            className={styles.input}
            value={phone}
            onChange={event => setPhone(event.target.value)}
            />
        </FormGroup>
        <FormGroup>
            <Label className={styles.label} for='email'>EMAIL</Label>
            <Input id='email' type='email' name='email' placeholder='email@email.com' 
            required
            className={styles.input}
            value={email}
            onChange={event => setEmail(event.target.value)}
            />
        </FormGroup>
        <Button className={styles.formBtn} outline type='submit'>Salvar alterações</Button>
       </div>
    </Form>
    <ToastComponent isOpen={toastIsOpen} color={color} message={toastMessage} />
    </>
}
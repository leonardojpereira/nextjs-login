import { useState } from 'react';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/router';

import Link from 'next/link';
import styles from '../styles/Login.module.css';
import Input from '../styles/src/components/input/input';
import Button from '../styles/src/components/button/button';

import LoginCard from "../styles/src/components/loginCard.js/loginCard"

export default function LoginPage() {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    })
    
    const [error, setError] = useState('');
    const router = useRouter();

    const handleFormEdit = (event, name) => {
        setFormData({
            ...formData,
            [name]: event.target.value
        })
    }

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            const response = await fetch(`/api/user/login`, {
                method: 'POST',
                body: JSON.stringify(formData)
            })
            const json = await response.json();
            if (response.status !== 200) throw new Error(json)
    
            
            setCookie('authorization', json);
            router.push('/');
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <div className={styles.background}>
            <LoginCard title="Entre em sua conta">
                <form className={styles.form} onSubmit={handleSubmit}>
                    <Input type="text" placeholder="Seu e-mail" value={formData.email} required onChange={(e) => {handleFormEdit(e, "email")}}/>
                    <Input type="password" placeholder="Sua senha" value={formData.password} required onChange={(e) => {handleFormEdit(e, "password")}}/>
                    <Button>Entrar</Button>
                    <Link href="/register">Cadastre-se agora</Link>
                    {error && <p className={styles.error}>{error}</p>}
                </form>
            </LoginCard>
        </div>
    )
}
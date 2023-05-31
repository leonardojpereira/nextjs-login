import { useState } from 'react';
import Link from 'next/link';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/router';

import LoginCard from "../styles/src/components/loginCard.js/loginCard"
import Input from "../styles/src/components/input/input";
import Button from "../styles/src/components/button/button";
import styles from '../styles/Login.module.css';
export default function RegisterPage() {

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
        const response = await fetch(`/api/user/register`, {
            method: 'POST',
            body: JSON.stringify(formData)
        })
        const json = await response.json();
        if (response.status !== 201) throw new Error(json)

        
        setCookie('authorization', json);
        router.push('/');
    } catch (err) {
        setError(err.message);
    }
}

    return (
        <div className={styles.background}>
            <LoginCard title="Crie sua conta">
                <form onSubmit={handleSubmit} className={styles.form}>
                    <Input type="text" placeholder="Seu nome" required value={formData.name} onChange={(e) => {handleFormEdit(e, "name")}}/>
                    <Input type="text" placeholder="Seu e-mail" required value={formData.email} onChange={(e) => {handleFormEdit(e, "email")}}/>
                    <Input type="password" placeholder="Sua senha" required value={formData.password} onChange={(e) => {handleFormEdit(e, "password")}}/>
                    <Button>Cadastrar</Button> 
                    <Link href="/login">Já possui uma conta?</Link>
                    {error && <p className={styles.error}>{error}</p>}
                </form>
            </LoginCard>
        </div>
    )
}
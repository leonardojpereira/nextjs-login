import { getCookie } from 'cookies-next';
import { verify } from '../services/user';

export default function Home() {

  

  return (
    <div>
      Página segura - Perfil do usuário
    </div>
  )
}

export const getServerSideProps = async ({req, res}) => {
  try {
    const token = getCookie('authorization', { req, res });
    if (!token) throw new Error('Token inválido');

    verify(token);
    return {
      props: {}
    }
  } catch (err) {
    return {
      redirect: {
        prmanent: false,
        destination: '/login'
      },
      props: {}
    }
  }
}

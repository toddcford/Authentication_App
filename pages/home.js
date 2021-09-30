import {useEffect} from 'react'
import {useRouter} from 'next/router'
import Link from 'next/link'
import styles from '../styles/User_Home.module.css'

function Home({user}) {
  const router = useRouter();

  useEffect(()=> {
    router.push('/home', undefined, {shallow: true});
  }, [])

  return (
    <div className='wrapper'>
      
      <h1 className={styles.title}> {user.from === 'login' ? 'Welcome back' : 'Hello'} {user.fname}!</h1>
      
      <Link href='/'> Log Out </Link>
    </div>
  )
}

Home.getInitialProps = async (ctx) => ({ user: ctx.query.user })

export default Home
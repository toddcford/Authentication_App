import {useEffect} from 'react'
import {useRouter} from 'next/router'
import Link from 'next/link'

function About({user}) {
  const router = useRouter();

  useEffect(()=> {
    router.push('/about', undefined, {shallow: true});
  }, [])

  return (
    <div className='wrapper'>
      
      <p> {user.from === 'login' ? 'Welcome back' : 'Hello'} {user.name}!</p>
      
      <Link href='/'> Home</Link>
    </div>
  )
}

About.getInitialProps = async (ctx) => ({ user: ctx.query.user })

export default About
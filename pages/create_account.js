import PropTypes from 'prop-types';
import styles from '../styles/create_account.module.css'
import Link from 'next/link'

const propTypes = {
  user: PropTypes.shape({
    displayName: PropTypes.string,
  }),
};

const Home = () => (
    <div className={styles.wrapper}>
      <h2 className={styles.title}> Hello! Enter Your Information to Sign up:</h2>
      <div className={styles.form_wrapper}>
      <form className={styles.form} action="/user/signup" method="POST">
        <div className={styles.rowone}>
          <input className={styles.input} placeholder='First Name' name="fname"></input>
        </div>
        <div className={styles.rowtwo}>
          <input className={styles.input} placeholder='Last Name' name="lname"></input>
        </div>
        <div className={styles.rowthree}>
          <input className={styles.input} placeholder='Username' name="username"></input>
        </div>
        <div className={styles.rowfour}>
          <input className={styles.input} placeholder='Email' name="email"></input>
        </div>
        <div className={styles.rowfive}>
          <input className={styles.input} placeholder='Password' type="password" name="password"></input>
        </div>
        <div className={styles.submit_button}><input className={styles.input_button}type='Submit' value='Submit'></input></div>
      </form>
      </div>
      <br/> 
      <Link href='/' ><a className={styles.link}>Return to Log In Page</a></Link>

    </div>
)



Home.propTypes = propTypes;



export default Home
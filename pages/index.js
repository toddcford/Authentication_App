import PropTypes from 'prop-types';
import styles from '../styles/Home.module.css'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'

const propTypes = {
  user: PropTypes.shape({
    displayName: PropTypes.string,
  }),
};

const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
  },
});

const Home = () => {
  const classes = useStyles();
  return (
  
    <div className={styles.wrapper}>
      <h2 className={styles.title}> Hello! Please Enter Your Information:</h2>
      <div className={styles.form_wrapper}>
      <form className={styles.form} action="/user/login" method="POST">
        <div className={styles.rowthree}>
          <input className={styles.input} placeholder='Email' name="email"></input>
        </div>
        <div className={styles.rowfour}>
          <input className={styles.input} placeholder='Password' type="password" name="password"></input>
        </div>
        <div className={styles.submit_button}><input className={styles.input_button}type='Submit' value='Log In'></input></div>
      </form>
      </div>
      <div className={styles.new_user}>
        <p className={styles.new_user_prompt}> New User? </p>
        <Button href={'/create_account'} className={classes.root}>Create an Account </Button>
      </div>
    </div>
  )
}

Home.propTypes = propTypes;

export default Home
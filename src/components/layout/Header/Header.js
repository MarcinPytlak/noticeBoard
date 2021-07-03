import React, {useState} from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './Header.module.scss';

const Component = ({className, children}) => {
  const [isLogged] = useState(false);
  const notLogged = (
    <div >
      <h2>Welcome to the notice board application !</h2>

      <p>W celu używania tej strony, bardzo proszę o autoryzację</p>
      <a className={`${styles.loginButton} ${styles.loginButtonGoogle}`}  href={'/'}>Login with Google</a>
      {/* {children} */}
    </div>
  );

  const logged = (
    <div className={styles.topnav}>
      <a href="/post/add">My advertisements</a>
      <a className={`${styles.loginButton} ${styles.loginButtonGoogle}`} href="/">Log out</a>
    </div>
  );

  return (
    <>
      <div className={clsx(className, styles.root)}>
        {isLogged ? logged : notLogged}
      </div>
      
    </>
    
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

// const mapStateToProps = state => ({
//   someProp: reduxSelector(state),
// });

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

// const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Component as Header,
  // Container as Header,
  Component as HeaderComponent,
};

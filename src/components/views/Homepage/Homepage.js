import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';
import { connect } from 'react-redux';
import { getAll, fetchPublished } from '../../../redux/postsRedux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './Homepage.module.scss';

class Component extends React.Component {
  componentDidMount() {
    const { fetchPublishedPosts } = this.props;
    //fetchPublishedPosts();
  }
  render() {
    const {className, posts} = this.props;

    return (
      <div className={clsx(className, styles.root)}>
        <h2>Homepage</h2>
        <table className={styles.advTable}>
          <thead>
            <tr className={styles.header}>Lista ogłoszeń:
            </tr>
          </thead>
          <tbody>
            {posts.map(post => 
              <tr key={post.id} className={styles.titles}><a href={`{/posts/${post._id}`}>{post.title}</a></tr>)}
          </tbody>
        </table>
        <button className={styles.addAdv} type={'submit'}><a  href={'api/posts/add'}>Add new advertisement</a></button>
      </div>
    );
  }
}


Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  posts: PropTypes.any,
  fetchPublishedPosts: PropTypes.func,
};

const mapStateToProps = state => ({
  posts: getAll(state),
});

const mapDispatchToProps = dispatch => ({
  fetchPublishedPosts: () => dispatch(fetchPublished()),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as Homepage,
  Container as Homepage,
  Component as HomepageComponent,
};

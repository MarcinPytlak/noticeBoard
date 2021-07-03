/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Card, CardText, CardImg, CardBody, CardLink,
  CardTitle, CardSubtitle,
} from 'reactstrap';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { fetchGetPost, getPost } from '../../../redux/postsRedux';

import styles from './Post.module.scss';

class Component extends React.Component {

  componentDidMount() {
    const {getOnePost} = this.props;
    //getOnePost();
    console.log(this.props);
  }

  render() {
    const {className, post} = this.props;
    console.log(post);

    return(
      <div className={clsx(className, styles.root)}>
        <h1>Witaj na stronie posta {post.title}</h1>
        <Card>
          <CardImg top width="100%" src={post.image}></CardImg>
          <CardBody>
            <CardTitle tag="h5">{post.title}</CardTitle>
            <CardSubtitle tag="h6" className="mb-2 text-muted">Publish date: {post.publishDate}</CardSubtitle>
            <CardText>{post.content}</CardText>
          </CardBody>
        </Card>
      </div>
    );
  }
}

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  title: PropTypes.string,
  getOnePost : PropTypes.func,
};

const mapStateToProps = state => ({
  post: getPost(state),
});

const mapDispatchToProps = (dispatch, props) => ({
  getOnePost: () => dispatch(fetchGetPost(props.match.params.id)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  //Component as Post,
  Container as Post,
  Component as PostComponent,
};

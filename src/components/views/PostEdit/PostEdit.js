import React from 'react';
import PropTypes from 'prop-types';
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import clsx from 'clsx';

import { connect } from 'react-redux';
import { getSinglePost, editSinglePost } from '../../../redux/postsRedux';

import styles from './PostEdit.module.scss';

class Component extends React.Component {

  state = {
    post: {
      id: this.props.postById.id,
      title: this.props.postById.title,
      email: this.props.postById.email,
      publishDate : this.props.postById.publishDate,
      editDate : this.props.postById.editDate,
      status: 'published',
      content: this.props.postById.content,
      picture: this.props.postById.picture,
      price: this.props.postById.price,
      phone: this.props.postById.phone,
      localisation: this.props.postById.localisation,
      
    },
  };

  handleChange = (event) => {
    const {post} = this.state;

    this.setState({ post: { ...post, [event.target.name]: event.target.value } });
  };

  handleAddImage = (image) => {
    const {post} = this.state;

    if(image) {
      this.setState({ post: { ...post, [post.image]: image[0]}});
    } else {
      this.setState({ post: { ...post, image: null}});
    }
  };

  submitForm = (event) => {
    event.preventDefault();
    const {post} = this.state;
    const {editSinglePost} = this.props;

    post.editDate = new Date().toISOString();
    editSinglePost(post);
  }

  render() {
    const {className, postById} = this.props;
    const {post} = this.state;
    console.log(post);

    return (
      <div className={clsx(className, styles.root)}>
        <h2>Edit your post</h2>
        <div className={styles.formContainer}>
          <Form className={styles.form} onSubmit={this.submitForm}>
            <FormGroup row>
              <Label sm={2}>Title</Label>
              <Col sm={10}>
                <Input type="text" defaultValue={postById.title} name="title" label="title" placeholder="Enter your name" required minLength={10} onChange={this.handleChange}></Input>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={2}>Email</Label>
              <Col sm={10}>
                <Input type="email" defaultValue={postById.email} name="email" placeholder="Enter your email" required onChange={this.handleChange}></Input>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={2}>Your advertisement text:</Label>
              <Col sm={10}>
                <Input type="textarea" defaultValue={postById.content} name="content" placeholder="Your advertisement..." required minLength={20} onChange={this.handleChange}></Input>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="exampleFile" sm={2} onChange={this.handleAddImage}>Photo</Label>
              <Col sm={10}>
                <Input type="file" value={postById.picture} name="picture" id="exampleFile" />
                <FormText color="muted">
                </FormText>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={2}>Price:</Label>
              <Col sm={10}>
                <Input type="number" value={postById.price} name="price" placeholder="Price (if it's necessary)" min={0} onChange={this.handleChange}></Input>
              </Col>
            </FormGroup>
            <FormGroup row className="position-relative">
              <Label sm={2}>Phone number</Label>
              <Col sm={10}>
                <Input valid type="text" name="phone" placeholder="Enter your phone number" maxLength={9} onChange={this.handleChange}/>
                <FormText>Remember to use format : 123456789 !!</FormText>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={2}>Enter you localization</Label>
              <Col sm={10}>
                <Input type="text" name="localisation" placeholder="Enter your localization" onChange={this.handleChange}></Input>
              </Col>
            </FormGroup>
            <Button className={styles.submitBtn} type="submit">Save your changes</Button>
          </Form>
        </div>
        {/* <form>
      <ul>
        <li><label>Author:</label></li>
        <li><input type={'text'} minLength={10} placeholder={'Enter author'} required></input> </li>
        <li><label>Your advertisement text:</label>Your advertisement text:</li>
        <li><textarea id={'msg'} required></textarea> </li>
        <li><label>Your Email:</label></li>
        <li><input type={'email'} required placeholder={'Enter your email'}></input></li>
        <li><label>Choose status of your advertisement</label></li>
        <li><input type="radio" id="html" name="fav_language" value="HTML"></input></li>
        <li><label for="html">HTML</label></li>
      </ul>
    </form> */}
      </div>
    );
  }

}

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  postById: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string,
    email: PropTypes.string,
    publishDate: PropTypes.string,
    editDate: PropTypes.string,
    status: PropTypes.string,
    picture: PropTypes.string,
    price: PropTypes.string,
    phone: PropTypes.string,
    localisation: PropTypes.string,
  }),
  editSinglePost: PropTypes.func,
};

const mapStateToProps = (state, props) => ({
  postById: getSinglePost(state, props.match.params.id),
});

const mapDispatchToProps = dispatch => ({
  editSinglePost: (post) => dispatch(editSinglePost(post)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  //Component as PostEdit,
  Container as PostEdit,
  Component as PostEditComponent,
};

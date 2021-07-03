import React from 'react';
import PropTypes from 'prop-types';
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import clsx from 'clsx';
import { v4 as uuidv4 } from 'uuid';

import { connect } from 'react-redux';
import { getAll, addPost } from '../../../redux/postsRedux';

import styles from './PostAdd.module.scss';

class Component extends React.Component {
  
  state = {
    post: {
      id: '',
      title: '',
      email:'',
      publishDate : '',
      editDate : '',
      status: 'published',
      content: '',
      picture: '',
      price: '',
      phone: '',
      localisation: '',
      
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
  }

  submitForm = (event) => {
    event.preventDefault();
    const {post} = this.state;
    const {addPost} = this.props;
    post.id = uuidv4();
    post.publishDate = new Date().toISOString();
    post.editDate = post.created;

    this.setState({
      post : {
        id: '',
        title: '',
        email: '',
        publishDate : '',
        editDate : '',
        status: 'published',
        content: '',
        picture: '',
        price: '',
        phone: '',
        localisation: '',
      },
    });
    addPost(post);
  }
  render() {
    const { className} = this.props;

    return (
      <div className={clsx(className, styles.root)}>
        <h2>PostAdd</h2>
        <div className={styles.formContainer}>
          <Form className={styles.form} onSubmit={this.submitForm}>
            <FormGroup row>
              <Label sm={2}>Title</Label>
              <Col sm={10}>
                <Input type="text" name="title" label="title" placeholder="Enter your name" required minLength={10} onChange={this.handleChange}></Input>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={2}>Email</Label>
              <Col sm={10}>
                <Input type="email" name="email" placeholder="Enter your email" required onChange={this.handleChange}></Input>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={2}>Your advertisement text:</Label>
              <Col sm={10}>
                <Input type="textarea" name="content" placeholder="Your advertisement..." required minLength={20} onChange={this.handleChange}></Input>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="exampleFile" sm={2} onChange={this.handleAddImage}>Photo</Label>
              <Col sm={10}>
                <Input type="file" name="picture" id="exampleFile" />
                <FormText color="muted">
                </FormText>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={2}>Price:</Label>
              <Col sm={10}>
                <Input type="number" name="price" placeholder="Price (if it's necessary)" min={0} onChange={this.handleChange}></Input>
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
            <Button className={styles.submitBtn} type="submit">Submit</Button>
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
  addPost : PropTypes.func,
};

const mapStateToProps = state => ({
  postsAll: getAll(state),
});

const mapDispatchToProps = dispatch => ({
  addPost: post => dispatch(addPost(post)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  //Component as PostAdd,
  Container as PostAdd,
  Component as PostAddComponent,
};

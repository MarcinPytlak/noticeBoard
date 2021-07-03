import React from 'react';
import { shallow } from 'enzyme';
import { PostEditComponent } from './PostEdit';

describe('Component PostEdit', () => {
  it('should render without crashing', () => {
    const post = {
      id: '1',
      title: 'CośTam',
      content: 'Sprzedam opla. Cudownie się prowadzi',
      email: 'mp@o2.pl',
      publishDate: '2021.06.30',
      editDate: '2021.06.30',
      status: 'published',
      picture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Boreas_orithya.jpg/1200px-Boreas_orithya.jpg',
      price: '21',
      phone: '648951347',
      localisation: 'Warszawa',
    };
    const component = shallow(<PostEditComponent postById={post}/>);
    expect(component).toBeTruthy();
  });
});

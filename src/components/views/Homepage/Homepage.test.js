import React from 'react';
import { shallow } from 'enzyme';
import { HomepageComponent } from './Homepage';

describe('Component Homepage', () => {
  it('should render without crashing', () => {
    const post = [
      { id: 'advertisement1', 
        title: 'Sprzedam prawie nieużywane BMW.',
        content: ' Na sprzedaż używane BMW, niemec płakał jak oddawał',
        publishDate : '2021-06-19',
        editDate : '',
        email: 'jankowalski@o2.pl',
        status: '',
        picture : '',
        price: '',
        phone: '',
        localisation: ''},
      { id: 'advertisement2', 
        title: 'Sprzedam królika',
        content: ' Na sprzedaż używany królik',
        publishDate : '2021-06-19',
        editDate : '',
        email: 'jankowalski@o2.pl',
        status: '',
        picture : '',
        price: '',
        phone: '',
        localisation: ''},
    ];
    const component = shallow(<HomepageComponent posts={post} />);
    expect(component).toBeTruthy();
  });
});

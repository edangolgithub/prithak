import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <Container>
      <Row>
        <Col>
          <h1>Welcome to my website</h1>
          <p>This is the home page of our website.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec convallis, mi a ultricies dapibus, turpis libero consectetur ante, nec convallis elit nunc eget nisi. Integer tincidunt auctor nisl, nec ultricies lectus mollis vel. Vivamus tincidunt lectus id vehicula.</p>
          <p>Quisque sed ex id erat pellentesque accumsan. Donec nec eleifend lectus, nec consectetur turpis. Proin auctor metus et enim efficitur, nec placerat mauris faucibus. Phasellus et risus eu purus ullamcorper gravida. Nullam rutrum consectetur tempor.</p>
          <p>Etiam non risus elit. Donec auctor lacus nec mi vehicula, id accumsan velit commodo. Fusce ultricies vehicula risus, ut hendrerit lacus malesuada in. Sed vehicula mauris a ex consequat, eu eleifend metus eleifend. Proin finibus arcu eget velit consectetur, nec laoreet dui cursus.</p>
          <p>Nam faucibus ipsum non augue bibendum, eget vestibulum tortor placerat. Sed pretium fermentum efficitur. Nam ac leo eu purus ultricies faucibus. Vestibulum malesuada nisl sed fringilla vestibulum. In sed erat vitae purus viverra vehicula.</p>
          <p>Suspendisse potenti. Morbi sed nunc magna. Nunc in turpis nec lectus blandit ultricies vel vel lorem. Donec posuere odio nec purus tincidunt tincidunt. Fusce nec arcu nec sem rutrum cursus.</p>
          <p>Phasellus dictum auctor ipsum, nec luctus libero rhoncus sed. Suspendisse sit amet fermentum turpis, nec ultricies justo. Donec non enim bibendum, ultrices lorem non, sagittis neque.</p>
          <Link to="/about">
            <Button variant="primary">Learn more</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;

import React from 'react';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';

import TNlogo from './assets/telangananijam.jpg';
import SDlogo from './assets/splitdeals.png';
import Mlogo from './assets/meebazaar.jpg';
import ATlogo from './assets/atumlife.jpg';
import Glogo from './assets/gifteria.png';
import Llogo from './assets/linview.jpg';
import Plogo from './assets/plugxr.jpg';

const Projects = () => {
  const pdata = [
    {name: 'Telangana Nijam', skills: ['React JS', 'Deploy - Azure'], desc: 'Single page Digital newspaper which covers news mostly telangana state.', domain: 'news portal', color: 'info', img: TNlogo},
    {name: 'ATUM Life', skills: ['React JS', 'React Native', 'PayTM Gateway', 'Firebase'], desc: 'Eccomerce platform for reusable and organic products, ev bikes, solar panels.', domain: 'eccomerce', color: 'success', img: ATlogo},
    {name: 'PlugXR Creator', skills: ['React JS', 'React Class', 'React Hooks', 'Three JS', "AR/VR"], desc: 'Platform for create, edit & deploy experience which are seen in AR, VR.', domain: 'saas', color: 'warning', img: Plogo},
    {name: 'LinView.io', skills: ['React JS', 'React Hooks', 'Kibana', 'ui/ux'], desc: 'Platform for storage allocation for user using nodes and storage pools.', domain: 'saas', color: 'warning', img: Llogo},
    {name: 'Split Deals', skills: ['React JS', 'React Class', 'axios', 'Deploy - GooDaddy'], desc: 'Platform for coupons, deals for offline stores as per user location.', domain: 'eccomerce/social', color: 'primary', img: SDlogo},
    {name: 'Mee Baazar', skills: ['React JS', 'React Native', 'React Class', 'Chart JS', 'Google Maps'], desc: 'Eccomerce platform for daily products, electronics which is similar to bigBasket.', domain: 'eccomerce', color: 'success', img: Mlogo},
    {name: 'Gifteria', skills: ['React JS', 'React Class', 'axios'], desc: 'Eccomerce platform for gifts like special occasions, surprise party items, etc.', domain: 'eccomerce', color: 'success', img: Glogo},
  ];

  return (
    <div>  

      <title>Projects .</title>    
      <Container>
        <Row style={{justifyContent: 'center'}}>
          {pdata.map((itm) => <Col xs={12} sm={6} md={4} key={itm.name} style={{marginTop: '2vh'}}>
            <Card data-bs-theme="dark" border={itm.color} style={{background: 'transparent'}}>
              <Card.Body>
                <Card.Title style={{textAlign: 'center', fontSize: '30px'}}>{itm.name}</Card.Title>
                
                <Card.Subtitle className="mb-2 text-muted">
                  <Button variant={`outline-${itm.color}`} size="lg" style={{border: '0px solid', padding: 0}}>{itm.domain}</Button>
                </Card.Subtitle>
                
                <Card.Text> {itm.desc} </Card.Text>

                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                  <Card.Link href="#" style={{textDecorationLine: 'none'}}>Live/Demo</Card.Link>

                  <Card.Link href="#" style={{textDecorationLine: 'none'}}>More Info</Card.Link>
                </div>
              </Card.Body>
            </Card>
          </Col>)}
        </Row>
      </Container>
    </div>
  );
};

export default Projects;
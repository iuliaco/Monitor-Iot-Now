import React, { Component } from 'react';
import { Card } from 'antd';
import { Row, Col } from 'antd';
import { Avatar,Icon } from 'antd';

const { Meta } = Card;


class Services extends Component {

    render() {
        return (
    <>
  <Row className="titl" style={{flex:"0.75 1 auto"}}> 
       <h2 style={{fontSize:"11vmin"}}>Serviciile noastre</h2> 
   </Row>
<Row style={{flex:"3.5 1 auto"}}>
<Col xs={{ span: 24  }} md={{span:24}} lg={{ span: 6 }}>{/* <h1>TEST TESTY</h1> */}
<Card
    
    style={{borderRadius:'11px', border:'none'}}
    cover={      <Avatar size={100} icon="cloud" />
}
  >
  <Meta
      title="Colectare de date" style={{paddingBottom: '8%'}}
    />
  Colectare simpla a datelor prin intermediul protocoalelor http care stau la baza internetului de la placuta ta Arduino/NodeMcu/alta marca.
  </Card>

</Col> 
 <Col xs={{ span: 24  }} md={{span:24}} lg={{ span: 6 }}>{/* <h1>TEST TESTY</h1> */}
 <Card
  
 style={{borderRadius:'11px', border:'none'}}
 cover={  <Avatar size={100} icon="line-chart" />}
>
<Meta
      title="Procesare si vizualizare a datelor" style={{paddingBottom: '8%'}}
    />
Salvare a datelor primite si afisate vizual printr-un grafic liniar.
</Card>

</Col>
<Col xs={{ span: 24  }} md={{span:24}}  lg={{ span: 6}}>{/* <h1>TEST TESTY</h1> */}
 <Card
  
 style={{borderRadius:'11px' , border:'none'}}
 cover={  <Avatar size={100} icon="safety" />}
>
<Meta
      title="Siguranta datelor " style={{paddingBottom: '8%'}}
    />
Criptarea parolelor, respectiv masuri de securitate astfel incat graficul dumneavoastra sa nu poata fi accesat si de altii.
</Card>

</Col>
<Col xs={{ span: 24  }} md={{span:24}}  lg={{ span: 6 }}>{/* <h1>TEST TESTY</h1> */}
 <Card
  
 style={{borderRadius:'11px', border:'none'}}
 cover={  <Avatar size={100} icon="profile" />}
>
<Meta
      title="Construire real-time a graficelor" style={{paddingBottom: '8%'}}
    />
    Prin folosirea socketurilor de internet tabelul dumneavoastra se va actualiza in timp real.
</Card>

</Col>
</Row>
</>

        );};}
export default Services;

import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Typography } from 'antd';
import { Layout } from 'antd';
import { Row, Col } from 'antd';
import { addPoint, sendPoint } from './socket';
import { NavLink } from 'react-router-dom';
const { Text } = Typography;

const {Line} = require("react-chartjs-2")


const { Header, Footer, Sider, Content } = Layout;


class Tabel extends React.Component {
constructor(props) {
    super(props);

    this.state= {
      visible:false,
       datas:{
        labels:[...this.props.data.value2],
        datasets:[
          {
            label:this.props.data.value1_name,
            data:[...this.props.data.value1],
            borderDash:[5,5]
          }
        ]
    
      }

    }
   
    addPoint((err, format) => {console.log(format);
      if(this.props.data._id==format.id){console.log("tabelul e in pagina asta");
      this.setState({ datas: { ...this.state.datas, labels:[...this.state.datas.labels,format.value2],
        datasets:[{
          ...this.state.datas.datasets[0], data:[...this.state.datas.datasets[0].data,format.value1]

        }]
    } });

    }});


}
 
sshow = () => {
  if(this.state.visible==false){
this.setState({ visible: true });

  }
  else{
    this.setState({ visible: false });


  }
}

  componentDidMount() {
    console.log(this.props);
    console.log(this.state);

}

render() {
  console.log(this.props);

 
  console.log(this.state.datas);
  const options = {
    responsive: true,
    title: {
      display: false,
      text: this.props.data.title
    },
    tooltips: {
      mode: 'label'
    },
    hover: {
      mode: 'dataset'
    },
    scales: {
      xAxes: [
        {
          display: true,
          scaleLabel: {
            show: true,
            labelString: 'Month'
          }
        }
      ],
      yAxes: [
        {
          display: true,
          scaleLabel: {
            show: true,
            labelString: 'Value'
          },
          ticks: {
            suggestedMin: Math.min(...this.props.data.value1),
            suggestedMax: Math.max(...this.props.data.value1)
          }
        }
      ]
    }
  }
  function randomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  
  for (let dataset of this.state.datas.datasets) {
    dataset.borderColor = randomColor()
    dataset.backgroundColor = randomColor()
    dataset.pointBorderColor = randomColor()
    dataset.pointBackgroundColor = randomColor()
    dataset.pointBorderWidth = 1
  }

    return (
    <div>
         <NavLink to={`/${this.props.data._id}`}> <h2>{this.props.data.title}</h2>  </ NavLink>
          <Line data={this.state.datas} options={options}/>
          <Button type="primary" onClick={this.sshow}>
          Adauga puncte pe acest grafic
        </Button > 
        <br/>
        <Text code className={this.state.visible?'visible':'notvisible'}>Adauga o cerere PUT catre iulia.rms-it.ro:8080/codul_de_securitate/{this.props.data._id}</Text>
 
    </div>)}
  }


export default Tabel;
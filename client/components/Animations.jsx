import React from 'react';
import { Tween, Timeline, Controls } from 'react-gsap';
 
export const TweenComponent = () => (
  <Controls>
  <Tween duration={4} from={{ x: '500px', y:'300px', rotation: -360 , color:'blue'}}>
    <div>This element gets tweened</div>
  </Tween>
  </Controls>
);
export const TimelineComponent = () => (

    <Timeline
      target={
          <div className="containerspecial">
        <h1>
        <span className="title" style={{color:"#DCC7BE", fontSize:'250%'}}>MONITOR</span>
        <span className="title" style={{color:"#DCC7BE", fontSize:'250%'}}>I(O)T</span>
        <span className="title" style={{color:"#DCC7BE", fontSize:'250%'}}>NOW</span>
      </h1>   </div>   }
    >
      <Tween from={{ opacity: -1, marginTop: '8%'}}    
       to={{ opacity: 1, marginTop: 0}} 
       duration={5} 	
       ease={Elastic.easeOut} 
       delay={2}/>
    </Timeline>

  );
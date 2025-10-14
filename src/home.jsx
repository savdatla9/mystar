// import Homescene from './components/home_3d';
// import Squares from './components/squareBack';
import Galaxy from "./components/galaxyBack";

const Home = () => {
    return (
        <div>
            <title>Welcome </title>

            <h1 style={{fontSize: '40px', textAlign:'center'}}>Hi there, Myself <br/> .Sai Akhil Varma Datla. </h1>
            
            <br/>
            
            <ul style={{fontSize: '21px', width: '95%', marginLeft: '2.5%'}}> 
                <li>I'm <b>React JS Web</b> Developer mostly. But worked on React Native Mobile, Three JS Web, Node JS - Rest API's as well.</li>
                
                <li>Learning Unity AR Course with <strong>C&nbsp;#</strong> language, UnReal Engine with only no-coding & Next JS Framework.</li> 

                <li>I completed my B.&nbsp;Tech in Computer Science and Engineering at B.V. Raju Institute of Technology, Narsapur 2014-2018.</li> 
                
                <li>I'm a <b>Tech Enthusiast</b> and very arge to learn about new things or features of it.</li>
                {/* <li>Certified in Three Js course in Three JS journey.</li> */}
            </ul>

            {/* <p></p> */}

            <div style={{position: 'fixed', top: 0, height: '100vh', width: '100%', zIndex: -1}}>
                {/* <Squares 
                    speed={0.25} 
                    squareSize={25}
                    direction='diagonal' // up, down, left, right, diagonal
                    borderColor='#7cfc00'
                    hoverFillColor='#dcdcdc'
                /> */}

                <Galaxy 
                    mouseRepulsion={true}
                    mouseInteraction={true}
                    density={1.5}
                    glowIntensity={0.5}
                    saturation={0.5}
                    hueShift={240}
                />
            </div>
        </div>
    );
};

export default Home;
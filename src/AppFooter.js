
export default function AppFooter(props) {
let p1="https://infozauk.com/wp-content/uploads/2017/07/1.jpg"  ;
let p2="https://avatars.mds.yandex.net/get-zen_doc/224467/pub_5d77909d3642b600adc975c0_5d7790d55d636200ade9e86d/scale_1200";  
let p3="https://i.archi.ru/i/302118.jpg" ;
return( 
          <div style={{margin: "0 auto"}}>
          <h2>Departure {props.name}</h2>
          <img style={{height:'500px' , width:'100%'}}src={p1}/>
          </div>
      );
}
    
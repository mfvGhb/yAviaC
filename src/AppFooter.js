
export default function AppFooter(props) {

let picFooter= Math.floor(Math.random() * (2 - 1 + 1) + 1) > 1 ? 'dep_arr_footer.jpg' : 'dep_arr_footer1.jpg'    
let p1="https://www.expat-news.com/wp-content/uploads/2017/05/Transit_Flughafen_Fotolia_75114135.jpg"  ;
let p2="https://billigefluge.files.wordpress.com/2017/09/fluge-schweiz-nach-malaga.jpg";  
let p3="https://i.archi.ru/i/302118.jpg" ;
return( 
          <div style={{margin: "0 auto"}}>
          <h2>Departure {props.name}</h2>
          <img style={{height:'500px' , width:'100%'}}src={picFooter}/>
          </div>
      );
}
    
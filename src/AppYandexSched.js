export default function AppYandexSched(props) {

const mapYandexSched= props.schedule.map( 
(itemArrMap,index)=>(<div className="card" key={index}>
                         <div className="headCard">
                              {itemArrMap.nn}.  
                              <h1>{itemArrMap.arr_cityFromEng} - {itemArrMap.arr_cityNameEng}&ensp;	 
                              ({itemArrMap.thread.number})</h1>
                              {/*{itemArrMap.thread.title}<br/>*/}
                              <h3>{itemArrMap.departure}{' '}{itemArrMap.arrival}&ensp;(terminal:{itemArrMap.terminal})</h3>
                              <h3>{itemArrMap.thread.carrier.title}&ensp;{itemArrMap.thread.vehicle}</h3>
                         </div>
                         <img className="cityPhoto" src={itemArrMap.arr_cityPhoto}/>
                         <img className="cityPhoto" src={itemArrMap.vehiclePhoto}/>
</div>)
);
     
return(
        <div>
           {/*<h3>"AppYandexSched" component is here!!</h3>*/}
           {mapYandexSched}
        </div>
      )   
}
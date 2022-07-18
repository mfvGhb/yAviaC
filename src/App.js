
import "./styles.css";
import { useState , useContext} from "react";
import { objStrApi } from "./StoreConst";
import AppMap ,{} from "./AppMap";
import AppFooter  from "./AppFooter";
import AppYandexSched  from "./AppYandexSched";
import getFetchYa  from "./storeFunc";
import AppWait  from "./AppWait";
//..................................................................
export default function App() {

//let cityArr=Object.entries(objStrApi.city).map(item =>item);  
let [objIsRender,setObjIsRender]=useState({listCity:false});
let [isVisible,setIsVisible]=useState("visible");
let [input, setInput] = useState("");
let [arrComponents, setArrComponents]=useState([AppFooter({name:"/Arrival"})]) ;
//let [arrDep, setArrdep] = useState(['arrdep','arrdep1' ]);
let [objDepArr, setObjDepArr] = useState({classDeparture:'activeI' , classArrival:'noactiveI', dep_arr:'departure' });

//.............................................................fetch:getArrDataRes............................
let  getArrDataRes= async ()=>{
     //if (arrSelect.length !==1 || !objDepArr.dep_arr)
     console.log(objDepArr) ;
     let paramCity=input.slice(input.indexOf('(')+1,input.indexOf(')'));
     let dt=new Date().toISOString().slice(0, 10);
     let strParam=`&date=${dt}&station=${paramCity}&event=${objDepArr.dep_arr}` ;
     if (!paramCity || !objDepArr.dep_arr || arrSelect.length !==1  ) {alert(strParam+''+arrSelect.length) ; return ;}

     setArrComponents([AppWait()]) ;
     let objData= await getFetchYa( strParam   ) ;
     console.log('objData', objData);
     if (objData) { 
        let objData1={schedule:objData} ;
        setArrComponents([<AppYandexSched {...objData1}/> , AppFooter({name:"End"})     ]) ;  
        //setArrComponents([AppYandexSched(objData.schedule),AppFooter({name:"Конец"})]) ;
     } 
} //............................................end of getArrDataRes.......................
//.............................. input ....................................................
let vRenderChage1=()=>{ };
let [arrSelect  , setArrSelect]=useState([]);
//{ar.map( (item,index)=> <div key={index}> {item} </div> )}
//........................... выбор из списка ...................................................
let fChooseCity=(p)=>{
                      setInput(p); setArrSelect([p]); 
                      setObjIsRender({listCity:false});
                      console.log('88=>',new Date().toLocaleString(),arrSelect);
};
//.........................................................................................................
let findCityArr=(strInputCity)=>{
                if (strInputCity.length >2){ 
                   let r=cityArr.filter(item =>item[1].includes(strInputCity));
                   if (r.length){
                      let r1=r.map(item=>item[1]+' ('+item[0]+')');
                      setArrSelect(r1); 
                      //
                      setObjIsRender({listCity:true})
                      console.log('*>',r1 ,new Date().toLocaleString() ); 
                   }
}} 
//..........................................................input city list.....................
let findCityArrApi= async (strInputCity)=>{
let strFetchCityArr="https://autocomplete.travelpayouts.com/places2?locale=en&types[]=airport&types[]=city&term="+strInputCity ;    
if (strInputCity.length >2){
   let r=await fetch(strFetchCityArr);
   if (r.ok){
      let arrCityList=await r.json();
      if (arrCityList.length){
         let r1=arrCityList.map(item=>item.name+ '('+item.code+')');
         setArrSelect(r1); 
         //
         setObjIsRender({listCity:true});
         console.log('******>',r1 ,new Date().toLocaleString() ); 
      }   
   }   
}
if (strInputCity.length <=2){
   setArrSelect([]);
   setObjIsRender({listCity:false})
}
}                      
//.......................................................................................
return (
<div>
    <div className="heads" >
         <div style={{display:'inline-block' }}>
              <div className={objDepArr.classDeparture} onClick={()=>setObjDepArr({classDeparture:'activeI' , classArrival:'noactiveI', dep_arr:'departure'})}><img src={'dep2.png'} width="100" height="100" align="top"/>Departure</div>
              <div className={objDepArr.classArrival} onClick={()=>setObjDepArr({classDeparture:'noactiveI' , classArrival:'activeI', dep_arr:'arrival' })}><img src={'arr2.png'} width="100" height="100" align="top"/>Arrival</div>
              <br/><br/>
              <label><h3 style={{color:'white'}} >Airport:</h3></label>
              <input style={{height:'62px',width:'640px',borderRadius:'7px',fontSize:'20px'  }}
                     value={input} onInput={ (e) =>{ setInput(e.target.value) ; findCityArrApi(e.target.value)} }/>
              <button style={{width:'210px' , height:'69px' ,borderRadius: '7px', verticalAlign:'top'  }} onClick={getArrDataRes}>Find</button> 
              { 
                objIsRender.listCity &&
                <div className="dropList">
                    {arrSelect.map( (item,index)=><div className="hov" key={index} onClick={()=>fChooseCity(item)}>{item}</div> )}
                </div>
              }     
         </div>
    </div>
    <br/><br/>
    {/*<h1>Hello CodeSandbox</h1> <p>{objStrApi.Yandex}</p>*/}
     <div className="appMapData">
          {arrComponents.map( (item,index)=> <div key={index}> {item} </div> )}
     </div>
     {/* {[ arrComponents          ]}   */}
</div>
);

}

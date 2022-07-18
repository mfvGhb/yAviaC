import { objStrApi } from "./StoreConst";

export default async function getFetchYa(strParameters) {
  alert(strParameters) ;    
  console.clear();
  let res = await fetch(objStrApi.cors+objStrApi.Yandex+strParameters);
  if (res.ok){
     console.log('fetch= ',res);
     let r=await res.json();
     let arrData=r.schedule ;
     arrData.forEach((item,i)=>{
                                item.arr_cityPhoto=objStrApi.arr_cityPhotoBased; // empty pict city
                                item.vehiclePhoto=objStrApi.vehiclePhotoBased; // empty pict vehicle
                                item.nn=i ;
                                item.arr_cityFrom=item.thread.title.split("—")[0];
                                item.arr_cityName=item.thread.title.split("—")[1];
                                item.arr_cityFromEng=objStrApi.town[item.arr_cityFrom.trim()] ?
                                                     objStrApi.town[item.arr_cityFrom.trim()] : item.arr_cityFrom.trim();
                                item.arr_cityNameEng=objStrApi.town[item.arr_cityName.trim()] ? 
                                                     objStrApi.town[item.arr_cityName.trim()] : item.arr_cityName.trim(); 
                               }) ; 
     console.log('arrData=' ,arrData, new Date().toLocaleString());
   
     //..............Yandex airplanes
// pixabay......................................find city.......................
     console.log('1>' ,new Date().toLocaleString());
     let fetchesCity = []; let fetchesVehicle = [];
     for (let i=0 ; i < arrData.length ; i++){ 
          let findCityName=strParameters.split('=')[3]=='departure' ? arrData[i].arr_cityNameEng : arrData[i].arr_cityFromEng;
          let findCity= (findCityName) ? findCityName  : arrData[i].arr_cityName ;
          fetchesCity.push(fetch(objStrApi.pixabay+findCity) 
                          .then(res =>res.json())
                          .then(res=>(res.hits.length>0) ? 
                                      res.hits[Math.floor(Math.random()* (res.hits.length>20 ? 20 : res.hits.length))].webformatURL
                                      :objStrApi.arr_cityPhotoBased)
                          .catch((status, err , i) => console.log(status, err ,i))
                          )    //largeImageURL  'name' in hero; 
     } 
     //.................................... find plane....................................................................  
     let atemp=[] ; 
     for (let i=0 ; i < arrData.length ; i++){ 
          atemp.push(arrData[i].thread.vehicle + ' '+ arrData[i].thread.carrier.title);
          for (let kk=0 ; kk < 10001 ; kk++);
          fetchesVehicle.push(fetch(objStrApi.flickr + arrData[i].thread.carrier.title+' + '+ arrData[i].thread.vehicle)                                           
                              .then(res =>res.json()) 
                              .then(res=>{
                                          let linkPhoto=objStrApi.vehiclePhotoBased ;
                                          let qP=res.photos.photo.length;
                                          if(qP >0){
                                             let indRand=Math.floor(Math.random()* (qP>10 ? 10 : qP)) ;
                                             let arrPhoto=res.photos.photo[indRand];
                                             linkPhoto="https://live.staticflickr.com/"+
                                                        arrPhoto.server + "/"+ arrPhoto.id +
                                                        "_" + arrPhoto.secret + ".jpg" ;
                                          }
                                          return linkPhoto;
                                         }
                                   ) 
                              .catch((status, err , i) => console.log(status, err ,i))
                             )  
     } 
     let resultsCity    = await Promise.all(fetchesCity);
     let resultsVehicle = await Promise.all(fetchesVehicle);
     
     console.log('resultsCity=',resultsCity) ; console.log('resultsVehicle=',resultsVehicle);
     arrData.forEach( item =>{
                              item.arr_cityPhoto=resultsCity[item.nn]
                              item.vehiclePhoto =resultsVehicle[item.nn] ;
                             });

     console.log('>>>>>' , arrData, new Date().toLocaleString());
  
     return arrData
}
};
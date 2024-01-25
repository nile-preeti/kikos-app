import React, { useEffect,useState ,useRef} from 'react';
import {View,useColorScheme,} from 'react-native';
import {  useSelector, useDispatch } from 'react-redux';
export const baseUrl = 'http://100.21.178.252/api/'


//API END POINT LISTS  

export const register = 'register';
export const login = 'login';
export const verify_otp = 'verify-otp';
export const send_otp = 'send-otp';
export const tour_details =`tour-detail`;
export const callback_request =`callback-request`;
export const get_virtual_tour = 'virtual-tour-listing';
export const virtual_tour_detail = 'virtual-tour-detail';
export const get_tax_booking_list = 'taxi-booking-list';
export const booking_tour = 'booking-tour';
export const change_password = 'change-password';
export const update_profile = 'update-profile';
export const forgotPassword = 'forget-password';
export const calendarEvents = 'calendarEvents';
export const get_book_tour = 'book-tour';
export const home='home';
export const booking_taxi = 'booking-taxi';
export const photo_booth_listing = 'photo-booth-listing';
export const photo_booth_details ='photo-booth-details';

export const verify_otp_res = 'apicontroller/verify_otp_res'
export const facilities = 'apicontroller/facilities'
export const forgotPasswordw = 'apicontroller/forgotPassword'
export const country = 'country'
export const state = 'state'
export const city = 'city'
export const profile='profile'
export const update_profile2='update-profile'



export const requestPostApi = async (endPoint,body,method,token) => 
{
  console.log('the token is :-',token)
  var header = {}
  if(token!='' && token!=undefined)
  {
    header = {'Content-Type': 'multipart/form-data','Accept':'application/json','Authorization': 'Bearer '+ token,'Cache-Control': 'no-cache'}
  }else{
    header = {'Accept': 'application/x-www-form-urlencoded'}
  }

  var url = baseUrl + endPoint
  console.log('post Request Url:-' + url + '\n')
  console.log(body)
  // console.log(header + '\n')
  try {
      let response = await fetch(url, {
        method: method,
        body:body,
        headers:header,
      }
      )
      let code = await response.status 
       //let responseJ = await response.json();
       console.log('the api responce is',code)
     //  console.log("response.text()",response.text());
      if(code==200){
        let responseJson = await response.json();
        console.log( responseJson)
        return {responseJson:responseJson,err:null}
      }else if(code == 400 || code == 402 ) ////|| code == 404
      {
        let responseJson = await response.json();
        //Completion block 
        return {responseJson:null,err:responseJson.message}
      }else{
          // let responson = await response.json();
          // console.log(responson)
        return {responseJson:null,err:'Something went wrong!'}
      }
    } catch (error) {
      console.log('the error is',error)
      return {responseJson:null,err:'Something Went Wrong! Please check your internet connection.'}
   // return {responseJson:null,err:error}
    }
  }

  export const requestGetApi = async (endPoint,body,method,token) => 
{
  console.log('the token is :-',token)
  var header = {}
  var url = baseUrl + endPoint

  if(token!='' && token!=undefined)
  {
    header = {'Content-Type': 'multipart/form-data','Accept':'application/json','Authorization': 'Bearer '+ token,'Cache-Control': 'no-cache'}
  }else{
    header = {}
  }

   //url = url + objToQueryString(body)
  console.log('Request Url:-' + url + '\n')
  try {
      let response = await fetch(url, {
        method: method,
        headers:header,
      }
      )
      let code = await response.status
      console.log(code)   
      if(code==200){
        let responseJson = await response.json();
        // console.log('Code 200==>>',responseJson)
        return {responseJson:responseJson,err:null,code:code}
      }else if(code == 400)
      {
        return {responseJson:null,err:responseJson.message,code:code}

      }else if(code == 500)
      {
        console.log(response)   

        return {responseJson:null,err:'Something Went Wrong',code:code}

      }else{
        console.log(response)   

        return {responseJson:null,err:'Something went wrong!',code:code}
      }
    } catch (error) {
      console.error(error);
      return {responseJson:null,err:'Something Went Wrong! Please check your internet connection.',code:500}
      
    }
  }

  export const requestPostApiMedia = async (endPoint,formData,method,token) => 
{
  var header = {}
 
  if(token!='' && token!=undefined)
  {
    header = {'Content-type': 'multipart/form-data','apitoken':token,'Cache-Control': 'no-cache'
  }
  }else{
    if(endPoint != signUpApi){
      header = { 'Content-type': 'multipart/form-data' , 'Cache-Control': 'no-cache'
    }
  }
  }

  var url = baseUrl + endPoint
  console.log('Request Url:-' + url + '\n')
  console.log(formData + '\n')

  try {
      let response = await fetch(url, {
        method: method,
        body:formData,
        
        headers:header,
       
      }
      )

      let code = await response.status
      console.log(code )   

      if(code==200){
        let responseJson = await response.json();
        console.log( responseJson)
        return {responseJson:responseJson,err:null}
      }else if(code == 400)
      {
        let responseJson = await response.json();
        return {responseJson:null,err:responseJson.message}

      }else{

        return {responseJson:null,err:'Something went wrong!'}
      }
    } catch (error) {
      console.error('the error of the uploade image is ==>>',error);
      return {responseJson:null,err:'Something Went Wrong! Please check your internet connection.'}
      
    }
  }

  export const requestPostApiSignUp = async (endPoint,formData,method) => 
  {
    var url = baseUrl + endPoint
    console.log('Request Url:-' + url + '\n')
    console.log(formData + '\n')
  
    try {
        let response = await fetch(url, {
          method: method,
          body:formData,
        }
        )
  
        let code = await response.status
        console.log(code )   
  
        if(code==200){
          let responseJson = await response.json();
          console.log( responseJson)
          return {responseJson:responseJson,err:null}
        }else if(code == 400 || 402)
        {
          let responseJson = await response.json();
          console.log( responseJson)

          return {responseJson:null,err:responseJson.msg}
  
        }else{
  
          return {responseJson:null,err:'Something went wrong!'}
        }
      } catch (error) {
  
        return {responseJson:null,err:'Something Went Wrong! Please check your internet connection.'}
        console.error(error);
      }
    }  
  
  const objToQueryString=(obj)=> {

    const keyValuePairs = [];
    for (const key in obj) {
      keyValuePairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
    }
    return keyValuePairs.length==0 ? '' :  '?'+  keyValuePairs.join('&');
  }

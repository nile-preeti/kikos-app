import * as types  from '../types';

const initialState = {

    user_details:null,
    saloonDetails:'',
    selecterhairdresser:null,
    selectedService:null,
    token:null,
    service_type:'',
    corp_user:null,
    dashdata:'',
    servicenav:'Men',
    ProfileDetails: null
}


export default (state = initialState ,action) => {

    switch(action.type){

        case types.SAVE_USER_RESULTS :
            let user_details_action = action.user;
            if(user_details_action !== null){
                console.log("user detaisl1111",user_details_action);
                return{
                    ...state ,
                    user_details : {...user_details_action},
                }
            }else{
                console.log("user detais  null ",user_details_action);
                return{
                    ...state ,
                    user_details : null,
                }
            }
            case types.SAVE_USER_PROFILE : 
                return {
                    ...state,
                    ProfileDetails :action.user
                }
            case types.SALOONDETAILS : 
                return {
                    ...state,
                    saloonDetails :action.saloonDetails
                }
                case types.SERVICENAV : 
                return {
                    ...state,
                    servicenav :action.servicenav
                }

                case types.SELECTEDHAIRDRESSER :
                    return {
                        ...state,
                        selecterhairdresser :action.selecterhairdresser
                    }
                    case types.SELECTEDSERVICE :
                        return {
                            ...state,
                            selectedService :action.selectedService
                        }
        case types.LOGOUT_USER :
            return {
                ...state,
                user_details :action.user
            }
        case types.TOKEN :
            return {
                ...state,
                token :action.user
            }
        case types.SERVICETYPE :
            return {
                ...state,
                service_type :action.service_type
            }
        case types.NOOFCAR :
            return {
                ...state,
                no_of_car :action.no_of_car
            }
        case types.NOOFDRV :
            return {
                ...state,
                no_of_drv :action.no_of_drv
            }
         case types.SELECTEDDRVTAB :
            return {
                ...state,
                selected_drv_tab :action.selected_drv_tab
            }
        case types.DASHDATA :
                return {
                    ...state,
                    dashdata :action.dash_data
                }
        case types.SELECTEDCARTAB :
            return {
                ...state,
                selected_car_tab :action.selected_car_tab
            }
            case types.DRVID :
                return {
                    ...state,
                    drv_id :action.drv_id
                }
                case types.VEHICLEID :
                    return {
                        ...state,
                        vehicle_id :action.vehicle_id
                    }
                    case types.SAVE_CORP_USER_RESULTS :
                    return {
                        ...state,
                        corp_user :action.corp_user
                    }

           default :
           return state;
   

    }




}



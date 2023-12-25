import { Fetch, Axios,out_Fetch } from './Fetch'


// התחברות בעל עסק פונקציית POST עם FROMBODY...... לא דרך נכונה... צריך לשנות את זה לגט... אבל לבנתיים....................
export const LogInProo = (body) => {

    return Axios(`Professional/OneProfessional`, 'post',body) 
}

export const BussinesCanGiveTreatment = (Business_Numberr) => {
    return Axios(`Business_can_give_treatmentController/All_the_treatments_appointment_can_give/${Business_Numberr}`, 'post')
}

//הרשמת לקוח -פרטיים אישים
export const Professional_Registration = (body) => {

    return Axios(`Professional/NewProfessional`,'post',body)
}

// הרשמת לקוח
export const Cli_Registration = (body) => {

    return Axios(`Client/NewClient`, 'post',body) 

}

//הרשמת בעל עסק-פרטי העסק
export const Professional_Business = (body) => {

    return Axios(`Business/NewBusiness`, 'post',body)
}

//פונקצייה להוספת תור חדש דרך פונקציית פוסט בשרת.
export const NewAppointmentPost = (body) => {
    return Axios(`Appointment/NewAppointment`, 'post', body) 

}
  // חיפוש תור
export const Search_post = (body) => {

    return Axios(`Search/Searchh`, 'post',body) 
}
// סוגי הטיפולים לרשימה נגללת במסך חיפוש
export const Treatment_type_GET = () => {
    console.log(`Type_Treatment/AllCategory`)
    return Fetch(`Type_Treatment/AllCategory`,'get')
}

// סוגי הקטגוריות לרשימה נגללת במסך חיפוש
export const Category_GET = () => {
    console.log(`Category/AllCategory`)
    return Fetch(`Category/AllCategory`,'get')
}

//המשך הוספת תור חדש - הוספת סוגי הטיפולים האפשריים לתור
export const All_treatment_in_appointment = (body) => {

    return Axios(`Appointment_can_give_treatment/NewAppointment_can_give_treatment`, 'post', body)
}

//מחזיר את כל סוגי הטיפולים שעסק יכול לעשות
export const Type_treatment_for_businnes = (businnes_number) => {
    console.log(`Business_can_give_treatmentController/All_the_treatments_appointment_can_give${businnes_number}/${password}`)
    return Fetch(`Professional/OneProfessional`, 'post')
}
//מחזיר את כל סוגי הטיפולים שעסק יכול לעשות
export const GetAllAppointmentForProWithClient = (businnes_number) => {
    console.log(`Appointment/GetAllAppointmentForProWithClient/${businnes_number}`)
    return Fetch(`Appointment/GetAllAppointmentForProWithClient/${businnes_number}`, 'Get')
}
//שינוי התור מתורים פתוחים לתורים עתידיים
//appointment => future_apointment
export const New_Future_Apointment = (body) => {
    
    return Axios(`Future_Appointment/NewFuture_Appointment`, 'post',body)
}


export const ClientDetailes = (ID_number) => {
    return Axios(`Client/OneClient/${ID_number}`, 'post')
}
//כל התורים של בעל עסק
export const allApoB= (Business_Number) => {
    return Fetch(`Appointment/AllAppointmentForBussines/${Business_Number}`, 'get')
}
//כל התורים של לקוח
export const allApoC= (ID_Client) => {
    return Fetch(`Appointment/AllAppointmentForClient/${ID_Client}`, 'get')
}

// מכניס סוג טיפול חדש לתפריט טיפולים של עסק
export const NewTreatmentForBussines = (body) => {
    return Axios(`Business_can_give_treatment/PostNewTreatmentOfBussines`, 'post', body)
}

export const FutureAppointmenB = (Business_Numberr) => {
    return Axios(`Future_Appointment/AllFuture_AppointmentForProfessional/${Business_Numberr}`, 'post')
}

export const DeleteClient=(clientID_number)=>{
    return Fetch(`Client/DeleteClient/${clientID_number}`,'DELETE')
}
export const DeleteProAndBusiness=(proffesionalId)=>{
    return Fetch(`Proffesional/DeleteProffesional/${proffesionalId}`,'DELETE')
}
//מחיקת עסק קיים
export const DeleteBusiness=(businessNumber)=>{
    return Fetch(`Business/DeleteBusinesss/${businessNumber}`,'DELETE')
}
//מחיקת בעל עסק
export const DeleteProffesional=(profssinalID_number)=>{
    return Fetch(`Proffesional/DeleteProffesional/${profssinalID_number}`,'DELETE')
}
//מחיקת תור עתידי ע"י לקוח
export const CancelAppointmentByClient=(appointmentNumber)=>{
    return Fetch(`Appointment/CanceleAppointmentByClient/${appointmentNumber}`,'DELETE')
}
//םרטי בעל עסק
export const GetOneBusiness=(businessNumber)=>{
    return Axios(`Business/OneBusiness/${businessNumber}`,'post',{})
}
//עדכון פרטי לקוח 
export const UpdateClient=(body)=>{
    return Axios(`Client/UpdateClient`, 'post',body)
}
//עדכון בעל עסק
export const UpdateProffesional=(body)=>{
    return Axios(`Proffesional/UpdateProffesional`, 'post',body)
}
//התחברות כללית לשני המשתמשים
export const LogInUser = (body) => {
    return Axios(`user/checkUser`, 'post', body)
}

export const BusinessDetails= (business_num) => {
    return Axios(`Business/OneBusiness/${business_num}`, 'post')
}
//אישור תור ע"י בעל עסק לפי מספר תור
export const ConfirmAppointment= (Number_appointment) => {
    return Fetch(`Appointment/changeStatus/${Number_appointment}`, 'post')
}

//פונקציה לשים איפה שרוצים לשלוח התראות
export const  Post_SendPushNotification=(body)=>{
    return Axios( `sendpushnotification`,'POST',body);
  }

//עדכון טבלת תורים לתור עתידי (באותה הטבלה)
export const AppointmentToClient= (body) => {
    return Axios(`Appointment/ClientToAppointment`, 'post',body)
}
export const NewAppointmentToClient= (body) => {
    return Axios(`Appointment/NewAppointmentByClient`, 'post',body)
}

export const SaveTokenforID= (ID_number,token) => {
    return Axios(`Client/OneClientToken/${ID_number}/${token}`, 'post',{})
}

export const SaveTokenforIDPro= (ID_number,token) => {
    return Axios(`Client/OneProfessionalToken/${ID_number}/${token}`, 'post',{})
}

//כל התורים בשביל טוקן
export const AllApointemtDetailes= () => {
    return Axios(`Appointment/AllAppointment`, 'post',{})
}
// //כל התורים שלי של הלקוח - כולל טבלת דירוג
// export const AllApointemtDetailesForClient_With_BusinessReview= (ID_Client) => {
//     return Axios(`BusinessReview/AllAppointmentForClient/${ID_Client}`, 'GET',{})
// }

//כל התורים שלי של הלקוח - כולל טבלת דירוג
export const AllApointemtDetailesForClient_With_BusinessReview = (ID_Client) => {
    console.log(`BusinessReview/AllAppointmentForClient/${ID_Client}`)
    return Fetch(`BusinessReview/AllAppointmentForClient/${ID_Client}`, 'GET')
}

export const DDD = (ID_Client) => {
    console.log(`BusinessReview/AllAppointmentForClient/${ID_Client}`)
    return Fetch(`BusinessReview/AllAppointmentForClient/${ID_Client}`, 'Get')
}

//מחזיר את כל סוגי הטיפולים של לקוח
export const AllAppointmentForClientt = (clientID) => {
    console.log(typeof clientID)
    return Fetch(`Appointment/AllAppointmentForClientt/${parseInt(clientID)}`, 'Get')
    // return Axios(`Appointment/AllAppointmentForClientt/${clientID}`, 'GET',{})
}



//כל התורים ללקוח
export const AllApointemtDetailesForClient= (body) => {
    return Axios(`Appointment/AllAppointmentForClient`, 'post',body)
}
//מביא את כל התורים הפנויים הקיימים - למסך הפתיחה של הלקוח
export const GetAllAvailableAppointments = () => {
    console.log(`Appointment/AllAvailableAppointment`)
    return Fetch(`Appointment/AllAvailableAppointment`,'get')
}
//יומן עסק לפי מספק בעל עסק
export const BusinessDiaryForPro = (Business_id) => {
    console.log(`BusinessDiary/BusinessDiaryForPro/${Business_id}`)
    return Fetch(`BusinessDiary/BusinessDiaryForPro/${Business_id}`,'get')
}
export const UpdateapiBusiness=(body)=>{
    return Axios(`Business/UpdateBusinesss`, 'post',body)
}


export const  NewBusinessReviewByClient=(body)=>{
    return Axios(`BusinessReview/NewBusinessReviewByClient`, 'post',body)
}
//פרטי עסק לפי מספר תור
export const GetOneAppointment=(appointmentNumber)=>{
    return Fetch(`Appointment/OneAppointment/${appointmentNumber}`,'get')
}
//קריאה לקבלת טבלאות יומן, תורים וסוגי תורים לבעל עסק
export const GetBusinessDiary=(Business_Number)=>{
    return Fetch(`BusinessDiary/${Business_Number}`,'GET')

}
//חיפוש חדש לפי יומן עסק- BusinessDiary
//נשלח סוג טיפול ועיר, אפשר גם בלי עיר 
export const NewSearchPost=(body)=>{
    return Axios(`BusinessDiary/GetAllBusinessDiaryByCity_TreatmentNumber`, 'post',body)
}
//דירוג עסק ע"י לקוח שבוצע לו טיפול
export const ReviewBusiness=(body)=>{
    return Axios(`BusinessReview/NewBusinessReviewByClient`, 'post',body)
}


export const SetPhoto=(body)=>{
    return Axios(`Business/SetPhoto`, 'post',body)
}

export const GetPhoto=(id)=>{
    return Fetch(`Business/getPhoto/${id}`,'GET')

}

// //כל הדירוגים של העסק - לפי מספר עסק
// export const AllBusinessReviews= (BusinessNumber) => {
//     return Axios(`BusinessReview/AllAppointmentForBusiness/${BusinessNumber}`, 'GET',{})
// }

//כל הדירוגים של העסק - לפי מספר עסק
export const AllBusinessReviews = (BusinessNumber) => {
    console.log(`BusinessReview/AllAppointmentForBusiness/${BusinessNumber}`)
    return Fetch(`BusinessReview/AllAppointmentForBusiness/${BusinessNumber}`, 'Get')
}
export const  DeleteAvailability= (body) => {
   
    return Axios(`BusinessDiary/DeleteDate`, 'Delete',body)
}


//דירוג עסק ע"י לקוח שבוצע לו טיפול
export const AddNewAvailableHours=(body)=>{
    return Axios(`BusinessDiary/AddNewOption`, 'post',body)
}

// אלמנט חכם - מחזיר רשימה של העסקים לפי הדירוג שלהם
export const RateBussines = () => {
    console.log(`Business/getRank`)
    return Fetch(`Business/getRank`,'get')
}
//איפוס סיסמט
export const  forgotPassword= (mail) => {
   
    return Fetch(`user/sendMail/${mail}/sub/body`, 'Get')
}
//איפוס סיסמא
export const  resetPassword= (body) => {
   
    return Axios(`user/ResetPassword`, 'post',body)
}

//פונקציית חיפוש חדשה לפי יומן עסק
// export const ReviewBusiness=(body)=>{
//     return Axios(`BusinessReview/NewBusinessReviewByClient`, 'post',body)
// }
export const getCord = (street,number,city) =>{
console.log(street,number,city)
street=street.replaceAll(' ', '+')
city=city.replaceAll(' ', '+')
return out_Fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${number}+${street},${city},IL&key= AIzaSyBuYjLYxY6iSSVfQ755luh6KPM0mD4QfrM`,"GET")
// var requestOptions = {
//   method: 'GET',
//   body: raw,
//   headers: new Headers({
//     'Content-Type': 'application/json',
//     'Accept': 'application/json',
//   })
// };
// return new Promise((resolve, reject) =>{
// fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${number}+${street},${city},IL&key= AIzaSyBuYjLYxY6iSSVfQ755luh6KPM0mD4QfrM`, requestOptions)
//   .then(response =>{
//    console.log(response.json(),"@@@@@@@@@@@@@@@@@@@@@@@@@@") 
//    return response.text()

// }).then(result => console.log(result))
//   .catch(error => {
//     console.log('error', error)
//      reject(error)
// })})
}

// export const GetAllAppointmentForProWithClient = (businnes_number) => {
//     console.log(`Appointment/GetAllAppointmentForProWithClient/${businnes_number}`)
//     return Fetch(`Appointment/GetAllAppointmentForProWithClient/${businnes_number}`, 'Get')
// }


// import * as Notifications from 'expo-notifications';
// import React, { useState, useEffect, useRef,useContext } from 'react';
// import { Text, View, Button } from 'react-native';
// import registerForPushNotificationsAsync from './registerForPushNotificationsAsync';
// import { UserContext } from './UserDetailsHook'

// Notifications.setNotificationHandler({
// handleNotification: async () => ({
// shouldShowAlert: true,
// shouldPlaySound: false,
// shouldSetBadge: false,
// }),
// });
// export default function PushPage(props) {
// const { userDetails ,setUserDetails} = useContext(UserContext);

// const {title = 'Welcome',body='Diabeasy app here  for you', sendPush  }= props

// const [expoPushToken, setExpoPushToken] = useState('');
// const [notification, setNotification] = useState(false);
// const notificationListener = useRef();
// const responseListener = useRef();
// console.log('**');

// useEffect(() => {
//   registerForPushNotificationsAsync().then(token =>{setExpoPushToken(token);
//     //let temp =token? Object.assign({}, userDetails, { Token : token }):'';
//   //  setUserDetails(temp)
//   });
//   // This listener is fired whenever a notification is received while the app is foregrounded
//   notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
//   console.log(notification);
//   setNotification(notification);
//   });
//   //This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
//   responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
//   console.log(response);
//   setNotification(response.notification);
//   });
//   return () => {
//   Notifications.removeNotificationSubscription(notificationListener.current);
//   Notifications.removeNotificationSubscription(responseListener.current);
//   };
//   }, []);
//   // Can use this function below, OR use Expo's Push Notification Tool-> https://expo.dev/notifications
//   async function sendPushNotification(expoPushToken) {
//   const message = {
//   to: expoPushToken,
//   sound: 'default',
//   title: title,//'Original Title',
//   body: body,//'And here is the body!',
//   data: { To:expoPushToken, title:title,body:body }
//   };
//   await fetch('https://exp.host/--/api/v2/push/send', {
// method: 'POST',
// headers: {
// Accept: 'application/json',
// 'Accept-encoding': 'gzip, deflate',
// 'Content-Type': 'application/json',
// },
// body: JSON.stringify(message),
// });
// }

// return (
// <View>
// {/* <Text>Your expo push token: {expoPushToken}</Text>
// <View style={{ alignItems: 'center', justifyContent: 'center' }}>
// <Text>Title: {notification && notification.request.content.title} </Text>
// <Text>Body: {notification && notification.request.content.body}</Text>
// <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
// </View> */}

// <Button
// title="Press to Send Notification"
// onPress={async () => {
// await sendPushNotification(expoPushToken);
// }}
// />
// {/* {sendPush&&expoPushToken? async () => 
// await sendPushNotification(expoPushToken)
// :<></>} */}


// </View>
// );
// }

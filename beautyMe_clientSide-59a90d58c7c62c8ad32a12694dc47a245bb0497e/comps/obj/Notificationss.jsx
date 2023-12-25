// import React, { useEffect } from 'react';
// import { PushNotificationIOS } from 'react-native';
// import PushNotificationIOS from '@react-native-community/push-notification-ios';
// import Constants from 'expo-constants';
// import * as Notifications from 'expo-notifications';

// export default function PushNotificationWrapper({ children }) {

//   useEffect(() => {
//     // רישום לקבלת התראות
//     registerForPushNotificationsAsync().then(token => console.log(token));
    
//     // הגדרת הפונקציה המתבצעת בעת התראה
//     Notifications.addNotificationReceivedListener(notification => {
//       console.log(notification);
//     });

//     // הגדרת הפונקציה המתבצעת כאשר המשתמש מאשר את ההתראה
//     Notifications.addNotificationResponseReceivedListener(response => {
//       console.log(response);
//     });
    
//     return () => {
//       // הסרת הקשירויות לפונקציות
//       Notifications.removeNotificationSubscription();
//     }
//   }, []);

//   const registerForPushNotificationsAsync = async () => {
//     let token;
//     if (Constants.isDevice) {
//       const { status: existingStatus } = await Notifications.getPermissionsAsync();
//       let finalStatus = existingStatus;
//       if (existingStatus !== 'granted') {
//         const { status } = await Notifications.requestPermissionsAsync();
//         finalStatus = status;
//       }
//       if (finalStatus !== 'granted') {
//         console.log('Failed to get push token for push notification!');
//         return;
//       }
//       token = (await Notifications.getExpoPushTokenAsync()).data;
//       console.log(token);
//     } else {
//       console.log('Must use physical device for Push Notifications');
//     }
//     return token;
//   };

//   return <>{children}</>;
// }




// // import * as Notifications from 'expo-notifications';
// // import * as Permissions from 'expo-permissions';
// // import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, FlatList} from 'react-native';

// // const Notificationss = ({title, body}) => {
// //   const sendPushNotification = async (title, body) => {
// //     const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
// //     let finalStatus = existingStatus;

// //     if (existingStatus !== 'granted') {
// //       const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
// //       finalStatus = status;
// //     }

// //     if (finalStatus !== 'granted') {
// //       alert('Failed to get push token for push notification!');
// //       return;
// //     }

// //     // Get the token that uniquely identifies this device
// //     let token = await Notifications.getExpoPushTokenAsync();
  
// //     // Create and schedule the notification
// //     Notifications.scheduleNotificationAsync({
// //       content: {
// //         title: title,
// //         body: body
// //       },
// //       trigger: null,
// //     });
// //   }

// //   return (
// //     <TouchableOpacity onPress={() => sendPushNotification(title, body)}>
// //       <Text>Send Notification</Text>
// //     </TouchableOpacity>
// //   );
// // }

// // export default Notificationss;

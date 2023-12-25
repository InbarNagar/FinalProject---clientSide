import MapView from "react-native-maps";

const GOOGLE_KEY_API="AIzaSyBMwN0NknaPibHnpv8laiFYUKmQFz1FHZY";
function MapPreview(lat,lng){
    const imageURL=`https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=600x300&maptype=roadmap`
    `&markers=color:red%7Clabel:S%7C${lat},${lng}`
    `&key=${GOOGLE_KEY_API}`;
    
    return(
<MapView>

</MapView>
    );
}
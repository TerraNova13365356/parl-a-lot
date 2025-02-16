import Image from "next/image";
import Home_Page from "./Home/home";
import SlotBooking from "./Booking/SlotBook";
import ParkingPrediction from "./test/test";
import SelectLocation from "./location-selection/location";
import Create_parking from "./slot_creation/create_parking";

export default function Home() {
  return (
    
    <div>
       
        <Home_Page/>
        {/* <SlotBooking/> */}
        {/* <ParkingPrediction/> */}
        {/* <SelectLocation/> */}
        {/* <Create_parking/> */}
    </div>
  );
}

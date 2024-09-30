/* I didnt commented here becuase this is not a realtime project its just a task. Keep in mind that i do comment every script which i write make it easer for other deverloper to read */
import axios from "axios";
import { toast } from "react-toastify";

const GetFetchTADataApi = async() => {
    try{
        const response = await axios.get("/calendar-app/apiDemo/calendarfromtoenddate.json");
        return response;
    } catch (e) { toast.error('Error Fetching TAMeeting, Pls try again later!'); }
}
export { GetFetchTADataApi };
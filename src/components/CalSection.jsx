/* I didnt commented here becuase this is not a realtime project its just a task. Keep in mind that i do comment every script which i write make it easer for other deverloper to read */
import Calendar from './calandarComponents/Calendar.jsx';
import AddIcon from '@mui/icons-material/Add';

function CalSection(){
  return (
    <>
      <div className='calSection'>
          <div className='calInfo'>
            <h5>Calendar</h5>
            <span>Enjoy your selecting potential candidates Tracking and Management System.</span>
          </div>
          <div className='calContainer'>
          <div className='calCalendarInfo'>
              <h5>Your Todos's</h5>
              <div>
                <AddIcon sx={{ fontSize: 25, strokeWidth: 2 }} />
                <span>Create Schedule</span>
              </div>
          </div>
          <div className='calCalendar'>
              <Calendar />
          </div>
          </div>
      </div>
      <br />
    </>
  )
}
export default CalSection;
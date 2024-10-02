/* I didnt commented here becuase this is not a realtime project its just a task. Keep in mind that i do comment every script which i write make it easer for other deverloper to read */
import Calendar from './calandarComponents/Calendar.jsx';
import AddIcon from '@mui/icons-material/Add';

import GoogleMeet from '../assets/icons/meet.webp'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';

function CalSection(){
  const [eventDetailsUI, setEventDetailsUI] = useState(false);
  const [eventDetailsData, setEventDetailsData] = useState([]);

  const calEventBtnCallback = (data) => {
    setEventDetailsUI(true);
    setEventDetailsData(prevSetEventDetailsData => {
      return {
        Id: data.Id,
        Description: data.Description,
        StartTime: new Date(data.StartTime),
        EndTime: new Date(data.EndTime),
        Location: data.Location,
        InterviewerName: data.InterviewerName,
        CandidateName: data.CandidateName,
        JobTitle: data.JobTitle,
        JobRole: data.JobRole,
      }
    });
  }
  const eventTemplate = (event) => {
    const options = { hour: 'numeric', minute: 'numeric', hour12: true };
    const eventStartTime24 = new Date(event.StartTime);
    const eventEndTime24 = new Date(event.EndTime); 

    let EstartTime12 = eventStartTime24.toLocaleTimeString([], options);
    EstartTime12.includes(':00') && (() => {EstartTime12 = EstartTime12.replace(':00', '');})();
    let EendTime12 = eventEndTime24.toLocaleTimeString([], options);
    EendTime12.includes(':00') && (() => {EendTime12 = EendTime12.replace(':00', '');})();

    EstartTime12 = EstartTime12.replace('am', 'A.M.').replace('pm', 'P.M.');
    EendTime12 = EendTime12.replace('am', 'A.M.').replace('pm', 'P.M.');

    const startTimePeriod = EstartTime12.slice(-4);
    startTimePeriod === EendTime12.slice(-4) && (() => { EstartTime12 = EstartTime12.replace(` ${startTimePeriod}`, '') })();

    return `${EstartTime12} - ${EendTime12}`;
  };
  const calEventDetailsClose = (e) => {
    e.preventDefault();
    setEventDetailsUI(false);
    setEventDetailsData([]);
  }

  return (
    <>
      <div className='calSection autoShowAnim_Container'>
          <div className='calInfo'>
            <h5>Calendar</h5>
            <span>Enjoy your selecting potential candidates Tracking and Management System.</span>
          </div>
          <div className='calContainer'>
            {eventDetailsUI && (
              <div className='calMeetingLinkSection'>
                <div className='calMeetingLinkContainer'>
                  <CloseIcon className='calMeetingLinkClose' sx={{ fontSize: 25, strokeWidth: 2 }} onClick={(e) => calEventDetailsClose(e)}/>
                  <div>
                    <div className='calMeetingLinkFlexbox_L'>
                      <span>Interview With: {eventDetailsData.CandidateName}</span>
                      <span>Position: {`${eventDetailsData.JobRole} ${eventDetailsData.JobTitle}`}</span>
                      <span>Created By: {eventDetailsData.InterviewerName}</span>
                      <span>Interview Date: {`${eventDetailsData.StartTime.getDate()}ᵗʰ ${eventDetailsData.StartTime.toLocaleString('default', { month: 'long' })} ${eventDetailsData.StartTime.getFullYear()}`}</span>
                      <span>Interview Time: {eventTemplate(eventDetailsData)}</span>
                      <span>Interview Via: <a href={eventDetailsData.Location}>{eventDetailsData.Location}</a></span>
                      <button>
                        <span>Resume.docx</span>
                        <div>
                          <VisibilityOutlinedIcon sx={{ fontSize: 22, strokeWidth: 2 }} />
                          <FileDownloadOutlinedIcon sx={{ fontSize: 22, strokeWidth: 2 }} />
                        </div>
                      </button>
                      <button>
                        <span>Aadharcard</span>
                        <div>
                          <VisibilityOutlinedIcon sx={{ fontSize: 22, strokeWidth: 2 }} />
                          <FileDownloadOutlinedIcon sx={{ fontSize: 22, strokeWidth: 2 }} />
                        </div>
                      </button>
                    </div>
                    <div className='calMeetingLinkFlexbox_R'>
                      <div>
                        <img src={GoogleMeet} alt="GoogleMeet" />
                      </div>
                      <button>JOIN</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className='calCalendarInfo'>
                <h5>Your Todos's</h5>
                <div>
                  <AddIcon sx={{ fontSize: 25, strokeWidth: 2 }} />
                  <span>Create Schedule</span>
                </div>
            </div>
            <div className='calCalendar'>
                <Calendar sendDataToCalSection={calEventBtnCallback} />
            </div>

            
          </div>
      </div>
      <br />
    </>
  )
}
export default CalSection;
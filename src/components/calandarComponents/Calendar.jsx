/* I didnt commented here becuase this is not a realtime project its just a task. Keep in mind that i do comment every script which i write make it easer for other deverloper to read */
import '../../custom-css/Calandar.css';
import { GetFetchTADataApi } from '../../api/UserApi.jsx';
import { HeaderTemplate, ContentTemplate } from './calendarTemplets/CalQuickInfoTemplate.jsx';
import CalDateHeaderTemplate from './calendarTemplets/CalDateHeaderTemplate.jsx';
import CalEventTemplate from './calendarTemplets/CalEventTemplate.jsx';
import { ScheduleComponent, Day, Week, Month, Inject, ViewsDirective, ViewDirective, Year as YearView } from '@syncfusion/ej2-react-schedule';
import { toast } from 'react-toastify';
import { useEffect, useRef, useState } from "react";

function Calendar({ sendDataToCalSection }){
    const scheduleRef = useRef(null);
    const [view, setView] = useState('Week');
    const [currentDate, setCurrentDate] = useState(new Date());
    const [events, setEvents] = useState([]);
    const [selectedDateRange, SetSelectedDateRange] = useState('ERROR!');
    
    useEffect(() => {
        (async () => {
            try {
                const response = await GetFetchTADataApi();
                if(response.status === 200) {
                    const dataRAW = response.data;

                    // Display Events...
                    setEvents([]);
                    setEvents(prevSetEvents => {
                        return [ 
                            ...prevSetEvents, 
                            ...dataRAW.map(data => ({
                                Id: crypto.randomUUID(),
                                Description: data.desc,
                                StartTime: new Date(data.start),
                                EndTime: new Date(data.end),
                                Location: data.link,
                                InterviewerName: `${data.user_det.handled_by.firstName}`,
                                CandidateName: `${data.user_det.candidate.candidate_firstName} ${data.user_det.candidate.candidate_lastName}`,
                                JobTitle: data.job_id.jobRequest_Title,
                                JobRole: data.job_id.jobRequest_Role,
                            }))
                        ];
                    });
                } else { toast.error('Error Fetching TAMeeting, Pls try again later!'); return; }
            } catch (error) { toast.error('Error Fetching TAMeeting, Pls try again later!'); }
        })();
    }, []);

    const customTimeSlot = (slotData) => {
        const date = new Date(slotData.date);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const period = hours >= 12 ? 'P.M' : 'A.M';
        const formattedHours = hours % 12 || 12;
        const formattedMinutes = minutes === 0 ? '' : `:${minutes.toString().padStart(2, '0')}`;
        
        return (
            <div className='e-time-slots'>
            <span>{formattedHours}{formattedMinutes} {period}</span>
            </div>
        );
    };

    const quickInfoTemplate = {
        header: (props) => HeaderTemplate(props, scheduleRef),
        content: (props) => ContentTemplate(props, events, scheduleRef, sendDataToCalSection)
    };

    const onEventRendered = () => {
        // const observer = new MutationObserver(() => {
        //     const appointments = document.querySelectorAll(
        //         `.e-appointment[data-id^="Appointment_"]`
        //     );
    
        //     const topPositions = new Map();
        //     appointments.forEach((appointment) => {
        //         const top = appointment.style.top;
        //         if (topPositions.has(top)) appointment.style.display = "none";
        //         else topPositions.set(top, true);
        //         appointment.style.width = "95.9%";
        //     });
        // });
    
        // const container = document.querySelector(".e-content-wrap");
        // container && observer.observe(container, { childList: true, subtree: true, });
    };

    const calOnActionComplete = (e) => {
        if(e.addedRecords && e.addedRecords.length > 0){
            const data = e.addedRecords[0];
            setEvents(prevSetEvents => {
                return [ 
                    ...prevSetEvents, ({
                        Id: crypto.randomUUID(),
                        Description: data.Description || 'NA',
                        StartTime: new Date(data.StartTime),
                        EndTime: new Date(data.EndTime),
                        Location: 'NA',
                        InterviewerName: `NA`,
                        CandidateName: 'NA',
                        JobTitle: 'NA',
                        JobRole: 'NA',
                    })
                ];
            });
        }

        const currentView = scheduleRef.current ? scheduleRef.current.currentView : '';
        const selectedDates = scheduleRef.current ? scheduleRef.current.getCurrentViewDates() : '';
        const startDate = selectedDates[0];
        const endDate = selectedDates[selectedDates.length - 1];
        const startMonth = selectedDates[20];
        
        setCurrentDate(startDate);
        (['Day', 'Week', 'Month', 'Year'].includes(currentView)) && setView(currentView);
        currentView === 'Day' && SetSelectedDateRange(`${startDate.getDate()}ᵗʰ ${startDate.toLocaleString('default', { month: 'long' })}, ${startDate.getFullYear()}`);
        currentView === 'Week' && (() => {
            const startDateFormated = `${startDate.getDate()}ᵗʰ ${startDate.toLocaleString('default', { month: 'long' })}`;
            const endDateFormated = `${endDate.getDate()}ᵗʰ ${endDate.toLocaleString('default', { month: 'long' })}, ${endDate.getFullYear()}`;
            SetSelectedDateRange(`${startDateFormated} to ${endDateFormated}`);
        })();
        currentView === 'Month' && SetSelectedDateRange(`${startMonth.toLocaleString('default', { month: 'long' })}, ${startMonth.getFullYear()}`);
        currentView === 'Year' && SetSelectedDateRange(startDate.getFullYear());
    };

    return (
        <>
            {events.length > 0 && (            
                <>
                    <ScheduleComponent
                        ref={scheduleRef}
                        rowAutoHeight={true}
                        width="auto"
                        height="auto"
                        startHour="9:00"
                        firstDayOfWeek={1}
                        currentView={view}
                        selectedDate={currentDate}
                        timeScale={{ enable: true, interval: 60, slotCount: 1, majorSlotTemplate: customTimeSlot }}
                        dateHeaderTemplate={CalDateHeaderTemplate}
                        eventSettings={{ dataSource: [...events], template: (props) => CalEventTemplate(props, events) }}
                        quickInfoTemplates={quickInfoTemplate}
                        eventRendered={onEventRendered}
                        actionComplete={calOnActionComplete}
                        style={{ left:"50%", transform: "translateX(-50%)"}}
                    >
                        <ViewsDirective>
                            <ViewDirective option="Day" />
                            <ViewDirective option="Week" dateFormat="dd MMM" dayHeaderFormat="EEEE" />
                            <ViewDirective option="Month" />
                            <ViewDirective option="Year" />
                        </ViewsDirective>
                        <Inject services={[Day, Week, Month, YearView]} />
                        <div className='calSFDatesSection'>
                            {(!['Month', 'Year'].includes(view)) && ( <div className='calSFDate'><span>{new Date(currentDate).getDate() || 'ERROR!'}</span></div> )}
                            <div className='calSFDateRange'><span>{selectedDateRange}</span></div>
                        </div>
                    </ScheduleComponent>
                </>
            )}
        </>
    );
}
export default Calendar;
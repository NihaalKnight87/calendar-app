/* I didnt commented here becuase this is not a realtime project its just a task. Keep in mind that i do comment every script which i write make it easer for other deverloper to read */
import '../../custom-css/Calandar.css';
import { GetFetchTADataApi } from '../../api/UserApi.jsx';
import { HeaderTemplate, ContentTemplate } from './calendarTemplets/CalQuickInfoTemplate.jsx';
import CalDateHeaderTemplate from './calendarTemplets/CalDateHeaderTemplate.jsx';
import CalEventTemplate from './calendarTemplets/CalEventTemplate.jsx';
import { ScheduleComponent, Day, Week, Month, Inject, ViewsDirective, ViewDirective, Year as YearView } from '@syncfusion/ej2-react-schedule';
import { toast } from 'react-toastify';
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { QuickSyncfusionLicenceHacking } from '../SyncfusionLicenceHacking.jsx';

function Calendar({ sendDataToCalSection }, ref){
    const scheduleRef = useRef(null);
    const [view, setView] = useState('Week');
    const [currentDate, setCurrentDate] = useState(() => new Date());
    const [isEvents, setIsEvents] = useState(false);
    const [eventsRAW, setEventsRAW] = useState([]);
    const [events, setEvents] = useState([]);
    const [selectedDateRange, SetSelectedDateRange] = useState('ERROR!');
    // ADD FOR TEMP TO FIX THIS ISSUE - BECAUSE THE CALANDAR COMPONENT IS NOT RELOADING WHEN NEW DATA IS ADD. LOOKS LIKE A VERISON ISSUE.
    const [key, setKey] = useState(0);
    
    useEffect(() => {
        (async () => {
            try {
                const response = await GetFetchTADataApi();
                if(response.status === 200) {
                    const dataAPI = response.data;

                    // Display Events...
                    setEventsRAW([]);
                    setEventsRAW(prevSetEventsRAW => {
                        const dataRAW = [ 
                            ...prevSetEventsRAW, 
                            ...dataAPI.map(data => ({
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
                        setEvents(dataRAW);
                        return dataRAW;
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
        content: (props) => ContentTemplate(props, eventsRAW, scheduleRef, sendDataToCalSection)
    };

    useEffect(() =>{
        calReCalculatingEventSlots(view);
        setKey(prevKey => prevKey + 1);
    }, [view, eventsRAW]);
    
    const calReCalculatingEventSlots = (currentView) => {
        const filteredEvents = [];
        (currentView === 'Day' || currentView === 'Week') && (() => {
            eventsRAW.forEach((event) => {
                const eventStart = new Date(event.StartTime);
                const isDuplicate = filteredEvents.some((filteredEvent) => {
                    const filteredStart = new Date(filteredEvent.StartTime);
                    const filteredEnd = new Date(filteredEvent.EndTime);
                    return eventStart >= filteredStart && eventStart < filteredEnd;
                });
                !isDuplicate && filteredEvents.push(event);
            });
            setEvents(filteredEvents);
            QuickSyncfusionLicenceHacking();
        })();
        (currentView === 'Month' || currentView === 'Year') && (() => {
            eventsRAW.forEach((event) => {
                const eventStart = new Date(event.StartTime).toISOString().split('T')[0];
                const isDuplicate = filteredEvents.some((filteredEvent) => {
                    const filteredEventDate = new Date(filteredEvent.StartTime).toISOString().split('T')[0];
                    return eventStart === filteredEventDate;
                });
                !isDuplicate && filteredEvents.push(event);
            });
            setEvents(filteredEvents);
            QuickSyncfusionLicenceHacking();
        })();
    }

    const calOnActionComplete = (e) => {
        if(e.addedRecords && e.addedRecords.length > 0){
            const data = e.addedRecords[0];
            setEventsRAW(prevSetEventsRAW => {
                const dataRAW = [ 
                    ...prevSetEventsRAW, ({
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
                setEvents(dataRAW);
                return dataRAW;
            });
        }

        const currentView = scheduleRef.current ? scheduleRef.current.currentView : view;
        const selectedDates = scheduleRef.current ? scheduleRef.current.getCurrentViewDates() : [];
        const startDate = selectedDates.length > 0 ? selectedDates[0] : new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const endDate = selectedDates.length > 0 ? selectedDates[selectedDates.length - 1] : new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
        const startMonth = selectedDates.length > 0 ? selectedDates[20] : new Date(currentDate.getFullYear(), currentDate.getMonth(), 20);
        
        selectedDates > 0 && setCurrentDate(startDate);
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

    const calOnCreateEventDefault = () => {
        setEventsRAW(prevSetEventsRAW => {
            const dataRAW = [ 
                ...prevSetEventsRAW, ({
                    Id: crypto.randomUUID(),
                    Description: 'NA',
                    StartTime: new Date(2000, 1, 12, 9, 0),
                    EndTime: new Date(2000, 1, 12, 10, 0),
                    Location: 'NA',
                    InterviewerName: `NA`,
                    CandidateName: 'NA',
                    JobTitle: 'NA',
                    JobRole: 'NA',
                    IsAllDay: false,
                })
            ];
            setEvents(dataRAW);
            return dataRAW;
        });
        toast.success('Default Events is created! Now customized Events as you needed!')
        QuickSyncfusionLicenceHacking();
    };
    const calOnDeleteAll = () => {
        setEvents([]);
        setEventsRAW([]);
        isEvents && toast.error('You dont have any events created or saved! Please create a default event to get start!');
        QuickSyncfusionLicenceHacking();
    }
    useImperativeHandle(ref, () => ({ calOnCreateEventDefault, calOnDeleteAll }));

    return (
        <>
            {eventsRAW.length > 0 && events.length > 0? (
                <>
                    {!isEvents && setIsEvents(true)} 
                    <ScheduleComponent
                        key={key}
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
                        eventSettings={{ dataSource: [...events], template: (props) => CalEventTemplate(props, scheduleRef, eventsRAW) }}
                        quickInfoTemplates={quickInfoTemplate}
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
            ) : (
                // NOTE: I dont use style instead I use classname to make it perfect since this is not a real world project. 
                <div style={{padding: '10px', fontSize: '1.4rem', fontWeight: 'bold', textAlign: 'center', color: '#ff0000'}}>You dont have any events created or saved! Please create a default event to get start!</div> 
            )}
        </>
    );
}
export default forwardRef(Calendar);
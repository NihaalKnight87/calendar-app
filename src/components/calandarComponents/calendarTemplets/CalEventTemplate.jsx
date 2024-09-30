import '../../../custom-css/Calandar.css';
import { useState } from 'react';

function CalEventTemplate(props, events){
    const eventTemplate = () => {
        const options = { hour: 'numeric', minute: 'numeric', hour12: true };
        const startTime24 = new Date(props.StartTime);
        const endTime24 = new Date(props.EndTime);

        let startTime12 = startTime24.toLocaleTimeString([], options);
        startTime12.includes(':00') && (() => {startTime12 = startTime12.replace(':00', '');})();
        let endTime12 = endTime24.toLocaleTimeString([], options);
        endTime12.includes(':00') && (() => {endTime12.replace(':00', '');})();

        const startTimePeriod = startTime12.slice(-2);
        startTimePeriod === endTime12.slice(-2) && (() => {startTime12 = startTime12.replace(` ${startTimePeriod}`, '')})();

        return `${startTime12} - ${endTime12}`;
    };

    return (
        <div className='calGridEventSection'>
            <div>
                <span>0</span>
            </div>
            <div className='calGridEventSidebar'/>
            <div className='calGridEventContent'>
                <div>
                    <span style={{textTransform: 'capitalize'}}>{props.JobTitle}</span>
                    <span>Interviewer: {props.InterviewerName}</span>
                    <span>Time: {eventTemplate()}</span>
                </div>
            </div>
        </div>
    );
}

/*
const CalEventTemplate = (props, events) => {
    // const [expandedEventId, setExpandedEventId] = useState(null);

    const overlappingEvents = events.filter(event =>
        new Date(event.StartTime).getTime() === new Date(props.StartTime).getTime()
    );

    events.map((event, index) => {
        // console.log(`${new Date(event.StartTime).getTime()} - ${new Date(props.StartTime).getTime()}`)
    });
    // events.map((event, index) => {
    //     if(new Date(event.StartTime).getTime() === new Date(props.StartTime).getTime())
    //     {
    //         console.log(event);
    //     }
    // });
    
    
    const isExpanded = expandedEventId === props.Id;
    const showMore = overlappingEvents.length > 1 && !isExpanded;

    return (
        <div className='calGridEventSection' onClick={() => console.log('CLICKED')}>
            <div onClick={() => handleEventClick(props.Id)} style={{ cursor: 'pointer' }}>
                <span>{props.JobTitle}</span>
                <span>Interviewer: {props.InterviewerName}</span>
                <span>Time: {new Date(props.StartTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })} - {new Date(props.EndTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}</span>
            </div>

            {showMore && (
                <div className="moreEvents">
                    +{overlappingEvents.length - 1} more
                </div>
            )}

            {isExpanded && overlappingEvents.slice(1).map((event, index) => (
                <div key={index} className='extraEvent'>
                    <span>{event.JobTitle}</span>
                    <span>Interviewer: {event.InterviewerName}</span>
                    <span>Time: {new Date(event.StartTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })} - {new Date(event.EndTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}</span>
                </div>
            ))}
        </div>
    );
};

const handleEventClick = (eventId) => {
    if (expandedEventId === eventId) {
        setExpandedEventId(null); // Collapse if already expanded
    } else {
        setExpandedEventId(eventId); // Expand this event block
    }
};
*/

export default CalEventTemplate;
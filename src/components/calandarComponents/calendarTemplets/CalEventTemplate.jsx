function CalEventTemplate(props, events){
    const startTime24 = new Date(props.StartTime);
    const endTime24 = new Date(props.EndTime);

    const eventMeetings = events.filter(event => {
        return new Date(event.StartTime) >= startTime24 && new Date(event.StartTime) < endTime24;
    });

    const eventTemplate = () => {
        const options = { hour: 'numeric', minute: 'numeric', hour12: true };

        let startTime12 = startTime24.toLocaleTimeString([], options);
        startTime12.includes(':00') && (() => {startTime12 = startTime12.replace(':00', '');})();
        let endTime12 = endTime24.toLocaleTimeString([], options);
        endTime12.includes(':00') && (() => {endTime12.replace(':00', '');})();

        const startTimePeriod = startTime12.slice(-2);
        startTimePeriod === endTime12.slice(-2) && (() => {startTime12 = startTime12.replace(` ${startTimePeriod}`, '')})();

        return `${startTime12} - ${endTime12}`;
    };

    return (
        <>
            <div className='calGridEventSection'>
                <div>
                    <span>{eventMeetings.length || 0}</span>
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
        </>
    );
}
export default CalEventTemplate;
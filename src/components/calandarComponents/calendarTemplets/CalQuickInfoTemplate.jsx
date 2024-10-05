import CloseIcon from '@mui/icons-material/Close';

const HeaderTemplate = (props, scheduleRef) => {
    const closePopup = () => {
        scheduleRef.current && scheduleRef.current.quickPopup.quickPopupClose();
    };

    return (
        <div className='quick-info-header'>
            <div className='quick-info-header-content'>
                {props.elementType === 'cell' && (
                    <div className="e-popup-header">
                        <div className="e-header-icon-wrapper">
                            <button className="e-close e-control e-round e-small e-icon-btn" title="Close" onClick={() => {closePopup()}}>
                                <span className="e-btn-icon e-icons e-close-icon" />
                            </button>
                        </div>
                    </div>
                )}
                {props.elementType === 'event' && (
                    <div className='calHeaderPopupMeetingsSection'>
                        <span>Meetings</span>
                        <CloseIcon className='calHeaderPopupMeetingsClose' sx={{ fontSize: 20, strokeWidth: 2 }} onClick={() => closePopup()}/>
                    </div>
                )}
            </div>
        </div>
    );
}

const ContentTemplate = (props, eventsRAW, scheduleRef, sendDataToCalendar) => {
    const currentView = scheduleRef.current ? scheduleRef.current.currentView : '';
    const startTime24 = new Date(props.StartTime);
    const endTime24 = new Date(props.EndTime);

    const eventMeetings = eventsRAW.filter(event => {
        if(currentView === 'Day' || currentView === 'Week') return new Date(event.StartTime) >= startTime24 && new Date(event.StartTime) < endTime24;
        else if (currentView === 'Month' || currentView === 'Year'){
            const eventStart = startTime24.toISOString().split('T')[0];
            const filteredEventDate = new Date(event.StartTime).toISOString().split('T')[0];
            return eventStart === filteredEventDate;
        }
    });

    const eventTemplate = (event) => {
        const options = { hour: 'numeric', minute: 'numeric', hour12: true };
        const eventStartTime24 = new Date(event.StartTime);
        const eventEndTime24 = new Date(event.EndTime); 

        let EstartTime12 = eventStartTime24.toLocaleTimeString([], options);
        EstartTime12.includes(':00') && (() => {EstartTime12 = EstartTime12.replace(':00', '');})();
        let EendTime12 = eventEndTime24.toLocaleTimeString([], options);
        EendTime12.includes(':00') && (() => {EendTime12.replace(':00', '');})();

        EstartTime12 = EstartTime12.replace('am', '').replace('pm', '');
        EendTime12 = EendTime12.replace('am', 'AM').replace('pm', 'PM');
        
        return `${EstartTime12} - ${EendTime12}`;
    };

    const calEventBtn = (event, e) => {
        e.preventDefault();
        scheduleRef.current && scheduleRef.current.quickPopup.quickPopupClose();
        sendDataToCalendar(event);
    };

    return (
        <>
            {props.elementType === 'cell' && (
                <div style={{padding: '28px 18px 8px'}}>
                    <table className="e-popup-table">
                        <tbody>
                            <tr>
                                <td>
                                    <form className="e-schedule-form">
                                        <span className="e-input-group e-control-wrapper">
                                            <input className="e-subject e-field e-input" type="text" name="Subject" placeholder="Add title" />
                                        </span>
                                    </form>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="e-date-time">
                                        <div className="e-date-time-icon e-icons"></div>
                                        <div className="e-date-time-details e-text-ellipsis">{`${props.StartTime.getDate()}ᵗʰ ${props.StartTime.toLocaleString('default', { month: 'long' })}, ${props.StartTime.getFullYear()}`} ( {eventTemplate(props)} )</div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
            {props.elementType === 'event' && ( 
                <div className='calContentPopupMeetingsSection'>
                    {eventMeetings.map(event => {
                        return(
                            //ALERT NOTE: I wont use this key as id as index, since this is only task so it add it. Since I know what i am doing and I will not be deleting any of the add elements so id is find for now but not of production.
                            <div key={event.Id}>
                                <div className='calContentPopupMeetingsDivider'></div>
                                <div className='calContentPopupMeetingsContainer' onClick={(e) => calEventBtn(event, e)}>
                                    <div></div>
                                    <div>
                                        <span>{event.JobRole}</span>
                                        <div>
                                            <span>{event.Description}</span>
                                            <span>Interviewer: {event.InterviewerName}</span>
                                        </div>
                                        <div>
                                            <span>Date: {`${event.StartTime.getDate()}ᵗʰ ${event.StartTime.toLocaleString('default', { month: 'long' })} ${event.StartTime.getFullYear()}`}</span>
                                            <span>Time: {eventTemplate(event)}</span> 
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </>
    );     
}
export { HeaderTemplate, ContentTemplate }
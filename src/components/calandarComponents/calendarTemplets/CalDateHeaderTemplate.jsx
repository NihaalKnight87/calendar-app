function CalDateHeaderTemplate(props) {
    const date = props.date;
    const dayNumber = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
    const month = new Intl.DateTimeFormat('en', { month: 'short' }).format(date);
    const dayName = new Intl.DateTimeFormat('en', { weekday: 'long' }).format(date);

    return (
        <div>
            <div className='calGridDateMonth'>{dayNumber} {month}</div>
            <div className='calGridDay'>{dayName}</div>
        </div>
    );
}
export default CalDateHeaderTemplate;
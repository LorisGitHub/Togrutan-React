import React from 'react';
import './Agenda.css';
import AgendaCalender from 'react-agenda-calendar'
import 'react-agenda-calendar/dist/index.css'

export default function Agenda (){
    const agenda = [
        {
            title: "Title",
            startDate: {day: 1, month: 0, year: 2021},
            endDate: {day: 1, month: 1, year: 2021},
        }
    ]

    return (
        <div style={{ margin: '30px'}}>
            <AgendaCalender key={1} agenda={agenda} currentDate={new Date(2021, 0, 2)} />
        </div>
    );
}

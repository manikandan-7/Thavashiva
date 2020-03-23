import React, {Component} from 'react';
import {render} from 'react-dom';
import {Calendar, momentLocalizer} from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Notifscom from './notifscom';

const localizer = momentLocalizer(moment);

class Notifscalendar extends Component {
    constructor() {
        super();
        const now = new Date();
        const events = [
            
        ]
        this.state = {
            name: 'React',
            users: [],
            products: [],
            events
        };
    }

    componentDidMount() {
        this.callAPI()
    }
response1=async (user)=>{
    const now = new Date();

    var events = this.state.events,
        body,
        body1
    var response1 =await fetch('http://localhost:9000/getviewnotifs', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: user,
            accesstoken: localStorage.getItem("accessToken")
        })
    });
   var body1 = await response1.json();
    console.log(body1)
    await this.setState({products: body1})
    body1.map(products => {
        console.log(user)
        let event = {
            title:user + "-" + products.name,
            allDay: true,
            start: now,
            end: now
        }
        events.push(event)
        this.setState({events:events,...event})

        
    })
}
    async callAPI() {
        const now = new Date();

        var events = [],
            body,
            body1
        var response = await fetch('http://localhost:9000/getviewnotifsusers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: this.state.email, password: this.state.password})
        });
        body = await response.json();
        console.log((body))

        this.setState({users: body})
    
        const response2 = this.state.users.map(user => {
           this.response1(user)
           
        })
        console.log(events)

        this.setState({events: events})
        
    }

    render() {
        return (
            <div>
                <p>
                    Purchase Details
                </p>
                <div style={{
                    height: '500pt'
                }}>
                    <Calendar
                        events={this.state.events}
                        startAccessor="start"
                        endAccessor="end"
                        defaultDate={moment().toDate()}
                        localizer={localizer}/>
                </div>
            </div>
        );
    }
}

export default Notifscalendar
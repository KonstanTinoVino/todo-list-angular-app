import { Component } from '@angular/core';
import { Appointment } from '../models/appointment';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit {

  ngOnInit(): void {
    this.appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    this.lastAppointmentId = this.appointments.length > 0 ? this.appointments[this.appointments.length - 1].id : 0;
  }

  private lastAppointmentId: number = 0;

  appTitle: string = '';
  appDate: Date = new Date();

  appointments: Appointment[] = []  

  addAppointment() {
    if(this.appTitle == '' || this.appDate == null) {
      alert('Title and Date are required');
      return;
    }else{
      this.appointments.push({ id: ++this.lastAppointmentId, title: this.appTitle, date: this.appDate } as Appointment);    
    }
    localStorage.setItem('appointments', JSON.stringify(this.appointments));
  }
  deleteAppointment(appointmentId: number) {
    this.appointments.splice(this.appointments.findIndex(appointment => appointment.id == appointmentId), 1);
    localStorage.setItem('appointments', JSON.stringify(this.appointments));
  }
}

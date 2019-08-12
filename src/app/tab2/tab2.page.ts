import { Component, ViewChild, Inject, LOCALE_ID } from '@angular/core';
import { CalendarComponent } from 'ionic2-calendar/calendar';
import { AlertController } from '@ionic/angular';
import { formatDate } from '@angular/common';
// import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page {
  public newEvent: EventType = new EventType();
  collapseCard: boolean = true;
  firstSelection: boolean = true;
  minDate = new Date().toISOString();
  eventSource = [];

  calendar = {
    mode: 'month',
    currentDate: new Date()
  }

  viewTitle = '';

  @ViewChild(CalendarComponent, {static:false}) myCalendar: CalendarComponent;
 // @ViewChild(IonSlides, {static:false}) slides: IonSlides;

  constructor(private alertCtrl: AlertController, @Inject(LOCALE_ID)private locale: string) {}

  ngOnInit() {
    this.resetEvent();  // initialize newEvent field
  }

  resetEvent() {
    this.newEvent.title = '';
    this.newEvent.description = '';
    this.newEvent.startTime = '';
    this.newEvent.endTime = '';
    this.newEvent.allDay = false;
  }

  addEvent() {
    let eventCopy = {
      title: this.newEvent.title,
      description: this.newEvent.description,
      startTime: new Date(this.newEvent.startTime),
      endTime: new Date(this.newEvent.endTime),
      allDay: this.newEvent.allDay
    }

    if (eventCopy.allDay) {
      let start = eventCopy.startTime;
      let end = eventCopy.endTime;
      eventCopy.startTime = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate()));
      eventCopy.endTime = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate() + 1));
    }

    this.eventSource.push(eventCopy);
    this.myCalendar.loadEvents();
    this.resetEvent();
  }

  changeMode(mode) {
    this.calendar.mode = mode;
  }

  back() {
//    this.slides.slidePrev();
    var swiper = document.querySelector('.swiper-container')['swiper'];
    swiper.slidePrev();
  }

  next() {
//    this.slides.slideNext();
    var swiper = document.querySelector('.swiper-container')['swiper'];
    swiper.slideNext();
  }

  today() {
    this.calendar.currentDate = new Date();
  }

  async onEventSelected (newEvent) {
    let start = formatDate(newEvent.startTime, 'medium', this.locale);
    let end = formatDate(newEvent.endTime, 'medium', this.locale);

    const alert = await this.alertCtrl.create({
      header: newEvent.title,
      subHeader: newEvent.description,
      message: 'From: ' + start + '<br><br>To: ' + end,
      buttons: ['OK']
    })
    alert.present();
  }

  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  onDaySelected(selectedDate: Date) {
    // if(!this.firstSelection) {
    //   this.calendar.mode = 'day';
    // }
    // this.firstSelection = false;
  }

  public getEvents(): EventType[] {
    let localStorageItem = JSON.parse(localStorage.getItem('events'));
    return localStorageItem;
  } 

  onTimeSelected(ev) {
    let selected = new Date(ev.selectedTime);
    this.newEvent.startTime = selected.toISOString();
    selected.setHours(selected.getHours() + 1);
    this.newEvent.endTime = (selected.toISOString());
  }

}

export class EventType {
  public title: string = '';
  public description: string = '';
  public startTime: string = '';
  public endTime: string = '';
  public allDay: boolean = false;
}
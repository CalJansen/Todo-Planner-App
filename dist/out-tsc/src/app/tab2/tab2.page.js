import * as tslib_1 from "tslib";
import { Component, ViewChild, Inject, LOCALE_ID } from '@angular/core';
import { CalendarComponent } from 'ionic2-calendar/calendar';
import { AlertController } from '@ionic/angular';
import { formatDate } from '@angular/common';
// import { IonSlides } from '@ionic/angular';
let Tab2Page = class Tab2Page {
    // @ViewChild(IonSlides, {static:false}) slides: IonSlides;
    constructor(alertCtrl, locale) {
        this.alertCtrl = alertCtrl;
        this.locale = locale;
        this.newEvent = new EventType();
        this.collapseCard = true;
        this.firstSelection = true;
        this.minDate = new Date().toISOString();
        this.eventSource = [];
        this.calendar = {
            mode: 'month',
            currentDate: new Date()
        };
        this.viewTitle = '';
    }
    ngOnInit() {
        this.resetEvent(); // initialize newEvent field
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
        };
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
    onEventSelected(newEvent) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let start = formatDate(newEvent.startTime, 'medium', this.locale);
            let end = formatDate(newEvent.endTime, 'medium', this.locale);
            const alert = yield this.alertCtrl.create({
                header: newEvent.title,
                subHeader: newEvent.description,
                message: 'From: ' + start + '<br><br>To: ' + end,
                buttons: ['OK']
            });
            alert.present();
        });
    }
    onViewTitleChanged(title) {
        this.viewTitle = title;
    }
    onDaySelected(selectedDate) {
        // if(!this.firstSelection) {
        //   this.calendar.mode = 'day';
        // }
        // this.firstSelection = false;
    }
    getEvents() {
        let localStorageItem = JSON.parse(localStorage.getItem('events'));
        return localStorageItem;
    }
    onTimeSelected(ev) {
        let selected = new Date(ev.selectedTime);
        this.newEvent.startTime = selected.toISOString();
        selected.setHours(selected.getHours() + 1);
        this.newEvent.endTime = (selected.toISOString());
    }
};
tslib_1.__decorate([
    ViewChild(CalendarComponent, { static: false }),
    tslib_1.__metadata("design:type", CalendarComponent)
], Tab2Page.prototype, "myCalendar", void 0);
Tab2Page = tslib_1.__decorate([
    Component({
        selector: 'app-tab2',
        templateUrl: 'tab2.page.html',
        styleUrls: ['tab2.page.scss']
    }),
    tslib_1.__param(1, Inject(LOCALE_ID)),
    tslib_1.__metadata("design:paramtypes", [AlertController, String])
], Tab2Page);
export { Tab2Page };
export class EventType {
    constructor() {
        this.title = '';
        this.description = '';
        this.startTime = '';
        this.endTime = '';
        this.allDay = false;
    }
}
//# sourceMappingURL=tab2.page.js.map
// import { Template } from 'meteor/template';
import { DateTime } from 'luxon';
// import { _ } from 'meteor/underscore';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Random } from 'meteor/random';

// import './autoform-td-datetimepicker.html';

Template.afTempusDominusDateTimePicker.helpers({
    pickerId() {
        return Template.instance().pickerId.get()
    },
    atts() {
        let atts = this.atts;
        atts['data-picker'] = Template.instance().pickerId.get();
        // console.log('atts', atts);
        return atts;
    }
});

// Template.afTempusDominusDateTimePicker.events({
//     'change input[td="pick"]': function (event, template) {
//         console.log('change input event',event,event.target);
//     //   template.$(event.target).change();
//     }
//   });

Template.afTempusDominusDateTimePicker.onCreated(function afTempusDominusDateTimePickerOnCreated() {
    this.pickerId = new ReactiveVar(Random.id());
    // console.log('picker id', this.pickerId.get());
})

Template.afTempusDominusDateTimePicker.onRendered(function afTempusDominusDateTimePickerOnRendered() {
    // find th  object to link the dtp to
    let $td = document.getElementById(this.pickerId.get());
    // find the input field  
    // let $input = document.getElementById(this.data.atts.id); // no longer used in implementation - picker does the job of updating input field
    // console.log('tempus', $td,$input);
    let data = this.data;
    let opts = data.dtpOptions || {};
    // $input.picker = this.picker;

    // first set locale right before creating picker !
    let locale;
    if (data.locale && (typeof (data.locale) == 'function')) {
        locale = data.locale();
    }
    else {
        locale = data.locale ? ((data.locale == 'en') ? 'default' : data.locale) : 'default';
    }
    TempusDominus.locale(locale);
    // create the picker
    this.picker = new TempusDominus.TempusDominus($td, opts);
    // store for access in valueOut
    global.pickers[this.pickerId.get()] = this.picker;
    // reset locale
    this.picker.locale(locale);
    // console.log('picker',locale, data, opts);

    // for debugging purposes
    // this.picker.subscribe(TempusDominus.Namespace.events.change, (e) => {
    //     console.log('change event', DateTime.fromJSDate(e.date).toFormat("dd-MM-yyyy HH:mm")),this.picker.dates.lastPicked;
    //     // flag autoform the value of the field is changed (call without jquery ?)
    //     // this.$($input).change();
    //     // $input.dispatchEvent(new Event('change'));
    // });
    // if value passed
    // console.log('passed value',data.value);
    let parsedDate = undefined;
    let origValue = data.origDate;
    if (origValue) {
        parsedDate = this.picker.dates.parseInput(data.value);
    }
    else if (opts.defaultDate) parsedDate = this.picker.dates.parseInput(opts.defaultDate);
    else if (opts.useCurrent) parsedDate = this.picker.dates.parseInput(new DateTime.local().startOf('minute').toJSDate());
    if (parsedDate) {
        parsedDate.setLocale(locale);
        // console.log('parsed date',parsedDate);
        this.picker.dates.setValue(parsedDate);
    }

    // console.log('data', data);
    if ('readonly' in data) {
        if (data.readonly) {
            this.picker.disable();
            // console.log('picker disabled');
        }
    }
    return;

    // To be able to properly detect a cleared field, the defaultDate,
    // which is "" by default, must be null instead. Otherwise we get
    // the current datetime when we call getDate() on an empty field.
    // if (!opts.defaultDate || opts.defaultDate === "") {
    //     opts.defaultDate = null;
    // }
});

Template.afTempusDominusDateTimePicker.onDestroyed(function afTempusDominusDateTimePickerOnDestroyed() {
    console.log('destroyed', this.pickerId.get());
    if (this.picker) {
        this.picker.dispose();
        delete global[this.pickerId.get()];
    }
});
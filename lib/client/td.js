import { DateTime } from 'luxon';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Random } from 'meteor/random';
// global TempusDominus


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

    // create the picker
    this.picker = new TempusDominus.TempusDominus($td, opts);
    // set format (or any other localization option)
    if (opts.localization) this.picker.updateOptions({ localization: opts.localization });
    // store for access in valueOut
    global.pickers[this.pickerId.get()] = this.picker;

    // for debugging purposes
    // this.picker.subscribe(TempusDominus.Namespace.events.change, (e) => {
    //     console.log('change event', DateTime.fromJSDate(e.date).toFormat("dd-MM-yyyy HH:mm")),this.picker.dates.lastPicked;
    //     // flag autoform the value of the field is changed (call without jquery ?)
    //     // this.$($input).change();
    //     // $input.dispatchEvent(new Event('change'));
    // });

    // if value passed initialize picker with that value or by default value if present
    let parsedDate = undefined;
    let origValue = data.origDate;
    if (origValue) {
        parsedDate = this.picker.dates.parseInput(data.value);
    }
    else if (opts.defaultDate) parsedDate = this.picker.dates.parseInput(opts.defaultDate);
    else if (opts.useCurrent) parsedDate = this.picker.dates.parseInput(new DateTime.local().startOf('minute').toJSDate());
    if (parsedDate) {
        this.picker.dates.setValue(parsedDate);
    }

    // if readonly set picker to disabled
    if ('readonly' in data) {
        if (data.readonly) {
            this.picker.disable();
        }
    }
    return;
});

Template.afTempusDominusDateTimePicker.onDestroyed(function afTempusDominusDateTimePickerOnDestroyed() {
    // clean up picker objects
    if (this.picker) {
        this.picker.dispose();
        delete global[this.pickerId.get()];
    }
});
// global AutoForm
import { DateTime } from 'luxon';

AutoForm.addInputType('tempusdominus', {
    template: 'afTempusDominusDateTimePicker',
    // valueOut() {
    //   let parent = this[0]; // this[0] is the component which got the Autoform ID assigned
    //   let list = [...parent.querySelectorAll('li')]
    //   let items = list.map((li) => {
    //     return {
    //       value: li.getAttribute('data-value'),
    //       label: li.getAttribute('data-label')
    //     }
    //   });
    //   // console.log('arraylabels valueOut', this,items);
    //   return items;
    // },
    // valueIn: function (val, atts) {
    //     let valString = (val instanceof Date) ? DateTime.fromJSDate(val).toFormat('yyyy-MM-DD') : 'HELLO';
    //     console.log('td', val, valString);
    //     return valString;
    // },
    valueOut: function () {
        // todo multiple dates selection
        // console.log('value out',this);
        // console.log(`valueOut ${this.val()} ${typeof (this.val())}`);
        let id = this[0].dataset['picker'];
        let picker = global.pickers[id];
        // console.log('picker is', picker.dates.lastPicked, picker.dates.picked);
        if (picker.dates.lastPicked) {
            console.log('value out', this[0].getAttribute('name'),id,DateTime.fromJSDate(picker.dates.lastPicked).toJSDate());
            return DateTime.fromJSDate(picker.dates.lastPicked).toJSDate();
        }
        else return undefined;
    },
    contextAdjust: function (context) {
        // if (context.value) {
        //     console.log('context value', context.value);
        //     // context.value = DateTime.fromJSDate(context.value).toFormat('yyyy-MM-DD');
        // }
        if (context.value) {
            context.origDate = context.value;
        }
        if (context.atts.dateTimePickerOptions) {
            context.dtpOptions = context.atts.dateTimePickerOptions;
            delete context.atts.dateTimePickerOptions;
        }
        if (context.atts.locale) {
            context.locale = context.atts.locale;
            delete context.atts.locale;
        }
        if (context.atts.hasOwnProperty('manualInput')) {
            context.manualInput = context.atts.manualInput;
            delete context.atts.manualInput;
        }
        if (context.atts.hasOwnProperty('readonly')) {
            context.readonly = true;
            delete context.atts.readonly;
        }
        // console.log('context', context);
        return context;
    }
});
Input type for AutoForm for Tempus Dominus datetime picker
[https://github.com/Eonasdan/tempus-dominus]

Example usage in Schema declaration :
<code>
  birthday: {
    type: Date,
    optional: true,
    label: 'Birthday',
    autoform: {
      type: 'tempusdominus',
      readonly: false,
      locale: 'default',
      dateTimePickerOptions: {
        defaultDate: DateTime.fromFormat('2000-01-01', 'yyyy-MM-dd').toJSDate(),
        display: {
          sideBySide: false,
          components: {
            decades: true,
            year: true,
            month: true,
            date: true,
            hours: false,
            minutes: false,
            seconds: false
          },
          viewMode: 'years',
          inline: false
        }
      },
    }
  }
</code>


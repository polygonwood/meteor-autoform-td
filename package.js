Package.describe({
    name: 'polygonwood:meteor-autoform-td',
    summary: 'Tempus Dominus DateTimePicker for AutoForm 8.0',
    description: 'Tempus Dominus DateTimePicker',
    version: '8.0.0',
    git: 'https://github.com/polygonwood/meteor-autoform-td.git'
  });
  
  Package.onUse((api) => {
    api.versionsFrom('3.0.2');
  
    api.use([
      'check',
      'ecmascript',
      'reactive-var',
      'templating',
      'aldeed:autoform@8.0.0-rc.5',
    ], 'client');
  
    api.addFiles([
      'lib/client/autoform.js',
      'lib/client/td.html',
      'lib/client/td.js'
    ], 'client');
  });

  Npm.depends({
    'luxon': '2.3.2',
    '@eonasdan/tempus-dominus': '6.9.4'
  })
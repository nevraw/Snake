(function() {
 loadOptions();
 buttonHandler();
})();

function buttonHandler() {
 var $submitButton = $('#submitButton');

 $submitButton.on('click', function() {
//  console.log('Submit');
  var return_to = getQueryParam('return_to', 'pebblejs://close#');
  document.location = return_to + encodeURIComponent(JSON.stringify(getAndStoreConfigData()));
 });

 var $cancelButton = $('#cancelButton');

 $cancelButton.on('click', function() {
//  console.log('Cancel');
  var return_to = getQueryParam('return_to', 'pebblejs://close#');
  document.location = return_to;
 });
}

// Radio control for time display
var $skintoneValue;
$("input[name=skintone]").change(function () {
 $skintoneValue = parseInt(this.value);
});

function loadOptions() {
 if (localStorage.skintone) {
  $skintoneValue = localStorage.skintone;
//  console.log('localStorage.skintone: ' + $skintoneValue);
 } else {
  $skintoneValue = 0;
//  console.log('localStorage.skintone was undefined, now set to: ' + $skintoneValue);
 }
 $("input[name=skintone][value='" + $skintoneValue + "']").attr('checked', 'checked');
} 

function getAndStoreConfigData() {
// console.log('skintone value: ' + $skintoneValue);

 var options = {
  skintone:   $skintoneValue
 };
// console.log('Got options: ' + JSON.stringify(options));

 localStorage.skintone = $skintoneValue;

 return options;
}

function getQueryParam(variable, defaultValue) {
 var query = location.search.substring(1);
 var vars = query.split('&');
 for (var i = 0; i < vars.length; i++) {
  var pair = vars[i].split('=');
  if (pair[0] === variable) {
   return decodeURIComponent(pair[1]);
  }
 }
 return defaultValue || false;
}

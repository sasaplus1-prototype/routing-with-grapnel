(function(){

  'use strict';

  var status1 = document.getElementById('js-status-1'),
      status2 = document.getElementById('js-status-2');

  var router1 = new Grapnel({ pushState: false }),
      router2 = new Grapnel({ pushState: true });

  var pushStateLinks = document.querySelectorAll('.js-push-state-links'),
      i, len;

  for (i = 0, len = pushStateLinks.length; i < len; ++i) {
    pushStateLinks[i].addEventListener('click', function(event) {
      var route = event.target.getAttribute('data-route');

      router2.navigate(route);
    }, false);
  }

  router1.get(':num', function(context, event) {
    console.log('hash - get');
    console.log(context.params.num);
    console.log(event);

    status1.innerHTML = 'current page is ' + context.params.num;
  });

  router2.get('/', function(context, event) {
    console.log('pushState - get - /');
    console.log(context.params.num);
    console.log(event);

    status2.innerHTML = '';
  });
  router2.get('/:num', function(context, event) {
    console.log('pushState - get');
    console.log(context.params.num);
    console.log(event);

    status2.innerHTML = 'current page is ' + context.params.num;
  });

  router1.on('navigate', createHandler('hash - navigate'));
  router1.on('match', createHandler('hash - match'));
  router1.on('hashchange', createHandler('hash - hashchange'));

  router2.on('navigate', createHandler('pushState - navigate'));
  router2.on('match', createHandler('pushState - match'));
  router2.on('hashchange', createHandler('pushState - hashchange'));

  function createHandler(eventName) {
    var name = eventName;

    return function(event) {
      console.log(name);
      console.log(this);
      console.log(event);
    };
  }

}());

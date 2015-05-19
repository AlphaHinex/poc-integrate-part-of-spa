function renderSnippet(ngAppName, urlPrefix, templateUrl) {
  $('.angularBlock').empty();
  $('.angularBlock').append('<div class="innerBlock"><ng-view /></div>');
  if(urlPrefix && templateUrl) {
    $.get(urlPrefix + templateUrl)
      .done(function(data) {
        $('.innerBlock').append(data);
      })
      .done(function() {
        $.when(loadNgInclude(urlPrefix))
          .done(function() {
            angular.bootstrap($('.innerBlock'), [ngAppName]);
          });
      });
  } else {
    angular.bootstrap($('.innerBlock'), [ngAppName]);
  }
}

function loadNgInclude(urlPrefix) {
  var dtd = $.Deferred();
  var requests = Array();
  var includes = $('.innerBlock').find('[ng-include]');
  includes.each(function(index, el) {
    var url = $(el).attr('src') || $(el).attr('ng-include')
    url = url.replace(/[\'\"]/g, '');
    requests.push($.get(urlPrefix + url)
                    .done(function(data) {
                      $(el).append(data);
                      $(el).removeAttr('ng-include');
                      $(el).removeAttr('src');
                    }));
  });
  $.when.apply($, requests).done(function() {
    dtd.resolve();
  });
  return dtd.promise();
}
function renderSnippet(ngAppName, urlPrefix, url) {
  $('#angularBlock').empty();
  $('#angularBlock').append('<div id="innerBlock"><ng-view /></div>');
  if(urlPrefix && url) {
    $.get(urlPrefix + url)
      .done(function(data) {
        $('#innerBlock').append(data);
      })
      .done(function() {
        $.when(loadNgInclude(urlPrefix))
          .done(function() {
            angular.bootstrap($('#innerBlock'), [ngAppName]);
          });
      });
  } else {
    angular.bootstrap($('#innerBlock'), [ngAppName]);
  }
}

function loadNgInclude(urlPrefix) {
  var dtd = $.Deferred();
  var requests = Array();
  var includes = $('#innerBlock').find('[ng-include]');
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
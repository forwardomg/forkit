+function ($) {
  'use strict';

  function forkitSelect () {
    var forkitSelect = {
      currentIndex: 0,
      openList: false
    };

    var nativeSelect = {
      el: $(this)
    }

    var currentIndex = null;
    var currentText = null;
    var wrapSelectElement = '<div class="forkit-select"></div>';


    // init DOM
    
    function showNewDOM () {
      var listComplete = [];
      for (var i = 0, count = 1; i < nativeSelect.getList().length; i++, count++) {
        listComplete.push('<li data-id=' + count + '>' + nativeSelect.getList()[i] + '</li>');
      };
      nativeSelect.el.wrap(wrapSelectElement);
      nativeSelect.el.after('<ul class="forkit-select-list">' + listComplete.join('') + '</ul>');
      nativeSelect.el.after('<div class="forkit-select-active">' + nativeSelect.getList()[forkitSelect.currentIndex] + '</div>');
    }

    // func working with native select

    nativeSelect.hide = function () {
      nativeSelect.el.hide();
    }
    nativeSelect.getList = function () {
      var list = []
      nativeSelect.el.children().each(function() {
        var el = $(this);
        list.push(el.text());
      });
      return list;
    }

    // func working with forkit select

    forkitSelect.showList = function () {
      nativeSelect.el.parent().find('.forkit-select-list').show();
      forkitSelect.openList = true;
    }
    forkitSelect.hideList = function () {
      nativeSelect.el.parent().find('.forkit-select-list').hide();
      forkitSelect.openList = false;
    }
    forkitSelect.showCurrentElement = function () {
      var target = nativeSelect.el.parent().find('.forkit-select-active');
      target.html(nativeSelect.getList()[forkitSelect.currentIndex - 1]);
    }

    function eventOnCurrentItem () {
      var target = nativeSelect.el.parent().find('.forkit-select-active');
      target.on('click', function(event) {
        forkitSelect.openList ? forkitSelect.hideList() : forkitSelect.showList();
      });
    }
    function eventOnListItem () {
      var target = nativeSelect.el.parent().find('.forkit-select-list li');
      target.on('click', function(event) {
        forkitSelect.currentIndex = $(this).data('id');
        forkitSelect.showCurrentElement();
        forkitSelect.hideList();
        nativeSelect.el.val(forkitSelect.currentIndex);

        console.info('%cvalue custom select ' + forkitSelect.currentIndex, "color: green; font-size: 13px");
        console.info('%cvalue native select ' + nativeSelect.el.val(), "color: blue; font-size: 13px");
        console.info(forkitSelect.currentIndex == nativeSelect.el.val());

      });
    }

    function init () {
      showNewDOM();
      nativeSelect.hide();

      forkitSelect.showCurrentElement();
      forkitSelect.hideList();

      eventOnCurrentItem();
      eventOnListItem();
    }

    init();
  }

  $('[data-select]').each(function() {
    forkitSelect.apply(this);
  });

}(jQuery);
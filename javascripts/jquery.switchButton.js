/* ============================================================
 * jquery.switchbutton.js v1.0.1
 * ============================================================
 * Copyright 2013 Simon Wiesmayr, http://www.rebellium.de
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
   * ======================================================= */


;(function ($) {

  var context    = '[role=switchbutton]',
      CLASS_NAME = 'SwitchButton',
      CLICK      = 'click.switchbutton',
      CHANGE     = 'change.switchbutton',

  SwitchButton = function (element, opts) {

    // Publics

    this.$element = $(element);
    this.options = $.extend({}, opts, SwitchButton.defaults);;
    this.$wrapper;

    // Privates

    var self       = this, $element = this.$element
      , iconLabels = Boolean ($element.attr('data-labels') == 'icons')
      , labelOff   = iconLabels ? '<i/>': $element.attr('data-label-off')
      , labelOn    = iconLabels ? '<i/>' : $element.attr('data-label-on')
      , $handler   = $('<div class="switch-button-knob"></div>');


    // Check if control is wrapped inside a label

    if ($element.parent().is('label')) $element.parent().addClass('switch-button-label');

    // Leave the checkbox in place

    this.$wrapper = $element.addClass('switch-button-control')
                    .after('<div class="switch-button"></div>').next()

      .append('<div class="switch-button-label-on"><span>' + labelOn + '</span></div>')
      .append($handler)
      .append('<div class="switch-button-label-off"><span>' + labelOff + '</span></div>')

      .on(CLICK, function (e) {
        self.toggle();
        e.preventDefault();
        e.stopPropagation();
      });

    // Listen to change event

    $element.on(CHANGE, function () {
      Boolean ($(this).is(':checked'))
        ? $(this).next().addClass('checked')
        : $(this).next().removeClass('checked');
    }).trigger(CHANGE);

  };


  /* SELECTBOX CLASS DEFINITION
   * ======================================================= */

  SwitchButton.prototype.check = function () {
    this.$element.attr('checked', true).trigger(CHANGE);
  };

  SwitchButton.prototype.uncheck = function () {
    this.$element.attr('checked', false).trigger(CHANGE);
  };

  SwitchButton.prototype.toggle = function () {
    var $el = this.$element;
    Boolean ($el.is(':checked'))
      ? this.uncheck()
      : this.check();
  };


  // Teardown, remove listeners, data and markup

  SwitchButton.prototype.destroy = function () {
    this.$wrapper.off(CLICK).empty().remove();
    this.$element.off(CHANGE).removeClass('switch-button-control')
      .data(CLASS_NAME, null);
  };


  /* SELECTBOX PLUGIN DEFINITION
   * =========================== */

  $.fn.switchButton = function (option) {
    return this.each(function () {
      var $this = $(this),
          data = $this.data(CLASS_NAME);
      if (!data) $this.data(CLASS_NAME, (data = new SwitchButton(this)));
      if (typeof option == 'string') {
        data[option].apply(data); // Always return the class instance
      }
    });
  };


  /* APPLY TO CHECKBOX ELEMENTS WITH ROLE 'switchbutton'
   * ======================================================= */

  $(function () {
    $(context).switchButton();
  });


})(jQuery);


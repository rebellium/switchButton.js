# ============================================================
# * jquery.switchbutton.js v1.0.1
# * ============================================================
# * Copyright 2013 Simon Wiesmayr, http://www.rebellium.de
# *
# * Licensed under the Apache License, Version 2.0 (the "License");
# * you may not use this file except in compliance with the License.
# * You may obtain a copy of the License at
# *
# * http://www.apache.org/licenses/LICENSE-2.0
# *
# * Unless required by applicable law or agreed to in writing, software
# * distributed under the License is distributed on an "AS IS" BASIS,
# * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# * See the License for the specific language governing permissions and
# * limitations under the License.
#   * =======================================================
(($) ->
  context = "[role=switchbutton]"
  CLASS_NAME = "SwitchButton"
  CLICK = "click.switchbutton"
  CHANGE = "change.switchbutton"
  SwitchButton = (element, opts) ->

    # Publics
    @$element = $(element)
    @options = $.extend({}, opts, SwitchButton.defaults)
    @$wrapper

    # Privates
    self = this
    $element = @$element
    iconLabels = Boolean($element.attr("data-labels") is "icons")
    labelOff = (if iconLabels then "<i/>" else $element.attr("data-label-off"))
    labelOn = (if iconLabels then "<i/>" else $element.attr("data-label-on"))
    $handler = $("<div class=\"switch-button-knob\"></div>")

    # Check if control is wrapped inside a label
    $element.parent().addClass "switch-button-label"  if $element.parent().is("label")

    # Leave the checkbox in place
    @$wrapper = $element.addClass("switch-button-control").after("<div class=\"switch-button\"></div>").next().append("<div class=\"switch-button-label-on\"><span>" + labelOn + "</span></div>").append($handler).append("<div class=\"switch-button-label-off\"><span>" + labelOff + "</span></div>").on(CLICK, (e) ->
      self.toggle()
      e.preventDefault()
      e.stopPropagation()
    )

    # Listen to change event
    $element.on(CHANGE, ->
      (if Boolean($(this).is(":checked")) then $(this).next().addClass("checked") else $(this).next().removeClass("checked"))
    ).trigger CHANGE


  # SELECTBOX CLASS DEFINITION
  #   * =======================================================
  SwitchButton::check = ->
    @$element.attr("checked", true).trigger CHANGE

  SwitchButton::uncheck = ->
    @$element.attr("checked", false).trigger CHANGE

  SwitchButton::toggle = ->
    $el = @$element
    (if Boolean($el.is(":checked")) then @uncheck() else @check())


  # Teardown, remove listeners, data and markup
  SwitchButton::destroy = ->
    @$wrapper.off(CLICK).empty().remove()
    @$element.off(CHANGE).removeClass("switch-button-control").data CLASS_NAME, null


  # SELECTBOX PLUGIN DEFINITION
  #   * ===========================
  $.fn.switchButton = (option) ->
    @each ->
      $this = $(this)
      data = $this.data(CLASS_NAME)
      $this.data CLASS_NAME, (data = new SwitchButton(this))  unless data
      data[option].apply data  if typeof option is "string" # Always return the class instance



  # APPLY TO CHECKBOX ELEMENTS WITH ROLE 'switchbutton'
  #   * =======================================================
  $ ->
    $(context).switchButton()

) jQuery

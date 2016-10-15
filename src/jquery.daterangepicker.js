// jquery.daterangepicker.js
// author : Chunlong Liu, Zhenyu Wu
// license : MIT
// https://adam5wu.github.io/DateRange-Picker-Ex/
(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define(['jquery', 'moment'], factory);
	} else if (typeof exports === 'object' && typeof module !== 'undefined') {
		// CommonJS. Register as a module
		module.exports = factory(require('jquery'), require('moment'));
	} else {
		// Browser globals
		factory(jQuery, moment);
	}
}
	(function ($, moment) {
		'use strict';
		$.DRPExLang = $.extend({
				'default' : 'en',
				'en' : {
					'selected' : 'Selected:',
					'day' : 'Day',
					'days' : 'Days',
					'apply-disabled' : 'Close',
					'apply-enabled' : 'Apply',
					'week-1' : 'mo',
					'week-2' : 'tu',
					'week-3' : 'we',
					'week-4' : 'th',
					'week-5' : 'fr',
					'week-6' : 'sa',
					'week-7' : 'su',
					'week-number' : 'W',
					'shortcuts' : 'Shortcuts',
					'past' : 'Past',
					'following' : 'Following',
					'previous' : 'Previous',
					'prev-week' : 'Week',
					'prev-month' : 'Month',
					'prev-year' : 'Year',
					'next' : 'Next',
					'next-week' : 'Week',
					'next-month' : 'Month',
					'next-year' : 'Year',
					'less-than' : 'Date range should not be more than %d days',
					'more-than' : 'Date range should not be less than %d days',
					'range-start-bound' : 'Start date range out-of-bound',
					'range-end-bound' : 'End date range out-of-bound',
					'batch-invalid' : 'Date range does not satisfy batch constraint "%s"',
					'disabled-range' : 'Date range spans across disabled dates',
					'default-more' : 'Please select a date range longer than %d days',
					'default-single' : 'Please select a date',
					'default-less' : 'Please select a date range less than %d days',
					'default-range' : 'Please select a date range between %d and %d days',
					'default-default' : 'Please select a date range'
				}
			}, $.DRPExLang);

		$.fn.dateRangePicker = function (opt) {
			opt = $.extend({
					autoClose : false,
					format : 'YYYY-MM-DD',
					separator : ' to ',
					language : undefined,
					startOfWeek : undefined,
					getValue : function () {
						return $(this).val();
					},
					setValue : function (s) {
						if (s != $(this).val())
							$(this).val(s).change();
					},
					dateRange : {
						start : false,
						end : false
					},
					minDays : 0,
					maxDays : 0,
					shortcuts : {
						//'prev-days': [1,3,5,7],
						//'next-days': [3,5,7],
						//'prev' : ['week','month','year'],
						//'next' : ['week','month','year'],
						//'custom' : { 'name': function(daytime){} }
					},
					watchValueChange : true,
					container : undefined,
					alwaysOpen : false,
					dropTrigger : true,
					singleDate : false,
					lookBehind : false,
					batchMode : false,
					animationTime : 200,
					stickyMonths : false,
					selectForward : false,
					selectBackward : false,
					applyBtnClass : '',
					singleMonth : false,
					hoveringTooltip : function (days, startTime, hoveringTime) {
						return days > 1 ? days + ' ' + localize('days') : '';
					},
					haveTopbar : true,
					showWeekNumbers : false,
					getWeekNumber : function (date) {
						//date will be the first day of a week
						return moment(date).format('w');
					},
					customOpenAnimation : null,
					customCloseAnimation : null,
					customArrowPrevSymbol : null,
					customArrowNextSymbol : null
				}, opt);

			if (opt.singleMonth)
				opt.stickyMonths = false;
			if (!opt.haveTopbar)
				opt.autoClose = true;
			if (opt.singleDate)
				opt.batchMode = false;
			if (opt.dateRange.start && opt.dateRange.start.constructor == String)
				opt.dateRange.start = moment(opt.dateRange.start, opt.format).toDate();
			if (opt.dateRange.end && opt.dateRange.end.constructor == String)
				opt.dateRange.end = moment(opt.dateRange.end, opt.format).toDate();
			RangeReverseCheck(opt.dateRange);

			var state = {
				selRange : {
					start : false,
					end : false
				},
				selWeek : false,
				active : false,
				locale : 'default',
				localizer : {},
				fblocalizer : {},
				formatter : moment(),
				monthFormat : '??',
				anchor : $(this),
				wrapper : undefined
			};

			if (opt.dropTrigger) {
				state.anchor.bind('click.DRPEx', function (evt) {
					if (!state.active) {
						openDatePicker(opt.animationTime);
					}
				});
			}
			if (opt.alwaysOpen)
				openDatePicker(0);

			// expose some api
			state.anchor.data('DRPEx', {
				setStart : function (d1, silent) {
					statusCheck(true);
					if (d1.constructor == String)
						d1 = moment(d1, opt.format).toDate();
					setDateRange(d1, state.selRange.end ? moment(state.selRange.end).toDate() : d1, silent);
					return this;
				},
				setEnd : function (d2, silent) {
					statusCheck(true);
					if (d2.constructor == String)
						d2 = moment(d2, opt.format).toDate();
					setDateRange(state.selRange.start ? moment(state.selRange.start).toDate() : d2, d2, silent);
					return this;
				},
				setDateRange : function (d1, d2, silent) {
					statusCheck(true);
					if (d1.constructor == String)
						d1 = moment(d1, opt.format).toDate();
					if (d2.constructor == String)
						d2 = moment(d2, opt.format).toDate();
					setDateRange(d1, d2, silent);
				},
				setDateText : function (str, silent) {
					statusCheck(true);
					var Values = parseStringDates(str);
					if (Values)
						applyDates(Values, silent);
					return Values;
				},
				open : function (duration) {
					statusCheck();
					return openDatePicker(duration)
				},
				close : function (duration) {
					statusCheck();
					return closeDatePicker(duration);
				},
				clear : function () {
					statusCheck();
					return clearSelection();
				},
				redraw : function () {
					statusCheck();
					if (state.wrapper)
						redrawDatePicker();
				},
				resetMonthsView : function () {
					statusCheck();
					if (state.wrapper)
						resetMonthsView();
				},
				wrapper : function () {
					statusCheck(true);
					return state.wrapper;
				},
				anchor : function () {
					statusCheck();
					return state.anchor;
				},
				isActive : function () {
					statusCheck();
					return state.active;
				},
				destroy : function () {
					statusCheck();
					state.anchor.unbind('.DRPEx');
					state.anchor.data('DRPEx', undefined);
					if (state.wrapper)
						state.wrapper.remove();
					state.wrapper = null;
					$(window).unbind('resize.DRPEx scroll.DRPEx', calcPosition);
					$(document).unbind('click.DRPEx', defocusClick);
				}
			});
			return this;

			function _init() {
				// Initialize locale
				state.fblocalizer = ResolveLocalizer(state.locale);

				var locale = state.locale;
				if (!opt.language) {
					var languages = navigator.languages || navigator.userLanguage ||
						(navigator.language ? [navigator.language] : [navigator.browserLanguage]);
					for (var lang in languages) {
						lang = lang.toLowerCase();
						if (lang in $.DRPExLang) {
							locale = lang;
							break;
						}
					}
				} else if (opt.language in $.DRPExLang) {
					locale = opt.language;
				}
				var localizer = ResolveLocalizer(locale);
				state.locale = localizer[0];
				state.localizer = localizer[1];

				var _locale = state.formatter.locale();
				if (!state.formatter.locale(opt.language)._locale) {
					if (!state.formatter.locale(state.locale)._locale)
						if (!state.formatter.locale(locale)._locale)
							state.formatter.locale(_locale);
				}
				state.monthFormat = state.formatter.localeData().longDateFormat('LL')
					.replace(/Y(\s*)[^YMD]*D[^M]*/, 'Y$1')
					.replace(/M(\s*)[^YMD]*D[^Y]*/, 'M$1')
					.replace(/[^YM]*D[^YM]*/, '');

				// Derive startOfWeek
				if (opt.startOfWeek === undefined)
					opt.startOfWeek = (state.formatter.startOf('week').isoWeekday() === 7 ? 0 : 1);

				state.wrapper = createDom();
				(opt.container || $('body')).append(state.wrapper);
				state.wrapper.delegate('.day', 'mouseleave', function () {
					state.wrapper.find('.date-range-length-tip').hide();
					clearHovering();
				});
				var defaultTopText = '';
				if (opt.singleDate)
					defaultTopText = localize('default-single');
				else if (opt.minDays && opt.maxDays)
					defaultTopText = localize('default-range');
				else if (opt.minDays)
					defaultTopText = localize('default-more');
				else if (opt.maxDays)
					defaultTopText = localize('default-less');
				else
					defaultTopText = localize('default-default');
				var msg = defaultTopText.replace(/\%d/, opt.minDays).replace(/\%d/, opt.maxDays);
				state.wrapper.find('.default-top').html(msg).attr('title', msg);
				if (opt.singleMonth) {
					state.wrapper.addClass('single-month');
				} else {
					state.wrapper.addClass('two-months');
				}
				state.wrapper.find('.next').click(function () {
					if (!opt.stickyMonths)
						gotoNextMonth($(this));
					else
						gotoNextMonth_stickily($(this));
				});
				function gotoNextMonth(btn) {
					var isMonth2 = btn.parents('table').hasClass('month2');
					var month = nextMonth(isMonth2 ? state.month2 : state.month1);
					if (!opt.singleMonth && !isMonth2 && compareMonth(month, state.month2) >= 0)
						return;
					if (isDateOutOfBounds(month))
						return;
					showMonth(month, isMonth2 ? 'month2' : 'month1');
					showGap();
				}
				function gotoNextMonth_stickily() {
					var nextMonth1 = nextMonth(state.month1);
					var nextMonth2 = nextMonth(state.month2);
					if (isDateOutOfBounds(nextMonth2))
						return;
					showMonth(nextMonth1, 'month1');
					showMonth(nextMonth2, 'month2');
					showSelectedDays();
				}
				state.wrapper.find('.prev').click(function () {
					if (!opt.stickyMonths)
						gotoPrevMonth($(this));
					else
						gotoPrevMonth_stickily($(this));
				});
				function gotoPrevMonth(btn) {
					var isMonth2 = btn.parents('table').hasClass('month2');
					var month = prevMonth(isMonth2 ? state.month2 : state.month1);
					if (isMonth2 && compareMonth(month, state.month1) <= 0)
						return;
					if (isDateOutOfBounds(moment(month).endOf('month').startOf('day').toDate()))
						return;
					showMonth(month, isMonth2 ? 'month2' : 'month1');
					showGap();
				}
				function gotoPrevMonth_stickily() {
					var prevMonth1 = prevMonth(state.month1);
					var prevMonth2 = prevMonth(state.month2);
					if (isDateOutOfBounds(moment(prevMonth1).endOf('month').startOf('day').toDate()))
						return;
					showMonth(prevMonth2, 'month2');
					showMonth(prevMonth1, 'month1');
					showSelectedDays();
				}
				state.wrapper.delegate('.day', 'click', function (evt) {
					dayClicked($(this));
				});
				state.wrapper.delegate('.day', 'mouseenter', function (evt) {
					dayHovering($(this));
				});
				state.wrapper.delegate('.week-number', 'click', function (evt) {
					weekNumberClicked($(this));
				});
				state.wrapper.delegate('.week-number', 'mouseenter', function (evt) {
					weekNumberHovering($(this));
				});
				state.wrapper.attr('unselectable', 'on')
				.css('user-select', 'none')
				.bind('selectstart', function (e) {
					e.preventDefault();
					return false;
				});
				state.wrapper.find('.apply-btn').click(function () {
					applyAndClose();
				});
				state.wrapper.find('[shortcut]').click(function () {
					var shortcut = $(this).attr('shortcut');
					var now = moment().startOf('day');
					var startDate;
					var endDate;
					var dir;
					if (shortcut.indexOf('day') != -1) {
						var day = parseInt(shortcut.split(',', 2)[1]);
						if (day == 0) {
							clearSelection();
							resetMonthsView();
						} else {
							startDate = now.clone().add(day > 0 ? 1 : -1, 'day').toDate();
							endDate = now.add(day, 'day').toDate();
						}
					} else if (shortcut.indexOf('week') != -1) {
						var dir = shortcut.indexOf('prev,') == -1;
						if (dir) {
							startDate = now.day(opt.startOfWeek ? 8 : 7).toDate();
						} else {
							startDate = now.day(opt.startOfWeek ? -6 : -7).toDate();
						}
						endDate = now.clone().day(opt.startOfWeek ? 7 : 6).toDate();
					} else if (shortcut.indexOf('month') != -1) {
						var dir = shortcut.indexOf('prev,') == -1;
						if (dir) {
							startDate = now.add(1, 'month').date(1).toDate();
						} else {
							startDate = now.subtract(1, 'month').date(1).toDate();
						}
						endDate = now.clone().endOf('month').startOf('day').toDate();
					} else if (shortcut.indexOf('year') != -1) {
						var dir = shortcut.indexOf('prev,') == -1;
						if (dir) {
							startDate = now.add(1, 'year').month(0).date(1).toDate();
						} else {
							startDate = now.subtract(1, 'year').month(0).date(1).toDate();
						}
						endDate = now.clone().endOf('year').startOf('day').toDate();
					} else if (shortcut == 'custom') {
						var name = $(this).text();
						var sh = opt.shortcuts.custom[name];
						var data = typeof sh === 'function' ? sh(now) : sh;
						if (data && data.length == 2) {
							startDate = data[0];
							endDate = data[1];
						}
						// if only one date is specified then just move calendars there
						// move calendars to show this date's month and next months
						if (data && data.length == 1) {
							var movetodate = data[0];
							showMonth(movetodate, 'month1');
							showGap();
						}
					}
					if (startDate && endDate) {
						setDateRange(startDate, endDate);
					}
				});

				if (!opt.alwaysOpen) {
					//if user click other place of the webpage, close date range picker window
					$(document).bind('click.DRPEx', defocusClick);
				}
			}
			function statusCheck(initialized) {
				if (!state.wrapper) {
					if (state.wrapper !== undefined)
						throw new Error('Already destroyed');
					if (initialized)
						throw new Error('Not yet initialized');
				}
			}
			function ResolveLocalizer(locale) {
				var localizer = $.DRPExLang[locale];
				// Resolve aliases
				while (localizer.constructor === String) {
					locale = localizer;
					localizer = $.DRPExLang[localizer];
				}
				return [locale, localizer];
			}
			function localize(t) {
				return state.localizer[t] || state.fblocalizer[t] || '??';
			}
			function RangeReverseCheck(range) {
				if (range.start && range.end)
					if (moment(range.start).isAfter(moment(range.end))) {
						var temp = range.end;
						range.end = range.start;
						range.start = temp;
					}
			}
			function IsClickContained(evt, container) {
				return container.contains(evt.target) || evt.target == container;
				//(container.childNodes != undefined && $.inArray(evt.target, container.childNodes) >= 0);
			}
			function defocusClick(evt) {
				if (!IsClickContained(evt, state.anchor[0]) && !IsClickContained(evt, state.wrapper[0])) {
					if (state.active) {
						closeDatePicker(opt.animationTime);
					}
				}
			}
			function calcPosition() {
				if (state.active) {
					var anchorO = state.anchor.offset();
					var anchorW = state.anchor.outerWidth();
					var anchorH = state.anchor.outerHeight();
					anchorO['right'] = anchorO.left + anchorW;
					anchorO['bottom'] = anchorO.top + anchorH;
					var continerO = state.wrapper.offset();
					var continerW = state.wrapper.outerWidth();
					var continerH = state.wrapper.outerHeight();
					continerO['right'] = continerO.left + continerW;
					continerO['bottom'] = continerO.top + continerH;
					var vpO = {
						top : $(window).scrollTop(),
						left : $(window).scrollLeft()
					};
					var vpW = $(window).width();
					var vpH = $(window).height();
					vpO['right'] = vpO.left + vpW;
					vpO['bottom'] = vpO.top + vpH;

					if ((continerO.left >= vpO.left && continerO.right <= vpO.right) &&
						(continerO.top >= vpO.top && continerO.bottom <= vpO.bottom) &&
						(continerO.left == anchorO.left && (continerO.top == anchorO.bottom || state.wrapper.bottom == anchorO.top)))
						return false;

					var newLeft = (anchorO.left + continerW <= vpO.right ?
						Math.max(anchorO.left, vpO.left) : Math.max(vpO.left, vpO.right - continerW));

					var DropDown = (anchorO.bottom + continerH <= vpO.bottom || anchorO.top - continerH < vpO.top);
					var VDist;
					if (DropDown) {
						var newTop = Math.max(anchorO.bottom, vpO.top);
						state.wrapper.css({
							top : newTop,
							bottom : 'auto',
							left : newLeft
						});
						VDist = newTop - anchorO.bottom;
					} else {
						var bodyH = $('body').outerHeight();
						var newBotTop = Math.min(anchorO.top, vpO.bottom);
						state.wrapper.css({
							top : 'auto',
							bottom : bodyH - newBotTop,
							left : newLeft
						});
						VDist = anchorO.top - newBotTop;
					}
					state.wrapper.css({
						opacity : 0.3 + 0.7 / Math.log2(2 + (VDist >> 7))
					});
					return true;
				}
			}
			function openDatePicker(duration) {
				if (!state.active) {
					if (!state.wrapper)
						_init();

					state.active = true;
					// Temporarily toggle display style for accurate dimension calculations
					state.wrapper.css({
						display : 'block',
						visibility : 0
					});
					checkAndSetDate();
					updateCalendarWidth();
					if (!opt.container) {
						calcPosition();
					}
					state.wrapper.css({
						display : 'none',
						visibility : 'initial'
					});

					var afterAnim = function () {
						state.anchor.trigger('DRPEx-opened', {
							relatedTarget : state.wrapper
						});
					};
					if (opt.customOpenAnimation) {
						opt.customOpenAnimation.call(state.wrapper[0], afterAnim);
					} else {
						state.wrapper.slideDown(duration, afterAnim);
					}
					state.anchor.trigger('DRPEx-open', {
						relatedTarget : state.wrapper
					});
					if (!opt.container)
						$(window).bind('resize.DRPEx scroll.DRPEx', calcPosition);
					if (opt.watchValueChange) {
						var domChangeTimer = null;
						state.anchor.bind('input.DRPEx', function () {
							clearTimeout(domChangeTimer);
							domChangeTimer = setTimeout(function () {
									domChangeTimer = null;
									var Values = parseStringDates(opt.getValue.call(state.anchor[0]));
									if (Values)
										applyDates(Values, true);
								}, 200);
						});
					}
					return true;
				}
				return false;
			}
			function closeDatePicker(duration) {
				if (!opt.alwaysOpen && state.active) {
					state.active = false;
					var afterAnim = function () {
						state.anchor.trigger('DRPEx-closed', {
							relatedTarget : state.wrapper
						});
					};
					if (opt.customCloseAnimation) {
						opt.customCloseAnimation.call(state.wrapper[0], afterAnim);
					} else {
						state.wrapper.slideUp(duration, afterAnim);
					}
					state.anchor.trigger('DRPEx-close', {
						relatedTarget : state.wrapper
					});
					if (!opt.container)
						$(window).unbind('resize.DRPEx scroll.DRPEx', calcPosition);
					if (opt.watchValueChange)
						state.anchor.unbind('input.DRPEx');
					return true;
				}
				return false;
			}
			function parseStringDates(str) {
				var vals = (str && str.constructor == String) ? str.trim() : undefined;
				if (vals) {
					vals = str.split(opt.separator);

					var vidx = 0;
					while (vidx < vals.length) {
						var parsed = moment(vals[vidx], opt.format, moment.locale(opt.language));
						if (!parsed.isValid())
							break;
						vals[vidx] = parsed.toDate();

						if (++vidx >= 2)
							break;
						if (opt.singleDate)
							break;
					}
					if (vidx != vals.length) {
						if (vidx > 0) {
							vals.splice(vidx);
						} else {
							vals = undefined;
						}
					}
				}
				return vals;
			}
			function applyDates(vals, silent) {
				setDateRange(vals[0], vals.length > 1 ? vale[1] : vals[0], silent);
			}
			function checkAndSetDate() {
				var Values = parseStringDates(opt.getValue.call(state.anchor[0]));
				if (Values)
					applyDates(Values, true);
				resetMonthsView();
			}
			function updateCalendarWidth() {
				var gapMargin = state.wrapper.find('.gap').css('margin-left');
				var w1 = state.wrapper.find('.month1').width();
				var w2 = state.wrapper.find('.gap').width() + (gapMargin ? parseInt(gapMargin) * 2 : 0);
				var w3 = state.wrapper.find('.month2').width();
				var calendarWidth = w1 + w2 + w3 + 2;
				state.wrapper.find('.month-wrapper').width(calendarWidth);
				var w4 = state.wrapper.find('.drp_top-bar input').outerWidth();
				state.wrapper.find('.drp_top-bar div').width(calendarWidth - w4 - 2);
			}
			function clearSelection() {
				if (state.selRange.start || state.selRange.end) {
					state.selRange.start = false;
					state.selRange.end = false;
					state.wrapper.find('.day.checked').removeClass('checked');
					state.wrapper.find('.day.range-end').removeClass('range-end');
					state.wrapper.find('.day.range-start').removeClass('range-start');
					checkSelectionValid();
					showSelectedInfo();
					showSelectedDays();
					state.anchor.trigger('DRPEx-change', {});
					return true;
				}
				return false;
			}
			function handleStart(time) {
				var r = time;
				if (opt.batchMode === 'week-range') {
					r = moment(time).day(opt.startOfWeek ? 1 : 0).valueOf();
				} else if (opt.batchMode === 'month-range') {
					r = moment(time).startOf('month').valueOf();
				}
				return r;
			}
			function handleEnd(time) {
				var r = time;
				if (opt.batchMode === 'week-range') {
					r = moment(time).day(opt.startOfWeek ? 7 : 6).valueOf();
				} else if (opt.batchMode === 'month-range') {
					r = moment(time).endOf('month').startOf('day').valueOf();
				}
				return r;
			}
			function dayClicked(day) {
				if (state.selWeek)
					return;
				if (!day.hasClass('valid') || day.hasClass('unselectable'))
					return;
				var time = parseInt(day.attr('SOD-time'));
				day.addClass('checked');
				if (opt.singleDate) {
					state.selRange.start = time;
					state.selRange.end = time;
				} else if (opt.batchMode === 'week') {
					state.selRange.start = moment(time).day(opt.startOfWeek ? 1 : 0).valueOf();
					state.selRange.end = moment(time).day(opt.startOfWeek ? 7 : 6).valueOf();
				} else if (opt.batchMode === 'weekdays') {
					state.selRange.start = moment(time).day(1).valueOf();
					state.selRange.end = moment(time).day(5).valueOf();
				} else if (opt.batchMode === 'weekends') {
					state.selRange.start = moment(time).day(6).valueOf();
					state.selRange.end = moment(time).day(7).valueOf();
				} else if (opt.batchMode === 'month') {
					state.selRange.start = moment(time).startOf('month').valueOf();
					state.selRange.end = moment(time).endOf('month').startOf('day').valueOf();
				} else if ((state.selRange.start && state.selRange.end) ||
					(!state.selRange.start && !state.selRange.end)) {
					state.selRange.start = handleStart(time);
					state.selRange.end = false;
				} else if (state.selRange.start) {
					state.selRange.end = handleEnd(time);
				}
				//In case the start is after the end, swap the timestamps
				RangeReverseCheck(state.selRange);

				clearHovering();
				if (state.selRange.start && !state.selRange.end) {
					var dateRange = getDateString(state.selRange.start);
					state.anchor.trigger('DRPEx-first-date', {
						'value' : dateRange,
						'date1' : new Date(state.selRange.start)
					});
					dayHovering(day);
					state.wrapper.find('.week-number').removeClass('week-ranged');
				}
				updateSelectableRange(time);
				if (state.selWeek)
					state.selWeek = false;
				checkSelectionValid();
				showSelectedInfo();
				showSelectedDays();
				autoclose();
			}
			function weekSelectionHovering(startTime, endTime) {
				state.wrapper.find('.day').each(function () {
					var time = parseInt($(this).attr('SOD-time'));
					if (startTime == time) {
						$(this).addClass('range-start');
						$(this).removeClass('range-end');
					} else if (endTime == time) {
						$(this).removeClass('range-start');
						$(this).addClass('range-end');
					} else {
						$(this).removeClass('range-start');
						$(this).removeClass('range-end');
					}
					if (startTime <= time && endTime >= time) {
						$(this).addClass('hovering');
					} else {
						$(this).removeClass('hovering');
					}
				});
			}
			function weekNumberClicked(week) {
				if (opt.singleDate)
					return;
				if ((state.selRange.start) && (!state.selRange.end) && (!state.selWeek))
					return;
				if (!week.hasClass('valid') || week.hasClass('unselectable'))
					return;
				var thisTime = parseInt(week.attr('SOW-time'));
				if (!state.selWeek) {
					state.selWeek = thisTime;
					var date = new Date(thisTime);
					state.selRange.start = moment(date).day(opt.startOfWeek ? 1 : 0).valueOf();
					state.selRange.end = false;

					var endTime = moment(date).day(opt.startOfWeek ? 7 : 6).valueOf();
					state.wrapper.find('.day.checked').removeClass('checked');
					weekSelectionHovering(state.selRange.start, endTime);
					state.wrapper.find('.week-ranged').removeClass('week-ranged');
					week.addClass('week-ranged');

					updateSelectableRange();
					checkSelectionValid();
					showSelectedInfo();
				} else {
					clearHovering();
					var date1 = new Date(thisTime < state.selWeek ? thisTime : state.selWeek);
					var date2 = new Date(thisTime < state.selWeek ? state.selWeek : thisTime);
					state.selWeek = false;
					state.selRange.start = moment(date1).day(opt.startOfWeek ? 1 : 0).valueOf();
					state.selRange.end = moment(date2).day(opt.startOfWeek ? 7 : 6).valueOf();

					checkSelectionValid();
					showSelectedInfo();
					showSelectedDays();
					autoclose();
				}
			}
			function weekNumberHovering(week) {
				if (!state.selWeek)
					return;
				if (opt.singleDate)
					return;
				var thisTime = parseInt(week.attr('SOW-time'));
				if (thisTime >= state.selWeek) {
					var date = new Date(thisTime);
					var endTime = moment(date).day(opt.startOfWeek ? 7 : 6).valueOf();
					weekSelectionHovering(state.selRange.start, endTime);
				} else {
					var date1 = new Date(thisTime);
					var date2 = new Date(state.selWeek);
					var startTime = moment(date1).day(opt.startOfWeek ? 1 : 0).valueOf();
					var endTime = moment(date2).day(opt.startOfWeek ? 7 : 6).valueOf();
					weekSelectionHovering(startTime, endTime);
				}
			}
			function isValidTime(time) {
				if (isDateOutOfBounds(time))
					return false;
				if (!opt.singleDate) {
					//check maxDays and minDays setting
					if ((opt.maxDays > 0 && countDays(time, state.selRange.start) > opt.maxDays) ||
						(opt.minDays > 0 && countDays(time, state.selRange.start) < opt.minDays))
						return false;
					//check selectForward and selectBackward
					if ((opt.selectForward && time < state.selRange.start) ||
						(opt.selectBackward && time > state.selRange.start))
						return false;
				}
				//check disabled days
				if (opt.beforeShowDay) {
					var dayCursor = moment(time);
					while (compareDay(dayCursor, state.selRange.start)) {
						var arr = opt.beforeShowDay(dayCursor.toDate());
						if (arr[0] === false)
							return false;
						dayCursor.add(time < state.selRange.start ? 1 : -1, 'day');
					}
					return opt.beforeShowDay(dayCursor.toDate())[0] !== false;
				}
				return true;
			}
			function updateSelectableRange() {
				state.wrapper.find('.unselectable').removeClass('unselectable');
				if (state.selRange.start) {
					if (!state.selRange.end) {
						state.wrapper.find('.day.toMonth.valid').each(function () {
							var time = parseInt($(this).attr('SOD-time'));
							if (!isValidTime(time))
								$(this).addClass('unselectable');
						});
						state.wrapper.find('.week-number.valid').each(function () {
							var time = parseInt($(this).attr('SOW-time'));
							if (time >= state.selRange.start)
								time = moment(time).day(opt.startOfWeek ? 7 : 6).toDate();
							if (!isValidTime(time))
								$(this).addClass('unselectable');
						});
					} else {
						state.wrapper.find('.day.toMonth.valid').each(function () {
							var time = parseInt($(this).attr('SOD-time'));
							if ((time >= state.selRange.start) && (time <= state.selRange.end))
								if (!isValidTime(time))
									$(this).addClass('unselectable');
						});
						state.wrapper.find('.week-number.valid').each(function () {
							var time = parseInt($(this).attr('SOW-time'));
							if (time >= state.selRange.start) {
								time = moment(time).day(opt.startOfWeek ? 7 : 6).toDate();
								if (time <= state.selRange.end)
									if (!isValidTime(time))
										$(this).addClass('unselectable');
							}
						});
					}
				}
				return true;
			}
			function dayHovering(day) {
				if (state.selWeek)
					return;
				var hoverTime = parseInt(day.attr('SOD-time'));
				var tooltip = '';
				if (day.hasClass('has-tooltip') && day.attr('data-tooltip')) {
					tooltip = '<span style="white-space:nowrap">' + day.attr('data-tooltip') + '</span>';
				} else if (day.hasClass('valid') && !day.hasClass('unselectable')) {
					if (opt.singleDate) {
						state.wrapper.find('.day.hovering').removeClass('hovering');
						day.addClass('hovering');
					} else {
						state.wrapper.find('.day').each(function () {
							var time = parseInt($(this).attr('SOD-time'));
							if (time == hoverTime) {
								$(this).addClass('hovering');
							} else {
								$(this).removeClass('hovering');
							}
							if ((state.selRange.start && !state.selRange.end) &&
								((state.selRange.start < time && hoverTime >= time) ||
									(state.selRange.start > time && hoverTime <= time))) {
								$(this).addClass('hovering');
							} else {
								$(this).removeClass('hovering');
							}
						});
						if (state.selRange.start && !state.selRange.end) {
							var days = countDays(hoverTime, state.selRange.start);
							if (opt.hoveringTooltip) {
								if (typeof opt.hoveringTooltip == 'function') {
									tooltip = opt.hoveringTooltip(days, state.selRange.start, hoverTime);
								} else if (opt.hoveringTooltip === true && days > 1) {
									tooltip = days + ' ' + localize('days');
								}
							}
						}
					}
				}
				if (tooltip) {
					var posDay = day.offset();
					var posBox = state.wrapper.offset();
					var _left = posDay.left - posBox.left;
					var _top = posDay.top - posBox.top;
					_left += day.width() / 2;
					var $tip = state.wrapper.find('.date-range-length-tip');
					var w = $tip.css({
							'visibility' : 'hidden',
							'display' : 'none'
						}).html(tooltip).width();
					var h = $tip.height();
					_left -= w / 2;
					_top -= h;
					$tip.css({
						left : _left,
						top : _top,
						display : 'block',
						'visibility' : 'visible'
					});
				} else {
					state.wrapper.find('.date-range-length-tip').hide();
				}
			}
			function clearHovering() {
				state.wrapper.find('.day.hovering').removeClass('hovering');
				state.wrapper.find('.date-range-length-tip').hide();
			}
			function applyAndClose() {
				if (state.selRange.start && state.selRange.end) {
					var dateRangeStr,
					startDateStr,
					endDateStr;
					if (opt.singleDate) {
						dateRangeStr = getDateString(state.selRange.start)
							state.anchor.trigger('DRPEx-apply', {
								'value' : dateRangeStr,
								'date1' : new Date(state.selRange.start)
							});
					} else {
						startDateStr = getDateString(state.selRange.start);
						endDateStr = getDateString(state.selRange.end),
						dateRangeStr = startDateStr + opt.separator + endDateStr;
						state.anchor.trigger('DRPEx-apply', {
							'value' : dateRangeStr,
							'date1' : [new Date(state.selRange.start), startDateStr],
							'date2' : [new Date(state.selRange.end), endDateStr]
						});
					}
					opt.setValue.call(state.anchor[0], dateRangeStr, startDateStr, endDateStr);
				}
				closeDatePicker(opt.animationTime);
			}
			function autoclose() {
				if (opt.autoClose && state.selRange.start) {
					if (opt.singleDate || state.selRange.end)
						applyAndClose();
				}
			}
			function checkSelectionValid() {
				var valid = true;
				var days = (state.selRange.start && state.selRange.end) ?
				countDays(state.selRange.start, state.selRange.end) : NaN;
				if (opt.singleDate) { // Validate if only start is there
					if (!state.selRange.start)
						valid = undefined;
				} else if (opt.maxDays && days > opt.maxDays) {
					var msg = localize('less-than').replace('%d', opt.maxDays);
					state.wrapper.find('.drp_top-bar .error-top').html(msg).attr('title', msg);
					valid = false;
				} else if (opt.minDays && days < opt.minDays) {
					var msg = localize('more-than').replace('%d', opt.minDays);
					state.wrapper.find('.drp_top-bar .error-top').html(msg).attr('title', msg);
					valid = false;
				} else {
					if (isNaN(days))
						valid = undefined;
				}
				if (valid) {
					if (isDateOutOfBounds(state.selRange.start)) {
						var msg = localize('range-start-bound');
						state.wrapper.find('.drp_top-bar .error-top').html(msg).attr('title', msg);
						valid = false;
					} else if (isDateOutOfBounds(state.selRange.end)) {
						var msg = localize('range-end-bound');
						state.wrapper.find('.drp_top-bar .error-top').html(msg).attr('title', msg);
						valid = false;
					}
				}
				if (valid && opt.batchMode) {
					var mStart = moment(state.selRange.start);
					var mEnd = moment(state.selRange.end);
					switch (opt.batchMode) {
					case 'week':
						if (!mStart.isSame(mStart.clone().day(opt.startOfWeek ? 1 : 0)) ||
							!mEnd.isSame(mStart.clone().day(opt.startOfWeek ? 7 : 6)))
							valid = false;
						break;
					case 'weekdays':
						if (!mStart.isSame(mStart.clone().day(1)) ||
							!mEnd.isSame(mStart.clone().day(5)))
							valid = false;
						break;
					case 'weekends':
						if (!mStart.isSame(mStart.clone().day(6)) ||
							!mEnd.isSame(mStart.clone().day(0)))
							valid = false;
						break;
					case 'month':
						if (!mStart.isSame(mStart.clone().startOf('month')) ||
							!mEnd.isSame(mStart.clone().endOf('month').startOf('day')))
							valid = false;
						break;
					case 'week-range':
						if (!mStart.isSame(mStart.clone().day(opt.startOfWeek ? 1 : 0)) ||
							!mEnd.isSame(mEnd.clone().day(opt.startOfWeek ? 7 : 6)))
							valid = false;
						break;
					case 'month-range':
						if (!mStart.isSame(mStart.clone().startOf('month')) ||
							!mEnd.isSame(mEnd.clone().endOf('month').startOf('day')))
							valid = false;
						break;
					default:
						throw new Error('Unrecognized batch mode - ' + opt.batchMode);
					}
					if (!valid) {
						var msg = localize('batch-invalid').replace('%s', opt.batchMode);
						state.wrapper.find('.drp_top-bar .error-top').html(msg).attr('title', msg);
					}
				}
				if (valid) {
					valid = isValidTime(state.selRange.end);
					if (!valid) {
						var msg = localize('disabled-range');
						state.wrapper.find('.drp_top-bar .error-top').html(msg).attr('title', msg);
					}
				}
				if (valid) {
					state.wrapper.find('.drp_top-bar').removeClass('error').addClass('normal');
					state.wrapper.find('.apply-btn').removeClass('disabled').val(localize('apply-enabled'));
				} else {
					if (valid == undefined) {
						state.wrapper.find('.drp_top-bar').removeClass('error').addClass('normal');
					} else {
						state.wrapper.find('.drp_top-bar').addClass('error').removeClass('normal');
					}
					state.wrapper.find('.apply-btn').addClass('disabled').val(localize('apply-disabled'));
				}
				return valid;
			}
			function showSelectedInfo(silent) {
				state.wrapper.find('.start-day').html('...');
				state.wrapper.find('.end-day').html('...');
				state.wrapper.find('.selected-days').hide();

				if (state.selRange.start) {
					state.wrapper.find('.start-day').html(getDateString(state.selRange.start));
				}
				if (state.selRange.end) {
					state.wrapper.find('.end-day').html(getDateString(state.selRange.end));
				}

				if (state.selRange.start && opt.singleDate) {
					if (!silent) {
						state.anchor.trigger('DRPEx-change', {
							'date1' : new Date(state.selRange.start)
						});
					}
				} else if (state.selRange.start && state.selRange.end) {
					state.wrapper.find('.selected-days').show()
					.find('.selected-days-num').html(countDays(state.selRange.end, state.selRange.start));
					if (!silent) {
						state.anchor.trigger('DRPEx-change', {
							'date1' : new Date(state.selRange.start),
							'date2' : new Date(state.selRange.end)
						});
					}
				}

				var normalmsg = state.wrapper.find('.drp_top-bar .normal-top');
				normalmsg.attr('title', normalmsg.text());
			}
			function setDateRange(date1, date2, silent) {
				var range = {
					start : date1,
					end : date2
				};
				RangeReverseCheck(range);
				if (state.selRange.start != range.start.getTime() || state.selRange.end != range.end.getTime()) {
					state.selRange.start = range.start.getTime();
					state.selRange.end = range.end.getTime();
					if (opt.stickyMonths || (compareDay(range.start, range.end) > 0 &&
							compareMonth(range.start, range.end) === 0)) {
						if (opt.lookBehind) {
							range.start = prevMonth(range.end);
						} else {
							range.end = nextMonth(range.start);
						}
					}
					if (opt.stickyMonths) {
						if (opt.dateRange.end !== false && compareMonth(range.end, opt.dateRange.end) > 0) {
							range.start = prevMonth(range.start);
							range.end = prevMonth(range.end);
						}
					} else {
						if (compareMonth(range.start, range.end) === 0) {
							if (opt.lookBehind) {
								range.start = prevMonth(range.end);
							} else {
								range.end = nextMonth(range.start);
							}
						}
					}
					showMonth(range.start, 'month1');
					showMonth(range.end, 'month2');
					showGap();

					checkSelectionValid();
					showSelectedInfo(silent);
					showSelectedDays();
				}
				if (!silent)
					autoclose();
			}
			function showSelectedDays() {
				if (!state.selRange.start && !state.selRange.end)
					return;
				state.wrapper.find('.day').each(function () {
					var time = parseInt($(this).attr('SOD-time'));
					if ((state.selRange.end && state.selRange.end >= time && state.selRange.start <= time) ||
						(!state.selRange.end && state.selRange.start == time)) {
						$(this).addClass('checked');
					} else {
						$(this).removeClass('checked');
					}
					//add range-start class name to the first date selected
					if (state.selRange.start == time) {
						$(this).addClass('range-start');
					} else {
						$(this).removeClass('range-start');
					}
					//add range-end
					if (state.selRange.end == time) {
						$(this).addClass('range-end');
					} else {
						$(this).removeClass('range-end');
					}
				});
				state.wrapper.find('.week-number').each(function () {
					if (parseInt($(this).attr('SOW-time')) == state.selWeek) {
						$(this).addClass('week-ranged');
					}
				});
				if (state.selRange.end) {
					state.wrapper.find('.week-number').each(function () {
						var weekdate = new Date(parseInt($(this).attr('SOW-time')));
						var startTime = moment(weekdate).day(opt.startOfWeek ? 1 : 0).valueOf();
						var endTime = moment(weekdate).day(opt.startOfWeek ? 7 : 6).valueOf();
						if ((startTime >= state.selRange.start) && (endTime <= state.selRange.end)) {
							$(this).addClass('week-ranged');
						} else {
							$(this).removeClass('week-ranged');
						}
					});
				}
			}
			function showMonth(date, month) {
				date = moment(date).startOf('month').toDate();
				state.wrapper.find('.' + month + ' .month-name').html(nameMonth(date));
				state.wrapper.find('.' + month + ' tbody').html(createMonthHTML(date));
				state[month] = date;
				updateSelectableRange();
			}
			function nameMonth(d) {
				state.formatter.toDate().setTime(d);
				return state.formatter.format(state.monthFormat);
			}
			function getDateString(d) {
				state.formatter.toDate().setTime(d);
				return state.formatter.format(opt.format);
			}
			function showGap() {
				if (compareMonth(state.month2, state.month1) > 1) {
					state.wrapper.addClass('has-gap').removeClass('no-gap').find('.gap').css('visibility', 'visible');
				} else {
					state.wrapper.removeClass('has-gap').addClass('no-gap').find('.gap').css('visibility', 'hidden');
				}
				var h1 = state.wrapper.find('table.month1').height();
				var h2 = state.wrapper.find('table.month2').height();
				state.wrapper.find('.gap').height(Math.max(h1, h2) + 10);
			}
			function redrawDatePicker() {
				showMonth(state.month1, 'month1');
				showMonth(state.month2, 'month2');
			}
			function getDefaultTime() {
				var defaultTime = opt.defaultTime ? opt.defaultTime : new Date();
				if (opt.dateRange.start && compareMonth(defaultTime, opt.dateRange.start) < 0) {
					defaultTime = moment(opt.dateRange.start).toDate();
				} else if (opt.dateRange.end && compareMonth(defaultTime, opt.dateRange.end) > 0)
					defaultTime = prevMonth(moment(opt.dateRange.end).toDate());
				return defaultTime;
			}
			function resetMonthsView() {
				var startTS = state.selRange.start;
				var endTS = state.selRange.end;
				if (!startTS) {
					startTS = getDefaultTime();
					endTS = nextMonth(startTS);
				} else {
					if (compareMonth(startTS, endTS) == 0) {
						if (opt.lookBehind) {
							if (opt.dateRange.start && compareMonth(startTS, opt.dateRange.start) > 0)
								startTS = prevMonth(startTS);
						} else
							endTS = nextMonth(endTS);
					}
				}
				showMonth(startTS, 'month1');
				showMonth(endTS, 'month2');
				showGap();
				showSelectedDays();
			}

			function compareMonth(m1, m2) {
				return moment(m1).startOf('month').diff(moment(m2).startOf('month'), 'month');
			}
			function compareDay(m1, m2) {
				return moment(m1).diff(moment(m2), 'day');
			}
			function countDays(start, end) {
				return Math.abs(compareDay(start, end)) + 1;
			}
			function nextMonth(month) {
				return moment(month).add(1, 'month').toDate();
			}
			function prevMonth(month) {
				return moment(month).add(-1, 'month').toDate();
			}

			// Open tag: content === undefined
			// Open+Close: content.constructor === String
			function tagGen(name, attrs, content) {
				var Ret = '<' + name;
				if (attrs) {
					$.each(attrs, function (attrKey, attrVal) {
						Ret += ' ' + attrKey + '="' + attrVal + '"';
					});
					if (content !== undefined)
						Ret += (content ? '>' + content + '</' + name : '/');
				}
				return Ret + '>';
			}
			function createDom() {
				var html =
					tagGen('div', {
						'class' : 'date-picker-wrapper'
						 + (!opt.haveTopbar ? ' no-topbar ' : (opt.customTopBar ? ' custom-topbar' : ''))
						 + (opt.inline ? ' inline-wrapper' : '')
					});
				if (opt.haveTopbar) {
					html += tagGen('div', {
						'class' : 'drp_top-bar'
					});
					if (opt.customTopBar) {
						html += tagGen('div', {
							'class' : 'custom-top'
						}, (typeof opt.customTopBar == 'function' ? opt.customTopBar() : opt.customTopBar));
					} else {
						html += tagGen('div', {
							'class' : 'normal-top'
						})
						 + tagGen('span', {}, localize('selected'))
						 + ' ' + tagGen('b', {
							'class' : 'start-day'
						}, '(Start day)');
						if (!opt.singleDate) {
							html += tagGen('span', {
								'class' : 'separator-day'
							}, opt.separator)
							 + tagGen('b', {
								'class' : 'end-day'
							}, '(End day)')
							 + tagGen('i', {
								'class' : 'selected-days'
							}) + ' ('
							 + tagGen('span', {
								'class' : 'selected-days-num'
							}, 'X') + ' ' + localize('days') + ')'
							 + tagGen('/i');
						}
						html += tagGen('/div');

						html += tagGen('div', {
							'class' : 'error-top'
						}, 'Error message')
						 + tagGen('div', {
							'class' : 'default-top'
						}, 'Default message');
					}
					html += tagGen('input', {
						type : 'button',
						value : localize('apply-disabled'),
						'class' : 'apply-btn'
						 + ' disabled'
						 + (opt.autoClose ? ' hide' : '')
						 + (opt.applyBtnClass ? ' ' + opt.applyBtnClass : '')
					}, '');
					html += tagGen('/div');
				}

				html += tagGen('div', {
					'class' : 'month-wrapper'
				});
				var weekHeadGen = function () {
					var Ret = '';
					if (opt.showWeekNumbers)
						Ret += tagGen('th', {}, localize('week-number'));
					if (opt.startOfWeek) {
						Ret += tagGen('th', {}, localize('week-1'))
						 + tagGen('th', {}, localize('week-2'))
						 + tagGen('th', {}, localize('week-3'))
						 + tagGen('th', {}, localize('week-4'))
						 + tagGen('th', {}, localize('week-5'))
						 + tagGen('th', {}, localize('week-6'))
						 + tagGen('th', {}, localize('week-7'));
					} else {
						Ret += tagGen('th', {}, localize('week-7'))
						 + tagGen('th', {}, localize('week-1'))
						 + tagGen('th', {}, localize('week-2'))
						 + tagGen('th', {}, localize('week-3'))
						 + tagGen('th', {}, localize('week-4'))
						 + tagGen('th', {}, localize('week-5'))
						 + tagGen('th', {}, localize('week-6'));
					}
					return Ret;
				}
				var tableGen = function (cls) {
					var Ret = tagGen('table', {
							'class' : cls,
							cellspacing : '0',
							border : '0',
							cellpadding : '0'
						});
					Ret += tagGen('thead')
					 + tagGen('tr', {
						'class' : 'caption'
					})
					 + tagGen('th', {
						'class' : 'button'
					},
						tagGen('span', {
							'class' : 'prev'
						}, opt.customArrowPrevSymbol || '&lt;'))
					 + tagGen('th', {
						'class' : 'month-name',
						colspan : opt.showWeekNumbers ? 6 : 5
					}, '(Month)')
					 + tagGen('th', {
						'class' : 'button'
					},
						tagGen('span', {
							'class' : 'next'
						}, opt.customArrowNextSymbol || '&gt;'))
					 + tagGen('/tr')
					 + tagGen('tr', {
						'class' : 'week-name'
					}, weekHeadGen())
					 + tagGen('/thead');

					return Ret + tagGen('tbody', {}, '') + tagGen('/table');
				};
				html += tableGen('month1');
				if (!opt.singleMonth) {
					var gapGen = function () {
						var Ret = tagGen('div', {
								'class' : 'gap'
							})
							 + tagGen('div', {
								'class' : 'gap-top-mask'
							}, '')
							 + tagGen('div', {
								'class' : 'gap-bottom-mask'
							}, '')
							 + tagGen('div', {
								'class' : 'gap-lines'
							});
						for (var i = 0; i < 20; i++) {
							Ret += tagGen('div', {
								'class' : 'gap-line'
							}, tagGen('div', {
									'class' : 'gap-1'
								}, '')
								 + tagGen('div', {
									'class' : 'gap-2'
								}, '')
								 + tagGen('div', {
									'class' : 'gap-3'
								}, ''));
						}
						return Ret + tagGen('/div') + tagGen('/div');
					};
					html += gapGen() + tableGen('month2');
				}
				html += tagGen('div', {
					'class' : 'spacer'
				}, '')
				 + tagGen('/div');

				html += tagGen('div', {
					'class' : 'footer'
				});

				var shortcutGen = function () {
					var Ret = '';
					var data = opt.shortcuts;
					if (data['prev-days'] && data['prev-days'].length > 0) {
						Ret += tagGen('span', {
							'class' : 'prev-days'
						}) + localize('past');
						for (var i = 0; i < data['prev-days'].length; i++) {
							var ndays = data['prev-days'][i];
							Ret += tagGen('span', {
								'class' : 'shortcut',
								shortcut : 'day,-' + ndays
							}, ndays + ' ' + (ndays > 1 ? localize('days') : localize('day')));
						}
						Ret += tagGen('/span');
					}
					if (data['next-days'] && data['next-days'].length > 0) {
						Ret += tagGen('span', {
							'class' : 'next-days'
						}) + localize('following');
						for (var i = 0; i < data['next-days'].length; i++) {
							var ndays = data['next-days'][i];
							Ret += tagGen('span', {
								'class' : 'shortcut',
								shortcut : 'day,+' + ndays
							}, ndays + ' ' + (ndays > 1 ? localize('days') : localize('day')));
						}
						Ret += tagGen('/span');
					}
					if (data.prev && data.prev.length > 0) {
						Ret += tagGen('span', {
							'class' : 'prev-buttons'
						}) + localize('previous');
						for (var i = 0; i < data.prev.length; i++) {
							var span = data.prev[i];
							Ret += tagGen('span', {
								'class' : 'shortcut',
								shortcut : 'prev,' + span
							}, localize('prev-' + span));
						}
						Ret += tagGen('/span');
					}
					if (data.next && data.next.length > 0) {
						Ret += tagGen('span', {
							'class' : 'next-buttons'
						}) + localize('next');
						for (var i = 0; i < data.next.length; i++) {
							var span = data.next[i];
							Ret += tagGen('span', {
								'class' : 'shortcut',
								shortcut : 'next,' + span
							}, localize('next-' + span));
						}
						Ret += tagGen('/span');
					}
					if (data.custom && !$.isEmptyObject(data.custom)) {
						Ret += tagGen('span', {
							'class' : 'custom-buttons'
						});
						for (var key in data.custom) {
							Ret += tagGen('span', {
								'class' : 'shortcut',
								shortcut : 'custom'
							}, key);
						}
						Ret += tagGen('/span');
					}
					return Ret;
				};

				var shortcutHTML = shortcutGen();
				html += tagGen('div', {
					'class' : 'shortcuts'
					 + (shortcutHTML ? '' : ' none')
				}, tagGen('b', {}, localize('shortcuts')) + shortcutHTML);

				html += tagGen('/div');
				html += tagGen('div', {
					'class' : 'date-range-length-tip'
				}, '');
				html += tagGen('/div');
				return $(html);
			}
			function isDateOutOfBounds(date) {
				date = moment(date);
				return (opt.dateRange.start && date.isBefore(opt.dateRange.start)) ||
				(opt.dateRange.end && date.isAfter(opt.dateRange.end));
			}
			function createMonthHTML(d) {
				var days = [];

				d.setDate(1);
				var dayOfWeek = d.getDay();
				if ((dayOfWeek === 0) && (opt.startOfWeek)) {
					// add one week
					dayOfWeek = 7;
				}
				if (dayOfWeek > 0) {
					for (var i = dayOfWeek; i > 0; i--) {
						var day = moment(d).subtract(i, 'day').toDate();
						days.push({
							date : day,
							type : 'lastMonth',
							day : day.getDate(),
							time : day.getTime(),
							valid : !isDateOutOfBounds(day.getTime())
						});
					}
				}
				var toMonth = d.getMonth();
				for (var i = 0; i < 40; i++) {
					var today = moment(d).add(i, 'day').toDate();
					days.push({
						date : today,
						type : today.getMonth() == toMonth ? 'toMonth' : 'nextMonth',
						day : today.getDate(),
						time : today.getTime(),
						valid : !isDateOutOfBounds(today.getTime())
					});
				}
				var html = '';
				var now = moment();
				var toNow = now.diff(d, 'month', true);
				if (toNow < 0 || toNow > 1)
					now = false;
				for (var week = 0; week < 6; week++) {
					if (days[week * 7].type == 'nextMonth')
						break;
					html += tagGen('tr');
					var weekHTML = '';
					var headDay;
					var validWeek = true;
					for (var day = 0; day < 7; day++) {
						var dayIdx = week * 7 + ((opt.startOfWeek) ? day + 1 : day);
						var today = days[dayIdx];
						if (day === 0)
							headDay = today;

						today.extraClass = '';
						today.tooltip = '';
						if (today.valid) {
							if (opt.beforeShowDay) {
								var _r = opt.beforeShowDay(today.date);
								today.valid = _r[0];
								today.extraClass = _r[1] || '';
								today.tooltip = _r[2] || '';
								if (today.tooltip !== '')
									today.extraClass += ' has-tooltip ';
							}
						}
						validWeek = validWeek && today.valid;
						if (opt.startOfWeek) {
							if (day >= 5)
								today.extraClass += ' weekend ';
						} else {
							if (day == 0 || day == 6)
								today.extraClass += ' weekend ';
						}
						weekHTML += tagGen('td', {},
							tagGen('div', {
								'SOD-time' : today.time,
								'data-tooltip' : today.tooltip,
								'class' : 'day'
								 + ' ' + today.type
								 + ' ' + today.extraClass
								 + ' ' + (today.valid ? 'valid' : (today.valid === false ? 'invalid' : 'skipped'))
								 + ((now && now.date() == today.day) ? ' real-today' : '')
							}, showDayHTML(today.time, today.day)));
					}
					if (opt.showWeekNumbers) {
						html += tagGen('td', {},
							tagGen('div', {
								'class' : 'week-number'
								 + ' ' + (validWeek ? 'valid' : 'invalid'),
								'SOW-time' : headDay.time
							}, opt.getWeekNumber(headDay.date)));
					}
					html += weekHTML + tagGen('/tr');
				}
				return html;
			}
			function showDayHTML(time, day) {
				if (opt.showDateFilter && typeof opt.showDateFilter == 'function')
					return opt.showDateFilter(time, day);
				return day;
			}
		};
	}));

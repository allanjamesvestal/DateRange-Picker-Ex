$(function () {
	if (!window['console']) {
		window.console = {};
		window.console.log = function () {};
	}
	$('#add-slate').click(function () {
		$('head').append('<link rel="stylesheet" type="text/css" href="https://bootswatch.com/slate/bootstrap.min.css">');
		$('head').append('<link rel="stylesheet" type="text/css" href="src/daterangepicker.slate.delta.css" />');
	});
	$('#remove-slate').click(function () {
		$('link[rel=stylesheet][href*="slate"]').remove();
	});
	$('#date-range0').dateRangePicker({}).bind('DRPick-first-date', function (event, obj) {
		/* This event will be triggered when first date is selected */
		console.log('first-date-selected', obj);
		// obj will be something like this:
		// {
		// 		date1: (Date object of the earlier date)
		// }
	})
	.bind('DRPick-change', function (event, obj) {
		/* This event will be triggered when second date is selected */
		console.log('change', obj);
		// obj will be something like this:
		// {
		// 		date1: (Date object of the earlier date),
		// 		date2: (Date object of the later date),
		//	 	value: "2013-06-05 to 2013-06-07"
		// }
	})
	.bind('DRPick-apply', function (event, obj) {
		/* This event will be triggered when user clicks on the apply button */
		console.log('apply', obj);
	})
	.bind('DRPick-close', function () {
		/* This event will be triggered before date range picker close animation */
		console.log('before close');
	})
	.bind('DRPick-closed', function () {
		/* This event will be triggered after date range picker close animation */
		console.log('after close');
	})
	.bind('DRPick-open', function () {
		/* This event will be triggered before date range picker open animation */
		console.log('before open');
	})
	.bind('DRPick-opened', function () {
		/* This event will be triggered after date range picker open animation */
		console.log('after open');
	});
	$('#date-range2').dateRangePicker();
	$('#date-range3').dateRangePicker({
		language : 'cn',
		showWeekNumbers : true
	});
	$('#date-range4').dateRangePicker({
		language : 'en'
	});
	$('#date-range100').dateRangePicker({
		shortcuts : {
			custom : {
				'this week' : function (daytime) {
					var start = daytime.day(0).toDate();
					var end = daytime.clone().day(6).toDate();
					return [start, end];
				},
				'Oct 2014' : function (daytime) {
					//move calendars to show this date's month and next month
					var movetodate = moment('2014-10', 'YYYY-MM').toDate();
					return [movetodate];
				}
			}
		}
	}).bind('DRPick-apply', function (event, obj) {
		console.log(obj);
	});
	$('#date-range101').dateRangePicker({
		//startOfWeek : 'monday',
		shortcuts : {
			'next-days' : [3, 5, 7],
			'next' : ['week', 'month', 'year']
		}
	});
	$('#date-range102').dateRangePicker({
		//startOfWeek : 'monday',
		shortcuts : {
			'prev-days' : [3, 5, 7],
			'prev' : ['week', 'month', 'year']
		}
	});
	$('#date-range103').dateRangePicker({
		autoClose : true
	}).bind('DRPick-first-date', function (event, obj) {
		/* This event will be triggered when first date is selected */
		console.log('first-date-selected', obj);
		// obj will be something like this:
		// {
		// 		date1: (Date object of the earlier date)
		// }
	}).bind('DRPick-change', function (event, obj) {
		/* This event will be triggered when second date is selected */
		console.log('change', obj);
		// obj will be something like this:
		// {
		// 		date1: (Date object of the earlier date),
		// 		date2: (Date object of the later date),
		//	 	value: "2013-06-05 to 2013-06-07"
		// }
	})
	.bind('DRPick-apply', function (event, obj) {
		/* This event will be triggered when user clicks on the apply button */
		console.log('apply', obj);
	})
	.bind('DRPick-close', function () {
		/* This event will be triggered before date range picker close animation */
		console.log('before close');
	})
	.bind('DRPick-closed', function () {
		/* This event will be triggered after date range picker close animation */
		console.log('after close');
	})
	.bind('DRPick-open', function () {
		/* This event will be triggered before date range picker open animation */
		console.log('before open');
	})
	.bind('DRPick-opened', function () {
		/* This event will be triggered after date range picker open animation */
		console.log('after open');
	}); ;
	$('#date-range5').dateRangePicker({
		dateRange : {
			start : '2014-11-20'
		}
	});
	$('#date-range6').dateRangePicker({
		dateRange : {
			start : '2013-01-10',
			end : '2013-03-10'
		}
	});
	$('#date-range7').dateRangePicker({
		minDays : 3,
		maxDays : 7
	});
	$('#date-range8').dateRangePicker({
		startOfWeek : 'monday'
	});
	$('#date-range9').dateRangePicker({
		getValue : function () {
			return this.innerHTML;
		},
		setValue : function (s) {
			this.innerHTML = s;
		}
	});
	$('#two-inputs').dateRangePicker({
		separator : ' to ',
		getValue : function () {
			if ($('#date-range200').val() && $('#date-range201').val())
				return $('#date-range200').val() + ' to ' + $('#date-range201').val();
			else
				return '';
		},
		setValue : function (s, s1, s2) {
			$('#date-range200').val(s1);
			$('#date-range201').val(s2);
		}
	});
	$('#date-range10').dateRangePicker({
		format : 'dddd MMM Do, YYYY' //more formats at http://momentjs.com/docs/#/displaying/format/
	});
	$('#date-range12').dateRangePicker({
		inline : true,
		container : $('#date-range12-container'),
		alwaysOpen : true,
		autoClose : true
	});
	$('#date-range13').dateRangePicker({
		singleDate : true
	}).bind('DRPick-first-date', function (event, obj) {
		/* This event will be triggered when first date is selected */
		console.log('first-date-selected', obj);
		// obj will be something like this:
		// {
		// 		date1: (Date object of the earlier date)
		// }
	}).bind('DRPick-change', function (event, obj) {
		/* This event will be triggered when second date is selected */
		console.log('change', obj);
		// obj will be something like this:
		// {
		// 		date1: (Date object of the earlier date),
		// 		date2: (Date object of the later date),
		//	 	value: "2013-06-05 to 2013-06-07"
		// }
	})
	.bind('DRPick-apply', function (event, obj) {
		/* This event will be triggered when user clicks on the apply button */
		console.log('apply', obj);
	})
	.bind('DRPick-close', function () {
		/* This event will be triggered before date range picker close animation */
		console.log('before close');
	})
	.bind('DRPick-closed', function () {
		/* This event will be triggered after date range picker close animation */
		console.log('after close');
	})
	.bind('DRPick-open', function () {
		/* This event will be triggered before date range picker open animation */
		console.log('before open');
	})
	.bind('DRPick-opened', function () {
		/* This event will be triggered after date range picker open animation */
		console.log('after open');
	});
	$('#date-range13-2').dateRangePicker({
		autoClose : true,
		singleDate : true,
		singleMonth : true
	}).bind('DRPick-first-date', function (event, obj) {
		/* This event will be triggered when first date is selected */
		console.log('first-date-selected', obj);
		// obj will be something like this:
		// {
		// 		date1: (Date object of the earlier date)
		// }
	}).bind('DRPick-change', function (event, obj) {
		/* This event will be triggered when second date is selected */
		console.log('change', obj);
		// obj will be something like this:
		// {
		// 		date1: (Date object of the earlier date),
		// 		date2: (Date object of the later date),
		//	 	value: "2013-06-05 to 2013-06-07"
		// }
	})
	.bind('DRPick-apply', function (event, obj) {
		/* This event will be triggered when user clicks on the apply button */
		console.log('apply', obj);
	})
	.bind('DRPick-close', function () {
		/* This event will be triggered before date range picker close animation */
		console.log('before close');
	})
	.bind('DRPick-closed', function () {
		/* This event will be triggered after date range picker close animation */
		console.log('after close');
	})
	.bind('DRPick-open', function () {
		/* This event will be triggered before date range picker open animation */
		console.log('before open');
	})
	.bind('DRPick-opened', function () {
		/* This event will be triggered after date range picker open animation */
		console.log('after open');
	});
	$('#date-range14').dateRangePicker({
		batchMode : 'week'
	});
	$('#date-range14-2').dateRangePicker({
		batchMode : 'week-range'
	});
	$('#date-range15').dateRangePicker({
		beforeShowDay : function (t) {
			var valid = !(t.getDay() == 0 || t.getDay() == 6); //disable saturday and sunday
			var _class = '';
			var _tooltip = valid ? '' : 'weekends are disabled';
			// allow span across later half of month
			valid = valid || (t.getDate() > 15 ? null : valid);
			return [valid, _class, _tooltip];
		}
	});
	$('#date-range16').dateRangePicker({
		format : 'YYYY-MM-DD'
	}).bind('DRPick-change', function (evt, obj) {
		alert('date1: ' + obj.date1 + ' / date2: ' + obj.date2);
	});
	$('#date-range16-open').click(function (evt) {
		evt.stopPropagation();
		$('#date-range16').data('DRPick').open();
	});
	$('#date-range16-close').click(function (evt) {
		evt.stopPropagation();
		$('#date-range16').data('DRPick').close();
	});
	$('#date-range16-set').click(function (evt) {
		evt.stopPropagation();
		$('#date-range16').data('DRPick').setDateRange('2013-11-20', '2014-08-25');
	});
	$('#date-range16-set-silent').click(function (evt) {
		evt.stopPropagation();
		$('#date-range16').data('DRPick').setDateRange('2014-11-03', '2015-02-12', true);
	});
	$('#date-range16-clear').click(function (evt) {
		evt.stopPropagation();
		$('#date-range16').data('DRPick').clear();
	});
	$('#date-range16-destroy').click(function (evt) {
		evt.stopPropagation();
		$('#date-range16').data('DRPick').destroy();
	});
	$('#date-range16-reset').click(function (evt) {
		evt.stopPropagation();
		$('#date-range16').data('DRPick').resetMonthsView();
	});
	$('#date-range17').dateRangePicker({
		stickyMonths : true,
		dateRange : {
			start : '2013-01-10',
			end : '2013-05-10'
		}
	});
	$('#date-range18').dateRangePicker({
		customTopBar : 'Foo Bar'
	});
	$('#date-range20').dateRangePicker({
		hoveringTooltip : false
	});
	$('#date-range21').dateRangePicker({
		hoveringTooltip : function (days) {
			var D = ['', '<span style="white-space:nowrap;">Please select another date</span>', 'Two', 'Three', 'Four', 'Five'];
			return D[days] ? D[days] : days + ' days';
		}
	});
	$('#date-range22').dateRangePicker({
		showDateFilter : function (time, date) {
			return '<div style="padding:0 5px;">' +
			'<span style="font-weight:bold">' + date + '</span>' +
			'<div style="opacity:0.3;">$' + Math.round(Math.random() * 999) + '</div>' +
			'</div>';
		}
	});
	$('#date-range23').dateRangePicker({
		singleMonth : true,
		showTopbar : false
	});
	$('#date-range24').dateRangePicker({
		showWeekNumbers : true
	});
	$('#date-range24-2').dateRangePicker({
		showWeekNumbers : true,
		startOfWeek : 'monday'
	});
	$('#date-range24-3').dateRangePicker({
		showWeekNumbers : true,
		getWeekNumber : function (day) {
			var fiscalYearStart = moment('2015-08-16', 'YYYY-MM-DD');
			var daysOffset = parseInt(fiscalYearStart.format('DDD'), 10);
			return moment(day).add(-1 * daysOffset, 'days').format('W');
		}
	});
	$('#date-range25').dateRangePicker({
		selectForward : true
	});
	$('#date-range26').dateRangePicker({
		selectBackward : true
	});
	$('#hotel-booking').dateRangePicker({
		dateRange : {
			start : new Date()
		},
		selectForward : true,
		beforeShowDay : function (t) {
			var valid = !(t.getDay() == 0 || t.getDay() == 6); //disable saturday and sunday
			var _class = '';
			var _tooltip = valid ? '' : 'sold out';
			return [valid, _class, _tooltip];
		}
	});
	$('#date-range50').dateRangePicker({
		customOpenAnimation : function (cb) {
			$(this).fadeIn(300, cb);
		},
		customCloseAnimation : function (cb) {
			$(this).fadeOut(300, cb);
		}
	});
	$('#date-range51').dateRangePicker({
		customArrowPrevSymbol : '<i class="fa fa-arrow-circle-left"></i>',
		customArrowNextSymbol : '<i class="fa fa-arrow-circle-right"></i>'
	});
});

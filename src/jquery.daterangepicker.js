// jquery.daterangepicker.js
// author : Chunlong Liu, Zhenyu Wu
// license : MIT
// www.jszen.com
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
		$.dateRangePickerLanguages = {
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
				'custom-values' : 'Custom Values',
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
				'default-more' : 'Please select a date range longer than %d days',
				'default-single' : 'Please select a date',
				'default-less' : 'Please select a date range less than %d days',
				'default-range' : 'Please select a date range between %d and %d days',
				'default-default' : 'Please select a date range'
			},
			'id' : {
				'selected' : 'Terpilih:',
				'day' : 'Hari',
				'days' : 'Hari',
				'apply-disabled' : 'Tutup',
				'apply-enabled' : 'Tutup',
				'week-1' : 'sen',
				'week-2' : 'sel',
				'week-3' : 'rab',
				'week-4' : 'kam',
				'week-5' : 'jum',
				'week-6' : 'sab',
				'week-7' : 'min',
				'week-number' : 'W',
				'shortcuts' : 'Pintas',
				'custom-values' : 'Nilai yang ditentukan',
				'past' : 'Yang Lalu',
				'following' : 'Mengikuti',
				'previous' : 'Sebelumnya',
				'prev-week' : 'Minggu',
				'prev-month' : 'Bulan',
				'prev-year' : 'Tahun',
				'next' : 'Selanjutnya',
				'next-week' : 'Minggu',
				'next-month' : 'Bulan',
				'next-year' : 'Tahun',
				'less-than' : 'Tanggal harus lebih dari %d hari',
				'more-than' : 'Tanggal harus kurang dari %d hari',
				'default-more' : 'Jarak tanggal harus lebih lama dari %d hari',
				'default-single' : 'Silakan pilih tanggal',
				'default-less' : 'Jarak rentang tanggal tidak boleh lebih lama dari %d hari',
				'default-range' : 'Rentang tanggal harus antara %d dan %d hari',
				'default-default' : 'Silakan pilih rentang tanggal'
			},
			'az' : {
				'selected' : 'Seçildi:',
				'day' : ' gün',
				'days' : ' gün',
				'apply-disabled' : 'tətbiq',
				'apply-enabled' : 'tətbiq',
				'week-1' : '1',
				'week-2' : '2',
				'week-3' : '3',
				'week-4' : '4',
				'week-5' : '5',
				'week-6' : '6',
				'week-7' : '7',
				'shortcuts' : 'Qısayollar',
				'past' : 'Keçmiş',
				'following' : 'Növbəti',
				'previous' : '&nbsp;&nbsp;&nbsp;',
				'prev-week' : 'Öncəki həftə',
				'prev-month' : 'Öncəki ay',
				'prev-year' : 'Öncəki il',
				'next' : '&nbsp;&nbsp;&nbsp;',
				'next-week' : 'Növbəti həftə',
				'next-month' : 'Növbəti ay',
				'next-year' : 'Növbəti il',
				'less-than' : 'Tarix aralığı %d gündən çox olmamalıdır',
				'more-than' : 'Tarix aralığı %d gündən az olmamalıdır',
				'default-more' : '%d gündən çox bir tarix seçin',
				'default-single' : 'Tarix seçin',
				'default-less' : '%d gündən az bir tarix seçin',
				'default-range' : '%d və %d gün aralığında tarixlər seçin',
				'default-default' : 'Tarix aralığı seçin'
			},
			'zh-cn' : //simplified chinese
			{
				'selected' : '已选择:',
				'day' : '天',
				'days' : '天',
				'apply-disabled' : '关闭',
				'apply-enabled' : '确定',
				'week-1' : '一',
				'week-2' : '二',
				'week-3' : '三',
				'week-4' : '四',
				'week-5' : '五',
				'week-6' : '六',
				'week-7' : '日',
				'week-number' : '周',
				'shortcuts' : '快捷选择',
				'past' : '过去',
				'following' : '将来',
				'previous' : '&nbsp;&nbsp;&nbsp;',
				'prev-week' : '上周',
				'prev-month' : '上个月',
				'prev-year' : '去年',
				'next' : '&nbsp;&nbsp;&nbsp;',
				'next-week' : '下周',
				'next-month' : '下个月',
				'next-year' : '明年',
				'less-than' : '所选日期范围不能大于%d天',
				'more-than' : '所选日期范围不能小于%d天',
				'default-more' : '请选择大于%d天的日期范围',
				'default-less' : '请选择小于%d天的日期范围',
				'default-range' : '请选择%d天到%d天的日期范围',
				'default-single' : '请选择一个日期',
				'default-default' : '请选择一个日期范围'
			},
			'cz' : {
				'selected' : 'Vybráno:',
				'day' : 'Den',
				'days' : 'Dny',
				'apply-disabled' : 'Zavřít',
				'apply-enabled' : 'Zavřít',
				'week-1' : 'po',
				'week-2' : 'út',
				'week-3' : 'st',
				'week-4' : 'čt',
				'week-5' : 'pá',
				'week-6' : 'so',
				'week-7' : 'ne',
				'shortcuts' : 'Zkratky',
				'past' : 'po',
				'following' : 'následující',
				'previous' : 'předchozí',
				'prev-week' : 'týden',
				'prev-month' : 'měsíc',
				'prev-year' : 'rok',
				'next' : 'další',
				'next-week' : 'týden',
				'next-month' : 'měsíc',
				'next-year' : 'rok',
				'less-than' : 'Rozsah data by neměl být větší než %d dnů',
				'more-than' : 'Rozsah data by neměl být menší než %d dnů',
				'default-more' : 'Prosím zvolte rozsah data větší než %d dnů',
				'default-single' : 'Prosím zvolte datum',
				'default-less' : 'Prosím zvolte rozsah data menší než %d dnů',
				'default-range' : 'Prosím zvolte rozsah data mezi %d a %d dny',
				'default-default' : 'Prosím zvolte rozsah data'
			},
			'de' : {
				'selected' : 'Auswahl:',
				'day' : 'Tag',
				'days' : 'Tage',
				'apply-disabled' : 'Schließen',
				'apply-enabled' : 'Schließen',
				'week-1' : 'mo',
				'week-2' : 'di',
				'week-3' : 'mi',
				'week-4' : 'do',
				'week-5' : 'fr',
				'week-6' : 'sa',
				'week-7' : 'so',
				'shortcuts' : 'Schnellwahl',
				'past' : 'Vorherige',
				'following' : 'Folgende',
				'previous' : 'Vorherige',
				'prev-week' : 'Woche',
				'prev-month' : 'Monat',
				'prev-year' : 'Jahr',
				'next' : 'Nächste',
				'next-week' : 'Woche',
				'next-month' : 'Monat',
				'next-year' : 'Jahr',
				'less-than' : 'Datumsbereich darf nicht größer sein als %d Tage',
				'more-than' : 'Datumsbereich darf nicht kleiner sein als %d Tage',
				'default-more' : 'Bitte mindestens %d Tage auswählen',
				'default-single' : 'Bitte ein Datum auswählen',
				'default-less' : 'Bitte weniger als %d Tage auswählen',
				'default-range' : 'Bitte einen Datumsbereich zwischen %d und %d Tagen auswählen',
				'default-default' : 'Bitte ein Start- und Enddatum auswählen'
			},
			'es' : {
				'selected' : 'Seleccionado:',
				'day' : 'Día',
				'days' : 'Días',
				'apply-disabled' : 'Cerrar',
				'apply-enabled' : 'Cerrar',
				'week-1' : 'lu',
				'week-2' : 'ma',
				'week-3' : 'mi',
				'week-4' : 'ju',
				'week-5' : 'vi',
				'week-6' : 'sa',
				'week-7' : 'do',
				'shortcuts' : 'Accesos directos',
				'past' : 'Pasado',
				'following' : 'Siguiente',
				'previous' : 'Anterior',
				'prev-week' : 'Semana',
				'prev-month' : 'Mes',
				'prev-year' : 'Año',
				'next' : 'Siguiente',
				'next-week' : 'Semana',
				'next-month' : 'Mes',
				'next-year' : 'Año',
				'less-than' : 'El rango no debería ser mayor de %d días',
				'more-than' : 'El rango no debería ser menor de %d días',
				'default-more' : 'Por favor selecciona un rango mayor a %d días',
				'default-single' : 'Por favor selecciona un día',
				'default-less' : 'Por favor selecciona un rango menor a %d días',
				'default-range' : 'Por favor selecciona un rango entre %d y %d días',
				'default-default' : 'Por favor selecciona un rango de fechas.'
			},
			'fr' : {
				'selected' : 'Sélection:',
				'day' : 'Jour',
				'days' : 'Jours',
				'apply-disabled' : 'Fermer',
				'apply-enabled' : 'Fermer',
				'week-1' : 'lu',
				'week-2' : 'ma',
				'week-3' : 'me',
				'week-4' : 'je',
				'week-5' : 've',
				'week-6' : 'sa',
				'week-7' : 'di',
				'shortcuts' : 'Raccourcis',
				'past' : 'Passé',
				'following' : 'Suivant',
				'previous' : 'Précédent',
				'prev-week' : 'Semaine',
				'prev-month' : 'Mois',
				'prev-year' : 'Année',
				'next' : 'Suivant',
				'next-week' : 'Semaine',
				'next-month' : 'Mois',
				'next-year' : 'Année',
				'less-than' : 'L\'intervalle ne doit pas être supérieure à %d jours',
				'more-than' : 'L\'intervalle ne doit pas être inférieure à %d jours',
				'default-more' : 'Merci de choisir une intervalle supérieure à %d jours',
				'default-single' : 'Merci de choisir une date',
				'default-less' : 'Merci de choisir une intervalle inférieure %d jours',
				'default-range' : 'Merci de choisir une intervalle comprise entre %d et %d jours',
				'default-default' : 'Merci de choisir une date'
			},
			'hu' : {
				'selected' : 'Kiválasztva:',
				'day' : 'Nap',
				'days' : 'Nap',
				'apply-disabled' : 'Ok',
				'apply-enabled' : 'Ok',
				'week-1' : 'h',
				'week-2' : 'k',
				'week-3' : 'sz',
				'week-4' : 'cs',
				'week-5' : 'p',
				'week-6' : 'sz',
				'week-7' : 'v',
				'shortcuts' : 'Gyorsválasztó',
				'past' : 'Múlt',
				'following' : 'Következő',
				'previous' : 'Előző',
				'prev-week' : 'Hét',
				'prev-month' : 'Hónap',
				'prev-year' : 'Év',
				'next' : 'Következő',
				'next-week' : 'Hét',
				'next-month' : 'Hónap',
				'next-year' : 'Év',
				'less-than' : 'A kiválasztás nem lehet több %d napnál',
				'more-than' : 'A kiválasztás nem lehet több %d napnál',
				'default-more' : 'Válassz ki egy időszakot ami hosszabb mint %d nap',
				'default-single' : 'Válassz egy napot',
				'default-less' : 'Válassz ki egy időszakot ami rövidebb mint %d nap',
				'default-range' : 'Válassz ki egy %d - %d nap hosszú időszakot',
				'default-default' : 'Válassz ki egy időszakot'
			},
			'it' : {
				'selected' : 'Selezionati:',
				'day' : 'Giorno',
				'days' : 'Giorni',
				'apply-disabled' : 'Chiudi',
				'apply-enabled' : 'Chiudi',
				'week-1' : 'lu',
				'week-2' : 'ma',
				'week-3' : 'me',
				'week-4' : 'gi',
				'week-5' : 've',
				'week-6' : 'sa',
				'week-7' : 'do',
				'shortcuts' : 'Scorciatoie',
				'past' : 'Scorso',
				'following' : 'Successivo',
				'previous' : 'Precedente',
				'prev-week' : 'Settimana',
				'prev-month' : 'Mese',
				'prev-year' : 'Anno',
				'next' : 'Prossimo',
				'next-week' : 'Settimana',
				'next-month' : 'Mese',
				'next-year' : 'Anno',
				'less-than' : 'L\'intervallo non dev\'essere maggiore di %d giorni',
				'more-than' : 'L\'intervallo non dev\'essere minore di %d giorni',
				'default-more' : 'Seleziona un intervallo maggiore di %d giorni',
				'default-single' : 'Seleziona una data',
				'default-less' : 'Seleziona un intervallo minore di %d giorni',
				'default-range' : 'Seleziona un intervallo compreso tra i %d e i %d giorni',
				'default-default' : 'Seleziona un intervallo di date'
			},
			'ko' : {
				'selected' : '기간:',
				'day' : '일',
				'days' : '일간',
				'apply-disabled' : '닫기',
				'apply-enabled' : '닫기',
				'week-1' : '월',
				'week-2' : '화',
				'week-3' : '수',
				'week-4' : '목',
				'week-5' : '금',
				'week-6' : '토',
				'week-7' : '일',
				'week-number' : '주',
				'shortcuts' : '단축키들',
				'past' : '지난(오늘기준)',
				'following' : '이후(오늘기준)',
				'previous' : '이전',
				'prev-week' : '1주',
				'prev-month' : '1달',
				'prev-year' : '1년',
				'next' : '다음',
				'next-week' : '1주',
				'next-month' : '1달',
				'next-year' : '1년',
				'less-than' : '날짜 범위는 %d 일보다 많을 수 없습니다',
				'more-than' : '날짜 범위는 %d 일보다 작을 수 없습니다',
				'default-more' : '날짜 범위를 %d 일보다 길게 선택해 주세요',
				'default-single' : '날짜를 선택해 주세요',
				'default-less' : '%d 일보다 작은 날짜를 선택해 주세요',
				'default-range' : '%d와 %d 일 사이의 날짜 범위를 선택해 주세요',
				'default-default' : '날짜 범위를 선택해 주세요'
			},
			'no' : {
				'selected' : 'Valgt:',
				'day' : 'Dag',
				'days' : 'Dager',
				'apply-disabled' : 'Lukk',
				'apply-enabled' : 'Lukk',
				'week-1' : 'ma',
				'week-2' : 'ti',
				'week-3' : 'on',
				'week-4' : 'to',
				'week-5' : 'fr',
				'week-6' : 'lø',
				'week-7' : 'sø',
				'shortcuts' : 'Snarveier',
				'custom-values' : 'Egendefinerte Verdier',
				'past' : 'Over', // Not quite sure about the context of this one
				'following' : 'Følger',
				'previous' : 'Forrige',
				'prev-week' : 'Uke',
				'prev-month' : 'Måned',
				'prev-year' : 'År',
				'next' : 'Neste',
				'next-week' : 'Uke',
				'next-month' : 'Måned',
				'next-year' : 'År',
				'less-than' : 'Datoperioden skal ikkje være lengre enn %d dager',
				'more-than' : 'Datoperioden skal ikkje være kortere enn %d dager',
				'default-more' : 'Vennligst velg ein datoperiode lengre enn %d dager',
				'default-single' : 'Vennligst velg ein dato',
				'default-less' : 'Vennligst velg ein datoperiode mindre enn %d dager',
				'default-range' : 'Vennligst velg ein datoperiode mellom %d og %d dager',
				'default-default' : 'Vennligst velg ein datoperiode'
			},
			'nl' : {
				'selected' : 'Geselecteerd:',
				'day' : 'Dag',
				'days' : 'Dagen',
				'apply-disabled' : 'Ok',
				'apply-enabled' : 'Ok',
				'week-1' : 'ma',
				'week-2' : 'di',
				'week-3' : 'wo',
				'week-4' : 'do',
				'week-5' : 'vr',
				'week-6' : 'za',
				'week-7' : 'zo',
				'shortcuts' : 'Snelkoppelingen',
				'custom-values' : 'Aangepaste waarden',
				'past' : 'Verleden',
				'following' : 'Komend',
				'previous' : 'Vorige',
				'prev-week' : 'Week',
				'prev-month' : 'Maand',
				'prev-year' : 'Jaar',
				'next' : 'Volgende',
				'next-week' : 'Week',
				'next-month' : 'Maand',
				'next-year' : 'Jaar',
				'less-than' : 'Interval moet langer dan %d dagen zijn',
				'more-than' : 'Interval mag niet minder dan %d dagen zijn',
				'default-more' : 'Selecteer een interval langer dan %dagen',
				'default-single' : 'Selecteer een datum',
				'default-less' : 'Selecteer een interval minder dan %d dagen',
				'default-range' : 'Selecteer een interval tussen %d en %d dagen',
				'default-default' : 'Selecteer een interval'
			},
			'ru' : {
				'selected' : 'Выбрано:',
				'day' : 'День',
				'days' : 'Дней',
				'apply-disabled' : 'Применить',
				'apply-enabled' : 'Применить',
				'week-1' : 'пн',
				'week-2' : 'вт',
				'week-3' : 'ср',
				'week-4' : 'чт',
				'week-5' : 'пт',
				'week-6' : 'сб',
				'week-7' : 'вс',
				'shortcuts' : 'Быстрый выбор',
				'custom-values' : 'Пользовательские значения',
				'past' : 'Прошедшие',
				'following' : 'Следующие',
				'previous' : '&nbsp;&nbsp;&nbsp;',
				'prev-week' : 'Неделя',
				'prev-month' : 'Месяц',
				'prev-year' : 'Год',
				'next' : '&nbsp;&nbsp;&nbsp;',
				'next-week' : 'Неделя',
				'next-month' : 'Месяц',
				'next-year' : 'Год',
				'less-than' : 'Диапазон не может быть больше %d дней',
				'more-than' : 'Диапазон не может быть меньше %d дней',
				'default-more' : 'Пожалуйста выберите диапазон больше %d дней',
				'default-single' : 'Пожалуйста выберите дату',
				'default-less' : 'Пожалуйста выберите диапазон меньше %d дней',
				'default-range' : 'Пожалуйста выберите диапазон между %d и %d днями',
				'default-default' : 'Пожалуйста выберите диапазон'
			},
			'pl' : {
				'selected' : 'Wybrany:',
				'day' : 'Dzień',
				'days' : 'Dni',
				'apply-disabled' : 'Zamknij',
				'apply-enabled' : 'Zamknij',
				'week-1' : 'pon',
				'week-2' : 'wt',
				'week-3' : 'śr',
				'week-4' : 'czw',
				'week-5' : 'pt',
				'week-6' : 'so',
				'week-7' : 'nd',
				'shortcuts' : 'Skróty',
				'custom-values' : 'Niestandardowe wartości',
				'past' : 'Przeszłe',
				'following' : 'Następne',
				'previous' : 'Poprzednie',
				'prev-week' : 'tydzień',
				'prev-month' : 'miesiąc',
				'prev-year' : 'rok',
				'next' : 'Następny',
				'next-week' : 'tydzień',
				'next-month' : 'miesiąc',
				'next-year' : 'rok',
				'less-than' : 'Okres nie powinien być dłuższy niż %d dni',
				'more-than' : 'Okres nie powinien być krótszy niż  %d ni',
				'default-more' : 'Wybierz okres dłuższy niż %d dni',
				'default-single' : 'Wybierz datę',
				'default-less' : 'Wybierz okres krótszy niż %d dni',
				'default-range' : 'Wybierz okres trwający od %d do %d dni',
				'default-default' : 'Wybierz okres'
			},
			'se' : {
				'selected' : 'Vald:',
				'day' : 'dag',
				'days' : 'dagar',
				'apply-disabled' : 'godkänn',
				'apply-enabled' : 'godkänn',
				'week-1' : 'ma',
				'week-2' : 'ti',
				'week-3' : 'on',
				'week-4' : 'to',
				'week-5' : 'fr',
				'week-6' : 'lö',
				'week-7' : 'sö',
				'shortcuts' : 'genvägar',
				'custom-values' : 'Anpassade värden',
				'past' : 'över',
				'following' : 'följande',
				'previous' : 'förra',
				'prev-week' : 'vecka',
				'prev-month' : 'månad',
				'prev-year' : 'år',
				'next' : 'nästa',
				'next-week' : 'vecka',
				'next-month' : 'måned',
				'next-year' : 'år',
				'less-than' : 'Datumintervall bör inte vara mindre än %d dagar',
				'more-than' : 'Datumintervall bör inte vara mer än %d dagar',
				'default-more' : 'Välj ett datumintervall längre än %d dagar',
				'default-single' : 'Välj ett datum',
				'default-less' : 'Välj ett datumintervall mindre än %d dagar',
				'default-range' : 'Välj ett datumintervall mellan %d och %d dagar',
				'default-default' : 'Välj ett datumintervall'
			},
			'pt' : //Portuguese (European)
			{
				'selected' : 'Selecionado:',
				'day' : 'Dia',
				'days' : 'Dias',
				'apply-disabled' : 'Fechar',
				'apply-enabled' : 'Fechar',
				'week-1' : 'seg',
				'week-2' : 'ter',
				'week-3' : 'qua',
				'week-4' : 'qui',
				'week-5' : 'sex',
				'week-6' : 'sab',
				'week-7' : 'dom',
				'week-number' : 'N',
				'shortcuts' : 'Atalhos',
				'custom-values' : 'Valores Personalizados',
				'past' : 'Passado',
				'following' : 'Seguinte',
				'previous' : 'Anterior',
				'prev-week' : 'Semana',
				'prev-month' : 'Mês',
				'prev-year' : 'Ano',
				'next' : 'Próximo',
				'next-week' : 'Próxima Semana',
				'next-month' : 'Próximo Mês',
				'next-year' : 'Próximo Ano',
				'less-than' : 'O período selecionado não deve ser maior que %d dias',
				'more-than' : 'O período selecionado não deve ser menor que %d dias',
				'default-more' : 'Selecione um período superior a %d dias',
				'default-single' : 'Selecione uma data',
				'default-less' : 'Selecione um período inferior a %d dias',
				'default-range' : 'Selecione um período de %d a %d dias',
				'default-default' : 'Selecione um período'
			},
			'zh-tw' : // traditional chinese
			{
				'selected' : '已選擇:',
				'day' : '天',
				'days' : '天',
				'apply-disabled' : '關閉',
				'apply-enabled' : '確定',
				'week-1' : '一',
				'week-2' : '二',
				'week-3' : '三',
				'week-4' : '四',
				'week-5' : '五',
				'week-6' : '六',
				'week-7' : '日',
				'week-number' : '周',
				'shortcuts' : '快速選擇',
				'past' : '過去',
				'following' : '將來',
				'previous' : '&nbsp;&nbsp;&nbsp;',
				'prev-week' : '上週',
				'prev-month' : '上個月',
				'prev-year' : '去年',
				'next' : '&nbsp;&nbsp;&nbsp;',
				'next-week' : '下周',
				'next-month' : '下個月',
				'next-year' : '明年',
				'less-than' : '所選日期範圍不能大於%d天',
				'more-than' : '所選日期範圍不能小於%d天',
				'default-more' : '請選擇大於%d天的日期範圍',
				'default-less' : '請選擇小於%d天的日期範圍',
				'default-range' : '請選擇%d天到%d天的日期範圍',
				'default-single' : '請選擇一個日期',
				'default-default' : '請選擇一個日期範圍'
			},
			'ja' : {
				'selected' : '選択しました:',
				'day' : '日',
				'days' : '日々',
				'apply-disabled' : '閉じる',
				'apply-enabled' : '閉じる',
				'week-1' : '日',
				'week-2' : '月',
				'week-3' : '火',
				'week-4' : '水',
				'week-5' : '木',
				'week-6' : '金',
				'week-7' : '土',
				'shortcuts' : 'クイック選択',
				'past' : '過去',
				'following' : '将来',
				'previous' : '&nbsp;&nbsp;&nbsp;',
				'prev-week' : '先週、',
				'prev-month' : '先月',
				'prev-year' : '昨年',
				'next' : '&nbsp;&nbsp;&nbsp;',
				'next-week' : '来週',
				'next-month' : '来月',
				'next-year' : '来年',
				'less-than' : '日付の範囲は ％d 日以上にすべきではありません',
				'more-than' : '日付の範囲は ％d 日を下回ってはいけません',
				'default-more' : '％d 日よりも長い期間を選択してください',
				'default-less' : '％d 日未満の期間を選択してください',
				'default-range' : '％d と％ d日の間の日付範囲を選択してください',
				'default-single' : '日付を選択してください',
				'default-default' : '日付範囲を選択してください'
			},
			'da' : {
				'selected' : 'Valgt:',
				'day' : 'Dag',
				'days' : 'Dage',
				'apply-disabled' : 'Luk',
				'apply-enabled' : 'Luk',
				'week-1' : 'ma',
				'week-2' : 'ti',
				'week-3' : 'on',
				'week-4' : 'to',
				'week-5' : 'fr',
				'week-6' : 'lö',
				'week-7' : 'sö',
				'shortcuts' : 'genveje',
				'custom-values' : 'Brugerdefinerede værdier',
				'past' : 'Forbi',
				'following' : 'Følgende',
				'previous' : 'Forrige',
				'prev-week' : 'uge',
				'prev-month' : 'månad',
				'prev-year' : 'år',
				'next' : 'Næste',
				'next-week' : 'Næste uge',
				'next-month' : 'Næste måned',
				'next-year' : 'Næste år',
				'less-than' : 'Dato interval bør ikke være med end %d dage',
				'more-than' : 'Dato interval bør ikke være mindre end %d dage',
				'default-more' : 'Vælg datointerval længere end %d dage',
				'default-single' : 'Vælg dato',
				'default-less' : 'Vælg datointerval mindre end %d dage',
				'default-range' : 'Vælg datointerval mellem %d og %d dage',
				'default-default' : 'Vælg datointerval'
			}
		};
		for (var key in $.dateRangePickerLanguages) {
			$.dateRangePickerLanguages[key]['_abbrv'] = key;
		}
		$.dateRangePickerLanguages['default'] = $.dateRangePickerLanguages['en'];
		$.dateRangePickerLanguages['cn'] = $.dateRangePickerLanguages['zh-cn'];
		$.fn.dateRangePicker = function (opt) {
			if (!opt)
				opt = {};
			opt = $.extend(true, {
					autoClose : false,
					format : 'YYYY-MM-DD',
					separator : ' to ',
					language : 'auto',
					startOfWeek : 'sunday', // or monday
					getValue : function () {
						return this.val();
					},
					setValue : function (s) {
						if (s != this.val()) {
							this.val(s);
							this.change();
						}
					},
					startDate : false,
					endDate : false,
					minDays : 0,
					maxDays : 0,
					showShortcuts : false,
					shortcuts : {
						//'prev-days': [1,3,5,7],
						// 'next-days': [3,5,7],
						//'prev' : ['week','month','year'],
						// 'next' : ['week','month','year']
					},
					customShortcuts : [],
					watchValueChange : true,
					container : undefined,
					alwaysOpen : false,
					dropTrigger : true,
					singleDate : false,
					lookBehind : false,
					batchMode : false,
					duration : 200,
					stickyMonths : false,
					dayDivAttrs : [],
					dayTdAttrs : [],
					selectForward : false,
					selectBackward : false,
					applyBtnClass : '',
					singleMonth : 'auto',
					hoveringTooltip : function (days, startTime, hoveringTime) {
						return days > 1 ? days + ' ' + lang('days') : '';
					},
					showTopbar : true,
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
			opt.start = false;
			opt.end = false;
			opt.startWeek = false;

			//show one month on mobile devices
			if (opt.singleMonth == 'auto')
				opt.singleMonth = $(window).width() < 480;
			if (opt.singleMonth)
				opt.stickyMonths = false;
			if (!opt.showTopbar)
				opt.autoClose = true;
			if (opt.startDate && typeof opt.startDate == 'string')
				opt.startDate = moment(opt.startDate, opt.format).toDate();
			if (opt.endDate && typeof opt.endDate == 'string')
				opt.endDate = moment(opt.endDate, opt.format).toDate();

			var langs = getLanguages();
			opt.mFormatter = moment();
			var fblocale = opt.mFormatter.locale();
			if (!opt.mFormatter.locale(langs['_abbrv'])._locale) {
				opt.mFormatter.locale(fblocale);
			}
			opt.monthFMT = opt.mFormatter.localeData().longDateFormat('LL').replace(/\s*D\w*[^MY\s]*(\s*)/, '$1');

			var box;
			var self = $(this);

			init_datepicker();
			if (opt.alwaysOpen) {
				openDatePicker(0);
			} else {
				if (opt.dropTrigger) {
					self.bind('click.DRPick', function (evt) {
						if (!self.data('DRPick.active')) {
							openDatePicker(opt.duration);
						}
					});
				}
			}

			// expose some api
			self.data('DRPick', {
				setStart : function (d1, silent) {
					if (typeof d1 == 'string') {
						d1 = moment(d1, opt.format).toDate();
					}
					setDateRange(d1, opt.end ? new Date().setTime(opt.end) : d1, silent);
					return this;
				},
				setEnd : function (d2, silent) {
					if (typeof d2 == 'string') {
						d2 = moment(d2, opt.format).toDate();
					}
					setDateRange(opt.start ? new Date().setTime(opt.start) : d2, d2, silent);
					return this;
				},
				setDateRange : function (d1, d2, silent) {
					if (typeof d1 == 'string') {
						d1 = moment(d1, opt.format).toDate();
					}
					if (typeof d2 == 'string') {
						d2 = moment(d2, opt.format).toDate();
					}
					setDateRange(d1, d2, silent);
				},
				setDateText : function (str, silent) {
					var Values = parseStringValues(opt.getValue.call(self));
					if (Values)
						applyValues(Values, silent);
					return Values;
				},
				open : openDatePicker,
				close : closeDatePicker,
				clear : clearSelection,
				redraw : redrawDatePicker,
				getDatePicker : getDatePicker,
				resetMonthsView : resetMonthsView,
				destroy : function () {
					self.unbind('.DRPick');
					self.data('DRPick', undefined);
					self.data('DRPick.active', undefined);
					box.remove();
					$(window).unbind('resize.DRPick scroll.DRPick', calcPosition);
					$(document).unbind('click.DRPick', autoCloseClick);
				}
			});
			return this;

			function IsClickContained(evt, selfObj) {
				return (selfObj.contains(evt.target) || evt.target == selfObj ||
					(selfObj.childNodes != undefined && $.inArray(evt.target, selfObj.childNodes) >= 0));
			}
			function autoCloseClick(evt) {
				if (!IsClickContained(evt, self[0]) && !IsClickContained(evt, box[0])) {
					if (self.data('DRPick.active')) {
						closeDatePicker(opt.duration);
					}
				}
			}

			function init_datepicker() {
				self.data('DRPick.active', false);

				box = createDom().hide();
				box.append('<div class="date-range-length-tip"></div>');
				box.delegate('.day', 'mouseleave', function () {
					box.find('.date-range-length-tip').hide();
					if (opt.singleDate) {
						clearHovering();
					}
				});
				(opt.container || $('body')).append(box);
				if (opt.inline) {
					box.addClass('inline-wrapper');
				}
				var defaultTopText = '';
				if (opt.singleDate)
					defaultTopText = lang('default-single');
				else if (opt.minDays && opt.maxDays)
					defaultTopText = lang('default-range');
				else if (opt.minDays)
					defaultTopText = lang('default-more');
				else if (opt.maxDays)
					defaultTopText = lang('default-less');
				else
					defaultTopText = lang('default-default');
				var msg = defaultTopText.replace(/\%d/, opt.minDays).replace(/\%d/, opt.maxDays);
				box.find('.default-top').html(msg).attr('title', msg);
				if (opt.singleMonth) {
					box.addClass('single-month');
				} else {
					box.addClass('two-months');
				}
				if (!opt.alwaysOpen) {
					//if user click other place of the webpage, close date range picker window
					$(document).bind('click.DRPick', autoCloseClick);
				}
				box.find('.next').click(function () {
					if (!opt.stickyMonths)
						gotoNextMonth($(this));
					else
						gotoNextMonth_stickily($(this));
				});
				function gotoNextMonth(self) {
					var isMonth2 = self.parents('table').hasClass('month2');
					var month = isMonth2 ? opt.month2 : opt.month1;
					month = nextMonth(month);
					if (!opt.singleMonth && !opt.singleDate && !isMonth2 &&
						compareMonth(month, opt.month2) >= 0 || isMonthOutOfBounds(month))
						return;
					showMonth(month, isMonth2 ? 'month2' : 'month1');
					showGap();
				}
				function gotoNextMonth_stickily(self) {
					var nextMonth1 = nextMonth(opt.month1);
					var nextMonth2 = nextMonth(opt.month2);
					if (isMonthOutOfBounds(nextMonth2))
						return;
					if (!opt.singleDate && compareMonth(nextMonth1, nextMonth2) >= 0)
						return;
					showMonth(nextMonth1, 'month1');
					showMonth(nextMonth2, 'month2');
					showSelectedDays();
				}
				box.find('.prev').click(function () {
					if (!opt.stickyMonths)
						gotoPrevMonth($(this));
					else
						gotoPrevMonth_stickily($(this));
				});
				function gotoPrevMonth(self) {
					var isMonth2 = self.parents('table').hasClass('month2');
					var month = isMonth2 ? opt.month2 : opt.month1;
					month = prevMonth(month);
					if (isMonth2 && compareMonth(month, opt.month1) <= 0 || isMonthOutOfBounds(month))
						return;
					showMonth(month, isMonth2 ? 'month2' : 'month1');
					showGap();
				}
				function gotoPrevMonth_stickily(self) {
					var prevMonth1 = prevMonth(opt.month1);
					var prevMonth2 = prevMonth(opt.month2);
					if (isMonthOutOfBounds(prevMonth1))
						return;
					if (!opt.singleDate && compareMonth(prevMonth2, prevMonth1) <= 0)
						return;
					showMonth(prevMonth2, 'month2');
					showMonth(prevMonth1, 'month1');
					showSelectedDays();
				}
				box.delegate('.day', 'click', function (evt) {
					dayClicked($(this));
				});
				box.delegate('.day', 'mouseenter', function (evt) {
					dayHovering($(this));
				});
				box.delegate('.week-number', 'click', function (evt) {
					weekNumberClicked($(this));
				});
				box.delegate('.week-number', 'mouseenter', function (evt) {
					weekNumberHovering($(this));
				});
				box.attr('unselectable', 'on')
				.css('user-select', 'none')
				.bind('selectstart', function (e) {
					e.preventDefault();
					return false;
				});
				box.find('.apply-btn').click(function () {
					applyAndClose(self);
				});
				box.find('[custom]').click(function () {
					var valueName = $(this).attr('custom');
					opt.start = false;
					opt.end = false;
					box.find('.day.checked').removeClass('checked');
					checkSelectionValid();
					showSelectedInfo(true);
					showSelectedDays();
					if (opt.autoClose)
						applyAndClose(self);
				});
				box.find('[shortcut]').click(function () {
					var shortcut = $(this).attr('shortcut');
					var now = moment();
					var start = false;
					var end = false;
					var dir;
					if (shortcut.indexOf('day') != -1) {
						var day = parseInt(shortcut.split(',', 2)[1], 10);
						if (day == 0) {
							clearSelection();
							resetMonthsView(now);
						} else {
							start = now.clone().add(day > 0 ? 1 : -1, 'day').toDate();
							end = now.add(day, 'day').toDate();
						}
					} else if (shortcut.indexOf('week') != -1) {
						var dir = shortcut.indexOf('prev,') == -1;
						if (dir) {
							start = now.day(opt.startOfWeek == 'monday' ? 8 : 7).toDate();
						} else {
							start = now.day(opt.startOfWeek == 'monday' ? -6 : -7).toDate();
						}
						end = now.clone().day(opt.startOfWeek == 'monday' ? 7 : 6).toDate();
					} else if (shortcut.indexOf('month') != -1) {
						var dir = shortcut.indexOf('prev,') == -1;
						if (dir) {
							start = now.add(1, 'month').date(1).toDate();
						} else {
							start = now.subtract(1, 'month').date(1).toDate();
						}
						end = now.clone().endOf('month').toDate();
					} else if (shortcut.indexOf('year') != -1) {
						var dir = shortcut.indexOf('prev,') == -1;
						if (dir) {
							start = now.add(1, 'year').month(0).date(1).toDate();
						} else {
							start = now.subtract(1, 'year').month(0).date(1).toDate();
						}
						end = now.clone().endOf('year').toDate();
					} else if (shortcut == 'custom') {
						var name = $(this).html();
						if (opt.customShortcuts && opt.customShortcuts.length > 0) {
							for (var i = 0; i < opt.customShortcuts.length; i++) {
								var sh = opt.customShortcuts[i];
								if (sh.name == name) {
									var data = [];
									data = sh['dates'].call();
									if (data && data.length == 2) {
										start = data[0];
										end = data[1];
									}
									// if only one date is specified then just move calendars there
									// move calendars to show this date's month and next months
									if (data && data.length == 1) {
										var movetodate = data[0];
										resetMonthsView(movetodate);
									}
									break;
								}
							}
						}
					}
					if (start && end) {
						setDateRange(start, end);
					}
				});
			}
			function calcPosition() {
				if (self.data('DRPick.active')) {
					var anchorO = self.offset();
					var anchorW = self.outerWidth();
					var anchorH = self.outerHeight();
					anchorO['right'] = anchorO.left + anchorW;
					anchorO['bottom'] = anchorO.top + anchorH;
					var boxO = box.offset();
					var boxW = box.outerWidth();
					var boxH = box.outerHeight();
					boxO['right'] = boxO.left + boxW;
					boxO['bottom'] = boxO.top + boxH;
					var vpO = {
						top : $(window).scrollTop(),
						left : $(window).scrollLeft()
					};
					var vpW = $(window).width();
					var vpH = $(window).height();
					vpO['right'] = vpO.left + vpW;
					vpO['bottom'] = vpO.top + vpH;

					if ((boxO.left >= vpO.left && boxO.right <= vpO.right) &&
						(boxO.top >= vpO.top && boxO.bottom <= vpO.bottom) &&
						(boxO.left == anchorO.left && (boxO.top == anchorO.bottom || box.bottom == anchorO.top)))
						return false;

					var newLeft = (anchorO.left + boxW <= vpO.right ?
						Math.max(anchorO.left, vpO.left) : Math.max(vpO.left, vpO.right - boxW));

					var DropDown = (anchorO.bottom + boxH <= vpO.bottom || anchorO.top - boxH < vpO.top);
					var VDist;
					if (DropDown) {
						var newTop = Math.max(anchorO.bottom, vpO.top);
						box.css({
							top : newTop,
							bottom : 'auto',
							left : newLeft
						});
						VDist = newTop - anchorO.bottom;
					} else {
						var bodyH = $('body').outerHeight();
						var newBotTop = Math.min(anchorO.top, vpO.bottom);
						box.css({
							top : 'auto',
							bottom : bodyH - newBotTop,
							left : newLeft
						});
						VDist = anchorO.top - newBotTop;
					}
					box.css({
						opacity : 0.3 + 0.7 / Math.log2(2 + (VDist >> 7))
					});
					return true;
				}
			}
			// Return the date picker wrapper element
			function getDatePicker() {
				return box;
			}
			function openDatePicker(animationTime) {
				if (!self.data('DRPick.active')) {
					self.data('DRPick.active', true);
					// Temporarily toggle display style for accurate dimension calculations
					box.css({
						display : 'block',
						visibility : 0
					});
					checkAndSetDefaultValue();
					updateCalendarWidth();
					if (!opt.container) {
						calcPosition();
					}
					box.css({
						display : 'none',
						visibility : 'initial'
					});

					var afterAnim = function () {
						self.trigger('DRPick-opened', {
							relatedTarget : box
						});
					};
					if (opt.customOpenAnimation) {
						opt.customOpenAnimation.call(box[0], afterAnim);
					} else {
						box.slideDown(animationTime, afterAnim);
					}
					self.trigger('DRPick-open', {
						relatedTarget : box
					});
					if (!opt.container) {
						$(window).bind('resize.DRPick scroll.DRPick', calcPosition);
					}
					if (opt.watchValueChange) {
						var domChangeTimer = null;
						self.bind('input.DRPick', function () {
							clearTimeout(domChangeTimer);
							domChangeTimer = setTimeout(function () {
									domChangeTimer = null;
									var Values = parseStringValues(opt.getValue.call(self));
									if (Values)
										applyValues(Values, true);
								}, 200);
						});
					}
				}
			}
			function closeDatePicker(animationTime) {
				if (!opt.alwaysOpen && self.data('DRPick.active')) {
					self.data('DRPick.active', false);
					var afterAnim = function () {
						self.trigger('DRPick-closed', {
							relatedTarget : box
						});
					};
					if (opt.customCloseAnimation) {
						opt.customCloseAnimation.call(box[0], afterAnim);
					} else {
						box.slideUp(animationTime, afterAnim);
					}
					self.trigger('DRPick-close', {
						relatedTarget : box
					});
					if (!opt.container) {
						$(window).unbind('resize.DRPick scroll.DRPick', calcPosition);
					}
					if (opt.watchValueChange) {
						self.unbind('input.DRPick');
					}
				}
			}
			function parseStringValues(str) {
				var vals = str.trim();
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
			function applyValues(vals, silent) {
				if (vals.length > 1) {
					setDateRange(vals[0], vals[1], silent);
				} else {
					setDateRange(vals[0], vals[0], silent);
				}
			}
			function checkAndSetDefaultValue() {
				var Values = parseStringValues(opt.getValue.call(self));
				if (Values)
					applyValues(Values, true);
				else
					resetMonthsView();
			}
			function updateCalendarWidth() {
				var gapMargin = box.find('.gap').css('margin-left');
				if (gapMargin)
					gapMargin = parseInt(gapMargin);
				var w1 = box.find('.month1').width();
				var w2 = box.find('.gap').width() + (gapMargin ? gapMargin * 2 : 0);
				var w3 = box.find('.month2').width();
				var calendarWidth = w1 + w2 + w3 + 2;
				box.find('.month-wrapper').width(calendarWidth);
				var w4 = box.find('.drp_top-bar input').outerWidth();
				box.find('.drp_top-bar div').width(calendarWidth - w4 - 2);
			}
			function clearSelection() {
				opt.start = false;
				opt.end = false;
				box.find('.day.checked').removeClass('checked');
				box.find('.day.last-date-selected').removeClass('last-date-selected');
				box.find('.day.first-date-selected').removeClass('first-date-selected');
				checkSelectionValid();
				showSelectedInfo();
				showSelectedDays();
				self.trigger('DRPick-change', {
					'value' : ""
				});
			}
			function handleStart(time) {
				var r = time;
				if (opt.batchMode === 'week-range') {
					r = moment(time).day(opt.startOfWeek === 'monday' ? 1 : 0).valueOf();
				} else if (opt.batchMode === 'month-range') {
					r = moment(time).startOf('month').valueOf();
				}
				return r;
			}
			function handleEnd(time) {
				var r = time;
				if (opt.batchMode === 'week-range') {
					r = moment(time).day(opt.startOfWeek === 'monday' ? 7 : 6).valueOf();
				} else if (opt.batchMode === 'month-range') {
					r = moment(time).endOf('month').valueOf();
				}
				return r;
			}
			function dayClicked(day) {
				if (day.hasClass('invalid'))
					return;
				if (opt.startWeek)
					return;
				var time = parseInt(day.attr('SOD-time'), 10);
				day.addClass('checked');
				if (opt.singleDate) {
					opt.start = time;
					opt.end = time;
				} else if (opt.batchMode === 'week') {
					opt.start = moment(time).day(opt.startOfWeek === 'monday' ? 1 : 0).valueOf();
					opt.end = moment(time).day(opt.startOfWeek === 'monday' ? 7 : 6).valueOf();
				} else if (opt.batchMode === 'workweek') {
					opt.start = moment(time).day(1).valueOf();
					opt.end = moment(time).day(5).valueOf();
				} else if (opt.batchMode === 'weekend') {
					opt.start = moment(time).day(6).valueOf();
					opt.end = moment(time).day(7).valueOf();
				} else if (opt.batchMode === 'month') {
					opt.start = moment(time).startOf('month').valueOf();
					opt.end = moment(time).endOf('month').valueOf();
				} else if ((opt.start && opt.end) || (!opt.start && !opt.end)) {
					opt.start = handleStart(time);
					opt.end = false;
				} else if (opt.start) {
					opt.end = handleEnd(time);
				}
				//In case the start is after the end, swap the timestamps
				if (!opt.singleDate && opt.start && opt.end && opt.start > opt.end) {
					var tmp = opt.end;
					opt.end = handleEnd(opt.start);
					opt.start = handleStart(tmp);
				}
				opt.start = parseInt(opt.start);
				opt.end = parseInt(opt.end);
				clearHovering();
				if (opt.start && !opt.end) {
					var dateRange = getDateString(opt.start);
					self.trigger('DRPick-first-date', {
						'value' : dateRange,
						'date1' : new Date(opt.start)
					});
					dayHovering(day);
					box.find('.week-number').removeClass('week-number-selected');
				}
				updateSelectableRange(time);
				if (opt.startWeek)
					opt.startWeek = false;
				checkSelectionValid();
				showSelectedInfo();
				showSelectedDays();
				autoclose();
			}
			function weekSelectionHovering(startTime, endTime) {
				box.find('.day').each(function () {
					var time = parseInt($(this).attr('SOD-time'), 10);
					if (startTime == time) {
						$(this).addClass('first-date-selected');
						$(this).removeClass('last-date-selected');
					} else if (endTime == time) {
						$(this).removeClass('first-date-selected');
						$(this).addClass('last-date-selected');
					} else {
						$(this).removeClass('first-date-selected');
						$(this).removeClass('last-date-selected');
					}
					if (startTime <= time && endTime >= time) {
						$(this).addClass('hovering');
					} else {
						$(this).removeClass('hovering');
					}
				});
			}
			function weekNumberClicked(week) {
				if ((opt.start) && (!opt.end) && (!opt.startWeek))
					return;
				if (opt.singleDate)
					return;
				var thisTime = parseInt(week.attr('SOW-time'), 10);
				if (!opt.startWeek) {
					opt.startWeek = thisTime;
					var date = new Date(thisTime);
					opt.start = moment(date).day(opt.startOfWeek == 'monday' ? 1 : 0).valueOf();
					opt.end = false;
					var endTime = moment(date).day(opt.startOfWeek == 'monday' ? 7 : 6).valueOf();
					box.find('.day.checked').removeClass('checked');
					weekSelectionHovering(opt.start, endTime);
					updateSelectableRange();
					box.find('.week-number-selected').removeClass('week-number-selected');
					week.addClass('week-number-selected');
				} else {
					clearHovering();
					var date1 = new Date(thisTime < opt.startWeek ? thisTime : opt.startWeek);
					var date2 = new Date(thisTime < opt.startWeek ? opt.startWeek : thisTime);
					opt.startWeek = false;
					opt.start = moment(date1).day(opt.startOfWeek == 'monday' ? 1 : 0).valueOf();
					opt.end = moment(date2).day(opt.startOfWeek == 'monday' ? 7 : 6).valueOf();
					checkSelectionValid();
					showSelectedInfo();
					showSelectedDays();
					autoclose();
				}
			}
			function weekNumberHovering(week) {
				if (!opt.startWeek)
					return;
				if (opt.singleDate)
					return;
				var thisTime = parseInt(week.attr('SOW-time'), 10);
				if (thisTime >= opt.startWeek) {
					var date = new Date(thisTime);
					var endTime = moment(date).day(opt.startOfWeek == 'monday' ? 7 : 6).valueOf();
					weekSelectionHovering(opt.start, endTime);
				} else {
					var date1 = new Date(thisTime);
					var date2 = new Date(opt.startWeek);
					var startTime = moment(date1).day(opt.startOfWeek == 'monday' ? 1 : 0).valueOf();
					var endTime = moment(date2).day(opt.startOfWeek == 'monday' ? 7 : 6).valueOf();
					weekSelectionHovering(startTime, endTime);
				}
			}
			function isValidTime(time) {
				time = parseInt(time, 10);
				if (opt.startDate && compareDay(time, opt.startDate) < 0)
					return false;
				if (opt.endDate && compareDay(time, opt.endDate) > 0)
					return false;
				if (opt.start && !opt.end && !opt.singleDate) {
					//check maxDays and minDays setting
					if (opt.maxDays > 0 && countDays(time, opt.start) > opt.maxDays)
						return false;
					if (opt.minDays > 0 && countDays(time, opt.start) < opt.minDays)
						return false;
					//check selectForward and selectBackward
					if (opt.selectForward && time < opt.start)
						return false;
					if (opt.selectBackward && time > opt.start)
						return false;
					//check disabled days
					if (opt.beforeShowDay && typeof opt.beforeShowDay == 'function') {
						var valid = true;
						var dayCursor = moment(time);
						while (countDays(dayCursor, opt.start) > 1) {
							var arr = opt.beforeShowDay(dayCursor.toDate());
							if (arr[0] === false) {
								valid = false;
								break;
							}
							dayCursor.add(time > opt.start ? 1 : -1, 'day');
						}
						if (!valid)
							return false;
					}
				}
				return true;
			}
			function updateSelectableRange() {
				box.find('.day.invalid.tmp').removeClass('tmp invalid').addClass('valid');
				box.find('.week-number.invalid.tmp').removeClass('tmp invalid').addClass('valid');
				if (opt.start && !opt.end) {
					box.find('.day.toMonth.valid').each(function () {
						var time = parseInt($(this).attr('SOD-time'), 10);
						if (!isValidTime(time))
							$(this).addClass('invalid tmp').removeClass('valid');
						else
							$(this).addClass('valid tmp').removeClass('invalid');
					});
					box.find('.week-number').each(function () {
						var time = parseInt($(this).attr('SOW-time'), 10);
						if (!isValidTime(time))
							$(this).addClass('invalid tmp').removeClass('valid');
						else
							$(this).addClass('valid tmp').removeClass('invalid');
					});
				}
				return true;
			}
			function dayHovering(day) {
				if (opt.startWeek)
					return;
				var hoverTime = parseInt(day.attr('SOD-time'));
				var tooltip = '';
				if (day.hasClass('has-tooltip') && day.attr('data-tooltip')) {
					tooltip = '<span style="white-space:nowrap">' + day.attr('data-tooltip') + '</span>';
				} else if (!day.hasClass('invalid')) {
					if (opt.singleDate) {
						box.find('.day.hovering').removeClass('hovering');
						day.addClass('hovering');
					} else {
						box.find('.day').each(function () {
							var time = parseInt($(this).attr('SOD-time'), 10),
							start = opt.start,
							end = opt.end;
							if (time == hoverTime) {
								$(this).addClass('hovering');
							} else {
								$(this).removeClass('hovering');
							}
							if (
								(opt.start && !opt.end) &&
								(
									(opt.start < time && hoverTime >= time) ||
									(opt.start > time && hoverTime <= time))) {
								$(this).addClass('hovering');
							} else {
								$(this).removeClass('hovering');
							}
						});
						if (opt.start && !opt.end) {
							var days = countDays(hoverTime, opt.start);
							if (opt.hoveringTooltip) {
								if (typeof opt.hoveringTooltip == 'function') {
									tooltip = opt.hoveringTooltip(days, opt.start, hoverTime);
								} else if (opt.hoveringTooltip === true && days > 1) {
									tooltip = days + ' ' + lang('days');
								}
							}
						}
					}
				}
				if (tooltip) {
					var posDay = day.offset();
					var posBox = box.offset();
					var _left = posDay.left - posBox.left;
					var _top = posDay.top - posBox.top;
					_left += day.width() / 2;
					var $tip = box.find('.date-range-length-tip');
					var w = $tip.css({
							'visibility' : 'hidden',
							'display' : 'none'
						}).html(tooltip).width();
					var h = $tip.height();
					_left -= w / 2;
					_top -= h;
					//setTimeout(function () {
					$tip.css({
						left : _left,
						top : _top,
						display : 'block',
						'visibility' : 'visible'
					});
					//}, 10);
				} else {
					box.find('.date-range-length-tip').hide();
				}
			}
			function clearHovering() {
				box.find('.day.hovering').removeClass('hovering');
				box.find('.date-range-length-tip').hide();
			}
			function applyAndClose(self) {
				if (opt.start && opt.end) {
					var dateRange;
					if (opt.singleDate) {
						dateRange = getDateString(opt.start)
							self.trigger('DRPick-apply', {
								'value' : dateRange,
								'date1' : new Date(opt.start)
							});
					} else {
						var startDate = getDateString(opt.start),
						endDate = getDateString(opt.end),
						dateRange = startDate + opt.separator + endDate;
						self.trigger('DRPick-apply', {
							'value' : dateRange,
							'date1' : new Date(opt.start),
							'date2' : new Date(opt.end)
						});
					}
					opt.setValue.call(self, dateRange, startDate, endDate);
				}
				closeDatePicker(opt.duration);
			}
			function autoclose() {
				if (opt.autoClose && opt.start) {
					if (opt.singleDate || opt.end) {
						applyAndClose(self);
					}
				}
			}
			function checkSelectionValid() {
				var days = (opt.start && opt.end) ? countDays(opt.start, opt.end) : NaN;
				if (opt.singleDate) { // Validate if only start is there
					if (opt.start && !opt.end)
						box.find('.drp_top-bar').removeClass('error').addClass('normal');
					else
						box.find('.drp_top-bar').removeClass('error').removeClass('normal');
				} else if (opt.maxDays && days > opt.maxDays) {
					opt.start = false;
					opt.end = false;
					box.find('.day').removeClass('checked');
					var msg = lang('less-than').replace('%d', opt.maxDays);
					box.find('.drp_top-bar').removeClass('normal').addClass('error').find('.error-top')
					.html(msg).attr('title', msg);
				} else if (opt.minDays && days < opt.minDays) {
					opt.start = false;
					opt.end = false;
					box.find('.day').removeClass('checked');
					var msg = lang('more-than').replace('%d', opt.minDays);
					box.find('.drp_top-bar').removeClass('normal').addClass('error').find('.error-top')
					.html(msg).attr('title', msg);
				} else {
					if (opt.start || opt.end)
						box.find('.drp_top-bar').removeClass('error').addClass('normal');
					else
						box.find('.drp_top-bar').removeClass('error').removeClass('normal');
				}
				if ((opt.singleDate && opt.start && !opt.end) || (!opt.singleDate && opt.start && opt.end)) {
					box.find('.apply-btn').removeClass('disabled').val(lang('apply-enabled'));
				} else {
					box.find('.apply-btn').addClass('disabled').val(lang('apply-disabled'));
				}
				if (opt.batchMode) {
					if (
						(opt.start && opt.startDate && compareDay(opt.start, opt.startDate) < 0) ||
						(opt.end && opt.endDate && compareDay(opt.end, opt.endDate) > 0)) {
						opt.start = false;
						opt.end = false;
						box.find('.day').removeClass('checked');
					}
				}
			}
			function showSelectedInfo(forceValid, silent) {
				box.find('.start-day').html('...');
				box.find('.end-day').html('...');
				box.find('.selected-days').hide();
				if (opt.start) {
					box.find('.start-day').html(getDateString(opt.start));
				}
				if (opt.end) {
					box.find('.end-day').html(getDateString(opt.end));
				}
				var dateRange;
				if (opt.start && opt.singleDate) {
					box.find('.apply-btn').removeClass('disabled').val(lang('apply-enabled'));
					dateRange = getDateString(opt.start);
					if (!silent) {
						self.trigger('DRPick-change', {
							'value' : dateRange,
							'date1' : new Date(opt.start)
						});
					}
				} else if (opt.start && opt.end) {
					box.find('.selected-days').show().find('.selected-days-num').html(countDays(opt.end, opt.start));
					box.find('.apply-btn').removeClass('disabled').val(lang('apply-enabled'));
					dateRange = getDateString(opt.start) + opt.separator + getDateString(opt.end);
					if (!silent) {
						self.trigger('DRPick-change', {
							'value' : dateRange,
							'date1' : new Date(opt.start),
							'date2' : new Date(opt.end)
						});
					}
				} else if (forceValid) {
					box.find('.apply-btn').removeClass('disabled').val(lang('apply-enabled'));
				} else {
					box.find('.apply-btn').addClass('disabled').val(lang('apply-disabled'));
				}
				var normalmsg = box.find('.drp_top-bar .normal-top');
				normalmsg.attr('title', normalmsg.text());
			}
			function setDateRange(date1, date2, silent) {
				if (date1.getTime() > date2.getTime()) {
					var tmp = date2;
					date2 = date1;
					date1 = tmp;
					tmp = null;
				}
				var valid = true;
				if (opt.startDate && compareDay(date1, opt.startDate) < 0)
					valid = false;
				if (opt.endDate && compareDay(date2, opt.endDate) > 0)
					valid = false;
				if (!valid) {
					showMonth(opt.startDate, 'month1');
					showMonth(nextMonth(opt.startDate), 'month2');
					showGap();
					return;
				}
				if (opt.start != date1.getTime() || opt.end != date2.getTime()) {
					opt.start = date1.getTime();
					opt.end = date2.getTime();
					if (opt.stickyMonths || (compareDay(date1, date2) > 0 && compareMonth(date1, date2) === 0)) {
						if (opt.lookBehind) {
							date1 = prevMonth(date2);
						} else {
							date2 = nextMonth(date1);
						}
					}
					if (opt.stickyMonths) {
						if (opt.endDate !== false && compareMonth(date2, opt.endDate) > 0) {
							date1 = prevMonth(date1);
							date2 = prevMonth(date2);
						}
					} else {
						if (compareMonth(date1, date2) === 0) {
							if (opt.lookBehind) {
								date1 = prevMonth(date2);
							} else {
								date2 = nextMonth(date1);
							}
						}
					}
					showMonth(date1, 'month1');
					showMonth(date2, 'month2');
					showGap();

					checkSelectionValid();
					showSelectedInfo(false, silent);
					showSelectedDays();
				}
				if (!silent)
					autoclose();
			}
			function showSelectedDays() {
				if (!opt.start && !opt.end)
					return;
				var start = opt.start ? moment(opt.start).startOf('day').valueOf() : 0;
				var end = opt.end ? moment(opt.end).startOf('day').valueOf() : 0;
				box.find('.day').each(function () {
					var time = parseInt($(this).attr('SOD-time'), 10);
					if (
						(opt.start && opt.end && end >= time && start <= time) ||
						(opt.start && !opt.end && start == time)) {
						$(this).addClass('checked');
					} else {
						$(this).removeClass('checked');
					}
					//add first-date-selected class name to the first date selected
					if (opt.start && start == time) {
						$(this).addClass('first-date-selected');
					} else {
						$(this).removeClass('first-date-selected');
					}
					//add last-date-selected
					if (opt.end && end == time) {
						$(this).addClass('last-date-selected');
					} else {
						$(this).removeClass('last-date-selected');
					}
				});
				box.find('.week-number').each(function () {
					if (parseInt($(this).attr('SOW-time'), 10) == opt.startWeek) {
						$(this).addClass('week-number-selected');
					}
				});
				if (opt.end) {
					box.find('.week-number').each(function () {
						var weekdate = new Date(parseInt($(this).attr('SOW-time'), 10));
						var startTime = moment(weekdate).day(opt.startOfWeek == 'monday' ? 1 : 0).valueOf();
						var endTime = moment(weekdate).day(opt.startOfWeek == 'monday' ? 7 : 6).valueOf();
						if ((startTime >= opt.start) && (endTime <= opt.end)) {
							$(this).addClass('week-number-selected');
						} else {
							$(this).removeClass('week-number-selected');
						}
					});
				}
			}
			function showMonth(date, month) {
				date = moment(date).startOf('month').toDate();
				box.find('.' + month + ' .month-name').html(nameMonth(date));
				box.find('.' + month + ' tbody').html(createMonthHTML(date));
				opt[month] = date;
				updateSelectableRange();
			}
			function nameMonth(d) {
				opt.mFormatter.toDate().setTime(d);
				return opt.mFormatter.format(opt.monthFMT);
			}
			function getDateString(d) {
				opt.mFormatter.toDate().setTime(d);
				return opt.mFormatter.format(opt.format);
			}
			function showGap() {
				var shouldShow = Math.abs(moment(opt.month1).diff(moment(opt.month2), 'month')) > 1;
				if (shouldShow) {
					box.addClass('has-gap').removeClass('no-gap').find('.gap').css('visibility', 'visible');
				} else {
					box.removeClass('has-gap').addClass('no-gap').find('.gap').css('visibility', 'hidden');
				}
				var h1 = box.find('table.month1').height();
				var h2 = box.find('table.month2').height();
				box.find('.gap').height(Math.max(h1, h2) + 10);
			}
			function redrawDatePicker() {
				showMonth(opt.month1, 'month1');
				showMonth(opt.month2, 'month2');
			}
			function compareMonth(m1, m2) {
				return moment(m1).diff(moment(m2), 'month');
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
			function createDom() {
				var html = '<div class="date-picker-wrapper';
				if (opt.extraClass)
					html += ' ' + opt.extraClass + ' ';
				if (opt.singleDate)
					html += ' single-date ';
				if (!opt.showShortcuts)
					html += ' no-shortcuts ';
				if (!opt.showTopbar)
					html += ' no-topbar ';
				if (opt.customTopBar)
					html += ' custom-topbar ';
				html += '">';
				if (opt.showTopbar) {
					html += '<div class="drp_top-bar">';
					if (opt.customTopBar) {
						if (typeof opt.customTopBar == 'function')
							opt.customTopBar = opt.customTopBar();
						html += '<div class="custom-top">' + opt.customTopBar + '</div>';
					} else {
						html += '<div class="normal-top">'
						 + '<span>' + lang('selected') + '</span> '
						 + '<b class="start-day">...</b> ';
						if (!opt.singleDate) {
							html += ' <span class="separator-day">' + opt.separator + '</span> '
							 + '<b class="end-day">...</b>'
							 + '<i class="selected-days"> (<span class="selected-days-num">X</span> ' + lang('days') + ')</i>';
						}
						html += '</div>';
						html += '<div class="error-top">error</div>'
						 + '<div class="default-top">default</div>';
					}
					html += '<input type="button" class="apply-btn disabled ' + getApplyBtnClass() + '" value="' + lang('apply-disabled') + '" />';
					html += '</div>';
				}
				var _colspan = opt.showWeekNumbers ? 6 : 5;
				var arrowPrev = '&lt;';
				if (opt.customArrowPrevSymbol)
					arrowPrev = opt.customArrowPrevSymbol;
				var arrowNext = '&gt;';
				if (opt.customArrowNextSymbol)
					arrowNext = opt.customArrowNextSymbol;
				html += '<div class="month-wrapper">' +
				'   <table class="month1" cellspacing="0" border="0" cellpadding="0">' +
				'       <thead>' +
				'           <tr class="caption">' +
				'               <th style="width:27px;">' +
				'                   <span class="prev">' +
				arrowPrev +
				'                   </span>' +
				'               </th>' +
				'               <th colspan="' + _colspan + '" class="month-name">' +
				'               </th>' +
				'               <th style="width:27px;">' +
				(opt.singleDate || !opt.stickyMonths ? '<span class="next">' + arrowNext + '</span>' : '') +
				'               </th>' +
				'           </tr>' +
				'           <tr class="week-name">' + getWeekHead() +
				'       </thead>' +
				'       <tbody></tbody>' +
				'   </table>';
				if (hasMonth2()) {
					html += '<div class="gap">' + getGapHTML() + '</div>' +
					'<table class="month2" cellspacing="0" border="0" cellpadding="0">' +
					'   <thead>' +
					'   <tr class="caption">' +
					'       <th style="width:27px;">' +
					(!opt.stickyMonths ? '<span class="prev">' + arrowPrev + '</span>' : '') +
					'       </th>' +
					'       <th colspan="' + _colspan + '" class="month-name">' +
					'       </th>' +
					'       <th style="width:27px;">' +
					'           <span class="next">' + arrowNext + '</span>' +
					'       </th>' +
					'   </tr>' +
					'   <tr class="week-name">' + getWeekHead() +
					'   </thead>' +
					'   <tbody></tbody>' +
					'</table>';
				}
				html += '<div style="clear:both;height:0;font-size:0;"></div>'
				 + '</div>';
				html += '<div class="footer">';
				if (opt.showShortcuts) {
					html += '<div class="shortcuts"><b>' + lang('shortcuts') + '</b>';
					var data = opt.shortcuts;
					if (data) {
						var name;
						if (data['prev-days'] && data['prev-days'].length > 0) {
							html += '&nbsp;<span class="prev-days">' + lang('past');
							for (var i = 0; i < data['prev-days'].length; i++) {
								name = data['prev-days'][i];
								name += (data['prev-days'][i] > 1) ? lang('days') : lang('day');
								html += ' <a href="javascript:;" shortcut="day,-' + data['prev-days'][i] + '">' + name + '</a>';
							}
							html += '</span>';
						}
						if (data['next-days'] && data['next-days'].length > 0) {
							html += '&nbsp;<span class="next-days">' + lang('following');
							for (var i = 0; i < data['next-days'].length; i++) {
								name = data['next-days'][i];
								name += (data['next-days'][i] > 1) ? lang('days') : lang('day');
								html += ' <a href="javascript:;" shortcut="day,' + data['next-days'][i] + '">' + name + '</a>';
							}
							html += '</span>';
						}
						if (data.prev && data.prev.length > 0) {
							html += '&nbsp;<span class="prev-buttons">' + lang('previous');
							for (var i = 0; i < data.prev.length; i++) {
								name = lang('prev-' + data.prev[i]);
								html += ' <a href="javascript:;" shortcut="prev,' + data.prev[i] + '">' + name + '</a>';
							}
							html += '</span>';
						}
						if (data.next && data.next.length > 0) {
							html += '&nbsp;<span class="next-buttons">' + lang('next');
							for (var i = 0; i < data.next.length; i++) {
								name = lang('next-' + data.next[i]);
								html += ' <a href="javascript:;" shortcut="next,' + data.next[i] + '">' + name + '</a>';
							}
							html += '</span>';
						}
					}
					if (opt.customShortcuts) {
						for (var i = 0; i < opt.customShortcuts.length; i++) {
							var sh = opt.customShortcuts[i];
							html += '&nbsp;<span class="custom-shortcut"><a href="javascript:;" shortcut="custom">'
							 + sh.name + '</a></span>';
						}
					}
					html += '</div>';
				}
				// Add Custom Values Dom
				if (opt.showCustomValues) {
					html += '<div class="customValues"><b>' + (opt.customValueLabel || lang('custom-values')) + '</b>';
					if (opt.customValues) {
						for (var i = 0; i < opt.customValues.length; i++) {
							var val = opt.customValues[i];
							html += '&nbsp;<span class="custom-value"><a href="javascript:;" custom="' + val.value + '">'
							 + val.name + '</a></span>';
						}
					}
				}
				html += '</div></div>';
				return $(html);
			}
			function getApplyBtnClass() {
				var klass = '';
				if (opt.autoClose === true) {
					klass += ' hide';
				}
				if (opt.applyBtnClass !== '') {
					klass += ' ' + opt.applyBtnClass;
				}
				return klass;
			}
			function getWeekHead() {
				var prepend = opt.showWeekNumbers ? '<th>' + lang('week-number') + '</th>' : '';
				if (opt.startOfWeek == 'monday') {
					return prepend + '<th>' + lang('week-1') + '</th>' +
					'<th>' + lang('week-2') + '</th>' +
					'<th>' + lang('week-3') + '</th>' +
					'<th>' + lang('week-4') + '</th>' +
					'<th>' + lang('week-5') + '</th>' +
					'<th>' + lang('week-6') + '</th>' +
					'<th>' + lang('week-7') + '</th>';
				} else {
					return prepend + '<th>' + lang('week-7') + '</th>' +
					'<th>' + lang('week-1') + '</th>' +
					'<th>' + lang('week-2') + '</th>' +
					'<th>' + lang('week-3') + '</th>' +
					'<th>' + lang('week-4') + '</th>' +
					'<th>' + lang('week-5') + '</th>' +
					'<th>' + lang('week-6') + '</th>';
				}
			}
			function isMonthOutOfBounds(month) {
				month = moment(month);
				if (opt.startDate && month.endOf('month').isBefore(opt.startDate)) {
					return true;
				}
				if (opt.endDate && month.startOf('month').isAfter(opt.endDate)) {
					return true;
				}
				return false;
			}
			function getGapHTML() {
				var html = ['<div class="gap-top-mask"></div><div class="gap-bottom-mask"></div><div class="gap-lines">'];
				for (var i = 0; i < 20; i++) {
					html.push('<div class="gap-line">' +
						'<div class="gap-1"></div>' +
						'<div class="gap-2"></div>' +
						'<div class="gap-3"></div>' +
						'</div>');
				}
				html.push('</div>');
				return html.join('');
			}
			function hasMonth2() {
				return (!opt.singleMonth);
			}
			function attributesCallbacks(initialObject, callbacksArray, today) {
				var resultObject = $.extend(true, {}, initialObject);
				$.each(callbacksArray, function (cbAttrIndex, cbAttr) {
					var addAttributes = cbAttr(today);
					for (var attr in addAttributes) {
						if (resultObject.hasOwnProperty(attr)) {
							resultObject[attr] += addAttributes[attr];
						} else {
							resultObject[attr] = addAttributes[attr];
						}
					}
				});
				var attrString = '';
				for (var attr in resultObject) {
					if (resultObject.hasOwnProperty(attr)) {
						attrString += attr + '="' + resultObject[attr] + '" ';
					}
				}
				return attrString;
			}
			function createMonthHTML(d) {
				var days = [];
				d.setDate(1);
				var dayOfWeek = d.getDay();
				if ((dayOfWeek === 0) && (opt.startOfWeek === 'monday')) {
					// add one week
					dayOfWeek = 7;
				}
				var valid;
				if (dayOfWeek > 0) {
					for (var i = dayOfWeek; i > 0; i--) {
						var day = moment(d).subtract(i, 'day').toDate();
						valid = isValidTime(day.getTime());
						if (opt.startDate && compareDay(day, opt.startDate) < 0)
							valid = false;
						if (opt.endDate && compareDay(day, opt.endDate) > 0)
							valid = false;
						days.push({
							date : day,
							type : 'lastMonth',
							day : day.getDate(),
							time : day.getTime(),
							valid : valid
						});
					}
				}
				var today;
				var toMonth = d.getMonth();
				for (var i = 0; i < 40; i++) {
					today = moment(d).add(i, 'day').toDate();
					valid = isValidTime(today.getTime());
					if (opt.startDate && compareDay(today, opt.startDate) < 0)
						valid = false;
					if (opt.endDate && compareDay(today, opt.endDate) > 0)
						valid = false;
					days.push({
						date : today,
						type : today.getMonth() == toMonth ? 'toMonth' : 'nextMonth',
						day : today.getDate(),
						time : today.getTime(),
						valid : valid
					});
				}
				var html = [];
				var now = moment();
				for (var week = 0; week < 6; week++) {
					if (days[week * 7].type == 'nextMonth')
						break;
					html.push('<tr>');
					for (var day = 0; day < 7; day++) {
						var _day = (opt.startOfWeek == 'monday') ? day + 1 : day;
						today = days[week * 7 + _day];
						var mToday = moment(today.time);
						var toNow = mToday.diff(now, 'day', true);
						var highlightToday = toNow < 0 && toNow > -1;
						today.extraClass = '';
						today.tooltip = '';
						if (today.valid && opt.beforeShowDay && typeof opt.beforeShowDay == 'function') {
							var _r = opt.beforeShowDay(today.date);
							today.valid = _r[0];
							today.extraClass = _r[1] || '';
							today.tooltip = _r[2] || '';
							if (today.tooltip !== '')
								today.extraClass += ' has-tooltip ';
						}
						if (opt.startOfWeek == 'monday') {
							if (day >= 5)
								today.extraClass += ' weekend ';
						} else {
							if (day == 0 || day == 6)
								today.extraClass += ' weekend ';
						}
						var todayDivAttr = {
							'SOD-time' : today.time,
							'data-tooltip' : today.tooltip,
							'class' : 'day ' + today.type + ' ' + today.extraClass + ' '
							 + (today.valid ? 'valid' : 'invalid') + ' ' + (highlightToday ? 'real-today' : '')
						};
						if (day === 0 && opt.showWeekNumbers) {
							html.push('<td><div class="week-number" SOW-time="' + today.time + '">'
								 + opt.getWeekNumber(today.date) + '</div></td>');
						}
						html.push('<td ' + attributesCallbacks({}, opt.dayTdAttrs, today) + '>'
							 + '<div ' + attributesCallbacks(todayDivAttr, opt.dayDivAttrs, today) + '>'
							 + showDayHTML(today.time, today.day) + '</div></td>');
					}
					html.push('</tr>');
				}
				return html.join('');
			}
			function showDayHTML(time, date) {
				if (opt.showDateFilter && typeof opt.showDateFilter == 'function')
					return opt.showDateFilter(time, date);
				return date;
			}
			function getLanguages() {
				if (opt.language == 'auto') {
					var language = navigator.language ? navigator.language : navigator.browserLanguage;
					if (!language)
						return $.dateRangePickerLanguages['default'];
					language = language.toLowerCase();
					for (var key in $.dateRangePickerLanguages) {
						if (language.indexOf(key) !== -1) {
							return $.dateRangePickerLanguages[key];
						}
					}
					return $.dateRangePickerLanguages['default'];
				} else if (opt.language && opt.language in $.dateRangePickerLanguages) {
					return $.dateRangePickerLanguages[opt.language];
				} else {
					return $.dateRangePickerLanguages['default'];
				}
			}
			/**
			 * translate language string
			 */
			function lang(t) {
				var _t = t.toLowerCase();
				var re = (t in langs) ? langs[t] : (_t in langs) ? langs[_t] : null;
				var defaultLanguage = $.dateRangePickerLanguages['default'];
				if (re == null)
					re = (t in defaultLanguage) ? defaultLanguage[t] : (_t in defaultLanguage) ? defaultLanguage[_t] : '';
				return re;
			}
			function getDefaultTime() {
				var defaultTime = opt.defaultTime ? opt.defaultTime : new Date();
				if (opt.lookBehind) {
					if (opt.startDate && compareMonth(defaultTime, opt.startDate) < 0)
						defaultTime = nextMonth(moment(opt.startDate).toDate());
					if (opt.endDate && compareMonth(defaultTime, opt.endDate) > 0)
						defaultTime = moment(opt.endDate).toDate();
				} else {
					if (opt.startDate && compareMonth(defaultTime, opt.startDate) < 0)
						defaultTime = moment(opt.startDate).toDate();
					if (opt.endDate && compareMonth(nextMonth(defaultTime), opt.endDate) > 0)
						defaultTime = prevMonth(moment(opt.endDate).toDate());
				}
				if (opt.singleDate) {
					if (opt.startDate && compareMonth(defaultTime, opt.startDate) < 0)
						defaultTime = moment(opt.startDate).toDate();
					if (opt.endDate && compareMonth(defaultTime, opt.endDate) > 0)
						defaultTime = moment(opt.endDate).toDate();
				}
				return defaultTime;
			}
			function resetMonthsView(time) {
				if (!time) {
					time = getDefaultTime();
				}
				if (opt.lookBehind) {
					showMonth(prevMonth(time), 'month1');
					showMonth(time, 'month2');
				} else {
					showMonth(time, 'month1');
					showMonth(nextMonth(time), 'month2');
				}
				if (opt.singleDate) {
					showMonth(time, 'month1');
				}
				showGap();
				showSelectedDays();
			}
		};
	}));

var Report = (function(){
	var currentReport = "leadersReport";
	var nowDate = "";

	return {
		setCurrentReport: function(data){currentReport = data;},
		setNowDate: function(data){nowDate = data;},
		getCurrentReport: function(){return currentReport;},
		getNowDate: function(){return nowDate;},

		init: function(report,nowDate) {
			Report.setNowDate(nowDate);

			$(document).on('click','.menuReport',this.menuReport);
			$(document).on('click','.applyBtn',this.datePicker);
			$(document).on('click','.pagination li',this.pageChange);
			$(document).on('click','.searchSms',this.searchSms);

			$('[data-report=' + report + ']').click();
		},


		searchSms: function(){
			var report = Report.getCurrentReport();
			var search = $(this).prev().val();

			switch(report){
				case 'leadersReport': Report.leadersReport(search);break;
				case 'smsReport': Report.smsReport(search);break;
				case 'winnersReport': Report.winnersReport(search);break;
			}
		},
		datePicker: function(){
			var report = Report.getCurrentReport();

			switch(report){
				case 'leadersReport': Report.leadersReport();break;
				case 'smsReport': Report.smsReport();break;
				case 'winnersReport': Report.winnersReport();break;
			}
		},

		menuReport:function(){
			var currentReport = $(this).attr('data-report');
			Report.setCurrentReport(currentReport);
			if(!Report._isRequiredPage()){
				location.href = EllyCore.url('index','index') + '&report=' +currentReport;
				return;
			}
			$('.report-container').hide();
			$('.filter').hide();
			$('.pagination [data-page]').html(1);
			$('.'+currentReport).show();


			if(currentReport == 'smsReport')$('.applyBtn').click();

			switch(currentReport){
				case 'dayReportShort':
				Report.loadDayReportShort();
				break;
				case 'dayReportDetail':
				Report.loadDayReportDetail();
				break;
				case 'monthReportDetail':
				Report.loadMonthReportDetail();
				break;
				case 'monthReportShort':
				Report.loadMonthReportShort();
				break;
				case 'leadersReport': Report.leadersReport();break;
				case 'winnersReport': Report.winnersReport();break;
				case 'prizesReport': Report.prizesReport();break;
				case 'smsReport': Report.smsReport();break;

			}
		},

		pageChange: function(){
			var currentPage = parseInt($('.pagination [data-page]').html());
			var recordPage = $('.recordsPerPage').html();
			if($(this).attr('data-move') == "pagePrev"){
				if(currentPage  == 1)return;
				$('.pagination [data-page]').html(currentPage-1)
				//$('.pagination').attr('data-page',currentPage-1);
			}
			else if($(this).attr('data-move') == "pageCurrent"){
				$('.pagination [data-page]').html(1)
			}
			else{
				if(recordPage <= 0)return;
				$('.pagination [data-page]').html(currentPage+1)
			}

			$('.applyBtn').click();
		},

		smsReport:function(search){

			$('.filter').show();
			$('.filter table td').eq(1).show();
			var startDate = $('[name="daterangepicker_start"]').val()?$('[name="daterangepicker_start"]').val():Report.getNowDate();
			var endDate = $('[name="daterangepicker_end"]').val()?$('[name="daterangepicker_end"]').val():Report.getNowDate();
			var page = $('.pagination [data-page]').html();

			EllyCore.ajax({
				type: 'POST',
				url: EllyCore.url('index', 'getSmsRecordForDate'),
				data: {
					startDate:startDate,
					endDate:endDate,
					page:page,
					search: search
				},
				success: function(data) {
					$('.totalPage').html(data.totalPage);
					$('.recordsPerPage').html(data.recordsPerPage);

					EllyCore.template({
						element: $('#smsReport tbody'),
						source: $('#smsReport_template'),
						data: {
							sms:data.sms
						},
					});
				},
			});
		},

		winnersReport: function(){
			$('.filter').show();
			$('.filter table td').eq(1).hide();
			var startDate = $('[name="daterangepicker_start"]').val()?$('[name="daterangepicker_start"]').val():Report.getNowDate();
			var endDate = $('[name="daterangepicker_end"]').val()?$('[name="daterangepicker_end"]').val():Report.getNowDate();
			var page = $('.pagination [data-page]').html();
			console.log(startDate,endDate);

			EllyCore.ajax({
				type: 'POST',
				url: EllyCore.url('index', 'winners'),
				data: {
					startDate:startDate,
					endDate:endDate,
					page:page,
				},
				success: function(data) {
					console.log(data.winners);
					$('.totalPage').html(data.totalPage);
					$('.recordsPerPage').html(data.recordsPerPage);
					EllyCore.template({
						element: $('#winnersReport_container tbody'),
						source: $('#winnersReport_template'),
						data: {
							winners:data.winners
						},
					});
				},
			});

		},

		leadersReport: function(search){

			$('.filter').show();
			$('.filter table td').eq(1).show();
			var startDate = $('[name="daterangepicker_start"]').val()?$('[name="daterangepicker_start"]').val():Report.getNowDate();
			var endDate = $('[name="daterangepicker_end"]').val()?$('[name="daterangepicker_end"]').val():Report.getNowDate();
			var page = $('.pagination [data-page]').html();

			console.log(startDate,endDate);

			EllyCore.ajax({
				type: 'POST',
				url: EllyCore.url('index', 'leaders'),
				data: {
					startDate:startDate,
					endDate:endDate,
					page:page,
					search: search
				},
				success: function(data) {

					$('.totalPage').html(data.totalPage);
					$('.recordsPerPage').html(data.recordsPerPage);
					EllyCore.template({
						element: $('#leadersReport_container tbody'),
						source: $('#leadersReport_template'),
						data: {
							leaders:data.leaders
						},
					});
				},
			});
		},

		_isRequiredPage:function(){
			if($('.report-container').length>0)
				return 1;
			return 0;
		},

		_preparePage: function(page){
			alert(page.val());
		},

		loadDayReportDetail: function() {
			// var records_list = new EllyModel([], 'codeid');
			EllyCore.ajax({
				url: EllyCore.url('index', 'dayReportDetail'),
				success: function(data) {
					// records_list.push(data.records);
					EllyCore.template({
						element: $('#reportDetail tbody'),
						source: $('#dayReportDetail_template') ,
						data: {records: data.records},
					});
				},
			});

		},

		loadDayReportShort: function() {
			// var records_list = new EllyModel([], 'codeid');
			EllyCore.ajax({
				url: EllyCore.url('index', 'dayReportShort'),
				success: function(data) {
					// records_list.push(data.records);
					EllyCore.template({
						element: $('#reportShort tbody'),
						source: $('#dayReportShort_template') ,
						data: {records: data.records},
					});
				},
			});
		},

		prizesReport: function(){
			EllyCore.ajax({
				type: 'POST',
				url: EllyCore.url('index', 'prizes'),
				data: {

				 	context: 'json'
				},
				success: function(data) {
					EllyCore.template({
						element: $('#prizeReport_container'),
						source: $('#prizeReport_template'),
						data: {
							prizes: data.prizes_list
						}
					});

					 $('#graf').highcharts({
				        data: {
				            table: document.getElementById('123')
				        },
				        chart: {
				            type: 'column'
				        },
				        title: {
				            text: 'График'
				        },
				        yAxis: {
				            allowDecimals: false,
				            title: {
				                text: 'Призы'
				            }
				        },
				        tooltip: {
				            formatter: function () {
				                return '<b>' + this.series.name + '</b><br/>' +
				                   this.point.name + ' - ' + this.point.y;
				            }
				        }
				    });
				},
			});

		},

		loadMonthReportShort: function() {
			var records_list = new EllyModel([], 'codeid');

			EllyCore.ajax({
				url: EllyCore.url('index', 'monthReportShort'),
				success: function(data) {
					// records_list.push(data.records);
					EllyCore.template({
						element: $('#monthReportShort tbody'),
						source: $('#monthReportShort_template') ,
						data: {records: data.records}
					});
				},
			});

			// $('#graf').highcharts({
		 //        data: {
		 //            table: document.getElementById('monthReportShort')
		 //        },
		 //        chart: {
		 //            type: 'column'
		 //        },
		 //        title: {
		 //            text: 'График'
		 //        },
		 //        yAxis: {
		 //            allowDecimals: false,
		 //            title: {
		 //                text: 'Призы'
		 //            }
		 //        },
		 //        tooltip: {
		 //            formatter: function () {
		 //                return '<b>' + this.series.name + '</b><br/>' +
		 //                   this.point.name + ' - ' + this.point.y;
		 //            }
		 //        }
		 //    });
		},

		loadMonthReportDetail: function() {
			// var records_list = new EllyModel([], 'codeid');
			EllyCore.ajax({
				url: EllyCore.url('index', 'monthReportDetail'),
				success: function(data) {
					// records_list.push(data.records);
					EllyCore.template({
						element: $('#monthReportDetail tbody'),
						source: $('#monthReportDetail_template') ,
						data: {records: data.records},
					});
				},
			});
		},


	}
})();

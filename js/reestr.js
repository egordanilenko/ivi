var Reestr = (function(){

	var current_point = 0;
	var previous_point = 0;
	var map = [];
	var visibleActiveRecords = 0;
	var operatorList = [];
	var operatorPointList = [];
	var validator = {};

	return {
		setCurrentPoint: function(codeid) {
			current_point = codeid;
		},
		setPreviousPoint: function(codeid) {
			if ( codeid==0 ) return;
			previous_point = codeid;
		},
		setVisibleActiveRecords: function(state) {
			visibleActiveRecords = state;
		},
		setOperatorList: function(list) {
			operatorList = list;
		},
		setOperatorPointList: function(list) {
			operatorPointList = list;
		},

		getCurrentPoint: function() {
			return current_point;
		},
		getMap: function() {
			return map;
		},
		getVisibleActiveRecords: function() {
			return visibleActiveRecords;
		},
		getOperatorList: function() {
			return operatorList;
		},
		getOperatorPointList: function() {
			return operatorPointList;
		},


		init: function(code_subdealer, code_previous_subdealer) {
			$('#btnReestrAdd').click(this.openCreateForm);
			$(document).on('submit', '#reestr_form', this.checkPointLogin);
			$(document).on('click', '.btnParentSubdealerOpen', this.subdealerParentView);
			$(document).on('click', '.btnPointEdit', this.openEditForm);
			$(document).on('click', '.btnPointDelete', this.deleteReestr);
			$(document).on('click', '.btnSubdealerOpen', this.subdealerView);
			$(document).on('click', '.btnMapPoint', this.subdealerView);
			$(document).on('click', '.btnSubdealerToggle', this.subdealerToggle);
			$(document).on('click', '.btnOperatorToggle', this.operatorToggle);
			$(document).on('click', '.btnReestrOption', this.reestrOption);
			$(document).on('click', '.btnReestrGrafik', this.reestrGrafik);
			$(document).on('click', '.btnReestrPassword', this.restrPassword);
			$(document).on('click', '.btnReestrPredoplata', this.reestrPredoplata);
			$(document).on('click', '.btnReestrRu', this.reestrRu);
			$(document).on('click', '.btnRadioToggle', this.radioToggle);
			$(document).on('click', '.btnReestrOchki', this.reestrOchki);
			$(document).on('click', '.btnNextRecords', this.nextRecords);
			$(document).on('click', '.btnPrevRecords', this.prevRecords);
			$(document).on('click', '.btnCheckActiveRecords', this.CheckActiveRecords);
			$(document).on('click', '.btnSMSToggle', this.SMSToggle);
			$(document).on('click', '.btnSMSsend', this.SMSsend);
			$(document).on('click', '.btnSMShistory', this.SMShistory);
			$(document).on('click', '.btnPrintKassa', this.printKassa);
			$(document).on('click', '.btnReestrTelephonesShow', this.reestrTelephonesShow);
			$(document).on('click', '.btnReestrTelephoneAdd', this.reestrTelephoneAdd);
			$(document).on('click', '.btnDeleteTelephone', this.deleteTelephone);
			$(document).on('click', '.ckBoxMobileStatus', this.mobileStatus);
			$(document).on('focusout', '.cheakLogin', this.checkPointLogin);
			$(document).on('keyup', '.btnSearchLogin', this.searchLogin);
			$(document).on('change', '#select_region', this.renderReestr);


			this.setCurrentPoint(code_subdealer);
			this.setPreviousPoint(code_previous_subdealer);
			Reestr.renderReestr();
			this.mapSubDealer('next',reestr_current.login);


			Reestr._modalFormHide('reestr_form');


			for(i=0;i<region_list.list.length;i++){
				$('#select_region').append(
					$('<option value="' + region_list.list[i].codeid +'">' +
						region_list.list[i].region_name +
					  '</option>'));
			}

			this.passwordFormValidate();
			this.reestrFormValidate();


		},

		passwordFormValidate:function(){
		validator =	$( "#password_form" ).validate({
			  rules: {
			    passwordConfirm: {
			      required: true,
			      minlength: 6,
			    },
			    passwordConfirm2: {
			      equalTo: "#passwordConfirm"
			    },
			  }
			});
		},

		reestrFormValidate:function(){
			validator = $( "#reestr_form" ).validate({
				btnHideShow:'someLogin',
			  	rules: {
				  	login:{
				  		required:true,
				  	},
				    password: {
				      required: true,
				      minlength: 6,
				    },
				    passwordConfirm2: {
				      equalTo: "#passwordConfirm"
				    },
			  	}
			});
		},

		renderReestr: function() {

			//var visibleActiveRecords = Reestr.getVisibleActiveRecords();
			EllyCore.template({
				element: $('#reestr_container'),
				source: $('#reestr_list_template'),
				data: {reestr_list:reestr_list.list},
			});


			Reestr._pageInfo();
			Reestr.regionToggle();
			Reestr._radioSet();
			titleShow();
		},

		updateReestr: function() {

			EllyCore.ajax({
				url: EllyCore.url('point', 'index'),
				data: {code_subdealer: Reestr.getCurrentPoint(), context: 'json'},
				success: function(data) {
					Reestr.setPreviousPoint(data.reestr_current.code_subdealer)
					reestr_list.clear();
					reestr_list.push(data.reestr_list);
					Reestr.renderReestr();

				},
			});
		},

		_modalFormHide:function(formName,isSetData){
			EllyCore.ajaxForm({
				element: $('#' + formName),
				success: function(data) {
					if(isSetData == 'indetifed'){
						reestr_list.push(data.point);
						Reestr.renderReestr();
					}
					$('#elly-modal-container').modal('hide');
					Reestr.updateReestr();
				},
			});
		},

		_pageInfo: function(){
			var list = reestr_list.list;
			var len  = list.length;
			var count = 0;

			for(i=0;i<len;i++){
				if(list[i].check_terminals == 1)count++;
			}

			$('.recordsTotal').html(len);
			$('.recordsActive').html(count);
		},

		regionToggle: function(){
			var selectRegion = $('#select_region option:selected').val();
			if(selectRegion == 'Все')return;

			var list = reestr_list.list;
			var len = list.length;


			for(i=0;i<len;i++){
				console.log(list[i].code_region,selectRegion,list[i].codeid);
				if(list[i].code_region != selectRegion ){
					$('#reestr_' + list[i].codeid).remove();
				}
			}

		},

		operatorToggle:function(){
			//alert('will work tomorrow');
			//console.log($(this).parents('tr').find('[disabled]'));
			var toggle = ($(this).parents('tr').find('[readonly]')).length;
			if(toggle){
				$(this).html('<img src="img/icon/yes.png">' +
					'<input type="hidden" name="status[]" value="1">');
				$(this).parents('tr').find('[readonly]').removeAttr('readonly');
			}
			else{
				$(this).html('<img src="img/icon/no.png">' +
					'<input type="hidden" name="status[]" value="0">');
				$(this).parents('tr').find('input').attr('readonly','readonly');

			}
		},

		openCreateForm: function(event) {
			var $this = $(this);
			$('#login').removeAttr('data-current_login');
			validator.resetForm();

			EllyCore.showAjaxForm({
				url: EllyCore.url('point', 'create'),
				data: {code_subdealer: current_point},
				element: $('#reestr_form_container'),
				title: 'Регистрация нового агента',
				width: 900,
			});

		},

		checkPointLogin:function(){
			$('#reestr_form').removeAttr('someLogin');
			var login = $(this).val();
			var current_login = $('#login').attr('data-current_login');
			if(current_login == login)return;

			EllyCore.ajax({
				type:'POST',
				url: EllyCore.url('point', 'pointCheckLogin'),
				data: {login: login},
				success: function(data) {
					if(data.error){
						alert("Такой логин уже существует. Введите другой логин.");
						$('#reestr_form').find('button').attr('disabled',true);
						$('#reestr_form').attr('someLogin',true);
					}

					//$('#reestr_' + code_reestr).remove();
				},
			});
		},

		openEditForm: function(event) {
			validator.resetForm();
			var code_reestr = $(this).parents('tr').attr('data-code_reestr');
			EllyCore.showAjaxForm({
				url: EllyCore.url('point', 'edit'),
				data: reestr_list.get(code_reestr),
				element: $('#reestr_form_container'),
				title: 'Редактирование субдилера',
				width: 900,
			});

			$('#login').attr('data-current_login',reestr_list.get(code_reestr).login);
		},

		subdealerParentView: function(event) {
			if(current_point == user_current) return;
			Reestr.setCurrentPoint(previous_point);

			EllyCore.ajax({
				url: EllyCore.url('point', 'index'),
				data: {code_subdealer: previous_point, context: 'json'},
				success: function(data) {
					Reestr.setPreviousPoint(data.reestr_current.code_subdealer);
					reestr_list.clear();
					reestr_list.push(data.reestr_list);
					Reestr.renderReestr();
					Reestr.mapSubDealer('prev');
				},
			});
		},

		subdealerView: function(event) {
			if(event.target.id == ''){
				var code_reestr = $(this).parents('tr').attr('data-code_reestr');
			}
			else{
				var code_reestr = event.target.id;
				Reestr.mapSubDealer(code_reestr);
			}

			Reestr.setCurrentPoint(code_reestr);

			EllyCore.ajax({
				url: EllyCore.url('point', 'index'),
				data: {code_subdealer: code_reestr, context: 'json'},
				success: function(data) {
					Reestr.setPreviousPoint(data.reestr_current.code_subdealer)
					reestr_list.clear();
					reestr_list.push(data.reestr_list);
					Reestr.renderReestr();

				},
			});
			if(event.target.id == '')Reestr.mapSubDealer('next',event.target.name);
		},

		deleteReestr: function(event) {
			if ( !EllyCore.confirm('Удалить?') ) return;

			var code_reestr = $(this).parents('tr').attr('data-code_reestr');

			EllyCore.ajax({
				url: EllyCore.url('point', 'delete'),
				data: {codeid: code_reestr},
				success: function(data) {
					reestr_list.delete(code_reestr);
					$('#reestr_' + code_reestr).remove();
				},
			});
		},
		mapSubDealer: function(move,login){
			var currentPoint = this.getCurrentPoint();
			var map = this.getMap();
			switch (move){
				case 'next':map.push({point:currentPoint,name:login});
					break;
				case 'prev': if(map.length == 1)break;map.pop();
					break;
				default:{
					for(i=map.length-1;i>=0;i--){
						if(map[i].point !=move){
							map.pop();
						}
						else{
							break;
						}
					}
				}

			}

			EllyCore.template({
				element: $('#map_sub_dealer_container'),
				source: $('#map_sub_dealer_template'),
				data: {map: map},
			});
		},

		subdealerToggle: function(){
			var img = $(this).find('img');
			var code_reestr = $(this).parents('tr').attr('data-code_reestr');
			var check_terminals = 1;

			if(img.attr('src') == 'img/yes.png')
				var check_terminals = 0;

			EllyCore.ajax({
				type: 'post',
				url: EllyCore.url('point', 'edit'),
				data: {codeid: code_reestr,check_terminals: check_terminals},
				success: function(data){
					reestr_list.push(data.point);
					Reestr.renderReestr();
				}
			});
		},

		reestrOption: function(){
		var codeid = $(this).parents('tr').attr('data-code_reestr');
			EllyCore.ajax({
				type: 'post',
				url: EllyCore.url('point', 'getOperators'),
				data: {codeid: codeid},
				success: function(data){
					Reestr.setOperatorList(data.sp_operator);

					Reestr.setOperatorPointList(data.points_operators);
					Reestr._reestrOptionForm(data.operators,codeid);
				}
			});
		},

		_reestrOptionForm: function(operatorsList,codeidPoint){

			EllyCore.template({
				element: $('#operators_form_container'),
				source: $('#operators_form_template'),
				data: {operators: operatorsList},
			});



			EllyCore.showAjaxForm({
				url: EllyCore.url('point', 'getOperators'),
				data: {update: 'update',codeidPoint:codeidPoint},
				element: $('#operators_form'),
				title: 'Редактирование поставщиков',
				width: '90%',
			});
			EllyCore.ajaxForm({
				element: $('#operators_form'),
				success: function(data) {
					$('#elly-modal-container').modal('hide');
				}
			});



			$('[href = #tab-'+ operatorsList[0].codeid +']').click();

		},

		reestrGrafik: function(){
			alert("reestrGrafik");
		},

		mobileStatus: function(){
			var status = $(this).prop("checked")?1:0;
			var codeid = $(this).parents('tr').attr('data-code_telephone');

			EllyCore.ajax({
				type: 'post',
				url: EllyCore.url('point', 'points_mobileEdit'),
				data: {codeid: codeid,status: status},
				success: function(data){
					reestr_list.push(data.point);
					Reestr.renderReestr();
				}
			});
		},

		restrPassword: function(){

			var code_reestr = $(this).parents('tr').attr('data-code_reestr');
			EllyCore.showAjaxForm({
				url: EllyCore.url('point', 'edit'),
				data: {codeid:code_reestr},
				element: $('#password_form'),
				title: 'Редактирование пароля',
				width: 500
			});

			Reestr._modalFormHide('password_form');

		},

		reestrPredoplata: function(){
			var code_reestr = $(this).parents('tr').attr('data-code_reestr');
			var kassa_point;


			EllyCore.ajax({
				url: EllyCore.url('point','getKassa'),
				data: {codeid:code_reestr},
				success: function(data){
					EllyCore.template({
					element: $('#kassa_container'),
					source: $('#kassa_template'),
					data: {kassa_point: data.kassa},
					});

					EllyCore.showAjaxForm({
					data: data.kassa,
					element: $('#kassa_form_container'),
					title: 'Баланс субдилера name: summa сом',
					width: 500
					});
				}
			});




		},

		reestrRu: function(){
			var img = $(this).find('img');
			var code_reestr = $(this).parents('tr').attr('data-code_reestr');
			var sms_lang = 0;

			switch(img.attr('src')){
				case "img/icon/ru.gif": sms_lang =1;
					break;
				case "img/icon/kg.gif": sms_lang =2;
					break;
			}

			EllyCore.ajax({
				type: 'post',
				url: EllyCore.url('point', 'edit'),
				data: {codeid: code_reestr,sms_lang: sms_lang},
				success: function(data){
					reestr_list.push(data.point);
					Reestr.renderReestr();
				}
			});
		},

		reestrOchki: function(){
			alert("reestrOchki");
		},

		SMSToggle: function(){
			var img = $(this).find('img');
			var code_reestr = $(this).parents('tr').attr('data-code_reestr');
			var sms_uvedomlenie = 1;

			if(img.attr('src') == 'img/icon/yes.png')
				sms_uvedomlenie = 0;

			EllyCore.ajax({
				type: 'post',
				url: EllyCore.url('point', 'edit'),
				data: {codeid: code_reestr,sms_uvedomlenie: sms_uvedomlenie},
				success: function(data){
					reestr_list.push(data.point);
					Reestr.renderReestr();
				}
			});
		},

		_radioSet: function(){
			var list = reestr_list.list;
			var len = list.length;
			var flag = 1;
			for(i=0;i<len;i++){
				if(list[i].check_terminals == 0)
					flag=0;
			};
			if(flag == 0){
				$('.radio_check').attr({
					src: "img/icon/radio_uncheck.gif",
					title: 'Отключить',
					alt: 'Отключить'
				});
			}
		},

		_radioCheck:function (){

			var state = 1;

			if($('.radio_check').attr('src') == "img/icon/radio_check.gif"){
				$('.radio_check').attr({
					src: "img/icon/radio_uncheck.gif",
					title: 'Отключить',
					alt: 'Отключить'
				});
				state = 0;


			}else{
				$('.radio_check').attr({
					src: "img/icon/radio_check.gif",
					title: 'Включить',
					alt: 'Включить'
				})
			}
			return state;
		},

		radioToggle: function(){

			var state = Reestr._radioCheck();
			EllyCore.ajax({
				url: EllyCore.url('point', 'updatePoints'),
				data: {
					code_subdealer: Reestr.getCurrentPoint(),
					field: "check_terminals",
					data: state
				},
				success:function(){
					EllyCore.ajax({
						url: EllyCore.url('point', 'index'),
						data: {code_subdealer: Reestr.getCurrentPoint(), context: 'json'},
						success: function(data) {
							reestr_list.clear();
							reestr_list.push(data.reestr_list);
							Reestr.renderReestr();
						},
					});
				}
			});
		},

		searchLogin: function(event){
			//if (event.keyCode != 13)return;

			Reestr.renderReestr();
			var list = reestr_list.list;
			var len = list.length;
			var data = $(this).val();

			var expr = new RegExp('.*' + data +'.*');


			for(i=0;i<len;i++){
				if(!expr.test(list[i].login)){

					$('#reestr_' + list[i].codeid).remove();
					//list.delete(list[i].codeid);
				}
			}

		},
		nextRecords: function(){
			alert("nextRecords");
		},
		prevRecords: function(){
			alert("prevRecords");
		},

		printKassa: function(){
			alert("printKassa");
		},
		deleteTelephone: function(){
			var telephone = $(this).parents('tr').find('td:first').html();
			$(this).parents('tr').remove();


			EllyCore.ajax({
				url: EllyCore.url("point","deleteTelephone"),
				data:{
					telephone:telephone
				},
				success:function(){
				}
			})

		},
		reestrTelephoneAdd: function(){
			var telephone = $('#reestrTelephoneData').val();
			var code_point = $(this).parents('table').attr('data-code_point');
			EllyCore.ajax({
				url: EllyCore.url("point","insertTelephone"),
				data:{
					telephone:telephone,
					code_point:code_point
				},
				success:function(data){
					if(data.error){
						alert('Такой номер существует');
					}
					else{
						$('#reestrTelephonePut tr:last').before(
							"<tr class='slow-appear' data-code_telephone=" + data.codeid +">"+
								"<td>" + data.telephone +"</td>" +
								"<td><input type='checkBox' class='ckBoxMobileStatus'></td>" +
								"<td><a href='javascript://' class='btnDeleteTelephone'>"+
								"<span class='core_icons_16 cross'></a></td>" +
						"</tr>");

						$('#reestrTelephoneData').val('');
						// $( ".slow-appear" ).animate({
						//     opacity: 0.25,
						//     left: "+=50",
						//     height: "toggle"
						//   }, 5000, function() {
						//     // Animation complete.
						//   });
						//$('.slow-appear').hide().toggle( "clip" );

					}

				}
			})
		},
		reestrTelephonesShow: function(){
		var code_point = $(this).parents('tr').attr('data-code_reestr');


			EllyCore.ajax({
				url: EllyCore.url("point","getTelephone"),
				data:{
					code_point:code_point
				},
				success:function(data){
					EllyCore.template({
					element: $('#telephone_form_container'),
					source: $('#telephone_form_template'),
					data:{
						telephone:data.telephone,
						code_point:code_point
					},
					callback:function(){
						console.log(code_point);
						EllyCore.showAjaxForm({
						data:{
							code_point:code_point,
						},
						element: $('#telephone_form'),
						title: "Номера телефонов",
						width: 600
						})
					}
					})
				}
			})
		},

		SMSsend: function(){
			var codeid = $(this).parents('tr').attr('data-code_reestr');

			if(codeid == undefined){
				codeid = reestr_current.codeid;
				$('#cheackBoxSMS').hide();
				$('#SMS_form :radio').attr('disabled','disabled');
			}
			else{
				$('#cheackBoxSMS').show();
				$('#SMS_form  :radio').removeAttr('disabled');
			}

			EllyCore.showAjaxForm({
				url:EllyCore.url("point","insertSMS"),
				data:{
					codeid:codeid,
				},
				element:$('#SMS_form'),
				title: "Рассылка сообщений",
				width:600
			});

			Reestr._modalFormHide('SMS_form',0);
		},

		SMShistory: function(){
			var code_point = $(this).parents('tr').attr('data-code_reestr');

			EllyCore.ajax({
				type:'POST',
				url: EllyCore.url('point', 'getSMShistory'),
				data: {code_point: code_point},
				success: function(data) {
					EllyCore.template({
					element: $('#SMShistory_form_container'),
					source: $('#SMShistory_form_template'),
					data: {sms:data.sms},
					callback:function(){
						EllyCore.showAjaxForm({
							//url: EllyCore.url('point', 'create'),
							//data: {code_subdealer: current_point},
							element: $('#SMShistory_form'),
							title: 'История сообщений',
							width: 900,
						});
					}
					});

				},
			});




		},

		CheckActiveRecords: function(event){
			var state = event.target.checked;
			Reestr.setVisibleActiveRecords(state);
			Reestr.renderReestr();

		},





	}
})();

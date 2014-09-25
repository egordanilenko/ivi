var Service = (function(){
	return {

		init: function() {
			// $('#btnAdd').click(this.openCreateForm);
			$(document).on('click', '.operator-chooser-item', this.openCreateForm);
			$(document).on('click', '.btnEdit', this.openEditForm);
			$(document).on('click', '.btnDelete', this.deleteOptions);

			this.loadGroupOperators(0);
			this.loadReestr();

			EllyCore.ajaxForm({
				element: $('#reestr_form'),
				success: function(data) {
					reestr_list.push(data.reestr);
					Service.loadReestr();
					$('#elly-modal-container').modal('hide');
					$('#reestr_table tr:last').remove();
				},
			});

			EllyCore.ajaxForm({
		 		url: EllyCore.url('service', 'add_mobile_payments'),
				element: $('#mobile_form'),
				beforeSubmit: function(){
					$('#mobile_form input').val('');
				},
				success: function(data) {
					$('#mobile_form input').val('');
					reestr_list.clear();
					reestr_list.push(data.reestr_list);
					Service.loadReestr();
				}
			});
		},

		loadReestr: function() {
			$('#reestr_container').html('');
			EllyCore.template({
				element: $('#reestr_container'),
				source: $('#reestr_template') ,
				data: {reestr: reestr_list.list},
                method: 'prepend',
			});
			titleShow();
		},

		openCreateForm: function(event) {
			$('#code_service').val($(this).attr("data-id"));
			// console.log($(this).attr("data-id"));
			$('.find_error').html('');
            $('.find_message').html('');
            $('#btnSubmit').prop('disabled' ,false);
			EllyCore.showAjaxForm({
				url: EllyCore.url('service', 'create'),
				element: $('#reestr_form_container'),
				title: 'Регистрация нового платежа',
				width: 500,
			});
		},

		loadGroupOperators: function(id) {
			if(id == -1)
				id = cur_id;
			EllyCore.ajax({
				url: EllyCore.url('service', 'get_operators'),
				data: { id:id },
				success: function(data) {
					EllyCore.template({
						element: $('#operators_container'),
						source: $('#operators_list_template') ,
						data: {operators: data.operators_list},
					});
					cur_id = id;
				}
			});
		},

	}
})();

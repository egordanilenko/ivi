var Payment = (function(){

	return {

		init: function() {
			$('#btnAdd').click(this.openCreateForm);
			$(document).on('click', '.btnEdit', this.openEditForm);
			$(document).on('click', '.btnDelete', this.deletepayments);
			// $(document).on('click', '.btnSubdealerOpen', this.subdealerView);

			EllyCore.ajaxForm({
				element: $('#payments_form'),
				success: function(data) {
					payments_list.push(data.payment);
					// Payment.renderOptions();
					$('#operator_' + operators_vyplaty.list[0].codeid).click();
					$('#elly-modal-container').modal('hide');
				},
			});
		},

		renderOptions: function() {

			EllyCore.template({
				element: $('#payment_container'),
				source: $('#payment_list_template') ,
				data: {payments: payments_list.list},
			});
			titleShow();
		},

		openCreateForm: function(event) {
			// var id = $(this);
			EllyCore.showAjaxForm({
				url: EllyCore.url('payment', 'create'),
				// data: {codeid: current_operator},
				element: $('#payments_form_container'),
				title: 'Регистрация новой выплаты',
				width: 500,
			});

			$('#radio_1').click();
		},

		// openEditForm: function(event) {
		// 	var codeid = $(this).parents('tr').attr('data-codeid');

		// 	EllyCore.showAjaxForm({
		// 		url: EllyCore.url('payment', 'edit'),
		// 		data: payments_list.get(codeid),
		// 		// data: {codeid: current_operator},
		// 		element: $('#payments_form_container'),
		// 		title: 'Редактирование выплаты',
		// 		width: 500,
		// 	});
		// },

		// deletepayments: function(event) {
		// 	if ( !EllyCore.confirm('Удалить?') ) return;

		// 	var codeid = $(this).parents('tr').attr('data-codeid');

		// 	EllyCore.ajax({
		// 		url: EllyCore.url('payment', 'delete '),
		// 		data: {codeid: codeid},
		// 		success: function(data) {
		// 			payments_list.delete(codeid);
		// 			$('#payment_' + codeid).remove();
		// 		},
		// 	});
		// },
	}
})();

var prizes = (function(){

	return {

		init: function() {
			$('#btnAdd').click(this.openCreateForm);
			$(document).on('click', '.btnEdit', this.openEditForm);
			$(document).on('click', '.btnDelete', this.deleteprizes);
			// $(document).on('click', '.btnSubdealerOpen', this.subdealerView);
			this.renderprizes();

			EllyCore.ajaxForm({
				element: $('#prizes_form'),
				success: function(data) {
					prizes_list.push(data.prize);
					prizes.renderprizes();
					$('#elly-modal-container').modal('hide');
				},
			});
		},

		renderprizes: function() {

			EllyCore.template({
				element: $('#prize_container'),
				source: $('#prize_list_template') ,
				data: {prizes: prizes_list.list},
			});
			titleShow();
		},

		openCreateForm: function(event) {
			EllyCore.showAjaxForm({
				url: EllyCore.url('index', 'prize_create'),
				element: $('#prizes_form_container'),
				title: 'Регистрация нового пользователя',
				width: 500,
				success:function(){
				}
			});
		},

		openEditForm: function(event) {
			var codeid = $(this).parents('tr').attr('data-codeid');
			EllyCore.showAjaxForm({
				url: EllyCore.url('index', 'prize_edit'),
				data: prizes_list.get(codeid),
				element: $('#prizes_form_container'),
				title: 'Редактирование пользователя',
				width: 500,
				success: function(){
				}
			});
		},


		deleteprizes: function(event) {
			if ( !EllyCore.confirm('Удалить?') ) return;

			var codeid = $(this).parents('tr').attr('data-codeid');

			EllyCore.ajax({
				url: EllyCore.url('index', 'prize_delete'),
				data: {codeid: codeid},
				success: function(data) {
					prizes_list.delete(codeid);
					$('#prize_' + codeid).remove();
				},
			});
		},
	}
})();

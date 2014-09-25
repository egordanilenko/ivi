var users = (function(){

	return {

		init: function() {
			$('#btnAdd').click(this.openCreateForm);
			$(document).on('click', '.btnEdit', this.openEditForm);
			$(document).on('click', '.btnDelete', this.deleteusers);
			// $(document).on('click', '.btnSubdealerOpen', this.subdealerView);
			this.renderusers();

			EllyCore.ajaxForm({
				element: $('#users_form'),
				success: function(data) {
					users_list.push(data.user);
					users.renderusers();
					$('#elly-modal-container').modal('hide');
				},
			});
		},

		renderusers: function() {

			EllyCore.template({
				element: $('#user_container'),
				source: $('#user_list_template') ,
				data: {users: users_list.list},
			});
			titleShow();
		},

		openCreateForm: function(event) {
			EllyCore.showAjaxForm({
				url: EllyCore.url('index', 'user_create'),
				element: $('#users_form_container'),
				title: 'Регистрация нового пользователя',
				width: 500,
				success:function(){
				}
			});
		},

		openEditForm: function(event) {
			var codeid = $(this).parents('tr').attr('data-codeid');

			EllyCore.showAjaxForm({
				url: EllyCore.url('index', 'user_edit'),
				data: users_list.get(codeid),
				element: $('#users_form_container'),
				title: 'Редактирование пользователя',
				width: 500,
				success: function(){
				}
			});
		},


		deleteusers: function(event) {
			if ( !EllyCore.confirm('Удалить?') ) return;

			var codeid = $(this).parents('tr').attr('data-codeid');

			EllyCore.ajax({
				url: EllyCore.url('index', 'user_delete'),
				data: {codeid: codeid},
				success: function(data) {
					users_list.delete(codeid);
					$('#user_' + codeid).remove();
				},
			});
		},
	}
})();

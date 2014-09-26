var Groups = (function(){

	return {

		init: function() {
			$('#btnAdd').click(this.openCreateForm);
			$(document).on('click', '.btnEdit', this.openEditForm);
			$(document).on('click', '.btnDelete', this.deleteGroups);
			// $(document).on('click', '.btnSubdealerOpen', this.subdealerView);
			this.renderGroups();

			EllyCore.ajaxForm({
				element: $('#groups_form'),
				success: function(data) {
					groups_list.push(data.group);
					Groups.renderGroups();
					$('#elly-modal-container').modal('hide');
				},
			});
		},

		renderGroups: function() {

			EllyCore.template({
				element: $('#group_container'),
				source: $('#group_list_template') ,
				data: {groups: groups_list.list},
			});
			titleShow();
		},

		openCreateForm: function(event) {
			EllyCore.showAjaxForm({
				url: EllyCore.url('admin', 'group_create'),
				element: $('#groups_form_container'),
				title: 'Регистрация новой группы',
				width: 500,
				success:function(){
				}
			});
		},

		openEditForm: function(event) {
			var codeid = $(this).parents('tr').attr('data-codeid');

			EllyCore.showAjaxForm({
				url: EllyCore.url('admin', 'group_edit'),
				data: groups_list.get(codeid),
				element: $('#groups_form_container'),
				title: 'Редактирование группы',
				width: 500,
				success: function(){
				}
			});
		},


		deleteGroups: function(event) {
			if ( !EllyCore.confirm('Удалить?') ) return;

			var codeid = $(this).parents('tr').attr('data-codeid');

			EllyCore.ajax({
				url: EllyCore.url('admin', 'group_delete'),
				data: {codeid: codeid},
				success: function(data) {
					groups_list.delete(codeid);
					$('#group_' + codeid).remove();
				},
			});
		},
	}
})();

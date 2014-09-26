var Categories = (function(){

	return {

		init: function() {
			$('#btnAdd').click(this.openCreateForm);
			$(document).on('click', '.btnEdit', this.openEditForm);
			$(document).on('click', '.btnDelete', this.deleteCategories);
			// $(document).on('click', '.btnSubdealerOpen', this.subdealerView);
			this.renderCategories();

			EllyCore.ajaxForm({
				element: $('#categories_form'),
				success: function(data) {
					categories_list.push(data.category);
					Categories.renderCategories();
					$('#elly-modal-container').modal('hide');
				},
			});
		},

		renderCategories: function() {

			EllyCore.template({
				element: $('#category_container'),
				source: $('#category_list_template') ,
				data: {categories: categories_list.list},
			});
			titleShow();
		},

		openCreateForm: function(event) {
			EllyCore.showAjaxForm({
				url: EllyCore.url('admin', 'category_create'),
				element: $('#categories_form_container'),
				title: 'Регистрация новой категории',
				width: 500,
				success:function(){
				}
			});
		},

		openEditForm: function(event) {
			var codeid = $(this).parents('tr').attr('data-codeid');

			EllyCore.showAjaxForm({
				url: EllyCore.url('admin', 'category_edit'),
				data: categories_list.get(codeid),
				element: $('#categories_form_container'),
				title: 'Редактирование категории',
				width: 500,
				success: function(){
				}
			});
		},


		deleteCategories: function(event) {
			if ( !EllyCore.confirm('Удалить?') ) return;

			var codeid = $(this).parents('tr').attr('data-codeid');

			EllyCore.ajax({
				url: EllyCore.url('admin', 'category_delete'),
				data: {codeid: codeid},
				success: function(data) {
					categories_list.delete(codeid);
					$('#category_' + codeid).remove();
				},
			});
		},
	}
})();

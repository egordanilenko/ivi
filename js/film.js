var Film = (function(){

	return {
	init: function() {
		$(document).on('click','.btnDetail td',this.detail);
		$(document).on('click','.btnFilmAdd',this.FilmCreateForm);
		$(document).on('click','.btnFilmEdit',this.FilmEditForm);
		$(document).on('click','.btnFilmDelete',this.FilmDelete);
				this.renderFilm();

				EllyCore.ajaxForm({
					element: $('#Film_form'),
					success: function(data) {
						Film_list.push(data.Film);
						Film.renderFilm();
						$('#elly-modal-container').modal('hide');
					},
				});
			},

			detail:function(){
				if($(this).attr('data-edit'))return;
				var detail = $('#FilmDetail_container');
				var codeid = $(this).parents('tr').attr('data-codeid');
				//alert(detail.attr('date-codeid'));


				if(detail.attr('date-codeid')){

					detail.remove();
					if(detail.attr('date-codeid') == codeid)return;
				}
				// alert(detail.attr('date-codeid'));
				// alert(codeid);
				// console.log(Film_list.get(codeid));
				$(this).parents('tr').after("<tr id='FilmDetail_container' date-codeid=" + codeid + "><td>1</td></tr>");

				EllyCore.template({
					element: $('#FilmDetail_container'),
					source: $('#FilmDetail_template'),
					data: Film_list.get(codeid),
					method: 'replace',
					callback:function(){

					}
				});

			},

			renderFilm: function() {

				EllyCore.template({
					element: $('#Film_container tbody'),
					source: $('#Film_list_template') ,
					data: {Film: Film_list.list},
				});
				titleShow();
			},

			FilmCreateForm: function(event) {
				EllyCore.showAjaxForm({
					url: EllyCore.url('admin', 'Film_create'),
					element: $('#Film_form_container'),
					title: 'Регистрация новой категории',
					width: 900,
					success:function(){
					}
				});
			},

			FilmEditForm: function(event) {
				var codeid = $(this).parents('tr').attr('data-codeid');

				EllyCore.showAjaxForm({
					url: EllyCore.url('admin', 'Film_edit'),
					data: Film_list.get(codeid),
					element: $('#Film_form_container'),
					title: 'Редактирование категории',
					width: 900,
					success: function(){
					}
				});
			},

			FilmDelete: function(event) {
				if ( !EllyCore.confirm('Удалить?') ) return;

				var codeid = $(this).parents('tr').attr('data-codeid');

				EllyCore.ajax({
					url: EllyCore.url('admin', 'Film_delete'),
					data: {codeid: codeid},
					success: function(data) {
						Film_list.delete(codeid);
						$('#Film_' + codeid).remove();
					},
				});
			},
	}

})();

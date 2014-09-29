<div class="container" style="">
<div class="container" style="">
<div class="container" style="">
	<button type="submit" class="btn btn-success right btnFilmAdd" style="margin-bottom: 10px; "><span class="glyphicon glyphicon-plus-sign"></span> Добавить</button>

	<table class="table table-striped table-bordered table-hover" id="Film_container" >
		<thead>
			<tr>
				<th>№</th>
				<th>Название фильма</th>
				<th>Режиссер</th>
				<th>Год выпуска</th>
				<th>Страна</th>
				<th>Язык</th>
				<th>Возрастное ограничение</th>
				<th>Количество просмотров</th>
				<th>Рейтинг %</th>
				<th>Цена</th>

				<th></th>
			</tr>
		</thead>
		<tbody >
		</tbody>
	</table>
</div>
<div class="hidden">
	<div id="Film_form_container">
		<form id="Film_form" class="form-horizontal clearfix" method="post">
		<div class="col-md-6">
			<div class="form-group">
				<label class="col-md-4 control-label" >Название группы</label>
				<div class="col-md-8">
					<input name="film_name" type="text" class="form-control input-md" required>
				</div>
			</div>
			<div class="form-group">
				<label class="col-md-4 control-label" >Обложка</label>
				<div class="col-md-8">
					<input name="cover" type="text" class="form-control input-md" required>
				</div>
			</div>
			<div class="form-group">
				<label class="col-md-4 control-label" >Режиссер</label>
				<div class="col-md-8">
					<input name="director" type="text" class="form-control input-md" required>
				</div>
			</div>
			<div class="form-group">
				<label class="col-md-4 control-label" >Актеры</label>
				<div class="col-md-8">
					<input name="actors" type="text" class="form-control input-md" required>
				</div>
			</div>
			<div class="form-group">
				<label class="col-md-4 control-label" >Описание</label>
				<div class="col-md-8">
					<input name="desciption" type="text" class="form-control input-md" required>
				</div>
			</div>
			<div class="form-group">
				<label class="col-md-4 control-label" >Дата добавления</label>
				<div class="col-md-8">
					<input name="date_system" type="text" class="form-control input-md" required>
				</div>
			</div>
			<div class="form-group">
				<label class="col-md-4 control-label" >Рейтинг</label>
				<div class="col-md-8">
					<input name="raiting" type="text" class="form-control input-md" required>
				</div>
			</div>
			<div class="form-group">
				<label class="col-md-4 control-label" >Количество просмотров</label>
				<div class="col-md-8">
					<input name="views" type="text" class="form-control input-md" required>
				</div>
			</div>
			</div>
			<div class="col-md-6">
			<div class="form-group">
				<label class="col-md-4 control-label" >Год выпуска</label>
				<div class="col-md-8">
					<input name="year" type="text" class="form-control input-md" required>
				</div>
			</div>
			<div class="form-group">
				<label class="col-md-4 control-label" >Страна</label>
				<div class="col-md-8">
					<input name="country" type="text" class="form-control input-md" required>
				</div>
			</div>
			<div class="form-group">
				<label class="col-md-4 control-label" >Язык</label>
				<div class="col-md-8">
					<input name="lang" type="text" class="form-control input-md" required>
				</div>
			</div>
			<div class="form-group">
				<label class="col-md-4 control-label" >Длительность фильма</label>
				<div class="col-md-8">
					<input name="duration" type="text" class="form-control input-md" required>
				</div>
			</div>
			<div class="form-group">
				<label class="col-md-4 control-label" >Группа</label>
				<div class="col-md-8">
					<input name="code_sp_gruppa" type="text" class="form-control input-md" required>
				</div>
			</div>
			<div class="form-group">
				<label class="col-md-4 control-label" >Сылка на фильм</label>
				<div class="col-md-8">
					<input name="url" type="text" class="form-control input-md" required>
				</div>
			</div>
			<div class="form-group">
				<label class="col-md-4 control-label" >Цена</label>
				<div class="col-md-8">
					<input name="price" type="text" class="form-control input-md" required>
				</div>
			</div>
			<div class="form-group">
				<label class="col-md-4 control-label" >Возрастное ограничение</label>
				<div class="col-md-8">
					<input name="age" type="text" class="form-control input-md" required>
				</div>
			</div>
			<div class="form-group">
				<label class="col-md-4 control-label" >Дополнительно</label>
				<div class="col-md-8">
					<input name="note" type="text" class="form-control input-md" required>
				</div>
			</div>
			</div>

			<div class="clearfix"></div>

			<div class="modal-footer">
				<input id="codeid" name="codeid" type="hidden">
				<button type="submit" class="btn btn-primary">Сохранить</button>
			</div>
		</form>
	</div>
</div>



<script type="text/template" id="Film_list_template">
{{#each Film}}
	{{> Film_item this}}
{{/each}}

</script>

<script type="text/template" id="Film_template">
<tr id="Film_{{codeid}}" data-codeid="{{codeid}}" class='btnDetail'>
	<td>{{codeid}}</td>
	<td>{{film_name}}</td>
	<td>{{director}}</td>
	<td>{{year}}</td>
	<td>{{country}}</td>
	<td>{{lang}}</td>
	<td>{{age}}</td>
	<td>{{views}}</td>
	<td>{{raiting}}</td>
	<td>{{price}}</td>
	<td data-edit='true'>
		<a href="javascript://"  title="Редактировать" class="btnFilmEdit core_icons_16 pencil"></a>
		<a href="javascript://"  class="btnFilmDelete"><img src='img/no.png'></a>
	</td>
</tr>
</script>

<script type="text/template" id="FilmDetail_template">
<tr id='FilmDetail_container' date-codeid={{codeid}}>
	<td colspan="20">
	<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
	<span class="label label-info">Обложка</span>
	{{cover}}
	</div>
	<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
		<span class="label label-info">Дата добавления</span>{{date_system}}<br>
		<span class="label label-info">Продолжительность</span>{{duration}}<br>
		<span class="label label-info">Группа</span>{{code_sp_gruppa}}<br>
		<span class="label label-info">Сылка</span>{{url}}<br>

	</div>
	<div  class="col-xs-4 col-sm-4 col-md-4 col-lg-4" >
		<span  class="label label-info">Актеры</span>{{actors}}<br>
		<span class="label label-info">Описание</span>{{desciption}}<br>
		<span class="label label-info">Дополнительно</span>{{note}}<br>
	</div>
	</td>
</tr>
</script>
<script type="text/javascript" src="../js/film.js"></script>
<script>
$(document).ready(function() {

	Film.init();

});

	Handlebars.registerPartial('Film_item', $('#Film_template').html());

</script>

<div class="container" style="max-width: 600px">
	<button type="submit" id="btnAdd" class="btn btn-success right" style="margin-bottom: 10px; "><span class="glyphicon glyphicon-plus-sign"></span> Добавить</button>
	<table class="table table-striped table-bordered table-hover" id="sliders">
		<thead>
			<tr>
				<th>№</th>
				<th>Название группы</th>
				<th></th>
			</tr>
		</thead>
		<tbody id="slider_container">
		</tbody>
	</table>
</div>
<div class="hidden">
	<div id="sliders_form_container">
		<form id="sliders_form" class="form-horizontal clearfix" method="post">
			<!-- Text input-->
			<div class="form-slider">
				<label class="col-md-4 control-label" >Название группы</label>
				<div class="col-md-8">
					<input name="gruppa_name" type="text" class="form-control input-md" required>
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

<script type="text/template" id="slider_list_template">
{{#each sliders}}
	{{> slider_item this}}
{{/each}}

</script>

<script type="text/template" id="slider_template">
<tr id="slider_{{codeid}}" data-codeid="{{codeid}}">
	<td>{{codeid}}</td>
	<td>{{gruppa_name}}</td>
	<td>
		<a href="javascript://"  title="Редактировать" class="btnEdit core_icons_16 pencil"></a>
		<a href="javascript://"  class="btnDelete"><img src='img/no.png'></a>
	</td>
</tr>
</script>
<script type="text/javascript" src="../js/sliders.js"></script>
<script>
$(document).ready(function() {

	sliders.init();

});

	Handlebars.registerPartial('slider_item', $('#slider_template').html());

</script>

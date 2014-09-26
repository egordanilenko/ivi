<div class="container" style="max-width: 600px">
	<button type="submit" id="btnAdd" class="btn btn-success right" style="margin-bottom: 10px; "><span class="glyphicon glyphicon-plus-sign"></span> Добавить</button>
	<table class="table table-striped table-bordered table-hover" id="categories">
		<thead>
			<tr>
				<th>№</th>
				<th>Название категории</th>
				<th>Группа</th>
				<th></th>
			</tr>
		</thead>
		<tbody id="category_container">
		</tbody>
	</table>
</div>
<div class="hidden">
	<div id="categories_form_container">
		<form id="categories_form" class="form-horizontal clearfix" method="post">
			<!-- Text input-->
			<div class="form-category">
				<label class="col-md-4 control-label" >Название категории</label>
				<div class="col-md-8">
					<input name="category_name" type="text" class="form-control input-md" required>
				</div>
			</div>

			<div class="form-category">
				<label class="col-md-4 control-label" >Группа</label>
				<div class="col-md-8">
					<select name="code_sp_gruppa" class="form-control">
					<?php foreach ($groups_list as $key => $item):?>
						<option value="<?=$item->codeid?>"><?=$item->gruppa_name?></option>
					<?php endforeach;?>
					</select>
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

<script type="text/template" id="category_list_template">
{{#each categories}}
	{{> category_item this}}
{{/each}}

</script>

<script type="text/template" id="category_template">
<tr id="category_{{codeid}}" data-codeid="{{codeid}}">
	<td>{{codeid}}</td>
	<td>{{category_name}}</td>
	<td>{{gruppa_name code_sp_gruppa}}</td>
	<td>
		<a href="javascript://"  title="Редактировать" class="btnEdit core_icons_16 pencil"></a>
		<a href="javascript://"  class="btnDelete"><img src='img/no.png'></a>
	</td>
</tr>
</script>
<script type="text/javascript" src="../js/categories.js"></script>
<script>
	$(document).ready(function() {

		Categories.init();

	});

	Handlebars.registerHelper('gruppa_name', function(codeid) {
		// if(!groups_list.get(codeid))
			return groups_list.get(codeid).gruppa_name;
		// else
			// return '';
	});

	Handlebars.registerPartial('category_item', $('#category_template').html());

</script>

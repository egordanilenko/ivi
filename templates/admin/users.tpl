<div class="container" style="max-width: 600px">
		<button type="submit" id="btnAdd" class="btn btn-success right" style="margin-bottom: 10px; "><span class="glyphicon glyphicon-plus-sign"></span> Добавить</button>
		<table class="table table-striped table-bordered table-hover" id="users">
			<thead>
				<tr>
					<th>№</th>
					<th>Логин</th>
					<th>Пароль</th>
					<th>ФИО</th>
					<th>Правка</th>
				</tr>
			</thead>
			<tbody id="user_container">
			</tbody>
		</table>
</div>
<div class="hidden">
	<div id="users_form_container">
		<form id="users_form" class="form-horizontal clearfix" method="post">
			<!-- Text input-->
			<div class="form-group">
				<label class="col-md-4 control-label" >Логин</label>
				<div class="col-md-8">
					<input name="login" type="text" class="form-control input-md" required>
				</div>
			</div>

			<div class="form-group">
				<label class="col-md-4 control-label" >Пароль</label>
				<div class="col-md-8">
					<input name="psw" type="password" class="form-control input-md" required>
				</div>
			</div>

			<div class="form-group">
				<label class="col-md-4 control-label" >ФИО</label>
				<div class="col-md-8">
					<input name="fio" type="text" class="form-control input-md" required>
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

<script type="text/template" id="user_list_template">
{{#each users}}
	{{> user_item this}}
{{/each}}

</script>

<script type="text/template" id="user_template">
<tr id="user_{{codeid}}" data-codeid="{{codeid}}">
	<td>{{codeid}}</td>
	<td>{{login}}</td>
	<td>{{psw}}</td>
	<td>{{fio}}</td>
	<td>
		<a href="javascript://"  title="Редактировать" class="btnEdit core_icons_16 pencil"></a>
		<a href="javascript://"  class="btnDelete"><img src='img/no.png'></a>
	</td>
</tr>
</script>
<script type="text/javascript" src="../js/users.js"></script>
<script>
$(document).ready(function() {

	users.init();

});

	Handlebars.registerPartial('user_item', $('#user_template').html());

</script>


<div class="container">
	<!-- 	<a href="#" onclick="tableToExcel('reportDay', 'Експортная таблица')" class="btn btn-success right"><span class="glyphicon glyphicon-file"></span> В Excell</a>
		<br><br> -->
	<a href="#" onclick="tableToExcel('table', 'Експортная таблица')" class="btn btn-success right"><span class="glyphicon glyphicon-file"></span> В Excell</a>
	<br><br>
	<div class="filter" style="margin-top: -48px;">
		<div class="control-group">
			<div class="controls">
		    	<div class="input-prepend input-group">
		       	<span class="add-on input-group-addon"><i class="glyphicon glyphicon-calendar fa fa-calendar"></i></span><input type="text" style="width: 200px" name="reservation"  class="form-control" value="" />
		     	</div>
			</div>
		</div>
		<ul class="pagination">
		 	<li data-move="pagePrev"><a href="#" >&laquo;</a></li>
		 	<li data-move="pageCurrent"><a href="#" data-page="true">1</a></li>
		 	<li data-move="pageNext"><a href="#" >&raquo;</a></li>
		</ul>
		<div class=" pull-right" style="padding:8px;" >
			Найденно <span class="badge totalPage">1000</span> записей
		</div>
		<div class=" pull-right" style="padding:8px;" >
			На странице <span class="badge recordsPerPage">100</span> записей
		</div>

	 </div>
	<div style="overflow: auto; height: 500px;" class='report-container dayReportDetail'>
		<table id="reportDetail" class="table table-hover table-bordered">
			<thead>
				<tr>
					<th rowspan='2'>Дата&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
					<th colspan='3'>Ежедневно корректно зарегистрированные коды</th>
					<th colspan='3'>Ежедневное кол-во уникальных участников</th>
					<th colspan='2'>Метод регистрации участников</th>
					<th colspan='2'>Участники зарегистрировавшие 1 код</th>
					<th colspan='2'>Участиники зарегистрировавшие более 1-го кода</th>
					<th colspan='24'>Кол-во зарегистрированных кодов по SMS по часам (с 1 по 24)</th>
					<th colspan='24'>Кол-во зарегистрированных кодов через сайт по часам (с 1 по 24)</th>
					<th colspan='8'>Кол-во зарегистрированных кодов по SMS по городам</th>
					<th colspan='8'>Кол-во зарегистрированных кодов через сайт по городам</th>
					<th colspan='3'>Максимальное кол-во зарегистр. кодов 1 участником</th>
					<th colspan='6'>Кол-во участников по мобильным операторам</th>
					<th colspan='4'>Общее кол-во активированных кодов</th>
					<th colspan='6'>Общее кол-во активированных кодов по моб. операторма</th>
					<th colspan='3'>Посещение сайта</th>
					<th colspan='24'>Посещение сайта по часам(визиты с 1 по 24)</th>
					<th colspan='24'>Посещение сайта по часам (посетители с 1 по 24)</th>
					<th colspan='3'>Пользование сайтом</th>
					<th colspan='2'>Пользователи сайтом</th>
				</tr>
				<tr>
					<td>SMS</td>
					<td>Сайт</td>
					<td>Total</td>
					<td>SMS</td>
					<td>Сайт</td>
					<td>Total</td>
					<td>SMS</td>
					<td>Сайт</td>
					<td>SMS</td>
					<td>сайт</td>
					<td>SMS</td>
					<td>Сайт</td>
					<?php for ($i=0; $i < 24; $i++) {
						print '<td>'.$i.'</td>';
					} ?>
					<?php for ($i=0; $i < 24; $i++) {
						print '<td>'.$i.'</td>';
					} ?>
					<td>Бишкек</td>
					<td>Кант</td>
					<td>Токмок</td>
					<td>Карабалта</td>
					<td>Ош</td>
					<td>Джалалабат</td>
					<td>Талас</td>
					<td>Каракол</td>
					<td>Бишкек</td>
					<td>Кант</td>
					<td>Токмок</td>
					<td>Карабалта</td>
					<td>Ош</td>
					<td>Джалалабат</td>
					<td>Талас</td>
					<td>Каракол</td>
					<td>SMS</td>
					<td>Сайт</td>
					<td>SMS и Сайт</td>
					<td>Мегаком</td>
					<td>Билайн</td>
					<td>Фонекс</td>
					<td>О</td>
					<td>Кател</td>
					<td>Некси</td>
					<td>Код верный</td>
					<td>Код не верный</td>
					<td>Код ранее был активирован</td>
					<td>Не верный формат</td>
					<td>Мегаком</td>
					<td>Билайн</td>
					<td>Фонекс</td>
					<td>О</td>
					<td>Кател</td>
					<td>Некси</td>
					<td>Визиты</td>
					<td>Посетители</td>
					<td>Просмотры</td>
					<?php for ($i=0; $i < 24; $i++) {
						print '<td>'.$i.'</td>';
					} ?>
					<?php for ($i=0; $i < 24; $i++) {
						print '<td>'.$i.'</td>';
					} ?>
					<td>Посетители</td>
					<td>Регистрации</td>
					<td>Активация ии кодов</td>
					<td>Регистрация через сайт</td>
					<td>Регистрация уже с паролем</td>
				</tr>
			</thead>
			<tbody>
			</tbody>
		</table>
	</div>
	<div class="report-container dayReportShort">
		<table class="table table-striped table-responsive table-hover table-bordered" id="reportShort" >
				<thead>
					<tr>
						<th rowspan="2">Дата&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
						<th colspan="3">Ежедневно корректно зарегистрированные коды</th>
						<th colspan="3">Ежедневное кол-во уникальных участников</th>
						<th colspan="2">Участники зарегистрировавшие 1 код</th>
						<th colspan="2">Участники зарегистрировавшие более 1 кода</th>
					</tr>
					<tr>
						<th>SMS</th>
						<th>Сайт</th>
						<th>Total</th>
						<th>SMS</th>
						<th>Сайт</th>
						<th>Total</th>
						<th>SMS</th>
						<th>Total</th>
						<th>SMS</th>
						<th>Total</th>
					</tr>
				</thead>
			<tbody>
			</tbody>
		</table>
	</div>
	<div class="report-container monthReportShort">
		<table class="table table-striped table-responsive table-hover table-bordered" id="monthReportShort" >
			<thead>
				<tr>
					<th rowspan="2">Дата&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
					<th colspan="3">Ежедневно корректно зарегистрированные коды</th>
					<th colspan="3">Ежедневное кол-во уникальных участников</th>
					<th colspan="2">Участники зарегистрировавшие 1 код</th>
					<th colspan="2">Участники зарегистрировавшие более 1 кода</th>
				</tr>
				<tr>
					<th>SMS</th>
					<th>Сайт</th>
					<th>Total</th>
					<th>SMS</th>
					<th>Сайт</th>
					<th>Total</th>
					<th>SMS</th>
					<th>Total</th>
					<th>SMS</th>
					<th>Total</th>
				</tr>
			</thead>
		<tbody>
		</tbody>
		</table>
	</div>
	<div style="overflow: auto; height: 500px;" class='report-container monthReportDetail'>
		<table id="monthReportDetail" class="table table-hover table-bordered">
			<thead>
				<tr>
					<th rowspan='2'>Дата&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
					<th colspan='3'>Ежедневно корректно зарегистрированные коды</th>
					<th colspan='3'>Ежедневное кол-во уникальных участников</th>
					<th colspan='2'>Метод регистрации участников</th>
					<th colspan='2'>Участники зарегистрировавшие 1 код</th>
					<th colspan='2'>Участиники зарегистрировавшие более 1-го кода</th>
					<th colspan='24'>Кол-во зарегистрированных кодов по SMS по часам (с 1 по 24)</th>
					<th colspan='24'>Кол-во зарегистрированных кодов через сайт по часам (с 1 по 24)</th>
					<th colspan='8'>Кол-во зарегистрированных кодов по SMS по городам</th>
					<th colspan='8'>Кол-во зарегистрированных кодов через сайт по городам</th>
					<th colspan='3'>Максимальное кол-во зарегистр. кодов 1 участником</th>
					<th colspan='6'>Кол-во участников по мобильным операторам</th>
					<th colspan='4'>Общее кол-во активированных кодов</th>
					<th colspan='6'>Общее кол-во активированных кодов по моб. операторма</th>
					<th colspan='3'>Посещение сайта</th>
					<th colspan='24'>Посещение сайта по часам(визиты с 1 по 24)</th>
					<th colspan='24'>Посещение сайта по часам (посетители с 1 по 24)</th>
					<th colspan='3'>Пользование сайтом</th>
					<th colspan='2'>Пользователи сайтом</th>
				</tr>
				<tr>
					<td>SMS</td>
					<td>Сайт</td>
					<td>Total</td>
					<td>SMS</td>
					<td>Сайт</td>
					<td>Total</td>
					<td>SMS</td>
					<td>Сайт</td>
					<td>SMS</td>
					<td>сайт</td>
					<td>SMS</td>
					<td>Сайт</td>
					<?php for ($i=0; $i < 24; $i++) {
						print '<td>'.$i.'</td>';
					} ?>
					<?php for ($i=0; $i < 24; $i++) {
						print '<td>'.$i.'</td>';
					} ?>
					<td>Бишкек</td>
					<td>Кант</td>
					<td>Токмок</td>
					<td>Карабалта</td>
					<td>Ош</td>
					<td>Джалалабат</td>
					<td>Талас</td>
					<td>Каракол</td>
					<td>Бишкек</td>
					<td>Кант</td>
					<td>Токмок</td>
					<td>Карабалта</td>
					<td>Ош</td>
					<td>Джалалабат</td>
					<td>Талас</td>
					<td>Каракол</td>
					<td>SMS</td>
					<td>Сайт</td>
					<td>SMS и Сайт</td>
					<td>Мегаком</td>
					<td>Билайн</td>
					<td>Фонекс</td>
					<td>О</td>
					<td>Кател</td>
					<td>Некси</td>
					<td>Код верный</td>
					<td>Код не верный</td>
					<td>Код ранее был активирован</td>
					<td>Не верный формат</td>
					<td>Мегаком</td>
					<td>Билайн</td>
					<td>Фонекс</td>
					<td>О</td>
					<td>Кател</td>
					<td>Некси</td>
					<td>Визиты</td>
					<td>Посетители</td>
					<td>Просмотры</td>
					<?php for ($i=0; $i < 24; $i++) {
						print '<td>'.$i.'</td>';
					} ?>
					<?php for ($i=0; $i < 24; $i++) {
						print '<td>'.$i.'</td>';
					} ?>
					<td>Посетители</td>
					<td>Регистрации</td>
					<td>Активация ии кодов</td>
					<td>Регистрация через сайт</td>
					<td>Регистрация уже с паролем</td>
				</tr>
			</thead>
			<tbody>
			</tbody>
		</table>
	</div>
	<div class="report-container leadersReport">
		<table class="table table-striped table-bordered table-hover" id="leadersReport_container">
		<thead>
			<tr>
				<th>Телефон</th>
				<th>Дата</th>
			</tr>
		</thead>
		<tbody >
		</tbody>
		</table>
	</div>
	<div class="report-container winnersReport">
		<table class="table table-striped table-responsive table-hover table-bordered" id="winnersReport_container" >
		<thead>
			<tr>
				<th rowspan="2">Дата</th>
				<th colspan="10">Топ 10</th>
				<th colspan="1" rowspan="2">Ежедневный приз</th>
				<th colspan="1" rowspan="2">Ежемесячный приз</th>
			</tr>
			<tr>
			<?php for($i=1;$i<=10;$i++){
					echo"<th >Телефон$i</th>";}?>

			</tr>
		</thead>
		<tbody>
		</tbody>
	</table>
	</div>
	<div class="report-container prizesReport">
		<table class="table table-striped table-bordered table-hover" id="123">
		<thead>
			<tr>
				<th>Название</th>
				<th>Остаток</th>
			</tr>
		</thead>
		<tbody id="prizeReport_container">
		</tbody>
		<tfoot>
		</tfoot>
	</table>
	</div>
	<div class="report-container smsReport">
	     <table class="table table-striped table-responsive table-hover table-bordered" id="smsReport" >
	     <thead>
	     <th>Телефон</th>
	     <th>Текст сообщения</th>
	     <th>Дата</th>
	     <th>Статут</th>
	     <th>Тип</th>
	     </thead>
	     <tbody>
	     </tbody>
	     </table>
	</div>

	<div id="graf">
	</div>

</div>

<?php include "templates/index/template.tpl"; ?>

<script type="text/javascript">


</script>
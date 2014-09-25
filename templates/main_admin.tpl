<!DOCTYPE html>
<html lang="ru">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<link rel="shortcut icon" href="favicon.ico" />

		<?php echo $this->getMetatags(); ?>

		<title><?php echo $this->getTitle(); ?></title>

	<?php // Подключение стилей. Все стили подключаются через функцию headStyle. Если режим не дебаг, то перед отправкой в браузер, они собираются в один файл и архивируются
		echo $this->headStyle(
			array(
				// 'css/vendor/bootstrap.min.css',
				'css/vendor/bootstrap.css',
				'css/vendor/font-awesome.min.css',
				'css/vendor/tipsy.css',
				'css/!plugins/morris.css',
				'css/vendor/jquery.treetable.css',
				'css/vendor/dataTables.bootstrap.css',
				'css/vendor/sb-admin-2.css',
				'js/vendor/humanejs/themes/libnotify.css',
				'css/system.css',
				'css/system_icons.css',
				'css/main.css',
				'css/vendor/validate.css',
				'css/datepicker/daterangepicker-bs3.css',
				/*'css/vendor/gumby.css',*/
			)
		);

			// Аналогично с JS. Подключаются через функцию headScript
		$this->headScript(
			array(
				'js/vendor/jquery-1.12.0.min.js',
				'js/vendor/jquery-ajax-form.js',
				'js/vendor/jquery.tipsy.js',
				'js/vendor/dataTables/jquery.dataTables.js',
				'js/vendor/dataTables/dataTables.bootstrap.js',
				'js/vendor/humanejs/humane.min.js',
				'js/vendor/handlebars.js',
				'js/vendor/moment.min.js',
				'js/vendor/list.min.js',
				'js/vendor/jquery.treetable.js',
				'js/vendor/morris/morris.min.js',
        		'js/vendor/morris/raphael.min.js',
				'js/vendor/bootstrap.js',
				'js/vendor/jquery.mask.min.js',
				'js/vendor/highcharts.js',
				'js/vendor/modules/data.js',
				'js/vendor/modules/exporting.js',
				'js/elly-core.js',
				'js/app.js',
				'js/report.js',
				'js/users.js',
				'js/prizes.js',
				// 'js/hello.js',
				'js/vendor/validate/jquery.validate.js',
				'js/vendor/validate/additional-methods.js',
				'js/vendor/validate/messages_ru.js',
				'js/vendor/datepicker/moment.min.js',
				'js/vendor/datepicker/daterangepicker.js',

			)
		);

		echo $this->attachStyle();
		echo $this->attachScript();
	?>
</head>

<body id="global_controller_<?php echo $this->getControllerName() . ' global_action_' . $this->getControllerName() . '_' . $this->getActionName(); ?>">


<?php echo $this->widget('header'); ?>
<div  style="margin-top:70px;">
<?php echo $this->content(); ?>
</div>
<?php echo $this->widget('footer'); ?>


	<!-- иконка рядом с курсором при аякс запросе -->
<img src="img/ajax-mouse-loading.gif" id="elly-ajax-loading" alt="" style="display:none;" />

	<!-- шаблон для модального окна -->
<div class="modal fade" id="elly-modal-container" tabindex="-1" role="dialog" aria-labelledby="elly-modal-title" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				<h4 class="modal-title" id="elly-modal-title"></h4>
			</div>
			<div class="modal-body" id="elly-modal-body"></div>
		</div>
	</div>
</div>
<script type="text/javascript">
// var tableToExcel = (function() {
//   var uri = 'data:application/vnd.ms-excel;base64,'
//     , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
//     , base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) }
//     , format = function(s, c) { return s.replace(/{(\w+)}/g, function(m, p) { return c[p]; }) }
//   return function(table, name) {
//     var element = $('.' + table + ':visible').html();
//     if (!table.nodeType)
//     var ctx = {worksheet: name || 'Worksheet', table:  element}
//     window.location.href = uri + base64(format(template, ctx))
//   }
// })();

	function tableToExcel(table2, asd)
	{
		var html = $('.table:visible')[0].outerHTML;//getElementById(table);
	  	window.open('data:application/vnd.ms-excel,' + '\uFEFF' + encodeURIComponent(html));
	}


$(document).ready(function(e) {

 titleShow();

});

function titleShow(){
 $('[title]').tooltip();
 $('.tooltip').remove();
}
Report.init("<?php echo $report; ?>","<?php echo date('d.m.Y'); ?>");
</script>

</body>
</html>
<!DOCTYPE html>
<html lang="ru">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<link rel="shortcut icon" href="favicon.ico" />

		<?php echo $this->getMetatags(); ?>

		<title><?php echo $this->getTitle(); ?></title>
    <!--[if lt IE 9]><script src="http://www.ivi.ru//js/html5shiv.js"></script><![endif]-->
    <meta name="robots" content="noyaca">
    <meta name="robots" content="noodp">

    <meta http-equiv="X-UA-Compatible" content="IE=Edge">
    <meta name="application-name" content="ivi.ru">
    <meta name="msapplication-tooltip" content="ivi.ru">
    <meta name="msapplication-starturl" content="http://www.ivi.ru/">
    <meta name="msapplication-task" content="name=Фильмы;window-type=window;action-uri=http://www.ivi.ru/videos/all/movies/all/by_day;icon-uri=/images/da/img/24x24.ico">
    <meta name="msapplication-task" content="name=Сериалы;window-type=window;action-uri=http://www.ivi.ru/videos/all/series/all/by_day;icon-uri=/images/da/img/24x24.ico">
    <meta name="msapplication-task" content="name=Мультфильмы;window-type=window;action-uri=http://www.ivi.ru/videos/all/animation/all/by_day;icon-uri=/images/da/img/24x24.ico">
    <meta name="msapplication-task" content="name=Программы;window-type=window;action-uri=http://www.ivi.ru/videos/all/programs/all/by_day;icon-uri=/images/da/img/24x24.ico">
    <meta name="msapplication-task" content="name=ivi+;window-type=window;action-uri=http://www.ivi.ru/plus;icon-uri=/images/da/img/24x24.ico">
    <meta name="msapplication-navbutton-color" content="red">
    <meta name="msapplication-window" content="width=1152;height=864">
    <meta name="msApplication-ID" content="App">
    <meta name="msApplication-PackageFamilyName" content="ivi.ru.ivi.ru_17t6d7vatm0nm">
    <meta property="og:image" content="http://www.ivi.ru/images/da/img/500x500.jpg"/>
    <meta property="og:title" content="Интернет-кинотеатр ivi.ru"/>
    <meta property="og:site_name" content="ivi.ru"/>
    <meta property="og:description" content="Тысячи фильмов, мультфильмов, сериалов и программ онлайн!"/>
    <meta property="fb:page_id" content="274880985255"/>
    <meta name="keywords" content="фильмы онлайн бесплатно в хорошем отличном качестве без смс кино видео смотреть без регистрации новинки кинофильмы онлайн кинотеатр 2012 2013 просмотр видеоролики"/>
    <meta name="description" content="Устройте кинотеатр у себя дома! Смотрите онлайн фильмы хорошего качества в приятной домашней обстановке и в удобное для вас время. Для вас всегда доступны бесплатные фильмы без регистрации на любой вкус: сериалы, фильмы, мультфильмы и многое другое."/>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <link rel="stylesheet" href="http://img.ivi.ru/css/main.css?9aba3b4f45e9df0fa2a424a6963cb608">


	<?php // Подключение стилей. Все стили подключаются через функцию headStyle. Если режим не дебаг, то перед отправкой в браузер, они собираются в один файл и архивируются
		echo $this->headStyle(
			array(
				// 'css/vendor/bootstrap.css',
				'css/vendor/font-awesome.min.css',
				'css/vendor/tipsy.css',
				'css/vendor/dataTables.bootstrap.css',
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
				'js/vendor/bootstrap.js',
				'js/vendor/jquery.mask.min.js',
				'js/vendor/highcharts.js',
				'js/vendor/modules/data.js',
				'js/vendor/modules/exporting.js',
				'js/elly-core.js',
				'js/app.js',
				'js/site.js',
				'js/groot.js',
				'js/script.js',
				'js/survey.js',
				'js/utm_parse.js',
				'js/users.js',
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
	<body class="start alt-price-plates" data-auth="">
	    <div class="header-wrapper header-opacity">
		<?php echo $this->widget('header'); ?>
	    </div>

	<?php echo $this->content(); ?>

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
	// Report.init("<?php echo $report; ?>","<?php echo date('d.m.Y'); ?>");
	</script>

	</body>
</html>

        <link rel="stylesheet" type="text/css" href="css/login/style.css" />
        <!--[if lte IE 7]><style>.main{display:none;} .support-note .note-ie{display:block;}</style><![endif]-->
		<style>
			body {
				background: #e1c192 url(img/login/wood_pattern.jpg);
			}
		</style>
    </head>
    <body>
        <div class="container">



			<section class="main">
				<form id="login_form" method="post" class="form-2" action="<?=$this->link('user', 'login');?>" >
					<h1><span class="log-in"><span class="sign-up">Выполнить вход</span></h1>
					<p class="float">
						<label for="login"><i class="icon-user"></i>Логин</label>
						<input type="text" name="login" >
					</p>
					<p class="float">
						<label for="password"><i class="icon-lock"></i>Пароль</label>
						<input type="password" name="password"  class="showpassword">
					</p>
					<p class="clearfix">
						<input type="submit" name="submit" value="Войти" style='float:right; width:100%'>
					</p>
				</form>​​
			</section>

        </div>
		<!-- jQuery if needed -->
        <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
		<script type="text/javascript">
			$(function(){
			    $(".showpassword").each(function(index,input) {
			        var $input = $(input);
			        $("<p class='opt'/>").append(
			            $("<input type='checkbox' class='showpasswordcheckbox' id='showPassword' />").click(function() {
			                var change = $(this).is(":checked") ? "text" : "password";
			                var rep = $("<input placeholder='' type='" + change + "' />")
			                    .attr("id", $input.attr("id"))
			                    .attr("name", $input.attr("name"))
			                    .attr('class', $input.attr('class'))
			                    .val($input.val())
			                    .insertBefore($input);
			                $input.remove();
			                $input = rep;
			             })
			        ).append($("<label for='showPassword'/>").text("Отобразить пароль")).insertAfter($input.parent());
			    });

			    $('#showPassword').click(function(){
					if($("#showPassword").is(":checked")) {
						$('.icon-lock').addClass('icon-unlock');
						$('.icon-unlock').removeClass('icon-lock');
					} else {
						$('.icon-unlock').addClass('icon-lock');
						$('.icon-lock').removeClass('icon-unlock');
					}
			    });
			});
		</script>
    </body>
</html>
<?php
class indexController extends controller {

	public function index() {

		$groups = sp_gruppa::find();
		$sliders = slider::find();
		$slides = array();
		// db::debug();
		foreach ($sliders as $key => $slider) {
			$slides[$key]['slide'] = $slider;
			$slides[$key]['film'] = film::get($slider->code_film);
		}

		$new_films = film::find('', array('order' => 'date_system DESC'));
		$popular_films = film::find('', array('order' => 'views DESC'));

		// print_arr($slides);
		return array(
			'groups'		=> 	$groups,
			'slides'		=> 	$slides,
			'new_films'		=> 	$new_films,
			'popular_films'	=> 	$popular_films,
			// 'cats'		=> 	$cats,
			'toJson'	=>	array('cats'),
		);
	}

	public function agreement()
	{

	}

	public function profile()
	{

	}

	public function watch()
	{
		$id = request::get('film');
		// $where_string = ' 1=1 and ';
		// if(request::get('group') != '')
		// 	$where_string = $where_string .' code_sp_gruppa = '.request::get('group');
		// if(request::get('year') != '')
		// 	$where_string = $where_string .' year = '.request::get('year');
		$curr_film = film::get($id);
		$all_films = film::find($where_string, array('order' => 'date_system DESC'));
		$groups = sp_gruppa::find();

		return array(
			'curr_film' => $curr_film,
			'all_films' => $all_films,
			'groups' 	=> $groups,
		);
	}

	public function films()
	{
		$where_string = ' 1=1 and ';
		if(request::get('group') != '')
			$where_string = $where_string .' code_sp_gruppa = '.request::get('group');
		if(request::get('year') != '')
			$where_string = $where_string .' year = '.request::get('year');

		$all_films = film::find($where_string, array('order' => 'date_system DESC'));
		$groups = sp_gruppa::find();

		return array(
			'all_films' => $all_films,
			'groups' 	=> $groups,
		);
	}

	public function sorted_films()
	{

	}

	public function search()
	{

	}

public function login()
{
	$this->setContext('json');
		// Есди пользователь уже залогинен, ничего не делаем
		// if ( $this->user->getId() ) {
		// 	$this->redirect( 'index', 'index');
		// }

		// if ( !request::isPost() ) {
		// 	return;
		// }
		$login = request::get('email');
		$password = request::get('pass');

		// Если в $_POST есть логин, пытаемся залогиниться
		$user = current(user::find('login="'.$login.'"'));
		if(!empty($user))
		{
			if($user->getPassword() == $password)
			{
				$user->setCookies();
				$error = 0;
			}
			else
				$error = 1;
		}
		else
			$error = 1;

		// Если успешно, то перебрасываем на дефолтную страницу для зарегистрированного пользователя, иначе показываем /templates/user/login.tpl и ошибку
			return array(
				'error'=> $error,
				'message'=>'Неверный логин или пароль',
			);
}

}
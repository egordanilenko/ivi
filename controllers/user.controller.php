<?php
class userController extends controller {

	public function login() {
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

	public function logout() {
		$this->user->logout();

			// перебрасываем на дефолтную страницу для незалогиненого пользователя
		$this->redirect('index', 'index');
	}


	public function create() {
		$this->setContext('json');

		if ( !$this->user->getId() ) {
			return array(
				'result'=>0,
				'message'=>'Вы не авторизированы. Зайдите на сайт под своим аккаунтом и повторите попытку',
			);
		}

		$user = new user();
		$user->setFromArray($_POST);
		if ( $user->create() ) {
			return array(
				'action'=>'create',
				'user'=>$user->toJsonArray(),
			);
		} else {
			return array(
				'result'=>0,
				'message'=>'Ошибка при добавлении пользователя',
			);
		}
	}

	public function edit() {
		$this->setContext('json');

		if ( !$this->user->getId() ) {
			return array(
				'result'=>0,
				'message'=>'Вы не авторизированы. Зайдите на сайт под своим аккаунтом и повторите попытку',
			);
		}

		$user = user::get(request::post('code'));
		$user->setFromArray($_POST);

		if ( empty($_POST['login']) || empty($_POST['password']) ) {
			return array(
				'result'=>0,
				'message'=>'Заполните все необходимые поля',
			);
		}

		if ( $user->update() ) {
			return array(
				'action'=>'edit',
				'user'=>$user,
			);
		} else {
			return array(
				'result'=>0,
				'message'=>'Ошибка при добавлении пользователя',
			);
		}
	}

	public function delete() {
		$this->setContext('json');

		if ( !$this->user->getId() ) {
			return array(
				'result'=>0,
				'message'=>'Вы не авторизированы. Зайдите на сайт под своим аккаунтом и повторите попытку',
			);
		}

		$user = user::get(request::post('code'));
		$user->delete();

		return array(
			'result'=>1,
		);
	}

}
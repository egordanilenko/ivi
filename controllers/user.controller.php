<?php
class userController extends controller {

	public function login() {
			// Есди пользователь уже залогинен, ничего не делаем
		if ( $this->user->getId() ) {
			$this->redirect( config::get('userDefaultController'), config::get('userDefaultAction') );
		}

		if ( !request::isPost() ) {
			return;
		}

		$login = request::post('login');
		$password = request::post('password');

		// Если в $_POST есть логин, пытаемся залогиниться
		$error = $this->user->login($login, $password);

		// Если успешно, то перебрасываем на дефолтную страницу для зарегистрированного пользователя, иначе показываем /templates/user/login.tpl и ошибку
		if ( $error===0 ) {
			$this->redirect( config::get('userDefaultController'), config::get('userDefaultAction') );
		} else {
			return array(
				'error'=>'Неверный логин или пароль',
			);
		}
	}

	public function logout() {
		$this->user->logout();

			// перебрасываем на дефолтную страницу для незалогиненого пользователя
		$this->redirect('user', 'login');
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
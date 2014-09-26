<?php
class adminController extends controller {

	public function index() {

		$this->setTemplateName('main_admin');

	}

	public function groups() {

		$this->setTemplateName('main_admin');
		$groups_list = sp_gruppa::find();

		return array(
			'groups_list' => $groups_list,
			'toJson' =>	array('groups_list')
		);
	}

	public function group_create() {
		$this->setContext('json');

		$group = new sp_gruppa;
		$group->setFromArray($_POST);
		$group->create();

		return array(
			'group'=>$group,
		);
	}


	public function group_edit() {
		$this->setContext('json');

		$codeid = request::post('codeid');

		$group = sp_gruppa::get($codeid);
		$group->setFromArray($_POST);
		$group->update();

		return array(
			'group'=>$group,
		);
	}

	public function group_delete() {
		$this->setContext('json');

		$codeid = request::get('codeid');

		$group = sp_gruppa::get($codeid);
		if ( !$group ) {
			return array(
				'result' => 0,
				'message' => 'Ошибка: группа не найден.'
			);
		}

		$group->delete();
	}

	public function users() {

		$this->setTemplateName('main_admin');
		$users_list = user::find();

		return array(
			'users_list' => $users_list,
			'toJson' =>	array('users_list')
		);

	}

	public function user_create() {
		$this->setContext('json');

		$user = new user;
		$user->setFromArray($_POST);
		$user->create();

		return array(
			'user'=>$user,
		);
	}


	public function user_edit() {
		$this->setContext('json');

		$codeid = request::post('codeid');

		$user = user::get($codeid);
		$user->setFromArray($_POST);
		$user->update();

		return array(
			'user'=>$user,
		);
	}

	public function user_delete() {
		$this->setContext('json');

		$codeid = request::get('codeid');

		$user = user::get($codeid);
		if ( !$user ) {
			return array(
				'result' => 0,
				'message' => 'Ошибка: пользователь не найден.'
			);
		}

		$user->delete();
	}

}
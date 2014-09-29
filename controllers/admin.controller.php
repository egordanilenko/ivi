<?php
class adminController extends controller {

	public function index() {

		$this->setTemplateName('main_admin');

	}

	public function Films() {

		$this->setTemplateName('main_admin');
		$Film_list = Film::find();

		return array(
			'Film_list' => $Film_list,
			'toJson' =>	array('Film_list')
		);
	}

	public function Film_create() {
		$this->setContext('json');

		$Film = new Film;
		$Film->setFromArray($_POST);
		$Film->create();

		return array(
			'Film'=>$Film,
		);
	}


	public function Film_edit() {
		$this->setContext('json');

		$codeid = request::post('codeid');

		$Film = Film::get($codeid);
		$Film->setFromArray($_POST);
		$Film->update();

		return array(
			'Film'=>$Film,
		);
	}

	public function Film_delete() {
		$this->setContext('json');

		$codeid = request::get('codeid');

		$Film = Film::get($codeid);
		if ( !$Film ) {
			return array(
				'result' => 0,
				'message' => 'Ошибка: группа не найден.'
			);
		}

		$Film->delete();
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

	public function categories() {

		$this->setTemplateName('main_admin');
		$categories_list = sp_category::find();
		$groups_list = sp_gruppa::find();

		return array(
			'categories_list' => $categories_list,
			'groups_list' => $groups_list,
			'toJson' =>	array('categories_list', 'groups_list')
		);
	}

	public function category_create() {
		$this->setContext('json');

		$category = new sp_category;
		$category->setFromArray($_POST);
		$category->create();

		return array(
			'category'=>$category,
		);
	}


	public function category_edit() {
		$this->setContext('json');

		$codeid = request::post('codeid');

		$category = sp_category::get($codeid);
		$category->setFromArray($_POST);
		$category->update();

		return array(
			'category'=>$category,
		);
	}

	public function category_delete() {
		$this->setContext('json');

		$codeid = request::get('codeid');

		$category = sp_category::get($codeid);
		if ( !$category ) {
			return array(
				'result' => 0,
				'message' => 'Ошибка: группа не найден.'
			);
		}

		$category->delete();
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

	public function sliders() {

		$this->setTemplateName('main_admin');
		$sliders_list = slider::find();

		return array(
			'sliders_list' => $sliders_list,
			'toJson' =>	array('sliders_list')
		);
	}

	public function slider_create() {
		$this->setContext('json');

		$slider = new slider;
		$slider->setFromArray($_POST);
		$slider->create();

		return array(
			'slider'=>$slider,
		);
	}


	public function slider_edit() {
		$this->setContext('json');

		$codeid = request::post('codeid');

		$slider = slider::get($codeid);
		$slider->setFromArray($_POST);
		$slider->update();

		return array(
			'slider'=>$slider,
		);
	}

	public function slider_delete() {
		$this->setContext('json');

		$codeid = request::get('codeid');

		$slider = slider::get($codeid);
		if ( !$slider ) {
			return array(
				'result' => 0,
				'message' => 'Ошибка: слайд не найден.'
			);
		}

		$slider->delete();
	}

}
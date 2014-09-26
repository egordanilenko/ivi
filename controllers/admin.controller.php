<?php
class adminController extends controller {

	public function index() {

		$this->setTemplateName('main_admin');

	}

	public function groups() {

		 $this->setTemplateName('main_admin');

	}

	public function users() {

		$this->setTemplateName('main_admin');
		$users_list = user::find();

		return array(
			'users_list' => $users_list,
			'toJson' =>	array('users_list')
		);

	}

}
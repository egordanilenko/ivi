<?php
class indexController extends controller {

	public function index() {

		$groups = sp_gruppa::find();
		// $cats = array();
		// db::debug();
		// foreach ($groups as $key => $group) {
			// $cats[$group->gruppa_name] = sp_category::find('code_sp_gruppa = '.$group->codeid);
		// }
		// print_arr($cats);
		return array(
			'groups'	=> 	$groups,
			// 'cats'		=> 	$cats,
			'toJson'	=>	array('cats'),
		);
	}
}
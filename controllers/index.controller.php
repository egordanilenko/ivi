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

	}

	public function films()
	{

	}

	public function sorted_films()
	{

	}

	public function search()
	{

	}
}
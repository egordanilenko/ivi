<?php
class indexController extends controller {

	public function index() {
		$report = request::get('report') != ''?request::get('report'):'dayReportShort';
		return array('report' =>$report);
	}
	public function dayReport(){

	}
	public function monthReport(){

	}

	public function getSmsRecordForDate(){
		$this->setContext('json');
		$startDate = request::post('startDate');
		$endDate = request::post('endDate');
		$page = request::post('page');
		$search = request::post('search');
		$searchQuery = "";

		if(!empty($search)){$searchQuery = "AND (telephone = '$search' OR sms_text = '$search')"; }

		$pageNext = 100 * $page;
		$pageFirst = $pageNext - 100;

		$query = "SELECT  telephone,sms_text,date_system,status,typeid,ROW_NUMBER() OVER (ORDER BY codeid) AS RowNum FROM sms
				  WHERE CONVERT(date,date_system,104) >= CONVERT(date,'$startDate',104) AND CONVERT(date,date_system,104) <= CONVERT(date,'$endDate',104) $searchQuery";
		$sms = db::simpleQuery("SELECT  telephone,sms_text,CONVERT(date,date_system,105) as date_system,status,typeid FROM ($query) as sms WHERE RowNum >= $pageFirst AND RowNum <= $pageNext");

		// $sms = sms::find("date_system >= CONVERT(date,'$startDate',104) AND date_system <= CONVERT(date,'$endDate',104)",
		// 	array('order'=> 'codeid','offset' => $pageFirst,'limit' => $pageNext));


		$totalPage = db::row("SELECT  count(codeid) as total FROM sms WHERE CONVERT(date,date_system,104) >= CONVERT(date,'$startDate',104) AND CONVERT(date,date_system,104) <= CONVERT(date,'$endDate',104)");
		$recordsPerPage = count($sms);

		return array('sms'=>$sms,'totalPage' => $totalPage['total'], "recordsPerPage" => $recordsPerPage);
	}

	public function options(){
		$options = options::find();

		return array(
			'options' => $options
		);
	}


	public function save_options(){
		$this->setContext('json');
		for ($i=0; $i < count($_POST['codeid']); $i++) {
			$options = options::get($_POST['codeid'][$i]);
			$options->parametr = $_POST['parametr'][$i];
			$options->update();
		}
		$this->redirect('index', 'options');
	}

	public function users(){
		$users_list = user::find();

		return array(
			'users_list' => $users_list,
			'toJson' =>	array('users_list')
		);
	}

	function leaders(){
		$this->setContext('json');

		$startDate = request::post('startDate');
		$endDate = request::post('endDate');
		$page = request::post('page');

		$search = request::post('search');
		$searchQuery = "";

		if(!empty($search)){$searchQuery = "AND (telephone = '$search' OR sms_text = '$search')"; }

		$pageNext = 100 * $page;
		$pageFirst = $pageNext - 100;

		$query = "SELECT  min(codeid) as codeid,telephone, CONVERT(date,min(date_system),104)  as date_system,count(codeid) as amount, ROW_NUMBER() OVER (ORDER BY telephone) AS RowNum
		    	  FROM sms
				  where CONVERT(date,date_system,104) >= CONVERT(date,'$startDate',104) and CONVERT(date,date_system,104) <= CONVERT(date,'$endDate',104) $searchQuery
				  group by telephone
				  ";

		$query2 = "SELECT *
				   FROM ($query) AS sms
				   WHERE RowNum >= $pageFirst AND RowNum <= $pageNext
				   order by date_system";



		 $leaders = db::rows($query2);
		 $len = count($leaders);
		 $codeList = array();
		 for($i=0;$i<$len;$i++){
		 	$codeList = db::rows("SELECT sms_text FROM sms where telephone =  '" . $leaders[$i]['telephone'] . "'");
		 	$leaders[$i]['sms_text'] = $codeList;
		 }
		 $totalPage = db::row("SELECT  count(DISTINCT telephone) as total FROM sms where CONVERT(date,date_system,104) >= CONVERT(date,'$startDate',104) and CONVERT(date,date_system,104) <= CONVERT(date,'$endDate',104)");
		 $recordsPerPage = count($leaders);
		 return array("leaders" => $leaders,"totalPage" => $totalPage['total'], "recordsPerPage" => $recordsPerPage);
	}

	public function winners(){
		$this->setContext('json');

		$start = request::post('startDate');
		$end = request::post('endDate');
		$page = request::post('page');

		$startDate = new DateTime($start);
		$endDate = new DateTime($end);



		// print_arr($start);
		// print_arr($end);
		// $querySelectDateStart = "SELECT top 1 CONVERT(date,date_system ,104) as date_system
		// 			  FROM sms
		// 			  ORDER BY date_system";
		// $querySelectDateEnd = "SELECT top 1 CONVERT(date,date_system ,104) as date_system
		// 			  FROM sms
		// 			  ORDER BY date_system DESC";





		// if(!$SelectDateStart = db::rows($querySelectDateStart))return array("totalPage" =>0, "recordsPerPage" => 0);
		// if(!$SelectDateEnd = db::rows($querySelectDateEnd))return array("totalPage" =>0, "recordsPerPage" => 0);
		// print_arr($SelectDateStart);
		// print_arr($SelectDateEnd);

		// $startDateDB = new dateTime($SelectDateStart[0]['date_system']);
		// $endDateDB = new dateTime($SelectDateEnd[0]['date_system']);
		// $startDate = ($startDate<$startDateDB)?$startDateDB:$startDate;
		// $endDate = ($endDate>$endDateDB)?$endDateDB:$endDate;

		//print_arr($startDate);

		$winners = array();
		$winnersTemp = array();
		$record = -1;
		$recordTemp = 0;
		$pageNext = 10 * $page;
		$pageFirst = $pageNext - 10;


		$dateForPage = new DateTime($start);
		$totalPage = 0;
		while($dateForPage <= $endDate){
				$totalPage++;
				$dateForPage->modify('+1 day');
			}

		while(true){
			$record++;
			$start = $startDate->format('d.m.Y');
			$end = $endDate->format('d.m.Y');

			//print_arr($start);


			if($startDate > $endDate)break;
			if($pageFirst > $record || $record >= $pageNext){
				$startDate->modify('+1 day');
				continue;
			}

			$query = "SELECT CONVERT(date,min(date_system) ,104) as date_system,
					  telephone,COUNT(codeid)as amount,ROW_NUMBER() OVER (ORDER BY telephone) AS RowNum
					  FROM sms
					  WHERE CONVERT(date,date_system,104) = CONVERT(date,'$start',104)
					  GROUP BY telephone ";

			$query2 = "SELECT top 10 date_system,telephone,amount
					   FROM ($query) as sms
					   order by amount DESC";



			$winnersTemp = db::rows($query2);
			$winners[$recordTemp]['date_system'] = $start;
			$len = count($winnersTemp)?count($winnersTemp):10;
			if(!isset($winnersTemp[0]['date_system']))$winnersTemp[0]['date_system'] = '1-1-1';

			if($winnersTemp[0]['date_system'] == $startDate->format('Y-m-d')){
				for($i=0;$i<$len;$i++ ){
					$winners[$recordTemp]['telephone' . $i] = $winnersTemp[$i]['telephone'];
				}
			}
			else{
				for($i=0;$i<$len;$i++ ){
					$winners[$recordTemp]['telephone' . $i] = 'Нету';
				}
			}
			$recordTemp++;
			$startDate->modify('+1 day');

		}
		$recordsPerPage = count($winners);






		 return array("winners" => $winners,"totalPage" => $totalPage, "recordsPerPage" => $recordsPerPage);

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

	public function prizes(){
		$prizes_list = prizes::find();

		return array(
			'prizes_list' => $prizes_list,
			'toJson' =>	array('prizes_list')
		);
	}

	public function prize_create() {
		$this->setContext('json');

		$prize = new prizes;
		$prize->setFromArray($_POST);
		$prize->create();

		return array(
			'prize'=>$prize,
		);
	}


	public function prize_edit() {
		$this->setContext('json');

		$codeid = request::post('codeid');

		$prize = prizes::get($codeid);
		$prize->setFromArray($_POST);
		$prize->update();

		return array(
			'prize'=>$prize,
		);
	}

	public function prize_delete() {
		$this->setContext('json');

		$codeid = request::get('codeid');

		$prize = prizes::get($codeid);
		if ( !$prize ) {
			return array(
				'result' => 0,
				'message' => 'Ошибка: пользователь не найден.'
			);
		}

		$prize->delete();
	}

	public function dayReportDetail(){
		$this->setContext('json');

		 // $records = db::rows('select convert(date, date_system, 104) as date1, count(*) as count_sms from sms group by convert(date, date_system, 104) order by date1');
		 $records = array();

		set_time_limit(380);
		$records = db::rows("select top 20
		CONVERT(date,t.date_system) as date_system,

		(select count(*) from sms where typeid = 0 and status = 1 AND CONVERT(date,date_system) = CONVERT(date,t.date_system)) as count_sms,
		(select count(*) from sms where typeid = 1 and status = 1 AND CONVERT(date,date_system) = CONVERT(date,t.date_system)) as count_sait,
		(select count(*) from sms where status = 1 AND CONVERT(date,date_system) = CONVERT(date,t.date_system)) as count_total,

		(select count(distinct telephone) from sms where typeid = 0 AND CONVERT(date,date_system) = CONVERT(date,t.date_system)) as count_unick_sms,
		(select count(distinct telephone) from sms where typeid = 1 AND CONVERT(date,date_system) = CONVERT(date,t.date_system)) as count_unick_sait,

		(select count(distinct telephone) from sms where CONVERT(date,date_system) = CONVERT(date,t.date_system)) as count_unick_total,
		(select count(*) from (select count(telephone) as c1, telephone from sms group by CONVERT(date,date_system), telephone, typeid having typeid = 0 AND CONVERT(date,date_system)=CONVERT(date,t.date_system) and COUNT(telephone) = 1) as asd) as count_1_sms,
		(select count(*) from (select count(telephone) as c1, telephone from sms group by CONVERT(date,date_system), telephone, typeid having typeid = 1 AND CONVERT(date,date_system)=CONVERT(date,t.date_system) and COUNT(telephone) = 1) as asd) count_1_sait,
		(select count(*) from (select count(telephone) as c1, telephone from sms group by CONVERT(date,date_system), telephone, typeid having typeid = 0 AND CONVERT(date,date_system)=CONVERT(date,t.date_system) and COUNT(telephone) > 1) as asd) as count_bolee_1_sms,

		(select count(*) from (select count(telephone) as c1, telephone from sms group by CONVERT(date,date_system), telephone, typeid having typeid = 1 AND CONVERT(date,date_system)=CONVERT(date,t.date_system) and COUNT(telephone) > 1) as asd) as count_bolee_1_sait,
		(select count(*) from sms where typeid = 0 AND  CONVERT(date,date_system) = CONVERT(date,t.date_system) AND datepart(hour, date_system) = 0) as count_ssh0_sms,
		(select count(*) from sms where typeid = 0 AND  CONVERT(date,date_system) = CONVERT(date,t.date_system) AND datepart(hour, date_system) = 1) as count_ssh1_sms,
		(select count(*) from sms where typeid = 0 AND  CONVERT(date,date_system) = CONVERT(date,t.date_system) AND datepart(hour, date_system) = 2) as count_ssh2_sms,
		(select count(*) from sms where typeid = 0 AND  CONVERT(date,date_system) = CONVERT(date,t.date_system) AND datepart(hour, date_system) = 3) as count_ssh3_sms,
		(select count(*) from sms where typeid = 0 AND  CONVERT(date,date_system) = CONVERT(date,t.date_system) AND datepart(hour, date_system) = 4) as count_ssh4_sms,
		(select count(*) from sms where typeid = 0 AND  CONVERT(date,date_system) = CONVERT(date,t.date_system) AND datepart(hour, date_system) = 5) as count_ssh5_sms,
		(select count(*) from sms where typeid = 0 AND  CONVERT(date,date_system) = CONVERT(date,t.date_system) AND datepart(hour, date_system) = 6) as count_ssh6_sms,
		(select count(*) from sms where typeid = 0 AND  CONVERT(date,date_system) = CONVERT(date,t.date_system) AND datepart(hour, date_system) = 7) as count_ssh7_sms,
		(select count(*) from sms where typeid = 0 AND  CONVERT(date,date_system) = CONVERT(date,t.date_system) AND datepart(hour, date_system) = 8) as count_ssh8_sms,
		(select count(*) from sms where typeid = 0 AND  CONVERT(date,date_system) = CONVERT(date,t.date_system) AND datepart(hour, date_system) = 9) as count_ssh9_sms,
		(select count(*) from sms where typeid = 0 AND  CONVERT(date,date_system) = CONVERT(date,t.date_system) AND datepart(hour, date_system) = 10) as count_ssh10_sms,
		(select count(*) from sms where typeid = 0 AND  CONVERT(date,date_system) = CONVERT(date,t.date_system) AND datepart(hour, date_system) = 11) as count_ssh11_sms,
		(select count(*) from sms where typeid = 0 AND  CONVERT(date,date_system) = CONVERT(date,t.date_system) AND datepart(hour, date_system) = 12) as count_ssh12_sms,
		(select count(*) from sms where typeid = 0 AND  CONVERT(date,date_system) = CONVERT(date,t.date_system) AND datepart(hour, date_system) = 13) as count_ssh13_sms,
		(select count(*) from sms where typeid = 0 AND  CONVERT(date,date_system) = CONVERT(date,t.date_system) AND datepart(hour, date_system) = 14) as count_ssh14_sms,
		(select count(*) from sms where typeid = 0 AND  CONVERT(date,date_system) = CONVERT(date,t.date_system) AND datepart(hour, date_system) = 15) as count_ssh15_sms,
		(select count(*) from sms where typeid = 0 AND  CONVERT(date,date_system) = CONVERT(date,t.date_system) AND datepart(hour, date_system) = 16) as count_ssh16_sms,
		(select count(*) from sms where typeid = 0 AND  CONVERT(date,date_system) = CONVERT(date,t.date_system) AND datepart(hour, date_system) = 17) as count_ssh17_sms,
		(select count(*) from sms where typeid = 0 AND  CONVERT(date,date_system) = CONVERT(date,t.date_system) AND datepart(hour, date_system) = 18) as count_ssh18_sms,
		(select count(*) from sms where typeid = 0 AND  CONVERT(date,date_system) = CONVERT(date,t.date_system) AND datepart(hour, date_system) = 19) as count_ssh19_sms,
		(select count(*) from sms where typeid = 0 AND  CONVERT(date,date_system) = CONVERT(date,t.date_system) AND datepart(hour, date_system) = 20) as count_ssh20_sms,
		(select count(*) from sms where typeid = 0 AND  CONVERT(date,date_system) = CONVERT(date,t.date_system) AND datepart(hour, date_system) = 21) as count_ssh21_sms,
		(select count(*) from sms where typeid = 0 AND  CONVERT(date,date_system) = CONVERT(date,t.date_system) AND datepart(hour, date_system) = 22) as count_ssh22_sms,
		(select count(*) from sms where typeid = 0 AND  CONVERT(date,date_system) = CONVERT(date,t.date_system) AND datepart(hour, date_system) = 23) as count_ssh23_sms,

		(select count(*) from sms where typeid = 1 AND  CONVERT(date,date_system) = CONVERT(date,t.date_system) AND datepart(hour, date_system) = 0) as count_sah0_sms,
		(select count(*) from sms where typeid = 1 AND  CONVERT(date,date_system) = CONVERT(date,t.date_system) AND datepart(hour, date_system) = 1) as count_sah1_sms,
		(select count(*) from sms where typeid = 1 AND  CONVERT(date,date_system) = CONVERT(date,t.date_system) AND datepart(hour, date_system) = 2) as count_sah2_sms,
		(select count(*) from sms where typeid = 1 AND  CONVERT(date,date_system) = CONVERT(date,t.date_system) AND datepart(hour, date_system) = 3) as count_sah3_sms,
		(select count(*) from sms where typeid = 1 AND  CONVERT(date,date_system) = CONVERT(date,t.date_system) AND datepart(hour, date_system) = 4) as count_sah4_sms,
		(select count(*) from sms where typeid = 1 AND  CONVERT(date,date_system) = CONVERT(date,t.date_system) AND datepart(hour, date_system) = 5) as count_sah5_sms,
		(select count(*) from sms where typeid = 1 AND  CONVERT(date,date_system) = CONVERT(date,t.date_system) AND datepart(hour, date_system) = 6) as count_sah6_sms,
		(select count(*) from sms where typeid = 1 AND  CONVERT(date,date_system) = CONVERT(date,t.date_system) AND datepart(hour, date_system) = 7) as count_sah7_sms,
		(select count(*) from sms where typeid = 1 AND  CONVERT(date,date_system) = CONVERT(date,t.date_system) AND datepart(hour, date_system) = 8) as count_sah8_sms,
		(select count(*) from sms where typeid = 1 AND  CONVERT(date,date_system) = CONVERT(date,t.date_system) AND datepart(hour, date_system) = 9) as count_sah9_sms,
		(select count(*) from sms where typeid = 1 AND  CONVERT(date,date_system) = CONVERT(date,t.date_system) AND datepart(hour, date_system) = 10) as count_sah10_sms,
		(select count(*) from sms where typeid = 1 AND  CONVERT(date,date_system) = CONVERT(date,t.date_system) AND datepart(hour, date_system) = 11) as count_sah11_sms,
		(select count(*) from sms where typeid = 1 AND  CONVERT(date,date_system) = CONVERT(date,t.date_system) AND datepart(hour, date_system) = 12) as count_sah12_sms,
		(select count(*) from sms where typeid = 1 AND  CONVERT(date,date_system) = CONVERT(date,t.date_system) AND datepart(hour, date_system) = 13) as count_sah13_sms,
		(select count(*) from sms where typeid = 1 AND  CONVERT(date,date_system) = CONVERT(date,t.date_system) AND datepart(hour, date_system) = 14) as count_sah14_sms,
		(select count(*) from sms where typeid = 1 AND  CONVERT(date,date_system) = CONVERT(date,t.date_system) AND datepart(hour, date_system) = 15) as count_sah15_sms,
		(select count(*) from sms where typeid = 1 AND  CONVERT(date,date_system) = CONVERT(date,t.date_system) AND datepart(hour, date_system) = 16) as count_sah16_sms,
		(select count(*) from sms where typeid = 1 AND  CONVERT(date,date_system) = CONVERT(date,t.date_system) AND datepart(hour, date_system) = 17) as count_sah17_sms,
		(select count(*) from sms where typeid = 1 AND  CONVERT(date,date_system) = CONVERT(date,t.date_system) AND datepart(hour, date_system) = 18) as count_sah18_sms,
		(select count(*) from sms where typeid = 1 AND  CONVERT(date,date_system) = CONVERT(date,t.date_system) AND datepart(hour, date_system) = 19) as count_sah19_sms,
		(select count(*) from sms where typeid = 1 AND  CONVERT(date,date_system) = CONVERT(date,t.date_system) AND datepart(hour, date_system) = 20) as count_sah20_sms,
		(select count(*) from sms where typeid = 1 AND  CONVERT(date,date_system) = CONVERT(date,t.date_system) AND datepart(hour, date_system) = 21) as count_sah21_sms,
		(select count(*) from sms where typeid = 1 AND  CONVERT(date,date_system) = CONVERT(date,t.date_system) AND datepart(hour, date_system) = 22) as count_sah22_sms,
		(select count(*) from sms where typeid = 1 AND  CONVERT(date,date_system) = CONVERT(date,t.date_system) AND datepart(hour, date_system) = 23) as count_sah23_sms,

		(select max(c1) from (select count(telephone) as c1, telephone from sms group by CONVERT(date,date_system), telephone, typeid having typeid = 0 AND CONVERT(date,date_system) = CONVERT(date,t.date_system)) as asd) as count_max_1_sms,
		(select max(c1) from (select count(telephone) as c1, telephone from sms group by CONVERT(date,date_system), telephone, typeid having typeid = 1 AND CONVERT(date,date_system) = CONVERT(date,t.date_system)) as asd) as count_max_1_sait,
		(select max(c1) from (select count(telephone) as c1, telephone from sms group by CONVERT(date,date_system), telephone, typeid having CONVERT(date,date_system) = CONVERT(date,t.date_system)) as asd) as count_max_1,
		(select count(distinct telephone) from sms where telephone like '99655%' AND CONVERT(date,date_system) = CONVERT(date,t.date_system)) as count_tel_mega,
		(select count(distinct telephone) from sms where telephone like '99677%' AND CONVERT(date,date_system) = CONVERT(date,t.date_system)) as count_tel_beeline,
		(select count(distinct telephone) from sms where telephone like '99654%' AND CONVERT(date,date_system) = CONVERT(date,t.date_system)) as count_tel_fonex,
		(select count(distinct telephone) from sms where telephone like '99670%' AND CONVERT(date,date_system) = CONVERT(date,t.date_system)) as count_tel_o,
		(select count(distinct telephone) from sms where telephone like '99651%' AND CONVERT(date,date_system) = CONVERT(date,t.date_system)) as count_tel_katel,
		(select count(distinct telephone) from sms where telephone like '99657%' AND CONVERT(date,date_system) = CONVERT(date,t.date_system)) as count_tel_nexi,

		(select count(*) from sms where status = 1 AND CONVERT(date,date_system) = CONVERT(date,t.date_system)) as count_status_1,
		(select count(*) from sms where status = 0 AND CONVERT(date,date_system) = CONVERT(date,t.date_system)) as count_status_0,
		(select count(*) from sms where status = 2 AND CONVERT(date,date_system) = CONVERT(date,t.date_system)) as count_status_2,
		(select count(*) from sms where status = 0 AND CONVERT(date,date_system) = CONVERT(date,t.date_system)) as count_status_0,

		(select count(*) from sms where telephone like '99655%' AND CONVERT(date,date_system) = CONVERT(date,t.date_system)) as count_code_mega,
		(select count(*) from sms where telephone like '99677%' AND CONVERT(date,date_system) = CONVERT(date,t.date_system)) as count_code_beeline,
		(select count(*) from sms where telephone like '99654%' AND CONVERT(date,date_system) = CONVERT(date,t.date_system)) as count_code_fonex,
		(select count(*) from sms where telephone like '99670%' AND CONVERT(date,date_system) = CONVERT(date,t.date_system)) as count_code_o,
		(select count(*) from sms where telephone like '99651%' AND CONVERT(date,date_system) = CONVERT(date,t.date_system)) as count_code_katel,
		(select count(*) from sms where telephone like '99657%' AND CONVERT(date,date_system) = CONVERT(date,t.date_system)) as count_code_nexi

		from sms t
		group by CONVERT(date,t.date_system)
		order by CONVERT(date,t.date_system)");

		return array(
			'records'=>$records,
		);
	}



	public function dayReportShort(){
		$this->setContext('json');

		$records = array();

		$dataStart = db::row('select min(convert(date,date_system,104)) as date1 from sms');
		$dataStart = $dataStart['date1'];
		// $dataEnd = db::row('select max(convert(date,date_system,104)) as date1 from sms');
		// $dataEnd = $dataEnd['date1'];
		$count = db::row('select DATEDIFF(day, min(convert(date,date_system,104)),max(convert(date,date_system,104)))as count1 from sms');
		$count = $count['count1'];

		$records = db::rows('select
		CONVERT(date,t.date_system) as date_system,
		(select count(*) as count_sms from sms where typeid = 0 and status = 1 AND CONVERT(date,date_system) = CONVERT(date,t.date_system)) as count_sms,
		(select count(*) as count_sms from sms where typeid = 1 and status = 1 AND CONVERT(date,date_system) = CONVERT(date,t.date_system)) as count_sait,
		(select count(*) as count_sms from sms where status = 1 AND CONVERT(date,date_system) = CONVERT(date,t.date_system)) as count_total,
		(select count(distinct telephone) as count_sms from sms where typeid = 0 AND CONVERT(date,date_system) = CONVERT(date,t.date_system)) as count_unick_sms,
		(select count(distinct telephone) as count_sms from sms where typeid = 1 AND CONVERT(date,date_system) = CONVERT(date,t.date_system)) as count_unick_sait,
		(select count(distinct telephone) as count_sms from sms where CONVERT(date,date_system) = CONVERT(date,t.date_system)) as count_unick_total,
		(select count(*) as count_sms from (select count(telephone) as c1, telephone from sms group by CONVERT(date,date_system), telephone, typeid having typeid = 0 AND CONVERT(date,date_system)=CONVERT(date,t.date_system) and COUNT(telephone) = 1) as asd) as count_1_sms,
		(select count(*) as count_sms from (select count(telephone) as c1, telephone from sms group by CONVERT(date,date_system), telephone, typeid having typeid = 1 AND CONVERT(date,date_system)=CONVERT(date,t.date_system) and COUNT(telephone) = 1) as asd) count_1_sait,
		(select count(*) as count_sms from (select count(telephone) as c1, telephone from sms group by CONVERT(date,date_system), telephone, typeid having typeid = 0 AND CONVERT(date,date_system)=CONVERT(date,t.date_system) and COUNT(telephone) > 1) as asd) as count_bolee_1_sms,
		(select count(*) as count_sms from (select count(telephone) as c1, telephone from sms group by CONVERT(date,date_system), telephone, typeid having typeid = 1 AND CONVERT(date,date_system)=CONVERT(date,t.date_system) and COUNT(telephone) > 1) as asd) as count_bolee_1_sait

		from sms t
		group by CONVERT(date,t.date_system)
		order by CONVERT(date,t.date_system)');

		return array(
			'records'=>$records,
		);
	}

	public function monthReportShort(){
		$this->setContext('json');

		$records = db::rows("select
 		convert(varchar(4),datepart(year,t.date_system)) + '-' + convert(varchar(4),datepart(month,t.date_system)) as date_system,
		(select count(*) as count_sms from sms where typeid = 0 and status = 1 AND convert(varchar(4),datepart(year,date_system)) + '-' + convert(varchar(4),datepart(month,date_system)) = convert(varchar(4),datepart(year,t.date_system)) + '-' + convert(varchar(4),datepart(month,t.date_system))) as count_sms,
		(select count(*) as count_sms from sms where typeid = 1 and status = 1 AND convert(varchar(4),datepart(year,date_system)) + '-' + convert(varchar(4),datepart(month,date_system)) = convert(varchar(4),datepart(year,t.date_system)) + '-' + convert(varchar(4),datepart(month,t.date_system))) as count_sait,
		(select count(*) as count_sms from sms where status = 1 AND convert(varchar(4),datepart(year,date_system)) + '-' + convert(varchar(4),datepart(month,date_system)) = convert(varchar(4),datepart(year,t.date_system)) + '-' + convert(varchar(4),datepart(month,t.date_system))) as count_total,
		(select count(distinct telephone) as count_sms from sms where typeid = 0 AND convert(varchar(4),datepart(year,date_system)) + '-' + convert(varchar(4),datepart(month,date_system)) = convert(varchar(4),datepart(year,t.date_system)) + '-' + convert(varchar(4),datepart(month,t.date_system))) as count_unick_sms,
		(select count(distinct telephone) as count_sms from sms where typeid = 1 AND convert(varchar(4),datepart(year,date_system)) + '-' + convert(varchar(4),datepart(month,date_system)) = convert(varchar(4),datepart(year,t.date_system)) + '-' + convert(varchar(4),datepart(month,t.date_system))) as count_unick_sait,
		(select count(distinct telephone) as count_sms from sms where convert(varchar(4),datepart(year,date_system)) + '-' + convert(varchar(4),datepart(month,date_system)) = convert(varchar(4),datepart(year,t.date_system)) + '-' + convert(varchar(4),datepart(month,t.date_system))) as count_unick_total,
		(select count(*) as count_sms from (select count(telephone) as c1, telephone from sms group by convert(varchar(4),datepart(year,date_system)) + '-' + convert(varchar(4),datepart(month,date_system)), telephone, typeid having typeid = 0 AND convert(varchar(4),datepart(year,date_system)) + '-' + convert(varchar(4),datepart(month,date_system))=convert(varchar(4),datepart(year,t.date_system)) + '-' + convert(varchar(4),datepart(month,t.date_system)) and COUNT(telephone) = 1) as asd) as count_1_sms,
		(select count(*) as count_sms from (select count(telephone) as c1, telephone from sms group by convert(varchar(4),datepart(year,date_system)) + '-' + convert(varchar(4),datepart(month,date_system)), telephone, typeid having typeid = 1 AND convert(varchar(4),datepart(year,date_system)) + '-' + convert(varchar(4),datepart(month,date_system))=convert(varchar(4),datepart(year,t.date_system)) + '-' + convert(varchar(4),datepart(month,t.date_system)) and COUNT(telephone) = 1) as asd) count_1_sait,
		(select count(*) as count_sms from (select count(telephone) as c1, telephone from sms group by convert(varchar(4),datepart(year,date_system)) + '-' + convert(varchar(4),datepart(month,date_system)), telephone, typeid having typeid = 0 AND convert(varchar(4),datepart(year,date_system)) + '-' + convert(varchar(4),datepart(month,date_system))=convert(varchar(4),datepart(year,t.date_system)) + '-' + convert(varchar(4),datepart(month,t.date_system)) and COUNT(telephone) > 1) as asd) as count_bolee_1_sms,
		(select count(*) as count_sms from (select count(telephone) as c1, telephone from sms group by convert(varchar(4),datepart(year,date_system)) + '-' + convert(varchar(4),datepart(month,date_system)), telephone, typeid having typeid = 1 AND convert(varchar(4),datepart(year,date_system)) + '-' + convert(varchar(4),datepart(month,date_system))=convert(varchar(4),datepart(year,t.date_system)) + '-' + convert(varchar(4),datepart(month,t.date_system)) and COUNT(telephone) > 1) as asd) as count_bolee_1_sait

		from sms t
		group by convert(varchar(4),datepart(year,t.date_system)) + '-' + convert(varchar(4),datepart(month,t.date_system))
		order by convert(varchar(4),datepart(year,t.date_system)) + '-' + convert(varchar(4),datepart(month,t.date_system))");

		return array(
			'records'=>$records,
		);
	}

	public function monthReportDetail(){
		$this->setContext('json');

		set_time_limit(120);
		$records = db::rows("select
		 convert(varchar(4),datepart(year,t.date_system)) + '-' + convert(varchar(4),datepart(month,t.date_system)) as date_system,

		(select count(*) from sms where typeid = 0 and status = 1 AND convert(varchar(4),datepart(year,date_system)) + '-' + convert(varchar(4),datepart(month,date_system)) = convert(varchar(4),datepart(year,t.date_system)) + '-' + convert(varchar(4),datepart(month,t.date_system))) as count_sms,
		(select count(*) from sms where typeid = 1 and status = 1 AND convert(varchar(4),datepart(year,date_system)) + '-' + convert(varchar(4),datepart(month,date_system)) = convert(varchar(4),datepart(year,t.date_system)) + '-' + convert(varchar(4),datepart(month,t.date_system))) as count_sait,
		(select count(*) from sms where status = 1 AND convert(varchar(4),datepart(year,date_system)) + '-' + convert(varchar(4),datepart(month,date_system)) = convert(varchar(4),datepart(year,t.date_system)) + '-' + convert(varchar(4),datepart(month,t.date_system))) as count_total,

		(select count(distinct telephone) from sms where typeid = 0 AND convert(varchar(4),datepart(year,date_system)) + '-' + convert(varchar(4),datepart(month,date_system)) = convert(varchar(4),datepart(year,t.date_system)) + '-' + convert(varchar(4),datepart(month,t.date_system))) as count_unick_sms,
		(select count(distinct telephone) from sms where typeid = 1 AND convert(varchar(4),datepart(year,date_system)) + '-' + convert(varchar(4),datepart(month,date_system)) = convert(varchar(4),datepart(year,t.date_system)) + '-' + convert(varchar(4),datepart(month,t.date_system))) as count_unick_sait,
		(select count(distinct telephone) from sms where convert(varchar(4),datepart(year,date_system)) + '-' + convert(varchar(4),datepart(month,date_system)) = convert(varchar(4),datepart(year,t.date_system)) + '-' + convert(varchar(4),datepart(month,t.date_system))) as count_unick_total,

		(select count(*) from (select count(telephone) as c1, telephone from sms group by convert(varchar(4),datepart(year,date_system)) + '-' + convert(varchar(4),datepart(month,date_system)), telephone, typeid having typeid = 0 AND convert(varchar(4),datepart(year,date_system)) + '-' + convert(varchar(4),datepart(month,date_system))=convert(varchar(4),datepart(year,t.date_system)) + '-' + convert(varchar(4),datepart(month,t.date_system)) and COUNT(telephone) = 1) as asd) as count_1_sms,
		(select count(*) from (select count(telephone) as c1, telephone from sms group by convert(varchar(4),datepart(year,date_system)) + '-' + convert(varchar(4),datepart(month,date_system)), telephone, typeid having typeid = 1 AND convert(varchar(4),datepart(year,date_system)) + '-' + convert(varchar(4),datepart(month,date_system))=convert(varchar(4),datepart(year,t.date_system)) + '-' + convert(varchar(4),datepart(month,t.date_system)) and COUNT(telephone) = 1) as asd) count_1_sait,
		(select count(*) from (select count(telephone) as c1, telephone from sms group by convert(varchar(4),datepart(year,date_system)) + '-' + convert(varchar(4),datepart(month,date_system)), telephone, typeid having typeid = 0 AND convert(varchar(4),datepart(year,date_system)) + '-' + convert(varchar(4),datepart(month,date_system))=convert(varchar(4),datepart(year,t.date_system)) + '-' + convert(varchar(4),datepart(month,t.date_system)) and COUNT(telephone) > 1) as asd) as count_bolee_1_sms,
		(select count(*) from (select count(telephone) as c1, telephone from sms group by convert(varchar(4),datepart(year,date_system)) + '-' + convert(varchar(4),datepart(month,date_system)), telephone, typeid having typeid = 1 AND convert(varchar(4),datepart(year,date_system)) + '-' + convert(varchar(4),datepart(month,date_system))=convert(varchar(4),datepart(year,t.date_system)) + '-' + convert(varchar(4),datepart(month,t.date_system)) and COUNT(telephone) > 1) as asd) as count_bolee_1_sait,

		(select count(*) from sms where typeid = 0 AND  convert(varchar(4),datepart(year,date_system)) + '-' + convert(varchar(4),datepart(month,date_system)) = convert(varchar(4),datepart(year,t.date_system)) + '-' + convert(varchar(4),datepart(month,t.date_system)) AND datepart(hour, date_system) = 0) as count_ssh0_sms,
		(select count(*) from sms where typeid = 0 AND  convert(varchar(4),datepart(year,date_system)) + '-' + convert(varchar(4),datepart(month,date_system)) = convert(varchar(4),datepart(year,t.date_system)) + '-' + convert(varchar(4),datepart(month,t.date_system)) AND datepart(hour, date_system) = 1) as count_ssh1_sms,
		(select count(*) from sms where typeid = 0 AND  convert(varchar(4),datepart(year,date_system)) + '-' + convert(varchar(4),datepart(month,date_system)) = convert(varchar(4),datepart(year,t.date_system)) + '-' + convert(varchar(4),datepart(month,t.date_system)) AND datepart(hour, date_system) = 2) as count_ssh2_sms,
		(select count(*) from sms where typeid = 0 AND  convert(varchar(4),datepart(year,date_system)) + '-' + convert(varchar(4),datepart(month,date_system)) = convert(varchar(4),datepart(year,t.date_system)) + '-' + convert(varchar(4),datepart(month,t.date_system)) AND datepart(hour, date_system) = 3) as count_ssh3_sms,
		(select count(*) from sms where typeid = 0 AND  convert(varchar(4),datepart(year,date_system)) + '-' + convert(varchar(4),datepart(month,date_system)) = convert(varchar(4),datepart(year,t.date_system)) + '-' + convert(varchar(4),datepart(month,t.date_system)) AND datepart(hour, date_system) = 4) as count_ssh4_sms,
		(select count(*) from sms where typeid = 0 AND  convert(varchar(4),datepart(year,date_system)) + '-' + convert(varchar(4),datepart(month,date_system)) = convert(varchar(4),datepart(year,t.date_system)) + '-' + convert(varchar(4),datepart(month,t.date_system)) AND datepart(hour, date_system) = 5) as count_ssh5_sms,
		(select count(*) from sms where typeid = 0 AND  convert(varchar(4),datepart(year,date_system)) + '-' + convert(varchar(4),datepart(month,date_system)) = convert(varchar(4),datepart(year,t.date_system)) + '-' + convert(varchar(4),datepart(month,t.date_system)) AND datepart(hour, date_system) = 6) as count_ssh6_sms,
		(select count(*) from sms where typeid = 0 AND  convert(varchar(4),datepart(year,date_system)) + '-' + convert(varchar(4),datepart(month,date_system)) = convert(varchar(4),datepart(year,t.date_system)) + '-' + convert(varchar(4),datepart(month,t.date_system)) AND datepart(hour, date_system) = 7) as count_ssh7_sms,
		(select count(*) from sms where typeid = 0 AND  convert(varchar(4),datepart(year,date_system)) + '-' + convert(varchar(4),datepart(month,date_system)) = convert(varchar(4),datepart(year,t.date_system)) + '-' + convert(varchar(4),datepart(month,t.date_system)) AND datepart(hour, date_system) = 8) as count_ssh8_sms,
		(select count(*) from sms where typeid = 0 AND  convert(varchar(4),datepart(year,date_system)) + '-' + convert(varchar(4),datepart(month,date_system)) = convert(varchar(4),datepart(year,t.date_system)) + '-' + convert(varchar(4),datepart(month,t.date_system)) AND datepart(hour, date_system) = 9) as count_ssh9_sms,
		(select count(*) from sms where typeid = 0 AND  convert(varchar(4),datepart(year,date_system)) + '-' + convert(varchar(4),datepart(month,date_system)) = convert(varchar(4),datepart(year,t.date_system)) + '-' + convert(varchar(4),datepart(month,t.date_system)) AND datepart(hour, date_system) = 10) as count_ssh10_sms,
		(select count(*) from sms where typeid = 0 AND  convert(varchar(4),datepart(year,date_system)) + '-' + convert(varchar(4),datepart(month,date_system)) = convert(varchar(4),datepart(year,t.date_system)) + '-' + convert(varchar(4),datepart(month,t.date_system)) AND datepart(hour, date_system) = 11) as count_ssh11_sms,
		(select count(*) from sms where typeid = 0 AND  convert(varchar(4),datepart(year,date_system)) + '-' + convert(varchar(4),datepart(month,date_system)) = convert(varchar(4),datepart(year,t.date_system)) + '-' + convert(varchar(4),datepart(month,t.date_system)) AND datepart(hour, date_system) = 12) as count_ssh12_sms,
		(select count(*) from sms where typeid = 0 AND  convert(varchar(4),datepart(year,date_system)) + '-' + convert(varchar(4),datepart(month,date_system)) = convert(varchar(4),datepart(year,t.date_system)) + '-' + convert(varchar(4),datepart(month,t.date_system)) AND datepart(hour, date_system) = 13) as count_ssh13_sms,
		(select count(*) from sms where typeid = 0 AND  convert(varchar(4),datepart(year,date_system)) + '-' + convert(varchar(4),datepart(month,date_system)) = convert(varchar(4),datepart(year,t.date_system)) + '-' + convert(varchar(4),datepart(month,t.date_system)) AND datepart(hour, date_system) = 14) as count_ssh14_sms,
		(select count(*) from sms where typeid = 0 AND  convert(varchar(4),datepart(year,date_system)) + '-' + convert(varchar(4),datepart(month,date_system)) = convert(varchar(4),datepart(year,t.date_system)) + '-' + convert(varchar(4),datepart(month,t.date_system)) AND datepart(hour, date_system) = 15) as count_ssh15_sms,
		(select count(*) from sms where typeid = 0 AND  convert(varchar(4),datepart(year,date_system)) + '-' + convert(varchar(4),datepart(month,date_system)) = convert(varchar(4),datepart(year,t.date_system)) + '-' + convert(varchar(4),datepart(month,t.date_system)) AND datepart(hour, date_system) = 16) as count_ssh16_sms,
		(select count(*) from sms where typeid = 0 AND  convert(varchar(4),datepart(year,date_system)) + '-' + convert(varchar(4),datepart(month,date_system)) = convert(varchar(4),datepart(year,t.date_system)) + '-' + convert(varchar(4),datepart(month,t.date_system)) AND datepart(hour, date_system) = 17) as count_ssh17_sms,
		(select count(*) from sms where typeid = 0 AND  convert(varchar(4),datepart(year,date_system)) + '-' + convert(varchar(4),datepart(month,date_system)) = convert(varchar(4),datepart(year,t.date_system)) + '-' + convert(varchar(4),datepart(month,t.date_system)) AND datepart(hour, date_system) = 18) as count_ssh18_sms,
		(select count(*) from sms where typeid = 0 AND  convert(varchar(4),datepart(year,date_system)) + '-' + convert(varchar(4),datepart(month,date_system)) = convert(varchar(4),datepart(year,t.date_system)) + '-' + convert(varchar(4),datepart(month,t.date_system)) AND datepart(hour, date_system) = 19) as count_ssh19_sms,
		(select count(*) from sms where typeid = 0 AND  convert(varchar(4),datepart(year,date_system)) + '-' + convert(varchar(4),datepart(month,date_system)) = convert(varchar(4),datepart(year,t.date_system)) + '-' + convert(varchar(4),datepart(month,t.date_system)) AND datepart(hour, date_system) = 20) as count_ssh20_sms,
		(select count(*) from sms where typeid = 0 AND  convert(varchar(4),datepart(year,date_system)) + '-' + convert(varchar(4),datepart(month,date_system)) = convert(varchar(4),datepart(year,t.date_system)) + '-' + convert(varchar(4),datepart(month,t.date_system)) AND datepart(hour, date_system) = 21) as count_ssh21_sms,
		(select count(*) from sms where typeid = 0 AND  convert(varchar(4),datepart(year,date_system)) + '-' + convert(varchar(4),datepart(month,date_system)) = convert(varchar(4),datepart(year,t.date_system)) + '-' + convert(varchar(4),datepart(month,t.date_system)) AND datepart(hour, date_system) = 22) as count_ssh22_sms,
		(select count(*) from sms where typeid = 0 AND  convert(varchar(4),datepart(year,date_system)) + '-' + convert(varchar(4),datepart(month,date_system)) = convert(varchar(4),datepart(year,t.date_system)) + '-' + convert(varchar(4),datepart(month,t.date_system)) AND datepart(hour, date_system) = 23) as count_ssh23_sms,

		(select count(*) from sms where typeid = 1 AND  convert(varchar(4),datepart(year,date_system)) + '-' + convert(varchar(4),datepart(month,date_system)) = convert(varchar(4),datepart(year,t.date_system)) + '-' + convert(varchar(4),datepart(month,t.date_system)) AND datepart(hour, date_system) = 0) as count_sah0_sms,
		(select count(*) from sms where typeid = 1 AND  convert(varchar(4),datepart(year,date_system)) + '-' + convert(varchar(4),datepart(month,date_system)) = convert(varchar(4),datepart(year,t.date_system)) + '-' + convert(varchar(4),datepart(month,t.date_system)) AND datepart(hour, date_system) = 1) as count_sah1_sms,
		(select count(*) from sms where typeid = 1 AND  convert(varchar(4),datepart(year,date_system)) + '-' + convert(varchar(4),datepart(month,date_system)) = convert(varchar(4),datepart(year,t.date_system)) + '-' + convert(varchar(4),datepart(month,t.date_system)) AND datepart(hour, date_system) = 2) as count_sah2_sms,
		(select count(*) from sms where typeid = 1 AND  convert(varchar(4),datepart(year,date_system)) + '-' + convert(varchar(4),datepart(month,date_system)) = convert(varchar(4),datepart(year,t.date_system)) + '-' + convert(varchar(4),datepart(month,t.date_system)) AND datepart(hour, date_system) = 3) as count_sah3_sms,
		(select count(*) from sms where typeid = 1 AND  convert(varchar(4),datepart(year,date_system)) + '-' + convert(varchar(4),datepart(month,date_system)) = convert(varchar(4),datepart(year,t.date_system)) + '-' + convert(varchar(4),datepart(month,t.date_system)) AND datepart(hour, date_system) = 4) as count_sah4_sms,
		(select count(*) from sms where typeid = 1 AND  convert(varchar(4),datepart(year,date_system)) + '-' + convert(varchar(4),datepart(month,date_system)) = convert(varchar(4),datepart(year,t.date_system)) + '-' + convert(varchar(4),datepart(month,t.date_system)) AND datepart(hour, date_system) = 5) as count_sah5_sms,
		(select count(*) from sms where typeid = 1 AND  convert(varchar(4),datepart(year,date_system)) + '-' + convert(varchar(4),datepart(month,date_system)) = convert(varchar(4),datepart(year,t.date_system)) + '-' + convert(varchar(4),datepart(month,t.date_system)) AND datepart(hour, date_system) = 6) as count_sah6_sms,
		(select count(*) from sms where typeid = 1 AND  convert(varchar(4),datepart(year,date_system)) + '-' + convert(varchar(4),datepart(month,date_system)) = convert(varchar(4),datepart(year,t.date_system)) + '-' + convert(varchar(4),datepart(month,t.date_system)) AND datepart(hour, date_system) = 7) as count_sah7_sms,
		(select count(*) from sms where typeid = 1 AND  convert(varchar(4),datepart(year,date_system)) + '-' + convert(varchar(4),datepart(month,date_system)) = convert(varchar(4),datepart(year,t.date_system)) + '-' + convert(varchar(4),datepart(month,t.date_system)) AND datepart(hour, date_system) = 8) as count_sah8_sms,
		(select count(*) from sms where typeid = 1 AND  convert(varchar(4),datepart(year,date_system)) + '-' + convert(varchar(4),datepart(month,date_system)) = convert(varchar(4),datepart(year,t.date_system)) + '-' + convert(varchar(4),datepart(month,t.date_system)) AND datepart(hour, date_system) = 9) as count_sah9_sms,
		(select count(*) from sms where typeid = 1 AND  convert(varchar(4),datepart(year,date_system)) + '-' + convert(varchar(4),datepart(month,date_system)) = convert(varchar(4),datepart(year,t.date_system)) + '-' + convert(varchar(4),datepart(month,t.date_system)) AND datepart(hour, date_system) = 10) as count_sah10_sms,
		(select count(*) from sms where typeid = 1 AND  convert(varchar(4),datepart(year,date_system)) + '-' + convert(varchar(4),datepart(month,date_system)) = convert(varchar(4),datepart(year,t.date_system)) + '-' + convert(varchar(4),datepart(month,t.date_system)) AND datepart(hour, date_system) = 11) as count_sah11_sms,
		(select count(*) from sms where typeid = 1 AND  convert(varchar(4),datepart(year,date_system)) + '-' + convert(varchar(4),datepart(month,date_system)) = convert(varchar(4),datepart(year,t.date_system)) + '-' + convert(varchar(4),datepart(month,t.date_system)) AND datepart(hour, date_system) = 12) as count_sah12_sms,
		(select count(*) from sms where typeid = 1 AND  convert(varchar(4),datepart(year,date_system)) + '-' + convert(varchar(4),datepart(month,date_system)) = convert(varchar(4),datepart(year,t.date_system)) + '-' + convert(varchar(4),datepart(month,t.date_system)) AND datepart(hour, date_system) = 13) as count_sah13_sms,
		(select count(*) from sms where typeid = 1 AND  convert(varchar(4),datepart(year,date_system)) + '-' + convert(varchar(4),datepart(month,date_system)) = convert(varchar(4),datepart(year,t.date_system)) + '-' + convert(varchar(4),datepart(month,t.date_system)) AND datepart(hour, date_system) = 14) as count_sah14_sms,
		(select count(*) from sms where typeid = 1 AND  convert(varchar(4),datepart(year,date_system)) + '-' + convert(varchar(4),datepart(month,date_system)) = convert(varchar(4),datepart(year,t.date_system)) + '-' + convert(varchar(4),datepart(month,t.date_system)) AND datepart(hour, date_system) = 15) as count_sah15_sms,
		(select count(*) from sms where typeid = 1 AND  convert(varchar(4),datepart(year,date_system)) + '-' + convert(varchar(4),datepart(month,date_system)) = convert(varchar(4),datepart(year,t.date_system)) + '-' + convert(varchar(4),datepart(month,t.date_system)) AND datepart(hour, date_system) = 16) as count_sah16_sms,
		(select count(*) from sms where typeid = 1 AND  convert(varchar(4),datepart(year,date_system)) + '-' + convert(varchar(4),datepart(month,date_system)) = convert(varchar(4),datepart(year,t.date_system)) + '-' + convert(varchar(4),datepart(month,t.date_system)) AND datepart(hour, date_system) = 17) as count_sah17_sms,
		(select count(*) from sms where typeid = 1 AND  convert(varchar(4),datepart(year,date_system)) + '-' + convert(varchar(4),datepart(month,date_system)) = convert(varchar(4),datepart(year,t.date_system)) + '-' + convert(varchar(4),datepart(month,t.date_system)) AND datepart(hour, date_system) = 18) as count_sah18_sms,
		(select count(*) from sms where typeid = 1 AND  convert(varchar(4),datepart(year,date_system)) + '-' + convert(varchar(4),datepart(month,date_system)) = convert(varchar(4),datepart(year,t.date_system)) + '-' + convert(varchar(4),datepart(month,t.date_system)) AND datepart(hour, date_system) = 19) as count_sah19_sms,
		(select count(*) from sms where typeid = 1 AND  convert(varchar(4),datepart(year,date_system)) + '-' + convert(varchar(4),datepart(month,date_system)) = convert(varchar(4),datepart(year,t.date_system)) + '-' + convert(varchar(4),datepart(month,t.date_system)) AND datepart(hour, date_system) = 20) as count_sah20_sms,
		(select count(*) from sms where typeid = 1 AND  convert(varchar(4),datepart(year,date_system)) + '-' + convert(varchar(4),datepart(month,date_system)) = convert(varchar(4),datepart(year,t.date_system)) + '-' + convert(varchar(4),datepart(month,t.date_system)) AND datepart(hour, date_system) = 21) as count_sah21_sms,
		(select count(*) from sms where typeid = 1 AND  convert(varchar(4),datepart(year,date_system)) + '-' + convert(varchar(4),datepart(month,date_system)) = convert(varchar(4),datepart(year,t.date_system)) + '-' + convert(varchar(4),datepart(month,t.date_system)) AND datepart(hour, date_system) = 22) as count_sah22_sms,
		(select count(*) from sms where typeid = 1 AND  convert(varchar(4),datepart(year,date_system)) + '-' + convert(varchar(4),datepart(month,date_system)) = convert(varchar(4),datepart(year,t.date_system)) + '-' + convert(varchar(4),datepart(month,t.date_system)) AND datepart(hour, date_system) = 23) as count_sah23_sms,

		(select max(c1) from (select count(telephone) as c1, telephone from sms group by convert(varchar(4),datepart(year,date_system)) + '-' + convert(varchar(4),datepart(month,date_system)), telephone, typeid having typeid = 0 AND convert(varchar(4),datepart(year,date_system)) + '-' + convert(varchar(4),datepart(month,date_system)) = convert(varchar(4),datepart(year,t.date_system)) + '-' + convert(varchar(4),datepart(month,t.date_system))) as asd) as count_max_1_sms,
		(select max(c1) from (select count(telephone) as c1, telephone from sms group by convert(varchar(4),datepart(year,date_system)) + '-' + convert(varchar(4),datepart(month,date_system)), telephone, typeid having typeid = 1 AND convert(varchar(4),datepart(year,date_system)) + '-' + convert(varchar(4),datepart(month,date_system)) = convert(varchar(4),datepart(year,t.date_system)) + '-' + convert(varchar(4),datepart(month,t.date_system))) as asd) as count_max_1_sait,
		(select max(c1) from (select count(telephone) as c1, telephone from sms group by convert(varchar(4),datepart(year,date_system)) + '-' + convert(varchar(4),datepart(month,date_system)), telephone, typeid having convert(varchar(4),datepart(year,date_system)) + '-' + convert(varchar(4),datepart(month,date_system)) = convert(varchar(4),datepart(year,t.date_system)) + '-' + convert(varchar(4),datepart(month,t.date_system))) as asd) as count_max_1,

		(select count(distinct telephone) from sms where telephone like '99655%' AND convert(varchar(4),datepart(year,date_system)) + '-' + convert(varchar(4),datepart(month,date_system)) = convert(varchar(4),datepart(year,t.date_system)) + '-' + convert(varchar(4),datepart(month,t.date_system))) as count_tel_mega,
		(select count(distinct telephone) from sms where telephone like '99677%' AND convert(varchar(4),datepart(year,date_system)) + '-' + convert(varchar(4),datepart(month,date_system)) = convert(varchar(4),datepart(year,t.date_system)) + '-' + convert(varchar(4),datepart(month,t.date_system))) as count_tel_beeline,
		(select count(distinct telephone) from sms where telephone like '99654%' AND convert(varchar(4),datepart(year,date_system)) + '-' + convert(varchar(4),datepart(month,date_system)) = convert(varchar(4),datepart(year,t.date_system)) + '-' + convert(varchar(4),datepart(month,t.date_system))) as count_tel_fonex,
		(select count(distinct telephone) from sms where telephone like '99670%' AND convert(varchar(4),datepart(year,date_system)) + '-' + convert(varchar(4),datepart(month,date_system)) = convert(varchar(4),datepart(year,t.date_system)) + '-' + convert(varchar(4),datepart(month,t.date_system))) as count_tel_o,
		(select count(distinct telephone) from sms where telephone like '99651%' AND convert(varchar(4),datepart(year,date_system)) + '-' + convert(varchar(4),datepart(month,date_system)) = convert(varchar(4),datepart(year,t.date_system)) + '-' + convert(varchar(4),datepart(month,t.date_system))) as count_tel_katel,
		(select count(distinct telephone) from sms where telephone like '99657%' AND convert(varchar(4),datepart(year,date_system)) + '-' + convert(varchar(4),datepart(month,date_system)) = convert(varchar(4),datepart(year,t.date_system)) + '-' + convert(varchar(4),datepart(month,t.date_system))) as count_tel_nexi,

		(select count(*) from sms where status = 1 AND convert(varchar(4),datepart(year,date_system)) + '-' + convert(varchar(4),datepart(month,date_system)) = convert(varchar(4),datepart(year,t.date_system)) + '-' + convert(varchar(4),datepart(month,t.date_system))) as count_status_1,
		(select count(*) from sms where status = 0 AND convert(varchar(4),datepart(year,date_system)) + '-' + convert(varchar(4),datepart(month,date_system)) = convert(varchar(4),datepart(year,t.date_system)) + '-' + convert(varchar(4),datepart(month,t.date_system))) as count_status_0,
		(select count(*) from sms where status = 2 AND convert(varchar(4),datepart(year,date_system)) + '-' + convert(varchar(4),datepart(month,date_system)) = convert(varchar(4),datepart(year,t.date_system)) + '-' + convert(varchar(4),datepart(month,t.date_system))) as count_status_2,
		(select count(*) from sms where status = 0 AND convert(varchar(4),datepart(year,date_system)) + '-' + convert(varchar(4),datepart(month,date_system)) = convert(varchar(4),datepart(year,t.date_system)) + '-' + convert(varchar(4),datepart(month,t.date_system))) as count_status_0,

		(select count(*) from sms where telephone like '99655%' AND convert(varchar(4),datepart(year,date_system)) + '-' + convert(varchar(4),datepart(month,date_system)) = convert(varchar(4),datepart(year,t.date_system)) + '-' + convert(varchar(4),datepart(month,t.date_system))) as count_code_mega,
		(select count(*) from sms where telephone like '99677%' AND convert(varchar(4),datepart(year,date_system)) + '-' + convert(varchar(4),datepart(month,date_system)) = convert(varchar(4),datepart(year,t.date_system)) + '-' + convert(varchar(4),datepart(month,t.date_system))) as count_code_beeline,
		(select count(*) from sms where telephone like '99654%' AND convert(varchar(4),datepart(year,date_system)) + '-' + convert(varchar(4),datepart(month,date_system)) = convert(varchar(4),datepart(year,t.date_system)) + '-' + convert(varchar(4),datepart(month,t.date_system))) as count_code_fonex,
		(select count(*) from sms where telephone like '99670%' AND convert(varchar(4),datepart(year,date_system)) + '-' + convert(varchar(4),datepart(month,date_system)) = convert(varchar(4),datepart(year,t.date_system)) + '-' + convert(varchar(4),datepart(month,t.date_system))) as count_code_o,
		(select count(*) from sms where telephone like '99651%' AND convert(varchar(4),datepart(year,date_system)) + '-' + convert(varchar(4),datepart(month,date_system)) = convert(varchar(4),datepart(year,t.date_system)) + '-' + convert(varchar(4),datepart(month,t.date_system))) as count_code_katel,
		(select count(*) from sms where telephone like '99657%' AND convert(varchar(4),datepart(year,date_system)) + '-' + convert(varchar(4),datepart(month,date_system)) = convert(varchar(4),datepart(year,t.date_system)) + '-' + convert(varchar(4),datepart(month,t.date_system))) as count_code_nexi

		from sms t
		group by convert(varchar(4),datepart(year,t.date_system)) + '-' + convert(varchar(4),datepart(month,t.date_system))
		order by convert(varchar(4),datepart(year,t.date_system)) + '-' + convert(varchar(4),datepart(month,t.date_system))");

		return array(
			'records'=>$records,
		);
	}

}
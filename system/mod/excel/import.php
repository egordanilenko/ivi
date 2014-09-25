<?php
if (!defined('CS-SOFT')) die("Hacking attempt!");
$view = array();	
////////////////////////////////////////////////////////////////////////////////////    
 
switch($map['action'])
{	
    case "save":
    {  
  
        
        if(isset($_FILES['import_file']['name']))
        { 
                $pCore->Query('truncate table import;');
                require_once 'Classes/Excel/reader.php';
                $data = new Spreadsheet_Excel_Reader();
                $data->setOutputEncoding('utf-8');
                $data->read($_FILES['import_file']['tmp_name']);
                error_reporting(E_ALL ^ E_NOTICE);
                for ($i = 2; $i <= $data->sheets[0]['numRows']; $i++) {
                        $file_data['idn']=$data->sheets[0]['cells'][$i][1];
                        $file_data['surname']=$data->sheets[0]['cells'][$i][2];
                        $file_data['name']=$data->sheets[0]['cells'][$i][3];
                        $file_data['fio']=$data->sheets[0]['cells'][$i][4];
                        $file_data['login']=$data->sheets[0]['cells'][$i][5];
                        $file_data['pass']=$data->sheets[0]['cells'][$i][6];
                        $file_data['otdel']=$data->sheets[0]['cells'][$i][7];
                        $file_data['doljnost']=$data->sheets[0]['cells'][$i][8];
                        $file_data['pol']=$data->sheets[0]['cells'][$i][9];
                        $file_data['data_rojdeniya']=$data->sheets[0]['cells'][$i][10];
                        $file_data['data_priema']=$data->sheets[0]['cells'][$i][11];
                        $file_data['adress']=$data->sheets[0]['cells'][$i][12];
                        $file_data['e_mail']=$data->sheets[0]['cells'][$i][13];
                        $file_data['skype']=$data->sheets[0]['cells'][$i][14];
                        $file_data['rejim_raboti']=$data->sheets[0]['cells'][$i][15];
                        $file_data['passport']=$data->sheets[0]['cells'][$i][16];
                        $file_data['inn']=$data->sheets[0]['cells'][$i][17];
                        $file_data['o_sebe']=$data->sheets[0]['cells'][$i][18];
                        $file_data['tab_n']=$data->sheets[0]['cells'][$i][19];
                        $file_data['code_card_fam']=$data->sheets[0]['cells'][$i][20];
                        $file_data['card_num']=$data->sheets[0]['cells'][$i][21];
                        $file_data['phone']=$data->sheets[0]['cells'][$i][22];
                        $file_data['file_dir']=$data->sheets[0]['cells'][$i][23];
                        $file_data['data_rojdeniya'] = date("d-m-Y", strtotime($file_data['data_rojdeniya']));
                        $file_data['data_priema'] = date("d-m-Y", strtotime($file_data['data_rojdeniya']));
                        if($file_data['pol']=='Муж') $file_data['pol']=1; else $file_data['pol']=0;
                        $pCore->sqlInsert('import',$file_data);
                       	/*echo '<script type="text/javascript">
        							document.location.replace("index.php");	
        						</script>';*/
                }   
                    $pCore->sqlProcedure('import_check',array());
                    $table ='<form action="index.php?go='.$pCore->encrypt("module=import&action=save_import").'" method="POST">';
                   $table .='<table class=\"user_table table post-tbl table-striped\"><thead><tr  style=\"font-weight: bold;\"><td>инд. №</td><td>ФИО</td><td>Статус</td><td>Действие</td></tr></thead><tbody>';
                   
                   $tb=$pCore->sqlSelect('check_status');
                   if(empty($tb)) {
                    echo '<script type="text/javascript">
        							document.location.replace("index.php");	
        						</script>'; 
                    
                   } else {
                    foreach($tb as $key => $items)
                    {
                        $table .="<tr><td>".$items['idn']."</td><td>".$items['surname']." ".$items['name']." ".$items['fio']."</td>";
                        if($items['status']==0) $status='Несовпадение данных';
                        if($items['status']==1) $status='Отсутствует в модуле';
                        if($items['status']==2) $status='Отсутствует в импорте';
                        $table .="<td>".$status."</td>";
                        if($items['status']==0) {
                         $table .="<td><input type=\"radio\" name=\"".$items['idn']."\" value=\"0\">Заменить";
                         $table .="<input type=\"radio\" name=\"".$items['idn']."\" value=\"3\" style=\"margin-left:5px;\">Пропустить</td></tr>";   
                        }
                        
                        if($items['status']==2) {
                            $table .="<td><input type=\"radio\" name=\"".$items['idn']."\" value=\"1\">Удалить";
                            $table .="<input type=\"radio\" name=\"".$items['idn']."\" value=\"3\" style=\"margin-left:13px;\">Пропустить</td></tr>";   
                        }
                        
                        if($items['status']==1){
                            $table .="<td><input type=\"radio\" name=\"".$items['idn']."\" value=\"2\">Добавить";
                            $table .="<input type=\"radio\" name=\"".$items['idn']."\" value=\"3\" style=\"margin-left:6px;\">Пропустить</td></tr>";
                        }
                    }
                   
                   $table .='</tbody></table><button class="btn btn-primary" type="submit" style="float:right;">Сохранить</button></form>'; 
                //echo "<script>Modal('gdfgdfgdfgdfgdf dfgd gdf gdfgd','ttt');</script>";
                $main['vars']['content'] = "<script>$(function(){Modal('".$table."','Выберите одно из действий');})</script>";
                }
            }  
             
        
     
    }break;
    
    case "save_import":   
    { 
         $tb=$pCore->sqlSelect('check_status');
          
            foreach($tb as $key => $items)
            {   
                unset($items['status']);
                if($_POST[$items['idn']] == 0) {
                    unset($items['codeid']);
                    $pCore->sqlUpdate('reestr',$items,'idn='.(int)$items['idn']);
                  
                    }
                if($_POST[$items['idn']] == 1) $pCore->sqlDelete('reestr','idn='.(int)$items['idn']);
                if($_POST[$items['idn']] == 2) {
                    unset($items['codeid']);
                    $pCore->sqlInsert('reestr',$items);
                }
                if($_POST[$items['idn']] == 3) ;
            }
          echo '<script type="text/javascript">
        							document.location.replace("index.php");	
        						</script>';  
    }break;
    
 	case "import":
    {   
        $view['vars']['tablica'] = $pCore->encrypt('module=import&action=save');
   		$tpl->ShowMain($view);
    }break;
}

?>    
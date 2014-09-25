<?php
/**
 * @version 0.2
 * @author avoc-b
 * @license GPL
 * @copyright ���������� ���� (http://recens.ru),recens
 */


/**
 * ������� �����������
 *
 * ������� �������� � PNG, GIF � JPEG �������������.
 * ������� ��� ��� � ��������� ��������� �����, ��� � ������������� (�������������).
 *
 * @param string ������������ ��������� �����
 * @param string ������������ ��������� �����
 * @param array ���������� �������
 * @param bool ������� ���� � �������� ��� � ���������
 * @return bool
 */
function crop($file_input, $file_output, $crop = 'square',$percent = false) {
	list($w_i, $h_i, $type) = getimagesize($file_input);
	if (!$w_i || !$h_i) {
		echo '���������� �������� ����� � ������ �����������';
		return;
    }
    $types = array('','gif','jpeg','png');
    $ext = $types[$type];
    if ($ext) {
    	$func = 'imagecreatefrom'.$ext;
    	$img = $func($file_input);
    } else {
    	echo '������������ ������ �����';
		return;
    }
	if ($crop == 'square') {
		$min = $w_i;
		if ($w_i > $h_i) $min = $h_i;
		$w_o = $h_o = $min;
	} else {
		list($x_o, $y_o, $w_o, $h_o) = $crop;
		if ($percent) {
			$w_o *= $w_i / 100;
			$h_o *= $h_i / 100;
			$x_o *= $w_i / 100;
			$y_o *= $h_i / 100;
		}
    	if ($w_o < 0) $w_o += $w_i;
	    $w_o -= $x_o;
	   	if ($h_o < 0) $h_o += $h_i;
		$h_o -= $y_o;
	}
	$img_o = imagecreatetruecolor($w_o, $h_o);
	imagecopy($img_o, $img, 0, 0, $x_o, $y_o, $w_o, $h_o);
	if ($type == 2) {
        return imagejpeg($img_o,$file_output,100);
	} else {
		$func = 'image'.$ext;
		return $func($img_o,$file_output);
	}
}

/**
 * ��������������� �����������
 *
 * ������� �������� � PNG, GIF � JPEG �������������.
 * ��������������� �������� ��� � ���������� ����� �������, ��� � ����, � ��������� ��� ��������.
 *
 * @param string ������������ ��������� �����
 * @param string ������������ ��������� �����
 * @param integer ������ ��������� �����
 * @param integer ������ ��������� �����
 * @param bool ������� ���� � �������� ��� � ���������
 * @return bool
 */
function resize($file_input, $file_output, $w_o, $h_o, $percent = false) {
	list($w_i, $h_i, $type) = getimagesize($file_input);
	if (!$w_i || !$h_i) {
		echo '���������� �������� ����� � ������ �����������';
		return;
    }
    $types = array('','gif','jpeg','png');
    $ext = $types[$type];
    if ($ext) {
    	$func = 'imagecreatefrom'.$ext;
    	$img = $func($file_input);
    } else {
    	echo '������������ ������ �����';
		return;
    }
	if ($percent) {
		$w_o *= $w_i / 100;
		$h_o *= $h_i / 100;
	}
	if (!$h_o) $h_o = $w_o/($w_i/$h_i);
	if (!$w_o) $w_o = $h_o/($h_i/$w_i);
	$img_o = imagecreatetruecolor($w_o, $h_o);
	imagecopyresampled($img_o, $img, 0, 0, 0, 0, $w_o, $h_o, $w_i, $h_i);
	if ($type == 2) {
		return imagejpeg($img_o,$file_output,100);
	} else {
		$func = 'image'.$ext;
		return $func($img_o,$file_output);
	}
}

/**
 * �������� ����������� ��� ������ ������ � ����������� ������� ���������
 * 
 * @width  - ��������� ������
 * @height - ��������� ������
 */
function CreateImage($original, $result, $path, $width, $height){
                            
    list($w,$h) = getimagesize($original);
    $K = $h/$w;
    //$k = $height/$width; 
    $slesh ='';
    if(substr($original, 0, 3) == '../') $slesh = '../../';           
    if($K > ($height/$width)){       // H ������ ��� �����
        //$width = 140; //$height = $width*$K; 
        $h3 = floor((($width*$K) - $height)/2);
        $h4 = $h3;
        if((($width*$K) - $height)%2) $h4 = $h3+1; //����� ������� �� ��������, ������� ����� ������
        resize($original, $slesh.'uploads/temp/crop-'.$result, $width, ($width*$K));
        crop($slesh.'uploads/temp/crop-'.$result, $path.$result, array(0, $h3, $width, $width*$K-$h4));
    }
    elseif($K < ($height/$width)){   // W ������ ��� �����
        //$height  = 84; //$width = $h1/$K;
        $w3 = floor((($height/$K) - $width)/2);
        $w4 = $w3;
        if((($height/$K) - $width)%2) $w4 = $w3+1; //����� ������� �� ��������, ������� ����� ������
        resize($original, $slesh.'uploads/temp/crop-'.$result, ($height/$K), $height);
        crop($slesh.'uploads/temp/crop-'.$result, $path.$result, array($w3, 0, $height/$K-$w4, $height));
    }
    else{                           // ����
        resize($original, $path.$result, $width, $height);
    }
}
?>
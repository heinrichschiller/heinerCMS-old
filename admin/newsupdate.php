<?php

  /* Konfigurationsdateien laden */
  include('../inc/base.inc.php');
  include('../inc/adminfunctions.inc.php');
  include('../inc/login.inc.php');

	/* �berpr�fen ob Login erfolgt ist, ggf. Anmeldem�glichkeit bieten */
	if(is_logged_in())
	{
		$id = $_POST['id'];
		$title = $_POST['title'];
		$message = $_POST['message'];
		$visible = $_POST['visible'];
		
    include('../inc/database.inc.php');
    $connection = mysql_connect($db['host'],$db['uid'],$db['pwd']);
    if($connection)
    {
      mysql_select_db($db['db']);
      $sql = "UPDATE news SET title = '$title', message = '$message', visible = $visible WHERE id = $id";
      $result = mysql_query($sql);
			header('Location: index.php?cmd=news');
		}
	}

?>
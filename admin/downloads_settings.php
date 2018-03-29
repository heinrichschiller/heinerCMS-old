<?php

include __DIR__ . '/../cms-config.php';

include __DIR__ . '/../include/general_functions.inc.php';
include __DIR__ . '/../include/login.inc.php';

if (is_logged_in ()) {
    
    $pdo = getPdoDB();
    
    $tagline = filter_input(INPUT_POST, 'tagline');
    $comment = filter_input(INPUT_POST, 'comment');

    $sql = "UPDATE `downloads_settings` SET `tagline`= :tagline,`comment`= :comment WHERE 1";
    
    $input_parameters = [
        ':tagline' => $tagline,
        ':comment' => $comment
    ];
    
    try {
        
        $stmt = $pdo->prepare($sql);
        $stmt->execute($input_parameters);
        
    } catch (Exception $ex) {
        
        echo $ex->getMessage();
        exit();
        
    }
    
    header ( 'Location: index.php?uri=downloadssettings' );

}
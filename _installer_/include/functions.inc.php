<?php

session_start();

/**
 * Load a HTML-Template from templates-directory
 * 
 * @param string $template
 * @return string
 */
function loadTemplate(string $template): string
{
    $file = __DIR__ . '/../templates/' . $template . '.tpl.php';

    if (file_exists($file)) {
        return file_get_contents($file);
    }

}

/**
 * Load start-template
 * 
 * @return string
 */
function load_start()
{
    return loadTemplate('start');
}

/**
 * Load language-template
 * 
 * @return string
 */
function load_language()
{
    return loadTemplate('language');
}

/**
 * Load licence-template
 * 
 * @return string
 */
function load_licence()
{
    return loadTemplate('licence');
}

/**
 * Load conditions-template
 * 
 * @return string
 */
function load_conditions()
{
    $serverSoftware = $_SERVER['SERVER_SOFTWARE'];
    $infoList = explode(' ', $serverSoftware);
    
    $placeholderList = [
        '##placeholder_webserver##' => $infoList[0],
        '##placeholder_php_version##' => $infoList[3],
        '##placeholder_database##' => 'MySQL'
    ];
    
    $template = loadTemplate('conditions');
    
    return strtr($template, $placeholderList);
}

/**
 * Load database-template
 * 
 * @return string
 */
function load_database()
{
    return loadTemplate('database');
}

/**
 * Load user-template
 * 
 * @return string
 */
function load_user()
{
    return loadTemplate('user');
}

/**
 * Load installation-template
 * 
 * @return string
 */
function load_installation()
{
    $placeholderList = [
        '##placeholder_database_address##' => $_SESSION['address'],
        '##placeholder_database_user##' => $_SESSION['db_user'],
        '##placeholder_database_name##' => $_SESSION['database'],
        '##placeholder_database_password##' => $_SESSION['db_password']
    ];
    
    $template = loadTemplate('installation');
    
    return strtr($template, $placeholderList); 
}

/**
 * Load final-template
 * 
 * @return string
 */
function load_final()
{
    return loadTemplate('final');
}

/**
 * Create database
 * @param PDO $pdo
 * @param string $database
 * @return bool
 */
function createDatabase(PDO $pdo, string $database) : bool
{
    $sql = "CREATE DATABASE IF NOT EXISTS `$database` CHARSET=utf8 COLLATE=utf8_unicode_ci;";
    
    try {
        $pdo->exec($sql);
        return true;
    } catch(PDOException $ex) {
        return false;
    }
}

/**
 * Create table articles
 * 
 * @param PDO $pdo
 * @return bool
 */
function createTableArticles(PDO $pdo) : bool
{
    if(checkDatabase($pdo)) {
        $sql = "CREATE TABLE `articles` (
            `id` INT NOT NULL AUTO_INCREMENT,
        		`title` VARCHAR(64) NOT NULL DEFAULT '',
        		`content` LONGTEXT NOT NULL,
        		`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
        		`update_at` timestamp NULL DEFAULT NULL,
        		`nextPageId` INT NOT NULL DEFAULT '-1',
        		`visible` TINYINT(4) NOT NULL DEFAULT '0',
            `trash` ENUM('true','false') NOT NULL DEFAULT 'false',
        		PRIMARY KEY (`id`)
        		) CHARSET=utf8 COLLATE=utf8_unicode_ci;";
                
        try {
            $pdo->exec($sql);
            return true;
        } catch(PDOException $ex) {
            echo $ex->getMessage();
            exit();
        }
    }
    
    return false;
    
}

/**
 * Create table downloads
 * 
 * @param PDO $pdo
 * @return bool
 */
function createTableDownloads(PDO $pdo) : bool
{
    if(checkDatabase($pdo)) {
        $sql = "CREATE TABLE `downloads` (
        		`id` INT NOT NULL AUTO_INCREMENT,
        	    `title` VARCHAR(64) NOT NULL DEFAULT '',
        	    `comment` TEXT NOT NULL,
        		`path` VARCHAR(128) NOT NULL DEFAULT '',
        	    `filename` VARCHAR(64) NOT NULL DEFAULT '',
        	    `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
        		`update_at` timestamp NULL DEFAULT NULL,
        		`visible` TINYINT(4) NOT NULL DEFAULT '0',
            `trash` ENUM('true','false') NOT NULL DEFAULT 'false',
        		 PRIMARY KEY (`id`)
        		 ) CHARSET=utf8 COLLATE=utf8_unicode_ci;";
                
        try {
            $pdo->exec($sql);
            return true;
        } catch(PDOException $ex) {
            echo $ex->getMessage();
            exit();
        }
    }
    
    return false;
}

/**
 * Create table links
 * 
 * @param PDO $pdo
 * @return bool
 */
function createTableLinks(PDO $pdo) : bool
{
    if(checkDatabase($pdo)) {
        $sql = "CREATE TABLE `links` (
        		`id` INT NOT NULL AUTO_INCREMENT,
        		`title` VARCHAR(64) NOT NULL DEFAULT '',
        		`uri` VARCHAR(255) NOT NULL DEFAULT 'http://',
        		`comment` TEXT NOT NULL,
        		`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
        		`update_at` timestamp NULL DEFAULT NULL,
        		`visible` TINYINT(4) NOT NULL DEFAULT '0',
            `trash` ENUM('true','false') NOT NULL DEFAULT 'false',
        		PRIMARY KEY (`id`)
        		) CHARSET=utf8 COLLATE=utf8_unicode_ci;";
                
        try {
            $pdo->exec($sql);
            return true;
        } catch(PDOException $ex) {
            echo $ex->getMessage();
            exit();
        }
    }
    
    return false;
}

/**
 * Create table news
 * 
 * @param PDO $pdo
 * @return bool
 */
function createTableNews(PDO $pdo) : bool
{
    if(checkDatabase($pdo)) {
        $sql = "CREATE TABLE `news` (
        		`id` INT NOT NULL AUTO_INCREMENT,
        		`title` VARCHAR(64) NOT NULL DEFAULT '',
        		`message` TEXT NOT NULL,
        		`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
        		`update_at` timestamp NULL DEFAULT NULL,
        		`visible` TINYINT(4) NOT NULL DEFAULT '0',
            `trash` ENUM('true','false') NOT NULL DEFAULT 'false',
        		PRIMARY KEY (`id`)
        		) CHARSET=utf8 COLLATE=utf8_unicode_ci;";
                
        try {
            $pdo->exec($sql);
            return true;
        } catch(PDOException $ex) {
            return false;
        }
    }
    
    return false;
}

/**
 * Create table users
 * 
 * @param PDO $pdo
 * @return bool
 */
function createTableUsers(PDO $pdo) : bool
{
    if( checkDatabase($pdo) ) {
        $sql = "CREATE TABLE `users` (
        		`id` int unsigned NOT NULL AUTO_INCREMENT,
        		`firstname` varchar(255) NOT NULL,
        		`lastname` varchar(255) NOT NULL,
        		`email` varchar(255) NOT NULL,
        		`password` varchar(255) NOT NULL,
        		`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
        		`updated_at` timestamp NULL DEFAULT NULL,
        		`username` VARCHAR(64) NOT NULL,
        		`active` ENUM('true','false') NOT NULL DEFAULT 'false',
        		PRIMARY KEY (`id`),
        		UNIQUE (`username`),
        		UNIQUE (`email`)
        		) CHARSET=utf8 COLLATE=utf8_unicode_ci;";
                
        try {
            $pdo->exec($sql);
            return true;
        } catch(PDOException $ex) {
            echo $ex->getMessage();
            exit();
        }
    }
    
    return false;
    
}

/**
 * Create table sites
 * 
 * @param PDO $pdo
 * @return bool
 */
function createTableSites(PDO $pdo) : bool
{
    if ( checkDatabase($pdo) ) {
        
        $sql = "CREATE TABLE `sites` (
            `id` INT NOT NULL AUTO_INCREMENT,
            `title` VARCHAR(64) NOT NULL DEFAULT '',
            `tagline` VARCHAR(140) NOT NULL DEFAULT '',
            `content` LONGTEXT NOT NULL,
            `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            `update_at` timestamp NULL DEFAULT NULL,
            `visible` TINYINT(4) NOT NULL DEFAULT '0',
            `trash` ENUM('true','false') NOT NULL DEFAULT 'false',
            PRIMARY KEY (`id`)
            ) CHARSET=utf8 COLLATE=utf8_unicode_ci;";
            
        try {
            $pdo->exec($sql);
            return true;
        } catch(PDOException $ex) {
            echo $ex->getMessage();
            exit();
        }
    }
    
    return false;
}

/**
 * Create table settings
 * 
 * @param PDO $pdo
 * @return bool
 */
function createTableSettings(PDO $pdo) : bool
{
    if ( checkDatabase($pdo) ) {
        $sql = "CREATE TABLE `settings` (
           `title` VARCHAR(64) NOT NULL DEFAULT '',
           `tagline` VARCHAR(140) NOT NULL DEFAULT '',
           `theme` VARCHAR(64) NOT NULL DEFAULT '',
           `blog_url` VARCHAR(140) NOT NULL DEFAULT ''
           ) CHARSET=utf8 COLLATE=utf8_unicode_ci;";
            
        try {
            $pdo->exec($sql);
            return true;
        } catch(PDOException $ex) {
            echo $ex->getMessage();
            exit();
        }
    }
    
    return false;
}

/**
 * Write default configuration into database
 * 
 * @param PDO $pdo
 * @return bool
 */
function writeDefaultConfiguration(PDO $pdo) : bool
{
    if ( checkDatabase($pdo) ) {
        $sql = 'INSERT INTO `settings`(`title`, `tagline`, `theme`, `blog_url`)'
            . "VALUES ('heinerCMS','','default','')";
            
        try {
            $pdo->exec($sql);
            return true;
        } catch(PDOException $ex) {
            echo $ex->getMessage();
            exit();
        }
    }
    
    return false;
}

/**
 * Select database by name
 * 
 * @param unknown $pdo
 * @param unknown $database
 */
function selectDatabase($pdo, $database) {
    $sql = "USE `$database`";
    
    $pdo->exec($sql);
}

/**
 * Check for existed database
 * 
 * @param PDO $pdo
 * @return bool
 */
function checkDatabase(PDO $pdo) : bool
{
    $sql = "SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = '".DB_NAME."'";
    
    foreach ($pdo->query($sql) as $result) {
      return true;
    }
    
    return false;
}
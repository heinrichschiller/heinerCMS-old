<?php

/****************************************************************************************
 *
 * General functions for heinerCMS.
 *
 * This file contains:
 *
 * * Comment here
 * * Comment here
 *
 * @author: Heinrich Schiller
 * @date: 2017-06-09
 * @licence: MIT
 *
 ***************************************************************************************/

/**
 * 
 * 
 * @since 0.2.5
 */
function parseRequest()
{
    $path = trim(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH), '/');
    list($module, $action, $params) = explode('/', $path, 3);
    echo $module, $action, $params;
    // module? Einbinden eines bestimmten Moduls (eines unterprograms)
    // Module können sein Artikel, Links, Downloads, News, Pages
    // Module liegen in Ordner "modules", die individuell nachgeladen werden können.
    // Module sind von einander getrennt und beeinflussen sich selbst nicht.
    // Neue Module können in Module abgelegt werden, damit diese genutzt werden können.
    //require __DIR__ . '/modules/' . $module . '/' . $module . '.php';

    include __DIR__ . "/../modules/$module/$module.php";

    // action => function? Methoden/Funktionen eines Moduls
    if (isset($action)) {
        $actionFunction = sprintf("%sAction", strtolower($action));
        echo $actionFunction();
    }
    // parameter?
}

/**
 * Load a session for heinerCMS.
 * @deprecated
 */
function load_session()
{
    $settings = getGeneralSettings();
    
    $_SESSION['title']    = $settings['title'];
    $_SESSION['tagline']  = $settings['tagline'];
    $_SESSION['theme']    = $settings['theme'];
    $_SESSION['darkmode'] = $settings['darkmode'];
    $_SESSION['blog-url'] = $settings['blog_url'];
    $_SESSION['language'] = $settings['lang_short'];
    $_SESSION['footer']   = $settings['footer'];  
}

/**
 * Checks if a login has taken place.
 * 
 * @return boolean
 */
function is_logged_in() {

    $authenticated = isset($_SESSION['authenticated']) ? true : false;

    load_session();

    /* User angemeldet? */
    if ($authenticated) {
        return true;
    } else {

        $login = getTemplate('adm_login');
        $template = getTemplate('adm_login_template');

        $template = str_replace ( '##placeholder-title##', $_SESSION['title'], $template );
        $template = str_replace ( '##placeholder-form-signin##', $login, $template );

        echo stripslashes ( $template );

        return false;
    }
}

/**
 * 
 */
function destroySession()
{
    /* Wert setzen */
    $_SESSION ['authenticated'] = false;
    $_SESSION ['username'] = '';
    $_SESSION ['user_id'] = '';
    
    /* Session beenden */
    session_destroy ();
    
    /* Umleitung */
    header ( 'Location: index.php' );
}

/**
 * Get a XML-File for translations in heinerCMS.
 * 
 * @param string $language - Name of language
 * 
 * @return array
 */
function get_translation(string $language) : array
{
    $xmlfile = LOCALES_PATH . "$language.xml";

    $xmlString = file_get_contents($xmlfile);
    $xml = simplexml_load_string($xmlString);

    $arr_keys = [];
    $arr_values = [];

    foreach ($xml->children() as $second_gen) {
        foreach ($second_gen->children() as $third_gen) {
            array_push( $arr_keys, '{'.$third_gen->getName().'}');
            array_push( $arr_values, (string)$third_gen);
        }
    }

    return array_combine($arr_keys, $arr_values);
}

/**
 * Get an HTML template by name and outputs it.
 * 
 * @param string $template - Name of a html-template.
 * 
 * @return string html-template.
 */
function getTemplate(string $template): string
{
    $path = trim(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH), '/');
    $module = explode('/', $path);

    $file = __DIR__ . "/../modules/$module[0]/template/$template";

    if (file_exists($file)) {
        return file_get_contents($file);
    }

    return 'No template found.';
}

function getMasterTemplate(string $template): string
{
    $theme = isset($_SESSION['theme']) ? $_SESSION['theme'] : 'default';
    
    $file = __DIR__ . "/../templates/$theme/$template";
    
    if (file_exists($file)) {
        return file_get_contents($file);
    }
    
    //return 'No template found.';
}

function checkSystem()
{
    if (!defined('DB_DRIVER') && !defined('DB_NAME')) {
        return false;
    }

    return true;
}

function render(array $templates, array $data = [])
{
    $html = '';

    $html .= getMasterTemplate('header.phtml');

    foreach($templates as $key) {
        $html .= renderTemplate($key, $data);
    }
    
    $html .= getMasterTemplate('footer.phtml');

    return $html;
}

function renderTemplate(string $template, array $data)
{
    $path = trim(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH), '/');
    $module = explode('/', $path);
    
    $tmpltFile = __DIR__ . "/../modules/$module[0]/template/$template";

    extract($data);

    ob_start();

    include $tmpltFile;
    
    $htmlResponse = ob_get_contents();
    
    ob_end_clean();
    
    return $htmlResponse;
}



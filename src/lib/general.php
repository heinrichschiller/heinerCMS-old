<?php

/**
 * If you are reading this in your web browser, your server is probably
 * not configured correctly to run PHP applications!
 *
 * MIT License
 *
 * Copyright (c) 2017 - 2019 Heinrich Schiller
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/**
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
 */

function bootstrap()
{
    $requestItems = parseRequest();

    $controller = $requestItems['controller'];
    $action     = $requestItems['action'];
    $params     = $requestItems['params'];

    $modulesPath = CMS_SRC_PATH . "modules/$controller/index.php";

    if(file_exists($modulesPath)) {
        include_once $modulesPath;
    } else {
        error404();
    }

    if (isset($action)) {
        $action = sprintf("%sAction", strtolower($action));

        if(function_exists($action)) {
            echo $action($params);
        } else {
            error404();
        }
    }
}

/**
 *
 *
 * @since 0.9.0
 */
function parseRequest()
{
    $path = trim(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH), '/');
    $item = explode('/', $path, 3);

    $controller = !empty($item[0]) ? $item[0] : 'public';
    $action     = !empty($item[1]) ? $item[1] : 'index';
    $params     = !empty($item[2]) ? $item[2] : array();

    if(!empty($params)) {
        $params = explode('/', $params);
    }

    $requestItems = [
        'controller' => $controller,
        'action'     => $action,
        'params'     => $params
    ];

    return $requestItems;
}

function isPost()
{
    if(!empty($_POST)) {
        return true;
    }

    return false;
}

function isGet()
{
    if(count($_GET) > 0) {
        return true;
    }

    return false;
}

/**
 * Get a XML-File for translations in heinerCMS.
 *
 * @param string $language - Name of language
 *
 * @return array
 */
function getTranslation(string $language) : array
{
    $xmlfile = CMS_LOCALES_PATH . "$language.xml";

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
    $module = parseRequest();

    $file = CMS_MODULES_PATH . "$module[0]/template/$template";

    if (file_exists($file)) {
        return file_get_contents($file);
    }

    return 'No template found.';
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

    foreach($templates as $key) {
        $html .= renderTemplate($key, $data);
    }

    $settings = getGeneralSettings();
    $arr_language = getTranslation($settings['lang_short']);

    return strtr($html, $arr_language);
}

function renderTemplate(string $template, array $data)
{
    $module = parseRequest();

    $module = !empty($module['controller']) ? $module['controller'] : 'public';

    $tmpltFile = CMS_MODULES_PATH . "$module/template/$template";

    extract($data);

    ob_start();

    include CMS_SRC_PATH . 'template/main.phtml';

    //$htmlResponse = ob_get_contents();

    ob_end_clean();

    //return $htmlResponse;
}

function currentDatetime()
{
    return strftime('%d.%m.%Y %H:%M', time());
}

/**
 * Strip a HTML and PHP tags from a string and convert convert special characters
 * to HTML entities.
 *
 * @param string $data
 * @param string $encoding
 *
 * @return string - Clean string.
 *
 * @since 0.10.0
 */
function escapeString(string $data, string $encoding = 'UTF-8'): string
{
    return htmlspecialchars(strip_tag($data), ENT_QUOTES | ENT_HTML5, $encoding);
}

function error404()
{
    header('Content-Type:text/html;charset=utf-8');
    header('HTTP/1.0 404 Not Found');
}

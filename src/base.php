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

/*******************************************************************************
 * include files for heinerCMS
 *
 * The order of the included files is very important, as each included file
 * needs functions of the previously included file.
 ******************************************************************************/

if(!file_exists(ABS_PATH . 'src/configs/default.php')) {
    header('Location: /installer/index');
    exit;
} else {
    $cmsConfig = include ABS_PATH . 'src/configs/default.php';
}

require_once ABS_PATH . 'src/libs/filters.php';

require_once ABS_PATH . 'src/libs/validations.php';

require_once ABS_PATH . 'src/libs/session.php';

require_once ABS_PATH . 'src/libs/core.php';

if(isset($cmsConfig['driver'])) {
    include_once ABS_PATH . 'src/libs/' . $cmsConfig['driver'] . '-db.php';
} else {
    echo 'cms-config is empty';
    die();
}

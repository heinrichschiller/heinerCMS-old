<?php

/**
 * If you are reading this in your web browser, your server is probably
 * not configured correctly to run PHP applications!
 *
 * MIT License
 *
 * Copyright (c) 2017 - 2020 Heinrich Schiller
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

function indexAction(): string
{
    checkLogin();

    $userList = getUsers();

    $templateList = [
        'users.phtml'
    ];

    return render($templateList, array('users' => $userList));
}

function newAction()
{
    checkLogin();

    $templateList = [
        'user.phtml'
    ];

    return render($templateList);
}

function editAction(array $params): string
{
    checkLogin();

    $userList = getUser($params[1]);

    $templateList = [
        'user.phtml'
    ];

    return render($templateList, array('user' => $userList));
}

function addAction()
{
    checkLogin();

    $firstname = filter_input(INPUT_POST, 'firstname');
    $lastname  = filter_input(INPUT_POST, 'lastname');
    $username  = filter_input(INPUT_POST, 'username');
    $email     = filter_input(INPUT_POST, 'email');
    $password1 = filter_input(INPUT_POST, 'password1');
    $password2 = filter_input(INPUT_POST, 'password2');
    $active    = filter_input(INPUT_POST, 'active');

    if ( strcmp($password1, $password2) === 0) {
        $password = $password1;
    } else {
        // @todo replace this ...
        die("Fehler beim passwort festgestellt.");
    }

    $pwHash = password_hash($password, PASSWORD_DEFAULT);

    addUser($firstname, $lastname, $username, $email, $pwHash, $active);

    redirect('user/index');
}

function delAction(array $params)
{
    checkLogin();

    deleteUser($params[1]);

    redirect('user/index');
}

function loginAction()
{
    $configs = include ROOT_PATH . 'src/configs/developer.php';

    if(isPost()) {
        if(login($_POST['email'], $_POST['password'])) {
            header('Location: ' . $configs['baseUrl'] . 'admin/index');
        }
    }

    $templateList = [
        'login.phtml'
    ];

    return render($templateList);
}

function logoutAction()
{
    logout();
}

function goodbyeAction()
{
    return render(array('goodbye.phtml'));
}

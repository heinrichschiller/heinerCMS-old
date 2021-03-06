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

/**
 * Get a user list from users table.
 *
 * @return array - List of all users.
 */
function getUsers(): array
{
    $sql = '
    SELECT `id`,
        `firstname`,
        `lastname`,
        `username`,
        `active`
        FROM `users`
            ORDER BY `firstname` DESC
    ';

    $pdo = getPdoConnection();
    $result = [];

    try {
        $stmt = $pdo->prepare($sql);
        $stmt->execute();

        while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $result[] = $row;
        }

        return $result;
    } catch (PDOException $ex) {
        echo $ex->getMessage();
        exit();
    }
}

/**
 * Get an user entry from 'users' table by id.
 *
 * @param int $id - Id from an user entry.
 * @return array  - User list from an entry.
 *
 * @since 0.8.0
 */
function getUser(int $id) : array
{
    $sql = "
    SELECT `id`,
        `firstname`,
        `lastname`,
        `email`,
        `password`,
        strftime('%s', `created_at`) AS datetime,
        `username`,
        `active`
        FROM `users`
        WHERE `id` = :id
	";

    $pdo = getPdoConnection();

    try {
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':id', $id);
        $stmt->execute();

        return $stmt->fetch(PDO::FETCH_ASSOC);
    } catch (PDOException $ex) {
        echo $ex->getMessage();
        exit();
    }
}

/**
 * Get username from users-table by id
 *
 * @param int $id Id of an user
 *
 * @return string
 */
function getUsernameById(int $id)
{
    $pdo = getPdoConnection();

    $sql = '
    SELECT `username`
        FROM `users`
        WHERE `id` = :id
    ';

    try {
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':id', $id);
        $stmt->execute();

        return $stmt->fetchColumn();
    } catch (PDOException $ex) {
        echo $ex->getMessage();
        exit();
    }
}

/**
 * Delete an user from 'users' table by id.
 *
 * @param int $id - Id from an user entry.
 *
 * @since 0.9.0
 */
function deleteUser(int $id)
{
    $sql = '
    DELETE FROM `users`
        WHERE id = :id
    ';

    $pdo = getPdoConnection();

    try {
        $stmt = $pdo->prepare($sql);

        $stmt->bindParam(':id', $id);

        $stmt->execute();
    } catch (PDOException $ex) {
        echo $ex->getMessage();
        exit();
    }
}

function addUser(string $firstname,
    string $lastname,
    string $username,
    string $email,
    string $pwHash,
    string $active)
{
    $sql ='INSERT INTO `users`(
        `firstname`,
        `lastname`,
        `email`,
        `password`,
        `created_at`,
        `username`,
        `active`)
        VALUES (:firstname,
            :lastname,
            :email,
            :password,
            :created_at,
            :username,
            :active)
    ';
    $pdo = getPdoConnection();

    try {
        $stmt = $pdo->prepare($sql);

        $stmt->bindParam(':firstname', $firstname);
        $stmt->bindParam(':lastname', $lastname);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':password', $pwHash);
        $stmt->bindParam(':username', $username);
        $stmt->bindParam(':active', $active);

        if (DB_DRIVER == 'sqlite') {
            $stmt->bindParam(':created_at', $created_at);
        }

        $stmt->execute();
    } catch (PDOException $ex) {
        echo $ex->getMessage();
        exit();
    }
}

/**
 *
 * @param int $id
 * @param string $firstname
 * @param string $lastname
 * @param string $username
 * @param string $email
 * @param string $active
 */
function updateUser(int $id,
    string $firstname,
    string $lastname,
    string $username,
    string $email,
    string $active)
{
    $sql = '
    UPDATE `users` SET `firstname`= :firstname,
        `lastname`= :lastname,
        `email`= :email,
        `username`= :username,
        `active`= :active,
        WHERE `id` = :id
    ';

    $pdo = getPdoConnection();

    try {
        $stmt = $pdo->prepare($sql);

        $stmt->bindParam(':id', $id);
        $stmt->bindParam(':firstname', $firstname);
        $stmt->bindParam(':lastname', $lastname);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':username', $username);
        $stmt->bindParam(':active', $active);

        $stmt->execute();
    } catch (PDOException $ex) {
        echo $ex->getMessage();
        exit();
    }
}

function authUser(string $email, string $password)
{
    $userItems = getUserByEmail($email);

    if ($userItems !== false && password_verify($password, $userItems['password'])) {

        $sql = "
        SELECT `id`,
            `email`
            FROM `users`
            WHERE `email` = %s
                AND `password` = %s
        ";

        $pdo = getPdoConnection();

        $tmp = sprintf($sql, $pdo->quote($email), $pdo->quote($userItems['password']));
        $stmt = $pdo->query($tmp);

        $userItems = [];

        while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $user['email'] = $row['email'];
            $user['id'] = $row['id'];

            return $user;
        }

        return false;
    }
}

function getUserByEmail(string $email)
{
    $sql = "
    SELECT `id`,
        `email`,
        `username`,
        `password`
        FROM `users`
        WHERE email = :email
    ";

    $pdo = getPdoConnection();

    try {
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':email', $email);
        $stmt->execute();

        return $stmt->fetch(PDO::FETCH_ASSOC);
    } catch (PDOException $ex) {
        echo $ex->getMessage();
        exit();
    }

    return false;
}

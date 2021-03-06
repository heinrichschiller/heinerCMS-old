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

 function loadUserStatement()
 {
     $pdo = getPdoConnection();

     $sql = '
     SELECT `id`,
         `firstname`,
         `lastname`,
         `username`,
         `active`
         FROM `users`
             ORDER BY `firstname` DESC
     ';

     try {
         $stmt = $pdo->prepare($sql);
         $stmt->execute();

         return $stmt;
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
     $pdo = getPdoConnection();

     $sql = '
     SELECT `id`,
         `firstname`,
         `lastname`,
         `email`,
         `password`,
         UNIX_TIMESTAMP(`created_at`) AS datetime,
         `username`,
         `active`
         FROM `users`
         WHERE `id` = :id
     ';

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

function addUser(string $firstname,
    string $lastname,
    string $username,
    string $email,
    string $pwHash,
    string $active)
{
    $sql = "
    INSERT INTO `users`(
        `firstname`,
        `lastname`,
        `email`,
        `password`,
        `username`,
        `active`)
        VALUES (
            :firstname,
            :lastname,
            :email,
            :password,
            :username,
            :active)
    ";

    try {
        $stmt = $pdo->prepare($sql);

        $stmt->bindParam(':firstname', $firstname);
        $stmt->bindParam(':lastname', $lastname);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':password', $pwHash);
        $stmt->bindParam(':username', $username);
        $stmt->bindParam(':active', $active);

        $stmt->execute();
    } catch (PDOException $ex) {
        echo $ex->getMessage();
        exit();
    }
}

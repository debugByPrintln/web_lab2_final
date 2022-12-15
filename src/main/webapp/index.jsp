<%@ page import="com.example.lab2.Coordinates" %>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <title>Лаб2</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <link rel="stylesheet" type="text/css" href="style/style.css">
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js"></script>
</head>
<body>

<table>
    <caption>
        Мельников Никита Сергеевич   Группа: P33222   Вариант: 219592
    </caption>
    <tr>
        <td align="right" >
            <canvas id="canvasMath" height="240" width="240" style="border:2px solid black; background-color: white">
                <img src="style/img.png" id="math" alt=""/>
            </canvas>
        </td>
        <td align="left">
            <p>Разработать веб-приложение на базе сервлетов и JSP, определяющее попадание точки на координатной плоскости в заданную область.</p>
            <p>Приложение должно быть реализовано в соответствии с шаблоном MVC.</p>
        </td>
    </tr>
    <tr>
        <td colspan="2" class="head">
            Введите данные для определения попадания точки
        </td>
    </tr>
    <form name="Data" action="" method="post"  id="input-form">
        <td class="main">
            Enter X:
        </td>
        <td>
            <div><select name="X" id="X">
                <option value="-4" name="X">
                    -4
                </option>
                <option value="-3" name="X">
                    -3
                </option>
                <option value="-2" name="X">
                    -2
                </option>
                <option value="-1" name="X">
                    -1
                </option>
                <option value="0" name="X">
                    0
                </option>
                <option value="1" name="X">
                    1
                </option>
                <option value="2" name="X">
                    2
                </option>
                <option value="3" name="X">
                    3
                </option>
                <option value="4" name="X">
                    4
                </option>
            </select> </div>
        </td>
        <tr>
            <td class="main">
                Enter Y [-3;5]:
            </td>
            <td class="answer">
                <input name="Y" id="Y" type="text" class="number" data-min="-3" data-max="5" data-separator="." value="0">
            </td>
        </tr>
        <tr>
            <td class="main">
                Enter R :
            </td>
            <td>
                <button class="R" type="button" onclick="funk1()" value="1" name="R1" id="R1">1</button>
                <button class="R" type="button" onclick="funk2()" value="1.5" name="R2" id="R2">1.5</button>
                <button class="R" type="button" onclick="funk3()" value="2" name="R3" ID="R3">2</button>
                <button class="R" type="button" onclick="funk4()" value="2.5" name="R4" ID="R4">2.5</button>
                <button class="R" type="button" onclick="funk5()" value="3" name="R5" ID="R5">3</button>
            </td>
        </tr>
        <tr>
            <td>
                <input id="forreset" class="button-form" type="reset" value="Сбросить">
            </td>
            <td>
                <input name='form' id="forsubmit" class="button-form" type="button" value="Проверить" onclick="startPHP()">
            </td>
        </tr>

    </form>
</table>

<table class="answerTable">
        <tr>
            <th>
                X:
            </th>
            <th width="15%">
                Y:
            </th>
            <th width="15%">
                R:
            </th>
            <th width="20%">
                Отправка:
            </th>
            <th width="20%">
                Исполнение:
            </th>
            <th width="15%">
                Результат:
            </th>
        </tr>
    <tbody id="historyBrowser">

    </tbody>
</table>

<script src="script/main.js"></script>
</body>
</html>
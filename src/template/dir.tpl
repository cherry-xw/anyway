<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <style>
    a {
      display: block;
      font-size: 30px;
    }
  </style>
  <title>{{title}}</title>
</head>
<body>
  {{#each files}}
    <a href="{{../dir}}/{{file}}">[{{icon}}]{{file}}</a>
  {{/each}}
</body>
</html>
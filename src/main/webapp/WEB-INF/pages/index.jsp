<html>

<h2>Employers and departments</h2>
<br>
<head>
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/ext-js/resources/css/ext-all.css">

<script src="${pageContext.request.contextPath}/resources/ext-js/adapter/ext/ext-base.js"></script>
<script src="${pageContext.request.contextPath}/resources/ext-js/ext-all.js"></script>
<script src="${pageContext.request.contextPath}/resources/editable-grid.js"></script>

</head>

<body>

<div id="employers"></div>
<br>
<br>
<div id="departments"></div>

<script>

    var employerCreateURL = host+"/api/employer/create";
    var employerUpdateURL = host+"/api/employer/update";

    var departmentCreateURL = host+"/api/department/create";
    var departmentUpdateURL = host+"/api/department/update";

</script>

</body>

</html>

<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
<%
		Object o=request.getAttribute("loginError");
		String output=(o==null)?"":o.toString();
	%>
	<p align="center" style="background-color:yellow;color:red;font-style:italic;">
		<%=output%>
	</p>
	<form method="post" action="./LoginServelet"> 
		<table border="1" align="center" width="20">
			<tr>
				<th>Email</th>
				<td><input type="text" name="email"></td>
			</tr>
			<tr>
				<th>Pass</th>
				<td><input type="password" name="pass"></td>
			</tr>
			<tr>
				<th><input type="submit" name="submit" value="Login"></th>
				<td><input type="reset" name="reset" value="Clear"></td>
			</tr>
		</table>
	</form>
	<p align="center"><a href="./Register.html">SignUp</a></p>
</body>
</html>
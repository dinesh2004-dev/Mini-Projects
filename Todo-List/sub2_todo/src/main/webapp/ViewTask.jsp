<%@page import="beans.Task"%>
<%@page import="java.util.List"%>
<%@page import="dao.ToDoDAOImpl"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>All Tasks</title>
</head>
<body>
<!-- 
																Welcome Vaibhav Hamal, Logout
																	
						Task Name ____________
						Task Date ____________
						Task Status ___________
						Add Task		Clear
						
						
					TaskID	Task Name	Task Date	Task Status		Complete(link)
 -->
 <%
 	Object obj=session.getAttribute("regId");
 	int regId=((Integer)obj).intValue();
 	dao.TodoDao dao1=ToDoDAOImpl.getInstance();
 	String flname=dao1.getFnameLnameByRegId(regId);
 %>
<p align="right">
Welcome <%=flname%>, <a href="./LogoutServlet">Logout</a> 
</p>

<form method="post" action="./AddTaskServlet">
	<table align="center" border="1" width="20%">
		<tr>
			<th>Task Name</th>
			<td><input type="text" name="taskName"></td>
		</tr>
		<tr>
			<th>Task Date</th>
			<td><input type="date" name="taskDate" placeholder="dd-mm-yyyy"></td>
		</tr>
		<tr>
			<th>Task Status</th>
			<td>
				<select name="taskStatus" size="1">
					<option value="1">Not Yet Started</option>
					<option value="2">In Progress</option>
					<option value="3">Completed</option>
				</select>
			</td>
		</tr>
		<tr>
			<th><input type="submit" name="submit" value="Add Task"></th>
			<td><input type="reset" name="reset" value="Clear"></td>
		</tr>
	</table>
</form>

<hr/>

<%
	List<Task> tasks=dao1.findAllTasksByRegId(regId);
%>
<table align="center" width="50%" border="1">
	<tr>
		<th>TaskID</th>
		<th>TaskName</th>
		<th>TaskDate</th>
		<th>TaskStatus</th>
		<th></th>
	</tr>
	<%
		for(Task task:tasks) {
			int taskId=task.getTaskId();
			String taskName=task.getTaskName();
			String taskDate=task.getTaskDate();
			int taskStatus=task.getTaskStatus();
	%>
			<%
				if(taskStatus==3) {
			%>
				<tr style="text-decoration:line-through;">
					<td><%=taskId%></td>
					<td><%=taskName%></td>
					<td><%=taskDate%></td>
					<td><%=taskStatus%></td>
					<td>Completed</td>
				</tr>
			<%
				} else {
			%>
				<tr>
					<td><%=taskId%></td>
					<td><%=taskName%></td>
					<td><%=taskDate%></td>
					<td><%=taskStatus%></td>
					<td><a href="./MarkTaskCompletedServlet?regId=<%=regId%>&taskId=<%=taskId%>">Completed</a></td>
				</tr>				
			<%
				}
			%>
	<%
		}
	%>
</table>
</body>
</html>
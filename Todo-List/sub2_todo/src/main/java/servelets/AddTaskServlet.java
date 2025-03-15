package servelets;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import beans.Task;
import dao.ToDoDAOImpl;
import dao.TodoDao;

/**
 * Servlet implementation class AddTaskServlet
 */
@WebServlet("/AddTaskServlet")
public class AddTaskServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public AddTaskServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.setContentType("text/html");
		PrintWriter out=response.getWriter();
		HttpSession session=request.getSession();
		ServletContext context=getServletContext();
		
		String taskName=request.getParameter("taskName").trim();
		String taskDate=request.getParameter("taskDate").trim();
		int taskStatus=Integer.parseInt(request.getParameter("taskStatus").trim());
		
		int regId=((Integer)session.getAttribute("regId")).intValue();
		Task task=new Task(0,taskName,taskDate,taskStatus,regId);
		
		TodoDao dao=ToDoDAOImpl.getInstance();
		int taskId=dao.addTask(regId, task);
		
		if(taskId>0) {
			context.getRequestDispatcher("/ViewTask.jsp").forward(request,response);
		} else {
			out.println("TX Failed, Task Not Added");
		}
	}

}

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

import beans.Register;
import dao.ToDoDAOImpl;
import dao.TodoDao;

/**
 * Servlet implementation class RegisterServeLet
 */
@WebServlet("/RegisterServeLet")
public class RegisterServeLet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public RegisterServeLet() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		

		response.setContentType("text/html");
		PrintWriter out=response.getWriter();
		HttpSession session=request.getSession();
		ServletContext context=getServletContext();
		
		String fname=request.getParameter("fname").trim();
		String lname=request.getParameter("lname").trim();
		String email=request.getParameter("email").trim();
		String pass=request.getParameter("pass").trim();
		long mobile=Long.parseLong(request.getParameter("mobile").trim());
		String address=request.getParameter("address").trim();
		
		
		Register register=new Register(0,fname,lname,email,pass,mobile,address);
		
		TodoDao dao=ToDoDAOImpl.getInstance();
		int regId=dao.register(register);
		
		if(regId>0) {
			context.getRequestDispatcher("/Login.jsp").forward(request, response);
		} else {
			out.println("Registration Failed");
		}

	}

}

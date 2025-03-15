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

import dao.ToDoDAOImpl;
import dao.TodoDao;

/**
 * Servlet implementation class LoginServelet
 */
@WebServlet("/LoginServelet")
public class LoginServelet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public LoginServelet() {
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
		
		String email=request.getParameter("email").trim();
		String pass=request.getParameter("pass").trim();
		
		boolean isValid=true;
		
		if(email.length()==0 || pass.isEmpty()) {
			request.setAttribute("loginError", "Email/Pass is empty");
			isValid=false;
		} else {
			TodoDao dao=ToDoDAOImpl.getInstance();
			int regId=dao.login(email,pass);
			
			if(regId>0) {
				session.setAttribute("regId", regId);
				context.getRequestDispatcher("/ViewTask.jsp").forward(request, response);
				isValid=true; // no need
			} else {
				request.setAttribute("loginError", "Email/Pass is wrong");
				isValid=false;
			}
		}
		
		if(isValid==false) {
			context.getRequestDispatcher("/Login.jsp").forward(request, response);
		}
	}

}

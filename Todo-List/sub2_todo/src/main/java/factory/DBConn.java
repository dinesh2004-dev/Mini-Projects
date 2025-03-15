package factory;

import java.sql.Connection;

import java.sql.DriverManager;
import java.sql.SQLException;

public class DBConn {
	
	static Connection con = null;
	
	
		public static Connection getConn() {
			try {
				Class.forName("com.mysql.cj.jdbc.Driver");
	            System.out.println("Driver loaded successfully!");
	            
	            String url = "jdbc:mysql://localhost:3306/sub2";
	            String user = "root";
	            String password = "D1d2d@78";
	            
	             con = DriverManager.getConnection(url, user, password);
	            System.out.println("Database connected!");
			} catch (ClassNotFoundException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			return con;
		}

	}


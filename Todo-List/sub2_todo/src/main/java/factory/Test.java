package factory;

import java.sql.Connection;
import java.sql.DriverManager;

public class Test {

	public static void main(String[] args) {
		try {
            
            
            Connection conn = DBConn.getConn();
            System.out.println("Database connected!");
            
            conn.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
	}

}

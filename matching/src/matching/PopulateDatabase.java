/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package matching;

import java.sql.DriverManager;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.PriorityQueue;
import java.util.Random;
import static matching.Matching.getRows;

/**
 *
 * @author admin
 */
public class PopulateDatabase {

    public static void main(String[] argv) {

        // change this setting to your liking
        int ROWS_TO_GENERATE = 1000000;

        ArrayList<String> STOCKLIST = new ArrayList<String>(3);
        STOCKLIST.add("smu");
        STOCKLIST.add("ntu");
        STOCKLIST.add("nus");

        Connection connection = null;
        PreparedStatement preparedStatement = null;
        ResultSet resultSet = null;
        String stm = null;

        try {

            connection = DriverManager.getConnection("jdbc:postgresql://127.0.0.1:5432/stocks_exchange", "postgres", "");

            String insertBid = "INSERT INTO bids (id, stock, price, \"userId\", date, status, \"createdAt\", \"updatedAt\") values (?, ?, ?, ?, ?, ?, ?, ?);";
            String insertAsk = "INSERT INTO asks (id, stock, price, \"userId\", date, status, \"createdAt\", \"updatedAt\") values (?, ?, ?, ?, ?, ?, ?, ?);";

//            System.out.println("time " + timeNow);
            Random randomGenerator = new Random();

            for (int i = 0; i < ROWS_TO_GENERATE; i++) {

                // get the current time rounded to the nearest second
                Calendar cal = Calendar.getInstance();
                cal.set(Calendar.MILLISECOND, 0);
                Date now = cal.getTime();
                Timestamp timeNow = new Timestamp(now.getTime());

                int randStockIndex = randomGenerator.nextInt(STOCKLIST.size());
                String stock = STOCKLIST.get(randStockIndex);

                int randPrice = 10 + randomGenerator.nextInt(10);

                preparedStatement = connection.prepareStatement(insertBid);
                preparedStatement.setInt(1, i + 1);
                preparedStatement.setString(2, stock);
                preparedStatement.setInt(3, randPrice);
                preparedStatement.setString(4, "user" + (i + 1));
                preparedStatement.setTimestamp(5, timeNow);
                preparedStatement.setString(6, "not matched");
                preparedStatement.setTimestamp(7, timeNow);
                preparedStatement.setTimestamp(8, timeNow);
                preparedStatement.executeUpdate();
            }

            for (int i = 0; i < ROWS_TO_GENERATE; i++) {

                // get the current time rounded to the nearest second
                Calendar cal = Calendar.getInstance();
                cal.set(Calendar.MILLISECOND, 0);
                Date now = cal.getTime();
                Timestamp timeNow = new Timestamp(now.getTime());

                int randStockIndex = randomGenerator.nextInt(STOCKLIST.size());
                String stock = STOCKLIST.get(randStockIndex);

                int randPrice = 10 + randomGenerator.nextInt(10);

                preparedStatement = connection.prepareStatement(insertAsk);
                preparedStatement.setInt(1, i + 1);
                preparedStatement.setString(2, stock);
                preparedStatement.setInt(3, randPrice);
                preparedStatement.setString(4, "user" + (i + 1));
                preparedStatement.setTimestamp(5, timeNow);
                preparedStatement.setString(6, "not matched");
                preparedStatement.setTimestamp(7, timeNow);
                preparedStatement.setTimestamp(8, timeNow);
                preparedStatement.executeUpdate();
            }

        } catch (SQLException e) {

            System.out.println("Connection Failed! Check output console");
            e.printStackTrace();
            return;

        } finally {

            try {
                if (resultSet != null) {
                    resultSet.close();
                }
                if (preparedStatement != null) {
                    preparedStatement.close();
                }
                if (connection != null) {
                    connection.close();
                }

            } catch (SQLException ex) {
                System.out.println(ex.getMessage());
            }

        }

    }

}

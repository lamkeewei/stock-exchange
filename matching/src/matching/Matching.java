package matching;

import java.sql.DriverManager;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.Date;
import java.util.Calendar;
import java.sql.Timestamp;

import java.util.Comparator;
import java.util.PriorityQueue;
import java.util.ArrayList;
import java.util.Collections;

public class Matching {

    public static int getRows(ResultSet res) {
        int totalRows = 0;
        try {
            res.last();
            totalRows = res.getRow();
            res.beforeFirst();
        } catch (Exception ex) {
            System.out.println(ex);
            return 0;
        }
        return totalRows;
    }

    public static void main(String[] argv) {

//    System.out.println("-------- PostgreSQL "
//        + "JDBC Connection Testing ------------");
//
//    try {
//
//      Class.forName("org.postgresql.Driver");
//
//    } catch (ClassNotFoundException e) {
//
//      System.out.println("Where is your PostgreSQL JDBC Driver? "
//          + "Include in your library path!");
//      e.printStackTrace();
//      return;
//
//    }
//
//    System.out.println("PostgreSQL JDBC Driver Registered!");
        ArrayList<String> STOCKLIST = new ArrayList<String>(3);
        STOCKLIST.add("smu");
        STOCKLIST.add("ntu");
        STOCKLIST.add("nus");

        Connection connection = null;
        PreparedStatement preparedStatement = null;
        ResultSet resultSet = null;
        String stm = null;

        try {

            connection = DriverManager.getConnection(
                    "jdbc:postgresql://127.0.0.1:5432/stocks_exchange", "postgres",
                    "");

            connection.setAutoCommit(false);

            String updateBid = "UPDATE bids SET \"matchedAsk\"=?, \"updatedAt\"=?, status='matched' WHERE id=?;";
            String updateAsk = "UPDATE asks SET \"matchedBuy\"=?, \"updatedAt\"=?, status='matched' WHERE id=?;";
            String updateMatch = "INSERT INTO matches (bid_id, ask_id, date, price, stock) values(?,?,?,?,?);";

            // get the current time rounded to the nearest second
            Calendar cal = Calendar.getInstance();
            cal.set(Calendar.MILLISECOND, 0);
            Date now = cal.getTime();
            Timestamp timeNow = new Timestamp(now.getTime());
//            System.out.println("time " + timeNow);

            for (int i = 0; i < STOCKLIST.size(); i++) {

                String currentStock = STOCKLIST.get(i);

                // we want all the unmatched bids
                stm = "SELECT * FROM bids WHERE status='not matched' and date < ? and stock=?";
                preparedStatement = connection.prepareStatement(stm, ResultSet.TYPE_SCROLL_SENSITIVE, ResultSet.CONCUR_UPDATABLE);
                preparedStatement.setTimestamp(1, timeNow);
                preparedStatement.setString(2, currentStock);
                resultSet = preparedStatement.executeQuery();

                int numBidRecords = getRows(resultSet);
                if (numBidRecords == 0) {
                    continue;
                }

                ArrayList<Thing> bidsArray = new ArrayList<Thing>(numBidRecords);

                while (resultSet.next()) {

                    // create Bid
                    int id = resultSet.getInt("id");
                    String stock = resultSet.getString("stock");
                    int price = resultSet.getInt("price");
                    String userId = resultSet.getString("userid");
                    Date date = resultSet.getTimestamp("date");
                    String status = resultSet.getString("status");

                    bidsArray.add(new Bid(id, stock, price, userId, date, status));
                }

                // we want all the unmatched asks
                stm = "SELECT * FROM asks WHERE status='not matched' and date < ? and stock=?";
                preparedStatement = connection.prepareStatement(stm, ResultSet.TYPE_SCROLL_SENSITIVE, ResultSet.CONCUR_UPDATABLE);
                preparedStatement.setTimestamp(1, timeNow);
                preparedStatement.setString(2, currentStock);
                resultSet = preparedStatement.executeQuery();

                int numAskRecords = getRows(resultSet);
                if (numAskRecords == 0) {
                    continue;
                }
                ArrayList<Thing> allArray = new ArrayList<Thing>(numAskRecords + numBidRecords);

                while (resultSet.next()) {

                    // create Ask
                    int id = resultSet.getInt("id");
                    String stock = resultSet.getString("stock");
                    int price = resultSet.getInt("price");
                    String userId = resultSet.getString("userid");
                    Date date = resultSet.getTimestamp("date");
                    String status = resultSet.getString("status");

                    allArray.add(new Ask(id, stock, price, userId, date, status));
                }

                // combine the two arrays and sort it
                allArray.addAll(bidsArray);
                Collections.sort(allArray, new ThingComparator());

                // create priority queues for later
                Comparator<Bid> bidComparator = new BidComparator();
                PriorityQueue<Bid> bidsQueue = new PriorityQueue<Bid>(numBidRecords, bidComparator);

                Comparator<Ask> askComparator = new AskComparator();
                PriorityQueue<Ask> asksQueue = new PriorityQueue<Ask>(numAskRecords, askComparator);

                // check out what are the things
//                for (int j = 0; j < allArray.size(); j++) {
//                    System.out.println(allArray.get(j));
//                }

                // a list of matches 
                // ArrayList<Match> matches = new ArrayList<Match>(numBidRecords);

                // go through the bids
                for (int j = 0; j < allArray.size(); j++) {
                    Thing thing = allArray.get(j);

                    if (thing instanceof Bid) {
                        // its a bid
                        Bid bid = (Bid) thing;

                        // check for match in Ask queue
                        if (asksQueue.peek() == null || asksQueue.peek().getPrice() > bid.getPrice()) {
                            // none to match to; just queue it
                            bidsQueue.add(bid);
                        } else {
                            // its a match! transaction occurs at ask price
                            // remove matching ask from asks queue
                            Ask matchedAsk = asksQueue.poll();

                            // add to matches list
                            Match match = new Match(bid, matchedAsk, bid.getDate(), matchedAsk.getPrice());

                            preparedStatement = connection.prepareStatement(updateBid);
                            preparedStatement.setInt(1, match.getAskId());
                            preparedStatement.setTimestamp(2, (Timestamp) match.getDate());
                            preparedStatement.setInt(3, match.getBuyId());
                            preparedStatement.executeUpdate();

                            preparedStatement = connection.prepareStatement(updateAsk);
                            preparedStatement.setInt(1, match.getBuyId());
                            preparedStatement.setTimestamp(2, (Timestamp) match.getDate());
                            preparedStatement.setInt(3, match.getAskId());
                            preparedStatement.executeUpdate();

                            preparedStatement = connection.prepareStatement(updateMatch);
                            preparedStatement.setInt(1, match.getBuyId());
                            preparedStatement.setInt(2, match.getAskId());
                            preparedStatement.setTimestamp(3, (Timestamp) match.getDate());
                            preparedStatement.setInt(4, match.getPrice());
                            preparedStatement.setString(5, match.getStock());
                            preparedStatement.executeUpdate();

                            // only commit when all rows can be confirmed for the update 
                            connection.commit();
                        }

                    } else {
                        // its an ask
                        Ask ask = (Ask) allArray.get(j);

                        // check for match in bid queue
                        if (bidsQueue.peek() == null || bidsQueue.peek().getPrice() < ask.getPrice()) {
                            // none to match to; just queue it
                            asksQueue.add(ask);
                        } else {
                            // its a match! transaction occurs at bid price
                            // remove matching bid from bids queue
                            Bid matchedBid = bidsQueue.poll();

                            // add to matches list
                            Match match = new Match(matchedBid, ask, ask.getDate(), matchedBid.getPrice());

                            preparedStatement = connection.prepareStatement(updateBid);
                            preparedStatement.setInt(1, match.getAskId());
                            preparedStatement.setTimestamp(2, (Timestamp) match.getDate());
                            preparedStatement.setInt(3, match.getBuyId());
                            preparedStatement.executeUpdate();

                            preparedStatement = connection.prepareStatement(updateAsk);
                            preparedStatement.setInt(1, match.getBuyId());
                            preparedStatement.setTimestamp(2, (Timestamp) match.getDate());
                            preparedStatement.setInt(3, match.getAskId());
                            preparedStatement.executeUpdate();

                            preparedStatement = connection.prepareStatement(updateMatch);
                            preparedStatement.setInt(1, match.getBuyId());
                            preparedStatement.setInt(2, match.getAskId());
                            preparedStatement.setTimestamp(3, (Timestamp) match.getDate());
                            preparedStatement.setInt(4, match.getPrice());
                            preparedStatement.setString(5, match.getStock());
                            preparedStatement.executeUpdate();

                            // only commit when all rows can be confirmed for the update 
                            connection.commit();
                        }

                    }
                }

//                // check out what are the matches
//                for (int j = 0; j < matches.size(); j++) {
//                    System.out.println(matches.get(j));
//                }

                // now that matches are determined, insert into matches table and update bids and asks table
                // performUpdates(matches);
            }

        } catch (SQLException e) {

            if (connection != null) {
                try {
                    connection.rollback();
                } catch (SQLException e1) {
                    System.out.println("Failed to rollback");
                }
            }

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

    public static void performUpdates(ArrayList<Match> matches) {
        Connection connection = null;
        PreparedStatement preparedStatement = null;
        ResultSet resultSet = null;

        try {

            connection = DriverManager.getConnection(
                    "jdbc:postgresql://127.0.0.1:5432/stocks_exchange", "postgres",
                    "");

            connection.setAutoCommit(false);

            String updateBid = "UPDATE bids SET \"matchedAsk\"=?, \"updatedAt\"=?, status='matched' WHERE id=?;";
            String updateAsk = "UPDATE asks SET \"matchedBuy\"=?, \"updatedAt\"=?, status='matched' WHERE id=?;";
            String updateMatch = "INSERT INTO matches (bid_id, ask_id, date, price, stock) values(?,?,?,?,?);";

            for (int i = 0; i < matches.size(); i++) {
                Match match = matches.get(i);

                preparedStatement = connection.prepareStatement(updateBid);
                preparedStatement.setInt(1, match.getAskId());
                preparedStatement.setTimestamp(2, (Timestamp) match.getDate());
                preparedStatement.setInt(3, match.getBuyId());
                preparedStatement.executeUpdate();

                preparedStatement = connection.prepareStatement(updateAsk);
                preparedStatement.setInt(1, match.getBuyId());
                preparedStatement.setTimestamp(2, (Timestamp) match.getDate());
                preparedStatement.setInt(3, match.getAskId());
                preparedStatement.executeUpdate();

                preparedStatement = connection.prepareStatement(updateMatch);
                preparedStatement.setInt(1, match.getBuyId());
                preparedStatement.setInt(2, match.getAskId());
                preparedStatement.setTimestamp(3, (Timestamp) match.getDate());
                preparedStatement.setInt(4, match.getPrice());
                preparedStatement.setString(5, match.getStock());
                preparedStatement.executeUpdate();

                // only commit when all rows can be confirmed for the update 
                connection.commit();

            }

        } catch (SQLException e) {

            if (connection != null) {
                try {
                    connection.rollback();
                } catch (SQLException e1) {
                    System.out.println("Failed to rollback");
                }
            }

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

        // if (connection != null) {
        //   System.out.println("You made it, take control your database now!");
        // } else {
        //   System.out.println("Failed to make connection!");
        // }
    }

}

//javac -d classes src/*.java && java -cp classes/.:classes/matching/postgresql-9.3-1102.jdbc41.jar matching.Match
// statement = connection.createStatement();
// resultSet = statement.executeQuery("SELECT * FROM asks;");

package matching;

import java.util.Date;

// represents an Ask (in a sell order)
public class Ask implements Thing {
    static final String MATCHED = "matched";
    static final String NOT_MATCHED = "not matched";

    private int id;
    private String stock;
    private int price; // ask price
    private String userId; // user who made this sell order
    private Date date;
    private String status;
    private int matchedBid;

    // constructor

    public Ask(int id, String stock, int price, String userId, Date date, String status) {
        this.id = id;
        this.stock = stock;
        this.price = price;
        this.userId = userId;
        this.date = date;
        this.status = status;
    }

    public Ask(String stock, int price, String userId) {
        this.stock = stock;
        this.price = price;
        this.userId = userId;
        this.date = new Date();
        this.status = Ask.NOT_MATCHED;
    }

    // getters
    public String getStock() {
        return stock;
    }

    public int getPrice() {
        return price;
    }

    public String getUserId() {
        return userId;
    }

    public Date getDate() {
        return date;
    }

    public int getId() {
        return id;
    }

    public String getStatus() {
        return status;
    }

    // setters
    public void setMatchedBid(int bidId) {
        matchedBid = bidId;
    }

    // toString
    public String toString() {
        return "id: "  + id + ", stock: " + stock + ", price: " + price + ", userId: " + userId + ", date: " + date + ", status: " + status;
    }
}

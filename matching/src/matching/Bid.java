package matching;

import java.util.Date;

// represents a bid (in a buy order)
public class Bid implements Thing {
    static final String MATCHED = "matched";
    static final String NOT_MATCHED = "not matched";

    private int id;
    private String stock;
    private int price; // bid price
    private String userId; // user who made this buy order
    private Date date;
    private String status;
    private int matchedAsk;

    // constructor
    public Bid(String stock, int price, String userId) {
        this.stock = stock;
        this.price = price;
        this.userId = userId;
        this.date = new Date();
        this.status = Bid.NOT_MATCHED;
    }

    public Bid(int id, String stock, int price, String userId, Date date, String status) {
        this.id = id;
        this.stock = stock;
        this.price = price;
        this.userId = userId;
        this.date = date;
        this.status = status;
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
    public void setMatchedAsk(int askId) {
        matchedAsk = askId;
    }

    // toString
    public String toString() {
        return "id: " + id +  ", stock: " + stock + ", price: " + price + ", userId: " + userId + ", date: " + date + ", status: " + status;
    }
}

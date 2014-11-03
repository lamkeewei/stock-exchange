package matching;

import java.util.Comparator;

public class ThingComparator implements Comparator<Thing> {

    public int compare(Thing x, Thing y) {

        if (x.getDate().before(y.getDate())) {
            return -1;
        }

        if (y.getDate().before(x.getDate())) {
            return 1;
        }

        return 0;

    }

}
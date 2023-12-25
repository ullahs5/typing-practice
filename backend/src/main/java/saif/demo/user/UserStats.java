package saif.demo.user;

public class UserStats {
    private int averageWPM;
    private int maxWPM;
    private int averageAccuracy;


    UserStats(){

    }

    UserStats(int averageWPM, int maxWPM, int averageAccuracy){
        this.averageWPM = averageWPM;
        this.maxWPM = maxWPM;
        this.averageAccuracy = averageAccuracy;
    }

    public void setAverageWPM(int averageWPM) {
        this.averageWPM = averageWPM;
    }

    public void setMaxWPM(int maxWPM) {
        this.maxWPM = maxWPM;
    }

    public void setAverageAccuracy(int averageAccuracy) {
        this.averageAccuracy = averageAccuracy;
    }

    public int getAverageWPM() {
        return averageWPM;
    }

    public int getMaxWPM() {
        return maxWPM;
    }

    public int getAverageAccuracy() {
        return averageAccuracy;
    }
}

package org.techhub.util;

public class ScoreUtil {

    private ScoreUtil() {

    }

    public static double calculatePercentage(
            int obtainedMarks,
            int totalMarks) {

        if (totalMarks == 0) {
            return 0;
        }

        return ((double) obtainedMarks / totalMarks) * 100;
    }

}
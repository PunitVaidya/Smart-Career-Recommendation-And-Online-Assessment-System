package org.techhub.repository;

import java.util.List;

import org.techhub.dto.response.DashboardResponse;
import org.techhub.dto.response.RecentStudentResponse;

public interface DashboardRepository {

    DashboardResponse getDashboardStatistics();

    List<RecentStudentResponse> getRecentStudents();

}
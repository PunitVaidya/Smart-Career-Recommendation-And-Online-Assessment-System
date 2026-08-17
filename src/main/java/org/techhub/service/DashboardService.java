package org.techhub.service;

import java.util.List;

import org.techhub.dto.response.DashboardResponse;
import org.techhub.dto.response.RecentStudentResponse;

public interface DashboardService {

    DashboardResponse getDashboardStatistics();

    List<RecentStudentResponse> getRecentStudents();

}
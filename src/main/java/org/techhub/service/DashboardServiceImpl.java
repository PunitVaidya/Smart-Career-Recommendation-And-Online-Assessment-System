package org.techhub.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.techhub.dto.response.DashboardResponse;
import org.techhub.dto.response.RecentStudentResponse;
import org.techhub.repository.DashboardRepository;


@Service
public class DashboardServiceImpl implements DashboardService {

    @Autowired
    private DashboardRepository dashboardRepository;

    @Override
    public DashboardResponse getDashboardStatistics() {

        return dashboardRepository.getDashboardStatistics();

    }

    @Override
    public List<RecentStudentResponse> getRecentStudents() {

        return dashboardRepository.getRecentStudents();

    }

}
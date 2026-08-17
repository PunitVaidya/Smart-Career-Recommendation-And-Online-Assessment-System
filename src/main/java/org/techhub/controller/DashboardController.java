package org.techhub.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.techhub.dto.response.AdminDashboardResponse;
import org.techhub.dto.response.ApiResponse;
import org.techhub.service.AdminDashboardService;



@RestController
@RequestMapping("/api/admin")
public class DashboardController {



    @Autowired
    private AdminDashboardService dashboardService;




    @GetMapping("/dashboard")
    public ResponseEntity<ApiResponse<AdminDashboardResponse>> 
    getDashboardStatistics(){



        return ResponseEntity.ok(

                new ApiResponse<>(

                        true,

                        "Dashboard Loaded",

                        dashboardService.getDashboardData()

                )

        );


    }


}
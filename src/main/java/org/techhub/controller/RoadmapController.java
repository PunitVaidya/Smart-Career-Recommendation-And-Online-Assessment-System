package org.techhub.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

import org.techhub.constants.MessageConstants;
import org.techhub.dto.request.RoadmapRequest;
import org.techhub.dto.response.ApiResponse;
import org.techhub.dto.response.RoadmapResponse;
import org.techhub.service.RoadmapService;

@RestController
@RequestMapping("/api/roadmap")
public class RoadmapController {

	@Autowired
	private RoadmapService service;

	@PostMapping("/save")
	public ResponseEntity<ApiResponse<RoadmapResponse>> save(
			@Valid @RequestBody RoadmapRequest request) {

		return ResponseEntity.ok(
				new ApiResponse<>(true,
						MessageConstants.ROADMAP_ADDED,
						service.save(request)));
	}

	@PutMapping("/update")
	public ResponseEntity<ApiResponse<RoadmapResponse>> update(
			@Valid @RequestBody RoadmapRequest request) {

		return ResponseEntity.ok(
				new ApiResponse<>(true,
						MessageConstants.ROADMAP_UPDATED,
						service.update(request)));
	}

	@GetMapping("/{roadmapId}")
	public ResponseEntity<ApiResponse<RoadmapResponse>> getById(
			@PathVariable Integer roadmapId) {

		return ResponseEntity.ok(
				new ApiResponse<>(true,
						MessageConstants.ROADMAP_FETCH_SUCCESS,
						service.getById(roadmapId)));
	}

	@GetMapping("/all")
	public ResponseEntity<ApiResponse<List<RoadmapResponse>>> getAll() {

		return ResponseEntity.ok(
				new ApiResponse<>(true,
						MessageConstants.ROADMAP_LIST_SUCCESS,
						service.getAll()));
	}

	@GetMapping("/career/{careerId}")
	public ResponseEntity<ApiResponse<List<RoadmapResponse>>> getByCareer(
			@PathVariable Integer careerId) {

		return ResponseEntity.ok(
				new ApiResponse<>(true,
						MessageConstants.ROADMAP_LIST_SUCCESS,
						service.getByCareer(careerId)));
	}

	@GetMapping("/active")
	public ResponseEntity<ApiResponse<List<RoadmapResponse>>> getActive() {

		return ResponseEntity.ok(
				new ApiResponse<>(true,
						MessageConstants.ROADMAP_LIST_SUCCESS,
						service.getActiveRoadmaps()));
	}

	@DeleteMapping("/{roadmapId}")
	public ResponseEntity<ApiResponse<String>> delete(
			@PathVariable Integer roadmapId) {

		service.delete(roadmapId);

		return ResponseEntity.ok(
				new ApiResponse<>(true,
						MessageConstants.ROADMAP_DELETED,
						null));
	}
}
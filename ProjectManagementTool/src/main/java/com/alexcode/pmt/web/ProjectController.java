package com.alexcode.pmt.web;

import com.alexcode.pmt.domain.Project;
import com.alexcode.pmt.services.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/project")
public class ProjectController {

    private ProjectService projectService;

    @Autowired
    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @PostMapping("")
    public ResponseEntity<?> createNewProject(@Valid @RequestBody Project project, BindingResult result) {

        if (result.hasErrors()) {
            return new ResponseEntity<String>("Invalid Project Object", HttpStatus.BAD_REQUEST);
        }

        this.projectService.saveOrUpdateProject(project);
        return new ResponseEntity<Project>(project, HttpStatus.CREATED);
    }
}

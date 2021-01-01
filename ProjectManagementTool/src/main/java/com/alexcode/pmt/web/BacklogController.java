package com.alexcode.pmt.web;

import com.alexcode.pmt.domain.ProjectTask;
import com.alexcode.pmt.services.MapValidationErrorService;
import com.alexcode.pmt.services.ProjectTaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/backlog")
@CrossOrigin
public class BacklogController {

    private ProjectTaskService projectTaskService;
    private MapValidationErrorService mapValidationErrorService;

    @Autowired
    public BacklogController(ProjectTaskService projectTaskService, MapValidationErrorService mapValidationErrorService) {
        this.projectTaskService = projectTaskService;
        this.mapValidationErrorService = mapValidationErrorService;
    }

    @PostMapping("/{backlog_id}")
    public ResponseEntity<?> addPTtoBacklog(@Valid @RequestBody ProjectTask projectTask, BindingResult result, @PathVariable String backlog_id) {

        ResponseEntity<?> errorMap = mapValidationErrorService.mapValidationService(result);

        if (errorMap != null) return errorMap;

       ProjectTask projectTask1 = projectTaskService.addProjectTask(backlog_id, projectTask);

        return new ResponseEntity<ProjectTask>(projectTask1, HttpStatus.CREATED);
    }
}

package com.pocketwallet.controller;

import com.pocketwallet.dto.ExpenseRequest;
import com.pocketwallet.dto.ExpenseResponse;
import com.pocketwallet.service.ExpenseService;
import jakarta.validation.Valid;
import java.net.URI;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/expenses")
@RequiredArgsConstructor
public class ExpenseController {

  private final ExpenseService expenseService;

  @GetMapping
  public List<ExpenseResponse> list() {
    return expenseService.findAll();
  }

  @PostMapping
  public ResponseEntity<ExpenseResponse> create(@Valid @RequestBody ExpenseRequest request) {
    ExpenseResponse created = expenseService.create(request);
    URI location = URI.create("/api/expenses/" + created.getId());
    return ResponseEntity.created(location).body(created);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> delete(@PathVariable Long id) {
    expenseService.delete(id);
    return ResponseEntity.noContent().build();
  }
}

package com.pocketwallet.service;

import com.pocketwallet.dto.ExpenseRequest;
import com.pocketwallet.dto.ExpenseResponse;
import com.pocketwallet.entity.Expense;
import com.pocketwallet.exception.ResourceNotFoundException;
import com.pocketwallet.repository.ExpenseRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ExpenseService {

  private final ExpenseRepository expenseRepository;

  @Transactional(readOnly = true)
  public List<ExpenseResponse> findAll() {
    Sort sort = Sort.by(Sort.Order.desc("date"), Sort.Order.desc("id"));
    return expenseRepository.findAll(sort).stream().map(this::toResponse).toList();
  }

  @Transactional
  public ExpenseResponse create(ExpenseRequest request) {
    Expense expense = Expense.builder()
        .title(request.getTitle().trim())
        .amount(request.getAmount())
        .category(request.getCategory().trim())
        .date(request.getDate())
        .note(blankToNull(request.getNote()))
        .build();
    return toResponse(expenseRepository.save(expense));
  }

  @Transactional
  public void delete(Long id) {
    if (!expenseRepository.existsById(id)) {
      throw new ResourceNotFoundException(id);
    }
    expenseRepository.deleteById(id);
  }

  private ExpenseResponse toResponse(Expense expense) {
    return ExpenseResponse.builder()
        .id(expense.getId())
        .title(expense.getTitle())
        .amount(expense.getAmount())
        .category(expense.getCategory())
        .date(expense.getDate())
        .note(expense.getNote())
        .createdAt(expense.getCreatedAt())
        .build();
  }

  private String blankToNull(String value) {
    if (value == null) {
      return null;
    }
    String trimmed = value.trim();
    return trimmed.isEmpty() ? null : trimmed;
  }
}

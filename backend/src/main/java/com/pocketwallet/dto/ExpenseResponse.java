package com.pocketwallet.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ExpenseResponse {

  private Long id;
  private String title;
  private BigDecimal amount;
  private String category;
  private LocalDate date;
  private String note;
  private LocalDateTime createdAt;
}

package com.pocketwallet.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.math.BigDecimal;
import java.time.LocalDate;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ExpenseRequest {

  @NotBlank(message = "標題不可空白")
  @Size(max = 100, message = "標題最多 100 字")
  private String title;

  @NotNull(message = "金額不可空白")
  @DecimalMin(value = "0.01", message = "金額必須大於 0")
  @Digits(integer = 10, fraction = 2, message = "金額最多到小數第 2 位")
  private BigDecimal amount;

  @NotBlank(message = "分類不可空白")
  @Size(max = 50, message = "分類最多 50 字")
  private String category;

  @NotNull(message = "日期不可空白")
  private LocalDate date;

  @Size(max = 500, message = "備註最多 500 字")
  private String note;
}

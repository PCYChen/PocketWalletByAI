package com.pocketwallet.controller;

import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.pocketwallet.dto.ExpenseResponse;
import com.pocketwallet.exception.ResourceNotFoundException;
import com.pocketwallet.service.ExpenseService;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(ExpenseController.class)
class ExpenseControllerTest {

  @Autowired
  private MockMvc mockMvc;

  @MockitoBean
  private ExpenseService expenseService;

  @Test
  void listReturnsExpenses() throws Exception {
    ExpenseResponse item = ExpenseResponse.builder()
        .id(1L)
        .title("午餐")
        .amount(new BigDecimal("120.00"))
        .category("飲食")
        .date(LocalDate.of(2026, 11, 11))
        .note("牛肉麵")
        .createdAt(LocalDateTime.of(2026, 11, 11, 12, 0))
        .build();
    when(expenseService.findAll()).thenReturn(List.of(item));

    mockMvc.perform(get("/api/expenses"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$[0].title").value("午餐"))
        .andExpect(jsonPath("$[0].category").value("飲食"));
  }

  @Test
  void createRejectsBlankTitle() throws Exception {
    mockMvc.perform(post("/api/expenses")
            .contentType(MediaType.APPLICATION_JSON)
            .content("""
                {"title":"  ","amount":10,"category":"飲食","date":"2026-11-11"}
                """))
        .andExpect(status().isBadRequest())
        .andExpect(jsonPath("$.errors.title").value("標題不可空白"));
  }

  @Test
  void deleteMissingReturns404() throws Exception {
    doThrow(new ResourceNotFoundException(9L)).when(expenseService).delete(9L);

    mockMvc.perform(delete("/api/expenses/9"))
        .andExpect(status().isNotFound())
        .andExpect(jsonPath("$.message").value("找不到記帳紀錄：9"));
  }
}

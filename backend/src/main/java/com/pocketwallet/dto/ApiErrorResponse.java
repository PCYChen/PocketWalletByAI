package com.pocketwallet.dto;

import java.util.Map;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ApiErrorResponse {

  private String message;
  private Map<String, String> errors;
}

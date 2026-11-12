package com.pocketwallet.exception;

public class ResourceNotFoundException extends RuntimeException {

  public ResourceNotFoundException(Long id) {
    super("找不到記帳紀錄：" + id);
  }
}

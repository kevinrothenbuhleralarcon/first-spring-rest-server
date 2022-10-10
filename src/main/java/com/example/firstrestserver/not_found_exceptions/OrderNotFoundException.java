package com.example.firstrestserver.not_found_exceptions;

public class OrderNotFoundException extends RuntimeException{
    public OrderNotFoundException(Long id) {
        super("Could not find order " + id);
    }
}

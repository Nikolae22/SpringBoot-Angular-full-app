package com.backend.service;

import com.backend.domain.UserEvent;
import com.backend.enumeration.EventType;

import java.util.Collection;

public interface EventService {

    Collection<UserEvent> getEventsbyUserId(Long userId);
    void addUserEvent(String email, EventType eventType, String device, String ipAddress);
    void addUserEvent(Long userId,EventType eventType,String device,String ipAddress);

}

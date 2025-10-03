package com.backend.service.impl;

import com.backend.domain.UserEvent;
import com.backend.enumeration.EventType;
import com.backend.repository.EventRepository;
import com.backend.service.EventService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collection;

@Service
@RequiredArgsConstructor
public class EventServiceImpl implements EventService {

    private final EventRepository eventRepository;


    @Override
    public Collection<UserEvent> getEventsbyUserId(Long userId) {
        return eventRepository.getEventsByUserId(userId);
    }

    @Override
    public void addUserEvent(String email, EventType eventType, String device, String ipAddress) {
        eventRepository.addUserEvent(email,eventType,device,ipAddress);
    }

    @Override
    public void addUserEvent(Long userId, EventType eventType, String device, String ipAddress) {

    }
}

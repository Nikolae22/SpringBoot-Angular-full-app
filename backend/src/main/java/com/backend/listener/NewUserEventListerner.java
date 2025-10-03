package com.backend.listener;

import com.backend.event.NewUserEvent;
import com.backend.service.EventService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import static com.backend.utils.RequestUtils.getDevice;
import static com.backend.utils.RequestUtils.getIpAddress;


@Component
@RequiredArgsConstructor
@Slf4j
public class NewUserEventListerner {

    private final EventService eventService;
    private final HttpServletRequest request;

    @EventListener
    public void  onNewUserEvent(NewUserEvent event){
        log.info("New user event is fired");
        eventService.addUserEvent(event.getEmail(),event.getType(),getDevice(request),getIpAddress(request));
    }
}

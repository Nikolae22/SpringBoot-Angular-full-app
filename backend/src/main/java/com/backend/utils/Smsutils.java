package com.backend.utils;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;

public class Smsutils {

    public static final String FROM_NUMBER = "3333333333";

    public static final String SID_KEY = "DLKSJFSL32LSKAD";
    public static final String TOKEN_KEY = "";

    public static void sendSMS(String to, String messageBody) {
        Twilio.init(SID_KEY, TOKEN_KEY);
        Message message = Message.creator(new PhoneNumber("+39" + to), new PhoneNumber(FROM_NUMBER), messageBody).create();
        System.out.println(message);
    }
}

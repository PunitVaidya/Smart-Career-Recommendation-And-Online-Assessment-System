package org.techhub.logger;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public final class ApplicationLogger {

    private ApplicationLogger() {

    }

    public static Logger getLogger(Class<?> clazz) {

        return LoggerFactory.getLogger(clazz);

    }

}
package org.umich.mott.peds.innovation.handoff;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Annotation to indicate that this type is a mappable action
 * 
 * @author Kyle D. Kavanagh
 * @date Feb 17, 2014
 * 
 */
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface ActionMapping {
  RequestMethod method();

  String path();
}

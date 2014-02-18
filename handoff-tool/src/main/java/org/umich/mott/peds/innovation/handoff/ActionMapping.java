package org.umich.mott.peds.innovation.handoff;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * 
 * @author Kyle D. Kavanagh
 * @date Feb 17, 2014
 * 
 */
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
public @interface ActionMapping {
	String method();

	String path();
}

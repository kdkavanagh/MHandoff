package org.umich.mott.peds.innovation.handoff.patient;

import javax.json.Json;
import javax.json.JsonObjectBuilder;

import org.apache.log4j.Logger;
import org.umich.mott.peds.innovation.handoff.ActionContext;
import org.umich.mott.peds.innovation.handoff.ActionMapping;
import org.umich.mott.peds.innovation.handoff.CRUDAction;
import org.umich.mott.peds.innovation.handoff.common.BaseNote;

/**
 * Create an item in the patient's record
 * 
 * @author Kyle D. Kavanagh
 * @date Feb 18, 2014
 * 
 * @request.param patient - the patient to create this item for
 * @request.param type - the type of note to create, note or task
 * 
 * 
 */
@ActionMapping(path = "patient/note.do")
public class NoteAction extends CRUDAction {

  private static final Logger logger = Logger.getLogger(NoteAction.class);

  @Override
  public String create(ActionContext context) throws Exception {
    logger.info("Creating new note");
    String id = persistenceService.writeNote(new BaseNote(context), false);
    JsonObjectBuilder resp = Json.createObjectBuilder();
    resp.add("noteId", id);
    return resp.build().toString();

  }

  @Override
  public String read(ActionContext context) throws Exception {
    BaseNote n = persistenceService.getNoteById(context.getParameterOrFail("noteid"));
    return gson.toJson(n);
  }

  @Override
  public String update(ActionContext context) throws Exception {
    logger.info("Updating note " + context.getParameterOrFail("noteId"));
    String id = persistenceService.writeNote(new BaseNote(context), true);
    JsonObjectBuilder resp = Json.createObjectBuilder();
    resp.add("noteId", id);
    return resp.build().toString();
  }

  @Override
  public String delete(ActionContext context) throws Exception {
    logger.info("Deleting note " + context.getParameterOrFail("noteId"));
    persistenceService.deleteNote(context.getParameterOrFail("noteId"));
    return null;
  }
}

package org.umich.mott.peds.innovation.handoff.patient;

import javax.json.Json;
import javax.json.JsonObjectBuilder;

import org.apache.log4j.Logger;
import org.umich.mott.peds.innovation.handoff.ActionContext;
import org.umich.mott.peds.innovation.handoff.ActionMapping;
import org.umich.mott.peds.innovation.handoff.CRUDAction;
import org.umich.mott.peds.innovation.handoff.Stream;
import org.umich.mott.peds.innovation.handoff.common.BaseNote;
import org.umich.mott.peds.innovation.handoff.common.Task;

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
@ActionMapping(path = { NoteAction.NOTE_PATH, NoteAction.TASK_PATH })
public class NoteAction extends CRUDAction {

  private static final Logger logger = Logger.getLogger(NoteAction.class);

  protected static final String NOTE_PATH = "/patient/note.do";

  protected static final String TASK_PATH = "/patient/task.do";

  @Override
  public String create(ActionContext context) throws Exception {
    String id = null;
    BaseNote newNote;
    logger.info(context.getPath());
    if (context.getPath().equals(NOTE_PATH)) {
      logger.info("Creating new note for session " + context.getRequest().getSession().getId());
      newNote = new BaseNote(context);
      id = persistenceService.writeNote(newNote, false);
    } else {
      logger.info("Creating new task");
      newNote = new Task(context);
      id = persistenceService.writeTask((Task) newNote, false);
    }
    newNote.setNoteId(id);
    String type = context.getPath().equals(NOTE_PATH) ? "note" : "task";
    String topic = newNote.getPatientId() + ":" + type + ":create";
    context.postMessageToStream(new Stream.Message(topic, newNote.getNoteId()));
    JsonObjectBuilder resp = Json.createObjectBuilder();
    resp.add("noteId", id);
    return resp.build().toString();

  }

  @Override
  public String read(ActionContext context) throws Exception {
    String res = null;
    if (context.getPath().equals(NOTE_PATH)) {
      BaseNote n = persistenceService.getNoteById(context.getParameterOrFail("noteId"));
      res = gson.toJson(n);
    } else {
      Task n = persistenceService.getTaskById(context.getParameterOrFail("noteId"));
      res = gson.toJson(n);
    }
    return res;
  }

  @Override
  public String update(ActionContext context) throws Exception {
    String id = null;
    BaseNote newNote;
    if (context.getPath().equals(NOTE_PATH)) {
      logger.info("Updating note " + context.getParameterOrFail("noteId"));
      newNote = new BaseNote(context);
      id = persistenceService.writeNote(newNote, true);
    } else {
      logger.info("Updating task " + context.getParameterOrFail("noteId"));
      newNote = new Task(context);
      id = persistenceService.writeTask((Task) newNote, true);
    }
    String type = context.getPath().equals(NOTE_PATH) ? "note" : "task";
    String topic = newNote.getPatientId() + ":" + type + ":update";
    context.postMessageToStream(new Stream.Message(topic, newNote.getNoteId()));

    JsonObjectBuilder resp = Json.createObjectBuilder();
    resp.add("noteId", id);
    return resp.build().toString();
  }

  @Override
  public String delete(ActionContext context) throws Exception {
    if (context.getPath().equals(NOTE_PATH)) {
      logger.info("Deleting note " + context.getParameterOrFail("noteId"));
      persistenceService.deleteNote(context.getParameterOrFail("noteId"));
    } else {
      logger.info("Deleting task " + context.getParameterOrFail("noteId"));
      persistenceService.deleteTask(context.getParameterOrFail("noteId"));
    }
    return null;
  }
}

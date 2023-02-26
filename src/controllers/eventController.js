import  Event from '../models/eventModel.js';
import  mongoose  from 'mongoose';

//Listado de eventos:
export const getEventList = async(req, res) =>{
  try {
    // Obtener los eventos desde la base de datos
    const events = await Event.find();

    // Renderizar la plantilla de lista de eventos con los datos obtenidos
    res.render('eventList', { events });
  } catch (error) {
    throw new Error(error);
  }
}

//Recuperar evento por ID
export const getEventById = async(req,res) =>{
  try {
    const id= req.params.id;
    const event = await Event.findById(id);
    res.render("editEvent",{
      event:event
    })
  } catch (error) {
    throw new Error(error);
  }
}

//Listado de eventos para fullCalendar
export const getCalendarData = async(req,res) =>{
  try {
    const calendarEvents = await Event.find();
    res.json(calendarEvents);
  } catch (error) {
    throw new Error(error);
  }
}

//Crear nuevo evento:
export const createEvent = async(req, res) => {
  try {
    // Crear un nuevo evento con los datos proporcionados por el usuario
    const event = new Event({
      title: req.body.title,
      start: req.body.start,
      end: req.body.end,
      resource: req.body.resource,
      description: req.body.description,
      status: req.body.status,
      editable: true,
      backgroundColor:'green'
    });

    // Guardar el nuevo evento en la base de datos
    await event.save();

    // Redirigir al usuario a la lista de eventos actualizada
    res.redirect('/events/list');
  } catch (error) {
    throw new Error(error.message);
  }
}

//Editar evento
export const editEvent = async(req,res) =>{
  const eventID = mongoose.Types.ObjectId(req.params.id); 
  const otroID = eventID.toString()

  const newData= req.body;
  try {
    const event = Event.findById(otroID)

    await event.updateOne({_id:otroID},{$set:newData});

    res.redirect('/events/list');
  } catch (error) {
    throw new Error(error.message);
  }
}

//Cargar evento a borrar
export const getDeleteEvent = async(req,res) =>{
  try {
    const id = req.params.id;
    const event = await Event.findById(id).exec();
    res.render('deleteEvent',{
      event:event
    })
  } catch (error) {
    throw new Error(error.message);
  }
}

//Borrar evento
export const deleteEvent= async(req, res) =>{
  const eventID= req.params.id;
  try {
    const deletedEvent = await Event.findByIdAndRemove(eventID)
    res.redirect('/events/list');
  } catch (error) {
    throw new Error(error.message);
  }
}

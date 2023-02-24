import { Router } from "express";
import { getEventList, getCalendarData,createEvent, editEvent,getEventById, deleteEvent } from "../controllers/eventController.js";
const router = Router();

//Ruta para cargar el formulario de creación de evento
router.get('/new', (req,res) => res.render("createEvent"));

//Ruta para crear un evento
router.post('/new', createEvent);

//Ruta para listar todos los eventos
router.get('/list', getEventList);

//Ruta con los eventos para FullCalendar
router.get('/eventsJSONdata', getCalendarData);

//Ruta para borrar un evento
router.delete('/delete/:id', deleteEvent);

//Ruta para cargar un evento a modificar
router.get('/:id', getEventById)

// Ruta para modificar un evento
router.put('/:id',editEvent)

export default router;
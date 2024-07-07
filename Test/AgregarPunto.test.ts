import request from 'supertest';
import app from '../app';

/*
describe('POST /agregar-punto-Prueba de caja blanca ',()=>{
    test('deberia retornar 201 porque se crea un nuevo punto',async ()=>{
        const nuevopunto={
            "latitud":-12.046373,
            "longitud":-77.042754,
            "lugar":"Centro de Lima",
            "tipo":"Metal"
        }

        const response = await request(app)
        .post('/agregar-punto')
        .send(nuevopunto);

        expect(response.status).toBe(201);
        expect(response.body.mensaje).toBe("Punto creado");
        expect(response.body.res).toBe(true);

    })


    test('deberia retornar 400 porque categoria no existe',async ()=>{
        const nuevopunto={
            "latitud":-12.046373,
            "longitud":-77.042754,
            "lugar":"Centro de Lima",
            "tipo":"fff"
        }

        const response = await request(app)
        .post('/agregar-punto')
        .send(nuevopunto);

        expect(response.status).toBe(400);
        expect(response.body.mensaje).toBe("No existe la categoria");
        expect(response.body.res).toBe(false);

    })



})*/




describe('POST /agregar-punto-Prueba de caja negra ',()=>{

    test('deberia retornar 400 porque los campos son vacios',async ()=>{
        const nuevopunto={
            "latitud":-12.046373
        }

        const response = await request(app)
        .post('/agregar-punto')
        .send(nuevopunto);

        expect(response.status).toBe(400);
        expect(response.body.mensaje).toBe("Faltan campos obligatorios");
        expect(response.body.res).toBe(false);

    })


})
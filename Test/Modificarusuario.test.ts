import request from 'supertest';
import app from '../app';


/*
describe('POST /actualizar-datos-usuario Prueba de caja blanca ',()=>{
    test('debería retornar un estado de 200 y actualizar datos usuario convencional',async()=>{
        const nuevosDatos = {
            id:18,
            nombre: 'lapicero@gmail.com',
            contrasena: '9contra2',
            dni: 82345678,
            ntelefono: 187654321
          };
      
          const response = await request(app)
            .post('/actualizar-datos-usuario')
            .send(nuevosDatos);
      
          expect(response.status).toBe(200);
          expect(response.body.mensaje).toBe('Datos de usuario actualizados correctamente');
          expect(response.body.res).toBe(true);

    })


    test('debería retornar un estado de 200 y actualizar datos usuario google',async()=>{
        const nuevosDatos = {
            id:4,
            nombre: 'gokualter@gmail.com',
            contrasena: 'Indefinido',
            dni: 22345678,
            ntelefono: 387654321
          };
      
          const response = await request(app)
            .post('/actualizar-datos-usuario')
            .send(nuevosDatos);
      
          expect(response.status).toBe(200);
          expect(response.body.mensaje).toBe('Datos de usuario actualizados correctamente');
          expect(response.body.res).toBe(true);

    })


    test('debería retornar un estado de 404 porque no exixte el usuario',async()=>{
        const nuevosDatos = {
            id:22,
            nombre: 'fono@gmail.com',
            contrasena: 'contra12',
            dni: 82345678,
            ntelefono: 187654321
          };
      
          const response = await request(app)
            .post('/actualizar-datos-usuario')
            .send(nuevosDatos);
      
          expect(response.status).toBe(404);
          expect(response.body.mensaje).toBe("El usuario no existe");
          expect(response.body.res).toBe(false);

    })

    
})*/




describe('POST /actualizar-datos-usuario Prueba de caja blanca ',()=>{ 

    test('deberia retornar un estado de 400 por datos en formato invalido',async ()=>{
        const nuevosDatos = {
            id:16,
            nombre: 'escaleragmail.com',
            contrasena: 'contra1',
            dni: 8234567,
            ntelefono: 87654321
        }
        const response = await request(app)
            .post('/actualizar-datos-usuario')
            .send(nuevosDatos);

        expect(response.status).toBe(400);
        expect(response.body.mensaje).toBe("Campos incorrectos");
        expect(response.body.res).toBe(false);


    })

    test('deberia retornar un estado de 400 por datos vacios',async ()=>{
        const nuevosDatos = {
            id:2
            
        }
        const response = await request(app)
            .post('/actualizar-datos-usuario')
            .send(nuevosDatos);

        expect(response.status).toBe(400);
        expect(response.body.mensaje).toBe("Faltan campos obligatorios");
        expect(response.body.res).toBe(false);


    })



})



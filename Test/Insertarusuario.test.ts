import request from 'supertest';
import app from '../app';


describe('POST /insertar-usuario- Prueba de caja blanca', () => {
    /*test('debería retornar un estado de 201 y crear un usuario con rol "Admi"', async () => {
        const nuevoUsuario = {
          nombre: 'lg@gmail.com',
          contrasena: 'contra12',
          dni: 12345678,
          ntelefono: 987654321,
          rol: 'Admi'
        };
    
        const response = await request(app)
          .post('/insertar-usuario')
          .send(nuevoUsuario);
    
        expect(response.status).toBe(201);
        expect(response.body.mensaje).toBe('Usuario creado');
        expect(response.body.res).toBe(true);
      });*/

    test('prueba de usuario existen',async ()=>{
        const nuevoUsuario = {
            nombre: 'lg@gmail.com',
            contrasena: 'contra12',
            dni: 12345678,
            ntelefono: 987654321,
            rol: 'Admi'
        };

        const response = await request(app)
            .post('/insertar-usuario')
            .send(nuevoUsuario);

            expect(response.status).toBe(400);
            expect(response.body.mensaje).toBe('Usuario ya existe');
            expect(response.body.res).toBe(false);
    });


    /*test('debería retornar un estado de 201 y crear un usuario normal', async () => {
        const nuevoUsuario = {
          nombre: 'samgumg@gmail.com',
          contrasena: 'contra12',
          dni: 12345678,
          ntelefono: 987654321
        };
    
        const response = await request(app)
          .post('/insertar-usuario')
          .send(nuevoUsuario);
    
        expect(response.status).toBe(201);
        expect(response.body.mensaje).toBe('Usuario creado');
        expect(response.body.res).toBe(true);
      });*/
   
  });



  /*
  
describe('POST /insert-usuario- Prueba de caja negra',()=>{
    test('debería crear un usuario con éxito', async () => {
        const nuevoUsuario = {
          nombre: 'xiami@gmail.com',
          contrasena: 'contra12',
          dni: 12345678,
          ntelefono: 987654321
        };
    
        const response = await request(app)
          .post('/insertar-usuario')
          .send(nuevoUsuario);
    
        expect(response.status).toBe(201);
        expect(response.body.mensaje).toBe('Usuario creado');
        expect(response.body.res).toBe(true);
      });


    test('debería retornar un estado 500 si hay un error interno en el servidor', async () => {
        // Simular un error interno al enviar datos incorrectos
        const nuevoUsuario = {
            nombre: 'rueda@gmail.com',
            contrasena: 'contra123'
            // Faltan otros campos requeridos como dni y ntelefono
        };

        const response = await request(app)
            .post('/insertar-usuario')
            .send(nuevoUsuario);

        expect(response.status).toBe(500);
        expect(response.body.error).toBe('Error interno en el servidor');
    });


    test('debería retornar un estado 400 porque datos no cumplen el formato', async () => {
        // Simular un error interno al enviar datos incorrectos
        const nuevoUsuario = {
            nombre: 'palabrisa@gmail.com',
            contrasena: 'ontra12',
            dni: 1234567,
            ntelefono: 87654321
        };

        const response = await request(app)
            .post('/insertar-usuario')
            .send(nuevoUsuario);

        expect(response.status).toBe(400);

        expect(response.body.mensaje).toBe('Datos incorrectos');
        expect(response.body.res).toBe(false)
    });


    



})*/


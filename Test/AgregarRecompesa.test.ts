import request from 'supertest';
import app from '../app';


describe('POST /agregar-recompesa-Prueba de caja blanca ',()=>{
    /*test('deberia retornar un estado de 201 por agregar una recompesa',async ()=>{
        const nuevaRecompensa = {
            fechainicio:'2024-07-08',
            fechafin:'2024-08-14',
            imagen: 'https://publicorpmerch.com/wp-content/uploads/2023/02/CASACA-TERMICAS-e1615399942699.jpg',
            des: "Casa Industrial",
            puntaje:1500,
            stock:2
        }
        const response = await request(app)
            .post('/agregar-recompesa')
            .send(nuevaRecompensa);

        expect(response.status).toBe(201);
        expect(response.body.mensaje).toBe("Recompensa agregada con éxito");
        expect(response.body.res).toBe(true);

    })

    test('deberia retornar un estado de 400 por recompesa existente',async ()=>{
        const nuevaRecompensa = {
            fechainicio:'2024-07-22',
            fechafin:'2024-07-28',
            imagen: 'https://m.media-amazon.com/images/I/81D6tH6m56L._AC_SL1500_.jpg',
            des: "North Face Negro",
            puntaje:1800,
            stock:3
        }
        const response = await request(app)
            .post('/agregar-recompesa')
            .send(nuevaRecompensa);

        expect(response.status).toBe(400);
        expect(response.body.mensaje).toBe("Recompensa ya existe");
        expect(response.body.res).toBe(false);

    })*/


})



describe('POST /agregar-recompesa-Prueba de caja negra ',()=>{
    test('debería retornar un estado 400 por campos invalidos',async ()=>{
        const nuevaRecompensa = {
            fechainicio:'2024-08-05',
            fechafin:'2024-08-11',
            
        }
        const response = await request(app)
            .post('/agregar-recompesa')
            .send(nuevaRecompensa);

        expect(response.status).toBe(400);
        expect(response.body.mensaje).toBe("Faltan campos obligatorios");
        expect(response.body.res).toBe(false);

    })
})





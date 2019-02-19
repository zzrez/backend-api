// Load the MySQL pool connection
const pool = require('../data/config');

/* EXAMPLE OF STATIC JSON FOR TESTING
const tours = [{
    id: 1,
    name: "Richard Hendricks",
    email: "richard@piedpiper.com",
},
{
    id: 2,
    name: "Bertram Gilfoyle",
    email: "gilfoyle@piedpiper.com",
},
];
*/

const router = app => {
    app.get('/', (request, response) => {

        response.send({
            message: 'GH backend-api: using Node.js and Express REST API'
        });
    });

    // Display all tours from static JSON
    // app.get('/tours', (request, response) => {
    //     response.send(tours);
    // });

    // Display all tours from db
    app.get('/tours', (request, response) => {
        pool.query('SELECT * FROM tours', (error, result) => {
            if (error) throw error;

        response.send(result);
    });

    // Display a single tour by ID
    app.get('/tours/:id', (request, response) => {
        const id = request.params.id;

        pool.query('SELECT * FROM tours WHERE id = ?', id, (error, result) => {
            if (error) throw error;

            response.send(result);
        });
    });

    // Add a new tour
    app.post('/tours', (request, response) => {
        pool.query('INSERT INTO tours SET ?', request.body, (error, result) => {
            if (error) throw error;

            response.status(201).send(`tour added with ID: ${result.insertId}`);
        });
    });

    // Update an existing tour
    app.put('/tours/:id', (request, response) => {
        const id = request.params.id;

        pool.query('UPDATE tours SET ? WHERE id = ?', [request.body, id], (error, result) => {
            if (error) throw error;

            response.send('tour updated successfully.');
        });
    });

    // Delete a tour
    app.delete('/tours/:id', (request, response) => {
        const id = request.params.id;

        pool.query('DELETE FROM tours WHERE id = ?', id, (error, result) => {
            if (error) throw error;
            response.send('tour deleted.');
        });
    });

});


}





// Export the router
module.exports = router;
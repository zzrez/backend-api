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
    app.get('/', (req, res) => {
        // res.send({
        //     message: 'GH backend-api, using Node.js and Express REST API. For GET, endpoint is /tours'
        // });
        res.send('Welcome to the SpeedRez API! <br>For GET, endpoint is /tours');
    });

    // Display all tours from static JSON
    // app.get('/tours', (req, res) => {
    //     res.send(tours);
    // });

    // Display all tours from db
    app.get('/tours', (req, res) => {
        let title = req.query.title
        let supplier = req.query.supplier
        let query;
        let qString = ''
        if (title) {
            title = title.replace("%20", " ")
            qString = `${qString} AND title='${title}'`
        }
        if (supplier) {
            supplier = supplier.replace("%20", " ")
            qString = `${qString} AND supplier='${supplier}'`
        }

        if (qString) {
            qString = qString.substring(4).trim(); //remove AND
            qString = `WHERE ${qString}`
        } else {
          qString = ''
        }
        //query = `SELECT tour_id, title, summary, main_photo, price_from, duration_text FROM tours ${qString}`
        query = `SELECT tour_id FROM tours ${qString}`
        //pool.query('SELECT * FROM tours', (error, result) => {
        pool.query(query, (error, result) => {
            //if (error) throw error;
            if (error) {
                //const response = { data: null, message: error.message, }
                const response = { data: null, message: `query = ${query}`, }
                res.send(response)
            }

        //res.send(result); //ORIGINAL

        const tours = [...result]
        const response = {
        data: tours,
        //data: results,
        message: `query = ${query}`,
        }
        //res.send(response)

        res.send(tours)
        });

    // Display a single tour by ID
    app.get('/tours/:id', (req, res) => {
        const id = req.params.id;

        pool.query('SELECT * FROM tours WHERE tour_id = ?', id, (error, result) => {
            if (error) throw error;

            //res.send(result);

            const data = result[0]; //needed to strip square brackets
            res.send(data);
            // const tour = [...result]
            // res.json(tour);
        });
    });

    // Add a new tour
    app.post('/tours', (req, res) => {
        pool.query('INSERT INTO tours SET ?', req.body, (error, result) => {
            if (error) throw error;

            res.status(201).send(`tour added with ID: ${result.insertId}`);
        });
    });

    // Update an existing tour
    app.put('/tours/:id', (req, res) => {
        const id = req.params.id;

        pool.query('UPDATE tours SET ? WHERE id = ?', [req.body, id], (error, result) => {
            if (error) throw error;

            res.send('tour updated successfully.');
        });
    });

    // Delete a tour
    app.delete('/tours/:id', (req, res) => {
        const id = req.params.id;

        pool.query('DELETE FROM tours WHERE id = ?', id, (error, result) => {
            if (error) throw error;
            res.send('tour deleted.');
        });
    });

});


}





// Export the router
module.exports = router;
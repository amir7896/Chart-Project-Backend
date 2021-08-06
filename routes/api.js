const express = require('express');
const router  = express.Router();
const Graph  = require('../models/graph');
const jwt = require('jsonwebtoken');



// =====================
// Verify Token
// ====================

function verifyToken(req, res, next){
    if(!req.headers.authorization){
        return res.status(401).send('Un Authorized Request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if(token === 'null'){
        return res.status(401).send('Un Authorized Request') 
    }
    let payload = jwt.verify(token, 'secretkey')
    if(!payload){
        return res.status(401).send('Un Authorized Request') 
    }
    req.userId = payload.subject
    next()
}

// ====================
// Add Graph With Data
// ====================
router.post('/addgraph', (req, res) => {
    const graph = new Graph({
        name: req.body.name,
        data: req.body.data,
        label: req.body.label,
        graphlabels: req.body.graphlabels
    });
    graph.save((err, savegraph) => {
        if(err){
            return res.status(400).json({error: err})
        }else{
            return res.status(200).json({message: "Graph Added", list:savegraph});
        }
    })
});

// ======================
// Get Chart By Name
// ======================
router.get('/chart/:name', async(req, res) => {
    const input     = req.params.name;
    const findChart = await Graph.find({'name': input});
    return res.status(200).json({list : findChart});
})


router.get('/tutorials', verifyToken,(req, res) => {
    let tutorials = [
        {
            "_id": "1",
            "name": "Nodejs, Express, and MongoDB",
            "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident repudiandae, fugiat vitae exercitationem inventore mollitia libero et in, commodi veniam, dolorem officiis sapiente quod iusto debitis architecto eaque saepe impedit!",
            "date": "2021-7-30"
        },
        {
            "_id": "2",
            "name": "Angular, Express, and MongoDB",
            "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident repudiandae, fugiat vitae exercitationem inventore mollitia libero et in, commodi veniam, dolorem officiis sapiente quod iusto debitis architecto eaque saepe impedit!",
            "date": "2021-7-30"
        },
        {
            "_id": "3",
            "name": "React, Express, and MongoDB",
            "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident repudiandae, fugiat vitae exercitationem inventore mollitia libero et in, commodi veniam, dolorem officiis sapiente quod iusto debitis architecto eaque saepe impedit!",
            "date": "2021-7-30"
        },
        {
            "_id": "4",
            "name": "Flutter Development",
            "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident repudiandae, fugiat vitae exercitationem inventore mollitia libero et in, commodi veniam, dolorem officiis sapiente quod iusto debitis architecto eaque saepe impedit!",
            "date": "2021-7-30"
        },
        {
            "_id": "5",
            "name": "Android Development",
            "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident repudiandae, fugiat vitae exercitationem inventore mollitia libero et in, commodi veniam, dolorem officiis sapiente quod iusto debitis architecto eaque saepe impedit!",
            "date": "2021-7-30"
        },
        {
            "_id": "6",
            "name": "Php, Html, Css, JavaScript",
            "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident repudiandae, fugiat vitae exercitationem inventore mollitia libero et in, commodi veniam, dolorem officiis sapiente quod iusto debitis architecto eaque saepe impedit!",
            "date": "2021-7-30"
        }
    ];
   return res.status(200).json(tutorials);
})
// // =================
// // Bar Chart
// // =================

// router.get('/barchart', (req, res) => {
    
//     let barChart = {

//         barChartLabels : barChartLabels =
//         [
//           '1999', '2000','2008','2009','2010', '2011', '2012'
//         ],
//         barChartData: barChartData = [
//             {data: [65,56,45,98,78,99,65], label: 'Series A' },
//             {data: [90,78,78,87,34,23,33], label: 'Series B'}
//         ]
//     }
//     res.json({list : barChart});
// });

// ===============
// Doughunt Chart
// ===============
// router.get('/doughunt', (req, res) => {
    
//     let doughuntChart = {

//         doughuntChartLabels : doughuntChartLabels =
//         [
//             'Web ', 'Javascript ', 'Android', 'Ionic'
//         ],
//         doughuntChartData: doughuntChartData = [
            
//             50,70,40,50
//         ]
//     }
//     res.json({list : doughuntChart});
// });

// ==================
// Pie Chart
// ==================
// router.get('/piechart', (req, res) => {
    
//     let pieChart = {

//         pieChartLabels : pieChartLabels =
//         [
//             'Web ', 'Javascript ', 'Android', 'Ionic'
//         ],
//         pieChartData: pieChartData = [
            
//             50,70,40,50
//         ]
//     }
//     res.json({list : pieChart});
// });

// ===================
// Radar Chart 
// ===================

  // =================
  // Radar Chart
  // ================
//   router.get('/radarchart', (req, res) => {
    
//     let radarChart = {

//         radarChartLabels : radarChartLabels =
//         [
//             'Web ', 'Javascript ', 'Android', 'Ionic'
//         ],
//         radarChartData: radarChartData = [
//             {data:[70, 90 , 80, 60], label: '2019'},
//             {data:[120,90 , 77, 65], label: '2021'}
//         ]
//     }
//     res.json({list : radarChart});
// });

// =====================
// Line Chart
// =====================
// router.get('/linechart', (req, res) => {

//     let lineChart ={
//         linechartLabels: linechartLabels = [
//             'january', 'Febraruy', 'March', 'April', 'May'
//         ],
//         linechartData : linechartData = [
//             12,55,64,90,100
//         ]
//     }
//     res.json({list: lineChart});
// })


module.exports = router;
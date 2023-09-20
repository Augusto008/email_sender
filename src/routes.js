import {Router} from 'express';

const route = Router();

route.get('/', (req, res) => {
    return res.json({success: "message"});
});

export {route};
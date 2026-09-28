export const errorHandler = async (error, req, res, next) => {
    console.error(error);

    if(error.name === 'ValidationError'){
        const message = Object.values(error.errors)[0].message;
        return res.status(400).json({success: false, message});
    }

    res.status(500).json({success: false, message: 'Server Error'});
};
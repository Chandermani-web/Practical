export const asyncHandler = (fn) => (req,res,next) => {
    return Promise.resolve(fn(req,res,next)).catch((error) => {
        res.status(500).json({ message: "Something went wrong" });
        next(error);
    });
}
const Genre = require ('./genre.model')

const indexGet = async (req, res, next) => {
    try{
        const genres = await Genre.find();
        return res.status(200).json(genres)

    }catch(error){
        return next(error)
    }
}

const createPost = async (req, res, next) => {
    try{
        console.log(req.body);
        const genreToBeCreated = new Genre (req.body);
        const created = await genreToBeCreated.save()
        return res.status(201).json((created))

    } catch (error) {
        return next(error)
    }
}


const getById = async (req, res, next) => {
    try{

        const {id} = req.params;
        const found = await Genre.findById(id);
        return res.status(200).json(found)

    }catch(error){
        return next (error)
    }
}


const getByName = async (req, res, next) => {
    try{
        const {name} = req.params;
        const found = await Genre.find({name:name})
        return res.status(200).json(found)

    }catch(error){
        return next(error)
    }
}

const editPut = async (req, res, next) => {

    try{

        const {id} = req.params;
        const fields = {...req.body}
        const options = {new:true};
        const edited = await Genre.findByIdAndUpdate(id, fields, options);
        return res.status(200).json(edited)

    } catch(error){
        return next(error)
    }

}


const deleteGenre = async (req, res, next) => {
    try{

        const {id} = req.params;
        const deleted = await Genre.deleteMany({_id:id})
        if(deleted.deletedCount){
            return res.status(200).json('Género eliminado con éxito')
        } else {
            return res.status(200).json('No se encuentra el elemento para eliminar')
        }

    }catch(error){
        return next(error)
    }
}


module.exports = {
    indexGet,
    createPost,
    getById,
    getByName,
    editPut,
    deleteGenre
}
const Room = require("../models/room");


module.exports.createRoom = async (req, res) => {
  try {


    const picture = req.file ? req.file.path : ""; 
    const { title, rent, facilities } = req.body;

    // Parse facilities if it's a JSON string
const parsedFacilities = Array.isArray(facilities) ? facilities : JSON.parse(facilities);

    const data = { title, rent, facilities:parsedFacilities, picture }; 
    const room = new Room(data);
    await room.save();

    console.log('room', room);
    res.status(200).send({
      status: 'Success',
      message: 'Successfully inserted room data',
      data: room
    });
  } catch (error) {
    res.status(500).send({
      status: "failed",
      message: "Something went wrong",
      error: error.message,
    });
  }
};



module.exports.getAllRoom = async(req, res) => {
  try {
    const room = await Room.find();
    console.log(room);
    res.status(200).send({
      status: "Success",
      message: "You got all room",
      data: room,
    });
  } catch (error) {
    res.status(500).send({
      status: "failed",
      message: "Something went wrong",
      error: error.message,
    });
  }
};

//Single data using get method
module.exports.getSingleRoom = async(req, res) => {
  try {
    const { id } = req.params;
    console.log(id)
    if(!id){
      return res.status(404).send('Id not found')
    }
    const room = await Room.findById(id);
    if (!room) {
      return res.status(404).send('Data not found');
  }
  
    res.status(200).send({
      status: "Success",
      message: "You got single room data",
      data: room,
    });
  } catch (error) {
    res.status(500).send({
      status: "faild",
      message: "Something went wrong",
      error: error.message,
    });
  }
};

module.exports.updateRoom= async(req, res) => {
  try {
    const { id } = req.params;
    const picture = req.file ? req.file.path : ""; 
    const { title, rent, facilities } = req.body;
    // const data = { title, rent, facilities, picture }; 

    if(!id){
      return res.status(404).send('Id not found')
    }

   


    const data = {
      title: title === "" ? undefined : title,
      rent: rent === "" ? undefined : rent,
      facilities: Array.isArray(facilities) && facilities.length > 0 ? facilities : undefined,
      picture: req.file === undefined ? undefined : req.file.path,
    };


    if(!data){
      return res.status(404).send('Data is empty')
    }
    
    console.log(data)

    const room = await Room.findByIdAndUpdate(id, data, { new: true, runValidators: true });

    res.status(200).send({
      status: "Success",
      message: "You successfully update data",
      data: room
     
    });
  } catch (error) {
    res.status(500).send({
      status: "faild",
      message: "Something went wrong",
      error: error.message,
    });
  }
};

module.exports.deleteRoom= async(req, res) => {
  try {
    const { id } = req.params;
    const room = await Room.findByIdAndDelete(id);

    if (!room) {
      return res.status(404).send();
  }
    res.status(200).send({
      status: "Success",
      message: "Successfully delete room",
     
    });
  } catch (error) {
    res.status(500).send({
      status: "faild",
      message: "Something went wrong",
      error: error.message,
    });
  }
};

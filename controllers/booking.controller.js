const Booking = require("../models/booking");


module.exports.createBooking = async (req, res) => {
  try {
    // Extract userId and roomId from req.params
    const { userId, roomId } = req.params;

    // Extract startDate and endDate from req.body
    const { startDate, endDate } = req.body;

    // Parse the dates for proper comparison (if needed)
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Check for date conflict in existing bookings for the same room
    const existingBookings = await Booking.find({
      roomId: roomId,
      // Check if the new booking overlaps with any existing booking
      $or: [
        { startDate: { $lte: end }, endDate: { $gte: start } }
      ]
    });

    if (existingBookings.length > 0) {
      return res.status(409).send({
        status: 'failed',
        message: 'Booking conflict: Room is already booked for the selected dates',
      });
    }

    // If no conflicts, proceed with booking
    const data = {
      userId,
      roomId,
      startDate: start,
      endDate: end
    };

    console.log(data);

    const booking = new Booking(data);
    await booking.save();
    res.status(200).send({
      status: 'Success',
      message: 'Successfully inserted booking data',
      data: booking
    });
  } catch (error) {
    res.status(500).send({
      status: "failed",
      message: "Something went wrong",
      error: error.message,
    });
  }
};



module.exports.getAllBooking = async(req, res) => {
  try {
    const booking = await Booking.find();
    res.status(200).send({
      status: "Success",
      message: "You got all booking",
      data: booking,
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
module.exports.getSingleBooking = async(req, res) => {
  try {
    const { id } = req.params;
    console.log(id)
    if(!id){
      return res.status(404).send('Id not found')
    }
    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).send('Data not found');
  }
  
    res.status(200).send({
      status: "Success",
      message: "You got single booking data",
      data: booking,
    });
  } catch (error) {
    res.status(500).send({
      status: "faild",
      message: "Something went wrong",
      error: error.message,
    });
  }
};

module.exports.updateBooking= async(req, res) => {
  try {
    const { id } = req.params;
    const data = req.body

    if(!id){
      return res.status(404).send('Id not found')
    }

    if(!data){
      return res.status(404).send('Data is empty')
    }

    const booking = await Booking.findByIdAndUpdate(id, data, { new: true, runValidators: true });

    res.status(200).send({
      status: "Success",
      message: "You successfully update data",
      data: booking
     
    });
  } catch (error) {
    res.status(500).send({
      status: "faild",
      message: "Something went wrong",
      error: error.message,
    });
  }
};

module.exports.deleteBooking= async(req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findByIdAndDelete(id);

    if (!booking) {
      return res.status(404).send();
  }
    res.status(200).send({
      status: "Success",
      message: "Successfully delete booking",
     
    });
  } catch (error) {
    res.status(500).send({
      status: "faild",
      message: "Something went wrong",
      error: error.message,
    });
  }
};
 
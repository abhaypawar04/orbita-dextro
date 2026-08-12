import mongoose from "mongoose"
import mongoosePaginate from "mongoose-paginate-v2"

// Define Schema
const contactSchema = mongoose.Schema({
  first_name:{
    type: String
  },
  last_name:{
    type: String
  },
  email:{
    type: String
  },
  phone:{
    type: String
  },
  address:{
    type: String
  }
})

contactSchema.plugin(mongoosePaginate)

const contact = mongoose.model("Contact", contactSchema)

export default contact
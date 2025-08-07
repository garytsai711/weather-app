import { isRequired, isEmail } from "@/validators/validator";

const profileSchema = {
  fullName: [isRequired("Full Name")],
  email: [isRequired("Email"), isEmail("Email")],
  phoneNumber: [isRequired("Phone Number")],
};

export default profileSchema;

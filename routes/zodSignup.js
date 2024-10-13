const z = require("zod");


const  userSignupZod = z.object({
    firstName: z
                .string()
                .min(3,{message:"First name should be atleast of 3 letters"})
                .max(200,{message:"First name cannot be of more than 200 letters"}),
    lastName:  z
                .string()
                .max(200,{message:"Last name cannot be of more than 200 letters"}),
    email:     z
                .string()
                .email({message:"Enter Valid Email"}),
    username:  z
                .string()
                .max(100,{message:"Too long username"}),
    password:  z
                .string()
                .max(100,{message:"Too long password"})
});

module.exports = {
    userSignupZod
}
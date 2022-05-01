module.exports = {
    components:{
        securitySchemes: {
            ApiKeyAuth: {
              type: "apiKey",
              name: "Authorization",
              in: "header"
            }
        },
        schemas:{
            postSchema:{
                type:'object',
                properties:{
                    description:{
                        type:'String',
                        description:"text description",
                        example:"publicacion1"
                    },
                    imagePost:{
                        type:'string',
                        description:"post's title",
                        example:"make image"
                    },
                    userId:{
                        type:'objectId',
                        description:"user identification number",
                        example:"6201064b0028de7866e2b2c4"

                    },
                    challengerId:{
                        type:'objectId',
                        description:"challenger identification number",
                        example:"6201064b0028de7866e2b2c9"

                    },
                    comments:{
                        type:"objectId",
                        description:"comments identification number",
                        example:"666666n55h890"
                    },
                    likes:{
                        type:"objectId",
                        description:"likes identification number",
                        example:"666666n55h890y5536"
                    }

                }
            },
            UserSchema:{
                type:'object',
                properties:{
                    name:{
                        type:'String',
                        description:"user name ",
                        example:"Roberto"
                    },
                    email:{
                        type:'string',
                        description:"user mail",
                        example:"rocabtom@gmail.com"
                    },
                    password:{
                        type:'String',
                        description:"user password",
                        example:"6201064b002"

                    },
                    role:{
                        type:'String',
                        description:" user role",
                        example:"administrador"

                    },
                    confirmed:{
                        type:"boolean",
                        description:"user confirmed",
                        example:"true"
                    },
                    company:{
                        type:"objectId",
                        description:"user ref:company",
                        example:"RCT SA"
                    },
                    token:{
                        type:"array",
                        description:"user token",
                        example:"6201064b0026201064b0026201064b0026201064b002"
                    },
                    postIds:{
                        type:"objectId",
                        description:"user ref:post",
                        example:"6201064b002620106"
                    },
                    imageUser:{
                        type:"String",
                        description:"user image",
                        example:"image"
                    },
                    favorites:{
                        type:"objectId",
                        description:"user ref:post",
                        example:"6201064b002620106"
                    }

                }

            },
            companySchema:{
                type:'object',
                properties:{
                    _id: {
                        type:"Number",
                        description:"company id ",
                        example:"62389f53a27c60629c2619c2"

                    },
                    name:{
                        type:'String',
                        description:"company name ",
                        example:"la prueba 5"
                    },
                    nameCEO:{
                        type:'string',
                        description:"CEO company",
                        example:"??"
                    },
                    phone:{
                        type:'Number',
                        description:"phone company",
                        example:"963336768"

                    },
                    email:{
                        type:'String',
                        description:"company mail",
                        example:"laprueba5@gmail.com"

                    },
                    password:{
                        type:'String',
                        description:"company password",
                        example:"$2a$10$9BNzCIEAo0pVcOSbMbWJ/e15prjwfH28Ta748IVFaOrHRQQdX2fU6"

                    },
                    imageCompany:{
                        type:"String",
                        description:"company image",
                        example:"image"
                    },
                    confirmed:{
                        type:"boolean",
                        description:"user confirmed",
                        example:"true"
                    },
                    employees:{
                        type:'objectId',
                        description:" ref: user ",
                        example:[],

                    },
                    token:{
                        type:"array",
                        description:"user token",
                        example:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjM4OWY1M2EyN2M2MDYyOWMyNjE5YzIiLCJpYXQiOjE2NDc4Nzc5ODN9.L-tfDJfVAbu1-_r4KrCxLJQyCFe8_LmpX11OdHwmPek"
                    },
                    score:{
                        type:'number',
                        description:" number ref:user",
                        example:20

                    },
                    
                    companyType:{
                        type:"String",
                        description:"company type",
                        example:"PYME"
                    }
                    

                }

            },
            commentShema: {
                type:'object',
                properties:{
                    commment:{
                        type:"String",
                        description:"comment text",
                        example:"me gusta mucho"
                    },
                    imageComment:{
                        type:"String",
                        description:"comment image",
                        example:"image"
                    },
                    userId:{
                        type:"objectId",
                        description:"comment ref:user",
                        example:"6201064b002620106"
                    },
                    postIds:{
                        type:"objectId",
                        description:"comment ref:post",
                        example:"6201064b002620106"
                    },
                    likes:{
                        type:"objectId",
                        description:"likes identification number",
                        example:"666666n55h890y5536"
                    }

                }

            },
            challengerSchema:{
                type:'object',
                properties:{
                    title:{
                        type:"String",
                        description:"challenger title",
                        example:"Nuevo reto"
                    },
                    description:{
                        type:"String",
                        description:"challenger description",
                        example:"Va de sostenibilidad"
                    },
                    imageChallenger:{
                        type:"String",
                        description:"challenger image",
                        example:"image"
                    },
                    postIds:{
                        type:"objectId",
                        description:" ref:post",
                        example:"6201064b002620106"
                    }

                }

            }


        }
    }
}
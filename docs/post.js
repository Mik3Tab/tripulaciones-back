module.exports = {
    paths: {
      "/posts": {
        get: {
          tags: {
            Posts: "Post",
          },
          description: "Get all posts",
          operationId: "getAll",
          parameters: [],
          responses: {
            200: {
              description: "Posts were obtained",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/postSchema",
                  },
                },
              },
            },
          },
        },
        post: {
          security: [{
            ApiKeyAuth: [ ]
          }],
          tags: {
            Posts: "Create a post",
          },
          description: "Create Post",
          operationId: "create",
          parameters: [],
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/postSchema",
                },
              },
            },
          },
          responses: {
            201: {
              description: "Post created successfully",
            },
            500: {
              description: "Server error",
            },
          },
  
        }
      },
      
      "/users":{
        post: {
          tags: {
            Users: "User",
          },
          description: "create user",
          operationId: "create",
          parameters: [],
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/UserSchema",
                },
              },
            },
          },
          responses: {
            201: {
              description: "Waiting for confirmation, please check your email",
            },
            400: {
              description: "password not null or mail exist",

            },
            500: {
              description: "Server error",
            },
          },
        },

      },
      
      "/companies":{
        post: {
          tags: {
            Company: "Company",
          },
          description: "create company",
          operationId: "create",
          parameters: [],
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/companySchema",
                },
              },
            },
          },
          responses: {
            201: {
              description: "Thank you for registering, we will confirm your credentials shortly.",
            },
           
            500: {
              description: "Server error",
            },
          },
        },

      },
      "/companies/{_id}": {
        put: {
          tags: {
            company: "Update a company",
          },
          description: "Update company",
          operationId: "update",
          parameters: [
            {
              name: "_id",
              in: "company",
              schema: {
                $ref: "#/components/schemas/companySchema",
              },
              description: "Id of Task to be updated",
            },
          ],
          requestBody: {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/companySchema" },
              },
            },
          },
          responses: {
            201: { description: "Successfully edited company" },
            
          },
        },
        delete: {
          tags: {
            companies: "Update a company",
          },
          description: "Deleting a company",
          operationId: "delete",
          parameters: [
            {
              name: "_id",
              in: "path",
              schema: {
                $ref: "#/components/schemas/companySchema",
              },
              description: "Deleting a done company",
            },
          ],
          responses: {
            200: { description: "company deleted successfully" },
            404: { description: "company not found" },
            500: { description: "Server error" },
          },
        },
  
      },
  
    },
  };
  
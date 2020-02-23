export default [
  {
    name: "user",
    schema: {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["id"],
          properties: {
            id: {
              bsonType: "string",
              description: "must be a string and is required"
            },
            commandsRun: {
              bsonType: "int",
              description: "How many times a user has run commands"
            }
          }
        }
      }
    }
  },
  {
    name: "test",
    schema: {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["id"],
          properties: {
            id: {
              bsonType: "string",
              description: "must be a string and is required"
            },
            commandsRun: {
              bsonType: "int",
              description: "How many times a user has run commands"
            }
          }
        }
      }
    }
  }
]
import mongoose from "mongoose";
import chalk from "chalk";

export const connectDB= async(dbURI) => {
  try {
    mongoose.set("strictQuery", false);
    const connection = await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log(chalk.yellow("****************************"));
    console.log(chalk.yellow(`Conectado base de datos:${connection.connections[0].name}`));
    console.log(chalk.yellow("****************************"));
  } catch (error) {
    console.error(chalk.red(`Error conectando a la base de datos: ${error.message}`));
    process.exit(1);
  }
};


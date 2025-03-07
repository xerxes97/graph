import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { sequelize } from "../index.js";
import { CHARACTERS } from "../../constants/tableNames.js";

export class Character extends Model<
  InferAttributes<Character>,
  InferCreationAttributes<Character>
> {
  declare id: number;
  declare name: string;
  declare status: string;
  declare species: string;
  declare type: string;
  declare gender: string;
  declare origin: object;
  declare location: object;
  declare image: string;
  declare episode: string[];
  declare createdAt: Date;
  declare updatedAt: Date;
}

Character.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("Alive", "Dead", "unknown"),
      allowNull: false,
      defaultValue: "unknown",
    },
    species: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.ENUM("Female", "Male", "Genderless", "unknown"),
      allowNull: false,
      defaultValue: "unknown",
    },
    origin: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    episode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  },
  {
    sequelize: sequelize,
    tableName: CHARACTERS,
    timestamps: true,
  }
);

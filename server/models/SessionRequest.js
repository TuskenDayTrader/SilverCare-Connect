import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";
import { User } from "./User.js";

export const SessionRequest = sequelize.define("SessionRequest", {
  familyName: { type: DataTypes.STRING, allowNull: false },
  contactEmail: { type: DataTypes.STRING, allowNull: false },
  residentName: { type: DataTypes.STRING, allowNull: false },
  facilityId: DataTypes.STRING,
  date: { type: DataTypes.DATEONLY, allowNull: false },
  time: { type: DataTypes.STRING, allowNull: false },
  notes: DataTypes.TEXT,
  status: {
    type: DataTypes.ENUM("pending", "confirmed", "cancelled"),
    defaultValue: "pending",
  },
});

// Optional association — session request may belong to a registered user
SessionRequest.belongsTo(User, { foreignKey: { allowNull: true } });
User.hasMany(SessionRequest);

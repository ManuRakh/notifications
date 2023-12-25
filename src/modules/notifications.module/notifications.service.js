const appointmentsModel = require("../../models/appointment.model");
const userModel = require("../../models/user.model");
const doctorModel = require("../../models/doctor.model");
const { logMessage } = require("../utils.module/utils.service");
const { Op } = require("sequelize");

const threshold48Hours = 24 * 60 * 60 * 1000;
const threshold2Hours = 2 * 60 * 60 * 1000;

const checkAppointments = async () => {
  const allAppointments = await appointmentsModel.findAll({
    where: {
      status: {
        [Op.ne]: "expired",
      },
    },
    include: [
      {
        model: userModel, // замените userModel на фактическую модель пользователей
      },
      {
        model: doctorModel, // замените userModel на фактическую модель пользователей
      },
    ],
  });
  return allAppointments.map((appointment) => appointment.toJSON());
};

const calculateDatesDiffFromToday = (appointedDate) => {
  const today = new Date(); // Текущая дата и время
  const appointmentTime = new Date(appointedDate); // Дата назначения приема в формате Date
  const timeDiff = appointmentTime - today; // Разница между текущим временем и временем назначения

  return timeDiff
};

const notify = (timeDiff, appointment) => {
  if (timeDiff <= threshold48Hours+10 && timeDiff > threshold2Hours) {
    logMessage(
      `${new Date()} | Привет ${
        appointment.user.name
      }! Напоминаем что вы записаны к ${appointment.doctor.spec}  в ${
        appointment.slot
      }!`,
    );
  } else if (timeDiff <= threshold2Hours+10 && timeDiff > 0) {
    logMessage(
      `${new Date()} | Привет ${
        appointment.user.name
      }! Напоминаем что вы записаны к ${appointment.doctor.spec}  в ${
        appointment.slot
      }!`,
    );
  } else
    throw new Error(
      "Expired notification period for appointment with ID " + appointment.id,
    );
};

const processNotifications = async (appointments) => {
  for (const appointment of appointments) {
    try {
      console.log({ appointment });
      const timeDiff = calculateDatesDiffFromToday(appointment.slot);

      notify(timeDiff, appointment);
    } catch (error) {
      console.log({ error });
      console.log(
        "Expired notification period for appointment with ID " + appointment.id,
      );
      await appointmentsModel.update(
        { status: "expired" },
        {
          where: {
            id: {
              [Op.eq]: appointment.id,
            },
          },
        },
      );
    }
  }
};

const checkAndProcessNotifications = async () => {
  setInterval(async () => {
    const activeAppointments = await checkAppointments();
    await processNotifications(activeAppointments);
  }, 10000);
};

module.exports = {
  checkAndProcessNotifications,
};

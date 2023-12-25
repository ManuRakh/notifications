const appointmentsModel = require("../../models/appointment.model");
const { Op } = require("sequelize");

const threshold48Hours = 48 * 60 * 60 * 1000;  // 48 часов в миллисекундах
const threshold2Hours = 2 * 60 * 60 * 1000;  // 2 часа в миллисекундах

const checkAppointments = async () => {

    const allAppointments = await appointmentsModel.findAll({
        where: {
            status: {
                [Op.ne]: "expired"
            }
        }
    });
    return allAppointments.map(appointment => appointment.toJSON());;
}

const calculateDatesDiffFromToday = (appointedDate) => {
    const today = new Date();  // Текущая дата и время
    const appointmentTime = new Date(appointedDate);  // Дата назначения приема в формате Date
    const timeDiff = appointmentTime - today;  // Разница между текущим временем и временем назначения
}

const notify =  (timeDiff, appointment) => {
    if (timeDiff <= threshold48Hours && timeDiff > threshold2Hours) {
        console.log("Notify: Less than 48 hours remaining for appointment with ID " + appointment.id);
    } else if (timeDiff <= threshold2Hours && timeDiff > 0) {
        console.log("Notify: Less than 2 hours remaining for appointment with ID " + appointment.id);
        //вызов функции нотификации, требует интеграции со сторонними сервисами, не стал делать, мало входных данных. 
    } else throw new Error("Expired notification period for appointment with ID " + appointment.id);
}   

const processNotifications = async (appointments) => {
    for (const appointment of appointments) {
        try {
            const timeDiff = calculateDatesDiffFromToday(appointedDate.slot);
            notify(timeDiff, appointment);    
        } catch (error) {
            console.log("Expired notification period for appointment with ID " + appointment.id)
            await appointmentsModel.update({ status: "expired"}, {
                where: {
                    id: {
                        [Op.eq]:appointment.id
                    }
                }
                
            })
        }
    }
}

const checkAndProcessNotifications = async () => {
    setInterval(async () => {
        const activeAppointments = await checkAppointments();
        await processNotifications(activeAppointments);
    }, 1000)

}

module.exports = {
    checkAndProcessNotifications,
}
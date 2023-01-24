const nodemailer = require('nodemailer')
const path = require('path')

class EmailService{
    async successfulSignUp(firstname,middlename,email,link) {

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            auth: {
                user: 'immortalheroes1712@gmail.com',
                pass: 'ixnyuzxtxqsxedjh'
            },
            secure: true
        })

        const MailData = {
            from: 'immortalheroes1712@gmail.com',
            //TODO поменять имя и фамилию местами.
            to: email,
            text:                                           `Уважаемый/ая ${firstname} ${middlename}! 
                Спасибо за внимание, проявленное к нашему проекту "Наш полк | ВКА". Мы ценим каждого участника и истории, пополняющие кладезь памяти о наших предках, принесших победу в Великой Отечественной Войне.
                                Будем рады видеть вашу активность и публикацию подвигов ваших родных и близких на нашей некоммерческой платформе.
                                                                                                     С уважением, курсанты 62 курса ВКА им.А.Ф.Можайского.
                                                                            
                                                                            ССЫЛКА АКТИВАЦИИ
                                Для подтверждения регистрации вашего профиля перейдите по ссылке http://localhost:9999/activate/${link}.
                `,
        }

        transporter.sendMail(MailData, (error, info) => {
            if (error) {
                console.log(error.message)
            }
            else{
                console.log(info)
            }
        })
    }

    async banUser(firstname,middlename,banReason,email){
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            auth: {
                user: 'immortalheroes1712@gmail.com',
                pass: 'ixnyuzxtxqsxedjh'
            },
            secure: true
        })

        const MailData = {
            from: 'immortalheroes1712@gmail.com',
            to: email,
            text: `Уважаемый/ая ${firstname} ${middlename}, ваш профиль был заблокирован по причине ${banReason}.
                    Для разъяснения причин блокировки обратитесь к администрации платформы.
                                                                              С уважением, Команда разработчиков.
            `
        }

        transporter.sendMail(MailData,(err,info) =>{
            if(err){
                console.log(err.message)
            }
            else {
                console.log(info.message)
            }
        })
    }

    async addHeroEmail(email,hero,firstname,middlename){
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            auth: {
                user: 'immortalheroes1712@gmail.com',
                pass: 'ixnyuzxtxqsxedjh'
            },
            secure: true
        })

        const MailData = {
            from: 'immortalheroes1712@gmail.com',
            to: email,
            text: `                             Уважаемый/ая ${firstname} ${middlename}! 
                                                    Ваш новый герой на платформе 
                                                 
                                                 Имя: ${hero.firstname} 
                                                 Фамилия: ${hero.lastname}
                                                 Отчество: ${hero.middlename}
                                                 Звание: ${hero.rank}
                                                 История: ${hero.story}                                               
                    `,
            attachment: [{
                filename : hero.photo,
                path: path.resolve(`../../client/dist/images/heroes/${hero.photo}`),
                cid: hero.photo
            }]
        }

        transporter.sendMail(MailData,(err,info) =>{
            if(err){
                console.log(err.message)
            }
            else {
                console.log(info)
            }
        })

    }
};

module.exports = new EmailService()

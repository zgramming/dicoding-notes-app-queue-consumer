const nodeMailer = require('nodemailer');

class MailSender {
  constructor() {
    this._transporter = nodeMailer.createTransport({
      host: process.env.MAILTRAP_HOST,
      port: process.env.MAILTRAP_PORT,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS,
      },
    });
  }

  async sendEmail(targetEmail, content) {
    try {
      const message = {
        from: 'Notes Apps',
        to: targetEmail,
        subject: 'Ekspor Catatan',
        text: 'Terlampir hasil dari ekspor catatan',
        attachments: [
          {
            filename: 'notes.json',
            content,
          },
        ],
      };

      const result = await this._transporter.sendMail(message);
      console.log('MailSender -> sendEmail -> result', result);

      return result;
    } catch (error) {
      console.log({
        error: error,
        context: 'MailSender -> sendEmail',
      });
    }
  }
}

module.exports = MailSender;

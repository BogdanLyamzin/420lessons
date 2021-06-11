const sgMail = require("@sendgrid/mail");
requrie("dotenv").config();

const { EMAIL_KEY } = process.env;

sgMail.setApiKey(EMAIL_KEY);

const createMail = (address) => {
  const email = {
    to: address,
    from: "bogdan.lyamzin.d@gmail.com",
    subject: "Подтверждение регистрации",
    html: "<a href=''></a>",
  };
  return email;
};

app.post("/send", () => {});

app.post("/register", express.json(), async (req, res, next) => {
  try {
    const result = await User.create(req.body);
    const mail = createMail(result.email);
    sgMail
      .send(mail)
      .then(() => {
        console.log("Email set");
      })
      .catch((error) => console.log(error));
  } catch (error) {
    next(error);
  }
});

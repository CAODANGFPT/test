import User from "../models/user";
import { signinSchema, signupSchema } from "../schemas/auth";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

  export const list = async (req, res) => {
    try {
      const users = await User.getAllUsers();
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
export const show = async (req, res) => {
  try {
    const usersItem = await User.getUserById(req.params.id);
    if (!usersItem) {
      res.status(404).json({ error: "UserItem not found" });
    } else {
      res.json(usersItem);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const listUser = async (req, res) => {
  try {
    const users = await User.getAllUsersRole();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const Register = async (req, res) => {
  try {
    const { name, email, password, role_id } = req.body;
    const { error } = signupSchema.validate(req.body);
    if (error) {
      const errors = error.details.map((errorItem) => errorItem.message);
      return res.status(400).json({
        message: errors,
      });
    }
    const checkEmail = await User.checkEmailExists(email);
    if (checkEmail) {
      return res.status(400).json({ message: "Email đã tồn tại" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = await User.createUser(name, email, hashedPassword, role_id);
    const accessToken = jwt.sign({ id: userId }, "asmweb209", {
      expiresIn: "1d",
    });
    res.json({
      id: userId,
      accessToken,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { error } = signinSchema.validate(req.body);
    if (error) {
      const errors = error.details.map((errorItem) => errorItem.message);
      return res.status(400).json({
        message: errors,
      });
    }
    const user = await User.checkEmailExists(email);
    if (!user) {
      return res.status(404).json({ message: "Email không tồn tại" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Mật khẩu không chính xác" });
    }
    const accessToken = jwt.sign({ id: user.id }, "asmweb209", {
      expiresIn: "1d",
    });
    res.json({
      user,
      accessToken,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const sendResetLinkEmail = async (req, res) => {
  const { email } = req.body;
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "hainv21123@gmail.com",
      pass: "yfaqudeffxnjptla",
    },
  });
  const hashedEmail = await bcrypt.hash(
    email,
    parseInt(process.env.BCRYPT_SALT_ROUND)
  );

  try {
    const checkEmail = await User.checkEmailExists(email);
    if (!checkEmail) {
      return res.status(400).json({ message: "Tài khoản không tồn tại" });
    }
    const mailOptions = {
      from: email,
      to: email,
      subject: "Thông tin khóa",
      html: `<div style="font-family: sans-serif; margin: 0 40px;">
        <img
          style="width: 200px"
          src="https://iweb.tatthanh.com.vn/pic/3/blog/images/image(1244).png"
          alt=""
        />
        <p>Chào <span style="font-weight: 600">${checkEmail.name},</span></p>
        <p>
          Bạn đã yêu cầu đổi mật khẩu tại
          <span style="font-weight: 600">ShopGiay.</span>
        </p>
        <p>Bạn vui lòng truy cập vào liên kết dưới đây để thay đổi mật khẩu</p>
        <div style="padding: 20px 0 20px 40px">
          <a
            href="http://localhost:5173/resetPassword?email=${encodeURIComponent(
              email
            )}&token=${encodeURIComponent(hashedEmail)}""
            target="_blank"
            style="
              background-color: #ea2f38;
              border: none;
              color: white;
              padding: 10px 15px;
              text-decoration: none;
              font-size: 20px;
              border-radius: 6px;
            "
          >
            Nhấn vào đây
          </a>
        </div>
        <p style="width: 100%;height: 1px; background-color: #ea2f38;"></p>
        <div style="text-align: right;">
    
          <p>Nếu Bạn có bất kỳ câu hỏi nào, xin liên hệ với chúng tôi tại</p>
          <p>Trân trọng,</p>
          <p style="font-weight: 600;">Ban quản trị cửa hàng ShopGiay</p>
        </div>
      </div>`,
    };
    await transporter.sendMail(mailOptions);
    res.json({
      message: "Bạn vui lòng check email của mình",
    });
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export const resetPassword = async (req, res) => {
  const { email, token, password } = req.body;
  try {
    const hashedEmail = await bcrypt.hash(
      email,
      parseInt(process.env.BCRYPT_SALT_ROUND)
    );
    bcrypt.compare(email, token, (err, result) => {
      console.log("compare", result);
      if (result == true) {
        bcrypt
          .hash(password, parseInt(process.env.BCRYPT_SALT_ROUND))
          .then(async (password) => {
            await User.resetPassword(email, password);
            res.status(200).json({
              message: "Đổi mật khẩu thành công",
            });
          });
      } else {
        res.status(400).json({
          message: "Đổi mật khẩu thất bại",
        });
      }
    });
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};
export const update = async (req, res) => {
  try {
    const { role_id } = req.body;
    await User.updateUserRole(req.params.id, role_id);
    res.json({ message: "User updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

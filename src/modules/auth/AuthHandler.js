import JWT from 'jsonwebtoken';
import Bcrypt from 'bcrypt';

class AuthHandler {
  async register(request, h) {
    try {
      const db = request.systemDB();
      let { email, fullname, alamat, no_hp, password } = request.payload;
      const salt = Bcrypt.genSaltSync(10);
      password = Bcrypt.hashSync(password, salt);

      const checkUser = await db.table('users').where('email', email).first();

      if (checkUser) return h.response({ message: 'Email telah terdaftar' }).code(400);

      await db.table('users').insert({
        email: email,
        fullname: fullname,
        no_hp: no_hp,
        alamat: alamat,
        password: password,
      });

      return h.response({ message: 'Akun anda berhasil dibuat' }).code(200);
    } catch (error) {
      return h.response({ message: error.message });
    }
  }

  async login(request, h) {
    try {
      const { email, password } = request.payload;
      const db = request.systemDB();
      const dataUser = await db.table('users').where('email', email).first();

      if (!dataUser) return h.response({ message: 'Akun anda tidak terdaftar' }).code(404);

      if (!Bcrypt.compareSync(password, dataUser.password))
        return h.response({ message: 'email atau password anda salah.' }).code(401);

      const token = JWT.sign(
        { user_id: dataUser.id, email: dataUser.email },
        process.env.SECRET_KEY
      );

      dataUser.token = token;

      return h.response({ message: 'login berhasil', data: dataUser });
    } catch (error) {
      return h.response({ message: error.message });
    }
  }
}

export default new AuthHandler();

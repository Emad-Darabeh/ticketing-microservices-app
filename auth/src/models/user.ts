import mongoose from 'mongoose';
import PasswordManager from '../services/password-manager';

/**
 * an interface that describes the properties
 * that are required to create a new user
 */
interface UserAttrs {
  email: string;
  password: string;
}

/**
 * an interface that describes the properties
 * that a user document has
 */
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

/**
 * an interface that describes the properties
 * that a user model has
 */
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
      },
      versionKey: false,
    },
  }
);

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashedPassword = await PasswordManager.toHash(this.get('password'));
    this.set('password', hashedPassword);
  }
  done();
});

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export default User;

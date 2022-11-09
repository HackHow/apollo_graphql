import * as argon2 from 'argon2';

hashPassword();

async function hashPassword() {
  try {
    const hash1 = await argon2.hash('123456');
    const hash2 = await argon2.hash('654321');
    console.log(hash1);
    console.log(hash2);
  } catch (error) {
    console.log(error);
  }
}

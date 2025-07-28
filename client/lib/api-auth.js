const signin = async user => {
  try {
    const response = await fetch('/auth/signin/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });

    const data = await response.json();

    if (response.ok && data.token) {
      sessionStorage.setItem('jwt', JSON.stringify(data));
    }

    return data;
  } catch (err) {
    console.error(err);
    return { error: err.message };
  }
};

const signout = async () => {
  try {
    const response = await fetch('/auth/signout/', { method: 'GET' });
    return await response.json();
  } catch (err) {
    console.log(err);
    return { error: err.message };
  }
};

const signup = async user => {
  if (!user?.password || user.password.length <= 6) {
    return { error: 'Password must be at least seven characters' };
  }

  try {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });

    const data = await response.json();

    if (!response.ok) {
      const code = data.error?.code;
      let msg = data.error?.message || data.message || 'Sign up failed';
      return { error: msg };
    }

    if (data.token) {
      sessionStorage.setItem('jwt', JSON.stringify(data));
    }

    return { success: true, ...data };
  } catch (err) {
    return { error: err.message };
  }
};

export { signin, signup, signout };

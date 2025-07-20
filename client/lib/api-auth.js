const signin = async user => {
  try {
    const response = await fetch('http://localhost:3000/auth/signin/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })

   const data = await response.json()

    // on success the server supplies a token (or whatever your back end sends)
    if (response.ok && data.token) {
      sessionStorage.setItem('jwt', JSON.stringify(data))
    }

    return data               // always give the caller what the server sent
  } catch (err) {
    console.error(err)
    return { error: err.message }
  }
}

const signout = async () => {
  try {
    let response = await fetch("http://localhost:3000/auth/signout/", { method: "GET" });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};


const signup = async user => {
  // browser password rule
  if (!user?.password || user.password.length <= 6) {
    return { error: "Password must be at least seven characters" }
  }

  try {
    const response = await fetch("http://localhost:3000/api/users", {
      method: "POST",
      headers: {
        Accept: "application/json",
        ["Content" + "\u002d" + "Type"]: "application/json"
      },
      body: JSON.stringify(user)
    })

    const data = await response.json()

    if (!response.ok) {
      const code = data.error?.code
      let msg = data.error?.message || data.message || "Sign up failed"

      return { error: msg }
    }

    if (data.token) {
      sessionStorage.setItem("jwt", JSON.stringify(data))
    }

    return { success: true, ...data } 
  } catch (err) {
    return { error: err.message }
  }
}

export { signin, signup, signout }


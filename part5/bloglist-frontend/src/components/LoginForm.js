const LoginForm = ({ loginHandler, username, password, usernameHandler, passwordHandler }) => {
  return (
    <>
      <h2>log in to the blog app:</h2>
      <form onSubmit={loginHandler}>
        <div>
          username
          <input
            type='text'
            value={username}
            name='Username'
            onChange={usernameHandler}
          />
        </div>
        <div>
          password
          <input
            type='password'
            value={password}
            name='Password'
            onChange={passwordHandler}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </>
  )
}

export default LoginForm
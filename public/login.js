function Login(props){
    const useEffect = React.useEffect
    const [show, setShow] = React.useState(true)

    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

const {userName, setUsername }= React.useContext(UserContext)
const { userBalance, setUserBalance }= React.useContext(UserContext)
const { isLoggedIn, setIsLoggedIn }= React.useContext(UserContext)
const { userEmail, setUserEmail }= React.useContext(UserContext)
const [isVisible, setIsVisible] = React.useState(false)
console.log(isLoggedIn)

    useEffect(() => {
        checkIfLoggedIn();
        if(isLoggedIn == true){
          const newUserName = window.localStorage.getItem('token')
          const parsedUserInfo = JSON.parse(newUserName)
          console.log(parsedUserInfo.userName)
          setUsername(parsedUserInfo.userName)
          setUserBalance(parsedUserInfo.userBalance)
          console.log(userName)
        }
      }, [isLoggedIn]);
    function handleLogin() {
        const url = `/account/login/${encodeURIComponent(email)}/${encodeURIComponent(password)}`;
        
        (async () => {
          try {
            const res = await fetch(url);
            if (res.status === 200) {
              const data = await res.json();
              console.log(data.token);

              localStorage.setItem("token", JSON.stringify(data.token))
             JSON.stringify(localStorage.setItem("loggedIn", true))
              console.log(data.token.userName)
              const newData = localStorage.getItem("token")
              console.log(newData)
              localStorage.setItem("usersEmail", JSON.stringify(data.token.userEmail))
              setUsername(data.token.userName)
              const updatedLogin = JSON.parse(localStorage.getItem("loggedIn"))
              console.log("value of localStorage loggedIn" + updatedLogin)
              setIsLoggedIn(updatedLogin)
              setUserBalance(data.token.userBalance)
              console.log(userName)
        checkIfLoggedIn()
        // setStatus('loggedIn')

              // Save the token or perform any other action
            } else {
              console.log('Login failed:', res.statusText);
              setIsVisible(true)

            }
          } catch (error) {
            console.error('An error occurred during login:', error);
          }
        })();
      }
      
    function checkIfLoggedIn(){
        if(localStorage.getItem("token")){
            // console.log("yes")
            // setIsLoggedIn(true)
            setShow(false)
            const firstLoginCheck = JSON.parse(localStorage.getItem("loggedIn"))
            setIsLoggedIn(firstLoginCheck)
            // console.log(userName)
        } else {
            setShow(true)
        }
    }
    function clearForm(){
        setEmail('')
        setPassword('')
        setShow(false)

    }
    return(
<Card
        bgcolor='secondary'
        header = "LOGIN"
        status = {status}
        body = {show ? (
            <>
            <br/>
            
            <input type='input' className="form-control" id='email'value={email} placeholder="EMAIL" onChange={e=> {
                setEmail(e.currentTarget.value)
                console.log(email)}}/>
            <br/>
            <input type='password' className="form-control" id='password'value={password} placeholder="PASSWORD" onChange={e=>{
                    setPassword(e.currentTarget.value)
            } }/><br/>
            <button type='submit' className='btn btn-dark'style={{fontSize: '2.5rem'}} onClick={handleLogin}>Login</button>
            
            {isVisible ? <div style= {{color:'red', backgroundColor: '#ffffff8f', borderRadius: '10px', textAlign: 'center', marginTop: '20px'}}>Username or Password is invalid. Please try again.</div> : <div></div>}

            </>
        ): (
            <>
            <h5>Welcome back {userName}!</h5>
            <p>What would you like to do?</p>
            <a href="#/deposit/"><button type='submit' className='btn btn-success'  style={{marginBottom:"10px"}}>Make A Deposit</button></a>            
            <a href="#/withdraw/"><button type='submit' className='btn btn-warning' style={{marginBottom:"10px"}} >Make A Withdraw</button></a>
            <a href="#/balance/"><button type='submit' className='btn btn-primary' >Check My Balance</button></a>
            </>
        )}
      
      />
    

    )
}
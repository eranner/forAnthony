function Withdraw(){   
    const [show, setShow] = React.useState(true)
    const [status, setStatus] = React.useState('')
    const [withdraw, setWithdraw] = React.useState('')
    const [disabled, setDisabled] = React.useState(true)
    // const [email, setEmail] = React.useState('')
    // const [password, setPassword] = React.useState('')
    const ctx = React.useContext(UserContext)
   // console.log([...ctx.users])
 
    function validate(field, label){
        if (!field) {
            setStatus('Error '+ label)
            setTimeout(() => setStatus(''), 3000) 
            return false; 
        }

        if(field == 0){
            setStatus(`You cannot withdraw 0. Please enter an amount to withdraw.`)
            setTimeout(()=> setStatus(''), 3000)
            return false
        }
        if (parseFloat(field) > ctx.users[0].balance){
            setStatus("Transaction Failed")
            setTimeout(() => setStatus(''), 3000) 
            return false
        }

        if (parseFloat(field) < 0){
            setStatus(`You cannot withdraw a negative number. If you would like to make a deposit, please click the "Deposit" tab.`)
            setTimeout(() => setStatus(''), 3000) 
            setWithdraw('')
            return false
        }

        return true;
    }
    if(isNaN(parseFloat(withdraw)) && withdraw !== '' && withdraw !=='-'&& withdraw !=='.' && withdraw !=='-.'){
        alert('Please enter numerical values only')
        setWithdraw('')
        setDisabled(true)
    }
    function clearForm(){
        setWithdraw('')
        setShow(true)
        setDisabled(true)

    }
    const handleWithdraw = () =>{
        
        // console.log(name, email, password)
        if (!validate(withdraw, 'Please enter an amount to withdraw')) return;
        // if (!validate(email, 'email')) return;
        // if (!validate(password, 'password'))  return;
        // ctx.users.push({name, email, password, balance:100})
        setShow(false)
        let total = ctx.users[0].balance
        let number = parseFloat(total).toFixed(2)
        let newWithdraw = parseFloat(withdraw).toFixed(2)
        number = number - newWithdraw
        let finalNum = parseFloat(number).toFixed(2)
        console.log(number)
        ctx.users[0].balance= finalNum
        console.log(ctx.users[0].balance)
    }

    return(
    

        <Card
        bgcolor='warning'
        header = "WITHDRAW"
        status = {status}
        body = {show ? (
            <>
            <div style={{display: 'flex', gap: 20, justifyContent: 'space-between'}}>
            <h3 style={{ textShadow: '1px 1px #333'}}>Balance:</h3>
            <h3 style={{textShadow: '1px 1px #333', textAlign: 'right'}}>${ctx.users[0].balance}</h3>
            </div>
            
            <br/>
            <h3 style={{textShadow: '1px 1px #333'}}>Withdraw Amount</h3>
            <input type='text' className="form-control" id='withdraw' min='0' style={{textAlign: 'right', fontSize: '1.5rem'}} value={withdraw} onChange={(e)=> {setWithdraw(e.currentTarget.value)
            setDisabled(false)}}/><br/>
            <div style={{display: 'flex', justifyContent: 'center'}}>
            <button type='submit' className='btn btn-dark' disabled={disabled} onClick={handleWithdraw} style={{ fontSize: '2.5rem'}}>Withdraw</button>
            </div>
           
            </>
        ): (
            <>
            <h5>Success</h5>
            <button type='submit' className='btn btn-dark' onClick={clearForm}>Make Another Withdrawal</button>
            </>
        )}
      
      />
      
    )
}
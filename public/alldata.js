function AllData(){


    const [data, setData] = React.useState('')

    React.useEffect(()=> {
      fetch('/account/all')
        .then(response => response.json())
        .then(data => {
          console.log(data)
          setData(JSON.stringify(data))
        })
    })
    // const profiles = [...ctx.users]
    // console.log(profiles)
    if(localStorage.getItem('token')){
    
    
    return(
        <>
        <h1>ALL DATA<br/>
       
        </h1>
        <div className="container"style={{maxWidth: '90%'}}>
        <table className="table table-dark table-striped">
  <thead>
    <tr>
      <th scope="col">Email</th>
      <th scope="col">Name</th>
      <th scope="col">Password</th>
    
    </tr>
  </thead>
  <tbody>
   
        {/* { data.map((profile) =>  */}
             <tr>
             <td>{data}</td>
                {/* <td>{profile.name}</td>
                <td>{profile.email}</td>
                <td>{profile.password}</td> */}
            </tr>
        {/* )} */}

    
  </tbody>
</table>
        
</div>
        </>

    )
              }
  else {
    window.location.assign('/')
  }
}
